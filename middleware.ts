import { NextRequest, NextResponse } from 'next/server'

import { DEFAULT_LOCALE, LOCALE_MATCH_ORDER, isLocale, type Locale } from '@/i18n/config'

/**
 * Serve both languages from the same urls.
 *
 * Pages live under app/[locale]/, so Next prerenders a static English page and
 * a static French page. This rewrites — never redirects — an incoming /about to
 * /en/about or /fr/about, so the visitor's url stays clean and a prebuilt page
 * is served. No per-request rendering, and nothing to share that leaks /fr.
 *
 * Preference order: the NEXT_LOCALE cookie the switcher sets, then the
 * browser's Accept-Language, then DEFAULT_LOCALE. Deliberately NOT IP — an
 * address gives a country, not a language, and misreads the diaspora, VPNs and
 * Haitian carriers routed through US ranges.
 */

export const COOKIE_NAME = 'NEXT_LOCALE'

/** Parse Accept-Language into tags ordered by their q-value, highest first. */
function preferredLanguages(header: string | null): string[] {
  if (!header) return []
  return header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.find((p) => p.trim().startsWith('q='))
      const weight = q ? Number.parseFloat(q.split('=')[1]) : 1
      return { tag: tag.trim().toLowerCase(), weight: Number.isNaN(weight) ? 0 : weight }
    })
    .filter(({ tag }) => tag.length > 0)
    .sort((a, b) => b.weight - a.weight)
    .map(({ tag }) => tag)
}

function localeFor(request: NextRequest): Locale {
  const chosen = request.cookies.get(COOKIE_NAME)?.value
  if (chosen && isLocale(chosen)) return chosen

  // Match on the primary subtag so fr-CA and fr-HT both count as French.
  for (const tag of preferredLanguages(request.headers.get('accept-language'))) {
    const base = tag.split('-')[0]
    const hit = LOCALE_MATCH_ORDER.find((locale) => locale === base)
    if (hit) return hit
  }

  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const locale = localeFor(request)

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}${''}`
  url.search = search

  const response = NextResponse.rewrite(url)
  // Vary so a shared cache cannot hand a French page to an English visitor.
  response.headers.set('Vary', 'Accept-Language, Cookie')
  return response
}

export const config = {
  /**
   * Everything except API routes, Next's own assets, and any path with a file
   * extension (images, the sitemap, robots.txt, favicons).
   */
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
