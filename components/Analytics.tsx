'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

import { GOOGLE_ADS_ID, isAdminPath, isDonateUrl, programDestination, track } from '@/lib/analytics'

/**
 * GA4 + Google Ads measurement. Rendered by the root layout only when
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set (see lib/analytics.ts); with it unset
 * this component is never mounted and nothing Google-related reaches the page.
 *
 * Consent Mode v2 defaults, set before the config call:
 *   - ad_storage, ad_user_data, ad_personalization: DENIED, always. No
 *     remarketing, no ad personalisation, no ad cookies.
 *   - analytics_storage: GRANTED. This is a deliberate choice with no consent
 *     banner: EdLight is a Canadian not-for-profit and visitors are mostly in
 *     Haiti and the US, where first-party analytics cookies do not require
 *     prior opt-in. The privacy policy discloses it and links the opt-out.
 *     REVISIT THIS if EU/UK traffic becomes meaningful: there, analytics
 *     cookies need consent first, which means a banner and defaulting
 *     analytics_storage to denied for those regions.
 *   - url_passthrough: true, so Google Ads clicks still attribute to
 *     conversions (via the gclid on the URL) without any ad cookie.
 *   - The Google Ads tag (GOOGLE_ADS_ID) is configured on the same loader,
 *     under the same denied ad consent.
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

  const id = JSON.stringify(measurementId)

  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('set','url_passthrough',true);
gtag('js',new Date());
gtag('config',${id},{allow_google_signals:false,allow_ad_personalization_signals:false});${
          GOOGLE_ADS_ID ? `\ngtag('config',${JSON.stringify(GOOGLE_ADS_ID)},{allow_ad_personalization_signals:false});` : ''
        }`}
      </Script>
      <Script
        id="ga-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
      />
    </>
  )
}
