/**
 * Locale configuration — and the one place the routing decision lives.
 *
 * The site is English-only in the browser today. Every user-visible string
 * has been extracted into messages/<locale>.json and a French translation
 * exists and is complete, but nothing yet lets a visitor reach it. That is
 * deliberate: how a visitor selects a language is a decision with real
 * trade-offs that had not been made when the strings were extracted, and
 * extraction is worth doing on its own.
 *
 * ── Turning French on ──────────────────────────────────────────────────────
 *
 * Two options, and they are not equivalent:
 *
 * 1. PATH ROUTING — /fr/academy. Add a [locale] segment, move app/* under it,
 *    add next-intl's middleware, and set `hreflang` alternates in the root
 *    metadata. Pages stay statically prerendered, every language gets its own
 *    indexable URL, and a link to a French page can be shared. This is the
 *    only option Google can index in more than one language, because
 *    `hreflang` requires distinct URLs.
 *
 * 2. COOKIE — one URL, language remembered per visitor. Change
 *    `resolveLocale()` below to read a cookie and nothing else moves. But
 *    reading a cookie during render opts every page out of static generation,
 *    so all twelve pages become server-rendered per request, and Google still
 *    only ever sees one language.
 *
 * Whichever is chosen, the message catalogues and every call site stay as
 * they are. Only this file and the app/ directory layout change.
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

/**
 * Which locale to render.
 *
 * Hardcoded to the default until a routing model is chosen — see the note at
 * the top of this file. To switch to cookies, this becomes:
 *
 *   import { cookies } from 'next/headers'
 *   const value = cookies().get('NEXT_LOCALE')?.value
 *   return value && isLocale(value) ? value : DEFAULT_LOCALE
 *
 * (and every page becomes dynamically rendered as a result).
 */
export function resolveLocale(): Locale {
  return DEFAULT_LOCALE
}
