#!/usr/bin/env node
/**
 * Verify every locale defines exactly the same keys.
 *
 * A missing translation in next-intl does not crash — it falls back, or
 * renders the key path. Either way the failure is invisible until someone
 * browsing in French finds an English paragraph, which is precisely the kind
 * of silent breakage this codebase has been bitten by before (37 dead colour
 * classes, a navbar with no background, forms that 500'd in production).
 *
 * So: compare the key sets across locales and exit non-zero on any drift.
 * Also flags ICU placeholders that appear in one locale but not another —
 * a translated string that dropped its {year} renders a literal gap.
 *
 * Run: node scripts/check-messages.mjs
 */
import { readdirSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

const ROOT = new URL('../messages/', import.meta.url).pathname
const locales = readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()

if (locales.length < 2) {
  console.log(`only ${locales.length} locale(s) present — nothing to compare`)
  process.exit(0)
}

const [base, ...others] = locales

/** Flatten to dotted paths so nesting differences surface too. */
function flatten(obj, prefix = '', out = new Map()) {
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, path, out)
    else out.set(path, String(v))
  }
  return out
}

const placeholders = (s) => [...s.matchAll(/\{(\w+)/g)].map((m) => m[1]).sort().join(',')

function load(locale) {
  const dir = join(ROOT, locale)
  const merged = {}
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
    merged[file.replace(/\.json$/, '')] = JSON.parse(readFileSync(join(dir, file), 'utf8'))
  }
  return flatten(merged)
}

const baseKeys = load(base)
let failures = 0

for (const locale of others) {
  const dir = join(ROOT, locale)
  if (!existsSync(dir)) {
    console.error(`✗ ${locale}: directory missing`)
    failures++
    continue
  }

  const keys = load(locale)

  const missing = [...baseKeys.keys()].filter((k) => !keys.has(k))
  const extra = [...keys.keys()].filter((k) => !baseKeys.has(k))
  const badPlaceholders = [...baseKeys.entries()]
    .filter(([k, v]) => keys.has(k) && placeholders(v) !== placeholders(keys.get(k)))
    .map(([k, v]) => `${k}  (${base}: {${placeholders(v) || '—'}}  ${locale}: {${placeholders(keys.get(k)) || '—'}})`)

  if (!missing.length && !extra.length && !badPlaceholders.length) {
    console.log(`✓ ${locale}: ${keys.size} keys, matches ${base}`)
    continue
  }

  failures++
  console.error(`✗ ${locale}:`)
  if (missing.length) console.error(`  missing ${missing.length}:\n    ${missing.join('\n    ')}`)
  if (extra.length) console.error(`  not in ${base} (${extra.length}):\n    ${extra.join('\n    ')}`)
  if (badPlaceholders.length)
    console.error(`  placeholder mismatch (${badPlaceholders.length}):\n    ${badPlaceholders.join('\n    ')}`)
}

if (failures) {
  console.error(`\n${failures} locale(s) out of sync.`)
  process.exit(1)
}
console.log(`\nAll ${locales.length} locales in sync (${baseKeys.size} keys).`)
