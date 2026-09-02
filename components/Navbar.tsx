'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * The programmes, each with the one line that says what it actually is.
 *
 * The nav used to be a flat row of eight labels, six of which were internal
 * brand names — Academy, Code, Labs, Nexus, Scholars, ESLP. A first-time
 * visitor, or a grant reviewer assessing whether this site has "clear
 * navigation", cannot tell a coding platform from an exchange programme by
 * reading the word "Nexus". Grouping the four live programmes under one
 * "Programs" heading and giving each a descriptor solves that in the place
 * where the question is actually asked.
 *
 * Labs and Nexus are absent on purpose: Labs sells commercial web services
 * and Nexus has no dates, cohort, or application yet. Both are noindexed and
 * out of the sitemap, so linking to them from the primary nav would
 * contradict that.
 */
const programLinks = [
  {
    href: '/academy',
    label: 'EdLight Academy',
    description: 'Free courses in maths, physics, economics, and more',
  },
  {
    href: '/code',
    label: 'EdLight Code',
    description: 'Coding tracks in Haitian Creole, French, and English',
  },
  {
    href: '/coursera-scholars',
    label: 'Coursera Scholars',
    description: 'Funded Coursera certificates for Haitian students',
  },
  {
    href: '/eslp',
    label: 'ESLP',
    description: 'Our two-week summer leadership programme',
  },
]

const directLinks = [
  { href: '/about', label: 'About' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)
  const programsRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname() || '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the programs menu on outside click and on Escape. Without both, a
  // menu opened by keyboard has no way back out except Tab-ing through it.
  useEffect(() => {
    if (!isProgramsOpen) return

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!programsRef.current?.contains(event.target as Node)) {
        setIsProgramsOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsProgramsOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isProgramsOpen])

  // A route change should never leave a menu hanging open behind the new page.
  useEffect(() => {
    setIsProgramsOpen(false)
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const isProgramsActive = programLinks.some((link) => isActivePath(link.href))

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b',
        isScrolled
          ? 'bg-[var(--paper-50)]/95 backdrop-blur-md border-[var(--paper-200)]'
          : 'bg-[var(--paper-50)]/90 backdrop-blur-md border-transparent'
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center z-10">
            <div className="relative w-48 h-12 sm:w-56 sm:h-14">
              <Image
                src="/EdLight_Website_Logo.png"
                alt="EdLight Initiative Logo"
                fill
                sizes="224px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            <div className="relative" ref={programsRef}>
              <button
                type="button"
                onClick={() => setIsProgramsOpen((open) => !open)}
                aria-expanded={isProgramsOpen}
                aria-haspopup="true"
                className={cn(
                  'inline-flex items-center gap-1 text-sm transition-colors',
                  isProgramsActive
                    ? 'text-[var(--ink-900)] font-medium underline underline-offset-4 decoration-[var(--paper-300)]'
                    : 'text-[var(--ink-700)] hover:text-[var(--ink-900)]'
                )}
              >
                Programs
                <ChevronDown
                  size={14}
                  className={cn('transition-transform', isProgramsOpen && 'rotate-180')}
                  aria-hidden="true"
                />
              </button>

              {isProgramsOpen && (
                <div className="absolute left-0 top-full pt-3 z-50">
                  <ul className="w-[340px] border border-[var(--paper-200)] bg-[var(--paper-50)] py-2 shadow-lg">
                    {programLinks.map(({ href, label, description }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="block px-4 py-3 transition-colors hover:bg-[var(--paper-100)]"
                          aria-current={isActivePath(href) ? 'page' : undefined}
                        >
                          <span
                            className={cn(
                              'block text-sm',
                              isActivePath(href)
                                ? 'font-medium text-[var(--accent)]'
                                : 'font-medium text-[var(--ink-900)]'
                            )}
                          >
                            {label}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-[var(--ink-700)]">
                            {description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {directLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm transition-colors',
                  isActivePath(link.href)
                    ? 'text-[var(--ink-900)] font-medium underline underline-offset-4 decoration-[var(--paper-300)]'
                    : 'text-[var(--ink-700)] hover:text-[var(--ink-900)]'
                )}
                aria-current={isActivePath(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button — a real link to /donate, so the donation path is
              crawlable and works without JavaScript. */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center font-medium tracking-tight transition-colors duration-150 bg-[var(--accent)] text-white rounded-full hover:bg-[var(--accent-hover)] px-4 py-1.5 text-sm whitespace-nowrap min-w-[100px]"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden -mr-2 inline-flex h-11 w-11 items-center justify-center text-[var(--ink-900)]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-[var(--paper-200)]">
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto pt-2">
              {/* No disclosure on mobile. There is room to list the four
                  programmes outright, and a tap that only reveals more taps is
                  a worse deal on a phone than a slightly longer list. */}
              {/* Not `eyebrow`: that class hardcodes color: var(--ink-400),
                  which measures 4.29:1 on paper and loses to no Tailwind text
                  utility layered over it. A section label in the primary nav
                  should be readable. */}
              <p className="px-4 pt-2 pb-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--ink-700)]">
                Programs
              </p>
              {programLinks.map(({ href, label, description }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block py-3 px-4 transition-colors',
                    isActivePath(href)
                      ? 'bg-[var(--paper-100)]'
                      : 'hover:bg-[var(--paper-100)]'
                  )}
                  aria-current={isActivePath(href) ? 'page' : undefined}
                >
                  <span
                    className={cn(
                      'block text-base',
                      isActivePath(href)
                        ? 'text-[var(--accent)] font-medium'
                        : 'text-[var(--ink-900)]'
                    )}
                  >
                    {label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-[var(--ink-700)]">
                    {description}
                  </span>
                </Link>
              ))}

              <div className="mt-2 border-t border-[var(--paper-200)] pt-2">
                {directLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'block py-3 px-4 text-base transition-colors',
                      isActivePath(link.href)
                        ? 'text-[var(--accent)] font-medium bg-[var(--paper-100)]'
                        : 'text-[var(--ink-700)] hover:text-[var(--ink-900)] hover:bg-[var(--paper-100)]'
                    )}
                    aria-current={isActivePath(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="px-4 pt-3">
                <Link
                  href="/donate"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center font-medium tracking-tight bg-[var(--accent)] text-white rounded-full hover:bg-[var(--accent-hover)] px-4 py-2.5 text-sm"
                >
                  Donate
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
