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

/** An AW- conversion id, or '' when malformed (it is interpolated into an inline script). */
export function validAdsId(raw: string): string {
  const id = raw.trim()
  return /^AW-\d+$/.test(id) ? id : ''
}

// The Ad Grants account's Google tag (420-747-6799). Google Ads flags campaigns
// landing here as "missing a Google tag" without it. It rides on the GA4 loader,
// so it is only ever configured when ANALYTICS_ENABLED.
export const GOOGLE_ADS_ID = validAdsId(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? 'AW-18486508230')

/**
 * Regions where every Consent Mode signal defaults to denied: the EEA (EU 27
 * plus Iceland, Liechtenstein and Norway), the UK and Switzerland, where
 * analytics and advertising cookies need prior opt-in. There is no consent
 * banner, so visitors there stay denied for their whole visit: gtag still
 * loads and sends cookieless pings (Consent Mode "advanced"), which Google
 * uses for modelled conversions, but no Google cookie is set.
 */
export const CONSENT_DENIED_REGIONS = [
  // EU 27
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  // Rest of the EEA, then the UK and Switzerland
  'IS', 'LI', 'NO', 'GB', 'CH',
] as const

/**
 * Our own sites. gtag's linker appends a _gl parameter to links between them
 * so the GA client id, session and Ads click id carry across a hop to another
 * EdLight site even when its cookies cannot be read there. Each receiving
 * site needs the same linker list (accept_incoming) in its own gtag config.
 */
export const LINKER_DOMAINS = [
  'edlight.org',
  'www.edlight.org',
  'apply.edlight.org',
  'academy.edlight.org',
  'code.edlight.org',
] as const

/**
 * The inline script that boots gtag. Order matters: consent defaults must be
 * set before any config call, or the first hits go out with no consent state.
 *
 *   - Region default: all four signals denied in CONSENT_DENIED_REGIONS.
 *   - Global default: all four granted everywhere else. ad_storage and
 *     ad_user_data being granted is what lets Google Ads set its click cookie
 *     (_gcl_aw) and attribute a conversion that happens later in the visit;
 *     with them denied, as before, conversions were only ever modelled.
 *     ad_personalization is granted at the consent layer but both configs
 *     still pass allow_ad_personalization_signals:false, so no remarketing
 *     audience is built from this site.
 *   - url_passthrough keeps the gclid / gbraid / wbraid on internal links, so
 *     a denied-region click still attributes without a cookie.
 *   - linker carries the session across LINKER_DOMAINS.
 *
 * Both ids are validated before they reach this function (G- / AW- regexes),
 * and are JSON-encoded anyway.
 */
export function gtagBootstrap(measurementId: string, adsId: string): string {
  const signals = (state: 'granted' | 'denied') =>
    `analytics_storage:'${state}',ad_storage:'${state}',ad_user_data:'${state}',ad_personalization:'${state}'`
  const lines = [
    'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}',
    `gtag('consent','default',{${signals('denied')},region:${JSON.stringify(CONSENT_DENIED_REGIONS)}});`,
    `gtag('consent','default',{${signals('granted')}});`,
    "gtag('set','url_passthrough',true);",
    `gtag('set','linker',{domains:${JSON.stringify(LINKER_DOMAINS)},accept_incoming:true});`,
    "gtag('js',new Date());",
    `gtag('config',${JSON.stringify(measurementId)},{allow_google_signals:false,allow_ad_personalization_signals:false});`,
  ]
  if (adsId) {
    lines.push(`gtag('config',${JSON.stringify(adsId)},{allow_ad_personalization_signals:false});`)
  }
  return lines.join('\n')
}

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
  'EdLight Nexus': 'nexus_notify',
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

/**
 * Send a GA4 event. A safe no-op on the server, with GA off, or before gtag loads.
 *
 * transport_type 'beacon' hands the hit to navigator.sendBeacon, which the
 * browser delivers even after the page unloads. Most of these events fire on
 * a click that immediately navigates away (Apply on apply.edlight.org, the
 * navbar Donate link, PayPal), and a normal request would often be cancelled
 * with the page.
 */
export function track<E extends AnalyticsEvent>(name: E['name'], params: E['params']): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', name, { ...params, transport_type: 'beacon' })
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
