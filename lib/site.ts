/**
 * The single canonical origin for the site.
 *
 * This must match the host actually served. The apex domain 307-redirects to
 * www, so declaring the apex in canonical tags, the sitemap, and JSON-LD handed
 * Google 16+ URLs that all redirected — and Ad Grants ads should not point
 * through a redirect. Keep every absolute URL derived from here.
 */
export const SITE_URL = 'https://www.edlight.org'

/** Build an absolute URL for a site-relative path. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE_URL).toString()
}
