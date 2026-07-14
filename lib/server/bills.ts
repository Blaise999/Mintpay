import type { Order } from "./orders"

type Fulfillment = { status: "success" | "failed"; providerRef: string; message: string }

/**
 * Delivers the purchased service. Defaults to a working simulation so the whole
 * app runs end-to-end without a paid provider. Set BILLS_PROVIDER=reloadly and
 * the RELOADLY_* env vars to switch to real delivery later.
 */
export async function fulfill(order: Order): Promise<Fulfillment> {
  const provider = (process.env.BILLS_PROVIDER || "simulate").toLowerCase()
  if (provider === "reloadly") return fulfillReloadly(order)
  // --- simulate ---
  return {
    status: "success",
    providerRef: `SIM-${Date.now().toString(36).toUpperCase()}`,
    message: "Simulated fulfillment (set BILLS_PROVIDER=reloadly for live delivery).",
  }
}

async function fulfillReloadly(order: Order): Promise<Fulfillment> {
  const id = process.env.RELOADLY_CLIENT_ID
  const secret = process.env.RELOADLY_CLIENT_SECRET
  if (!id || !secret) {
    return { status: "failed", providerRef: "", message: "Reloadly credentials not configured." }
  }
  // Placeholder for the real Reloadly integration (topups/utility-pay).
  // Kept as a clearly-marked stub so it never silently pretends to deliver.
  return { status: "failed", providerRef: "", message: "Reloadly integration not implemented yet." }
}
