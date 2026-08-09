'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  { href: '/coursera-scholars', label: 'Coursera Scholars' },
  { href: '/eslp', label: 'ESLP' },
]

const orgLinks = [
  { href: '/about', label: 'About' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/donate', label: 'Donate' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

// Legal belongs in the bottom bar beside the copyright and the incorporation
// details, not in a column of places to go. Having "Terms of Use" sit under
// "About" and "Contact" also left that column at seven items against the
// Programs column's five, which is what made the pair read as ragged.
const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms-of-use', label: 'Terms of Use' },
]

// lucide-react ships an Apple glyph but no Android one, so both platform marks
// are inlined from Simple Icons (https://simpleicons.org, CC0) — one source
// keeps their weight and 24x24 box consistent. The Android robot is a Google
// trademark, used here only to identify the platform a link points to.
function AppleMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

function AndroidMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z" />
    </svg>
  )
}

// Only public listings get a real link. EdLight Code's App Store page 404s
// until Apple approves the submission, and the Ad Grants website policy
// requires every link to work — so its iOS entry stays a non-link until then.
// To go live: give that entry an href of https://apps.apple.com/app/id6796587680
const mobileApps = [
  {
    name: 'EdLight Academy',
    tagline: 'Courses, live classes, and certificates on your phone.',
    platforms: [
      {
        platform: 'iOS',
        icon: AppleMark,
        href: 'https://apps.apple.com/app/id6792210920',
      },
      {
        platform: 'Android',
        icon: AndroidMark,
        href: 'https://play.google.com/store/apps/details?id=com.edlightacademy',
      },
    ],
  },
  {
    name: 'EdLight Code',
    tagline: 'Practice coding and digital skills in Kreyòl, French, or English.',
    platforms: [
      { platform: 'iOS', icon: AppleMark, href: null, note: 'Coming soon' },
      {
        platform: 'Android',
        icon: AndroidMark,
        href: 'https://play.google.com/store/apps/details?id=org.edlight.code',
      },
    ],
  },
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
    <footer
      className="relative mt-16 border-t border-white/10"
      style={{
        background:
          'linear-gradient(180deg, #001a4d 0%, #00102e 60%, #000a1f 100%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <Link href="/" aria-label="EdLight Initiative home" className="inline-block mb-4">
                <Image
                  src="/EdLight_Website_Logo.png"
                  alt="EdLight Initiative"
                  width={200}
                  height={50}
                  className="h-10 sm:h-12 w-auto object-contain object-left brightness-0 invert"
                />
              </Link>
              <p className="text-sm leading-relaxed text-[var(--paper-on-dark)] max-w-sm">
                At EdLight, our mission is to make education free and accessible to all people in Haiti. We provide
                high school students with digital access to quality education through STEM courses, leadership programs,
                and global opportunities.{' '}
                <Link href="/about" className="text-white underline underline-offset-4 decoration-[var(--on-dark-faint)] hover:decoration-white transition-colors">
                  Learn More
                </Link>
                .
              </p>
            </div>
            {/* Unboxed. Five outlined squares here, plus two app cards, four
                platform chips, an input and a button, made the footer a field
                of thirteen rectangles competing for the same attention. The
                icons are already legible shapes; the boxes added noise and no
                information. Tap target stays 36px via padding, not a border. */}
            <div className="flex flex-wrap gap-1">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center text-[var(--paper-on-dark)] transition-colors hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-7 grid gap-8 grid-cols-2 lg:grid-cols-3">
            <div>
              <h4 className="eyebrow text-[var(--paper-on-dark)] mb-4">Programs</h4>
              <ul className="space-y-2.5">
                {programLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-[var(--paper-on-dark)] hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="eyebrow text-[var(--paper-on-dark)] mb-4">Explore</h4>
              <ul className="space-y-2.5">
                {orgLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-[var(--paper-on-dark)] hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 col-span-2 lg:col-span-1">
              <h4 className="eyebrow text-[var(--paper-on-dark)]">Newsletter</h4>
              <p className="text-xs text-[var(--paper-on-dark)] leading-relaxed">
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
                  className="w-full border border-[var(--line-on-dark-strong)] bg-white/[0.08] px-3 py-2.5 text-sm text-white placeholder-[var(--on-dark-faint)] focus:border-white focus:outline-none"
                  required
                />
                {/* The one thing in this footer that must be pressable on
                    sight. It used to be bg-[var(--accent)] — #002b80, the
                    brand navy — which measures 1.56:1 against this navy
                    footer, so the only call to action on the page was
                    effectively camouflaged. That token is built for the light
                    page and cannot survive on a dark ground.

                    White surface with the navy label instead: 15:1 against the
                    background, 12.7:1 for the label, and it matches what the
                    hero already does with "Explore Programs" on its dark
                    photograph, so the site keeps one rule for on-dark buttons
                    rather than two. */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-white text-[var(--accent)] text-sm font-semibold py-2.5 px-4 transition-colors hover:bg-[var(--paper-on-dark)] disabled:opacity-60"
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
                {feedback && (
                  <p className={`text-xs ${status === 'error' ? 'text-red-300' : 'text-emerald-300'}`} aria-live="polite">
                    {feedback}
                  </p>
                )}
              </form>
              <div className="flex items-center gap-2 text-xs text-[var(--paper-on-dark)]">
                <Mail size={14} />
                <a href="mailto:info@edlight.org" className="hover:text-[var(--paper-on-dark)] transition-colors">info@edlight.org</a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile apps
            On the SAME 5/7 split as the columns above, so the label sits under
            the brand text and the two apps line up under Programs and Explore.
            Two earlier attempts got this wrong in opposite directions: boxed
            cards capped at max-w-3xl left the block stranded two thirds across
            while every rule ran full width, and removing the cap entirely
            pushed the apps to opposite ends with a canyon between them.
            Inheriting the grid that already exists solves both.

            The card outlines are gone too — a heading and space are all the
            grouping two items need. */}
        <div className="mt-12 grid gap-8 border-t border-[var(--line-on-dark)] pt-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h4 className="eyebrow text-[var(--paper-on-dark)] mb-1.5">Mobile Apps</h4>
            <p className="text-xs text-[var(--on-dark-muted)]">
              Free to download, on phones and tablets.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:col-span-7">
            {mobileApps.map(({ name, tagline, platforms }) => (
              <div key={name}>
                <p className="text-sm font-medium text-white">{name}</p>
                <p className="mt-1 max-w-xs text-xs leading-relaxed text-[var(--on-dark-muted)]">
                  {tagline}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {platforms.map(({ platform, href, icon: Icon, note }) =>
                    href ? (
                      <a
                        key={platform}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Get ${name} for ${platform}`}
                        className="inline-flex items-center gap-2 border border-[var(--line-on-dark-strong)] px-3 py-2 text-xs text-[var(--paper-on-dark)] transition-colors hover:border-white hover:bg-white/[0.08] hover:text-white"
                      >
                        <Icon size={14} />
                        {platform}
                      </a>
                    ) : (
                      // Not a chip. A dashed box that cannot be pressed still
                      // looks like a control, and at 3.71:1 its label was the
                      // least legible text in the footer. A plain line reads as
                      // a status, which is what it is.
                      // `border-transparent` rather than no border: it keeps the
                      // identical box model to the real chip beside it, so the
                      // two sit on one baseline. Dropping the border outright
                      // made this line ride 1px high and knocked the Android
                      // chip out of alignment.
                      <span
                        key={platform}
                        className="inline-flex items-center gap-2 border border-transparent px-3 py-2 text-xs text-[var(--on-dark-faint)]"
                      >
                        <Icon size={14} />
                        {platform}
                        {note && <span className="text-[var(--on-dark-faint)]">— {note.toLowerCase()}</span>}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal bar. The slogan that used to sit opposite the copyright
            ("Crafting opportunities for Haiti's next generation") is gone: the
            brand paragraph at the top of this footer already says the mission,
            and a second, vaguer version of it was taking the one slot where
            people actually look for Privacy and Terms. */}
        <div className="mt-12 border-t border-[var(--line-on-dark)] pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="eyebrow text-[var(--paper-on-dark)] text-[10px]">© {currentYear} EDLIGHT INITIATIVE · ALL RIGHTS RESERVED.</p>
            <nav aria-label="Legal" className="flex items-center gap-4">
              {legalLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs text-[var(--on-dark-muted)] transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="mt-3 text-xs text-[var(--on-dark-muted)]">
            EdLight Initiative is a not-for-profit corporation registered in Canada (Corporation No. 1376443-5),
            based in Montreal, Quebec.
          </p>
        </div>
      </div>
    </footer>
  )
}

