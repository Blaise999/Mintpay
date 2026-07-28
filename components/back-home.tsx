import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BackHome() {
  return (
    <Link
      href="/"
      className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-blue-600"
    >
      <ArrowLeft className="h-4 w-4" /> Back to Trust
    </Link>
  )
}
