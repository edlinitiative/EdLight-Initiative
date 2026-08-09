'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Users, Handshake, DollarSign, Mic, ShieldCheck, Heart } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Reveal from '@/components/Reveal'

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

type Way = {
  title: string
  description: string
  icon: React.ElementType
}

const waysToGetInvolved: Way[] = [
  {
    title: 'Volunteer',
    description: 'Share your skills and time to mentor students, teach courses, or support operations.',
    icon: Users,
  },
  {
    title: 'Partner',
    description: 'Organizations and institutions can partner with us to expand opportunities for students.',
    icon: Handshake,
  },
  {
    title: 'Donate',
    description: 'Financial support helps us provide free education and resources to more students.',
    icon: DollarSign,
  },
  {
    title: 'Speak',
    description: 'Inspire our students by sharing your story and expertise as a guest speaker.',
    icon: Mic,
  },
]

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
        eyebrow="EdLight Ecosystem · Get Involved"
        title="Get Involved"
        subtitle="Join us in empowering the next generation of Haitian innovators — as a volunteer, partner, donor, or guest speaker."
        backgroundImage="/about_us.webp"
        meta={[
          { label: 'Ways to help', value: '4' },
          { label: 'Donations to programs', value: '100%' },
        ]}
      >
        <a href="#donate" className="btn btn-primary">
          Donate now <Heart size={18} />
        </a>
        <a href="#contact" className="btn btn-ghost">
          Contact us
        </a>
      </Hero>

      {/* Ways to get involved */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Ways to get involved"
            subtitle="There are many ways you can support our mission — pick the one that fits you best."
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {waysToGetInvolved.map((way, i) => (
              <Reveal key={way.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-6 transition-shadow hover:shadow-md">
                  <IconBadge icon={way.icon} />
                  <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{way.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{way.description}</p>
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
              <span className="eyebrow text-white/85">Support our work</span>
            </div>
            <h2 className="display-lg text-white">Fuel free education for Haitian students</h2>
            <p className="body-lg mx-auto mt-4 max-w-xl text-white/90">
              Your donation directly supports scholarships, program costs, and resources for students. Every
              contribution makes a difference.
            </p>

            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="flex flex-col items-center gap-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--accent-soft)]">
                  <ShieldCheck size={16} />
                  Secure PayPal Checkout
                </span>
                <div id="donate-button-container" className="inline-flex justify-center">
                  <div id="donate-button"></div>
                </div>
                <p className="text-xs text-white/70">
                  Powered by PayPal. Choose a one-time gift or set up monthly support.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-white/70">
              EdLight Initiative is committed to transparency. 100% of donations go directly to programs and student
              support.
            </p>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact" className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="mx-auto max-w-2xl">
            <SectionHeader
              title="Contact us"
              subtitle="Tell us how you’d like to get involved and we’ll be in touch soon."
              centered
            />
            <Reveal>
              <div className="rounded-2xl border border-[var(--paper-200)] bg-white p-6 shadow-sm sm:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--ink-700)]">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className={fieldClasses}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--ink-700)]">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
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
                      I&apos;m interested in *
                    </label>
                    <select
                      id="interest"
                      {...register('interest', { required: 'Please select an option' })}
                      className={fieldClasses}
                    >
                      <option value="">Select an option</option>
                      <option value="volunteer">Volunteering</option>
                      <option value="partner">Partnership</option>
                      <option value="donate">Donation</option>
                      <option value="speak">Guest Speaking</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.interest && (
                      <p className="mt-1 text-sm text-red-600">{errors.interest.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--ink-700)]">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message', { required: 'Message is required' })}
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
                    {submitStatus === 'loading' ? 'Sending…' : 'Send Message'}
                  </button>

                  {submitStatus === 'success' && (
                    <p className="text-sm text-green-700" aria-live="polite">
                      Thank you for your interest! We will be in touch soon.
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-sm text-red-600" aria-live="polite">
                      There was an error sending your message. Please try again or email us at info@edlight.org.
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
