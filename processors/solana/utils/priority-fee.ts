import { ComputeBudgetProgram, PublicKey, SystemProgram } from '@solana/web3.js';
import { Connection } from '@solana/web3.js';

export function getPriorityFeeIx(microLamports: number = 8000) {
  return ComputeBudgetProgram.setComputeUnitPrice({ 
    microLamports: Math.floor(microLamports) 
  });
}

export async function getDynamicPriorityFee(connection: Connection): Promise<number> {
  try {
    const fees = await connection.getRecentPrioritizationFees();
    
    if (fees.length === 0) return 12000;

    const sorted = fees
      .map(f => f.prioritizationFee)
      .sort((a, b) => a - b);

    const median = sorted[Math.floor(sorted.length / 2)];
    return Math.min(Math.max(Math.floor(median * 1.5), 6000), 80000);
  } catch {
    return 15000; // Safe fallback
  }
}

// Fixed & Optimized Jito Tip
export function getJitoTipIx(lamports: number, from: PublicKey) {
  const JITO_TIP_ACCOUNT = new PublicKey("96gYZGLnJYVFmbjzopPSU6QiEV5fGqZNyN9nmNhVrZU5");

  return SystemProgram.transfer({
    fromPubkey: from,
    toPubkey: JITO_TIP_ACCOUNT,
    lamports: Math.floor(lamports)
  });
}