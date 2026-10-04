import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Globe2, GraduationCap, Users } from 'lucide-react'
import { setRequestLocale } from 'next-intl/server'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import NotifyButton from '@/components/NotifyButton'
import ClientMessages from '@/components/ClientMessages'
import { NEXUS_ENABLED } from '@/lib/site'

// Nexus is not open yet: no cohort, dates, or application. The earlier page
// ran to some 650 words of "designed to" and "may include", which read as a
// programme that existed. This version says plainly that it is in
// development, keeps the plan to three lines, and gives the visitor one real
// thing to do: join the notify list (cycle 'EdLight Nexus' in
// /api/eslp-notify). When there are dates and a way to apply, replace the
// "In development" framing and point the CTA at the application.
const NOTIFY_CYCLE_LABEL = 'EdLight Nexus'

export function generateMetadata(): Metadata {
  if (!NEXUS_ENABLED) {
    return { robots: { index: false, follow: false } }
  }
  return {
    title: 'EdLight Nexus',
    description:
      'EdLight Nexus is a global learning and exchange programme for Haitian students, now in development. Join the list to hear when it opens.',
    alternates: { canonical: '/nexus' },
  }
}

const plans = [
  {
    title: 'Academic exposure',
    description: 'Visits to universities and learning environments that widen what higher education can look like.',
    icon: GraduationCap,
  },
  {
    title: 'Leadership & civic life',
    description: 'Conversations with people working on public problems, and time to reflect on service and responsibility.',
    icon: Users,
  },
  {
    title: 'Culture & creativity',
    description: 'Time with cultural institutions and creative spaces that deepen cross-cultural understanding.',
    icon: Globe2,
  },
]

export default function NexusPage({ params }: { params: { locale: string } }) {
  // Required for static rendering under [locale]: without it next-intl
  // has no locale outside a request and falls back to the default.
  setRequestLocale(params.locale)

  // Gated inside the page, not a layout: a layout gate leaves the page's
  // markup in the flight payload. See NEXUS_ENABLED in lib/site.ts.
  if (!NEXUS_ENABLED) {
    notFound()
  }

  const notify = (className: string) => (
    <ClientMessages namespaces={['notify']}>
      <NotifyButton cycleLabel={NOTIFY_CYCLE_LABEL} className={className}>
        Get notified when Nexus opens
      </NotifyButton>
    </ClientMessages>
  )

  return (
    <>
      <Hero
        eyebrow="In development"
        title="EdLight Nexus"
        subtitle="A global learning and exchange programme for Haitian students. We're designing it now."
        backgroundImage="/nexus_pic.webp"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {notify('btn btn-primary')}
          <a href="mailto:nexus@edlight.org" className="btn btn-ghost">
            nexus@edlight.org
          </a>
        </div>
      </Hero>

      <section className="py-20 sm:py-24 bg-[var(--paper-50)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="eyebrow text-[11px] text-[var(--ink-400)]">Not open yet</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ink-900)] mt-3 mb-5">
              What we&apos;re planning
            </h2>
            <p className="body-lg text-[var(--ink-700)]">
              Nexus will take small groups of Haitian students abroad for short, structured learning experiences,
              then help them bring what they learn back home. There are no dates or applications yet. Join the
              list and we&apos;ll tell you first when there are.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map(({ title, description, icon: Icon }) => (
              <div key={title} className="border border-[var(--paper-200)] bg-white p-7">
                <Icon size={24} className="text-[var(--accent)] mb-4" />
                <h3 className="font-display text-lg font-semibold text-[var(--ink-900)] mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-[var(--ink-700)]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white border-t border-[var(--paper-200)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <SectionHeader
            title="Want to help shape Nexus?"
            subtitle="We're looking for partner universities, host organizations, and funders who share the goal of widening opportunity for Haitian students."
            centered
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            {notify('btn btn-primary')}
            <a href="mailto:nexus@edlight.org" className="btn btn-outline">
              Partner with us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
