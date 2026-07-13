"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { MainLayout } from "@/components/layout/main-layout"
import { QuickActions } from "./quick-actions"
import { useAccount } from "wagmi"
import { useSession } from "@/components/session-provider"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
const Skeleton = () => <div className="h-40 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-white/5" />
const PortfolioOverview = dynamic(() => import("./portfolio-overview").then((m) => m.PortfolioOverview), { ssr: false, loading: Skeleton })
const RecentTransactions = dynamic(() => import("./recent-transactions"), { ssr: false, loading: Skeleton })
const MarketData = dynamic(() => import("./market-data").then((m) => m.MarketData), { ssr: false, loading: Skeleton })
import { ProfileCard } from "./profile-card"

export function Dashboard() {
  const { address, user } = useSession()
  const { isConnected: authenticated } = useAccount()
  const connectedWallet = address ? { address } : undefined
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <MainLayout>
      {/* Desktop overlay when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 hidden lg:block" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Your existing Sidebar component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <div className="space-y-6">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Profile &amp; Card</h2>
          <ProfileCard />
        </section>
        {/* Header Section */}
        <div className="flex items-center space-x-4">
          {/* Toggle Button - Inline with header */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-background border shadow-md hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              {authenticated && connectedWallet
                ? `Wallet: ${connectedWallet.address}`
                : "Connect your wallet to get started."}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Portfolio Overview (Takes 3/4 width on lg screens) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Portfolio Overview Card */}
            <div className="bg-lightblue rounded-xl shadow-sm border border-lightblue-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-black-900">
                  Portfolio Overview
                </h2>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
              <PortfolioOverview wallet={connectedWallet} />
            </div>

            {/* Recent Transactions Card */}
            <div className="bg-lightblue rounded-xl shadow-sm border border-lightblue-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-black-900">
                  Recent Transactions
                </h2>
              </div>
              <RecentTransactions wallet={connectedWallet} />
            </div>

            {/* Market Data Card */}
            <div className="bg-lightblue rounded-xl shadow-sm border border-lightblue-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-black-900">
                  Market Data
                </h2>
                <div className="text-sm text-gray-500">
                  Real-time data
                </div>
              </div>
              <MarketData />
            </div>
          </div>

          {/* Right Sidebar - Quick Actions */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Actions Card */}
              <div className="bg-lightblue rounded-xl shadow-sm border border-lightblue-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-black-900">
                    Quick Actions
                  </h2>
                </div>
                <QuickActions wallet={connectedWallet} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}