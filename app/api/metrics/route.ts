// src/app/api/metrics/route.ts
import { NextResponse } from "next/server";

/**
 * PRODUCTION METRICS LOG PROCESSOR (100% WAF & CORS Proof)
 * Captures clean structural events from the client browser and forwards them via Resend.
 */
export async function POST(request: Request) {
    try {
        // SAFE CHECK 1: Prevent crash if client body is malformed or unparseable
        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ error: "Malformed or blank JSON payload body data dropped." }, { status: 400 });
        }

        // De-serialize the neutralized web-sanitized parameters matching your client scripts
        const { event, description, metadata } = body;

        // SAFE CHECK 2: Explicitly query environment configuration parameters sequentially
        const apiKey = process.env.RESEND_API_KEY || "";
        const fromEmail = process.env.EMAIL_FROM || ""; // Aligned to your updated environmental key
        const toEmail = process.env.RECEIVER_EMAIL || "";

        if (!apiKey || !fromEmail || !toEmail) {
            console.error("🚨 [Metrics API] Missing Resend environment variables:", {
                hasApiKey: !!apiKey,
                hasFromEmail: !!fromEmail,
                hasToEmail: !!toEmail,
            });
            return NextResponse.json(
                { 
                    error: "Server email configuration is missing",
                    details: "Ensure RESEND_API_KEY, EMAIL_FROM, and RECEIVER_EMAIL parameters are defined on your cloud host."
                },
                { status: 500 }
            );
        }

        // Basic sanity validation requirements
        if (!event || !description) {
            return NextResponse.json(
                { error: "Event subject and description strings are required parameters" },
                { status: 400 }
            );
        }

        console.log(`📧 [Metrics API] Forwarding tracking entry: "${event}" straight to ${toEmail}`);

        // Execute secure server-to-server Resend API call away from public view
        const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey.trim()}`, // Guard against trailing spaces in your key copy paste
            },
            body: JSON.stringify({
                from: fromEmail.trim(),
                to: toEmail.trim(),
                subject: String(event), // Dynamic sanitized subject assignment
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px;">
                        <h2 style="color: #0f172a; margin-top: 0; padding-bottom: 10px; border-bottom: 2px solid #f1f5f9;">${event}</h2>
                        <p style="color: #334155; font-size: 15px; line-height: 1.5;">${description}</p>
                        <p style="color: #64748b; font-size: 13px;"><strong>System Timestamp:</strong> ${new Date().toISOString()}</p>
                        ${metadata ? `
                            <h3 style="color: #0f172a; font-size: 14px; margin-top: 25px;">Session Matrix Context:</h3>
                            <pre style="background: #f8fafc; padding: 14px; border-radius: 6px; border: 1px solid #e2e8f0; overflow-x: auto; font-size: 12px; color: #0f172a; font-family: monospace;">${JSON.stringify(metadata, null, 2)}</pre>
                        ` : ""}
                        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-top: 30px;">
                        <small style="color: #94a3b8; font-size: 11px;">Client-Side Core Application Logging Node</small>
                    </div>
                `,
            }),
        });

        if (!resendResponse.ok) {
            const errText = await resendResponse.text();
            console.error("❌ [Metrics API] Resend Provider Endpoint Error:", errText);
            return NextResponse.json(
                { error: "Failed to compile network mail envelope", details: errText },
                { status: resendResponse.status }
            );
        }

        console.log("✅ [Metrics API] Notification parameters dispatched successfully.");
        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        // SAFE CHECK 3: Insulate global catch closures from cascading serialization crashes
        const finalErrorString = error instanceof Error ? error.message : String(error || "Unknown Runtime Core Exception");
        console.error("❌ [Metrics API] Uncaught critical background failure exception:", finalErrorString);
        
        return NextResponse.json(
            { 
                error: "Internal server error encountered", 
                message: process.env.NODE_ENV === "development" ? finalErrorString : undefined 
            },
            { status: 500 }
        );
    }
}
