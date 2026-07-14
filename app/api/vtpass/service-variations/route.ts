import { NextResponse } from "next/server"
export const runtime = "nodejs"

// USD-priced sample plans so the dropdowns work on your own server.
const CATALOG: Record<string, { variation_code: string; name: string; amount: number }[]> = {
  default: [
    { variation_code: "plan_5", name: "Starter — $5", amount: 5 },
    { variation_code: "plan_10", name: "Basic — $10", amount: 10 },
    { variation_code: "plan_20", name: "Standard — $20", amount: 20 },
    { variation_code: "plan_50", name: "Premium — $50", amount: 50 },
  ],
}

export async function GET(req: Request) {
  const serviceID = new URL(req.url).searchParams.get("serviceID") || "default"
  const variations = (CATALOG[serviceID] || CATALOG.default).map((v) => ({
    ...v,
    variation_amount: String(v.amount), // VTpass-style field, in USD
    fixedPrice: "Yes",
  }))
  return NextResponse.json({
    success: true,
    response_description: "000",
    serviceID,
    variations,
    content: { variations, varations: variations }, // tolerate both spellings
  })
}
