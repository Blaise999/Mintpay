"use client"

import BackToDashboard from "@/components/BackToDashboard"
// import { WalletConnection } from "@/components/dashboard/wallet-connection"
import { useAccount } from "wagmi"
import { AppGate } from "@/components/AppGate"

export default function WalletPage() {
    const { address } = useAccount()
  const connectedWallet = address ? { address } : undefined

  return (
       <AppGate>
    <div className="container py-10">
       <BackToDashboard /> {/* 👈 Add this at the top */}
      <h1 className="text-3xl font-bold mb-4">Wallet</h1>
      <p className="text-muted-foreground mb-8">
        Your wallet is managed via Privy. Connect/disconnect from your account menu.
      </p>
      {/* Optionally display wallet address/info */}
      {connectedWallet ? (
        <div className="rounded-lg border p-6 bg-background">
          <div className="font-mono text-lg">
            Connected wallet: {connectedWallet.address}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border p-6 bg-background">
          <div>No wallet connected.</div>
        </div>
      )}
    </div>
       </AppGate>
  )
}
