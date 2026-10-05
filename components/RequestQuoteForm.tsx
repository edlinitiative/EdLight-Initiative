"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

import { track } from '@/lib/analytics'
import HoneypotField from '@/components/HoneypotField'
import { HONEYPOT_FIELD } from '@/lib/honeypot'
import { BRIEF_BUDGETS, BRIEF_DETAILS_MIN, BRIEF_SERVICES, BRIEF_TIMELINES } from '@/lib/labsBrief'

type BriefForm = {
  services: string[]
  budget: string
  timeline: string
  details: string
  name: string
  email: string
  phone: string
  organization: string
  currentWebsite: string
}

interface RequestQuoteFormProps {
  /** Called when the visitor closes the success message (the /labs modal). */
  onSuccess?: () => void
}

const inputClass =
  'w-full border border-[var(--paper-200)] bg-white px-4 py-3 text-base text-[var(--ink-900)] placeholder-[var(--ink-400)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring)] outline-none transition-colors'

function chipClass(selected: boolean) {
  return `block cursor-pointer select-none border px-3.5 py-2 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent-ring)] ${
    selected
      ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
      : 'border-[var(--paper-200)] bg-white text-[var(--ink-700)] hover:border-[var(--ink-400)]'
  }`
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-1 flex items-center gap-3 font-display text-lg font-semibold text-[var(--ink-900)]">
        <span className="flex h-7 w-7 items-center justify-center bg-[var(--accent)] text-sm text-white">{n}</span>
        {title}
      </legend>
      {children}
    </fieldset>
  )
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-sm text-red-700">{message}</p> : null
}

/**
 * The Labs project brief, used in the /labs modal and on /request-quote.
 *
 * Three short steps: what they need (chips), the project in their own words,
 * and how to reach them. /api/request-quote sends it to the team and a
 * confirmation to the visitor; the success state here says so.
 */
export default function RequestQuoteForm({ onSuccess }: RequestQuoteFormProps) {
  const [serverError, setServerError] = useState<string | null>(null)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BriefForm>({ defaultValues: { services: [], budget: '', timeline: '' } })

  const services = watch('services') ?? []
  const budget = watch('budget')
  const timeline = watch('timeline')

  const onSubmit = async (data: BriefForm) => {
    setServerError(null)
    try {
      const res = await fetch('/api/request-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, [HONEYPOT_FIELD]: honeypot }),
      })
      const body = await res.json().catch(() => null)
      if (!res.ok || !body?.success) {
        setServerError(body?.message || 'We could not send your brief. Please try again, or email info@edlight.org.')
        return
      }
      // After the server accepted it, never on click. No field values.
      track('generate_lead', { form: 'request_quote' })
      setSentTo(data.email)
      reset()
    } catch {
      setServerError('Network error. Please check your connection and try again.')
    }
  }

  if (sentTo) {
    return (
      <div className="py-8 text-center">
        <CheckCircle2 size={44} className="mx-auto mb-4 text-[var(--accent)]" />
        <h3 className="font-display text-2xl font-semibold text-[var(--ink-900)] mb-2">Thanks, we have your brief</h3>
        <p className="mx-auto max-w-md text-[var(--ink-700)] mb-7">
          We&apos;ve sent a confirmation to <span className="font-medium text-[var(--ink-900)]">{sentTo}</span>. Our team
          will read it and get back to you to set up a call.
        </p>
        {onSuccess ? (
          <button
            type="button"
            onClick={onSuccess}
            className="bg-[var(--accent)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            Done
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setSentTo(null)}
            className="border border-[var(--paper-200)] px-6 py-3 font-medium text-[var(--ink-900)] transition-colors hover:border-[var(--ink-400)]"
          >
            Send another brief
          </button>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <HoneypotField value={honeypot} onChange={setHoneypot} />

      <Step n={1} title="What do you need?">
        <div>
          <p className="mb-3 text-sm text-[var(--ink-700)]">Pick all that apply.</p>
          <div className="flex flex-wrap gap-2">
            {BRIEF_SERVICES.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  value={option}
                  className="peer sr-only"
                  {...register('services', { validate: (v) => (v && v.length > 0) || 'Pick at least one.' })}
                />
                <span className={chipClass(services.includes(option))}>{option}</span>
              </label>
            ))}
          </div>
          <FieldError message={errors.services?.message} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium text-[var(--ink-700)]">Budget</p>
            <div className="flex flex-wrap gap-2">
              {BRIEF_BUDGETS.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    value={option}
                    className="peer sr-only"
                    {...register('budget', { required: 'Choose a budget range.' })}
                  />
                  <span className={chipClass(budget === option)}>{option}</span>
                </label>
              ))}
            </div>
            <FieldError message={errors.budget?.message} />
          </div>
          <div>
            <p className="mb-3 text-sm font-medium text-[var(--ink-700)]">Timeline</p>
            <div className="flex flex-wrap gap-2">
              {BRIEF_TIMELINES.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    value={option}
                    className="peer sr-only"
                    {...register('timeline', { required: 'Choose a timeline.' })}
                  />
                  <span className={chipClass(timeline === option)}>{option}</span>
                </label>
              ))}
            </div>
            <FieldError message={errors.timeline?.message} />
          </div>
        </div>
      </Step>

      <Step n={2} title="Tell us about the project">
        <div>
          <label htmlFor="brief-details" className="sr-only">
            Project details
          </label>
          <textarea
            id="brief-details"
            rows={5}
            className={inputClass}
            placeholder="What are you building, who is it for, and what should it do? Links to sites you like help too."
            {...register('details', {
              required: 'Tell us a little about the project.',
              minLength: { value: BRIEF_DETAILS_MIN, message: 'A few more words, please.' },
            })}
          />
          <FieldError message={errors.details?.message} />
        </div>
      </Step>

      <Step n={3} title="How do we reach you?">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="brief-name" className="mb-1.5 block text-sm font-medium text-[var(--ink-700)]">
              Full name
            </label>
            <input
              id="brief-name"
              type="text"
              autoComplete="name"
              className={inputClass}
              {...register('name', { required: 'Enter your name.' })}
            />
            <FieldError message={errors.name?.message} />
          </div>
          <div>
            <label htmlFor="brief-email" className="mb-1.5 block text-sm font-medium text-[var(--ink-700)]">
              Email
            </label>
            <input
              id="brief-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass}
              {...register('email', {
                required: 'Enter your email.',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email.' },
              })}
            />
            <FieldError message={errors.email?.message} />
          </div>
          <div>
            <label htmlFor="brief-phone" className="mb-1.5 block text-sm font-medium text-[var(--ink-700)]">
              Phone or WhatsApp <span className="font-normal text-[var(--ink-400)]">(optional)</span>
            </label>
            <input id="brief-phone" type="tel" autoComplete="tel" className={inputClass} {...register('phone')} />
          </div>
          <div>
            <label htmlFor="brief-org" className="mb-1.5 block text-sm font-medium text-[var(--ink-700)]">
              Organization <span className="font-normal text-[var(--ink-400)]">(optional)</span>
            </label>
            <input
              id="brief-org"
              type="text"
              autoComplete="organization"
              className={inputClass}
              {...register('organization')}
            />
          </div>
        </div>
        <div>
          <label htmlFor="brief-site" className="mb-1.5 block text-sm font-medium text-[var(--ink-700)]">
            Current website <span className="font-normal text-[var(--ink-400)]">(optional)</span>
          </label>
          <input
            id="brief-site"
            type="text"
            inputMode="url"
            placeholder="example.com"
            className={inputClass}
            {...register('currentWebsite')}
          />
        </div>
      </Step>

      {serverError && <p className="bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[var(--ink-400)]">We&apos;ll email you a confirmation right away.</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send brief <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
