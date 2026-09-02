import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { readField, headerSafe, LONG_FIELD_MAX } from '@/lib/formInput'
import { rateLimit, clientIp } from '@/lib/rateLimit'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const resendApiKey = process.env.RESEND_API_KEY
const contactInbox = process.env.CONTACT_INBOX || process.env.NEWSLETTER_INBOX
const fromAddress =
  process.env.NEWSLETTER_FROM_EMAIL || 'EdLight Initiative <onboarding@resend.dev>'

const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    // Lower risk than the notify routes — this mails staff, not the
    // submitter, so it cannot be aimed at a third party. Still capped, so the
    // inbox and the Resend quota cannot be flooded from one source.
    const limit = rateLimit(`contact:${clientIp(request)}`, 10, 60 * 60 * 1000)
    if (!limit.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Too many messages from this connection. Please try again later, or email us at info@edlight.org.',
        },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      )
    }

    // Same treatment as the other two form routes. `subject`, `interest` and
    // `name` were interpolated raw into the mail Subject below, so a value
    // containing a CR or LF let the sender append headers of their own — a
    // Bcc, a different Reply-To. They were also unbounded, so one POST could
    // mail an arbitrary amount of text.
    const body = await request.json().catch(() => null)
    const name = readField(body?.name)
    const email = readField(body?.email)
    const subject = readField(body?.subject)
    const interest = readField(body?.interest)
    const message = readField(body?.message, LONG_FIELD_MAX)

    if (!name || !message || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide your name, a valid email address, and a message.' },
        { status: 400 }
      )
    }

    if (!resend || !contactInbox) {
      console.warn('Contact form submitted without Resend configuration.')
      return NextResponse.json(
        {
          success: false,
          message:
            'The contact service is temporarily unavailable. Please email us directly at info@edlight.org.',
        },
        { status: 500 }
      )
    }

    await resend.emails.send({
      from: fromAddress,
      to: [contactInbox],
      replyTo: email,
      subject: `Contact form: ${headerSafe(subject || interest || 'New message', 80)} — ${headerSafe(name, 60)}`,
      text: [
        `Name: ${headerSafe(name)}`,
        `Email: ${email}`,
        interest ? `Interest: ${headerSafe(interest)}` : null,
        subject ? `Subject: ${headerSafe(subject)}` : null,
        '',
        message,
      ]
        .filter((line): line is string => line !== null)
        .join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again or email us at info@edlight.org.',
      },
      { status: 500 }
    )
  }
}
