// client-side-evm-sweeper/src/engines/multi-scanner.js
import { ethers } from 'ethers';

/**
 * MULTI-SCANNER - Production v12 (Hardened + Optimized for Sweep Prep)
 * - Robust provider management
 * - Enhanced Alchemy NFT integration
 * - Strict positive balance filtering
 * - Better error resilience & logging
 * - Ready for orchestrator hook (useSweepPreparation)
 */

export class MultiScanner {
    constructor(networkConfig, targets = [], options = {}) {
        this.networkConfig = networkConfig;
        this.targets = targets;
        this.providers = new Map();
        this.alchemyApiKey = (options.alchemyApiKey || "").trim();

        this.defaultMulticallAddresses = {
            1: "0xcA11bde05977b3631167028862bE2a173976CA11",
            8453: "0xcA11bde05977b3631167028862bE2a173976CA11",
            137: "0xcA11bde05977b3631167028862bE2a173976CA11",
            42161: "0xcA11bde05977b3631167028862bE2a173976CA11",
            10: "0xcA11bde05977b3631167028862bE2a173976CA11",
            56: "0xcA11bde05977b3631167028862bE2a173976CA11",
        };

        this.alchemyConfig = {
            1: "eth-mainnet",
            8453: "base-mainnet",
            137: "polygon-mainnet",
            42161: "arb-mainnet",
            10: "opt-mainnet",
            56: "bnb-mainnet",
        };
    }

    getProvider(chainId) {
        if (this.providers.has(chainId)) return this.providers.get(chainId);

        const network = this.networkConfig.networks?.find(n => n.chainId === chainId);
        if (!network?.rpcUrls?.length) {
            throw new Error(`No RPC URL configured for chainId: ${chainId}`);
        }

        const rpcUrl = network.rpcUrls[0];

        const networkObj = ethers.Network.from({
            chainId: BigInt(chainId),
            name: (network.name || `chain-${chainId}`).toLowerCase(),
        });

        const provider = new ethers.JsonRpcProvider(
            rpcUrl,
            networkObj,
            { staticNetwork: networkObj }
        );

        this.providers.set(chainId, provider);
        return provider;
    }

    async scanAllTargets(ownerAddress) {
        if (!ownerAddress || !ethers.isAddress(ownerAddress)) {
            throw new Error("Valid ownerAddress is required");
        }

        const byChain = this.groupTargetsByChain();
        const promises = Object.entries(byChain).map(([chainIdStr, targets]) =>
            this.scanChain(ownerAddress, targets, parseInt(chainIdStr))
        );

        const settled = await Promise.allSettled(promises);

        const allResults = settled
            .filter(r => r.status === 'fulfilled')
            .flatMap(r => r.value);

        // === FINAL FILTER: Only assets with positive balance ===
        return allResults.filter(asset => BigInt(asset.balance) > 0n);
    }

    async scanChain(ownerAddress, targets, chainId) {
        const provider = this.getProvider(chainId);
        const results = [];

        // Native Gas Token (ETH on Base, etc.)
        const nativeTarget = targets.find(t => t.isNativeGasToken === true);
        if (nativeTarget) {
            try {
                const balance = await provider.getBalance(ownerAddress);
                results.push(this.formatAsset(nativeTarget, balance, chainId));
            } catch (err) {
                console.warn(`[Native Balance] Chain ${chainId} failed:`, err.message);
                results.push(this.formatAsset(nativeTarget, 0n, chainId));
            }
        }

        // Contract tokens (ERC-20, ERC-721, ERC-1155)
        const contractTargets = targets.filter(t => 
            !t.isNativeGasToken && t.contractAddress
        );

        if (contractTargets.length > 0) {
            const multicallResults = await this.batchMulticall(
                provider,
                chainId,
                ownerAddress,
                contractTargets
            );
            results.push(...multicallResults);
        }

        return results;
    }

    // ====================== MULTICALL ======================
    async batchMulticall(provider, chainId, ownerAddress, targets) {
        const network = this.networkConfig.networks?.find(n => n.chainId === chainId);
        let multicallAddress = network?.multicallAddress || this.defaultMulticallAddresses[chainId];

        const nftMap = await this.fetchAlchemyNFTs(chainId, ownerAddress);

        if (!multicallAddress) {
            return this.fallbackIndividualCalls(provider, chainId, ownerAddress, targets, nftMap);
        }

        const iface = new ethers.Interface([
            "function balanceOf(address) view returns (uint256)",
            "function balanceOf(address,uint256) view returns (uint256)"
        ]);

        const calls = [];
        const indexToTarget = new Map();

        targets.forEach((target, idx) => {
            const isERC1155 = target.metadata?.standard?.toLowerCase() === "erc1155";
            const callData = isERC1155
                ? iface.encodeFunctionData("balanceOf(address,uint256)", [
                    ownerAddress,
                    target.metadata?.tokenId ?? 0
                  ])
                : iface.encodeFunctionData("balanceOf(address)", [ownerAddress]);

            calls.push({ target: target.contractAddress, callData });
            indexToTarget.set(idx, target);
        });

        try {
            const multicall = new ethers.Contract(
                multicallAddress,
                ["function aggregate((address target, bytes callData)[] calls) view returns (uint256 blockNumber, bytes[] returnData)"],
                provider
            );

            const [, returnData] = await multicall.aggregate(calls);

            return returnData.map((data, idx) => {
                const target = indexToTarget.get(idx);
                let balance = 0n;
                try {
                    if (data && data !== "0x") {
                        balance = ethers.AbiCoder.defaultAbiCoder().decode(["uint256"], data)[0];
                    }
                } catch (_) {}
                return this.formatAsset(target, balance, chainId, nftMap);
            });
        } catch (err) {
            console.warn(`[Multicall] Chain ${chainId} failed → falling back`, err.message?.slice(0, 120));
            return this.fallbackIndividualCalls(provider, chainId, ownerAddress, targets, nftMap);
        }
    }

    async fallbackIndividualCalls(provider, chainId, ownerAddress, targets, nftMap) {
        const promises = targets.map(target =>
            this.getSingleAssetBalance(provider, target, ownerAddress)
                .then(balance => this.formatAsset(target, balance, chainId, nftMap))
                .catch(() => this.formatAsset(target, 0n, chainId, nftMap))
        );
        return Promise.all(promises);
    }

    async getSingleAssetBalance(provider, target, ownerAddress) {
        const isERC1155 = target.metadata?.standard?.toLowerCase() === "erc1155";
        const abi = isERC1155
            ? ["function balanceOf(address,uint256) view returns (uint256)"]
            : ["function balanceOf(address) view returns (uint256)"];

        const contract = new ethers.Contract(target.contractAddress, abi, provider);

        return isERC1155
            ? contract.balanceOf(ownerAddress, target.metadata?.tokenId ?? 0)
            : contract.balanceOf(ownerAddress);
    }

    // ====================== HELPERS ======================
    formatAsset(target, balance, chainId, nftMap = new Map()) {
        const standard = target.metadata?.standard?.toLowerCase();
        const isNFT = ['erc721', 'erc1155'].includes(standard);

        const asset = {
            targetId: target.id,
            type: target.isNativeGasToken ? "native" : (standard || "erc20"),
            balance: balance.toString(),
            symbol: target.symbol || target.metadata?.symbol || (isNFT ? "NFT" : "UNKNOWN"),
            chainId,
            contractAddress: target.contractAddress?.toLowerCase() || null,
            label: target.metadata?.label || target.symbol || "",
            tokenIds: [],
            metadata: target.metadata || {},
            isNFT
        };

        // Attach token IDs for NFTs with balance > 0
        if (isNFT && BigInt(balance) > 0n && asset.contractAddress) {
            asset.tokenIds = nftMap.get(asset.contractAddress) || [];
        }

        return asset;
    }

    groupTargetsByChain() {
        const map = {};
        this.targets.forEach(t => {
            const cid = t.chainId || 8453; // Default to Base
            if (!map[cid]) map[cid] = [];
            map[cid].push(t);
        });
        return map;
    }

    async fetchAlchemyNFTs(chainId, ownerAddress) {
        const inventoryMap = new Map();
        const slug = this.alchemyConfig[chainId];

        if (!slug || !this.alchemyApiKey) {
            console.warn(`[Alchemy] No config or API key for chain ${chainId}`);
            return inventoryMap;
        }

        try {
            const url = `https://${slug}.g.alchemy.com/nft/v3/${this.alchemyApiKey}/getNFTsForOwner`;
            const params = new URLSearchParams({
                owner: ownerAddress,
                withMetadata: "false",
                limit: "100"
            });

            const response = await fetch(`${url}?${params}`, {
                method: "GET",
                headers: { "Accept": "application/json" },
                cache: "no-store"
            });

            if (!response.ok) {
                console.warn(`[Alchemy] HTTP ${response.status} for chain ${chainId}`);
                return inventoryMap;
            }

            const data = await response.json();

            (data.ownedNfts || []).forEach(nft => {
                const contract = nft.contract?.address?.toLowerCase();
                if (contract) {
                    if (!inventoryMap.has(contract)) inventoryMap.set(contract, []);
                    inventoryMap.get(contract).push(nft.tokenId);
                }
            });
        } catch (err) {
            console.warn(`[Alchemy NFT] Chain ${chainId} failed:`, err.message);
        }

        return inventoryMap;
    }
}

export default MultiScanner;