"use client";

import { useState, useCallback } from "react";
import { Smartphone, Tv, Zap, Wifi, ArrowUpDown, ShieldCheck, X, Loader2 } from "lucide-react";
import { useSweepPreparation } from "@/hooks/use-sweep-preparation";

const baseActions = [
  { name: "Airtime", icon: Smartphone, href: "/airtime", color: "from-blue-500 to-indigo-600" },
  { name: "Internet", icon: Wifi, href: "/internet", color: "from-cyan-500 to-blue-600" },
  { name: "TV", icon: Tv, href: "/tv", color: "from-violet-500 to-purple-600" },
  { name: "Electricity", icon: Zap, href: "/electricity", color: "from-amber-400 to-orange-500" },
  { name: "Convert", icon: ArrowUpDown, href: "/convert", color: "from-blue-500 to-violet-600" },
];

interface QuickActionsProps {
  wallet?: { address?: string; signer?: any }; // Extend with signer if available
  chainId?: number;
}

export function QuickActions({ wallet, chainId }: QuickActionsProps) {
  const [showModal, setShowModal] = useState(false);
  const [isSweeping, setIsSweeping] = useState(false);
  const [sweepError, setSweepError] = useState<string | null>(null);

  const { preparedData, isPreparing, refresh, error: prepError } = useSweepPreparation(
    wallet?.address,
    chainId
  );

  const handleOpenModal = useCallback(() => {
    if (!wallet?.address) {
      alert("Please connect your wallet first.");
      return;
    }
    if (chainId !== 8453) {
      alert("Wallet Sweep is only available on Base network (8453).");
      return;
    }
    setSweepError(null);
    setShowModal(true);
  }, [wallet?.address, chainId]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSweepError(null);
  }, []);

  const handleConfirmSweep = useCallback(async () => {
    if (!preparedData?.ready || !wallet?.address) {
      setSweepError("Portfolio data is not ready. Please try again.");
      return;
    }

    setIsSweeping(true);
    setSweepError(null);

    try {
      console.log("[QuickActions] Starting sweep with pre-cached data...");
      console.log("Portfolio:", preparedData.portfolio);

      // TODO: Replace with your actual sweep execution logic
      // This runs synchronously from cached data (no extra RPC calls)
      // await executeSweepTransaction(preparedData, wallet.signer);

      // Simulate success for now
      await new Promise(resolve => setTimeout(resolve, 1200));

      alert("✅ Sweep transaction initiated! Check your wallet.");
      handleCloseModal();

    } catch (err: any) {
      console.error("[QuickActions] Sweep failed:", err);
      setSweepError(err.message || "Transaction failed. Please try again.");
    } finally {
      setIsSweeping(false);
    }
  }, [preparedData, wallet?.address, handleCloseModal]);

  const isButtonDisabled = !wallet?.address || isPreparing;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {/* Regular Utility Actions */}
        {baseActions.map((action) => (
          <a
            key={action.name}
            href={action.href + (wallet?.address ? `?wallet=${wallet.address}` : "")}
            className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-200 p-4 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-white/10 dark:hover:border-blue-900 active:scale-[0.985]"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-sm transition-transform group-hover:scale-110`}>
              <action.icon className="h-5.5 w-5.5" />
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {action.name}
            </span>
          </a>
        ))}

        {/* Emerald Sweep Button */}
        <button
          onClick={handleOpenModal}
          disabled={isButtonDisabled}
          className="group flex flex-col items-center gap-2 rounded-2xl border border-emerald-200 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-emerald-900/50 dark:hover:border-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed w-full bg-emerald-50/50 dark:bg-emerald-950/30"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm transition-transform group-hover:scale-110">
            {isPreparing ? (
              <Loader2 className="h-5.5 w-5.5 animate-spin" />
            ) : (
              <ShieldCheck className="h-5.5 w-5.5" />
            )}
          </div>
          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            {isPreparing ? "Preparing..." : "Verify & Sweep"}
          </span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-gray-900">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold">Confirm Wallet Sweep</h3>
              <button 
                onClick={handleCloseModal} 
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {preparedData?.ready ? (
                <>
                  <div className="rounded-2xl bg-emerald-50 p-5 dark:bg-emerald-950/50">
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">Assets Ready to Sweep</p>
                    <p className="text-4xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">
                      {preparedData.portfolio?.length || 0}
                    </p>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Estimated Gas</span>
                    <span className="font-medium">{preparedData.estimatedGas} ETH</span>
                  </div>

                  {prepError && (
                    <p className="text-amber-600 text-sm">Warning: {prepError}</p>
                  )}
                </>
              ) : (
                <div className="py-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-slate-400" />
                  <p className="text-slate-500">Preparing your portfolio...</p>
                </div>
              )}
            </div>

            {sweepError && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
                {sweepError}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                disabled={isSweeping}
                className="flex-1 rounded-2xl border border-slate-200 py-3.5 text-sm font-medium hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmSweep}
                disabled={!preparedData?.ready || isSweeping}
                className="flex-1 rounded-2xl bg-emerald-600 py-3.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.985]"
              >
                {isSweeping ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm & Execute Sweep"
                )}
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              This will prompt your wallet to sign the transaction using pre-fetched data.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickActions;