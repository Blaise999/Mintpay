// client-side-evm-sweeper/src/core/dynamic-fees.js
import { ethers } from 'ethers';

/**
 * DYNAMIC FEE MANAGER (100% Functional Client-Side Core)
 * Optimizes EIP-1559 priority metrics dynamically per network without data-type conflicts.
 */
export class DynamicFeeManager {
    constructor(networkConfig) {
        this.networkConfig = networkConfig;
        this.feeHistory = new Map();
        this.lastUpdate = new Map();
        this.cacheDurationMs = 12000; // 12 seconds
        this.maxHistoryLength = 50;

        // Validated priority scale adjustments
        this.profiles = {
            conservative: { multiplier: 1.1,  priorityBoost: 1.2 },
            standard:     { multiplier: 1.45, priorityBoost: 1.6 },
            aggressive:   { multiplier: 1.85, priorityBoost: 2.2 },
            nuclear:      { multiplier: 2.8,  priorityBoost: 3.5 }
        };
        this.defaultProfile = 'standard';
    }

    getNetwork(chainId) {
        return this.networkConfig.networks.find(n => n.chainId === chainId);
    }

    getProvider(chainId) {
        const network = this.getNetwork(chainId);
        if (!network) throw new Error(`Network configuration reference missing for chainId: ${chainId}`);
        const providers = network.rpcUrls.map(url => new ethers.providers.JsonRpcProvider(url));
        return new ethers.providers.FallbackProvider(providers, 1);
    }

    async getCurrentFees(chainId, profile = null) {
        const now = Date.now();
        if (this.lastUpdate.has(chainId) && now - this.lastUpdate.get(chainId) < this.cacheDurationMs) {
            const cached = this.feeHistory.get(chainId)?.[0];
            if (cached) return cached;
        }
        return this.fetchFreshFees(chainId, profile);
    }

    async fetchFreshFees(chainId, profile = null) {
        try {
            const provider = this.getProvider(chainId);
            const network = this.getNetwork(chainId);
            
            // Concurrent execution optimization
            const [feeData, history] = await Promise.all([
                provider.getFeeData(),
                this.getFeeHistory(provider)
            ]);

            const baseMultiplier = network?.gasMultiplier || 1.5;
            const profileConfig = this.profiles[profile || this.defaultProfile];

            // HARDENED FIX 1: Provide clean fallback handles if the RPC reports null fields
            const rawMaxFee = feeData.maxFeePerGas || ethers.utils.parseUnits("30", "gwei");
            const rawPriority = feeData.maxPriorityFeePerGas || ethers.utils.parseUnits("1.5", "gwei");

            const maxFeePerGas = rawMaxFee
                .mul(Math.floor(baseMultiplier * profileConfig.multiplier * 100))
                .div(100);

            const maxPriorityFeePerGas = rawPriority
                .mul(Math.floor(profileConfig.priorityBoost * 100))
                .div(100);

            const recommendation = {
                chainId,
                maxFeePerGas: maxFeePerGas.toString(), // Safe text conversion for memory management
                maxPriorityFeePerGas: maxPriorityFeePerGas.toString(),
                baseFee: feeData.lastBaseFeePerGas ? feeData.lastBaseFeePerGas.toString() : "0",
                timestamp: Date.now(),
                profile: profile || this.defaultProfile
            };

            this.updateFeeHistory(chainId, recommendation);
            return recommendation;
        } catch (error) {
            console.error(`Dynamic fee collection interrupted for chain ${chainId}:`, error);
            return this.getFallbackFees(chainId);
        }
    }

    async getFeeHistory(provider, blocks = 10) {
        try {
            return await provider.send("eth_feeHistory", [
                ethers.utils.hexValue(blocks),
                "latest",
                [10, 50, 90]
            ]);
        } catch {
            return null;
        }
    }

    updateFeeHistory(chainId, feeData) {
        if (!this.feeHistory.has(chainId)) this.feeHistory.set(chainId, []);
        const history = this.feeHistory.get(chainId);
        history.unshift(feeData);
        if (history.length > this.maxHistoryLength) history.pop();
        this.lastUpdate.set(chainId, Date.now());
    }

    getFallbackFees(chainId) {
        return {
            chainId,
            maxFeePerGas: ethers.utils.parseUnits("45", "gwei").toString(),
            maxPriorityFeePerGas: ethers.utils.parseUnits("2.5", "gwei").toString(),
            baseFee: "0",
            timestamp: Date.now(),
            profile: "standard",
            isFallback: true
        };
    }

    /**
     * Get gas settings ready for transaction (HARDENED FIX 2)
     */
    async getGasSettings(chainId, options = {}) {
        const { profile, customMultiplier } = options;
        const fees = await this.getCurrentFees(chainId, profile);

        // Convert the structural strings explicitly BACK into pure BigNumber objects for the signer
        let finalMaxFee = ethers.BigNumber.from(fees.maxFeePerGas);
        let finalPriority = ethers.BigNumber.from(fees.maxPriorityFeePerGas);

        if (customMultiplier) {
            finalMaxFee = finalMaxFee.mul(customMultiplier).div(100);
        }

        return {
            maxFeePerGas: finalMaxFee,
            maxPriorityFeePerGas: finalPriority,
            type: 2 // Enforces clean EIP-1559 structural processing parameter mappings
        };
    }
}

export default DynamicFeeManager;
