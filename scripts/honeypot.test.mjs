// Run with `npm test` (node --test; Node 23+ strips the TypeScript types).
import { test } from 'node:test'
import assert from 'node:assert/strict'

import { HONEYPOT_FIELD, honeypotTripped } from '../lib/honeypot.ts'

test('an empty or missing honeypot lets the submission through', () => {
  assert.equal(honeypotTripped({ email: 'a@b.co' }), false)
  assert.equal(honeypotTripped({ email: 'a@b.co', [HONEYPOT_FIELD]: '' }), false)
  assert.equal(honeypotTripped({ [HONEYPOT_FIELD]: '   ' }), false)
  assert.equal(honeypotTripped(null), false)
  assert.equal(honeypotTripped('website=x'), false)
})

test('any text in the honeypot marks the submission as a bot', () => {
  assert.equal(honeypotTripped({ [HONEYPOT_FIELD]: 'http://spam.example' }), true)
  assert.equal(honeypotTripped({ name: 'Bot', [HONEYPOT_FIELD]: 'x' }), true)
})
