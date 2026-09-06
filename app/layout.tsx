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
  CORPORATION_NUMBER,
  MISSION_STATEMENT,
  ACTIVITIES_STATEMENT,
} from '@/lib/site'
import { SOCIAL_URLS } from '@/lib/socials'

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
  // Leads with the mission and the nonprofit status, because this is the
  // sentence that shows under the title in search results and it is where a
  // reviewer searching for the organisation first sees what it is.
  description:
    `${MISSION_STATEMENT} A registered Canadian not-for-profit running free online courses, coding tracks in Haitian Creole, French, and English, funded professional certificates, and a summer leadership programme.`,
  // 'EdLight Labs' and 'EdLight Nexus' are gone: Labs 404s while
  // COMMERCIAL_SERVICES_ENABLED is false and Nexus is noindexed with no
  // cohort to join, so the site was advertising two brands it does not serve
  // a page for.
  keywords: ['EdLight Initiative', 'Haiti education', 'STEM education', 'online courses', 'leadership program', 'scholarships Haiti', 'EdLight Academy', 'EdLight Code', 'EdLight Scholars', 'ESLP'],
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
  // '@type': 'NGO', not 'Organization'. The Ad Grants website policy requires
  // the site to display its nonprofit status prominently, and the structured
  // data is where an automated review looks first. 'Organization' is the
  // generic supertype a for-profit company also uses, so the one
  // machine-readable statement of what this entity is said nothing about it
  // being a nonprofit. NGO is schema.org's nonprofit subtype.
  //
  // The description was also its own problem: "Empowering underserved
  // communities through education, technology, and leadership development"
  // names no country, no activity, and no beneficiary, and matched none of
  // the three mission statements the pages carried. It reads as the mission
  // statement of nothing in particular. It now renders the canonical one.
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'EdLight Initiative',
    description: `${MISSION_STATEMENT} ${ACTIVITIES_STATEMENT}`,
    slogan: MISSION_STATEMENT,
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
    // The registration a reviewer can check against Corporations Canada.
    // Publishing it as a typed identifier rather than only as prose in the
    // footer means the claim and the evidence for it travel together.
    identifier: {
      '@type': 'PropertyValue',
      name: 'Corporations Canada corporation number',
      value: CORPORATION_NUMBER,
    },
    nonprofitStatus: 'Not-for-profit corporation, Canada Not-for-profit Corporations Act',
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
