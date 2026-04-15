'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
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
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300',
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-slate-200/70 shadow-sm'
          : 'bg-white/70 backdrop-blur-md border-white/0'
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="font-heading text-2xl font-black tracking-tight text-primary transition-colors hover:text-primary-container"
        >
          EdLight
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-heading text-sm font-bold tracking-tight transition-colors',
                isActivePath(link.href)
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-slate-600 hover:text-primary'
              )}
              aria-current={isActivePath(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/get-involved" className="btn btn-ghost btn-sm">
            Get Involved
          </Link>
          <button type="button" onClick={openDonatePopup} className="btn btn-primary btn-sm">
            Donate
          </button>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden rounded-xl p-2 text-on-surface transition-colors hover:bg-surface-container-low"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-md">
          <div className="mx-auto max-h-[calc(100vh-5rem)] w-full max-w-screen-2xl overflow-y-auto px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'mx-1 my-1 block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                  isActivePath(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-700 hover:bg-surface-container-low hover:text-primary'
                )}
                aria-current={isActivePath(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-3 px-1 pb-3">
              <Link
                href="/get-involved"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-ghost w-full justify-center"
              >
                Get Involved
              </Link>
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
  )
}
