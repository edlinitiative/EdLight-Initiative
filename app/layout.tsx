import type { Metadata } from 'next'
import { Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  SITE_URL,
  FOUNDED_YEAR,
  CONTACT_EMAIL,
  REGISTERED_ADDRESS,
  AREA_SERVED,
} from '@/lib/site'
import { SOCIAL_URLS } from '@/lib/socials'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'

const hankenGrotesk = Hanken_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const hankenGroteskDisplay = Hanken_Grotesk({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'EdLight Initiative',
  title: {
    default: 'EdLight Initiative | Empowering Haitian Youth Through Education',
    template: '%s | EdLight Initiative'
  },
  description:
    'Empowering the next generation of Haitian innovators through quality education, mentorship, and global opportunities. Free online courses, STEM programs, leadership training, and scholarships.',
  keywords: ['EdLight Initiative', 'Haiti education', 'STEM education', 'online courses', 'leadership program', 'scholarships Haiti', 'EdLight Academy', 'EdLight Labs', 'EdLight Nexus', 'ESLP'],
  authors: [{ name: 'EdLight Initiative' }],
  creator: 'EdLight Initiative',
  publisher: 'EdLight Initiative',
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'EdLight Initiative',
    title: 'EdLight Initiative | Empowering Haitian Youth Through Education',
    description: 'Empowering the next generation of Haitian innovators through quality education, mentorship, and global opportunities.',
    images: [
      {
        url: '/EdLight_Website_Logo.png',
        width: 1200,
        height: 630,
        alt: 'EdLight Initiative Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EdLight Initiative | Empowering Haitian Youth',
    description: 'Empowering the next generation of Haitian innovators through quality education, mentorship, and global opportunities.',
    images: ['/EdLight_Website_Logo.png'],
    creator: '@edlinitiative',
    site: '@edlinitiative',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    // Add when available
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EdLight Initiative',
    description: 'Empowering underserved communities through education, technology, and leadership development',
    url: SITE_URL,
    logo: `${SITE_URL}/EdLight_Website_Logo.png`,
    email: CONTACT_EMAIL,
    // addressCountry was 'HT'. The organisation is registered in Canada and
    // based in Montreal; Haiti is where it works, which is what areaServed is
    // for. Declaring Haiti as the postal address contradicted both the
    // footer's incorporation line and the registration itself.
    address: {
      '@type': 'PostalAddress',
      addressLocality: REGISTERED_ADDRESS.locality,
      addressRegion: REGISTERED_ADDRESS.region,
      addressCountry: REGISTERED_ADDRESS.countryCode,
    },
    // The canonical handles, matching the footer. 'twitter.com/edlightinit'
    // used to sit here and 404s — the account is @edlinitiative.
    sameAs: SOCIAL_URLS,
    foundingDate: String(FOUNDED_YEAR),
    areaServed: {
      '@type': 'Place',
      name: AREA_SERVED,
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EdLight Initiative',
    alternateName: 'EdLight',
    url: SITE_URL,
  }

  // `lang` follows the rendered locale rather than being hardcoded "en", so
  // it stays correct the moment a routing model is switched on.
  const locale = await getLocale()
  const messages = await getMessages()
  const t = await getTranslations('common')

  return (
      <html lang={locale} className={`${hankenGrotesk.variable} ${hankenGroteskDisplay.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        {/* Only the client components below actually need the provider, but
            wrapping here keeps every call site — server or client — reading
            from the same catalogue. Server components still resolve their
            messages on the server; nothing extra is shipped for those. */}
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">
            {t('skipToContent')}
          </a>
          <Navbar />
          <main id="main-content" className="pt-16">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
