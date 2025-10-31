import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-text text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* About Column */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">About EdLight</h3>
            <p className="font-body text-gray-300 text-sm leading-relaxed mb-4">
              Empowering the next generation of Haitian innovators through quality education,
              mentorship, and opportunities.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Programs Column */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Programs</h3>
            <ul className="space-y-2 font-body text-sm">
              <li>
                <Link href="/academy" className="text-gray-300 hover:text-primary transition-colors">
                  EdLight Academy
                </Link>
              </li>
              <li>
                <Link href="/labs" className="text-gray-300 hover:text-primary transition-colors">
                  CISJ Labs
                </Link>
              </li>
              <li>
                <Link href="/nexus" className="text-gray-300 hover:text-primary transition-colors">
                  EdLight Nexus
                </Link>
              </li>
              <li>
                <Link href="/eslp" className="text-gray-300 hover:text-primary transition-colors">
                  ESLP
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Connect</h3>
            <div className="space-y-3 font-body text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={16} />
                <span>info@edlight-initiative.org</span>
              </div>
              <div className="mt-6">
                <p className="text-gray-300 mb-2">Subscribe to our newsletter:</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                  />
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {/* TODO: Hook up newsletter subscription */}
                  Newsletter coming soon!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} EdLight Initiative. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/get-involved" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/store" className="hover:text-primary transition-colors">
                Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
