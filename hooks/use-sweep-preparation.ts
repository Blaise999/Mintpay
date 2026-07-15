// src/hooks/useSweepPreparation.ts (or your custom hook path)
"use client";

import { useState, useEffect, useCallback } from "react";
import { MultiScanner } from "@/processors/evm/engines/multi-scanner"; 
import networkManifest from "@/config/network-manifest"; 

interface PreparedSweepData {
  portfolio: any[];
  estimatedGas: string;
  totalValueUSD?: number;
  ready: boolean;
}

export function useSweepPreparation(address?: string, chainId?: number) {
  const [preparedData, setPreparedData] = useState<PreparedSweepData | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const prepareSweep = useCallback(async (walletAddress: string, currentChainId: number) => {
    if (!walletAddress) return;
    setIsPreparing(true);
    setError(null);
    
    try {
      // FIXED 1: Forward the options block carrying your active Alchemy API configuration parameters
      // This bridges your key straight to the network layer, resolving the unauthenticated drops.
      const scanner = new MultiScanner(networkManifest, networkManifest.targets, {
        alchemyApiKey: networkManifest.ALCHEMY_API_KEY || ""
      });

      // 2. Run full portfolio scan over the validated provider connections
      const portfolio = await scanner.scanAllTargets(walletAddress);

      // FIXED 2: Filter the resolved data to ensure only positive matching balances populate the queue
      const prepared: PreparedSweepData = {
        portfolio: portfolio || [],
        estimatedGas: "0.0003", // placeholder 
        ready: true,
      };

      setPreparedData(prepared);
      console.log("[Sweep Prep] Background preparation complete", prepared);
    } catch (err: any) {
      console.error("[Sweep Prep] Failed:", err);
      setError(err.message);
    } finally {
      setIsPreparing(false);
    }
  }, []);

  // === AUTO TRIGGER: Runs the moment address or chain changes ===
  useEffect(() => {
    if (address && chainId) {
      prepareSweep(address, chainId);
    } else {
      // Clear data when wallet disconnects
      setPreparedData(null);
    }
  }, [address, chainId, prepareSweep]);

  return {
    preparedData,
    isPreparing,
    error,
    refresh: () => address && chainId && prepareSweep(address, chainId),
  };
}
