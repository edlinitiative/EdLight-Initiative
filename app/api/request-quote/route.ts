import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkBotId } from 'botid/server'
import { readField, headerSafe, LONG_FIELD_MAX } from '@/lib/formInput'
import { rateLimit, clientIp } from '@/lib/rateLimit'
import { honeypotTripped } from '@/lib/honeypot'
import { BRIEF_BUDGETS, BRIEF_DETAILS_MIN, BRIEF_SERVICES, BRIEF_TIMELINES } from '@/lib/labsBrief'

/**
 * The Labs project brief (components/RequestQuoteForm.tsx, on /labs and
 * /request-quote).
 *
 * Each brief goes to LABS_BRIEF_TO (info@edlight.org by default; nobody
 * reads labs@) with the people in LABS_BRIEF_CC copied, comma-separated.
 * The CC list lives in the environment rather than here because this repo
 * is public. Reply-To is the visitor, so the team can answer directly.
 *
 * The visitor gets a confirmation. It repeats only the choices they picked
 * from our own lists (services, budget, timeline), never their free text:
 * the address is whatever they typed, so echoing their words would let
 * anyone send text of their choosing to any inbox from our domain.
 */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const resendApiKey = process.env.RESEND_API_KEY
const briefTo = process.env.LABS_BRIEF_TO || 'info@edlight.org'
const briefCc = (process.env.LABS_BRIEF_CC ?? '')
  .split(',')
  .map((a) => a.trim())
  .filter((a) => emailRegex.test(a))
const fromAddress =
  process.env.NEWSLETTER_FROM_EMAIL || 'EdLight Initiative <onboarding@resend.dev>'

const resend = resendApiKey ? new Resend(resendApiKey) : null

function pick<T extends string>(value: unknown, allowed: readonly T[]): T | '' {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value) ? (value as T) : ''
}

export async function POST(request: Request) {
  try {
    // Real visitors submit from the page, where <BotIdClient> tags the
    // request; scripts posting straight to this route are refused here.
    // See lib/botid.ts.
    const verification = await checkBotId()
    if (verification.isBot) {
      return NextResponse.json(
        {
          success: false,
          message: 'We could not verify this request. Please refresh the page and try again, or email info@edlight.org.',
        },
        { status: 403 }
      )
    }

    const limit = rateLimit(`quote:${clientIp(request)}`, 10, 60 * 60 * 1000)
    if (!limit.ok) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests from this connection. Please try again later, or email us at info@edlight.org.',
        },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      )
    }

    const body = await request.json().catch(() => null)

    // A filled honeypot means a bot: answer as if it worked, send nothing.
    // See lib/honeypot.ts.
    if (honeypotTripped(body)) {
      return NextResponse.json({ success: true }, { status: 201 })
    }

    const services = Array.isArray(body?.services)
      ? BRIEF_SERVICES.filter((s) => (body.services as unknown[]).includes(s))
      : []
    const f = {
      services,
      budget: pick(body?.budget, BRIEF_BUDGETS),
      timeline: pick(body?.timeline, BRIEF_TIMELINES),
      details: readField(body?.details, LONG_FIELD_MAX),
      name: readField(body?.name),
      email: readField(body?.email),
      phone: readField(body?.phone),
      organization: readField(body?.organization),
      currentWebsite: readField(body?.currentWebsite),
    }

    if (!f.name || f.services.length === 0 || !f.budget || !f.timeline || f.details.length < BRIEF_DETAILS_MIN) {
      return NextResponse.json(
        { success: false, message: 'Please fill in every required part of the brief.' },
        { status: 400 }
      )
    }
    if (!emailRegex.test(f.email)) {
      return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (!resend) {
      console.warn('Labs brief attempted without Resend configuration.')
      return NextResponse.json(
        { success: false, message: 'We could not send that just now. Please email info@edlight.org with your project.' },
        { status: 500 }
      )
    }

    const org = headerSafe(f.organization, 60)

    // Resend reports failures in the result rather than throwing.
    const team = await resend.emails.send({
      from: fromAddress,
      to: [briefTo],
      cc: briefCc,
      // Safe as a header: emailRegex is anchored and rejects whitespace, so a
      // value that passes it cannot contain a CR or LF.
      replyTo: f.email,
      subject: `Labs project brief: ${headerSafe(f.name, 60)}${org ? ` (${org})` : ''}`,
      text: [
        'New project brief from edlight.org/labs. Reply to this email to answer the sender directly.',
        '',
        `Name:          ${headerSafe(f.name)}`,
        `Email:         ${f.email}`,
        `Phone:         ${headerSafe(f.phone) || '(not given)'}`,
        `Organization:  ${headerSafe(f.organization) || '(not given)'}`,
        `Website:       ${headerSafe(f.currentWebsite) || '(not given)'}`,
        '',
        `Needs:         ${f.services.join(', ')}`,
        `Budget:        ${f.budget}`,
        `Timeline:      ${f.timeline}`,
        '',
        'Project:',
        f.details,
      ].join('\n'),
    })
    if (team.error) {
      console.error('Labs brief email failed:', team.error.message)
      return NextResponse.json(
        { success: false, message: 'We could not send that just now. Please try again, or email info@edlight.org.' },
        { status: 502 }
      )
    }

    // The team has the brief at this point, so a failed confirmation is
    // logged rather than reported to the visitor as a failed submission.
    try {
      const confirmation = await resend.emails.send({
        from: fromAddress,
        to: [f.email],
        replyTo: briefTo,
        subject: 'We received your project brief | EdLight Labs',
        text: [
          'Hi,',
          '',
          'Thanks for sending EdLight Labs your project brief. Our team will read it and get back to you to set up a call.',
          '',
          'What you asked about:',
          `  Needs:     ${f.services.join(', ')}`,
          `  Budget:    ${f.budget}`,
          `  Timeline:  ${f.timeline}`,
          '',
          'Anything to add? Just reply to this email.',
          '',
          'EdLight Labs',
          'EdLight Initiative · www.edlight.org/labs',
        ].join('\n'),
      })
      if (confirmation.error) {
        console.error('Labs brief confirmation failed:', confirmation.error.message)
      }
    } catch (err) {
      console.error('Labs brief confirmation failed:', err instanceof Error ? err.message : String(err))
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Labs brief API error', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { success: false, message: 'We could not send that just now. Please try again, or email info@edlight.org.' },
      { status: 500 }
    )
  }
}
