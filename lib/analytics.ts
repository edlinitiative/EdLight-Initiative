/**
 * Google Analytics 4 / Google Ads measurement, switched by one env var.
 *
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is inlined at build time. When it is unset (or
 * not a well-formed G- id) the site loads no Google script, creates no
 * dataLayer and sets no analytics cookie, and the privacy policy renders its
 * "no analytics" wording. Both read ANALYTICS_ENABLED below, so the tag and
 * the policy cannot disagree about whether the tag is on.
 *
 * Event params must never carry personal data: no names, emails, message
 * text, or free-form input. Only fixed labels we choose (a form name, a CTA
 * location, a destination host).
 */

const RAW_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '').trim()

// Validated because the id is interpolated into an inline script.
export const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/.test(RAW_ID) ? RAW_ID : ''

export const ANALYTICS_ENABLED = GA_MEASUREMENT_ID !== ''

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: Gtag
    dataLayer?: unknown[]
  }
}

export type AnalyticsEvent =
  | { name: 'donate_click'; params: { location: string } }
  | { name: 'generate_lead'; params: { form: string; interest?: string; cycle?: string } }
  | { name: 'program_click'; params: { destination: string } }

// The notify lists /api/eslp-notify accepts (its NOTIFY_CYCLES), mapped to
// the generate_lead `form` label. Fixed labels only, never visitor input.
const NOTIFY_FORMS: Record<string, string> = {
  'ESLP 2027': 'eslp_notify',
  'EdLight Scholars': 'scholars_notify',
  'Coursera Scholars': 'scholars_notify',
}

/**
 * generate_lead params for a NotifyModal signup, e.g. 'ESLP 2027' →
 * { form: 'eslp_notify', cycle: 'ESLP 2027' }. Any later ESLP year maps the
 * same way; an unknown label is reported as { form: 'notify', cycle: 'other' }
 * so nothing unexpected is ever sent to GA.
 */
export function notifyLeadParams(cycleLabel: string): { form: string; cycle: string } {
  const form = NOTIFY_FORMS[cycleLabel] ?? (/^ESLP \d{4}$/.test(cycleLabel) ? 'eslp_notify' : null)
  return form ? { form, cycle: cycleLabel } : { form: 'notify', cycle: 'other' }
}

/** Send a GA4 event. A safe no-op on the server, with GA off, or before gtag loads. */
export function track<E extends AnalyticsEvent>(name: E['name'], params: E['params']): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', name, params)
  } catch {
    // Measurement must never break the page.
  }
}

/** True for /admin and /<locale>/admin paths, which are never measured. */
export function isAdminPath(pathname: string | null | undefined): boolean {
  return !!pathname && /^\/(?:[a-z]{2}\/)?admin(?:\/|$)/.test(pathname)
}

// Outbound destinations counted as program_click, keyed by host.
const PROGRAM_HOSTS: Record<string, string> = {
  'academy.edlight.org': 'academy',
  'code.edlight.org': 'code',
  'apply.edlight.org': 'apply',
  'scholars.edlight.org': 'scholars',
  'app.edlight.org': 'app',
}

// App store listings, keyed by the id in the URL.
const STORE_APPS: Record<string, string> = {
  id6792210920: 'academy',
  id6796587680: 'code',
  'com.edlightacademy': 'academy',
  'org.edlight.code': 'code',
}

/** Map an outbound URL to a program_click destination label, or null. */
export function programDestination(url: URL): string | null {
  const host = url.hostname.toLowerCase()
  if (PROGRAM_HOSTS[host]) {
    // apply.edlight.org/scholars/* is the Scholars application.
    if (host === 'apply.edlight.org' && /^\/(?:coursera-)?scholars/.test(url.pathname)) {
      return 'apply_scholars'
    }
    return PROGRAM_HOSTS[host]
  }
  if (host === 'apps.apple.com') {
    const id = url.pathname.match(/id\d+/)?.[0]
    return `app_store_${(id && STORE_APPS[id]) || 'other'}`
  }
  if (host === 'play.google.com') {
    const id = url.searchParams.get('id') ?? ''
    return `google_play_${STORE_APPS[id] || 'other'}`
  }
  return null
}

/** True for links that start a donation: our /donate page or PayPal's donate flow. */
export function isDonateUrl(url: URL, siteOrigin: string): boolean {
  if (url.hostname.endsWith('paypal.com') && url.pathname.startsWith('/donate')) return true
  return url.origin === siteOrigin && /^\/(?:[a-z]{2}\/)?donate\/?$/.test(url.pathname)
}
