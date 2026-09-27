/**
 * EdLight Scholars direct-application windows: the one place their dates live.
 *
 * The Scholars page hero, its closing call to action, its key-dates note and
 * the FAQ all read from here. They used to state the status in copy
 * ("applications are open", "not open yet"), which was right on the day it
 * was written and wrong on some later day nobody was watching. Now the copy
 * takes the dates as placeholders and the status is computed from the clock.
 *
 * The pages that use this are statically generated, so they also export
 * `revalidate`: each switch (closed, opening soon, open) happens within the
 * hour, without a redeploy.
 *
 * Next window: add it to WINDOWS, in order. apply.edlight.org/scholars
 * follows the open programme on its own, so the Apply link never changes.
 */

/** Haiti time. Every date here is a date in Port-au-Prince. */
export const SCHOLARS_TIME_ZONE = 'America/Port-au-Prince'

type ScholarsWindow = {
  cohort: number
  /** Applications open (midnight Haiti time). */
  opens: Date
  /** Applications close (23:59:59 Haiti time). */
  closes: Date
  starts: Date
  ends: Date
  /** When partner institutions send their students' names. */
  partnerDeadline: Date
}

// Haiti is UTC-4 from March to early November and UTC-5 in winter.
export const WINDOWS: ScholarsWindow[] = [
  {
    cohort: 1,
    opens: new Date('2026-09-01T00:00:00-04:00'),
    closes: new Date('2026-09-29T23:59:59-04:00'),
    starts: new Date('2026-10-01T00:00:00-04:00'),
    ends: new Date('2026-12-31T00:00:00-05:00'),
    partnerDeadline: new Date('2026-09-30T15:00:00-04:00'),
  },
  {
    cohort: 2,
    opens: new Date('2026-10-03T00:00:00-04:00'),
    closes: new Date('2026-12-13T23:59:59-05:00'),
    starts: new Date('2027-01-11T00:00:00-05:00'),
    ends: new Date('2027-04-11T00:00:00-04:00'),
    partnerDeadline: new Date('2026-12-28T23:59:00-05:00'),
  },
]

/** The cohort after the last window above, as the site's key dates list it. */
const LATER_COHORT = { cohort: 3, starts: new Date('2027-04-19T00:00:00-04:00') }

/**
 * "Now", for the status check. Outside production, SCHOLARS_NOW (any date
 * string `new Date` accepts) stands in for the clock, so every state can be
 * checked locally:
 *
 *   SCHOLARS_NOW=2026-10-01T09:00:00-04:00 npm run dev
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

/**
 * open: a window is taking applications.
 * upcoming: between windows, and the next one has a date.
 * closed: the last window here has closed.
 */
export type ScholarsPhase = 'open' | 'upcoming' | 'closed'

export function scholarsStatus(at: Date = now()): { phase: ScholarsPhase; window: ScholarsWindow } {
  const t = at.getTime()
  const current = WINDOWS.find((w) => w.opens.getTime() <= t && t <= w.closes.getTime())
  if (current) return { phase: 'open', window: current }
  const next = WINDOWS.find((w) => w.opens.getTime() > t)
  if (next) return { phase: 'upcoming', window: next }
  return { phase: 'closed', window: WINDOWS[WINDOWS.length - 1] }
}

export function scholarsApplicationsOpen(at: Date = now()): boolean {
  return scholarsStatus(at).phase === 'open'
}

/**
 * "29 September 2026" / "29 septembre 2026", in Haiti time. en-GB rather than
 * en: the site writes day-month-year in English too. French writes the first
 * of a month as "1er".
 */
export function formatScholarsDate(date: Date, locale: string): string {
  const text = new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: SCHOLARS_TIME_ZONE,
  }).format(date)
  return locale === 'fr' ? text.replace(/^1 /, '1er ') : text
}

/** "30 septembre 2026 à 15 h" / "30 September 2026 at 3:00 pm", Haiti time. */
function formatDeadline(date: Date, locale: string): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: SCHOLARS_TIME_ZONE,
  }).formatToParts(date)
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
  const minute = parts.find((p) => p.type === 'minute')?.value ?? '00'
  const day = formatScholarsDate(date, locale)
  if (locale === 'fr') return `${day} à ${hour} h${minute === '00' ? '' : ` ${minute}`}`
  const h12 = hour % 12 === 0 ? 12 : hour % 12
  return `${day} at ${h12}:${minute} ${hour < 12 ? 'am' : 'pm'}`
}

/**
 * The dates as message placeholders for the window that matters now: the
 * open one, else the next, else the last. {nextCohort} is the start of the
 * cohort after the last window, for the closed state.
 */
export function scholarsDateValues(locale: string, at: Date = now()) {
  const { window: w } = scholarsStatus(at)
  return {
    cohort: w.cohort,
    opensDate: formatScholarsDate(w.opens, locale),
    closeDate: formatScholarsDate(w.closes, locale),
    startDate: formatScholarsDate(w.starts, locale),
    endDate: formatScholarsDate(w.ends, locale),
    partnerDeadline: formatDeadline(w.partnerDeadline, locale),
    nextCohortNumber: LATER_COHORT.cohort,
    nextCohort: formatScholarsDate(LATER_COHORT.starts, locale),
  }
}
