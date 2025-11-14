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

    // Send thank you email to the subscriber
    await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: 'Welcome to EdLight Initiative Newsletter!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #044BAB; margin-bottom: 20px;">Thank you for subscribing! 🎓</h2>
          <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
            We're thrilled to have you join the EdLight Initiative community!
          </p>
          <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
            You'll now receive monthly highlights about:
          </p>
          <ul style="color: #333; line-height: 1.8; margin-bottom: 20px;">
            <li>Student success stories</li>
            <li>New program openings and opportunities</li>
            <li>EdLight Academy course updates</li>
            <li>Community events and initiatives</li>
          </ul>
          <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
            Learn more about our programs:
          </p>
          <ul style="color: #044BAB; line-height: 1.8; margin-bottom: 20px;">
            <li><a href="https://edlight.org/academy" style="color: #044BAB;">EdLight Academy</a> - Free online courses</li>
            <li><a href="https://edlight.org/labs" style="color: #044BAB;">EdLight Labs</a> - STEM incubator</li>
            <li><a href="https://edlight.org/nexus" style="color: #044BAB;">EdLight Nexus</a> - Global opportunities</li>
            <li><a href="https://edlight.org/eslp" style="color: #044BAB;">ESLP</a> - Summer Leadership Program</li>
          </ul>
          <p style="color: #666; font-size: 14px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            Questions? Reply to this email or reach us at <a href="mailto:info@edlight.org" style="color: #044BAB;">info@edlight.org</a>
          </p>
          <p style="color: #666; font-size: 14px;">
            Empowering the next generation of Haitian innovators 🇭🇹
          </p>
        </div>
      `,
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
