import { NextRequest, NextResponse } from 'next/server'
import { resolveOrderId, appForOrderId, RETURN_URLS } from '@/lib/moncash-dispatch'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Shared MonCash Return URL (Digicel is configured to send buyers here).
 *
 * MonCash appends an opaque `transactionId`. We resolve it to our orderId via
 * the shared MonCash account, then 307-redirect the buyer to the app that owns
 * the payment — Tikèm (eventhaiti.vercel.app) or code (code.edlight.org) —
 * preserving the full query string so that app's return handler can verify and
 * finish the purchase.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url)

  const transactionId =
    url.searchParams.get('transactionId') || url.searchParams.get('transaction_id')

  // Prefer an explicit orderId/reference if MonCash ever includes one; otherwise
  // resolve it from the transactionId via the MonCash API.
  let orderId = url.searchParams.get('orderId') || url.searchParams.get('reference')
  if (!orderId && transactionId) {
    orderId = await resolveOrderId(transactionId)
  }

  const target = appForOrderId(orderId)
  const dest = new URL(RETURN_URLS[target])
  // Preserve every original query param (transactionId, etc.).
  url.searchParams.forEach((value, key) => dest.searchParams.set(key, value))

  console.info('[moncash-dispatch] return', {
    hasTransactionId: Boolean(transactionId),
    resolved: Boolean(orderId),
    target,
  })

  return NextResponse.redirect(dest.toString(), 307)
}
