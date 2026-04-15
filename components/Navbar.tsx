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
  { href: '/code', label: 'Code' },
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

    const POPUP_WIDTH = 720
    const POPUP_HEIGHT = 820

    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY
    const currentWidth = window.innerWidth || document.documentElement.clientWidth || screen.width
    const currentHeight = window.innerHeight || document.documentElement.clientHeight || screen.height

    const left = dualScreenLeft + Math.max(0, (currentWidth - POPUP_WIDTH) / 2)
    const top = dualScreenTop + Math.max(0, (currentHeight - POPUP_HEIGHT) / 2)

    const popup = window.open(
      paypalDonateUrl,
      'paypalDonatePopup',
      `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},top=${top},left=${left},` +
        'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes'
    )

    if (!popup) {
      window.location.href = paypalDonateUrl
      return
    }

    popup.focus()
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-lg border-b border-primary/10'
          : 'bg-white/70 backdrop-blur-xl border-b border-transparent'
      )}
    >
      <div className="hidden lg:block border-b border-primary/10 bg-primary/[0.04]">
        <div className="container mx-auto px-4 h-10 flex items-center justify-between text-xs text-slate-700">
          <p className="font-medium tracking-wide text-slate-700/90">Empowering Haitian youth through education, innovation, and leadership since 2015</p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="hover:text-primary transition-colors">About the Initiative</Link>
            <a href="mailto:info@edlight.org" className="hover:text-primary transition-colors">info@edlight.org</a>
          </div>
        </div>
      </div>

      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[4.75rem] lg:h-[5.25rem] relative">
          {/* Logo */}
          <Link href="/" className="flex items-center z-10">
            <div className="relative w-[13.5rem] h-[3.4rem] sm:w-60 sm:h-16 lg:w-72 lg:h-[4.5rem]">
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
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-body text-[0.84rem] font-semibold tracking-[0.01em] transition-colors',
                  isActivePath(link.href)
                    ? 'text-primary'
                    : 'text-gray-700 hover:text-primary'
                )}
                aria-current={isActivePath(link.href) ? 'page' : undefined}
              >
                {link.label}
                {isActivePath(link.href) && (
                  <span className="block h-0.5 w-full rounded-full bg-primary mt-1" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button type="button" onClick={openDonatePopup} className="btn btn-primary btn-sm">
              Donate
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 text-text hover:bg-gray-100 rounded-lg transition-colors ml-auto relative z-10"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-2 border-t border-primary/10 bg-white/95 backdrop-blur-md rounded-b-2xl mb-2">
            <div className="max-h-[calc(100vh-5.5rem)] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block py-3.5 font-body px-4 rounded-lg mx-2 my-1 transition-colors text-base',
                    isActivePath(link.href)
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  )}
                  aria-current={isActivePath(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-2 pb-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    openDonatePopup()
                  }}
                  className="btn btn-primary w-full justify-center"
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
