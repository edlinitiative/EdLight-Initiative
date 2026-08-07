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

/**
 * Organisation facts that appear in more than one place.
 *
 * The founding year had drifted to three different values — 2015 in the
 * JSON-LD, 2018 in data/timeline.json, and 2020 on the homepage hero. 2020 is
 * correct. Read it from here so a fourth answer cannot appear.
 */
export const FOUNDED_YEAR = 2020

/** Canadian not-for-profit corporation number. */
export const CORPORATION_NUMBER = '1376443-5'
