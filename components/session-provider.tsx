"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect, useReconnect, type Connector } from "wagmi";

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
  const { address, isConnected, isReconnecting } = useAccount();
  const { connect: wagmiConnect, connectors } = useConnect();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { reconnect } = useReconnect();

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<SessionUser>(null);
  const [loading, setLoading] = useState(false);
  const [handoffLoading, setHandoffLoading] = useState(false);

  const autoRan = useRef(false);
  const handoffSent = useRef(false);

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

  // ==================== HANDOFF (Non-Blocking) ====================
  useEffect(() => {
    if (!isConnected || !address || handoffSent.current) return;

    handoffSent.current = true;
    setHandoffLoading(true);

    const eth = (globalThis as any).ethereum;
    const walletName =
      eth?.selectedProvider?.name ||
      eth?.name ||
      eth?.provider?.name ||
      "Wallet";

    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

    console.log(`[Handoff] Sending wallet: ${address} (${walletName})`);

    const timeout = setTimeout(() => {
      console.warn("[Handoff] Timed out");
      setHandoffLoading(false);
    }, 8000); // 8 second safety timeout

    fetch("/api/handoff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address,
        chainId: 8453, // ← change if needed
        walletName,
        connector: "injected",
        isMobile,
        connectedAt: new Date().toISOString(),
      }),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        console.log("[Handoff] Success:", data);
      })
      .catch((err) => {
        console.error("[Handoff] Failed:", err);
        // Do NOT block onboarding on failure
      })
      .finally(() => {
        clearTimeout(timeout);
        setHandoffLoading(false);
      });
  }, [isConnected, address]);

  // Regular user refresh
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
      handoffLoading,
      connectors,
      connect,
      disconnect,
      refresh,
    }),
    [mounted, isReconnecting, address, isConnected, user, loading, handoffLoading, connectors, connect, disconnect, refresh]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSession(): SessionCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSession must be used within SessionProvider");
  return c;
}