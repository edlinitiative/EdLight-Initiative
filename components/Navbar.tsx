'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
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
                className="font-body text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/get-involved#donate"
              className="px-6 py-2 bg-accent text-text font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Donate
            </Link>
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
                className="block py-3 font-body text-gray-700 hover:text-primary hover:bg-gray-50 px-4 rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/get-involved#donate"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-4 mx-4 px-6 py-2 bg-accent text-text font-semibold rounded-lg hover:bg-accent/90 transition-colors text-center"
            >
              Donate
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
