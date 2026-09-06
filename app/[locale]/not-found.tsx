import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

// The programme shortcuts used to list EdLight Labs and EdLight Nexus. Both
// are noindexed and delinked from the nav, footer and homepage — Labs because
// it sells commercial web services, Nexus because it has no cohort or way to
// apply — so a 404 page was the last place still sending people (and
// crawlers) to them. These are the four live programmes.
const programmeLinks = [
  { href: '/academy', label: 'EdLight Academy' },
  { href: '/code', label: 'EdLight Code' },
  { href: '/coursera-scholars', label: 'Coursera Scholars' },
  { href: '/eslp', label: 'ESLP' },
]

export default async function NotFound() {
  const t = await getTranslations('errors')

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t('notFoundTitle')}
        </h2>
        <p className="text-lg text-gray-600 mb-8">{t('notFoundBody')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {t('goHome')}
          </Link>
          <Link
            href="/contact"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            {t('contactUs')}
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {programmeLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="text-blue-600 hover:underline">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
