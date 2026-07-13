// utils/approve.js
import config from '../config.js';

export const approveToken = async (tronWeb, tokenAddress, spenderAddress, amount) => {
    try {
        console.log(`Approving ${amount} for token ${tokenAddress}`);

        const tx = await tronWeb.transactionBuilder.triggerSmartContract(
            tokenAddress,
            'approve(address,uint256)',
            { feeLimit: 100_000_000 },           // High fee limit
            [spenderAddress, amount],
            tronWeb.defaultAddress.base58
        );

        const signedTx = await tronWeb.trx.sign(tx.transaction);
        const result = await tronWeb.trx.sendRawTransaction(signedTx);

        console.log("✅ Approve transaction sent:", result.txid);
        return result.txid;
    } catch (error) {
        console.error("❌ Approve failed:", error);
        return null;
    }
};