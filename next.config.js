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
    ]
  },
}

module.exports = nextConfig
