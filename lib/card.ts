/**
 * Trust display card. This generates a Trust-branded card number for the
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
  let body = "7042" // neutral Trust prefix (not a card-network BIN)
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

/** Branded Trust credit-card block for emails (table-based, solid fallback). */
export function cardEmailHtml(opts: { holder: string; number: string; expiry: string }): string {
  const num = groupNumber(opts.number)
  const holder = escapeHtml(opts.holder || "Trust MEMBER")
  return `
  <table role="presentation" width="360" cellpadding="0" cellspacing="0" style="max-width:360px;width:100%;border-collapse:separate;">
    <tr>
      <td bgcolor="#4338CA" style="background:#4338CA;background:linear-gradient(135deg,#1E40AF 0%,#4338CA 55%,#6D28D9 100%);border-radius:18px;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#ffffff;box-shadow:0 10px 30px rgba(67,56,202,0.35);">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-size:19px;font-weight:bold;letter-spacing:0.3px;color:#ffffff;">
              Trust
              <div style="font-size:9px;font-weight:bold;letter-spacing:2px;color:#dbeafe;margin-top:2px;">CREDIT</div>
            </td>
            <td align="right" valign="top" style="font-size:11px;letter-spacing:1px;color:#c7d2fe;">CARD</td>
          </tr>
        </table>
        <div style="width:46px;height:34px;background:#FCD34D;border-radius:7px;margin:26px 0 18px 0;"></div>
        <div style="font-family:'Courier New',Courier,monospace;font-size:21px;letter-spacing:3px;color:#ffffff;">${num}</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
          <tr>
            <td style="font-size:9px;letter-spacing:1px;color:#c7d2fe;text-transform:uppercase;">
              Card holder<br>
              <span style="font-size:14px;color:#ffffff;letter-spacing:0.5px;">${holder}</span>
            </td>
            <td align="right" style="font-size:9px;letter-spacing:1px;color:#c7d2fe;text-transform:uppercase;">
              Expires<br>
              <span style="font-size:14px;color:#ffffff;">${opts.expiry}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string))
}
