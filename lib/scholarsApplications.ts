/**
 * EdLight Scholars direct-application window: the one place its dates live.
 *
 * The Scholars page hero, its closing call to action, its key-dates note and
 * the FAQ all read from here. They used to state the status in copy
 * ("applications are open", "not open yet"), which was right on the day it
 * was written and wrong on some later day nobody was watching. Now the copy
 * takes the dates as placeholders and the status is computed from the clock.
 *
 * The pages that use this are statically generated, so they also export
 * `revalidate`: the switch from open to closed happens within the hour after
 * the deadline, without a redeploy.
 *
 * Next window: set APPLICATIONS_CLOSE to the new deadline and
 * NEXT_COHORT_START to the cohort after it.
 */

/** Haiti time. Every date here is a date in Port-au-Prince. */
export const SCHOLARS_TIME_ZONE = 'America/Port-au-Prince'

/** Cohort 1 direct applications close at 23:59 on 29 September 2026, Haiti time (UTC-4 in September). */
export const APPLICATIONS_CLOSE = new Date('2026-09-29T23:59:59-04:00')

/** The next cohort once this window has closed: Cohort 2, from 11 January 2027 (Haiti is UTC-5 in January). */
export const NEXT_COHORT_START = new Date('2027-01-11T00:00:00-05:00')

/**
 * "Now", for the status check. Outside production, SCHOLARS_NOW (any date
 * string `new Date` accepts) stands in for the clock, so the closed state can
 * be checked locally before the deadline:
 *
 *   SCHOLARS_NOW=2026-09-30T09:00:00-04:00 npm run dev
 *
 * It is ignored in production builds, so a stray variable cannot close (or
 * reopen) applications on the live site.
 */
function now(): Date {
  const override = process.env.NODE_ENV !== 'production' ? process.env.SCHOLARS_NOW : undefined
  if (override) {
    const date = new Date(override)
    if (!Number.isNaN(date.getTime())) return date
  }
  return new Date()
}

export function scholarsApplicationsOpen(at: Date = now()): boolean {
  return at.getTime() <= APPLICATIONS_CLOSE.getTime()
}

/**
 * "29 September 2026" / "29 septembre 2026", in Haiti time. en-GB rather than
 * en: the site writes day-month-year in English too.
 */
export function formatScholarsDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: SCHOLARS_TIME_ZONE,
  }).format(date)
}

/** The dates as message placeholders: {closeDate} and {nextCohort}. */
export function scholarsDateValues(locale: string) {
  return {
    closeDate: formatScholarsDate(APPLICATIONS_CLOSE, locale),
    nextCohort: formatScholarsDate(NEXT_COHORT_START, locale),
  }
}
