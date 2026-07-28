import type React from "react"

/**
 * Original holographic / isometric illustration set for Trust.
 * All hand-built SVG — no third-party or copied assets.
 * Palette: blue -> violet with cyan/fuchsia iridescent edges.
 * Shared gradients live in <HoloDefs/> (render once per page) and are
 * referenced document-wide by id.
 */

export function HoloDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <defs>
        {/* Palette: electric blue -> mint green, pastel iridescent edges. */}
        <linearGradient id="holo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5EEAA0" />
          <stop offset="0.38" stopColor="#38BDF8" />
          <stop offset="0.72" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#F5A9E8" />
        </linearGradient>
        <linearGradient id="holoRev" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A7F3D0" />
          <stop offset="0.45" stopColor="#60A5FA" />
          <stop offset="1" stopColor="#F0ABFC" />
        </linearGradient>
        <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0015FF" />
          <stop offset="1" stopColor="#4ADE80" />
        </linearGradient>
        <linearGradient id="cardG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0015FF" />
          <stop offset="0.5" stopColor="#2775E8" />
          <stop offset="1" stopColor="#4EE79A" />
        </linearGradient>
        <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#86EFAC" />
          <stop offset="0.5" stopColor="#93C5FD" />
          <stop offset="1" stopColor="#F5A9E8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* --- Holographic coin, gently tilted for an iso feel --- */
export function Coin({
  symbol = "$",
  className = "h-16 w-16",
  style,
}: {
  symbol?: "$" | "E" | "T" | "B"
  className?: string
  style?: React.CSSProperties
}) {
  const glyph: Record<string, React.ReactNode> = {
    $: <path d="M50 30 v40 M42 38 q0 -8 8 -8 h4 q7 0 7 7 t-7 7 h-4 q-7 0 -7 7 t7 7 h4 q8 0 8 -8" fill="none" stroke="#0B1220" strokeOpacity="0.55" strokeWidth="4.5" strokeLinecap="round" />,
    E: <path d="M42 34 h16 M42 50 h13 M42 66 h16 M42 34 v32" fill="none" stroke="#0B1220" strokeOpacity="0.55" strokeWidth="4.5" strokeLinecap="round" />,
    T: <path d="M38 36 h24 M50 36 v30" fill="none" stroke="#0B1220" strokeOpacity="0.55" strokeWidth="4.5" strokeLinecap="round" />,
    B: <path d="M44 32 v36 M44 32 h9 q7 0 7 8 t-7 8 h-9 M44 50 h11 q7 0 7 8 t-7 8 h-11" fill="none" stroke="#0B1220" strokeOpacity="0.55" strokeWidth="4.5" strokeLinecap="round" />,
  }
  return (
    <svg viewBox="0 0 100 108" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      {/* thickness / side */}
      <ellipse cx="50" cy="60" rx="44" ry="40" fill="#0B1220" opacity="0.18" />
      <path d="M6 54 a44 40 0 0 0 88 0 v8 a44 40 0 0 1 -88 0 z" fill="url(#holoRev)" />
      {/* top face */}
      <ellipse cx="50" cy="54" rx="44" ry="40" fill="url(#holo)" />
      <ellipse cx="50" cy="54" rx="44" ry="40" fill="url(#sheen)" opacity="0.5" />
      <ellipse cx="50" cy="54" rx="35" ry="31" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
      {glyph[symbol]}
    </svg>
  )
}

/* --- The Trust card (glossy, slight tilt) --- */
export function CardArt({ className = "w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 224" className={className} xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(-6 180 112)">
        <rect x="6" y="10" width="348" height="204" rx="22" fill="#0B1220" opacity="0.22" />
        <rect x="0" y="0" width="348" height="204" rx="22" fill="url(#cardG)" />
        <rect x="0" y="0" width="348" height="102" rx="22" fill="url(#sheen)" opacity="0.35" />
        {/* iridescent stripe */}
        <path d="M0 150 h348 v34 a22 22 0 0 1 -22 20 h-304 a22 22 0 0 1 -22 -20 z" fill="url(#holo)" opacity="0.85" />
        {/* logo mark + name */}
        <g transform="translate(26 24)">
          <rect x="0" y="0" width="34" height="34" rx="10" fill="#ffffff" fillOpacity="0.16" stroke="#ffffff" strokeOpacity="0.5" />
          <path d="M9 26 V11 L17 18 L25 11 V26" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M13.5 13 L17 8.5 L20.5 13" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
          <text x="44" y="22" fill="#ffffff" fontFamily="'Outfit', sans-serif" fontSize="22" fontWeight="700" letterSpacing="-0.5">Trust</text>
          <text x="45" y="34" fill="#ffffff" fillOpacity="0.75" fontFamily="'Outfit', sans-serif" fontSize="8" fontWeight="700" letterSpacing="2">CREDIT</text>
        </g>
        {/* contactless */}
        <g transform="translate(300 26)" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M0 8 a12 12 0 0 1 0 20" />
          <path d="M8 2 a20 20 0 0 1 0 32" />
        </g>
        {/* chip */}
        <rect x="30" y="96" width="46" height="34" rx="7" fill="#FCD34D" opacity="0.9" />
        <path d="M53 96 v34 M30 108 h46 M30 118 h46" stroke="#B45309" strokeOpacity="0.5" strokeWidth="1.5" />
        {/* number */}
        <text x="30" y="170" fill="#ffffff" fillOpacity="0.9" fontFamily="'Outfit', monospace" fontSize="17" letterSpacing="3">••••  ••••  ••••  0927</text>
      </g>
    </svg>
  )
}

/* --- Simple iridescent props (shield / padlock / wifi / cloud) --- */
export function Shield({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <path d="M50 8 L86 22 v28 c0 24 -18 36 -36 44 C32 86 14 74 14 50 V22 z" fill="url(#holo)" />
      <path d="M50 8 L86 22 v28 c0 24 -18 36 -36 44 z" fill="#0B1220" opacity="0.14" />
      <path d="M50 8 L86 22 v28 c0 24 -18 36 -36 44 C32 86 14 74 14 50 V22 z" fill="url(#sheen)" opacity="0.35" />
      <path d="M36 50 l10 10 20 -22" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Padlock({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M32 46 V34 a18 18 0 0 1 36 0 v12" fill="none" stroke="url(#edge)" strokeWidth="9" strokeLinecap="round" />
      <rect x="22" y="44" width="56" height="42" rx="12" fill="url(#holo)" />
      <rect x="22" y="44" width="56" height="21" rx="12" fill="url(#sheen)" opacity="0.4" />
      <circle cx="50" cy="63" r="6" fill="#0B1220" opacity="0.6" />
      <rect x="47" y="63" width="6" height="12" rx="3" fill="#0B1220" opacity="0.6" />
    </svg>
  )
}

export function WifiArt({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="url(#holo)" strokeWidth="10" strokeLinecap="round">
        <path d="M22 46 a40 40 0 0 1 56 0" />
        <path d="M34 60 a24 24 0 0 1 32 0" />
      </g>
      <circle cx="50" cy="76" r="7" fill="url(#holoRev)" />
    </svg>
  )
}

export function CloudArt({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M34 78 a22 22 0 0 1 -2 -44 a26 26 0 0 1 50 -4 a20 20 0 0 1 6 48 z" fill="url(#holo)" />
      <path d="M34 78 a22 22 0 0 1 -2 -44 a26 26 0 0 1 50 -4 a20 20 0 0 1 6 48 z" fill="url(#sheen)" opacity="0.3" />
    </svg>
  )
}

/* --- Phone frame wrapper --- */
function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 300 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="288" height="588" rx="46" fill="#0B0F1A" stroke="#1E293B" strokeWidth="3" />
      <rect x="16" y="16" width="268" height="568" rx="38" fill="#0B0F1A" />
      <rect x="112" y="24" width="76" height="9" rx="4.5" fill="#1E293B" />
      <g transform="translate(16 44)">{children}</g>
      <rect x="120" y="576" width="60" height="5" rx="2.5" fill="#334155" />
    </svg>
  )
}

/* Wallet home screen (balance + actions + token list) */
export function PhoneWallet({ className = "w-full" }: { className?: string }) {
  const rows = [
    { s: "BTC", c: "#F7931A", p: "$103,299", d: "0.0068" },
    { s: "ETH", c: "#627EEA", p: "$2,410", d: "0.055" },
    { s: "USDT", c: "#26A17B", p: "$1.00", d: "53.43" },
  ]
  return (
    <Phone className={className}>
      <g fontFamily="'Plus Jakarta Sans', sans-serif">
        <text x="18" y="16" fill="#64748B" fontSize="11">9:41</text>
        <text x="134" y="44" fill="#94A3B8" fontSize="12">My wallet</text>
        <text x="134" y="78" fill="#F8FAFC" fontSize="30" fontWeight="700" textAnchor="middle">$1,228.20</text>
        <text x="134" y="98" fill="#34D399" fontSize="12" textAnchor="middle">▲ $23.58 (+0.6%)</text>
        {/* actions */}
        {["Send", "Receive", "Buy", "Sell"].map((a, i) => (
          <g key={a} transform={`translate(${22 + i * 62} 118)`}>
            <rect width="46" height="46" rx="14" fill="#151B2B" />
            <rect x="13" y="13" width="20" height="20" rx="6" fill="url(#brand)" />
            <text x="23" y="62" fill="#94A3B8" fontSize="10" textAnchor="middle">{a}</text>
          </g>
        ))}
        {/* promo */}
        <rect x="22" y="192" width="224" height="44" rx="12" fill="#12203A" />
        <rect x="34" y="204" width="20" height="20" rx="5" fill="url(#holo)" />
        <text x="64" y="212" fill="#CBD5E1" fontSize="10">Add funds from your wallet</text>
        <text x="64" y="226" fill="#60A5FA" fontSize="10" fontWeight="700">Top up →</text>
        {/* tabs */}
        <text x="30" y="264" fill="#F8FAFC" fontSize="12" fontWeight="700">Crypto</text>
        <text x="90" y="264" fill="#475569" fontSize="12">NFT</text>
        <line x1="22" y1="274" x2="246" y2="274" stroke="#1E293B" />
        {rows.map((r, i) => (
          <g key={r.s} transform={`translate(0 ${288 + i * 44})`}>
            <circle cx="36" cy="16" r="13" fill={r.c} opacity="0.9" />
            <text x="36" y="20" fill="#fff" fontSize="9" fontWeight="700" textAnchor="middle">{r.s[0]}</text>
            <text x="58" y="13" fill="#F1F5F9" fontSize="12" fontWeight="700">{r.s}</text>
            <text x="58" y="27" fill="#64748B" fontSize="10">{r.p}</text>
            <text x="246" y="20" fill="#F1F5F9" fontSize="12" fontWeight="700" textAnchor="end">{r.d}</text>
          </g>
        ))}
        {/* bottom nav */}
        <line x1="0" y1="470" x2="268" y2="470" stroke="#1E293B" />
        {["Home", "Trade", "Swap", "Earn", "More"].map((n, i) => (
          <text key={n} x={30 + i * 54} y="492" fill={i === 0 ? "#60A5FA" : "#475569"} fontSize="9" textAnchor="middle">{n}</text>
        ))}
      </g>
    </Phone>
  )
}

/* Receive screen with a stylized QR */
export function PhoneReceive({ className = "w-full" }: { className?: string }) {
  // deterministic pseudo-QR
  const cells: React.ReactNode[] = []
  let seed = 7
  const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff)
  for (let y = 0; y < 21; y++) {
    for (let x = 0; x < 21; x++) {
      const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)
      if (finder) continue
      if (rnd() > 0.55) cells.push(<rect key={`${x}-${y}`} x={x * 8} y={y * 8} width="8" height="8" fill="#0B0F1A" />)
    }
  }
  const Finder = ({ x, y }: { x: number; y: number }) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="56" height="56" fill="#0B0F1A" />
      <rect x="8" y="8" width="40" height="40" fill="#fff" />
      <rect x="16" y="16" width="24" height="24" fill="#0B0F1A" />
    </g>
  )
  return (
    <Phone className={className}>
      <g fontFamily="'Plus Jakarta Sans', sans-serif">
        <text x="134" y="30" fill="#F8FAFC" fontSize="13" fontWeight="700" textAnchor="middle">Receive</text>
        <rect x="24" y="46" width="220" height="34" rx="8" fill="#2A2410" />
        <text x="134" y="63" fill="#D6B84B" fontSize="9" textAnchor="middle">Only send USDT (TRC20) to this address</text>
        <rect x="52" y="96" width="164" height="164" rx="14" fill="#fff" />
        <g transform="translate(66 110)">
          {cells}
          <Finder x={0} y={0} />
          <Finder x={112} y={0} />
          <Finder x={0} y={112} />
        </g>
        <text x="134" y="286" fill="#94A3B8" fontSize="9" textAnchor="middle">TK86…sjdsyEghsh</text>
        {["Copy", "Amount", "Share"].map((a, i) => (
          <g key={a} transform={`translate(${44 + i * 66} 306)`}>
            <rect width="52" height="52" rx="14" fill="#151B2B" />
            <rect x="16" y="16" width="20" height="20" rx="5" fill="url(#brand)" />
            <text x="26" y="68" fill="#94A3B8" fontSize="10" textAnchor="middle">{a}</text>
          </g>
        ))}
        <rect x="24" y="394" width="220" height="44" rx="12" fill="#0E2A1C" />
        <text x="42" y="414" fill="#E2E8F0" fontSize="10" fontWeight="700">Deposit from exchange</text>
        <text x="42" y="428" fill="#64748B" fontSize="9">Direct transfer from your account</text>
      </g>
    </Phone>
  )
}

/* Tap-to-pay screen */
export function PhoneTap({ className = "w-full" }: { className?: string }) {
  return (
    <Phone className={className}>
      <g fontFamily="'Plus Jakarta Sans', sans-serif">
        <text x="18" y="16" fill="#64748B" fontSize="11">9:41</text>
        <g transform="translate(30 70)">
          <rect width="208" height="128" rx="18" fill="url(#cardG)" />
          <rect width="208" height="64" rx="18" fill="url(#sheen)" opacity="0.3" />
          <g transform="translate(18 20)">
            <rect width="24" height="24" rx="7" fill="#ffffff" fillOpacity="0.16" stroke="#fff" strokeOpacity="0.5" />
            <path d="M6 18 V8 L12 13 L18 8 V18" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
            <text x="32" y="17" fill="#fff" fontFamily="'Outfit',sans-serif" fontSize="15" fontWeight="700">Trust</text>
          </g>
          <text x="18" y="112" fill="#fff" fillOpacity="0.85" fontSize="12" letterSpacing="2">•••• 0927</text>
        </g>
        <circle cx="134" cy="300" r="30" fill="none" stroke="url(#brand)" strokeWidth="4" />
        <rect x="122" y="288" width="24" height="24" rx="5" fill="none" stroke="url(#brand)" strokeWidth="3" />
        <text x="134" y="360" fill="#94A3B8" fontSize="13" textAnchor="middle">Hold near reader</text>
      </g>
    </Phone>
  )
}

/** Floating pay-tag in the Trust-style green, generic wordmark. */
export function PayTag({ label = "Pay", className = "" }: { label?: string; className?: string }) {
  return (
    <svg viewBox="0 0 150 74" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="payG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4EE79A" />
          <stop offset="1" stopColor="#39D98A" />
        </linearGradient>
        <filter id="payShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#0B0D17" floodOpacity="0.22" />
        </filter>
      </defs>
      <g filter="url(#payShadow)">
        <rect x="6" y="10" width="138" height="54" rx="16" fill="url(#payG)" />
        <text x="75" y="45" textAnchor="middle" fontFamily="'Outfit', sans-serif"
          fontSize="30" fontWeight="800" fill="#0B0D17" letterSpacing="-1">{label}</text>
      </g>
    </svg>
  )
}

/** Iridescent 3D coin — the rainbow-chrome discs floating in the Receive screen. */
export function HoloCoin({ glyph = "$", className = "", style }: { glyph?: string; className?: string; style?: React.CSSProperties }) {
  const gid = "hc" + Math.random().toString(36).slice(2, 8)
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid + "rim"} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7DFFB8" />
          <stop offset="0.3" stopColor="#5EE1F5" />
          <stop offset="0.6" stopColor="#B79CFF" />
          <stop offset="1" stopColor="#F5A9E8" />
        </linearGradient>
        <linearGradient id={gid + "face"} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#8DF0C4" />
          <stop offset="0.35" stopColor="#67D9F0" />
          <stop offset="0.7" stopColor="#A99BF7" />
          <stop offset="1" stopColor="#F1A6E6" />
        </linearGradient>
        <filter id={gid + "sh"} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0B0D17" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter={`url(#${gid}sh)`}>
        {/* extruded side */}
        <ellipse cx="50" cy="58" rx="38" ry="34" fill={`url(#${gid}rim)`} opacity="0.55" />
        {/* top face */}
        <ellipse cx="50" cy="50" rx="38" ry="34" fill={`url(#${gid}face)`} />
        <ellipse cx="50" cy="50" rx="30" ry="26" fill="none" stroke="#0B0D17" strokeOpacity="0.18" strokeWidth="2" />
        <text x="50" y="60" textAnchor="middle" fontFamily="'Outfit', sans-serif"
          fontSize="30" fontWeight="800" fill="#0B0D17" fillOpacity="0.72">{glyph}</text>
        {/* sheen */}
        <ellipse cx="40" cy="40" rx="14" ry="9" fill="#fff" opacity="0.35" />
      </g>
    </svg>
  )
}
