/**
 * Every translation namespace, and the single list that loads them.
 *
 * One file per namespace under messages/<locale>/, rather than one large
 * catalogue per locale. Ten thousand words of copy in a single JSON file is
 * unreviewable in a diff and a merge conflict every time two people touch
 * different pages; split by namespace, a change to the FAQ shows up as a
 * change to faq.json and nothing else.
 *
 * The list is explicit because the imports below have to be statically
 * analysable — a glob would not survive bundling.
 *
 * Adding a page: create messages/en/<name>.json and messages/fr/<name>.json,
 * then add <name> here. A namespace missing from either locale fails the
 * check in scripts/check-messages.mjs, which runs in the build.
 */
export const NAMESPACES = [
  // Shared chrome
  'common',
  'nav',
  'footer',
  'notify',
  'errors',
  // One per page
  'home',
  'about',
  'academy',
  'code',
  'scholars',
  'eslp',
  'faq',
  'getInvolved',
  'contact',
  'donate',
  'privacy',
  'terms',
] as const

export type Namespace = (typeof NAMESPACES)[number]

/** Load and merge every namespace for a locale into one messages object. */
export async function loadMessages(locale: string): Promise<Record<string, unknown>> {
  const entries = await Promise.all(
    NAMESPACES.map(async (ns) => {
      const mod = await import(`../messages/${locale}/${ns}.json`)
      return [ns, mod.default] as const
    })
  )

  return Object.fromEntries(entries)
}

/**
 * The namespaces client components read on every page: the navbar, footer,
 * language switcher and error boundary. Only these are serialised into every
 * page's HTML. The root layout used to hand NextIntlClientProvider the whole
 * catalogue, which put every page's copy — about 139 kB of the homepage's
 * 196 kB — into every response. A page whose own client components need more
 * wraps them in <ClientMessages> with that page's namespace.
 */
export const CLIENT_CHROME_NAMESPACES = ['common', 'nav', 'footer', 'errors'] as const satisfies readonly Namespace[]

export function pickMessages(
  messages: Record<string, unknown>,
  namespaces: readonly Namespace[]
): Record<string, unknown> {
  return Object.fromEntries(namespaces.filter((ns) => ns in messages).map((ns) => [ns, messages[ns]]))
}
