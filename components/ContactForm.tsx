'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
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
 *
 * The strings live in the same `contact` namespace as the page around it,
 * under `form.*` — the form reads as part of that page to a visitor and to a
 * translator, and splitting it across two catalogues would only hide the
 * relationship.
 */
export default function ContactForm() {
  const t = useTranslations('contact')
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
        // Never rendered — the catch below shows form.error instead. This
        // string only ever reaches the console.
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
          {t('form.nameLabel')} <span className="text-[var(--ink-700)]">*</span>
        </label>
        <input
          type="text"
          id="name"
          autoComplete="name"
          {...register('name', { required: t('form.nameRequired') })}
          className={fieldClass}
          aria-invalid={errors.name ? 'true' : undefined}
        />
        {errors.name && <p className="mt-1.5 text-sm text-red-700">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--ink-900)] mb-1.5">
          {t('form.emailLabel')} <span className="text-[var(--ink-700)]">*</span>
        </label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          inputMode="email"
          {...register('email', {
            required: t('form.emailRequired'),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t('form.emailInvalid'),
            },
          })}
          className={fieldClass}
          aria-invalid={errors.email ? 'true' : undefined}
        />
        {errors.email && <p className="mt-1.5 text-sm text-red-700">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[var(--ink-900)] mb-1.5">
          {t('form.subjectLabel')} <span className="text-[var(--ink-700)]">*</span>
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject', { required: t('form.subjectRequired') })}
          className={fieldClass}
          placeholder={t('form.subjectPlaceholder')}
          aria-invalid={errors.subject ? 'true' : undefined}
        />
        {errors.subject && <p className="mt-1.5 text-sm text-red-700">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--ink-900)] mb-1.5">
          {t('form.messageLabel')} <span className="text-[var(--ink-700)]">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          {...register('message', {
            required: t('form.messageRequired'),
            minLength: { value: 10, message: t('form.messageMinLength') },
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
          <span>{t('form.sending')}</span>
        ) : (
          <>
            <Send size={16} />
            <span>{t('form.submit')}</span>
          </>
        )}
      </button>

      {submitStatus === 'success' && (
        <p className="text-sm text-emerald-800" aria-live="polite">
          {t('form.success')}
        </p>
      )}
      {submitStatus === 'error' && (
        <p className="text-sm text-red-700" aria-live="polite">
          {t.rich('form.error', {
            email: CONTACT_EMAIL,
            link: (chunks) => (
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">
                {chunks}
              </a>
            ),
          })}
        </p>
      )}

      <p className="text-xs text-[var(--ink-700)]">{t('form.replyNote')}</p>
    </form>
  )
}
