/**
 * The form endpoints BotID protects.
 *
 * <BotIdClient> in app/[locale]/layout.tsx attaches BotID's headers only to
 * requests that match this list, and checkBotId() in a route fails for any
 * request that did not get them. So every route that calls checkBotId() must
 * be listed here, or real visitors get a 403.
 *
 * In local development checkBotId() always reports a human. In production a
 * direct curl to these routes is treated as a bot; test from the page.
 */
export const BOTID_PROTECTED_ROUTES = [
  { path: '/api/store-interest', method: 'POST' },
  { path: '/api/eslp-notify', method: 'POST' },
  { path: '/api/newsletter', method: 'POST' },
  { path: '/api/contact', method: 'POST' },
  { path: '/api/request-quote', method: 'POST' },
] as const
