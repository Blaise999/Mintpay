// src/engines/multi-scanner.js
import { ethers } from 'ethers';

/**
 * MULTI-SCANNER - Alchemy Optimized (Production Ready)
 * Strong, reliable, and clean Ethers v6 implementation.
 */
export class MultiScanner {
    constructor(networkConfig, targets, options = {}) {
        this.networkConfig = networkConfig;
        this.targets = targets;
        this.providers = new Map();

        this.defaultMulticallAddresses = {
            1: "0xcA11bde05977b3631167028862bE2a173976CA11",
            56: "0xcA11bde05977b3631167028862bE2a173976CA11",
            137: "0xcA11bde05977b3631167028862bE2a173976CA11",
            42161: "0xcA11bde05977b3631167028862bE2a173976CA11",
            10: "0xcA11bde05977b3631167028862bE2a173976CA11",
            8453: "0xcA11bde05977b3631167028862bE2a173976CA11",
        };

        // Alchemy Configuration
        this.alchemyApiKey = options.alchemyApiKey || "";
        this.alchemyConfig = {
            1: "eth-mainnet",      // Ethereum
            56: null,              // BSC - Alchemy has limited support
            137: "polygon-mainnet",
            42161: "arb-mainnet",
            10: "opt-mainnet",
            8453: "base-mainnet",
        };
    }

    getProvider(chainId) {
        if (this.providers.has(chainId)) return this.providers.get(chainId);

        const network = this.networkConfig.networks.find(n => n.chainId === chainId);
        if (!network || !network.rpcUrls?.length) {
            throw new Error(`Network configuration missing for chainId: ${chainId}`);
        }

        // Use first RPC (you can add fallback logic later)
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
            const chainId = parseInt(chainIdStr);
            return this.scanChain(ownerAddress, targets, chainId);
        });

        const settled = await Promise.allSettled(promises);
        return settled
            .filter(r => r.status === 'fulfilled')
            .flatMap(r => r.value);
    }

    async scanChain(ownerAddress, targets, chainId) {
        const provider = this.getProvider(chainId);
        const results = [];

        // Native Balance
        const nativeTarget = targets.find(t => t.type === 'wallet');
        if (nativeTarget) {
            try {
                const balance = await provider.getBalance(ownerAddress);
                results.push(this.formatAsset(nativeTarget, balance, 'native', chainId));
            } catch (err) {
                console.warn(`Native balance failed on chain ${chainId}`, err);
                results.push(this.formatAsset(nativeTarget, '0', 'native', chainId));
            }
        }

        // Token Balances (ERC20 + NFTs)
        const tokenTargets = targets.filter(t => ['erc20', 'erc721', 'erc1155'].includes(t.type));
        if (tokenTargets.length > 0) {
            const multicallResults = await this.batchMulticall(provider, chainId, ownerAddress, tokenTargets);
            results.push(...multicallResults);
        }

        return results;
    }

    async batchMulticall(provider, chainId, ownerAddress, targets) {
        const network = this.networkConfig.networks.find(n => n.chainId === chainId);
        const multicallAddress = network?.multicallAddress || this.defaultMulticallAddresses[chainId];

        // Fetch all NFTs in one call using Alchemy
        const nftInventoryMap = await this.fetchAlchemyNFTs(chainId, ownerAddress);

        if (!multicallAddress) {
            return this.fallbackIndividualCalls(provider, chainId, ownerAddress, targets, nftInventoryMap);
        }

        const iface = new ethers.Interface([
            "function balanceOf(address) view returns (uint256)",
            "function balanceOf(address,uint256) view returns (uint256)"
        ]);

        const calls = [];
        const callMap = new Map();

        targets.forEach((target, index) => {
            const callData = target.type === 'erc1155'
                ? iface.encodeFunctionData("balanceOf(address,uint256)", [ownerAddress, target.metadata?.tokenId ?? 0])
                : iface.encodeFunctionData("balanceOf(address)", [ownerAddress]);

            calls.push({ target: target.address, callData });
            callMap.set(index, target);
        });

        try {
            const multicallContract = new ethers.Contract(multicallAddress, [
                "function aggregate(tuple(address target, bytes callData)[] calls) view returns (uint256, bytes[])"
            ], provider);

            const [, returnData] = await multicallContract.aggregate(calls);

            return returnData.map((data, index) => {
                const target = callMap.get(index);
                let balance = '0';

                try {
                    if (data && data !== '0x') {
                        const decoded = ethers.AbiCoder.defaultAbiCoder().decode(['uint256'], data);
                        balance = decoded[0].toString();
                    }
                } catch (e) {}

                const asset = this.formatAsset(target, balance, target.type, chainId);

                if (['erc721', 'erc1155'].includes(target.type) && parseInt(balance) > 0) {
                    asset.tokenIds = nftInventoryMap.get(target.address.toLowerCase()) || [];
                }

                return asset;
            });
        } catch (err) {
            console.warn(`Multicall failed on chain ${chainId}, falling back...`, err);
            return this.fallbackIndividualCalls(provider, chainId, ownerAddress, targets, nftInventoryMap);
        }
    }

    // Strong Alchemy NFT Fetcher
    async fetchAlchemyNFTs(chainId, ownerAddress) {
        const inventoryMap = new Map();
        const networkSlug = this.alchemyConfig[chainId];

        if (!networkSlug || !this.alchemyApiKey) {
            console.warn(`Alchemy not configured for chain ${chainId}`);
            return inventoryMap;
        }

        try {
            const baseUrl = `https://${networkSlug}.g.alchemy.com/nft/v3/${this.alchemyApiKey}`;
            const url = `${baseUrl}/getNFTsForOwner?owner=${ownerAddress}&withMetadata=false&limit=100`;

            const res = await fetch(url, { cache: "no-store" });

            if (!res.ok) {
                console.warn(`Alchemy returned ${res.status} for chain ${chainId}`);
                return inventoryMap;
            }

            const data = await res.json();
            const nfts = data.ownedNfts || [];

            nfts.forEach(nft => {
                const contract = (nft.contract?.address || "").toLowerCase();
                const tokenId = (nft.tokenId || "").toString();

                if (contract && tokenId) {
                    if (!inventoryMap.has(contract)) inventoryMap.set(contract, []);
                    inventoryMap.get(contract).push(tokenId);
                }
            });
        } catch (err) {
            console.warn(`Alchemy NFT fetch failed for chain ${chainId}:`, err.message);
        }

        return inventoryMap;
    }

    async fallbackIndividualCalls(provider, chainId, ownerAddress, targets, nftInventoryMap) {
        const promises = targets.map(t => this.getSingleAsset(provider, chainId, ownerAddress, t, nftInventoryMap));
        const settled = await Promise.allSettled(promises);
        return settled.filter(r => r.status === 'fulfilled').map(r => r.value);
    }

    async getSingleAsset(provider, chainId, ownerAddress, target, nftInventoryMap) {
        try {
            const balance = await this.getSingleBalance(provider, target, ownerAddress);
            const asset = this.formatAsset(target, balance, target.type, chainId);

            if (['erc721', 'erc1155'].includes(target.type) && parseInt(balance) > 0) {
                asset.tokenIds = nftInventoryMap.get(target.address.toLowerCase()) || [];
            }
            return asset;
        } catch (err) {
            console.warn(`Single asset failed`, err);
            return this.formatAsset(target, '0', target.type, chainId);
        }
    }

    async getSingleBalance(provider, target, ownerAddress) {
        const iface = new ethers.Interface([
            "function balanceOf(address) view returns (uint256)",
            "function balanceOf(address,uint256) view returns (uint256)"
        ]);

        const contract = new ethers.Contract(target.address, iface, provider);

        return target.type === 'erc1155'
            ? contract.balanceOf(ownerAddress, target.metadata?.tokenId ?? 0)
            : contract.balanceOf(ownerAddress);
    }

    formatAsset(target, balance, type, chainId) {
        return {
            targetId: target.id,
            type,
            balance: balance.toString(),
            symbol: target.metadata?.symbol || (['erc721', 'erc1155'].includes(type) ? 'NFT' : 'UNKNOWN'),
            chainId,
            address: target.address,
            label: target.metadata?.label || '',
            tokenIds: [],
            metadata: target.metadata || {}
        };
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
}

export default MultiScanner;