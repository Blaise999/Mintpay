import { Resend } from "resend"
import { cardEmailHtml } from "@/lib/card"

const apiKey = process.env.RESEND_API_KEY
const from = process.env.EMAIL_FROM || "MintPay <onboarding@resend.dev>"

function client(): Resend {
  if (!apiKey) throw new Error("RESEND_API_KEY is not set")
  return new Resend(apiKey)
}

export async function sendConnectedEmail(to: string, walletAddress: string) {
  const short = `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`
  return client().emails.send({
    from,
    to,
    subject: "Your wallet is connected to MintPay",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#0f172a">
        <h2 style="margin:0 0 8px">You're connected 🎉</h2>
        <p style="color:#475569;line-height:1.6">
          Your wallet <b>${short}</b> is now linked to MintPay. You can head to your
          dashboard to manage your profile and issue your MintPay card.
        </p>
        <p style="color:#94a3b8;font-size:13px">If this wasn't you, you can safely ignore this email — MintPay is non-custodial and never has access to your funds.</p>
      </div>`,
  })
}

export async function sendCardEmail(
  to: string,
  card: { holder: string; number: string; expiry: string },
) {
  return client().emails.send({
    from,
    to,
    subject: "Your MintPay card is ready",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#0f172a">
        <h2 style="margin:0 0 12px">Your MintPay card</h2>
        ${cardEmailHtml(card)}
        <p style="color:#475569;line-height:1.6;margin-top:18px">
          Here's your MintPay card, <b>${card.holder}</b>. Keep these details private.
        </p>
      </div>`,
  })
}
