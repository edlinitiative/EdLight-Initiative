/**
 * The choices on the Labs project brief (components/RequestQuoteForm.tsx).
 *
 * Shared with /api/request-quote, which accepts only these values. Anything
 * else is dropped, so the parts of the brief that are echoed back to the
 * visitor in their confirmation email are always our own words.
 */
export const BRIEF_SERVICES = [
  'New website',
  'Website redesign',
  'Web app or platform',
  'Mobile app',
  'Online store or payments',
  'Maintenance & support',
  'Something else',
] as const

export const BRIEF_BUDGETS = [
  'Under $1,000',
  '$1,000 to $5,000',
  '$5,000 to $15,000',
  'Over $15,000',
  'Not sure yet',
] as const

export const BRIEF_TIMELINES = [
  'As soon as possible',
  'Within 1 month',
  '1 to 3 months',
  '3 months or more',
  'Flexible',
] as const

export const BRIEF_DETAILS_MIN = 20
