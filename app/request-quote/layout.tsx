import { notFound } from 'next/navigation'
import { COMMERCIAL_SERVICES_ENABLED } from '@/lib/site'

/**
 * /request-quote is EdLight Labs' intake form — it asks what an organisation
 * needs and says the partnerships team will send a quote. It is the same
 * commercial surface as /labs, one step further down the funnel, so hiding
 * /labs while leaving a live "Request a Quote" page reachable would not
 * accomplish what hiding /labs is for.
 *
 * Gated on the same flag, so both come back together. If partners turn out to
 * need this form on its own before the Ad Grants activation is approved, give
 * this route its own flag rather than flipping COMMERCIAL_SERVICES_ENABLED —
 * that one also un-hides /labs.
 *
 * The page keeps its own `robots: noindex` export, which still applies if the
 * flag is ever turned back on. app/api/request-quote/route.ts is untouched;
 * with no page to submit from, it has no reachable caller.
 */
export default function RequestQuoteLayout({ children }: { children: React.ReactNode }) {
  if (!COMMERCIAL_SERVICES_ENABLED) {
    notFound()
  }
  return <>{children}</>
}
