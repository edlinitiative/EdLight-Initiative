import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import storeData from '@/data/store.json'
import { readField, headerSafe, oneOf } from '@/lib/formInput'
import { rateLimit, clientIp } from '@/lib/rateLimit'

/**
 * "I want one" on /store. Nothing in the store can be bought yet, so each item
 * collects interest instead: the inbox gets one email per request, naming the
 * item and size, which tells us what to order and in what quantities before
 * we spend money on stock. Same delivery as /api/eslp-notify (Resend, no
 * writable disk on Vercel).
 */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', ''] as const

const resendApiKey = process.env.RESEND_API_KEY
const storeInbox =
  process.env.STORE_INBOX || process.env.NEWSLETTER_INBOX || process.env.CONTACT_INBOX
const fromAddress =
  process.env.NEWSLETTER_FROM_EMAIL || 'EdLight Initiative <onboarding@resend.dev>'

const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    // Mails a confirmation to the address it is given, so it is throttled for
    // the same reason the notify list is.
    const limit = rateLimit(`store:${clientIp(request)}`, 8, 60 * 60 * 1000)
    if (!limit.ok) {
      return NextResponse.json(
        { success: false, message: 'Too many requests from this connection. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      )
    }

    const body = await request.json().catch(() => null)

    const name = readField(body?.name)
    const email = readField(body?.email)
    const itemId = readField(body?.item)
    const size = oneOf(readField(body?.size), SIZES, '')
    const quantity = Math.min(Math.max(Number.parseInt(String(body?.quantity ?? '1'), 10) || 1, 1), 20)

    // The item names the subject line, so it is looked up in the catalogue and
    // never taken as free text (see the CR/LF note in eslp-notify).
    const item = storeData.find((p) => p.id === itemId)
    if (!item) {
      return NextResponse.json({ success: false, message: 'Unknown item.' }, { status: 400 })
    }
    if (!name) {
      return NextResponse.json({ success: false, message: 'Please provide your name.' }, { status: 400 })
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    if (!resend || !storeInbox) {
      console.warn('Store interest attempted without Resend configuration.')
      return NextResponse.json(
        {
          success: false,
          message: 'This form is not available right now. Please email info@edlight.org and we will note your interest.',
        },
        { status: 500 }
      )
    }

    await resend.emails.send({
      from: fromAddress,
      to: [storeInbox],
      subject: `Store interest: ${item.name}${size ? ` (${size})` : ''}`,
      text: [
        `Someone wants the ${item.name}.`,
        '',
        `Name:     ${headerSafe(name)}`,
        `Email:    ${email}`,
        `Size:     ${size || '(n/a)'}`,
        `Quantity: ${quantity}`,
        `Price:    $${item.price}${item.priceSuffix ?? ''}`,
      ].join('\n'),
    })

    await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: `We saved your spot for the ${item.name}`,
      text: [
        `Hi ${headerSafe(name)},`,
        '',
        `Thanks for wanting the ${item.name}${size ? ` in ${size}` : ''}. It is not available yet, and your request helps us decide what to make first. We'll email you as soon as you can order it.`,
        '',
        'Every purchase funds scholarships, learning materials, and programs for young people in Haiti.',
        '',
        'EdLight Initiative',
      ].join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Store interest failed:', msg)
    return NextResponse.json(
      {
        success: false,
        message: 'We could not save that just now. Please try again, or email info@edlight.org.',
      },
      { status: 500 }
    )
  }
}
