import type { Metadata } from 'next'

/**
 * Why this layout exists at all: to noindex /admin.
 *
 * The admin dashboard was serving `<meta name="robots" content="index,
 * follow">` — it inherited the site-wide `index: true` from the root layout
 * and nothing overrode it. robots.txt looked like it covered this, but
 * `Disallow: /admin/` only matches paths that continue past the slash, and the
 * route is `/admin`. So the one page on the site that exists to edit content
 * was both crawlable and explicitly marked indexable.
 *
 * Two reasons that matters for the Ad Grants review: an internal dashboard in
 * the index is not the "substantial content" the website policy asks for, and
 * a reviewer who finds it has found a page that is useless to the students
 * the site claims to serve. Keeping it out of the index is also just correct
 * regardless of the grant.
 *
 * This is a noindex, not access control — the route still answers to anyone
 * who requests it, and the API routes behind it (app/api/admin/*) are where
 * authorisation is actually enforced. Same treatment /labs, /nexus, /store,
 * and /request-quote already have.
 *
 * It needs a layout rather than a `metadata` export because app/admin/page.tsx
 * is a client component, and client components cannot export metadata.
 */
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
