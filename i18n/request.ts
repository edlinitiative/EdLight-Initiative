import { getRequestConfig } from 'next-intl/server'
import { DEFAULT_LOCALE, isLocale } from './config'
import { loadMessages } from './namespaces'

/**
 * next-intl's per-request configuration.
 *
 * The locale comes from the [locale] route segment, which middleware.ts fills
 * in by rewriting — the visitor never sees it in the URL. Because it is a real
 * route segment, both locales are statically prerendered at build time; the
 * rewrite just picks which prebuilt page to serve.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = isLocale(requested ?? '') ? (requested as string) : DEFAULT_LOCALE

  return {
    locale,
    messages: await loadMessages(locale as 'en' | 'fr'),
  }
})
