"use client";

import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

type SessionState = {
  ready: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  address: `0x${string}` | undefined;
  chainId: number | undefined;
  connectorName: string | undefined;
  disconnect: () => void;
};

const SessionContext = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { disconnect } = useDisconnect();
  const { address, isConnected, isConnecting, isReconnecting, chainId, connector } = useAccount();
  const [mounted, setMounted] = useState(false);

  // wagmi hydrates on the client; "ready" just means we can trust isConnected.
  useEffect(() => setMounted(true), []);

  const value = useMemo(
    () => ({
      ready: mounted && !isReconnecting,
      isConnected,
      isConnecting: isConnecting || isReconnecting,
      address,
      chainId,
      connectorName: connector?.name,
      disconnect: () => disconnect(),
    }),
    [mounted, isReconnecting, isConnected, isConnecting, address, chainId, connector, disconnect],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used within a SessionProvider");
  return context;
}
