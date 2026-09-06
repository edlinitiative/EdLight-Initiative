import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { readField, headerSafe, oneOf } from '@/lib/formInput'
import { rateLimit, clientIp } from '@/lib/rateLimit'

/**
 * This route used to append each signup to data/eslp-notifications.json with
 * fs.writeFile. That cannot work here: the site runs on Vercel, where the
 * deployment filesystem is read-only outside /tmp, so every submission threw
 * EROFS, hit the catch, and returned a 500 — while the modal told the visitor
 * nothing had gone wrong beyond "please try again". Anything that did write,
 * in local dev, was personal data (names, emails, phone numbers) sitting
 * unencrypted in the repo.
 *
 * It now emails the notify inbox, the same way /api/contact and
 * /api/newsletter already do. That is durable, needs no writable disk, and
 * puts the signup somewhere a person will actually see it.
 */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * The lists this endpoint will accept a signup for.
 *
 * Must stay in step with the `cycleLabel` values passed to NotifyModal —
 * 'ESLP 2027' from app/eslp/page.tsx, 'EdLight Scholars' from
 * app/coursera-scholars/page.tsx. Anything else falls back to a generic
 * label rather than being echoed into the email.
 *
 * 'Coursera Scholars' is the pre-rename label. It stays accepted so signups
 * recorded under it remain valid; nothing sends it any more.
 */
const NOTIFY_CYCLES = ['ESLP 2027', 'EdLight Scholars', 'Coursera Scholars'] as const

const resendApiKey = process.env.RESEND_API_KEY
const notifyInbox =
  process.env.ESLP_NOTIFY_INBOX || process.env.NEWSLETTER_INBOX || process.env.CONTACT_INBOX
const fromAddress =
  process.env.NEWSLETTER_FROM_EMAIL || 'EdLight Initiative <onboarding@resend.dev>'

const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    // This endpoint mails a confirmation to whatever address it is given, so
    // an unthrottled version is a way to send EdLight-branded mail to someone
    // who never asked, or to bomb one address by POSTing in a loop.
    const limit = rateLimit(`notify:${clientIp(request)}`, 5, 60 * 60 * 1000)
    if (!limit.ok) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many signups from this connection. Please try again later.',
        },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      )
    }

    const body = await request.json().catch(() => null)

    const name = readField(body?.name)
    const email = readField(body?.email)
    const phone = readField(body?.phone)

    // `cycle` decides what the subject line says, so it must not be free text
    // from the client. It arrived as `body.cycle.trim()` interpolated straight
    // into `subject`, which let a caller put a CR or LF there and append mail
    // headers of their own. An allowlist removes the class of bug rather than
    // escaping around it — the modal only ever sends one of these two.
    const cycle = oneOf(readField(body?.cycle), NOTIFY_CYCLES, 'an EdLight programme')

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Please provide your name.' },
        { status: 400 }
      )
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    if (!resend || !notifyInbox) {
      console.warn('Notify signup attempted without Resend configuration.')
      return NextResponse.json(
        {
          success: false,
          message:
            'The notification list is not available right now. Please email info@edlight.org and we will add you.',
        },
        { status: 500 }
      )
    }

    await resend.emails.send({
      from: fromAddress,
      to: [notifyInbox],
      subject: `New ${cycle} notify-list signup`,
      // headerSafe on the body too, not just the subject. These are
      // "Label: value" lines, so a name containing a newline could forge a
      // field the visitor never filled in.
      text: [
        `Someone asked to be notified about ${cycle}.`,
        '',
        `Name:  ${headerSafe(name)}`,
        `Email: ${email}`,
        `Phone: ${headerSafe(phone) || '(not given)'}`,
      ].join('\n'),
    })

    await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: `You're on the ${cycle} notification list`,
      text: [
        `Hi ${headerSafe(name)},`,
        '',
        `You're on the list. We'll write to you as soon as ${cycle} dates and application details are announced — you'll hear from us before we announce it anywhere else.`,
        '',
        'Questions in the meantime? Just reply to this email, or reach us at info@edlight.org.',
        '',
        'EdLight Initiative',
      ].join('\n'),
    })

    return NextResponse.json({
      success: true,
      message: `You have been added to the ${cycle} notification list.`,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Notify signup failed:', msg)
    return NextResponse.json(
      {
        success: false,
        message:
          'We could not add you just now. Please try again, or email info@edlight.org and we will add you by hand.',
      },
      { status: 500 }
    )
  }
}
