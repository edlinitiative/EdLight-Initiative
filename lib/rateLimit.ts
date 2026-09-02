/**
 * A small in-memory rate limiter for the public form endpoints.
 *
 * The problem it addresses: /api/newsletter and /api/eslp-notify both send a
 * confirmation email to whatever address the caller submits, with no
 * authentication. That makes them usable to send EdLight-branded mail to
 * someone who never asked for it, to email-bomb an address by POSTing
 * repeatedly, and to burn the Resend quota and the domain's sending
 * reputation along the way.
 *
 * What this is: a per-IP fixed window held in the instance's memory. It stops
 * naive and scripted abuse from a single source, which is the realistic case.
 *
 * What this is NOT: durable or shared. Vercel may run several instances and
 * will recycle them, so each keeps its own counters and a determined attacker
 * rotating IPs is not stopped. Treat it as a floor, not a solution. The real
 * fix is a shared store (a Redis/KV integration from the Vercel Marketplace)
 * or a bot check in front of these routes, plus double opt-in so no
 * confirmation mail goes out until a click proves the address wanted it.
 */

type Window = { count: number; resetAt: number }

const windows = new Map<string, Window>()

/** Drop expired entries so the map cannot grow without bound. */
function sweep(now: number) {
  if (windows.size < 5000) return
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key)
  }
}

/**
 * The caller's IP, as far as we can tell behind Vercel's proxy.
 *
 * x-forwarded-for is client-controllable in general, but on Vercel the
 * platform sets it, and the leftmost entry is the real client. Falls back to
 * a single shared bucket rather than to "unlimited" when there is no header,
 * because failing open is how a limiter becomes decorative.
 */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

export interface RateLimitResult {
  ok: boolean
  /** Seconds until the window resets. Suitable for a Retry-After header. */
  retryAfter: number
}

/**
 * Count one hit against `key` and say whether it is within the limit.
 *
 * @param limit    hits allowed per window
 * @param windowMs length of the window
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  sweep(now)

  const existing = windows.get(key)

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }

  existing.count += 1

  if (existing.count > limit) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)) }
  }

  return { ok: true, retryAfter: 0 }
}
