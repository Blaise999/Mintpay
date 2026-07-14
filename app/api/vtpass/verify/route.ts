import { NextResponse } from "next/server"
export const runtime = "nodejs"

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}))
  const name = "Verified Customer"
  return NextResponse.json({
    success: true,
    response_description: "000",
    name,
    customerName: name,
    content: { Customer_Name: name, billersCode: b.billersCode, serviceID: b.serviceID },
  })
}
