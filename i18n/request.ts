import { getRequestConfig } from 'next-intl/server'
import { resolveLocale } from './config'
import { loadMessages } from './namespaces'

/**
 * next-intl's per-request configuration.
 *
 * Wired without i18n routing: the locale comes from resolveLocale() rather
 * than from a URL segment, so the app/ directory keeps its current shape and
 * every page stays statically prerendered. See i18n/config.ts for what
 * changes when a routing model is chosen.
 */
export default getRequestConfig(async () => {
  const locale = resolveLocale()

  return {
    locale,
    messages: await loadMessages(locale),
  }
})
