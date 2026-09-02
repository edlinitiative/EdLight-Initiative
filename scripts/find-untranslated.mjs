#!/usr/bin/env node
/**
 * Find user-visible English text still hardcoded in components.
 *
 * Written after a real miss: `footer.newsletterBlurb` was extracted into the
 * catalogue, translated, and then not actually used — the component still
 * rendered the English literal, so the key was dead and the French would have
 * shown an English line. A single-line grep did not catch it because the text
 * sat on its own line inside a multi-line JSX element.
 *
 * This scans for two shapes:
 *   1. JSX text nodes  —  >Some visible words<
 *   2. Translatable-looking JSX string attributes (alt, title, placeholder,
 *      aria-label) that are plain literals rather than {t(...)} calls
 *
 * It is a heuristic, not a proof. It deliberately ignores anything that looks
 * like code, a single word that could be a brand, or an entity we know is a
 * proper noun. Read the output; do not assume every hit is a bug.
 *
 * Run: node scripts/find-untranslated.mjs [dir ...]
 */
import { readdirSync, readFileSync, statSync } from 'fs'
import { join, extname } from 'path'

const ROOTS = process.argv.slice(2).length ? process.argv.slice(2) : ['app', 'components']

// Files that legitimately hold English-only UI (noindexed commercial pages).
const SKIP_FILES = [
  'app/admin/page.tsx',
  'components/RequestQuoteForm.tsx',
  'app/labs/page.tsx',
  'app/request-quote/page.tsx',
  'app/store/page.tsx',
  'app/nexus/page.tsx',
]

// Words that are proper nouns or code-ish and never need translating alone.
const ALLOW = new Set([
  'EdLight', 'ESLP', 'Coursera', 'PayPal', 'Resend', 'UWC', 'IICA', 'SVT',
  'iOS', 'Android', 'Python', 'SQL', 'HTML', 'CSS', 'JavaScript', 'Git',
  'EdLight Initiative', 'EdLight Academy', 'EdLight Code', 'EdLight Labs',
  'EdLight Nexus', 'Coursera Scholars', 'Terminal & Git',
])

const ATTRS = ['alt', 'title', 'placeholder', 'aria-label']

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (entry === 'node_modules' || entry === '.next') continue
    if (statSync(p).isDirectory()) walk(p, out)
    else if (['.tsx', '.jsx'].includes(extname(p))) out.push(p)
  }
  return out
}

let total = 0

for (const root of ROOTS) {
  for (const file of walk(root)) {
    if (SKIP_FILES.includes(file)) continue
    const src = readFileSync(file, 'utf8')

    // Strip comments and code so we only look at markup.
    const cleaned = src
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '')

    const hits = []

    // 1. JSX text nodes: >text< where text has two+ letter-words and no braces
    for (const m of cleaned.matchAll(/>([^<>{}]+)</g)) {
      const raw = m[1].replace(/\s+/g, ' ').trim()
      if (!raw || ALLOW.has(raw)) continue
      // needs at least two words, at least one of them 3+ letters
      const words = raw.split(/\s+/).filter((w) => /[A-Za-z]/.test(w))
      if (words.length < 2) continue
      if (!words.some((w) => /^[A-Za-z]{3,}/.test(w))) continue
      // skip pure punctuation/symbol runs and obvious non-prose
      if (/^[\d\s\W]+$/.test(raw)) continue
      // Reject code. TypeScript generics (`useState<'idle' | 'error'>(…)`) and
      // conditional JSX (`cond ? (`) both produce >…< pairs that look like
      // text nodes to a regex. Prose does not contain these.
      if (/[(){};=]|=>|\bconst\b|\breturn\b|\buse[A-Z]\w*\b|\?\s*\(|\.\w+\(/.test(raw)) continue
      // Prose starts with a letter or an opening quote, not an operator.
      if (!/^["'“”'(]?[A-Za-z]/.test(raw)) continue
      hits.push(['text', raw])
    }

    // 2. Literal translatable attributes
    for (const attr of ATTRS) {
      const re = new RegExp(`\\b${attr}="([^"]{2,})"`, 'g')
      for (const m of cleaned.matchAll(re)) {
        const raw = m[1].trim()
        if (!raw || ALLOW.has(raw)) continue
        if (!/[A-Za-z]{3,}/.test(raw)) continue
        hits.push([attr, raw])
      }
    }

    if (hits.length) {
      console.log(`\n${file}`)
      for (const [kind, raw] of hits) {
        console.log(`  ${kind.padEnd(11)} ${JSON.stringify(raw.slice(0, 110))}`)
        total++
      }
    }
  }
}

console.log(total ? `\n${total} possible untranslated string(s) — review each.` : '\nNo hardcoded user-visible text found.')
