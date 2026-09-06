/**
 * Locale configuration.
 *
 * The site serves both English and French from the SAME urls — edlight.org/about
 * is French for a French visitor and English for everyone else. There is no
 * /en or /fr segment in anything a visitor sees or shares.
 *
 * How that works: every page lives under app/[locale]/, so Next prerenders a
 * static English page and a static French page at build time. middleware.ts
 * then rewrites (never redirects) an incoming /about to /en/about or /fr/about,
 * so the url stays clean while a prebuilt page is served. Nothing is rendered
 * per request.
 *
 * Which language a visitor gets, in order:
 *   1. the NEXT_LOCALE cookie, if they have picked one from the switcher
 *   2. the browser's Accept-Language header
 *   3. DEFAULT_LOCALE
 *
 * Accept-Language, not IP geolocation: an address tells you a country, not a
 * language. It misreads the diaspora, VPNs, and Haitian carriers routed through
 * US ranges, and every search crawler would look American.
 *
 * ── The trade-off, stated plainly ──────────────────────────────────────────
 * One url per page means Google can only ever index one language of it —
 * hreflang needs distinct urls. The French is for visitors, not for search. If
 * French organic traffic is ever wanted, that requires visible /fr urls.
 */

export const LOCALES = ['en', 'fr'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/** Human names, for a language switcher whenever one is added. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/** Locales in the order middleware prefers them when matching Accept-Language. */
export const LOCALE_MATCH_ORDER: readonly Locale[] = ['fr', 'en']
