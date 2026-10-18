// Run with `npm test` (node --test; Node 23+ strips the TypeScript types).
import { test } from 'node:test'
import assert from 'node:assert/strict'

import {
  CONSENT_DENIED_REGIONS,
  GOOGLE_ADS_ID,
  LINKER_DOMAINS,
  gtagBootstrap,
  notifyLeadParams,
  track,
  validAdsId,
} from '../lib/analytics.ts'

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
    assert.deepEqual(calls, [
      ['event', 'generate_lead', { form: 'eslp_notify', cycle: 'ESLP 2027', transport_type: 'beacon' }],
    ])

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

test('track sends with beacon transport so hits survive navigation', () => {
  globalThis.window = {}
  try {
    const calls = []
    globalThis.window.gtag = (...args) => calls.push(args)
    track('program_click', { destination: 'apply_scholars' })
    assert.deepEqual(calls, [
      ['event', 'program_click', { destination: 'apply_scholars', transport_type: 'beacon' }],
    ])
  } finally {
    delete globalThis.window
  }
})

test('gtagBootstrap sets region-denied and global-granted consent before config', () => {
  const calls = []
  const window = {}
  const run = new Function('window', 'dataLayer', `${gtagBootstrap('G-TEST123', 'AW-42')}; return gtag`)
  const dataLayer = []
  window.dataLayer = dataLayer
  // The script declares its own gtag that pushes `arguments` onto dataLayer.
  run(window, dataLayer)
  for (const args of dataLayer) calls.push(Array.from(args))

  const [regional, global] = calls.filter((c) => c[0] === 'consent')
  assert.equal(regional[1], 'default')
  for (const key of ['analytics_storage', 'ad_storage', 'ad_user_data', 'ad_personalization']) {
    assert.equal(regional[2][key], 'denied')
    assert.equal(global[2][key], 'granted')
  }
  assert.deepEqual(regional[2].region, [...CONSENT_DENIED_REGIONS])
  for (const code of ['DE', 'FR', 'IE', 'GB', 'CH', 'IS', 'LI', 'NO']) assert.ok(regional[2].region.includes(code))
  assert.equal(CONSENT_DENIED_REGIONS.length, 32)
  assert.equal(global[2].region, undefined)

  const firstConfig = calls.findIndex((c) => c[0] === 'config')
  assert.ok(calls.findLastIndex((c) => c[0] === 'consent' || c[0] === 'set') < firstConfig)
  assert.deepEqual(calls.find((c) => c[0] === 'set' && c[1] === 'url_passthrough'), ['set', 'url_passthrough', true])
  const linker = calls.find((c) => c[0] === 'set' && c[1] === 'linker')
  assert.deepEqual(linker[2].domains, [...LINKER_DOMAINS])
  for (const d of ['edlight.org', 'www.edlight.org', 'apply.edlight.org', 'academy.edlight.org', 'code.edlight.org']) {
    assert.ok(linker[2].domains.includes(d))
  }
  assert.deepEqual(
    calls.filter((c) => c[0] === 'config').map((c) => c[1]),
    ['G-TEST123', 'AW-42'],
  )
  assert.ok(gtagBootstrap('G-TEST123', '').indexOf('AW-') === -1)
})
