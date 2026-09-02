'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send } from 'lucide-react'
import { CONTACT_EMAIL } from '@/lib/site'

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

const fieldClass =
  'w-full border border-[var(--paper-300)] bg-[var(--paper-50)] px-4 py-2.5 text-sm text-[var(--ink-900)] placeholder-[var(--ink-400)] focus:border-[var(--accent)] focus:outline-none'

/**
 * The contact form, split out so /contact itself can stay a server component.
 *
 * It could not before: the whole page was 'use client', which meant its
 * `metadata` export was illegal, so the title and description sat unused in a
 * separate app/contact/metadata.ts that Next never read. The page shipped with
 * no description of its own — on the one page a policy reviewer is most
 * likely to open.
 */
export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || 'Submission failed')
      }

      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--ink-900)] mb-1.5">
          Full name <span className="text-[var(--ink-700)]">*</span>
        </label>
        <input
          type="text"
          id="name"
          autoComplete="name"
          {...register('name', { required: 'Please tell us your name.' })}
          className={fieldClass}
          aria-invalid={errors.name ? 'true' : undefined}
        />
        {errors.name && <p className="mt-1.5 text-sm text-red-700">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--ink-900)] mb-1.5">
          Email address <span className="text-[var(--ink-700)]">*</span>
        </label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          inputMode="email"
          {...register('email', {
            required: 'We need an email address to reply to.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'That does not look like a valid email address.',
            },
          })}
          className={fieldClass}
          aria-invalid={errors.email ? 'true' : undefined}
        />
        {errors.email && <p className="mt-1.5 text-sm text-red-700">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[var(--ink-900)] mb-1.5">
          Subject <span className="text-[var(--ink-700)]">*</span>
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject', { required: 'A short subject helps us route your message.' })}
          className={fieldClass}
          placeholder="Applying to a programme, volunteering, partnership…"
          aria-invalid={errors.subject ? 'true' : undefined}
        />
        {errors.subject && <p className="mt-1.5 text-sm text-red-700">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--ink-900)] mb-1.5">
          Message <span className="text-[var(--ink-700)]">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          {...register('message', {
            required: 'Please tell us what you need.',
            minLength: { value: 10, message: 'A little more detail will help us answer properly.' },
          })}
          className={`${fieldClass} resize-none`}
          aria-invalid={errors.message ? 'true' : undefined}
        />
        {errors.message && <p className="mt-1.5 text-sm text-red-700">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-60"
      >
        {isSubmitting ? (
          <span>Sending…</span>
        ) : (
          <>
            <Send size={16} />
            <span>Send message</span>
          </>
        )}
      </button>

      {submitStatus === 'success' && (
        <p className="text-sm text-emerald-800" aria-live="polite">
          Thank you — your message is with us. We usually reply within two to three business days.
        </p>
      )}
      {submitStatus === 'error' && (
        <p className="text-sm text-red-700" aria-live="polite">
          Something went wrong sending that. Please try again, or email us directly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}

      <p className="text-xs text-[var(--ink-700)]">
        We usually reply within two to three business days.
      </p>
    </form>
  )
}
