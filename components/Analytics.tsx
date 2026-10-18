'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

import { GOOGLE_ADS_ID, gtagBootstrap, isAdminPath, isDonateUrl, programDestination, track } from '@/lib/analytics'

/**
 * GA4 + Google Ads measurement. Rendered by the root layout only when
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set (see lib/analytics.ts); with it unset
 * this component is never mounted and nothing Google-related reaches the page.
 *
 * Consent Mode v2 ("advanced": gtag always loads, consent decides what it
 * may store), built by gtagBootstrap() in lib/analytics.ts:
 *   - EEA, UK and Switzerland (CONSENT_DENIED_REGIONS): analytics_storage,
 *     ad_storage, ad_user_data and ad_personalization all DENIED. No banner,
 *     so they stay denied: Google gets cookieless pings only.
 *   - Everywhere else: all four GRANTED, so GA4 and the Google Ads tag can set
 *     their first-party cookies and attribute conversions to ad clicks.
 *     EdLight is a Canadian not-for-profit whose visitors are mostly in Haiti,
 *     the US and Canada. Remarketing stays off regardless: both configs pass
 *     allow_ad_personalization_signals:false and Google signals is off.
 *   - url_passthrough: true, so Google Ads clicks still attribute (via the
 *     gclid on the URL) where ad cookies are denied.
 *   - linker: LINKER_DOMAINS, so the session and click id carry to
 *     apply / academy / code.edlight.org.
 *   - The Google Ads tag (GOOGLE_ADS_ID) is configured on the same loader.
 * If a consent banner is ever added, a decline must call
 * gtag('consent','update',{...all four:'denied'}), and /privacy must change
 * in the same commit.
 *
 * Admin routes are never measured: the tag is not rendered there, and if gtag
 * is already loaded from a public page it is disabled while on /admin.
 *
 * Clicks are measured with one delegated listener rather than handlers on
 * every CTA, so server-rendered links (most of them) need no client code:
 *   - donate_click: any link to /donate or PayPal's donate flow, or a click
 *     inside an element marked data-analytics-donate (the PayPal SDK button).
 *     `location` comes from the nearest data-analytics-location, else the
 *     enclosing nav/footer, else the current path.
 *   - program_click: any link to an EdLight product subdomain or app store.
 * generate_lead is fired by each form after a successful submit.
 */
export default function Analytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()
  const onAdmin = isAdminPath(pathname)

  useEffect(() => {
    const w = window as unknown as Record<string, unknown>
    w[`ga-disable-${measurementId}`] = onAdmin
    if (GOOGLE_ADS_ID) w[`ga-disable-${GOOGLE_ADS_ID}`] = onAdmin
  }, [measurementId, onAdmin])

  useEffect(() => {
    if (onAdmin) return

    const onClick = (event: MouseEvent) => {
      // Primary and middle clicks both open the destination.
      if (event.type === 'auxclick' && event.button !== 1) return
      const target = event.target as Element | null
      if (!target || typeof target.closest !== 'function') return

      const marked = target.closest('[data-analytics-donate]')
      const anchor = target.closest('a[href]') as HTMLAnchorElement | null

      let url: URL | null = null
      if (anchor) {
        try {
          url = new URL(anchor.href, window.location.href)
        } catch {
          url = null
        }
      }

      if (marked || (url && isDonateUrl(url, window.location.origin))) {
        const el = (marked ?? anchor) as Element
        const labelled = el.closest('[data-analytics-location]') as HTMLElement | null
        const location =
          labelled?.dataset.analyticsLocation ??
          (el.closest('nav') ? 'navbar' : el.closest('footer') ? 'footer' : `page:${window.location.pathname}`)
        track('donate_click', { location })
        return
      }

      if (url) {
        const destination = programDestination(url)
        if (destination) track('program_click', { destination })
      }
    }

    document.addEventListener('click', onClick, true)
    document.addEventListener('auxclick', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('auxclick', onClick, true)
    }
  }, [onAdmin])

  if (onAdmin) return null

  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">
        {gtagBootstrap(measurementId, GOOGLE_ADS_ID)}
      </Script>
      <Script
        id="ga-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
      />
    </>
  )
}
