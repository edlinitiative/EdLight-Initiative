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

/**
 * The one mission sentence.
 *
 * The site had three: the footer said "make education free and accessible to
 * all people in Haiti", the homepage mission block opened with "world-class
 * education and opportunities", and /about's mission card said "expand access
 * to quality education, mentorship, innovation, and global opportunities".
 * A reviewer asked to find "a clear description of the organisation's mission"
 * found three answers and no way to tell which was the real one.
 *
 * This is the one that gets rendered everywhere a mission statement is
 * called for. It is short enough to survive being read once, and every claim
 * in it is checkable against a page on this site.
 */
export const MISSION_STATEMENT =
  'EdLight Initiative makes quality education free and accessible to students in Haiti.'

/**
 * What the organisation actually does, in one sentence.
 *
 * The Ad Grants website policy asks for the mission *and the activities*.
 * The mission alone does not tell a reviewer what the organisation spends its
 * days on, and "a growing ecosystem of programs" — which is what /about used
 * to offer — tells them less than nothing.
 */
export const ACTIVITIES_STATEMENT =
  'We run free online courses in the subjects Haitian students sit national exams in, a coding platform taught in Haitian Creole, French, and English, funded professional certificates, and a two-week residential summer leadership programme.'

/**
 * The nonprofit status line, rendered verbatim wherever status is stated.
 *
 * This sentence was written out by hand in six places — the footer, /about,
 * /faq, /get-involved, /terms-of-use, and /contact — and /about had the
 * corporation number typed as a literal rather than read from
 * CORPORATION_NUMBER, so a change to the registration would have left one
 * page quietly wrong. Ad Grants reviewers check the number on the site
 * against the public registration; there must be exactly one of it.
 */
export const NONPROFIT_STATUS_LINE =
  `EdLight Initiative is a not-for-profit corporation registered in Canada (Corporation No. ${CORPORATION_NUMBER}), based in ${REGISTERED_ADDRESS_LINE}, serving students across ${AREA_SERVED}.`

/**
 * The short form, for places with no room for the full sentence — the hero
 * eyebrow, the status band under it.
 */
export const NONPROFIT_STATUS_SHORT = 'Registered Canadian not-for-profit'

/**
 * Whether the commercial-services surface is publicly reachable.
 *
 * EdLight Labs sells web services — quotes, care plans, client work — and
 * /request-quote is its intake form. Both are legitimate activities, but the
 * Google Ad Grants review weighs whether a site is primarily commercial, and
 * a noindex does not stop a human reviewer who browses the site directly.
 * Earlier passes de-listed both from the sitemap and noindexed them, which
 * handles crawlers and nothing else.
 *
 * While this is false, /labs and /request-quote return 404. The pages and the
 * API route behind them are untouched.
 *
 * TO RESTORE, once the Ad Grants activation is approved: set this to true.
 * That is the whole change — both routes come back. Then decide separately
 * whether either belongs in the sitemap (app/sitemap.ts) or the navigation;
 * they were removed from both on purpose and flipping this flag does not put
 * them back.
 */
export const COMMERCIAL_SERVICES_ENABLED = false

/**
 * Whether /nexus is publicly reachable.
 *
 * EdLight Nexus has a page but not a programme. Every sentence on it is
 * conditional — "is designed to connect", "what Nexus is designed to offer",
 * "stay informed" — and there is no cohort, no dates, and no way to apply.
 * The Ad Grants website policy names pages under construction explicitly, and
 * noindexing it (an earlier pass) keeps it out of search results while
 * leaving it reachable by anyone who types the URL, reviewers included.
 *
 * TO RESTORE: set this to true once Nexus has dates and a way for a student
 * to apply. It is out of the navbar, footer, homepage programme list, and
 * sitemap on purpose; this flag does not put it back into any of them.
 */
export const NEXUS_ENABLED = false

/**
 * Whether /store is publicly reachable.
 *
 * Every item in the store is marked "Coming soon" and the page says the store
 * is launching soon — four products, none of which can be bought. That is a
 * placeholder page, and the same reasoning as NEXUS_ENABLED applies: noindex
 * is not the same as not being there.
 *
 * TO RESTORE: set this to true once the products can actually be purchased.
 */
export const STORE_ENABLED = false
