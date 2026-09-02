'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home', isLaunched: true },
  { href: '/academy', label: 'Academy', isLaunched: true },
  { href: '/code', label: 'Code', isLaunched: true },
  { href: '/labs', label: 'Labs', isLaunched: true },
  { href: '/nexus', label: 'Nexus', isLaunched: false },
  { href: '/coursera-scholars', label: 'Scholars', isLaunched: true },
  { href: '/eslp', label: 'ESLP', isLaunched: true },
  { href: '/about', label: 'About', isLaunched: true },
  { href: '/get-involved', label: 'Get Involved', isLaunched: true },
  { href: '/store', label: 'Store', isLaunched: false },
]

const visibleNavLinks = navLinks.filter((link) => link.isLaunched)

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname() || '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

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
            {visibleNavLinks.map((link) => (
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
              {visibleNavLinks.map((link) => (
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
