/**
 * Honeypot for the public forms.
 *
 * Every form renders one extra input with this name, hidden from people
 * (off-screen, aria-hidden, not tabbable). Simple bots fill in every field
 * they find, so a non-empty value means the submission was not typed by a
 * person. "website" is a name bots like to fill and that browsers do not
 * autofill (Chrome has no URL autofill type), so real visitors leave it empty.
 *
 * The routes answer a tripped honeypot with the same success response a real
 * signup gets, so a bot has no signal to adapt to; they just skip the email.
 * This is a cheap first filter in front of BotID (lib/botid.ts), not a
 * replacement for it.
 */
export const HONEYPOT_FIELD = 'website'

export function honeypotTripped(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false
  const value = (body as Record<string, unknown>)[HONEYPOT_FIELD]
  return typeof value === 'string' && value.trim() !== ''
}
