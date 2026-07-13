import { PublicKey } from '@solana/web3.js';

export interface TokenAccount {
  mint: PublicKey;
  balance: number;
  decimals: number;
  ata: PublicKey;
  uiAmount: number;
  symbol?: string;
}

export interface ScannedAssets {
  solBalance: number;
  tokens: TokenAccount[];
  nfts: any[];
}