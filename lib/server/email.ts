import { Resend } from "resend"
import { cardEmailHtml } from "@/lib/card"

const apiKey = process.env.RESEND_API_KEY
const from = process.env.EMAIL_FROM || "MintPay <support@mintpay.com>"
const APP_URL = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "https://www.mintpay.app"
const LOGO_URL = process.env.EMAIL_LOGO_URL // optional absolute PNG; falls back to a CSS badge

function client(): Resend {
  if (!apiKey) throw new Error("RESEND_API_KEY is not set")
  return new Resend(apiKey)
}

function esc(s: string) {
  return (s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string))
}

const brandBadge = LOGO_URL
  ? `<img src="${LOGO_URL}" width="38" height="38" alt="MintPay" style="display:block;border-radius:11px;" />`
  : `<table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="38" height="38" align="center" valign="middle" bgcolor="#4F46E5" style="background:#4F46E5;background:linear-gradient(135deg,#2563EB,#7C3AED);border-radius:11px;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:21px;font-weight:bold;line-height:38px;">M</td></tr></table>`

function button(text: string, url: string) {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0;">
    <tr>
      <td align="center" bgcolor="#4F46E5" style="background:#4F46E5;background:linear-gradient(135deg,#2563EB,#7C3AED);border-radius:999px;">
        <a href="${url}" style="display:inline-block;padding:13px 30px;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:bold;font-size:14px;">${esc(text)}</a>
      </td>
    </tr>
  </table>`
}

function layout(opts: { preheader: string; heading: string; body: string }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:#f4f5fb;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#f4f5fb;">${esc(opts.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#f4f5fb">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #ecedf5;border-radius:18px;overflow:hidden;">
        <tr><td style="padding:22px 32px;border-bottom:1px solid #f1f2f8;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td valign="middle">${brandBadge}</td>
            <td valign="middle" style="padding-left:11px;font-family:Arial,Helvetica,sans-serif;font-size:19px;font-weight:bold;color:#0f172a;">MintPay</td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:34px 32px 8px 32px;">
          <h1 style="margin:0 0 14px 0;font-family:Arial,Helvetica,sans-serif;font-size:23px;line-height:1.3;color:#0f172a;">${opts.heading}</h1>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#475569;">${opts.body}</div>
        </td></tr>
        <tr><td style="padding:24px 32px 28px 32px;">
          <div style="border-top:1px solid #f1f2f8;padding-top:18px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#94a3b8;">
            MintPay is non-custodial — we never hold your funds or your keys.<br>
            You're receiving this because a wallet was connected to MintPay. If that wasn't you, you can ignore this email.
          </div>
        </td></tr>
      </table>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#b0b6c9;padding:16px 0;">© ${new Date().getFullYear()} MintPay</div>
    </td></tr>
  </table>
</body></html>`
}

const walletChip = (addr: string) =>
  `<span style="display:inline-block;background:#eef2ff;color:#4338ca;font-family:'Courier New',monospace;font-size:13px;padding:4px 10px;border-radius:999px;">${addr.slice(0, 8)}…${addr.slice(-6)}</span>`

// Welcome + card in one polished email (used at onboarding).
export async function sendWelcomeCardEmail(
  to: string,
  data: { name?: string; walletAddress: string; card: { holder: string; number: string; expiry: string } },
) {
  const hi = data.name ? `, ${esc(data.name.split(" ")[0])}` : ""
  const body = `
    <p style="margin:0 0 16px 0;">Your wallet is connected and your MintPay card is ready. Here it is:</p>
    <div style="margin:22px 0;">${cardEmailHtml(data.card)}</div>
    <p style="margin:16px 0;">Wallet: ${walletChip(data.walletAddress)}</p>
    ${button("Open MintPay", APP_URL)}
    <p style="margin:18px 0 0 0;color:#64748b;font-size:13px;">Keep your card details private — treat them like any other card.</p>`
  return client().emails.send({
    from, to,
    subject: "Welcome to MintPay — your card is ready",
    html: layout({ preheader: "Your MintPay card is ready.", heading: `Welcome to MintPay${hi} 🎉`, body }),
  })
}

// Card-only email (used by the profile "re-send card" button).
export async function sendCardEmail(to: string, card: { holder: string; number: string; expiry: string }) {
  const body = `
    <p style="margin:0 0 16px 0;">Here's your MintPay card, <b>${esc(card.holder)}</b>:</p>
    <div style="margin:22px 0;">${cardEmailHtml(card)}</div>
    ${button("Open MintPay", APP_URL)}
    <p style="margin:18px 0 0 0;color:#64748b;font-size:13px;">Keep these details private.</p>`
  return client().emails.send({
    from, to,
    subject: "Your MintPay card",
    html: layout({ preheader: "Your MintPay card details.", heading: "Your MintPay card", body }),
  })
}

/* ------------------------------------------------------------------ support */

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "support@mintpay.com"

/** New support message -> notify the admin inbox (so nothing is lost). */
export async function sendSupportAlert(name: string, email: string, text: string, threadId: string) {
  if (!apiKey) return
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
    ${brandBadge}
    <h2 style="font-size:18px;margin:18px 0 4px;">New support message</h2>
    <p style="color:#6E7381;font-size:13px;margin:0 0 18px;">From ${esc(name)} &lt;${esc(email)}&gt;</p>
    <div style="background:#F7F8FA;border-radius:12px;padding:16px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${esc(text)}</div>
    ${button("Open the dashboard", `${APP_URL}/admin`)}
    <p style="color:#9AA0AE;font-size:12px;">Thread ${esc(threadId)}</p>
  </div>`
  await client().emails.send({
    from,
    to: SUPPORT_EMAIL,
    replyTo: email,
    subject: `Support — ${name}`,
    html,
  })
}

/** Admin reply -> email the customer a copy. */
export async function sendSupportReply(to: string, name: string, text: string) {
  if (!apiKey) return
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
    ${brandBadge}
    <h2 style="font-size:18px;margin:18px 0 10px;">Hi ${esc(name)}, here's a reply from MintPay support</h2>
    <div style="background:#F7F8FA;border-radius:12px;padding:16px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${esc(text)}</div>
    <p style="color:#6E7381;font-size:13px;margin-top:18px;">Reply to this email and it reaches us at ${esc(SUPPORT_EMAIL)}.</p>
  </div>`
  await client().emails.send({
    from,
    to,
    replyTo: SUPPORT_EMAIL,
    subject: "Re: your MintPay support request",
    html,
  })
}
