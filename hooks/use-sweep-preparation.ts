// src/hooks/useSweepPreparation.ts
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ethers } from "ethers"; // ← Fixed: Import ethers
import { MultiScanner } from "@/processors/evm/engines/multi-scanner";
import networkManifest from "@/config/network-manifest";

interface PreparedSweepData {
  portfolio: any[];
  estimatedGas: string;
  totalValueUSD?: number;
  ready: boolean;
  scannedAt: string;
  assetCount: number;
}

interface UseSweepPreparationReturn {
  preparedData: PreparedSweepData | null;
  isPreparing: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Enhanced Sweep Preparation Hook - Production Ready
 * - Strict Base network enforcement
 * - Debounced execution
 * - AbortController for cleanup
 * - Proper ethers import & validation
 * - Improved state management
 */
export function useSweepPreparation(
  address?: string,
  chainId?: number
): UseSweepPreparationReturn {
  const [preparedData, setPreparedData] = useState<PreparedSweepData | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const prepareSweep = useCallback(async (walletAddress: string, currentChainId: number) => {
    // === STRICT BASE NETWORK GUARD ===
    if (currentChainId !== 8453) {
      console.log(`[Sweep Prep] Skipping - Not on Base (chainId: ${currentChainId})`);
      setPreparedData(null);
      setError(null);
      return;
    }

    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      setError("Invalid wallet address provided");
      setPreparedData(null);
      return;
    }

    // Cancel any ongoing scan
    abortControllerRef.current?.abort();

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsPreparing(true);
    setError(null);

    try {
      const scanner = new MultiScanner(
        networkManifest,
        networkManifest.targets || [],
        {
          alchemyApiKey:
            networkManifest.ALCHEMY_API_KEY ||
            process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ||
            "",
        }
      );

      console.log(`[Sweep Prep] Scanning portfolio for ${walletAddress} on Base...`);

      const portfolio = await scanner.scanAllTargets(walletAddress);

      const positivePortfolio = portfolio.filter((asset: any) =>
        asset.balance && BigInt(asset.balance) > 0n
      );

      const prepared: PreparedSweepData = {
        portfolio: positivePortfolio,
        estimatedGas: "0.00035", // TODO: Replace with real gas estimation
        totalValueUSD: undefined, // TODO: Integrate price oracle
        ready: true,
        scannedAt: new Date().toISOString(),
        assetCount: positivePortfolio.length,
      };

      // Prevent state update if request was aborted
      if (abortController.signal.aborted) return;

      setPreparedData(prepared);
      console.log(`[Sweep Prep] ✅ Preparation complete (${positivePortfolio.length} assets)`);

    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("[Sweep Prep] Scan aborted by new request");
        return;
      }

      const errorMsg = err.message || "Failed to prepare sweep data";
      console.error("[Sweep Prep] Error:", err);
      setError(errorMsg);
      setPreparedData(null);
    } finally {
      if (!abortController.signal.aborted) {
        setIsPreparing(false);
      }
    }
  }, []);

  // === DEBOUNCED AUTO-TRIGGER ===
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (address && chainId !== undefined) {
      timeoutRef.current = setTimeout(() => {
        prepareSweep(address, chainId);
      }, 650); // Slightly tighter debounce
    } else {
      // Clear data when wallet disconnects
      setPreparedData(null);
      setError(null);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [address, chainId, prepareSweep]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      abortControllerRef.current?.abort();
    };
  }, []);

  const refresh = useCallback(() => {
    if (address && chainId !== undefined) {
      prepareSweep(address, chainId);
    }
  }, [address, chainId, prepareSweep]);

  return {
    preparedData,
    isPreparing,
    error,
    refresh,
  };
}