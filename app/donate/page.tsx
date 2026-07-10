'use client'

import React, { useEffect } from 'react'
import { BookOpen, Globe, Heart, Laptop, Users } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Reveal from '@/components/Reveal'

declare global {
  interface Window {
    PayPal?: {
      Donation: {
        Button: (config: {
          env: string
          hosted_button_id: string
          image: {
            src: string
            alt: string
            title: string
          }
        }) => {
          render: (selector: string) => void
        }
      }
    }
  }
}

const impactAreas = [
  {
    icon: Users,
    title: 'Student scholarships',
    description: 'Provide full or partial scholarships for students to access programs and courses.',
    amount: '$100',
    impact: 'Sponsors 1 student for a full course',
  },
  {
    icon: BookOpen,
    title: 'Educational materials',
    description: 'Supply textbooks, course materials, and online resources for learners.',
    amount: '$50',
    impact: 'Provides materials for 5 students',
  },
  {
    icon: Laptop,
    title: 'Technology access',
    description: 'Purchase computers, tablets, and equipment for EdLight Labs.',
    amount: '$500',
    impact: 'Equips 1 computer workstation',
  },
  {
    icon: Globe,
    title: 'Program operations',
    description: 'Cover operational costs including internet, facilities, and staff.',
    amount: '$250',
    impact: 'Supports 1 month of operations',
  },
]

const donationLevels = [
  { amount: 25, title: 'Supporter', description: 'Help us maintain our online learning platform.' },
  { amount: 50, title: 'Contributor', description: 'Provide learning materials for students.' },
  { amount: 100, title: 'Sponsor', description: 'Sponsor a student for a complete course.' },
  { amount: 250, title: 'Patron', description: 'Support multiple students and programs.' },
  { amount: 500, title: 'Champion', description: 'Make a transformative impact on our community.' },
]

const otherWays = [
  { title: 'Monthly giving', body: 'Become a sustaining donor with recurring monthly contributions.', cta: 'Learn more' },
  { title: 'Corporate partnership', body: 'Partner with us to make a larger impact through corporate giving.', cta: 'Contact us' },
  { title: 'In-kind donations', body: 'Donate equipment, books, or other materials to support our programs.', cta: 'Get in touch' },
]

const faq = [
  {
    q: 'Is my donation tax-deductible?',
    a: 'We are working on obtaining tax-exempt status. Please contact us at info@edlight.org for information about donation receipts and tax deductibility.',
  },
  {
    q: 'How is my donation used?',
    a: '100% of your donation goes directly to supporting our programs, students, and operations. We maintain transparency and provide regular updates on how funds are utilized.',
  },
  {
    q: 'Can I donate in memory or honor of someone?',
    a: 'Yes! Please include a note with your donation or contact us to arrange a memorial or honorary gift. We can notify the honoree or their family of your generous contribution.',
  },
  {
    q: 'Will I receive updates on the impact of my donation?',
    a: 'Absolutely! Donors receive our quarterly newsletter with stories, updates, and reports on how contributions are making a difference in students’ lives.',
  },
]

const stats = [
  { value: '2,500+', label: 'Students served annually' },
  { value: '100%', label: 'Free programs' },
  { value: '45+', label: 'Courses offered' },
]

export default function DonatePage() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js'
    script.charset = 'UTF-8'
    document.body.appendChild(script)

    script.onload = () => {
      if (window.PayPal) {
        window.PayPal.Donation.Button({
          env: 'production',
          hosted_button_id: 'YOUR_BUTTON_ID',
          image: {
            src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
            alt: 'Donate with PayPal button',
            title: 'PayPal - The safer, easier way to pay online!',
          },
        }).render('#donate-button')
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <Hero
        eyebrow="Support EdLight"
        title="Support our mission"
        subtitle="Your donation empowers students and transforms communities through education. Every contribution, no matter the size, directly impacts students' lives."
        backgroundImage="/about_us.webp"
        meta={[
          { label: 'Students served', value: '2,500+' },
          { label: 'Programs', value: '100% free' },
          { label: 'Courses', value: '45+' },
          { label: 'To programs', value: '100%' },
        ]}
      >
        <a href="#donate" className="btn btn-primary">
          <Heart size={18} /> Donate now
        </a>
        <a href="/contact" className="btn btn-ghost">
          Other ways to give
        </a>
      </Hero>

      {/* Why your support matters */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeader title="Why your support matters" centered />
            <p className="body-lg -mt-4 text-[var(--ink-700)]">
              EdLight Initiative relies on the generosity of donors like you to provide free education and
              opportunities to underserved youth in Haiti and beyond. Every contribution helps break the
              cycle of poverty through education.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="rounded-2xl border border-[var(--paper-200)] bg-white p-6 text-center">
                  <div className="numeral text-3xl font-semibold text-[var(--accent)]">{stat.value}</div>
                  <div className="mt-1 text-sm text-[var(--ink-700)]">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where your donation goes */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Where your donation goes"
            subtitle="See the direct impact of your contribution."
            centered
          />
          <div className="grid gap-6 md:grid-cols-2">
            {impactAreas.map((area, i) => {
              const Icon = area.icon
              return (
                <Reveal key={area.title} delay={i * 60}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-[var(--paper-200)] bg-white p-6">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={22} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{area.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--ink-700)]">{area.description}</p>
                      <div className="mt-4 flex items-center justify-between rounded-xl bg-[var(--paper-50)] px-4 py-3">
                        <span className="numeral text-xl font-semibold text-[var(--accent)]">{area.amount}</span>
                        <span className="text-sm text-[var(--ink-400)]">{area.impact}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Donation levels */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader title="Donation levels" subtitle="Choose an amount that works for you." centered />
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {donationLevels.map((level, i) => (
              <Reveal key={level.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-6 text-center">
                  <div className="inline-block rounded-full bg-[var(--accent-soft)] px-4 py-1 text-xs font-semibold text-[var(--accent)]">
                    {level.title}
                  </div>
                  <div className="numeral mt-3 text-3xl font-semibold text-[var(--ink-900)]">${level.amount}</div>
                  <p className="mt-2 text-sm text-[var(--ink-700)]">{level.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-[var(--ink-400)]">Or choose a custom amount below.</p>
        </div>
      </section>

      {/* Make your donation — dark editorial band */}
      <section id="donate" className="pb-16 sm:pb-20 md:pb-24 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div
            className="relative overflow-hidden rounded-3xl p-10 text-white sm:p-14"
            style={{
              background:
                'radial-gradient(circle at 80% 20%, rgba(30,66,159,0.4) 0%, transparent 55%), linear-gradient(135deg, var(--ink-deep) 0%, #0a1530 70%, #0f1e4a 100%)',
            }}
          >
            <div className="relative z-10 mx-auto max-w-xl text-center">
              <span className="eyebrow text-white/85">Give securely</span>
              <h2 className="display-md mt-3 text-white">Make your donation today</h2>
              <p className="mt-3 text-white/90">Secure donation processing through PayPal.</p>
              <div className="mt-8 flex justify-center">
                <div
                  id="donate-button"
                  className="w-full max-w-sm rounded-2xl border border-[var(--paper-200)] bg-white p-6"
                >
                  {/* PayPal button renders here */}
                  <p className="text-sm text-[var(--ink-700)]">Donate securely with PayPal or credit card</p>
                  <button className="btn btn-primary mt-4 w-full justify-center">
                    <Heart size={20} /> Donate now
                  </button>
                  <p className="mt-4 text-xs text-[var(--ink-400)]">
                    All donations are secure and tax-deductible
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other ways to give */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Other ways to give"
            subtitle="Additional options to support our mission."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {otherWays.map((way, i) => (
              <Reveal key={way.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-[var(--paper-200)] bg-white p-7 text-center">
                  <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{way.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-700)]">{way.body}</p>
                  <a
                    href="/contact"
                    className="mt-4 inline-flex items-center justify-center gap-1 text-sm font-semibold text-[var(--accent)] hover:gap-2 transition-all"
                  >
                    {way.cta} →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader title="Donation FAQ" subtitle="Common questions about giving." centered />
          <div className="mx-auto max-w-3xl space-y-4">
            {faq.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <div className="rounded-2xl border border-[var(--paper-200)] bg-white p-6">
                  <h3 className="font-display text-base font-semibold text-[var(--ink-900)]">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Thank you */}
      <section className="pb-20 sm:pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--paper-200)] bg-[var(--paper-100)] p-10 text-center sm:p-14">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <Heart size={28} />
            </div>
            <h2 className="display-md mt-5 text-[var(--ink-900)]">Thank you for your support</h2>
            <p className="mt-3 text-[var(--ink-700)]">
              Every donation, no matter the size, brings us closer to our mission of empowering
              underserved communities through education. Together, we are changing lives and building a
              brighter future.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
