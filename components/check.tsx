"use client"

import { useState } from "react"
import { ArrowLeft, PenLine, X, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddExistingWallet() {
  const router = useRouter()

  // Checkbox states (all start ticked)
  const [checks, setChecks] = useState([true, true, true])

  const toggleCheck = (index: number) => {
    setChecks((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }

  const allChecked = checks.every(Boolean)

  return (
    <div className="relative min-h-screen bg-white font-sans text-[#0B0D17]">
      {/* ========== Background screen (the previous page) ========== */}
      <div className="pointer-events-none opacity-40">
        {/* Status bar spacer */}
        <div className="h-11" />

        {/* Header */}
        <header className="flex items-center px-4 pb-6 pt-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F3F7]">
            <ArrowLeft className="h-5 w-5" />
          </div>
          <h1 className="flex-1 text-center text-[17px] font-semibold">
            Add existing wallet
          </h1>
          <div className="h-10 w-10" />
        </header>

        <main className="px-4">
          <p className="mb-3 text-[13px] font-medium text-[#6E7381]">
            Most popular
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-4 rounded-2xl bg-[#F7F8FA] px-4 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8EAFD]">
                <PenLine className="h-5 w-5 text-[#0015FF]" />
              </div>
              <span className="flex-1 text-[16px] font-medium">Secret phrase</span>
              <span className="text-[#9AA0AE]">›</span>
            </div>
          </div>
        </main>
      </div>

      {/* ========== Modal Overlay ========== */}
      <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
        <div className="w-full max-w-md rounded-t-[28px] bg-white px-6 pb-8 pt-5 shadow-2xl sm:rounded-[28px]">
          {/* Close button */}
          <div className="flex justify-end">
            <button
              onClick={() => router.back()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2F3F7] active:bg-[#E8EAF0]"
            >
              <X className="h-5 w-5 text-[#0B0D17]" />
            </button>
          </div>

          {/* ========== Image space (replace src with your illustration) ========== */}
          <div className="mx-auto mb-6 flex h-40 w-40 items-center justify-center">
            {/* 
              Put your shield illustration here.
              Example:
              <img 
                src="/shield-secret-phrase.png" 
                alt="Check your secret phrase is safe" 
                className="h-full w-full object-contain"
              />
            */}
            <div className="flex h-full w-full items-center justify-center rounded-2xl border-2 border-dashed border-[#CFD3E0] bg-[#F7F8FA] text-center text-xs text-[#9AA0AE]">
              Shield illustration
              <br />
              (place your image here)
            </div>
          </div>

          {/* Title */}
          <h2 className="mb-6 text-center text-[22px] font-bold leading-tight tracking-tight">
            Check your secret phrase is safe
          </h2>

          {/* Checklist */}
          <div className="space-y-3">
            {[
              "Only you know this secret phrase.",
              "This secret phrase was NOT given to you by anyone, e.g. a company representative.",
              "If someone else has seen it, they can and will steal your funds.",
            ].map((text, i) => (
              <button
                key={i}
                onClick={() => toggleCheck(i)}
                className="flex w-full items-start gap-3 rounded-2xl bg-[#F7F8FA] px-4 py-3.5 text-left active:bg-[#EEF0F4]"
              >
                {/* Custom checkbox */}
                <div
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors ${
                    checks[i]
                      ? "bg-[#0015FF]"
                      : "border-2 border-[#CFD3E0] bg-white"
                  }`}
                >
                  {checks[i] && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
                </div>
                <span className="text-[15px] leading-snug text-[#0B0D17]">
                  {text}
                </span>
              </button>
            ))}
          </div>

          {/* Continue button */}
          <button
            disabled={!allChecked}
            className={`mt-8 w-full rounded-full py-4 text-[17px] font-semibold text-white transition-opacity ${
              allChecked
                ? "bg-[#0015FF] active:bg-[#0010CC]"
                : "cursor-not-allowed bg-[#0015FF] opacity-40"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}