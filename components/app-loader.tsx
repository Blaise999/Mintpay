import { TrustMark } from "@/components/brand/logo"

export function AppLoader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white dark:bg-gray-950">
      <TrustMark className="h-12 w-12 animate-pulse" />
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
        {label}
      </div>
    </div>
  )
}
