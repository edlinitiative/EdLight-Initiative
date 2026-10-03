'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import {
  AD_PARAMS_STORAGE_KEY,
  decorateHref,
  hasAdParams,
  parseStoredAdParams,
  pickAdParams,
  type AdParams,
} from '@/lib/ad-params'

// Fallback for when sessionStorage throws: forwarding still works for the
// rest of this page's life, just not across a full reload.
let memoryParams: AdParams = {}

function readStored(): AdParams {
  try {
    const stored = parseStoredAdParams(window.sessionStorage.getItem(AD_PARAMS_STORAGE_KEY))
    return hasAdParams(stored) ? stored : memoryParams
  } catch {
    return memoryParams
  }
}

/**
 * Keeps the landing page's ad/campaign params (gclid, gbraid, wbraid, utm_*,
 * ref) for the session and appends them to links to apply / academy / code
 * .edlight.org when they are used, so Google Ads can attribute conversions
 * that happen on those sites. See lib/ad-params.ts for the why.
 *
 * Renders nothing. One delegated listener on document covers every link —
 * navbar, footer, server-rendered page content — without touching markup, so
 * SSR output and hydration are unaffected. The href is rewritten in the
 * capture phase, before the browser follows it. contextmenu is included so
 * "open in new tab" / "copy link" get the decorated URL too.
 */
export default function AdParamForwarder() {
  // usePathname, not useSearchParams: the latter would force a Suspense
  // boundary in this statically rendered layout. The query is read from
  // window.location inside the effect instead.
  const pathname = usePathname()

  // Capture on landing and on any client navigation that carries params.
  // A fresh set replaces the stored one whole, so one click's gclid is never
  // paired with another campaign's utm_* values.
  useEffect(() => {
    const fresh = pickAdParams(window.location.search)
    if (!hasAdParams(fresh)) return
    memoryParams = fresh
    try {
      window.sessionStorage.setItem(AD_PARAMS_STORAGE_KEY, JSON.stringify(fresh))
    } catch {
      // Storage blocked (private mode, disabled site data): memoryParams
      // still covers this page view.
    }
  }, [pathname])

  useEffect(() => {
    const onActivate = (event: Event) => {
      const target = event.target as Element | null
      if (!target || typeof target.closest !== 'function') return
      const anchor = target.closest('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      try {
        const params = readStored()
        const next = decorateHref(anchor.href, params, window.location.href)
        if (next) anchor.href = next
      } catch {
        // Never block the navigation.
      }
    }

    const events = ['click', 'auxclick', 'contextmenu'] as const
    events.forEach((type) => document.addEventListener(type, onActivate, true))
    return () => events.forEach((type) => document.removeEventListener(type, onActivate, true))
  }, [])

  return null
}
