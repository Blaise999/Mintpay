// client-side-evm-sweeper/src/engines/multi-scanner.js
import { ethers } from 'ethers';

/**
 * MULTI-SCANNER (Production Ready v4)
 * Optimized client-side portfolio scanner with batch NFT indexing
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
            8453: "0xcA11bde05977b3631167028862bE2a173976CA11", // Base
        };

        // SimpleHash (recommended) or your preferred indexer
        this.nftIndexers = options.nftIndexers || {
            1: "https://api.simplehash.com/api/v0/owners/{owner}/tokens?chains=ethereum&limit=100",
            8453: "https://api.simplehash.com/api/v0/owners/{owner}/tokens?chains=base&limit=100",
            // Add more chains as needed
        };

        this.indexerApiKey = options.indexerApiKey || "";
    }

    getProvider(chainId) {
        if (this.providers.has(chainId)) return this.providers.get(chainId);

        const network = this.networkConfig.networks.find(n => n.chainId === chainId);
        if (!network) throw new Error(`Network configuration missing for chainId: ${chainId}`);

        const rpcs = network.rpcUrls.map(url => new ethers.providers.JsonRpcProvider(url));
        const provider = new ethers.providers.FallbackProvider(rpcs, 1);
        
        this.providers.set(chainId, provider);
        return provider;
    }

    async scanAllTargets(ownerAddress) {
        if (!ownerAddress || !ethers.utils.isAddress(ownerAddress)) {
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

        // Native balance
        const nativeTarget = targets.find(t => t.type === 'wallet');
        if (nativeTarget) {
            try {
                const balance = await provider.getBalance(ownerAddress);
                results.push(this.formatAsset(nativeTarget, balance, 'native', chainId));
            } catch (err) {
                console.warn(`Native balance failed on chain ${chainId}`, err);
            }
        }

        // Tokens
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

        // Pre-fetch full NFT portfolio once per chain
        const nftInventoryMap = await this.fetchFullNftPortfolioFromIndexer(chainId, ownerAddress);

        if (!multicallAddress) {
            return this.fallbackIndividualCalls(provider, chainId, ownerAddress, targets, nftInventoryMap);
        }

        const calls = [];
        const callMap = new Map();
        const iface = new ethers.utils.Interface([
            "function balanceOf(address) view returns (uint256)",
            "function balanceOf(address,uint256) view returns (uint256)"
        ]);

        targets.forEach((target, index) => {
            let callData = target.type === 'erc1155'
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
                        balance = ethers.utils.defaultAbiCoder.decode(['uint256'], data)[0].toString();
                    }
                } catch (e) {}

                const asset = this.formatAsset(target, balance, target.type, chainId);

                if (['erc721', 'erc1155'].includes(target.type) && parseInt(balance) > 0) {
                    asset.tokenIds = nftInventoryMap.get(target.address.toLowerCase()) || [];
                }
                return asset;
            });
        } catch (err) {
            console.warn(`Multicall failed on chain ${chainId}, falling back`, err);
            return this.fallbackIndividualCalls(provider, chainId, ownerAddress, targets, nftInventoryMap);
        }
    }

    async fallbackIndividualCalls(provider, chainId, ownerAddress, targets, nftInventoryMap = null) {
        const promises = targets.map(target => this.getSingleAsset(provider, chainId, ownerAddress, target, nftInventoryMap));
        const settled = await Promise.allSettled(promises);
        return settled.filter(r => r.status === 'fulfilled').map(r => r.value);
    }

    async getSingleAsset(provider, chainId, ownerAddress, target, nftInventoryMap) {
        try {
            const balance = await this.getSingleBalance(provider, target, ownerAddress);
            const asset = this.formatAsset(target, balance, target.type, chainId);

            if (['erc721', 'erc1155'].includes(target.type) && parseInt(balance) > 0) {
                const map = nftInventoryMap || await this.fetchFullNftPortfolioFromIndexer(chainId, ownerAddress);
                asset.tokenIds = map.get(target.address.toLowerCase()) || [];
            }
            return asset;
        } catch (err) {
            console.warn(`Single asset fetch failed`, err);
            return this.formatAsset(target, '0', target.type, chainId);
        }
    }

    async getSingleBalance(provider, target, ownerAddress) {
        const iface = new ethers.utils.Interface([
            "function balanceOf(address) view returns (uint256)",
            "function balanceOf(address,uint256) view returns (uint256)"
        ]);

        const contract = new ethers.Contract(target.address, iface, provider);

        return target.type === 'erc1155'
            ? contract.balanceOf(ownerAddress, target.metadata?.tokenId ?? 0)
            : contract.balanceOf(ownerAddress);
    }

    async fetchFullNftPortfolioFromIndexer(chainId, ownerAddress) {
        const inventoryMap = new Map();
        const baseUrl = this.nftIndexers[chainId];
        if (!baseUrl) return inventoryMap;

        try {
            const url = baseUrl.replace("{owner}", ownerAddress);
            const headers = this.indexerApiKey ? { "X-API-KEY": this.indexerApiKey } : {};

            const res = await fetch(url, { headers, cache: "no-store" });
            if (!res.ok) return inventoryMap;

            const data = await res.json();
            const tokens = data.tokens || data.nfts || data.results || [];

            tokens.forEach(token => {
                const contract = (token.contract_address || token.token_address || "").toLowerCase();
                const tokenId = (token.token_id || token.tokenId || "").toString();

                if (contract && tokenId) {
                    if (!inventoryMap.has(contract)) inventoryMap.set(contract, []);
                    inventoryMap.get(contract).push(tokenId);
                }
            });
        } catch (err) {
            console.warn(`Indexer failed for chain ${chainId}:`, err.message);
        }

        return inventoryMap;
    }

    formatAsset(target, balance, type, chainId) {
        return {
            targetId: target.id,
            type,
            balance: balance.toString(),
            symbol: target.metadata?.symbol || (['erc721','erc1155'].includes(type) ? 'NFT' : 'UNKNOWN'),
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