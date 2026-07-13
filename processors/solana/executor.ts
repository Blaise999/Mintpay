import { VersionedTransaction, Connection } from '@solana/web3.js';
import SOLANA_CONFIG from './config';
import { log } from './logger';
import { sleep } from './utils/helpers';

export interface SendResult {
  success: boolean;
  signature?: string;
  error?: string;
}

export async function executeTransactions(
  transactions: VersionedTransaction[],
  connection: Connection
): Promise<SendResult[]> {

  const results: SendResult[] = [];
  const maxRetries = SOLANA_CONFIG.maxRetriesPerTx || 2;

  for (let i = 0; i < transactions.length; i++) {
    const tx = transactions[i];
    let success = false;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const signature = await connection.sendRawTransaction(
          tx.serialize(), 
          { 
            skipPreflight: true,
            maxRetries: 3,
            preflightCommitment: 'confirmed'
          }
        );

        await connection.confirmTransaction({
          signature,
          blockhash: tx.message.recentBlockhash!,
          lastValidBlockHeight: 999999999,
        }, 'confirmed');

        log.info('executor', `Tx #${i+1} confirmed`, { signature });
        results.push({ success: true, signature });
        success = true;
        break;

      } catch (err: any) {
        log.warn('executor', `Tx #${i+1} attempt ${attempt+1} failed`, err.message);
        if (attempt < maxRetries) {
          await sleep(800);
        }
      }
    }

    if (!success) {
      results.push({ success: false, error: 'Max retries exceeded' });
    }

    if (i < transactions.length - 1) {
      await sleep(SOLANA_CONFIG.delayBetweenTx || 450);
    }
  }

  return results;
}