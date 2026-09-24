import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { CLIENT_CHROME_NAMESPACES, pickMessages, type Namespace } from '@/i18n/namespaces'

/**
 * Ships a page's own namespaces to the client components under it, on top of
 * the shared chrome. Providers don't merge, so the chrome is repeated here
 * rather than lost for anything rendered inside.
 */
export default async function ClientMessages({
  namespaces,
  children,
}: {
  namespaces: readonly Namespace[]
  children: React.ReactNode
}) {
  const messages = (await getMessages()) as Record<string, unknown>
  return (
    <NextIntlClientProvider messages={pickMessages(messages, [...CLIENT_CHROME_NAMESPACES, ...namespaces])}>
      {children}
    </NextIntlClientProvider>
  )
}
