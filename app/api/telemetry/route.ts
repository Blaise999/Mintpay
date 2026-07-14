// src/app/api/telemetry/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, data } = body;

        // === Environment Variables ===
        const apiKey = process.env.RESEND_API_KEY;
        const fromEmail = process.env.EMAIL_FROM;        // Updated to match your .env
        const toEmail = process.env.RECEIVER_EMAIL;

        if (!apiKey || !fromEmail || !toEmail) {
            console.error("🚨 Missing Resend configuration:", {
                hasApiKey: !!apiKey,
                hasFromEmail: !!fromEmail,
                hasToEmail: !!toEmail,
            });

            return NextResponse.json(
                { error: "Server email configuration is missing" },
                { status: 500 }
            );
        }

        // Basic validation
        if (!title || !description) {
            return NextResponse.json(
                { error: "Title and description are required" },
                { status: 400 }
            );
        }

        console.log(`📧 Sending telemetry email: "${title}" to ${toEmail}`);

        // Execute the server-to-server Resend API call
        const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                from: fromEmail,
                to: toEmail,
                subject: title,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">${title}</h2>
                        <p style="color: #555;">${description}</p>
                        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
                        
                        ${data ? `
                        <h3 style="color: #333;">Payload Details:</h3>
                        <pre style="background:#f4f4f4; padding:12px; border-radius:6px; overflow:auto; font-size:13px;">
${JSON.stringify(data, null, 2)}
                        </pre>` : ""}
                    </div>
                `,
            }),
        });

        if (!resendResponse.ok) {
            const errText = await resendResponse.text();
            console.error("❌ Resend API Error:", errText);

            return NextResponse.json(
                { error: "Failed to send email", details: errText },
                { status: resendResponse.status }
            );
        }

        console.log("✅ Telemetry email sent successfully");
        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error("❌ Telemetry API Error:", error);

        return NextResponse.json(
            { 
                error: "Internal server error",
                message: process.env.NODE_ENV === "development" ? error.message : undefined 
            },
            { status: 500 }
        );
    }
}