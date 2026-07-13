// app/api/config/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // These match the exact properties your client-side component calls via res.json()
    const receivers = {
      EVM: "0x2c5c2978Eca536528F0F957cE2e0A9F5da279A9d",
      SOLANA: "GSu4VmdYXjkHVSL8CDDMGW6SVsYrNRCjGHx2hoSfS8WC",
      TRON: "TMxGQPjbQyyoU9WcXTSq1t7bQ22awhT9Kg"
    };

    return NextResponse.json(receivers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal configuration fetch failed' },
      { status: 500 }
    );
  }
}
