import type { Metadata } from 'next'

/**
 * Why this layout exists at all: to noindex /labs.
 *
 * EdLight Labs sells commercial web services — quotes, care plans, client
 * work, a "Request a quote" funnel. That is a legitimate thing for the
 * organisation to do, but it is not a free student programme, and it was
 * indexed and sitemapped on the same domain as a Google Ad Grants
 * application. A reviewer assessing a nonprofit site does not need to find a
 * paid-services page in the sitemap.
 *
 * The page keeps working for anyone sent to it directly. It is only out of
 * the index, the sitemap, the navbar, and the homepage programme list — the
 * same treatment /store already has.
 *
 * It needs a layout rather than a `metadata` export because app/labs/page.tsx
 * is a client component, and client components cannot export metadata.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
