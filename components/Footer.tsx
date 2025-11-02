'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail } from 'lucide-react'

const socialLinks = [
  { href: 'https://www.facebook.com/edlinitiative', label: 'Facebook', icon: Facebook },
  { href: 'https://x.com/edlinitiative', label: 'Twitter', icon: Twitter },
  { href: 'https://www.instagram.com/edlinitiative/', label: 'Instagram', icon: Instagram },
  { href: 'https://www.youtube.com/@edlight-initiative', label: 'YouTube', icon: Youtube },
  { href: 'https://www.linkedin.com/company/edlight-initiative/', label: 'LinkedIn', icon: Linkedin },
]

const programLinks = [
  { href: '/academy', label: 'EdLight Academy' },
  { href: '/labs', label: 'EdLight Labs' },
  { href: '/nexus', label: 'EdLight Nexus' },
  { href: '/eslp', label: 'ESLP' },
]

const orgLinks = [
  { href: '/about', label: 'About' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/store', label: 'Store' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState<string | null>(null)

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!emailPattern.test(email)) {
      setStatus('error')
      setFeedback('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    setFeedback(null)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || 'Subscription failed. Please try again.')
      }

      setStatus('success')
      setFeedback("Thanks for subscribing! We'll be in touch soon.")
      setEmail('')
    } catch (error) {
      setStatus('error')
      setFeedback(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again in a moment.'
      )
    }
  }

  return (
    <footer className="relative mt-10 overflow-hidden">
  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#124594] via-[#3d7ed9] to-[#0f2f73]" />
  <div className="absolute -right-28 top-14 -z-10 h-64 w-64 rounded-full bg-[#5a9bff]/25 blur-3xl" />
  <div className="absolute left-[-22%] bottom-[-28%] -z-10 h-[18rem] w-[18rem] rounded-full bg-[#3a71d1]/25 blur-3xl" />

      <div className="container mx-auto px-4 py-10 text-white">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="font-heading text-2xl font-bold mb-3">EdLight Initiative</h3>
              <p className="font-body text-white/80 leading-relaxed">
                At EdLight, our mission is to make education free and accessible to all people in Haiti. We provide high
                school students with digital access to quality education through our online courses in STEM subjects.
                Additionally, our Summer Leadership Program offers a unique opportunity for students to explore
                innovation, entrepreneurship, and leadership beyond the classroom. Join us in our quest for educational
                equity and help us empower the next generation of leaders. Together, we can create a brighter future for
                all...{' '}
                <Link href="/about" className="underline decoration-white/60 underline-offset-4 hover:text-white">
                  Learn More
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/25"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">Programs</h4>
              <ul className="space-y-3 text-white/80">
                {programLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 text-sm transition hover:text-white"
                    >
                      <span>→</span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">Explore</h4>
              <ul className="space-y-3 text-white/80">
                {orgLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 text-sm transition hover:text-white"
                    >
                      <span>→</span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading text-lg font-semibold mb-3">Stay in the loop</h4>
              <p className="text-sm text-white/80 mb-4">
                Monthly highlights, student success stories, and program openings delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <label className="sr-only" htmlFor="newsletter-email">
                  Email address
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="flex-1 rounded-xl border border-white/30 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/60 focus:border-white focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                <p
                  className={`min-h-[1.25rem] text-xs ${
                    status === 'error'
                      ? 'text-red-200'
                      : status === 'success'
                      ? 'text-emerald-200'
                      : 'text-white/60'
                  }`}
                  aria-live="polite"
                >
                  {feedback ?? 'We respect your inbox. Unsubscribe any time.'}
                </p>
              </form>
              <div className="mt-2 flex items-center gap-2 text-sm text-white/75">
                <Mail size={16} />
                <span>info@edlight-initiative.org</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-5">
          <div className="flex flex-col gap-4 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {currentYear} EdLight Initiative. All rights reserved.</p>
            <p className="text-white/60">Crafting opportunities for Haiti&apos;s next generation.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
