"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { QuickActions } from "./quick-actions";
import { MintPayCard } from "./mintpay-card";
// Custom context state provider framework hook
import { useSession } from "@/components/session-provider"; 
import { Button } from "@/components/ui/button";
import { Menu, ArrowRight } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";

const Skeleton = () => (
  <div className="h-40 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-white/5" />
);

const PortfolioOverview = dynamic(
  () => import("./portfolio-overview").then((m) => m.PortfolioOverview),
  { ssr: false, loading: Skeleton }
);

const RecentTransactions = dynamic(
  () => import("./recent-transactions"),
  { ssr: false, loading: Skeleton }
);

const MarketData = dynamic(
  () => import("./market-data").then((m) => m.MarketData),
  { ssr: false, loading: Skeleton }
);

function Panel({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-gray-950">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Dashboard() {
  // FIXED: Extract the active 'chainId' parameter directly from your useSession context hook.
  const { address, user, chainId } = useSession();
  
  const connectedWallet = address ? { address } : undefined;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const firstName = user?.name?.split(" ")[0];

  return (
    <MainLayout>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 hidden bg-black/50 lg:block" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="rounded-full"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              {firstName ? `Welcome back, ${firstName}` : "Dashboard"}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {address ? (
                <span className="font-mono">{address.slice(0, 6)}…{address.slice(-4)}</span>
              ) : (
                "Connect your wallet to get started."
              )}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left / main view columns */}
          <div className="space-y-6 lg:col-span-2">
            <Panel title="Portfolio" action={<span className="text-xs text-slate-400">USD · updated {new Date().toLocaleTimeString()}</span>}>
              <PortfolioOverview wallet={connectedWallet} />
            </Panel>
            
            <Panel title="Recent activity">
              <RecentTransactions wallet={connectedWallet} />
            </Panel>
            
            <Panel title="Markets" action={<span className="text-xs text-slate-400">USD · live</span>}>
              <MarketData />
            </Panel>
          </div>

          {/* Right / rail sidebar panels */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-gray-950">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">Your card</h2>
                <Link href="/profile" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
                  Manage <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <MintPayCard 
                holder={user?.card?.holder || user?.name?.toUpperCase()} 
                number={user?.card?.number} 
                expiry={user?.card?.expiry} 
              />
            </section>

            {/* Quick Actions Panel */}
            <Panel title="Quick actions">
              {/* FIXED: Explicitly pass the active network chain identifier directly down into the component. */}
              <QuickActions 
                wallet={connectedWallet} 
                chainId={chainId || 1} // Default fallback to Ethereum Mainnet if parameter is null
              />
            </Panel>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
