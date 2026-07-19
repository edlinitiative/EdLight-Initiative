import { NextRequest, NextResponse } from 'next/server'
import { resolveOrderId, appForOrderId, ALERT_URLS } from '@/lib/moncash-dispatch'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Shared MonCash Alert URL (Digicel's server-to-server notification).
 *
 * Best-effort only — each app's Return handler is authoritative for issuing the
 * ticket/enrollment. We resolve the orderId, then forward the notification to
 * the owning app's webhook (only Tikèm has one; code's return is authoritative).
 * Always returns 200 so MonCash doesn't retry-storm us.
 */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    const raw = await request.text().catch(() => '')

    let transactionId: string | null = null
    let orderId: string | null = null

    const str = (v: unknown): string | null => (typeof v === 'string' && v ? v : null)

    if (contentType.includes('application/json')) {
      const j = JSON.parse(raw || '{}') as Record<string, unknown>
      transactionId = str(j.transactionId) || str(j.transaction_id)
      orderId = str(j.orderId) || str(j.order_id) || str(j.reference)
    } else {
      const p = new URLSearchParams(raw)
      transactionId = p.get('transactionId') || p.get('transaction_id')
      orderId = p.get('orderId') || p.get('reference')
    }

    if (!orderId && transactionId) {
      orderId = await resolveOrderId(transactionId)
    }

    const target = appForOrderId(orderId)
    const forwardUrl = ALERT_URLS[target]

    console.info('[moncash-dispatch] alert', {
      hasTransactionId: Boolean(transactionId),
      resolved: Boolean(orderId),
      target,
      forwarded: Boolean(forwardUrl),
    })

    if (forwardUrl) {
      // Fire-and-forget; preserve the original body + content type.
      fetch(forwardUrl, {
        method: 'POST',
        headers: { 'content-type': contentType || 'application/json' },
        body: raw,
      }).catch(() => {})
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true })
  }
}

/**
 * Digicel portals sometimes send a browser GET to the Alert URL. Hand those off
 * to the Return dispatcher so the buyer still lands on the right app.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const dest = new URL('/payment-success', url.origin)
  url.searchParams.forEach((value, key) => dest.searchParams.set(key, value))
  return NextResponse.redirect(dest.toString(), 307)
}
