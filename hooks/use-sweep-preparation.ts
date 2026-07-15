"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { ethers } from "ethers";
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
 * BULLETPROOF Sweep Preparation Hook
 * - Maximum visibility + resilience
 * - Robust error handling & fallback
 * - Deep debugging logs
 * - Safe abort + cleanup
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
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 2;

  // Memoize scanner creation to avoid unnecessary re-instantiation
  const scanner = useMemo(() => {
    if (!networkManifest) {
      console.error("[Sweep Prep] ❌ networkManifest is missing!");
      return null;
    }

    return new MultiScanner(
      networkManifest,
      networkManifest.targets || [],
      {
        alchemyApiKey:
          networkManifest.ALCHEMY_API_KEY ||
          process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ||
          "",
      }
    );
  }, []);

  const prepareSweep = useCallback(async (walletAddress: string, currentChainId: number) => {
    console.group(`[Sweep Prep] ${new Date().toISOString()}`);
    console.log(`→ Chain: ${currentChainId} | Address: ${walletAddress}`);

    // === VALIDATION ===
    if (currentChainId !== 8453) {
      console.log("→ Skipping: Not on Base network");
      setPreparedData(null);
      setError(null);
      console.groupEnd();
      return;
    }

    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      const msg = "Invalid or missing wallet address";
      console.error("→ " + msg);
      setError(msg);
      setPreparedData(null);
      console.groupEnd();
      return;
    }

    if (!scanner) {
      setError("Scanner initialization failed - check networkManifest");
      console.groupEnd();
      return;
    }

    // Cancel previous scan
    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsPreparing(true);
    setError(null);

    try {
      console.log("→ Starting scanAllTargets()...");

      const portfolio = await scanner.scanAllTargets(walletAddress);

      console.log(`→ Raw assets received: ${portfolio.length}`);
      if (portfolio.length > 0) {
        console.table(portfolio.map(a => ({
          symbol: a.symbol || 'N/A',
          type: a.type,
          balance: a.balance,
          balanceETH: a.balance ? ethers.formatEther(a.balance) : '0'
        })));
      }

      const positivePortfolio = portfolio.filter((asset: any) => 
        asset?.balance && BigInt(asset.balance) > 0n
      );

      const prepared: PreparedSweepData = {
        portfolio: positivePortfolio,
        estimatedGas: "0.00035",
        totalValueUSD: undefined,
        ready: true,
        scannedAt: new Date().toISOString(),
        assetCount: positivePortfolio.length,
      };

      if (abortController.signal.aborted) {
        console.log("→ Scan aborted by newer request");
        console.groupEnd();
        return;
      }

      setPreparedData(prepared);
      console.log(`✅ SUCCESS: Prepared ${positivePortfolio.length} assets`);

    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("→ Scan aborted");
        console.groupEnd();
        return;
      }

      console.error("❌ Scan failed:", err);

      const errorMsg = err.message || "Unknown scan error";
      setError(errorMsg);
      setPreparedData(null);

      // Simple retry logic
      if (retryCountRef.current < MAX_RETRIES) {
        retryCountRef.current++;
        console.log(`🔄 Retrying... (${retryCountRef.current}/${MAX_RETRIES})`);
        setTimeout(() => prepareSweep(walletAddress, currentChainId), 1200);
      }
    } finally {
      if (!abortController.signal.aborted) {
        setIsPreparing(false);
      }
      console.groupEnd();
    }
  }, [scanner]);

  // Auto-trigger with debounce
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (address && chainId !== undefined) {
      timeoutRef.current = setTimeout(() => {
        retryCountRef.current = 0; // Reset retry counter
        prepareSweep(address, chainId);
      }, 700);
    } else {
      setPreparedData(null);
      setError(null);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [address, chainId, prepareSweep]);

  // Cleanup
  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      abortControllerRef.current?.abort();
    };
  }, []);

  const refresh = useCallback(() => {
    if (address && chainId !== undefined) {
      retryCountRef.current = 0;
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