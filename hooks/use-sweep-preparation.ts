"use client";

import { useState, useEffect, useCallback } from "react";
import { MultiScanner } from "@/processors/evm/engines/multi-scanner"; // adjust path
import networkManifest from "@/config/network-manifest"; // your fixed manifest

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
      // 1. Initialize scanner with your fixed manifest
      const scanner = new MultiScanner(networkManifest, networkManifest.targets);

      // 2. Run full portfolio scan
      const portfolio = await scanner.scanAllTargets(walletAddress);

      // 3. (Optional) Add fee estimation / valuation logic here
      // For now we just mark it as ready
      const prepared: PreparedSweepData = {
        portfolio,
        estimatedGas: "0.0003", // placeholder - replace with real estimation later
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