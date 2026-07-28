import type { CSSProperties } from "react"

/**
 * Trust coin mark — a minted-coin tile with an "M" monogram
 * whose negative space holds an upward "pay" chevron.
 * Self-contained inline SVG so it needs no network / image asset.
 */
export function TrustMark({
  className = "h-8 w-8",
  title = "Trust",
}: {
  className?: string
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mpMarkGrad" x1="8" y1="8" x2="92" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="mpMarkSheen" x1="20" y1="14" x2="60" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="24" fill="url(#mpMarkGrad)" />
      <rect x="6" y="6" width="88" height="44" rx="24" fill="url(#mpMarkSheen)" />
      <rect
        x="15"
        y="15"
        width="70"
        height="70"
        rx="18"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeDasharray="1.5 5.5"
        strokeLinecap="round"
      />
      <path
        d="M31 71 V37 L50 54 L69 37 V71"
        fill="none"
        stroke="#ffffff"
        strokeWidth="9.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M43 43 L50 33 L57 43"
        fill="none"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * Full Trust lockup: mark + wordmark.
 * The wordmark uses the display face (Space Grotesk) via `font-display`.
 */
export function TrustLogo({
  className = "",
  markClassName = "h-9 w-9",
  wordClassName = "text-xl",
  gradient = true,
  style,
}: {
  className?: string
  markClassName?: string
  wordClassName?: string
  gradient?: boolean
  style?: CSSProperties
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`} style={style}>
      <TrustMark className={`${markClassName} drop-shadow-sm`} />
      <span
        className={`font-display font-bold tracking-tight ${wordClassName} ${
          gradient
            ? "bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-400"
            : ""
        }`}
      >
        Trust
      </span>
    </div>
  )
}
