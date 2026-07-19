// MonCash shared Return/Alert URL dispatcher.
//
// Tikèm and code.edlight.org share ONE MonCash merchant account, and Digicel
// only allows a single Return/Alert URL for it (configured on edlight.org).
// This module lets edlight.org route each payment back to the app that created
// it.
//
// The MonCash return `transactionId` is opaque, so we resolve it to our own
// orderId ("reference") via the shared account's RetrieveTransactionPayment
// API, then route by the orderId shape:
//   - Tikèm      → purely-numeric orderIds        (e.g. "412070002671")
//   - code       → dashed orderIds                (e.g. "abcd1234-efgh5678-1699999999999", "sub-…", "nat-…")
//
// Requires MONCASH_CLIENT_ID / MONCASH_SECRET_KEY / MONCASH_MODE on this
// project (the SAME working REST credentials Tikèm uses).

const SANDBOX = 'https://sandbox.moncashbutton.digicelgroup.com'
const PROD = 'https://moncashbutton.digicelgroup.com'

function host(): string {
  return (process.env.MONCASH_MODE || 'sandbox').toLowerCase() === 'production' ? PROD : SANDBOX
}

let cachedToken: { token: string; exp: number } | null = null

async function getToken(): Promise<string> {
  if (cachedToken && cachedToken.exp > Date.now()) return cachedToken.token
  const id = (process.env.MONCASH_CLIENT_ID || '').trim()
  const secret = (process.env.MONCASH_SECRET_KEY || '').trim()
  if (!id || !secret) throw new Error('MonCash credentials not configured')
  const creds = Buffer.from(`${id}:${secret}`).toString('base64')
  const r = await fetch(`${host()}/Api/oauth/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${creds}`,
    },
    body: new URLSearchParams({ scope: 'read,write', grant_type: 'client_credentials' }).toString(),
  })
  if (!r.ok) throw new Error(`MonCash oauth failed (${r.status})`)
  const j = (await r.json().catch(() => ({}))) as { access_token?: string }
  if (!j?.access_token) throw new Error('MonCash oauth: no access_token')
  // Tokens are short-lived (~59s); cache briefly to avoid re-auth on the two calls per return.
  cachedToken = { token: j.access_token, exp: Date.now() + 45_000 }
  return j.access_token
}

/** Resolve the orderId (reference) for a MonCash gateway transactionId. Returns null on any failure. */
export async function resolveOrderId(transactionId: string): Promise<string | null> {
  try {
    const token = await getToken()
    const r = await fetch(`${host()}/Api/v1/RetrieveTransactionPayment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ transactionId }),
    })
    if (!r.ok) return null
    const j = (await r.json().catch(() => ({}))) as {
      payment?: { reference?: unknown }
      reference?: unknown
    }
    const ref = j?.payment?.reference ?? j?.reference
    return ref ? String(ref) : null
  } catch {
    return null
  }
}

export type TargetApp = 'tikem' | 'code'

/**
 * Route by orderId shape. Dashed/prefixed orderIds belong to code.edlight.org;
 * everything else (numeric — or unknown) goes to Tikèm, which is the only app
 * with live MonCash payments today and has the most resilient return handler.
 */
export function appForOrderId(orderId: string | null): TargetApp {
  if (orderId && !/^\d+$/.test(orderId)) return 'code'
  return 'tikem'
}

export const RETURN_URLS: Record<TargetApp, string> = {
  tikem:
    process.env.TIKEM_MONCASH_RETURN_URL ||
    'https://eventhaiti.vercel.app/api/moncash-button/return',
  code:
    process.env.CODE_MONCASH_RETURN_URL ||
    'https://code.edlight.org/api/checkout/moncash/return',
}

// Server-to-server alert forwarding. code has no separate MonCash webhook
// (its return handler is authoritative), so only Tikèm receives a forward.
export const ALERT_URLS: Record<TargetApp, string> = {
  tikem:
    process.env.TIKEM_MONCASH_ALERT_URL ||
    'https://eventhaiti.vercel.app/api/moncash-button/alert',
  code: process.env.CODE_MONCASH_ALERT_URL || '',
}
