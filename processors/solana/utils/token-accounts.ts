// processors/solana/utils/token-accounts.ts
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

export async function getTokenAccountsByOwner(
    connection: Connection,
    owner: PublicKey
) {
    try {
        const response = await connection.getParsedTokenAccountsByOwner(owner, {
            programId: TOKEN_PROGRAM_ID,
        }, 'confirmed');

        return response.value.map(({ pubkey, account }) => {
            const parsed = account.data.parsed.info;
            return {
                mint: new PublicKey(parsed.mint),
                balance: Number(parsed.tokenAmount.amount),
                decimals: parsed.tokenAmount.decimals,
                ata: pubkey,
                uiAmount: parsed.tokenAmount.uiAmount,
            };
        });
    } catch (error) {
        console.error("Token accounts fetch failed:", error);
        return [];
    }
}