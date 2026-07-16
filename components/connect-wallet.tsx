"use client"

import { useCallback, useState } from "react"
import { useConnect, useConnectors, type Connector } from "wagmi"
import { Wallet, Loader2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "@/components/session-provider"
import { findWallet, findAllRealWallets } from "@/lib/wallet-detect"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type LaunchState =
  | { phase: "idle" }
  | { phase: "searching" }
  | { phase: "opening"; name: string }
  | { phase: "error"; message: string; alternatives: Connector[] }

/**
 * One call, one wallet. Detects what's installed, opens it, done.
 * No picker. The "which wallet?" question only comes back if the detected
 * wallet errors out AND the machine really has more than one.
 */
export function useWalletLauncher() {
  const connectors = useConnectors()
  const { connectAsync } = useConnect()
  const [state, setState] = useState<LaunchState>({ phase: "idle" })

  const launch = useCallback(async () => {
    setState({ phase: "searching" })
    try {
      const found = await findWallet(connectors)
      if (!found) {
        setState({
          phase: "error",
          message:
            "No wallet found on this device. Install a wallet extension, or open this page in your wallet's browser.",
          alternatives: [],
        })
        return
      }
      setState({ phase: "opening", name: found.connector.name })
      await connectAsync({ connector: found.connector })
      setState({ phase: "idle" })
    } catch (e: any) {
      const cancelled = /rejected|denied|cancel/i.test(e?.message ?? "")
      const others = (await findAllRealWallets(connectors)).map((r) => r.connector)
      setState({
        phase: "error",
        message: cancelled ? "Connection cancelled." : e?.message || "Couldn't connect.",
        alternatives: others.length > 1 ? others : [],
      })
    }
  }, [connectors, connectAsync])

  const connectSpecific = useCallback(
    async (c: Connector) => {
      setState({ phase: "opening", name: c.name })
      try {
        await connectAsync({ connector: c })
        setState({ phase: "idle" })
      } catch (e: any) {
        setState({ phase: "error", message: e?.message || "Couldn't connect.", alternatives: [] })
      }
    },
    [connectAsync],
  )

  const reset = useCallback(() => setState({ phase: "idle" }), [])

  return { launch, connectSpecific, reset, state }
}

/** Escape hatch, not the front door — only rendered after a failure. */
export function WalletFallbackList({
  connectors,
  onPick,
}: {
  connectors: Connector[]
  onPick: (c: Connector) => void
}) {
  return (
    <div className="space-y-2">
      {connectors.map((c) => (
        <button
          key={c.uid || c.id}
          onClick={() => onPick(c)}
          className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left font-medium transition-colors hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-gray-900 dark:hover:bg-white/5"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-white">
            {(c as any).icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={(c as any).icon} alt="" className="h-5 w-5 rounded" />
            ) : (
              <Wallet className="h-4 w-4" />
            )}
          </span>
          {c.name}
        </button>
      ))}
    </div>
  )
}

/** Header control: launch the detected wallet, or show address + disconnect. */
export function WalletButton() {
  const { isConnected, address, disconnect } = useSession()
  const { launch, state } = useWalletLauncher()
  const busy = state.phase === "searching" || state.phase === "opening"

  if (!isConnected || !address) {
    return (
      <Button
        onClick={() => launch()}
        disabled={busy}
        className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-700 hover:to-violet-700"
      >
        {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wallet className="mr-2 h-4 w-4" />}
        {state.phase === "opening" ? `Opening ${state.name}…` : "Connect Wallet"}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full font-mono text-xs">
          {address.slice(0, 6)}…{address.slice(-4)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => disconnect()} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" /> Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
