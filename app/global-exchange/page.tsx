import React from 'react'
import { Metadata } from 'next'
import { Award, Building, Globe, Plane, ArrowRight, BookOpen, Users } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Global Exchange | EdLight Initiative',
  description:
    'Learn how EdLight approaches global exposure and exchange experiences for Haitian students through Nexus.',
}

const opportunities = [
  {
    title: 'International scholarships',
    description: 'Scholarship pathways that may help students access learning opportunities beyond Haiti.',
    icon: Award,
    examples: ['Fulbright Program', 'Commonwealth Scholarships', 'DAAD Scholarships', 'Chevening Scholarships'],
  },
  {
    title: 'Study abroad programs',
    description: 'Short-term and longer-form exchange models that can deepen academic and cultural exposure.',
    icon: Globe,
    examples: ['Semester Exchange', 'Summer Programs', 'Language Immersion', 'Cultural Exchange'],
  },
  {
    title: 'International conferences',
    description: 'Global gatherings that can broaden perspective, learning, and professional awareness.',
    icon: Users,
    examples: ['Youth Leadership Summits', 'Tech Conferences', 'UN Youth Forums', 'Model UN'],
  },
  {
    title: 'Global internships',
    description: 'Selected professional pathways that may offer international experience when available.',
    icon: Building,
    examples: ['UN Internships', 'NGO Positions', 'Tech Company Internships', 'Embassy Programs'],
  },
  {
    title: 'Online programs',
    description: 'Virtual learning and exchange formats that can expand access to global ideas and institutions.',
    icon: BookOpen,
    examples: ['MOOCs', 'Virtual Exchanges', 'Online Certificates', 'Webinar Series'],
  },
  {
    title: 'Travel grants',
    description: 'Potential funding sources that may help make exposure-based travel and participation more possible.',
    icon: Plane,
    examples: ['Conference Travel Grants', 'Research Funding', 'Training Programs', 'Cultural Tours'],
  },
]

const benefits = [
  { title: 'Cultural exchange', description: 'Experience different cultures, traditions, and perspectives firsthand.' },
  { title: 'Global network', description: 'Build lasting connections with peers, mentors, and professionals worldwide.' },
  { title: 'Career advancement', description: 'Gain international experience that makes you stand out in the job market.' },
  { title: 'Personal growth', description: 'Develop independence, adaptability, and cross-cultural communication skills.' },
  { title: 'Academic excellence', description: 'Access world-class education and cutting-edge research opportunities.' },
  { title: 'Language skills', description: 'Improve language proficiency through immersion and practical use.' },
]

const steps = [
  { title: 'Exploration', body: 'We help frame the kinds of global pathways that may align with student goals and readiness.' },
  { title: 'Preparation', body: 'Participants may receive guidance that helps them prepare thoughtfully for the experience.' },
  { title: 'Immersion', body: 'The experience centers on learning through exposure, exchange, and engagement with new contexts.' },
  { title: 'Reflection', body: 'Fellows are encouraged to reflect on what they learn and how it can create value back home.' },
]

const whyItMatters = [
  {
    label: 'Broader perspective',
    body: 'Global exposure can expand what students believe is possible. It can strengthen confidence, ambition, and a deeper understanding of how learning connects across borders.',
  },
  {
    label: 'Meaningful return value',
    body: 'When designed carefully, exchange experiences can help young Haitians return with new insight, stronger leadership instincts, and a renewed sense of contribution.',
  },
]

export default function GlobalExchangePage() {
  return (
    <>
      <Hero
        eyebrow="EdLight Nexus · Global Exchange"
        title="Global Exchange"
        subtitle="A closer look at the kinds of international exposure and exchange opportunities that can broaden opportunity for Haitian students."
        backgroundImage="/nexus_pic.webp"
        meta={[
          { label: 'Pathways', value: '6' },
          { label: 'Focus', value: 'Global exposure' },
          { label: 'Initiative', value: 'EdLight Nexus' },
        ]}
      >
        <a href="mailto:nexus@edlight.org" className="btn btn-primary">
          Contact nexus@edlight.org
        </a>
        <a href="/nexus" className="btn btn-ghost">
          Visit the Nexus page
        </a>
      </Hero>

      {/* Intro */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="body-lg text-[var(--ink-700)]">
              EdLight Nexus is EdLight&apos;s international exposure and exchange initiative. This page highlights
              the kinds of pathways that can help Haitian students engage global learning, cultural exchange, and
              new ideas through thoughtful exploration and preparation.
            </p>
            <div className="mt-8 rounded-2xl border border-[var(--paper-200)] bg-[var(--paper-100)] px-6 py-5">
              <p className="font-display font-semibold text-[var(--ink-900)]">
                Designed to encourage exploration, perspective, and meaningful opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of opportunities */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Types of opportunities"
            subtitle="Discover the various ways students can expand their horizons."
            centered
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opportunity, i) => {
              const Icon = opportunity.icon
              return (
                <Reveal key={opportunity.title} delay={i * 60}>
                  <div className="flex h-full flex-col rounded-2xl border border-[var(--paper-200)] bg-white p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{opportunity.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{opportunity.description}</p>
                    <div className="mt-5 border-t border-[var(--paper-200)] pt-4">
                      <p className="eyebrow mb-2 text-[var(--ink-400)]">Illustrative examples</p>
                      <ul className="space-y-1 text-sm text-[var(--ink-700)]">
                        {opportunity.examples.map((example) => (
                          <li key={example} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Why participate?"
            subtitle="The benefits of global exchange experiences."
            centered
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-6">
                  <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{benefit.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we support */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="How we support you"
            subtitle="Nexus is designed to support thoughtful preparation, learning, and follow-through where capacity allows."
            centered
          />
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-6 text-center">
                  <span className="numeral mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-semibold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-[var(--ink-900)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader title="Why this matters" centered />
          <div className="grid gap-6 md:grid-cols-2">
            {whyItMatters.map((item, i) => (
              <Reveal key={item.label} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-8">
                  <p className="leading-relaxed text-[var(--ink-700)]">{item.body}</p>
                  <p className="mt-4 font-display font-semibold text-[var(--ink-900)]">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-24">
        <div className="container mx-auto px-4">
          <div
            className="relative overflow-hidden rounded-3xl p-10 text-white sm:p-14"
            style={{
              background:
                'radial-gradient(circle at 80% 20%, rgba(30,66,159,0.4) 0%, transparent 55%), linear-gradient(135deg, var(--ink-deep) 0%, #0a1530 70%, #0f1e4a 100%)',
            }}
          >
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <span className="eyebrow text-white/85">EdLight Nexus</span>
                <h2 className="display-md mt-3 text-white">Interested in Nexus?</h2>
                <p className="mt-3 text-white/90">
                  Learn more about EdLight&apos;s approach to global exposure and exchange, or reach out to continue
                  the conversation.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="mailto:nexus@edlight.org" className="btn btn-light">
                  Contact nexus@edlight.org
                </a>
                <a href="/nexus" className="btn btn-ghost">
                  Visit the Nexus page <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
