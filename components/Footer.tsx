import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react'

const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', icon: Facebook },
  { href: 'https://twitter.com', label: 'Twitter', icon: Twitter },
  { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
  { href: 'https://youtube.com', label: 'YouTube', icon: Youtube },
]

const programLinks = [
  { href: '/academy', label: 'EdLight Academy' },
  { href: '/labs', label: 'CISJ Labs' },
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

  return (
    <footer className="relative mt-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-secondary to-[#0B4B9C]" />
      <div className="absolute -right-32 top-0 -z-10 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute left-[-15%] bottom-[-20%] -z-10 h-[28rem] w-[28rem] rounded-full bg-primary/30 blur-3xl" />

      <div className="container mx-auto px-4 py-20 text-white">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-strong rounded-3xl p-8">
              <h3 className="font-heading text-2xl font-bold mb-3">EdLight Initiative</h3>
              <p className="font-body text-white/80 leading-relaxed">
                Empowering the next generation of Haitian innovators through modern education,
                mentorship, and global pathways.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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

            <div className="glass rounded-3xl p-6">
              <h4 className="font-heading text-lg font-semibold mb-3">Stay in the loop</h4>
              <p className="text-sm text-white/80 mb-4">
                Monthly highlights, student success stories, and program openings delivered to your inbox.
              </p>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Email address"
                  className="flex-1 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 focus:border-white focus:outline-none"
                />
                <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-white/80">
                  Subscribe
                </button>
              </div>
              <p className="mt-3 text-xs text-white/60">Newsletter integration coming soon.</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
                <Mail size={16} />
                <span>info@edlight-initiative.org</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/20 pt-6">
          <div className="flex flex-col gap-4 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {currentYear} EdLight Initiative. All rights reserved.</p>
            <p className="text-white/60">Crafting opportunities for Haiti&apos;s next generation.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
