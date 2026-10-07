const createNextIntlPlugin = require('next-intl/plugin')
const { withBotId } = require('botid/next/config')

// Points next-intl at i18n/request.ts. Without i18n routing: the locale comes
// from i18n/config.ts rather than a URL segment, so app/ keeps its shape and
// pages stay statically prerendered. That file documents what to change when
// a routing model is picked.
const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // /courses, /global-exchange and /mission_projects were removed. All three
    // were live, listed in sitemap.xml and linked from the homepage and the
    // footer, so they are almost certainly indexed — letting them 404 would
    // strand real inbound traffic and hand the Google Ad Grants site policy
    // exactly the kind of broken destination it rejects a site over.
    //
    // Each points at the page that still covers the same ground. Permanent,
    // because they are not coming back; flip to `permanent: false` if that
    // changes, since browsers cache a 308 hard.
    //
    // NOTE: this is next.config.JS. Next 14 reads this file and ignores
    // next.config.ts entirely (.ts config landed in Next 15) — which is also
    // why the www→apex redirect sitting in next.config.ts has never fired.
    return [
      { source: '/courses', destination: '/academy', permanent: true },
      { source: '/global-exchange', destination: '/nexus', permanent: true },
      { source: '/mission_projects', destination: '/about', permanent: true },
      // The Scholars programme moved from /coursera-scholars on 2026-10-07 when
      // DataCamp joined Coursera. The old url is printed on the partner flyers'
      // QR codes and in sent emails, so it must keep resolving, forever.
      { source: '/coursera-scholars', destination: '/scholars', permanent: true },
      { source: '/:locale(en|fr)/coursera-scholars', destination: '/scholars', permanent: true },
    ]
  },
  async headers() {
    // Rescued from next.config.ts, which Next 14 never reads — so none of
    // these were reaching production. Checked against the live site before
    // moving them: only Strict-Transport-Security was being sent, and that
    // comes from Vercel, not from here. X-Frame-Options, X-Content-Type-
    // Options, Referrer-Policy and Permissions-Policy were all absent.
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

// withBotId adds the rewrites that proxy BotID's challenge script through our
// own domain, so ad blockers do not strip it. See lib/botid.ts.
module.exports = withBotId(withNextIntl(nextConfig))
