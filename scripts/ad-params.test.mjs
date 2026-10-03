// Run with `npm test` (node --test; Node 23+ strips the TypeScript types).
import { test } from 'node:test'
import assert from 'node:assert/strict'

import { pickAdParams, parseStoredAdParams, decorateHref } from '../lib/ad-params.ts'

const params = { gclid: 'abc123', utm_source: 'google', utm_campaign: 'eslp' }

test('pickAdParams keeps only forwarded, non-empty params', () => {
  assert.deepEqual(
    pickAdParams('?gclid=abc&utm_source=google&utm_medium=&foo=bar&ref=sandra'),
    { gclid: 'abc', utm_source: 'google', ref: 'sandra' },
  )
  assert.deepEqual(pickAdParams(''), {})
  assert.deepEqual(pickAdParams('?gbraid=g1&wbraid=w1'), { gbraid: 'g1', wbraid: 'w1' })
})

test('parseStoredAdParams tolerates junk', () => {
  assert.deepEqual(parseStoredAdParams(null), {})
  assert.deepEqual(parseStoredAdParams('not json'), {})
  assert.deepEqual(parseStoredAdParams('[1,2]'), {})
  assert.deepEqual(parseStoredAdParams('{"gclid":"x","evil":"y","utm_term":5}'), { gclid: 'x' })
})

test('decorateHref appends to our product hosts', () => {
  assert.equal(
    decorateHref('https://apply.edlight.org/scholars/individuals', params),
    'https://apply.edlight.org/scholars/individuals?gclid=abc123&utm_source=google&utm_campaign=eslp',
  )
  assert.match(decorateHref('https://academy.edlight.org/', params), /^https:\/\/academy\.edlight\.org\/\?gclid=abc123/)
  assert.match(decorateHref('https://code.edlight.org/learn#top', params), /\?gclid=abc123.*#top$/)
})

test('decorateHref never overwrites params already on the link', () => {
  assert.equal(
    decorateHref('https://apply.edlight.org/?utm_source=footer&x=1', params),
    'https://apply.edlight.org/?utm_source=footer&x=1&gclid=abc123&utm_campaign=eslp',
  )
  assert.equal(
    decorateHref('https://apply.edlight.org/?gclid=a&utm_source=b&utm_campaign=c', params),
    null,
  )
})

test('decorateHref leaves other hosts and schemes alone', () => {
  for (const href of [
    'https://www.edlight.org/eslp',
    '/donate',
    'https://drive.google.com/file/d/1',
    'https://apply.edlight.org.evil.com/',
    'https://evilapply.edlight.org/',
    'https://scholars.edlight.org/',
    'mailto:eslp@edlight.org',
    'javascript:void(0)',
  ]) {
    assert.equal(decorateHref(href, params, 'https://www.edlight.org/'), null, href)
  }
})

test('decorateHref is a no-op with nothing stored or a bad href', () => {
  assert.equal(decorateHref('https://apply.edlight.org/', {}), null)
  assert.equal(decorateHref('http://[bad', params), null)
})
