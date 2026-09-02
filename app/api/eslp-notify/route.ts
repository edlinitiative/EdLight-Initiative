import { NextResponse } from 'next/server'
import { Resend } from 'resend'

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

const resendApiKey = process.env.RESEND_API_KEY
const notifyInbox =
  process.env.ESLP_NOTIFY_INBOX || process.env.NEWSLETTER_INBOX || process.env.CONTACT_INBOX
const fromAddress =
  process.env.NEWSLETTER_FROM_EMAIL || 'EdLight Initiative <onboarding@resend.dev>'

const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)

    const name = typeof body?.name === 'string' ? body.name.trim() : ''
    const email = typeof body?.email === 'string' ? body.email.trim() : ''
    const phone = typeof body?.phone === 'string' ? body.phone.trim() : ''
    const cycle = typeof body?.cycle === 'string' && body.cycle.trim() ? body.cycle.trim() : 'ESLP'

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
      text: [
        `Someone asked to be notified about ${cycle}.`,
        '',
        `Name:  ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || '(not given)'}`,
      ].join('\n'),
    })

    await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: `You're on the ${cycle} notification list`,
      text: [
        `Hi ${name},`,
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
