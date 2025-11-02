import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const resendApiKey = process.env.RESEND_API_KEY
const newsletterInbox = process.env.NEWSLETTER_INBOX
const fromAddress =
  process.env.NEWSLETTER_FROM_EMAIL || 'EdLight Initiative <onboarding@resend.dev>'

const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const email = typeof body?.email === 'string' ? body.email.trim() : ''

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    if (!resend || !newsletterInbox) {
      console.warn('Newsletter subscription attempted without Resend configuration.')
      return NextResponse.json(
        {
          success: false,
          message:
            'Newsletter service is not configured. Please contact the site administrator to enable subscriptions.',
        },
        { status: 500 }
      )
    }

    await resend.emails.send({
      from: fromAddress,
      to: [newsletterInbox],
      subject: 'New newsletter subscriber',
      text: `A new visitor subscribed to the EdLight newsletter. Email: ${email}`,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Newsletter subscription failed', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to process your subscription at the moment. Please try again shortly.',
      },
      { status: 500 }
    )
  }
}
