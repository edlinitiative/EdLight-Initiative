import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { readField, headerSafe, LONG_FIELD_MAX } from '@/lib/formInput'
import { rateLimit, clientIp } from '@/lib/rateLimit'

/**
 * Same fix as /api/eslp-notify: this appended each quote request to
 * data/requests.json via fs.writeFile, which throws EROFS on Vercel's
 * read-only deployment filesystem. Every submission returned a 500, so the
 * form on /request-quote and the one embedded in /labs had been quietly
 * dropping enquiries. It emails them now.
 */

// The RequestPayload type that used to sit here described the shape we hoped
// for and was applied with a bare `as` cast, which asserts rather than
// checks. Each field is now read individually through readField, so the cast
// — and the false assurance it gave — are gone.

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const resendApiKey = process.env.RESEND_API_KEY
const quoteInbox =
  process.env.QUOTE_INBOX || process.env.CONTACT_INBOX || process.env.NEWSLETTER_INBOX
const fromAddress =
  process.env.NEWSLETTER_FROM_EMAIL || 'EdLight Initiative <onboarding@resend.dev>'

const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    const limit = rateLimit(`quote:${clientIp(request)}`, 10, 60 * 60 * 1000)
    if (!limit.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Too many requests from this connection. Please try again later, or email us at info@edlight.org.',
        },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      )
    }

    const body = await request.json().catch(() => null)

    // Read every field through readField rather than trusting the payload
    // shape. Before, the raw values went straight into the email: unbounded,
    // so a single POST could mail us as much text as it liked, and `name` and
    // `organization` were interpolated into the Subject, where a CR or LF
    // would have let the sender append mail headers of their own.
    const f = {
      name: readField(body?.name),
      email: readField(body?.email),
      organization: readField(body?.organization),
      currentWebsite: readField(body?.currentWebsite),
      projectType: readField(body?.projectType),
      budget: readField(body?.budget),
      timeline: readField(body?.timeline),
      contentStatus: readField(body?.contentStatus),
      keyFeatures: readField(body?.keyFeatures, LONG_FIELD_MAX),
      additionalNotes: readField(body?.additionalNotes, LONG_FIELD_MAX),
      requestType: readField(body?.requestType),
    }

    if (
      !f.name ||
      !f.email ||
      !f.projectType ||
      !f.budget ||
      !f.timeline ||
      !f.contentStatus ||
      !f.keyFeatures
    ) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!emailRegex.test(f.email)) {
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

    const subjectOrg = headerSafe(f.organization, 60)

    await resend.emails.send({
      from: fromAddress,
      // Safe as a header: emailRegex is anchored and rejects whitespace, so a
      // value that passes it cannot contain a CR or LF.
      replyTo: f.email,
      to: [quoteInbox],
      subject: `Quote request — ${headerSafe(f.name, 60)}${subjectOrg ? ` (${subjectOrg})` : ''}`,
      text: [
        `Name:            ${headerSafe(f.name)}`,
        `Email:           ${f.email}`,
        `Organisation:    ${headerSafe(f.organization) || '(not given)'}`,
        `Current website: ${headerSafe(f.currentWebsite) || '(not given)'}`,
        `Request type:    ${headerSafe(f.requestType) || '(not given)'}`,
        '',
        `Project type:    ${headerSafe(f.projectType)}`,
        `Budget:          ${headerSafe(f.budget)}`,
        `Timeline:        ${headerSafe(f.timeline)}`,
        `Content status:  ${headerSafe(f.contentStatus)}`,
        '',
        'Key features:',
        f.keyFeatures,
        '',
        'Additional notes:',
        f.additionalNotes || '(none)',
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
