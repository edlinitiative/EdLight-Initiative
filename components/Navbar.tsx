'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/academy', label: 'Academy' },
  { href: '/labs', label: 'Labs' },
  { href: '/nexus', label: 'Nexus' },
  { href: '/eslp', label: 'ESLP' },
  { href: '/about', label: 'About' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/store', label: 'Store' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname() || '/'
  const paypalDonateUrl = 'https://www.paypal.com/donate/?hosted_button_id=6AKKBQXK47EZU'

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

  const openDonatePopup = () => {
    if (typeof window === 'undefined') return

    const popup = window.open(
      paypalDonateUrl,
      'paypalDonateWindow',
      'width=640,height=720,menubar=no,toolbar=no,location=yes,status=no,resizable=yes,scrollbars=yes'
    )

    if (!popup) {
      window.location.href = paypalDonateUrl
    }
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-white/70 backdrop-blur-xl border-white/30 shadow-md'
          : 'bg-white/40 backdrop-blur-xl border-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-96 h-24">
              <Image
                src="/EdLight_Website_Logo.png"
                alt="EdLight Initiative Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-body text-sm font-medium transition-colors',
                  isActivePath(link.href)
                    ? 'text-primary underline decoration-primary/40 underline-offset-8'
                    : 'text-gray-700 hover:text-primary'
                )}
                aria-current={isActivePath(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              type="button"
              onClick={openDonatePopup}
              className="btn btn-primary btn-sm"
            >
              Donate
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-text"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'block py-3 font-body px-4 rounded transition-colors',
                  isActivePath(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                )}
                aria-current={isActivePath(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false)
                openDonatePopup()
              }}
              className="btn btn-primary w-full justify-center mt-4 mx-4"
            >
              Donate
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
