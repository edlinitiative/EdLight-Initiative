/**
 * Helpers for putting visitor-submitted text into an email safely.
 *
 * The form routes email their submissions to a staff inbox, which means
 * anything a visitor types can end up in a mail header. A value containing a
 * CR or LF in a Subject line lets the submitter append headers of their own —
 * a second Bcc, a different Reply-To — so every field that reaches a header
 * has to be flattened first, and every field at all has to be bounded so a
 * single POST cannot mail us a megabyte.
 */

/** Longest we will accept for a short single-line field (name, phone, org). */
export const SHORT_FIELD_MAX = 200

/** Longest we will accept for a free-text field (message, notes, features). */
export const LONG_FIELD_MAX = 5000

/** CR, LF, tab, the rest of C0, and DEL. */
const CONTROL_CHARS = new RegExp('[\\u0000-\\u001F\\u007F]+', 'g')

/**
 * Read a string field from a parsed JSON body, trimmed and length-capped.
 *
 * Returns '' for anything that is not a string, so a caller can treat missing
 * and wrong-typed the same way.
 */
export function readField(value: unknown, max = SHORT_FIELD_MAX): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

/**
 * Make a value safe to interpolate into a mail header.
 *
 * Strips control characters, collapses whitespace, and caps the length. Use
 * this for anything reaching `subject`, and never rely on the mail provider
 * to do it.
 */
export function headerSafe(value: string, max = 120): string {
  return value.replace(CONTROL_CHARS, ' ').replace(/\s+/g, ' ').trim().slice(0, max)
}

/**
 * Pick a value from a fixed set, falling back when it is not one of them.
 *
 * For values that decide what an email says about itself — which list was
 * joined, say. The client sends a label for its own convenience, but the
 * server must not accept an arbitrary one just because the client offered it.
 */
export function oneOf<T extends string>(value: string, allowed: readonly T[], fallback: T): T {
  return (allowed as readonly string[]).includes(value) ? (value as T) : fallback
}
