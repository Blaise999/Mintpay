"use client"

import { useSession } from "@/components/session-provider"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut } from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/** Inline list of wallet options — used inside the landing "Launch" modal. */
export function ConnectOptions({ onConnected }: { onConnected?: () => void }) {
  const { connectors, connect } = useSession()
  // de-dupe by name (multi-injected discovery can repeat)
  const seen = new Set<string>()
  const list = connectors.filter((c) => (seen.has(c.name) ? false : (seen.add(c.name), true)))

  return (
    <div className="space-y-2">
      {list.length === 0 && (
        <p className="text-sm text-muted-foreground">No wallet detected. Install a browser wallet like MetaMask, or use WalletConnect.</p>
      )}
      {list.map((c) => (
        <button
          key={c.uid}
          onClick={() => {
            connect(c)
            onConnected?.()
          }}
          className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left font-medium transition-colors hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-gray-900 dark:hover:bg-white/5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-white">
            <Wallet className="h-4 w-4" />
          </span>
          {c.name}
        </button>
      ))}
    </div>
  )
}

/** Header control: connect, or show the address with a disconnect menu. */
export function WalletButton() {
  const { isConnected, address, disconnect, connect } = useSession()

  if (!isConnected || !address) {
    return (
      <Button onClick={() => connect()} className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-700 hover:to-violet-700">
        <Wallet className="mr-2 h-4 w-4" /> Connect
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
