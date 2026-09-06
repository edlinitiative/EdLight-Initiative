import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { COMMERCIAL_SERVICES_ENABLED } from '@/lib/site'

/**
 * Why this layout exists at all: to noindex /labs, and now to hide it.
 *
 * EdLight Labs sells commercial web services — quotes, care plans, client
 * work, a "Request a quote" funnel. That is a legitimate thing for the
 * organisation to do, but it is not a free student programme, and it was
 * indexed and sitemapped on the same domain as a Google Ad Grants
 * application. A reviewer assessing a nonprofit site does not need to find a
 * paid-services page in the sitemap.
 *
 * Noindex alone turned out not to be enough. It keeps the page out of search
 * results, but the page still answered to anyone who asked for it, and an Ad
 * Grants reviewer browsing the site is exactly the reader we were trying not
 * to hand a paid-services page to. So while COMMERCIAL_SERVICES_ENABLED is
 * false, this route 404s outright. See that flag in lib/site.ts for how to
 * bring it back after approval.
 *
 * It needs a layout rather than a `metadata` export because app/labs/page.tsx
 * is a client component, and client components cannot export metadata.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  if (!COMMERCIAL_SERVICES_ENABLED) {
    notFound()
  }
  return <>{children}</>
}
