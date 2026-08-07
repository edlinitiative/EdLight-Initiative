import type { Metadata } from 'next'
import { Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SITE_URL, FOUNDED_YEAR } from '@/lib/site'

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

export default function RootLayout({
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
    email: 'info@edlight.org',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'HT',
    },
    // The canonical handles, matching the footer. 'twitter.com/edlightinit'
    // used to sit here and 404s — the account is @edlinitiative.
    sameAs: [
      'https://www.facebook.com/edlinitiative',
      'https://x.com/edlinitiative',
      'https://www.instagram.com/edlinitiative/',
      'https://www.linkedin.com/company/edlight-initiative/',
      'https://www.youtube.com/@edlight-initiative',
    ],
    foundingDate: String(FOUNDED_YEAR),
    areaServed: {
      '@type': 'Place',
      name: 'Haiti',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EdLight Initiative',
    alternateName: 'EdLight',
    url: SITE_URL,
  }

  return (
      <html lang="en" className={`${hankenGrotesk.variable} ${hankenGroteskDisplay.variable} ${jetbrainsMono.variable}`}>
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
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
