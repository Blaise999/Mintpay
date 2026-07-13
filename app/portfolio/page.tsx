"use client"

import BackToDashboard from "@/components/BackToDashboard"
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview"
import { useAccount } from "wagmi"
import { AppGate } from "@/components/AppGate"

export default function PortfolioPage() {
    const { address } = useAccount()
  const connectedWallet = address ? { address } : undefined

  return (
       <AppGate>
    <div className="container py-10">
       <BackToDashboard /> {/* 👈 Add this at the top */}
      <h1 className="text-3xl font-bold mb-4">Portfolio</h1>
      <p className="text-muted-foreground mb-8">
        View your real-time crypto balances and value on Base chain.
      </p>
      <PortfolioOverview wallet={connectedWallet} />
    </div>
       </AppGate>
  )
}
