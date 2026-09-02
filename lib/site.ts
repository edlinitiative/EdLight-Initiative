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

/**
 * Where the organisation is, and where it works — two different answers.
 *
 * The site used to give three: /about said Montreal, /faq and /contact said
 * Haiti, and the JSON-LD declared addressCountry "HT" for a corporation
 * registered in Canada. A reviewer checking the registration against the
 * contact page found a contradiction. Both facts are true and belong
 * together: registered and based in Montreal, serving students in Haiti.
 */
export const REGISTERED_ADDRESS = {
  locality: 'Montreal',
  region: 'Quebec',
  country: 'Canada',
  countryCode: 'CA',
} as const

/** Human-readable form of the registered address. */
export const REGISTERED_ADDRESS_LINE = 'Montreal, Quebec, Canada'

/** Where students are. Distinct from where the corporation is registered. */
export const AREA_SERVED = 'Haiti'

/** The single published contact address. */
export const CONTACT_EMAIL = 'info@edlight.org'
