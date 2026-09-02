import { NextResponse } from 'next/server'
import { Resend } from 'resend'

/**
 * Same fix as /api/eslp-notify: this appended each quote request to
 * data/requests.json via fs.writeFile, which throws EROFS on Vercel's
 * read-only deployment filesystem. Every submission returned a 500, so the
 * form on /request-quote and the one embedded in /labs had been quietly
 * dropping enquiries. It emails them now.
 */

type RequestPayload = {
  name: string
  email: string
  organization?: string
  currentWebsite?: string
  projectType: string
  budget: string
  timeline: string
  contentStatus: string
  keyFeatures: string
  additionalNotes?: string
  requestType?: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const resendApiKey = process.env.RESEND_API_KEY
const quoteInbox =
  process.env.QUOTE_INBOX || process.env.CONTACT_INBOX || process.env.NEWSLETTER_INBOX
const fromAddress =
  process.env.NEWSLETTER_FROM_EMAIL || 'EdLight Initiative <onboarding@resend.dev>'

const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const payload = body as RequestPayload | null

    if (
      !payload?.name ||
      !payload?.email ||
      !payload?.projectType ||
      !payload?.budget ||
      !payload?.timeline ||
      !payload?.contentStatus ||
      !payload?.keyFeatures
    ) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!emailRegex.test(payload.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      )
    }

    if (!resend || !quoteInbox) {
      console.warn('Quote request attempted without Resend configuration.')
      return NextResponse.json(
        {
          success: false,
          message:
            'We could not submit that just now. Please email info@edlight.org with your request.',
        },
        { status: 500 }
      )
    }

    await resend.emails.send({
      from: fromAddress,
      to: [quoteInbox],
      replyTo: payload.email,
      subject: `Quote request — ${payload.name}${payload.organization ? ` (${payload.organization})` : ''}`,
      text: [
        `Name:            ${payload.name}`,
        `Email:           ${payload.email}`,
        `Organisation:    ${payload.organization || '(not given)'}`,
        `Current website: ${payload.currentWebsite || '(not given)'}`,
        `Request type:    ${payload.requestType || '(not given)'}`,
        '',
        `Project type:    ${payload.projectType}`,
        `Budget:          ${payload.budget}`,
        `Timeline:        ${payload.timeline}`,
        `Content status:  ${payload.contentStatus}`,
        '',
        'Key features:',
        payload.keyFeatures,
        '',
        'Additional notes:',
        payload.additionalNotes || '(none)',
      ].join('\n'),
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Request quote API error', error)
    return NextResponse.json(
      {
        success: false,
        message:
          'We could not submit that just now. Please try again, or email info@edlight.org.',
      },
      { status: 500 }
    )
  }
}
