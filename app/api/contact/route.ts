import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const resendApiKey = process.env.RESEND_API_KEY
const contactInbox = process.env.CONTACT_INBOX || process.env.NEWSLETTER_INBOX
const fromAddress =
  process.env.NEWSLETTER_FROM_EMAIL || 'EdLight Initiative <onboarding@resend.dev>'

const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const name = typeof body?.name === 'string' ? body.name.trim() : ''
    const email = typeof body?.email === 'string' ? body.email.trim() : ''
    const subject = typeof body?.subject === 'string' ? body.subject.trim() : ''
    const interest = typeof body?.interest === 'string' ? body.interest.trim() : ''
    const message = typeof body?.message === 'string' ? body.message.trim() : ''

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
      subject: `Contact form: ${subject || interest || 'New message'} — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        interest ? `Interest: ${interest}` : null,
        subject ? `Subject: ${subject}` : null,
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
