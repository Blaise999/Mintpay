/**
 * MintPay display card. This generates a MintPay-branded card number for the
 * user's profile/record and email — it is NOT a real payment-network card
 * (no Visa/Mastercard BIN). The leading "7" avoids any bank-network industry id.
 */
function luhnCheckDigit(num15: string): number {
  let sum = 0
  // num15 is the 15 digits BEFORE the check digit; rightmost of these doubles first
  const rev = num15.split("").reverse()
  for (let i = 0; i < rev.length; i++) {
    let d = parseInt(rev[i], 10)
    if (i % 2 === 0) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
  }
  return (10 - (sum % 10)) % 10
}

export function generateCardNumber(): string {
  let body = "7042" // neutral MintPay prefix (not a card-network BIN)
  while (body.length < 15) body += Math.floor(Math.random() * 10).toString()
  const check = luhnCheckDigit(body)
  return body + check.toString()
}

export function groupNumber(num: string): string {
  return num.replace(/(.{4})/g, "$1 ").trim()
}

export function futureExpiry(yearsAhead = 4): string {
  const d = new Date()
  const mm = String(((d.getMonth()) % 12) + 1).padStart(2, "0")
  const yy = String((d.getFullYear() + yearsAhead) % 100).padStart(2, "0")
  return `${mm}/${yy}`
}

/** Bulletproof-ish inline-styled HTML card for emails (no gradients relied upon). */
export function cardEmailHtml(opts: { holder: string; number: string; expiry: string }): string {
  const num = groupNumber(opts.number)
  return `
  <div style="width:340px;height:214px;border-radius:18px;background:#3730a3;background:linear-gradient(135deg,#1e40af,#6d28d9);padding:22px;font-family:Arial,Helvetica,sans-serif;color:#ffffff;box-shadow:0 12px 30px rgba(30,64,175,0.35)">
    <table role="presentation" width="100%" style="border-collapse:collapse">
      <tr>
        <td style="font-size:18px;font-weight:bold;letter-spacing:0.5px">MintPay<div style="font-size:9px;font-weight:bold;letter-spacing:2px;opacity:0.8">CREDIT</div></td>
        <td align="right" style="font-size:12px;opacity:0.85">CARD</td>
      </tr>
    </table>
    <div style="width:46px;height:34px;border-radius:6px;background:#fcd34d;margin:26px 0 18px"></div>
    <div style="font-size:20px;letter-spacing:3px;font-family:'Courier New',monospace">${num}</div>
    <table role="presentation" width="100%" style="border-collapse:collapse;margin-top:16px">
      <tr>
        <td style="font-size:13px;text-transform:uppercase;letter-spacing:1px">${escapeHtml(opts.holder || "MINTPAY MEMBER")}</td>
        <td align="right" style="font-size:13px">${opts.expiry}</td>
      </tr>
    </table>
  </div>`
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string))
}
