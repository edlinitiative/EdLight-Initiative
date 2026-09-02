'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Users, Handshake, DollarSign, Mic, ShieldCheck, Heart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Reveal from '@/components/Reveal'
import { CONTACT_EMAIL, CORPORATION_NUMBER } from '@/lib/site'

declare global {
  interface Window {
    PayPal?: {
      Donation: {
        Button: (config: {
          env: string
          hosted_button_id: string
          image: {
            src: string
            alt: string
            title: string
          }
        }) => {
          render: (selector: string) => void
        }
      }
    }
  }
}

// Each of these used to be a single vague sentence, which left the whole page
// at roughly 160 words — thin enough that the Ad Grants website policy would
// count it against the site, and too thin to answer the question a willing
// volunteer actually arrives with: what would I be doing, and how much of me
// does it need?
//
// The wording now lives in messages/<locale>/getInvolved.json under
// `ways.<key>`; only the order and the icon live here.
const waysToGetInvolved = [
  { key: 'volunteer', icon: Users },
  { key: 'partner', icon: Handshake },
  { key: 'donate', icon: DollarSign },
  { key: 'speak', icon: Mic },
] as const

// The option values are what the API receives, so they are not translated;
// only the labels beside them are.
const interestOptions = ['volunteer', 'partner', 'donate', 'speak', 'other'] as const

type FormData = {
  name: string
  email: string
  interest: string
  message: string
}

function IconBadge({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
      <Icon size={22} />
    </div>
  )
}

// Shared field styling so every input/select/textarea reads as one system.
const fieldClasses =
  'w-full rounded-xl border border-[var(--paper-200)] bg-white px-4 py-3 text-[var(--ink-900)] transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)]'

export default function GetInvolvedPage() {
  const t = useTranslations('getInvolved')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Load PayPal Donation SDK
    const script = document.createElement('script')
    script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js'
    script.charset = 'UTF-8'
    script.async = true

    script.onload = () => {
      if (window.PayPal) {
        window.PayPal.Donation.Button({
          env: 'production',
          hosted_button_id: '6AKKBQXK47EZU',
          image: {
            src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
            alt: 'Donate with PayPal button',
            title: 'PayPal - The safer, easier way to pay online!',
          }
        }).render('#donate-button')
      }
    }

    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('loading')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result?.success) {
        // Console only — the visitor sees form.error instead.
        throw new Error(result?.message || 'Submission failed')
      }
      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    }
  }

  return (
    <>
      <Hero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage="/about_us.webp"
        // "Donations to programs: 100%" is an absolute nobody outside the
        // organisation can check, and it is not literally true of any charity
        // that pays for a platform and coordinators. What is true and
        // checkable is the price a student pays.
        //
        // The count stays a literal — a digit is a digit in every locale — but
        // the price does not: "$0" is written "0 $" in French.
        meta={[
          { label: t('hero.metaWaysLabel'), value: '4' },
          { label: t('hero.metaCostLabel'), value: t('hero.metaCostValue') },
        ]}
      >
        <a href="#donate" className="btn btn-primary">
          {t('hero.donateCta')} <Heart size={18} />
        </a>
        <a href="#contact" className="btn btn-ghost">
          {t('hero.contactCta')}
        </a>
      </Hero>

      {/* Ways to get involved */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('ways.heading')}
            subtitle={t('ways.subheading')}
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {waysToGetInvolved.map((way, i) => (
              <Reveal key={way.key} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-6 transition-shadow hover:shadow-md">
                  <IconBadge icon={way.icon} />
                  <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">
                    {t(`ways.${way.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">
                    {t(`ways.${way.key}.description`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Support / donate — dark editorial band */}
      <section
        id="donate"
        className="relative overflow-hidden py-16 sm:py-20 md:py-24 text-white"
        style={{
          background:
            'radial-gradient(circle at 85% 20%, rgba(30,66,159,0.35) 0%, transparent 55%), linear-gradient(135deg, var(--ink-deep) 0%, #0a1530 70%, #0f1e4a 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage: 'radial-gradient(rgba(232,226,212,0.6) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
          }}
          aria-hidden="true"
        />
        <div className="max-w-[1200px] relative mx-auto px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-white/40" aria-hidden="true" />
              <span className="eyebrow text-white/85">{t('support.eyebrow')}</span>
            </div>
            <h2 className="display-lg text-white">{t('support.title')}</h2>
            <p className="body-lg mx-auto mt-4 max-w-xl text-white/90">
              {t('support.body')}
            </p>

            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="flex flex-col items-center gap-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--accent-soft)]">
                  <ShieldCheck size={16} />
                  {t('support.secureCheckout')}
                </span>
                <div id="donate-button-container" className="inline-flex justify-center">
                  <div id="donate-button"></div>
                </div>
                <p className="text-xs text-white/70">
                  {t('support.poweredBy')}
                </p>
              </div>
            </div>

            {/* The corporation number is a fact from lib/site.ts, interpolated
                rather than translated. */}
            <p className="mt-6 text-sm text-white/70">
              {t('support.taxNotice', { number: CORPORATION_NUMBER })}
            </p>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact" className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="mx-auto max-w-2xl">
            <SectionHeader
              title={t('form.heading')}
              subtitle={t('form.subheading')}
              centered
            />
            <Reveal>
              <div className="rounded-2xl border border-[var(--paper-200)] bg-white p-6 shadow-sm sm:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--ink-700)]">
                      {t('form.nameLabel')} *
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name', { required: t('form.nameRequired') })}
                      className={fieldClasses}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--ink-700)]">
                      {t('form.emailLabel')} *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: t('form.emailRequired'),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t('form.emailInvalid'),
                        },
                      })}
                      className={fieldClasses}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="interest" className="mb-2 block text-sm font-medium text-[var(--ink-700)]">
                      {t('form.interestLabel')} *
                    </label>
                    <select
                      id="interest"
                      {...register('interest', { required: t('form.interestRequired') })}
                      className={fieldClasses}
                    >
                      <option value="">{t('form.interestPlaceholder')}</option>
                      {interestOptions.map((option) => (
                        <option key={option} value={option}>
                          {t(`form.interests.${option}`)}
                        </option>
                      ))}
                    </select>
                    {errors.interest && (
                      <p className="mt-1 text-sm text-red-600">{errors.interest.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--ink-700)]">
                      {t('form.messageLabel')} *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message', { required: t('form.messageRequired') })}
                      className={fieldClasses}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="btn btn-primary w-full justify-center disabled:opacity-60"
                  >
                    {submitStatus === 'loading' ? t('form.sending') : t('form.submit')}
                  </button>

                  {submitStatus === 'success' && (
                    <p className="text-sm text-green-700" aria-live="polite">
                      {t('form.success')}
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-sm text-red-600" aria-live="polite">
                      {t('form.error', { email: CONTACT_EMAIL })}
                    </p>
                  )}
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
