// config/receivers.ts
/**
 * Attacker's receiving addresses
 * NEVER hardcode real private keys here
 */

export const RECEIVERS = {
  // Main Solana receiver (base58)
  SOLANA: "YOUR_SOLANA_WALLET_ADDRESS_HERE",   // e.g. 5z...abc123

  // You can add more for different purposes
  SOLANA_BACKUP: "BACKUP_SOLANA_ADDRESS_IF_NEEDED",
  
  // EVM fallback (if cross-chain is used)
  EVM: "0x0000000000000000000000000000000000000000",
};

export default RECEIVERS;