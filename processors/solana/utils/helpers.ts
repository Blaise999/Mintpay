export const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function formatPubkey(pubkey: string): string {
  if (!pubkey) return "unknown";
  return pubkey.slice(0, 6) + "..." + pubkey.slice(-4);
}

export function isValidSolanaAddress(addr: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr);
}

// Random delay for more human-like behavior
export function randomDelay(baseMs: number, variance: number = 250): number {
  return baseMs + Math.floor(Math.random() * variance);
}