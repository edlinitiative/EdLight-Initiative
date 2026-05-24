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
  { href: '/code', label: 'EdLight Code' },
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
    <footer className="relative mt-16 border-t border-[var(--paper-200)]" style={{ background: 'var(--ink-deep)' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <h3 className="font-display text-lg font-bold text-[var(--paper-on-dark)] mb-3">EdLight Initiative</h3>
              <p className="text-sm leading-relaxed text-[var(--paper-on-dark)]/75 max-w-sm">
                At EdLight, our mission is to make education free and accessible to all people in Haiti. We provide
                high school students with digital access to quality education through STEM courses, leadership programs,
                and global opportunities.{' '}
                <Link href="/about" className="text-[var(--paper-on-dark)] underline underline-offset-4 decoration-[var(--paper-on-dark)]/50 hover:decoration-[var(--paper-on-dark)] transition-colors">
                  Learn More
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border border-[var(--paper-on-dark)]/25 text-[var(--paper-on-dark)]/80 transition hover:border-[var(--paper-on-dark)]/50 hover:text-[var(--paper-on-dark)] hover:bg-white/[0.04]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-7 grid gap-8 grid-cols-2 lg:grid-cols-3">
            <div>
              <h4 className="eyebrow text-[var(--paper-on-dark)]/70 mb-4">Programs</h4>
              <ul className="space-y-2.5">
                {programLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-[var(--paper-on-dark)]/80 hover:text-[var(--paper-on-dark)] transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="eyebrow text-[var(--paper-on-dark)]/70 mb-4">Explore</h4>
              <ul className="space-y-2.5">
                {orgLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-[var(--paper-on-dark)]/80 hover:text-[var(--paper-on-dark)] transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 col-span-2 lg:col-span-1">
              <h4 className="eyebrow text-[var(--paper-on-dark)]/70">Newsletter</h4>
              <p className="text-xs text-[var(--paper-on-dark)]/75 leading-relaxed">
                Monthly highlights, student stories, and program openings.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <label className="sr-only" htmlFor="newsletter-email">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[var(--paper-on-dark)]/25 bg-white/[0.06] px-3 py-2.5 text-sm text-[var(--paper-on-dark)] placeholder-[var(--paper-on-dark)]/50 focus:border-[var(--paper-on-dark)]/60 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[var(--accent)] text-white text-sm font-medium py-2.5 px-4 hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
                {feedback && (
                  <p className={`text-xs ${status === 'error' ? 'text-red-300' : 'text-emerald-300'}`} aria-live="polite">
                    {feedback}
                  </p>
                )}
              </form>
              <div className="flex items-center gap-2 text-xs text-[var(--paper-on-dark)]/75">
                <Mail size={14} />
                <a href="mailto:info@edlight.org" className="hover:text-[var(--paper-on-dark)] transition-colors">info@edlight.org</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--paper-on-dark)]/20 pt-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="eyebrow text-[var(--paper-on-dark)]/60 text-[10px]">© {currentYear} EDLIGHT INITIATIVE · ALL RIGHTS RESERVED.</p>
            <p className="text-xs text-[var(--paper-on-dark)]/60">Crafting opportunities for Haiti&apos;s next generation.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

