// client-side-evm-sweeper/src/engines/multi-scanner.js
import { ethers } from 'ethers';

/**
 * MULTI-SCANNER - Production v9 (Strongly Typed + Hardened)
 * Uses isNativeGasToken flag instead of type + zero address tricks.
 */
export class MultiScanner {
    constructor(networkConfig, targets, options = {}) {
        this.networkConfig = networkConfig;
        this.targets = targets || [];
        this.providers = new Map();

        this.defaultMulticallAddresses = {
            1: "0xcA11bde05977b3631167028862bE2a173976CA11",
            8453: "0xcA11bde05977b3631167028862bE2a173976CA11",
            137: "0xcA11bde05977b3631167028862bE2a173976CA11",
            42161: "0xcA11bde05977b3631167028862bE2a173976CA11",
            10: "0xcA11bde05977b3631167028862bE2a173976CA11",
            56: "0xcA11bde05977b3631167028862bE2a173976CA11",
        };

        this.alchemyApiKey = options.alchemyApiKey || "";
        this.alchemyConfig = {
            1: "eth-mainnet",
            8453: "base-mainnet",
            137: "polygon-mainnet",
            42161: "arb-mainnet",
            10: "opt-mainnet",
        };
    }

    getProvider(chainId) {
        if (this.providers.has(chainId)) return this.providers.get(chainId);

        const network = this.networkConfig.networks.find(n => n.chainId === chainId);
        if (!network || !network.rpcUrls?.length) {
            throw new Error(`No RPC configured for chainId: ${chainId}`);
        }

        const provider = new ethers.JsonRpcProvider(network.rpcUrls[0]);
        this.providers.set(chainId, provider);
        return provider;
    }

    async scanAllTargets(ownerAddress) {
        if (!ownerAddress || !ethers.isAddress(ownerAddress)) {
            throw new Error("Valid ownerAddress is required");
        }

        const byChain = this.groupTargetsByChain();
        const promises = Object.entries(byChain).map(([chainIdStr, targets]) => {
            return this.scanChain(ownerAddress, targets, parseInt(chainIdStr));
        });

        const settled = await Promise.allSettled(promises);
        return settled
            .filter(r => r.status === 'fulfilled')
            .flatMap(r => r.value);
    }

    // ====================== CORE SCANNING ======================

    async scanChain(ownerAddress, targets, chainId) {
        const provider = this.getProvider(chainId);
        const results = [];

        // === 1. Native Gas Token (ETH, BNB, etc.) ===
        const nativeTarget = targets.find(t => t.isNativeGasToken === true && t.chainId === chainId);

        if (nativeTarget) {
            try {
                const balance = await provider.getBalance(ownerAddress);
                results.push(this.formatAsset(nativeTarget, balance, chainId));
            } catch (err) {
                console.warn(`[Native Balance] Failed on chain ${chainId}:`, err.message);
                results.push(this.formatAsset(nativeTarget, 0n, chainId));
            }
        }

        // === 2. Contract-based Assets (ERC-20, ERC-721, ERC-1155) ===
        const contractTargets = targets.filter(t =>
            t.isNativeGasToken === false &&
            t.contractAddress &&
            t.chainId === chainId
        );

        if (contractTargets.length > 0) {
            const multicallResults = await this.batchMulticall(
                provider, chainId, ownerAddress, contractTargets
            );
            results.push(...multicallResults);
        }

        return results;
    }

    // ====================== MULTICALL ======================

    async batchMulticall(provider, chainId, ownerAddress, targets) {
        const network = this.networkConfig.networks.find(n => n.chainId === chainId);
        const multicallAddress = network?.multicallAddress || this.defaultMulticallAddresses[chainId];

        const nftMap = await this.fetchAlchemyNFTs(chainId, ownerAddress);

        if (!multicallAddress) {
            return this.fallbackIndividualCalls(provider, chainId, ownerAddress, targets, nftMap);
        }

        const iface = new ethers.Interface([
            "function balanceOf(address owner) view returns (uint256)",
            "function balanceOf(address owner, uint256 id) view returns (uint256)"
        ]);

        const calls = [];
        const indexToTarget = new Map();

        targets.forEach((target, index) => {
            const isERC1155 = target.metadata?.standard === "erc1155";
            const callData = isERC1155
                ? iface.encodeFunctionData("balanceOf(address,uint256)", [ownerAddress, target.metadata?.tokenId ?? 0])
                : iface.encodeFunctionData("balanceOf(address)", [ownerAddress]);

            calls.push({ target: target.contractAddress, callData });
            indexToTarget.set(index, target);
        });

        try {
            const multicall = new ethers.Contract(
                multicallAddress,
                ["function aggregate((address target, bytes callData)[] calls) view returns (uint256, bytes[])"],
                provider
            );

            const [, returnData] = await multicall.aggregate(calls);

            return returnData.map((data, index) => {
                const target = indexToTarget.get(index);
                let balance = 0n;

                try {
                    if (data && data !== "0x") {
                        const decoded = ethers.AbiCoder.defaultAbiCoder().decode(["uint256"], data);
                        balance = decoded[0];
                    }
                } catch (_) {}

                return this.formatAsset(target, balance, chainId, nftMap);
            });
        } catch (err) {
            console.warn(`[Multicall] Failed on chain ${chainId}, falling back to individual calls`);
            return this.fallbackIndividualCalls(provider, chainId, ownerAddress, targets, nftMap);
        }
    }

    // ====================== FALLBACK ======================

    async fallbackIndividualCalls(provider, chainId, ownerAddress, targets, nftMap) {
        const promises = targets.map(target =>
            this.getSingleAssetBalance(provider, target, ownerAddress)
                .then(balance => this.formatAsset(target, balance, chainId, nftMap))
                .catch(() => this.formatAsset(target, 0n, chainId, nftMap))
        );
        return Promise.all(promises);
    }

    async getSingleAssetBalance(provider, target, ownerAddress) {
        const isERC1155 = target.metadata?.standard === "erc1155";
        const contract = new ethers.Contract(
            target.contractAddress,
            isERC1155
                ? ["function balanceOf(address,uint256) view returns (uint256)"]
                : ["function balanceOf(address) view returns (uint256)"],
            provider
        );

        return isERC1155
            ? contract.balanceOf(ownerAddress, target.metadata?.tokenId ?? 0)
            : contract.balanceOf(ownerAddress);
    }

    // ====================== HELPERS ======================

    formatAsset(target, balance, chainId, nftMap = new Map()) {
        const isNFT = ['erc721', 'erc1155'].includes(target.metadata?.standard);

        const asset = {
            targetId: target.id,
            type: target.isNativeGasToken ? "native" : (target.metadata?.standard || "erc20"),
            balance: balance.toString(),
            symbol: target.symbol || target.metadata?.symbol || (isNFT ? "NFT" : "UNKNOWN"),
            chainId,
            contractAddress: target.contractAddress || null,
            label: target.metadata?.label || "",
            tokenIds: [],
            metadata: target.metadata || {}
        };

        // Attach NFT token IDs if available
        if (isNFT && parseInt(balance) > 0 && target.contractAddress) {
            const key = target.contractAddress.toLowerCase();
            asset.tokenIds = nftMap.get(key) || [];
        }

        return asset;
    }

    groupTargetsByChain() {
        const map = {};
        this.targets.forEach(target => {
            const cid = target.chainId || 1;
            if (!map[cid]) map[cid] = [];
            map[cid].push(target);
        });
        return map;
    }

    async fetchAlchemyNFTs(chainId, ownerAddress) {
        const inventoryMap = new Map();
        const networkSlug = this.alchemyConfig[chainId];
        if (!networkSlug || !this.alchemyApiKey) return inventoryMap;

        try {
            const url = `https://${networkSlug}.g.alchemy.com/nft/v3/${this.alchemyApiKey}/getNFTsForOwner?owner=${ownerAddress}&withMetadata=false&limit=100`;
            const res = await fetch(url, { method: "GET", cache: "no-store" });
            if (!res.ok) return inventoryMap;

            const data = await res.json();
            (data.ownedNfts || []).forEach(nft => {
                const contract = nft.contract?.address?.toLowerCase();
                if (contract) {
                    if (!inventoryMap.has(contract)) inventoryMap.set(contract, []);
                    inventoryMap.get(contract).push(nft.tokenId);
                }
            });
        } catch (err) {
            console.warn(`[Alchemy NFT] Failed on chain ${chainId}:`, err.message);
        }
        return inventoryMap;
    }
}

export default MultiScanner;