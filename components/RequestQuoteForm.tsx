"use client"

import React, { useRef, useState } from 'react'
import { useForm, type FieldPath } from 'react-hook-form'
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

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

// One step on screen at a time, so the form fits a phone or a short laptop
// screen. Each step lists the fields Next validates before moving on.
const STEPS: { title: string; fields: FieldPath<BriefForm>[] }[] = [
  { title: 'What do you need?', fields: ['services', 'budget', 'timeline'] },
  { title: 'Tell us about the project', fields: ['details'] },
  { title: 'How do we reach you?', fields: ['name', 'email'] },
]
const LAST = STEPS.length - 1

const inputClass =
  'w-full border border-[var(--paper-200)] bg-white px-4 py-3 text-base text-[var(--ink-900)] placeholder-[var(--ink-400)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring)] outline-none transition-colors'
const labelClass = 'mb-1.5 block text-sm font-medium text-[var(--ink-700)]'

function chipClass(selected: boolean) {
  return `block cursor-pointer select-none border px-3 py-2 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent-ring)] ${
    selected
      ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
      : 'border-[var(--paper-200)] bg-white text-[var(--ink-700)] hover:border-[var(--ink-400)]'
  }`
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-sm text-red-700">{message}</p> : null
}

function Optional() {
  return <span className="font-normal text-[var(--ink-400)]">(optional)</span>
}

/**
 * The Labs project brief, used in the /labs modal and on /request-quote.
 *
 * Three steps shown one at a time: what they need (chips), the project in
 * their own words, and how to reach them. /api/request-quote sends it to the
 * team and a confirmation to the visitor; the success state here says so.
 */
export default function RequestQuoteForm({ onSuccess }: RequestQuoteFormProps) {
  const [step, setStep] = useState(0)
  const [serverError, setServerError] = useState<string | null>(null)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const topRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<BriefForm>({ defaultValues: { services: [], budget: '', timeline: '' } })

  const services = watch('services') ?? []
  const budget = watch('budget')
  const timeline = watch('timeline')

  const goTo = (next: number) => {
    setStep(next)
    setServerError(null)
    // Back to the top of the step, whichever container is scrolling.
    topRef.current?.scrollIntoView({ block: 'nearest' })
  }

  const next = async () => {
    if (await trigger(STEPS[step].fields)) goTo(step + 1)
  }

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
      setStep(0)
    } catch {
      setServerError('Network error. Please check your connection and try again.')
    }
  }

  // Enter in a field on an early step moves forward instead of submitting.
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (step < LAST) {
      e.preventDefault()
      void next()
      return
    }
    void handleSubmit(onSubmit)(e)
  }

  if (sentTo) {
    return (
      <div className="py-6 text-center sm:py-8">
        <CheckCircle2 size={44} className="mx-auto mb-4 text-[var(--accent)]" />
        <h3 className="mb-2 font-display text-2xl font-semibold text-[var(--ink-900)]">Thanks, we have your brief</h3>
        <p className="mx-auto mb-7 max-w-md text-[var(--ink-700)]">
          We&apos;ve sent a confirmation to <span className="font-medium text-[var(--ink-900)] break-all">{sentTo}</span>.
          Our team will read it and get back to you to set up a call.
        </p>
        <button
          type="button"
          onClick={onSuccess ?? (() => setSentTo(null))}
          className="bg-[var(--accent)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          {onSuccess ? 'Done' : 'Send another brief'}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onFormSubmit} noValidate className="flex flex-col">
      <HoneypotField value={honeypot} onChange={setHoneypot} />

      {/* Progress */}
      <div ref={topRef} className="mb-6 scroll-mt-4">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-[var(--ink-900)] sm:text-xl">{STEPS[step].title}</h3>
          <span className="shrink-0 text-xs text-[var(--ink-400)]">
            Step {step + 1} of {STEPS.length}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
          {STEPS.map((s, i) => (
            <span key={s.title} className={`h-1 ${i <= step ? 'bg-[var(--accent)]' : 'bg-[var(--paper-200)]'}`} />
          ))}
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-6">
          <fieldset>
            <legend className={labelClass}>Pick all that apply</legend>
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
          </fieldset>

          <fieldset>
            <legend className={labelClass}>Budget</legend>
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
          </fieldset>

          <fieldset>
            <legend className={labelClass}>Timeline</legend>
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
          </fieldset>
        </div>
      )}

      {step === 1 && (
        <div>
          <label htmlFor="brief-details" className={labelClass}>
            What are you building, who is it for, and what should it do?
          </label>
          <textarea
            id="brief-details"
            rows={6}
            className={`${inputClass} min-h-[9rem] resize-y`}
            placeholder="Links to sites you like help too."
            {...register('details', {
              required: 'Tell us a little about the project.',
              minLength: { value: BRIEF_DETAILS_MIN, message: 'A few more words, please.' },
            })}
          />
          <FieldError message={errors.details?.message} />
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="brief-name" className={labelClass}>
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
            <label htmlFor="brief-email" className={labelClass}>
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
            <label htmlFor="brief-phone" className={labelClass}>
              Phone or WhatsApp <Optional />
            </label>
            <input id="brief-phone" type="tel" autoComplete="tel" className={inputClass} {...register('phone')} />
          </div>
          <div>
            <label htmlFor="brief-org" className={labelClass}>
              Organization <Optional />
            </label>
            <input
              id="brief-org"
              type="text"
              autoComplete="organization"
              className={inputClass}
              {...register('organization')}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="brief-site" className={labelClass}>
              Current website <Optional />
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
        </div>
      )}

      {serverError && <p className="mt-5 bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>}

      {/* Actions stay pinned to the bottom of whatever is scrolling: the
          modal body on /labs, the window on /request-quote. */}
      <div className="sticky bottom-0 -mx-1 mt-6 flex items-center justify-between gap-3 border-t border-[var(--paper-200)] bg-white px-1 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className="inline-flex items-center gap-1.5 px-2 py-3 text-sm font-medium text-[var(--ink-700)] transition-colors hover:text-[var(--ink-900)]"
          >
            <ArrowLeft size={16} /> Back
          </button>
        ) : (
          <span className="text-xs text-[var(--ink-400)]">Takes about 2 minutes.</span>
        )}

        {step < LAST ? (
          <button
            type="button"
            onClick={() => void next()}
            className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            Next <ArrowRight size={16} />
          </button>
        ) : (
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
        )}
      </div>
    </form>
  )
}
