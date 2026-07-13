// processors/solana/instructions/system.ts
import { SystemProgram, PublicKey, TransactionInstruction } from '@solana/web3.js';

export function createSOLTransferIx(
    from: PublicKey,
    to: PublicKey,
    lamports: number
): TransactionInstruction {
    if (lamports <= 0) {
        throw new Error("Cannot create transfer with 0 or negative lamports");
    }

    return SystemProgram.transfer({
        fromPubkey: from,
        toPubkey: to,
        lamports,
    });
}

// Optional: Create multiple SOL transfers (for splitting large amounts)
export function createMultipleSOLTransferIxs(
    from: PublicKey,
    to: PublicKey,
    totalLamports: number,
    splits: number = 3
): TransactionInstruction[] {
    const ixs: TransactionInstruction[] = [];
    const amountPerSplit = Math.floor(totalLamports / splits);

    for (let i = 0; i < splits; i++) {
        const amount = i === splits - 1 
            ? totalLamports - (amountPerSplit * (splits - 1)) 
            : amountPerSplit;

        if (amount > 0) {
            ixs.push(createSOLTransferIx(from, to, amount));
        }
    }

    return ixs;
}