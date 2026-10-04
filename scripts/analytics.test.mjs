// Run with `npm test` (node --test; Node 23+ strips the TypeScript types).
import { test } from 'node:test'
import assert from 'node:assert/strict'

import { GOOGLE_ADS_ID, notifyLeadParams, track, validAdsId } from '../lib/analytics.ts'

test('notifyLeadParams maps the notify lists to fixed labels', () => {
  assert.deepEqual(notifyLeadParams('ESLP 2027'), { form: 'eslp_notify', cycle: 'ESLP 2027' })
  assert.deepEqual(notifyLeadParams('ESLP 2028'), { form: 'eslp_notify', cycle: 'ESLP 2028' })
  assert.deepEqual(notifyLeadParams('EdLight Scholars'), { form: 'scholars_notify', cycle: 'EdLight Scholars' })
  assert.deepEqual(notifyLeadParams('Coursera Scholars'), { form: 'scholars_notify', cycle: 'Coursera Scholars' })
  assert.deepEqual(notifyLeadParams('EdLight Nexus'), { form: 'nexus_notify', cycle: 'EdLight Nexus' })
})

test('notifyLeadParams never echoes an unknown label', () => {
  assert.deepEqual(notifyLeadParams('someone@example.com'), { form: 'notify', cycle: 'other' })
  assert.deepEqual(notifyLeadParams(''), { form: 'notify', cycle: 'other' })
  assert.deepEqual(notifyLeadParams('ESLP 2027 extra'), { form: 'notify', cycle: 'other' })
})

test('track is a no-op without a window or gtag, and never throws', () => {
  assert.equal(typeof globalThis.window, 'undefined')
  assert.doesNotThrow(() => track('generate_lead', { form: 'eslp_notify', cycle: 'ESLP 2027' }))

  globalThis.window = {}
  try {
    assert.doesNotThrow(() => track('generate_lead', { form: 'eslp_notify', cycle: 'ESLP 2027' }))

    const calls = []
    globalThis.window.gtag = (...args) => calls.push(args)
    track('generate_lead', { form: 'eslp_notify', cycle: 'ESLP 2027' })
    assert.deepEqual(calls, [['event', 'generate_lead', { form: 'eslp_notify', cycle: 'ESLP 2027' }]])

    globalThis.window.gtag = () => {
      throw new Error('gtag broke')
    }
    assert.doesNotThrow(() => track('generate_lead', { form: 'newsletter' }))
  } finally {
    delete globalThis.window
  }
})

test('validAdsId accepts only AW- conversion ids', () => {
  assert.equal(validAdsId('AW-18486508230'), 'AW-18486508230')
  assert.equal(validAdsId('  AW-123 '), 'AW-123')
  assert.equal(validAdsId('G-NZ309H8E84'), '')
  assert.equal(validAdsId("AW-1');alert(1);//"), '')
  assert.equal(validAdsId(''), '')
  assert.equal(GOOGLE_ADS_ID, 'AW-18486508230')
})
