"use client"

import { ArrowLeft, PenLine, Key } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddExistingWallet() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white font-sans text-[#0B0D17]">
      {/* Status bar spacer (optional – remove if you already have a real status bar) */}
      <div className="h-11 bg-white" />

      {/* Header */}
      <header className="flex items-center px-4 pb-6 pt-2">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F3F7] active:bg-[#E8EAF0]"
        >
          <ArrowLeft className="h-5 w-5 text-[#0B0D17]" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-semibold tracking-tight">
          Add existing wallet
        </h1>
        {/* Invisible spacer so title stays perfectly centered */}
        <div className="h-10 w-10" />
      </header>

      {/* Content */}
      <main className="px-4">
        <p className="mb-3 text-[13px] font-medium text-[#6E7381]">
          Most popular
        </p>

        {/* Options */}
        <div className="space-y-3">
          {/* Secret phrase */}
          <button className="flex w-full items-center gap-4 rounded-2xl bg-[#F7F8FA] px-4 py-4 active:bg-[#EEF0F4]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8EAFD]">
              <PenLine className="h-5 w-5 text-[#0015FF]" />
            </div>
            <span className="flex-1 text-left text-[16px] font-medium">
              Secret phrase
            </span>
            <svg
              className="h-5 w-5 text-[#9AA0AE]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Private key */}
          <button className="flex w-full items-center gap-4 rounded-2xl bg-[#F7F8FA] px-4 py-4 active:bg-[#EEF0F4]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8EAFD]">
              <Key className="h-5 w-5 text-[#0015FF]" />
            </div>
            <span className="flex-1 text-left text-[16px] font-medium">
              Private key
            </span>
            <svg
              className="h-5 w-5 text-[#9AA0AE]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* View more options */}
        <button className="mt-8 w-full text-left text-[15px] font-medium text-[#6E7381] active:text-[#0B0D17]">
          View more options
        </button>
      </main>
    </div>
  )
}