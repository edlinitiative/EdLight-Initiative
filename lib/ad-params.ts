/**
 * Ad-click forwarding to our own products.
 *
 * Google Ads (Ad Grants) lands visitors on www.edlight.org, but the
 * conversions (sign_up, application_submit, generate_lead) happen on
 * apply.edlight.org, a separate GA4 property. Ads can only attribute a
 * conversion to the click if the click id (gclid / gbraid / wbraid) reaches
 * that site, so the landing URL's ad and campaign params are kept for the
 * session and appended to links pointing at our product subdomains.
 *
 * This is the same thing gtag's url_passthrough does — carrying the click id
 * in the URL instead of in an ad cookie — extended to the cross-domain hop,
 * which url_passthrough does not decorate without a linker config. It works
 * whether or not the GA tag is enabled, and sets no cookie: the params live in
 * sessionStorage (first-party, gone when the tab closes).
 *
 * Pure functions only; components/AdParamForwarder.tsx wires them to the DOM.
 */

/** URL params forwarded, in the order they are appended. */
export const FORWARDED_PARAMS = [
  'gclid',
  'gbraid',
  'wbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'ref',
] as const

/** Hosts whose links receive the params. Exact match: our products only. */
export const FORWARD_HOSTS: ReadonlySet<string> = new Set([
  'apply.edlight.org',
  'academy.edlight.org',
  'code.edlight.org',
])

export const AD_PARAMS_STORAGE_KEY = 'edlight_ad_params'

export type AdParams = Partial<Record<(typeof FORWARDED_PARAMS)[number], string>>

// Click ids and campaign names are short; anything longer is not ours.
const MAX_VALUE_LENGTH = 500

/** The forwarded params present (and non-empty) in a query string. */
export function pickAdParams(search: string): AdParams {
  const out: AdParams = {}
  let query: URLSearchParams
  try {
    query = new URLSearchParams(search)
  } catch {
    return out
  }
  for (const key of FORWARDED_PARAMS) {
    const value = query.get(key)?.trim()
    if (value && value.length <= MAX_VALUE_LENGTH) out[key] = value
  }
  return out
}

export function hasAdParams(params: AdParams): boolean {
  return Object.keys(params).length > 0
}

/** Parse what was stored, keeping only known keys with string values. */
export function parseStoredAdParams(raw: string | null | undefined): AdParams {
  if (!raw) return {}
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    const out: AdParams = {}
    for (const key of FORWARDED_PARAMS) {
      const value = (parsed as Record<string, unknown>)[key]
      if (typeof value === 'string' && value && value.length <= MAX_VALUE_LENGTH) out[key] = value
    }
    return out
  } catch {
    return {}
  }
}

/** True when a URL points at one of our product hosts over http(s). */
export function isForwardTarget(url: URL): boolean {
  return (
    (url.protocol === 'https:' || url.protocol === 'http:') &&
    FORWARD_HOSTS.has(url.hostname.toLowerCase())
  )
}

/**
 * The href with the stored params appended, or null when nothing should
 * change: not one of our product hosts, nothing stored, or every param is
 * already on the link (a param the link already carries is never overwritten).
 */
export function decorateHref(href: string, params: AdParams, base?: string): string | null {
  if (!hasAdParams(params)) return null
  let url: URL
  try {
    url = new URL(href, base)
  } catch {
    return null
  }
  if (!isForwardTarget(url)) return null

  let changed = false
  for (const key of FORWARDED_PARAMS) {
    const value = params[key]
    if (value && !url.searchParams.has(key)) {
      url.searchParams.append(key, value)
      changed = true
    }
  }
  return changed ? url.toString() : null
}
