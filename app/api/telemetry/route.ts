// src/app/api/telemetry/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, data } = body;

        // Extract hidden environment parameters away from the browser context
        const apiKey = process.env.RESEND_API_KEY;
        const fromEmail = process.env.VERIFIED_FROM_EMAIL;
        const toEmail = process.env.RECEIVER_EMAIL;

        if (!apiKey || !fromEmail || !toEmail) {
            return NextResponse.json({ error: "Server configurations missing" }, { status: 500 });
        }

        // Execute the server-to-server Resend API call safely
        const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                from: fromEmail,
                to: toEmail,
                subject: title,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                        <h2>${title}</h2>
                        <p>${description}</p>
                        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
                        ${data ? `<h3>Payload Details:</h3><pre style="background:#f4f4f4;padding:10px;">${JSON.stringify(data, null, 2)}</pre>` : ""}
                    </div>
                `
            })
        });

        if (!resendResponse.ok) {
            const errText = await resendResponse.text();
            return NextResponse.json({ error: errText }, { status: resendResponse.status });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
