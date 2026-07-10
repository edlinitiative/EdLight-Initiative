'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Reveal from '@/components/Reveal'

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

const fieldClasses =
  'w-full rounded-xl border border-[var(--paper-200)] bg-white px-4 py-3 text-[var(--ink-900)] transition-colors placeholder:text-[var(--ink-400)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30'

const socials = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/edlightinitiative',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/edlightinit',
    path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/edlightinitiative',
    path: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/edlight-initiative',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
]

export default function ContactPage() {
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
      // TODO: Integrate with backend API or email service (e.g., Firebase, SendGrid, Resend)
      // For now, we simulate a submission.
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log('Contact form submission:', data)
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
    <>
      <Hero
        eyebrow="Contact · EdLight"
        title="Contact us"
        subtitle="Get in touch with the EdLight team. Whether you have a question about our programs, want to partner, or just want to say hello — we'd love to hear from you."
      >
        <a href="mailto:info@edlight.org" className="btn btn-primary">
          <Mail size={18} /> Email us
        </a>
        <a href="/get-involved" className="btn btn-ghost">
          Get involved
        </a>
      </Hero>

      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-[var(--paper-200)] bg-white p-6 sm:p-8">
                <h2 className="display-md mb-6 text-[var(--ink-900)]">Get in touch</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Mail size={22} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-[var(--ink-900)]">Email</h3>
                      <a href="mailto:info@edlight.org" className="text-sm text-[var(--accent)] hover:underline">
                        info@edlight.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Phone size={22} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-[var(--ink-900)]">Phone</h3>
                      <p className="text-sm text-[var(--ink-700)]">+509 XXXX-XXXX</p>
                      <p className="text-xs text-[var(--ink-400)]">Monday - Friday, 9AM - 5PM EST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-[var(--ink-900)]">Location</h3>
                      <p className="text-sm text-[var(--ink-700)]">Haiti</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--paper-200)] bg-[var(--paper-100)] p-6 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">Office hours</h3>
                <div className="mt-4 space-y-2 text-sm text-[var(--ink-700)]">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--paper-200)] bg-white p-6 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">Follow us</h3>
                <div className="mt-4 flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--paper-200)] text-[var(--ink-700)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <Reveal>
              <div className="rounded-2xl border border-[var(--paper-200)] bg-white p-6 sm:p-8">
                <SectionHeader title="Send us a message" className="mb-6" />

                {submitStatus === 'success' && (
                  <div className="mb-6 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--accent)]">
                    Thank you for contacting us! We&apos;ll respond to your inquiry within 2-3 business days.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    There was an error submitting your message. Please try again or email us directly at
                    info@edlight.org.
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--ink-700)]">
                      Full name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      className={fieldClasses}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--ink-700)]">
                      Email address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className={fieldClasses}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-[var(--ink-700)]">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject', { required: 'Subject is required' })}
                      className={fieldClasses}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--ink-700)]">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      {...register('message', {
                        required: 'Message is required',
                        minLength: { value: 10, message: 'Message must be at least 10 characters' },
                      })}
                      className={`${fieldClasses} resize-none`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send size={18} /> Send message
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-[var(--ink-400)]">
                    We typically respond within 2-3 business days.
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
