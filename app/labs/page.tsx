"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  ExternalLink,
  Lightbulb,
  MonitorSmartphone,
  Palette,
  Rocket,
  Settings,
  Target,
  Terminal,
  Workflow,
  Wrench,
  X,
} from 'lucide-react'
import RequestQuoteForm from '@/components/RequestQuoteForm'
import Reveal from '@/components/Reveal'

type ValueProp = {
  title: string
  description: string
  icon: React.ElementType
}

type Capability = {
  title: string
  description: string
  bullets: string[]
  icon: React.ElementType
}

type Phase = {
  title: string
  description: string
  bullets: string[]
  icon: React.ElementType
}

type PortfolioCategory = 'internal' | 'client' | 'concept'

type CaseStudy = {
  name: string
  description: string
  url?: string
  tag: string
  /** Optional screenshot / hero image for the featured browser-frame layout. */
  screenshot?: string
  /** Optional outcome stats shown on the featured card. */
  stats?: { label: string; value: string }[]
  /** When true (and category matches active tab), this project renders as the large hero card at the top of the grid. */
  featured?: boolean
  category: PortfolioCategory
}

type Differentiator = {
  title: string
  description: string
}

type InvolvementPath = {
  title: string
  description: string
}

const valueProps: ValueProp[] = [
  {
    title: 'Mission-driven by default',
    description:
      'Everything we build is shaped by a commitment to education, equity, and community impact — not just deliverables.',
    icon: Target,
  },
  {
    title: 'Design meets engineering',
    description:
      'Labs brings together strategy, design, and full-stack development so teams get a cohesive experience from concept to launch.',
    icon: Palette,
  },
  {
    title: 'Built to grow with you',
    description:
      'We think beyond launch. Our care plans and support structures are designed to keep platforms evolving alongside your work.',
    icon: Settings,
  },
]

const capabilities: Capability[] = [
  {
    title: 'Website & product design',
    description: 'Responsive interfaces rooted in brand storytelling, accessibility, and clear user journeys.',
    bullets: [
      'Strategy workshops & user journey mapping',
      'High-fidelity UI systems & pattern libraries',
      'CMS setup with custom content models',
    ],
    icon: Palette,
  },
  {
    title: 'Full-stack development',
    description: 'Modern engineering that keeps your platform fast, secure, and future-proof.',
    bullets: [
      'Next.js, React, and TypeScript builds',
      'API integrations, automation, and analytics',
      'Performance, SEO, and accessibility audits',
    ],
    icon: MonitorSmartphone,
  },
  {
    title: 'Care & optimization',
    description: 'Proactive support plans to keep your experiences polished and evolving with your audience.',
    bullets: [
      'Monthly maintenance & uptime monitoring',
      'Content refreshes and new feature rollouts',
      'Training for internal teams & documentation',
    ],
    icon: Wrench,
  },
  {
    title: 'Innovation sprints',
    description: 'Rapid prototyping to explore new digital ideas, validate concepts, and test early with real users.',
    bullets: [
      'Product framing & feasibility validation',
      'Prototype builds with user feedback',
      'Clear next steps and scoped roadmaps',
    ],
    icon: Lightbulb,
  },
]

const processPhases: Phase[] = [
  {
    title: 'Discover',
    description: 'We align on vision, audience, features, and success criteria through structured workshops.',
    bullets: ['Stakeholder interviews & audits', 'Experience blueprint & technical plan', 'Transparent scope & timeline'],
    icon: Compass,
  },
  {
    title: 'Design',
    description: 'We translate insights into brand-aligned visuals, scalable components, and content flows.',
    bullets: ['Moodboards & design system tokens', 'UX/UI prototypes for key journeys', 'Messaging and copy collaboration'],
    icon: Palette,
  },
  {
    title: 'Build',
    description: 'Engineers implement iterative sprints with regular reviews, QA, and performance checkpoints.',
    bullets: ['Headless architecture & integrations', 'Responsive templates & CMS handoff', 'Accessibility + performance testing'],
    icon: Workflow,
  },
  {
    title: 'Launch & Grow',
    description: 'We deploy, train your team, and stay on to expand features as your needs evolve.',
    bullets: ['Launch playbook & training sessions', 'Maintenance roadmap & analytics setup', 'Ongoing support & experimentation'],
    icon: Rocket,
  },
]

const caseStudies: CaseStudy[] = [
  {
    name: 'EdLight Initiative',
    url: 'https://www.edlight.org',
    description:
      'Unified the mission, programs, and fundraising efforts into a storytelling hub with multilingual support.',
    tag: 'Nonprofit platform',
    category: 'internal',
  },
  {
    name: 'EdLight Academy',
    url: 'https://academy.edlight.org',
    description:
      'Learning portal with course categorization, embedded video experiences, and student analytics workflows.',
    tag: 'EdTech platform',
    category: 'internal',
    screenshot: '/EdLight_Academy.webp',
    stats: [
      { value: '3', label: 'languages' },
      { value: '12+', label: 'course tracks' },
      { value: '< 1.5s', label: 'load on 3G' },
    ],
    featured: true,
  },
  {
    name: 'EdLight Nexus',
    url: 'https://www.edlight.org/nexus',
    description:
      'Mobility and exchange site highlighting cohorts, application journeys, and partnership opportunities.',
    tag: 'Program microsite',
    category: 'internal',
  },
  {
    name: 'Nazeefa Ahmed',
    url: 'https://www.nazeefaahmed.com/',
    description:
      'Digital home for a journalist highlighting multimedia storytelling, investigative features, and community coverage.',
    tag: 'Journalism portfolio',
    category: 'client',
  },
  {
    name: 'Le Relief Haiti',
    url: 'https://lereliefhaiti.com',
    description:
      'Independent news platform covering Haitian politics, current affairs, and analysis — bilingual editorial layouts, fast publishing workflow, and reader-first reading experience.',
    tag: 'News & politics',
    category: 'client',
    stats: [
      { value: '2', label: 'languages (EN/FR)' },
      { value: 'Daily', label: 'publishing cadence' },
      { value: '100', label: 'Lighthouse a11y' },
    ],
    featured: true,
  },
  {
    name: 'Rotaract NYC',
    url: 'https://rotaractnyc.org',
    description:
      'Service-club presence for Rotaract New York City — event calendar, member portal, and recruitment funnel.',
    tag: 'Community organization',
    category: 'client',
  },
  {
    name: 'École Dominique Savio',
    description:
      'Concept website for a Haitian school featuring program navigation, faculty profiles, and parent resources.',
    tag: 'Education concept',
    category: 'concept',
    stats: [
      { value: '4', label: 'audience flows' },
      { value: '20+', label: 'sample pages' },
      { value: 'EN/FR', label: 'i18n ready' },
    ],
    featured: true,
  },
  {
    name: 'Nonprofit Starter Layout',
    description:
      'Story-first nonprofit layout optimized for donations, volunteer sign-ups, and impact storytelling.',
    tag: 'Template demo',
    category: 'concept',
  },
]

const portfolioCategories: { key: PortfolioCategory; label: string; description: string }[] = [
  {
    key: 'internal',
    label: 'Internal EdLight platforms',
    description: 'Digital products built and maintained by Labs for EdLight\'s own programs and initiatives.',
  },
  {
    key: 'client',
    label: 'Client work',
    description: 'Platforms and experiences designed and developed for external mission-aligned organizations.',
  },
  {
    key: 'concept',
    label: 'Concepts & demos',
    description: 'Exploratory builds, templates, and in-development prototypes. Not yet deployed for live clients.',
  },
]

const differentiators: Differentiator[] = [
  {
    title: 'Mission-aligned approach',
    description:
      'We build alongside organizations that prioritize education, entrepreneurship, and community impact — because that is our mission too.',
  },
  {
    title: 'Clear process and thoughtful execution',
    description:
      'Structured scopes, honest timelines, and regular communication keep every team aligned from kickoff to launch.',
  },
  {
    title: 'Modern tools with practical delivery',
    description:
      'We use current web technologies — Next.js, TypeScript, headless CMS — without overengineering for the sake of it.',
  },
  {
    title: 'A long-term mindset for growth and maintenance',
    description:
      'Our care plans and support structures are designed to keep platforms healthy and evolving well after launch.',
  },
]

const involvementPaths: InvolvementPath[] = [
  {
    title: 'Organizations',
    description:
      'Launch or refresh your digital presence with a tailored web experience and a long-term maintenance partner.',
  },
  {
    title: 'Students & technologists',
    description:
      'Join Labs projects, gain mentorship, and build a portfolio through real client engagements.',
  },
  {
    title: 'Supporters & partners',
    description:
      'Help fuel technology access, innovation pilots, and digital infrastructure for mission-led communities.',
  },
]

export default function LabsPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | 'all'>('all')

  const openQuoteModal = () => setShowQuoteModal(true)
  const closeQuoteModal = () => setShowQuoteModal(false)

  const filteredStudies =
    activeCategory === 'all'
      ? caseStudies
      : caseStudies.filter((s) => s.category === activeCategory)

  return (
    <div className="bg-[var(--ink-deep)] text-[var(--paper-on-dark)] min-h-screen">
      {/* ─── HERO: Immersive studio shot ─── */}
      <section
       
        className="relative overflow-hidden min-h-[88vh] flex items-stretch border-b border-white/10"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/labs_pics.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        {/* Duotone + scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,11,9,0.7) 0%, rgba(13,11,9,0.5) 40%, rgba(13,11,9,0.85) 100%), radial-gradient(circle at 20% 30%, rgba(30,66,159,0.45), transparent 55%)',
            mixBlendMode: 'multiply',
          }}
        />
        {/* Subtle film grain (no grid on the photo) */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(rgba(232,226,212,0.6) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
          }}
        />

        {/* Status bar (top) */}
        <div className="absolute top-0 inset-x-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-2 flex items-center justify-between text-[10px] sm:text-[11px] eyebrow text-white/70">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LAB · ONLINE
            </span>
            <span className="hidden sm:inline">SECTOR /labs · BUILD 2026.05</span>
            <span>LAT 18.5944° N · LON 72.3074° W</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10 py-24 sm:py-28 w-full flex flex-col justify-end">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <span className="h-px w-10 bg-white/50" aria-hidden="true" />
              <span className="eyebrow text-white text-xs">EdLight Labs · Studio</span>
            </div>
            <h1
              className="display-xl text-white leading-[1.02] mb-6 animate-fade-in"
              style={{ textShadow: '0 1px 30px rgba(0,0,0,0.5)' }}
            >
              Where ideas become<br />
              <span className="italic font-display text-[var(--paper-on-dark)]">working products.</span>
            </h1>
            <p
              className="body-lg text-white/95 max-w-[620px] text-base sm:text-lg leading-relaxed mb-10"
              style={{ textShadow: '0 1px 16px rgba(0,0,0,0.5)' }}
            >
              A design and engineering studio inside the EdLight Initiative. We build websites, platforms,
              and innovation pilots for teams creating meaningful impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
              <button
                type="button"
                onClick={openQuoteModal}
                className="group inline-flex items-center justify-center gap-2 bg-white text-[var(--ink-900)] font-medium px-6 py-3 hover:bg-[var(--paper-100)] transition-colors text-sm sm:text-base"
              >
                Start a project
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <Link
                href="#capabilities"
                className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/5 text-white font-medium px-6 py-3 hover:bg-white/10 hover:border-white/70 transition-colors text-sm sm:text-base backdrop-blur-sm"
              >
                Explore capabilities
              </Link>
            </div>
          </div>
        </div>

        {/* Hero meta strip (bottom edge) */}
        <div className="absolute bottom-0 inset-x-0 z-20 border-t border-white/10 bg-black/40 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { k: 'Projects shipped', v: '12+' },
              { k: 'Internal platforms', v: '5' },
              { k: 'Stack', v: 'Next.js · TS' },
              { k: 'Response', v: '< 48h' },
            ].map((s) => (
              <div key={s.k} className="px-4 py-4 sm:py-5">
                <div className="eyebrow text-white/60 text-[10px] mb-1">{s.k}</div>
                <div className="numeral text-white text-base sm:text-lg font-semibold">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECH STACK STRIP (code.edlight.org-inspired marquee) ─── */}
      <section className="relative border-b border-white/10 bg-black">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-6 sm:py-7">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <span className="eyebrow text-white/55 text-[10px] sm:text-[11px] flex items-center gap-2 shrink-0">
              <span className="text-emerald-400/80">✦</span> Built with
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-x-8 text-sm font-mono-edl text-white/70">
              {[
                'Next.js',
                'TypeScript',
                'React',
                'Tailwind',
                'Node.js',
                'PostgreSQL',
                'Prisma',
                'Vercel',
              ].map((tech) => (
                <span key={tech} className="hover:text-white transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BRIEF / INTRO ─── */}
      <section className="relative border-b border-white/10 bg-[#0a0a0a]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 sm:py-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <Reveal as="div" className="lg:col-span-4" from="left">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-emerald-400/80">✦</span>
                <span className="eyebrow text-[var(--on-dark-faint)] text-[11px]">01 · Brief</span>
              </div>
              <h2 className="display-lg text-white leading-tight">
                Technology for social impact.
              </h2>
            </Reveal>
            <Reveal as="div" className="lg:col-span-7 lg:col-start-6 space-y-6" delay={120}>
              <p className="text-lg sm:text-xl leading-relaxed text-white/90">
                Labs brings together strategy, design, and full-stack engineering to help mission-driven
                teams launch digital experiences that are clear, useful, and built to grow.
              </p>
              <p className="text-base leading-relaxed text-[var(--on-dark-muted)]">
                We work across websites, platforms, product prototypes, and internal innovation initiatives —
                always pairing modern tools with practical delivery.
              </p>
              <div className="grid sm:grid-cols-3 gap-px bg-white/10 border-y border-white/15 mt-10">
                {valueProps.map((vp, vpIdx) => {
                  const Icon = vp.icon
                  return (
                    <Reveal key={vp.title} as="div" delay={200 + vpIdx * 100} className="bg-[#0a0a0a] p-5 sm:p-6">
                      <Icon size={18} className="text-[var(--paper-on-dark)] mb-3" />
                      <h3 className="font-display text-white text-sm font-semibold mb-2">{vp.title}</h3>
                      <p className="text-xs leading-relaxed text-[var(--on-dark-muted)]">{vp.description}</p>
                    </Reveal>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── CAPABILITIES ─── */}
      <section id="capabilities" className="relative border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 sm:py-28">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 sm:mb-16 gap-6">
            <Reveal as="div" className="max-w-xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-emerald-400/80">✦</span>
                <span className="eyebrow text-[var(--on-dark-faint)] text-[11px]">02 · Capabilities</span>
              </div>
              <h2 className="display-lg text-white leading-tight mb-4">What we build.</h2>
              <p className="body-lg text-[var(--on-dark-muted)]">
                From strategy to launch, human-centered platforms that move your mission forward.
              </p>
            </Reveal>
            <div className="hidden sm:flex items-center gap-2 text-[10px] eyebrow text-white/50">
              <Terminal size={14} />
              <span>$ ls ./services</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/15">
            {capabilities.map((capability, idx) => {
              const Icon = capability.icon
              return (
                <Reveal
                  key={capability.title}
                  as="div"
                  delay={idx * 90}
                  className="bg-[#0a0a0a] p-7 sm:p-9 hover:bg-[#0f0f0f] transition-colors group"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex h-11 w-11 items-center justify-center border border-white/15 text-white group-hover:border-white/40 transition-colors">
                      <Icon size={20} />
                    </div>
                    <span className="numeral text-white/30 text-xs">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-display text-white text-xl font-semibold mb-3">{capability.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--on-dark-muted)] mb-5">
                    {capability.description}
                  </p>
                  <ul className="space-y-2.5 border-t border-white/10 pt-5">
                    {capability.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm text-[var(--on-dark-muted)]">
                        <span className="font-mono-edl text-white/40 text-xs mt-0.5">›</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )
            })}
          </div>

          {/* Signature engagement banner */}
          <div className="mt-12 relative overflow-hidden border border-white/15">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 80% 50%, rgba(30,66,159,0.55), transparent 60%), linear-gradient(135deg, #001a4d 0%, #000a1f 100%)',
              }}
            />
            <div className="relative grid lg:grid-cols-2 gap-8 p-8 sm:p-12">
              <div>
                <span className="eyebrow text-white/70 text-[11px]">Signature engagement</span>
                <h3 className="display-md text-white mt-4 mb-4">Impact website accelerator</h3>
                <p className="text-base leading-relaxed text-white/90 max-w-md">
                  A focused sprint pairing brand discovery, user-centered design, and a guided launch playbook.
                  For organizations ready to elevate their digital presence.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 self-end">
                {['Strategy workshop', 'Design system', 'Training & care', 'Launch playbook', 'CMS handoff'].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="eyebrow text-[10px] text-white/85 border border-white/25 px-3 py-1.5"
                    >
                      {chip}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS (terminal aesthetic) ─── */}
      <section className="relative border-b border-white/10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(30,66,159,0.4), transparent 50%)',
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 py-20 sm:py-28">
          <Reveal as="div" className="max-w-2xl mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-emerald-400/80">✦</span>
              <span className="eyebrow text-[var(--on-dark-faint)] text-[11px]">03 · Process</span>
            </div>
            <h2 className="display-lg text-white leading-tight mb-4">
              A collaborative build, strategy to growth.
            </h2>
            <p className="body-lg text-[var(--on-dark-muted)]">
              Our team becomes an extension of yours — structure, clarity, and technical rigor so you can stay
              focused on your mission.
            </p>
          </Reveal>

          {/* Terminal-style process block */}
          <div className="border border-white/15 bg-black/60 backdrop-blur-sm">
            {/* terminal chrome */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <span className="font-mono-edl text-[10px] text-white/40 uppercase tracking-wider">
                edlight-labs / build.sh
              </span>
              <Terminal size={14} className="text-white/40" />
            </div>

            <div className="grid lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {processPhases.map((phase, idx) => {
                const Icon = phase.icon
                return (
                  <div key={phase.title} className="p-7 sm:p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-mono-edl text-emerald-400/80 text-xs">
                        $ phase_{idx + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="border border-white/20 p-2 text-white">
                        <Icon size={18} />
                      </span>
                      <h3 className="font-display text-white text-lg font-semibold">{phase.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--on-dark-muted)] mb-5">
                      {phase.description}
                    </p>
                    <ul className="space-y-2 border-t border-white/10 pt-4">
                      {phase.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-xs text-[var(--on-dark-muted)] font-mono-edl">
                          <span className="text-emerald-400/60">→</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            {/* terminal prompt footer */}
            <div className="border-t border-white/10 px-4 py-3 font-mono-edl text-[11px] text-white/50 flex items-center gap-2">
              <span className="text-emerald-400/80">✓</span>
              <span>build complete — ready to ship</span>
              <span className="ml-auto animate-pulse text-white/40">_</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section id="portfolio" className="relative border-b border-white/10 bg-[#0a0a0a]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 sm:py-28">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-6">
            <Reveal as="div" className="max-w-xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-emerald-400/80">✦</span>
                <span className="eyebrow text-[var(--on-dark-faint)] text-[11px]">04 · Selected work</span>
              </div>
              <h2 className="display-lg text-white leading-tight mb-4">From the studio.</h2>
              <p className="body-lg text-[var(--on-dark-muted)]">
                Live platforms, internal initiatives, and concepts in development.
              </p>
            </Reveal>
          </div>

          {/* Filter tabs */}
          <div className="mb-10 flex flex-wrap gap-2 border-b border-white/10 pb-4">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs eyebrow transition-colors ${
                activeCategory === 'all'
                  ? 'bg-white text-[var(--ink-900)]'
                  : 'border border-white/20 text-white/75 hover:border-white/50 hover:text-white'
              }`}
            >
              All work
            </button>
            {portfolioCategories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 text-xs eyebrow transition-colors ${
                  activeCategory === cat.key
                    ? 'bg-white text-[var(--ink-900)]'
                    : 'border border-white/20 text-white/75 hover:border-white/50 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {activeCategory !== 'all' && (
            <p className="mb-8 text-sm text-[var(--on-dark-faint)] max-w-2xl">
              {portfolioCategories.find((c) => c.key === activeCategory)?.description}
            </p>
          )}

          {(() => {
            // When a discipline tab is active, promote the first `featured` project (or just the first)
            // to a large hero card; the remainder render as the compact 2-col grid below.
            const isDisciplineView = activeCategory !== 'all'
            const featuredProject = isDisciplineView
              ? filteredStudies.find((s) => s.featured) ?? filteredStudies[0]
              : null
            const secondaryProjects = featuredProject
              ? filteredStudies.filter((s) => s !== featuredProject)
              : filteredStudies

            const browserBar = (project: CaseStudy) => {
              const displayUrl = project.url
                ? project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
                : 'preview · not deployed'
              return (
                <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2.5 bg-black/60">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </div>
                  <div className="flex-1 min-w-0 border border-white/10 bg-white/5 px-3 py-1 font-mono-edl text-[11px] text-white/60 truncate">
                    <span className="text-emerald-400/60 mr-1.5">{project.url ? '●' : '○'}</span>
                    {displayUrl}
                  </div>
                  {project.url && (
                    <ArrowUpRight
                      size={14}
                      className="text-white/40 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
                    />
                  )}
                </div>
              )
            }

            const statusBadge = (project: CaseStudy) =>
              project.category === 'concept' ? (
                <span className="eyebrow text-[10px] text-amber-300/80">Demo · Not live</span>
              ) : (
                <span className="eyebrow text-[10px] text-emerald-300/80 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              )

            return (
              <>
                {/* FEATURED HERO CARD (discipline view only) */}
                {featuredProject && (
                  <Reveal as="div" className="mb-6" from="up" distance={32} duration={1000}>
                    {(() => {
                      const project = featuredProject
                      const Inner = (
                        <div className="border border-white/15 bg-black/40 hover:border-white/30 transition-colors group overflow-hidden">
                          {browserBar(project)}
                          <div className="grid lg:grid-cols-5">
                            {/* Preview panel (image or styled mark) */}
                            <div
                              className="relative lg:col-span-3 min-h-[280px] sm:min-h-[360px] lg:min-h-[460px] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10"
                              style={{
                                background: project.screenshot
                                  ? '#000'
                                  : 'radial-gradient(circle at 30% 20%, rgba(30,66,159,0.35), transparent 60%), linear-gradient(135deg, #0d1733 0%, #050505 100%)',
                              }}
                            >
                              {project.screenshot ? (
                                <Image
                                  src={project.screenshot}
                                  alt={`${project.name} preview`}
                                  fill
                                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center p-10">
                                  <div className="text-center">
                                    <div className="font-display text-white/95 text-3xl sm:text-5xl font-semibold leading-tight tracking-tight">
                                      {project.name}
                                    </div>
                                    <div className="mt-4 eyebrow text-white/40 text-[10px]">
                                      ✦ {project.tag}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Meta panel */}
                            <div className="relative lg:col-span-2 p-7 sm:p-9 flex flex-col">
                              <div className="flex items-start justify-between gap-4 mb-5">
                                <span className="eyebrow text-[10px] text-[var(--on-dark-faint)] border border-white/15 px-2.5 py-1">
                                  {project.tag}
                                </span>
                                <span className="eyebrow text-[10px] text-emerald-300/80">Featured</span>
                              </div>
                              <h3 className="font-display text-white text-2xl sm:text-3xl font-semibold mb-3 leading-tight">
                                {project.name}
                              </h3>
                              <p className="text-sm leading-relaxed text-[var(--on-dark-muted)] mb-6">
                                {project.description}
                              </p>

                              {project.stats && project.stats.length > 0 && (
                                <div className="grid grid-cols-3 gap-px bg-white/10 border-y border-white/10 mb-6">
                                  {project.stats.map((stat) => (
                                    <div key={stat.label} className="bg-[#0a0a0a] p-3">
                                      <div className="font-display text-white text-lg sm:text-xl font-semibold leading-none">
                                        {stat.value}
                                      </div>
                                      <div className="eyebrow text-[9px] text-white/55 mt-1.5 leading-tight">
                                        {stat.label}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                                {statusBadge(project)}
                                {project.url ? (
                                  <span className="inline-flex items-center gap-1.5 text-xs eyebrow text-white group-hover:gap-2.5 transition-all">
                                    Visit site <ArrowUpRight size={14} />
                                  </span>
                                ) : (
                                  <span className="text-xs eyebrow text-white/40">In progress</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                      return project.url ? (
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          {Inner}
                        </Link>
                      ) : (
                        Inner
                      )
                    })()}
                  </Reveal>
                )}

                {/* SECONDARY GRID (compact browser tiles) */}
                {secondaryProjects.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-6">
                    {secondaryProjects.map((project, idx) => {
                      const Inner = (
                        <div className="border border-white/15 bg-black/40 hover:border-white/30 transition-colors group overflow-hidden h-full">
                          {browserBar(project)}
                          <div
                            className="relative p-7 sm:p-9 min-h-[260px] flex flex-col"
                            style={{
                              background:
                                'radial-gradient(circle at 80% 20%, rgba(30,66,159,0.15), transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #050505 100%)',
                            }}
                          >
                            <div className="flex items-start justify-between gap-4 mb-5">
                              <span className="eyebrow text-[10px] text-[var(--on-dark-faint)] border border-white/15 px-2.5 py-1">
                                {project.tag}
                              </span>
                              <span className="numeral text-white/25 text-xs">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                            </div>
                            <h3 className="font-display text-white text-xl sm:text-2xl font-semibold mb-3 leading-tight">
                              {project.name}
                            </h3>
                            <p className="text-sm leading-relaxed text-[var(--on-dark-muted)] mb-5 flex-1">
                              {project.description}
                            </p>
                            <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                              {statusBadge(project)}
                              {project.url ? (
                                <span className="inline-flex items-center gap-1.5 text-xs eyebrow text-white group-hover:gap-2.5 transition-all">
                                  Visit site <ArrowUpRight size={14} />
                                </span>
                              ) : (
                                <span className="text-xs eyebrow text-white/40">In progress</span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                      return project.url ? (
                        <Reveal key={project.name} as="div" delay={idx * 100}>
                          <Link
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block h-full"
                          >
                            {Inner}
                          </Link>
                        </Reveal>
                      ) : (
                        <Reveal key={project.name} as="div" delay={idx * 100}>
                          {Inner}
                        </Reveal>
                      )
                    })}
                  </div>
                )}
              </>
            )
          })()}
        </div>
      </section>

      {/* ─── STUDIO PORTRAIT (immersive image break) ─── */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden border-b border-white/10">
        <Image
          src="/edlight_academy_group.webp"
          alt="EdLight Labs in collaboration with students"
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(13,11,9,0.9) 0%, rgba(13,11,9,0.55) 50%, rgba(13,11,9,0.85) 100%)',
          }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10 h-full flex items-center">
          <div className="max-w-2xl">
            <span className="eyebrow text-white/80 text-[11px]">Studio · in practice</span>
            <h2 className="display-lg text-white mt-5 leading-[1.05]" style={{ textShadow: '0 1px 24px rgba(0,0,0,0.5)' }}>
              We build with the<br />communities we serve.
            </h2>
            <p className="body-lg text-white/95 mt-5 max-w-lg" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.5)' }}>
              Designers, engineers, and strategists working alongside students, teachers, and partner
              organizations in Haiti and across the diaspora.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHY LABS ─── */}
      <section className="relative border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 sm:py-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <Reveal as="div" className="lg:col-span-4" from="left">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-emerald-400/80">✦</span>
                <span className="eyebrow text-[var(--on-dark-faint)] text-[11px]">05 · Why Labs</span>
              </div>
              <h2 className="display-lg text-white leading-tight mb-4">Why teams choose us.</h2>
              <p className="body-lg text-[var(--on-dark-muted)]">
                We are designers, engineers, and strategists who care about the impact of what we build.
              </p>
            </Reveal>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-white/10 border border-white/15">
              {differentiators.map((point, idx) => (
                <Reveal key={point.title} as="div" delay={idx * 90} className="bg-[#0a0a0a] p-6 sm:p-7">
                  <span className="numeral text-white/30 text-xs">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-white text-base sm:text-lg font-semibold mt-3 mb-2.5">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--on-dark-muted)]">{point.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── INVOLVEMENT + CONTACT ─── */}
      <section id="contact" className="relative border-b border-white/10 bg-[#0a0a0a]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 sm:py-28">
          <Reveal as="div" className="max-w-xl mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-emerald-400/80">✦</span>
              <span className="eyebrow text-[var(--on-dark-faint)] text-[11px]">06 · Collaborate</span>
            </div>
            <h2 className="display-lg text-white leading-tight mb-4">Ways to get involved.</h2>
            <p className="body-lg text-[var(--on-dark-muted)]">
              Whether you need a platform, ongoing optimization, or an innovation partner — we&apos;re ready.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-px bg-white/10 border border-white/15 mb-12">
            {involvementPaths.map((path, idx) => (
              <Reveal key={path.title} as="div" delay={idx * 110} className="bg-[#0a0a0a] p-7 sm:p-8">
                <span className="numeral text-white/30 text-xs">0{idx + 1}</span>
                <h3 className="font-display text-white text-lg font-semibold mt-3 mb-3">{path.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--on-dark-muted)]">{path.description}</p>
              </Reveal>
            ))}
          </div>

          {/* Contact block */}
          <div className="border border-white/15 bg-black/40 backdrop-blur-sm p-8 sm:p-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:items-center">
              <div>
                <span className="eyebrow text-white/70 text-[11px]">Get in touch</span>
                <a
                  href="mailto:labs@edlight.org"
                  className="block mt-3 font-display text-white text-2xl sm:text-3xl font-semibold hover:text-[var(--paper-on-dark)] transition-colors"
                >
                  labs@edlight.org
                </a>
                <p className="mt-4 text-sm text-[var(--on-dark-muted)] max-w-md leading-relaxed">
                  Share a brief about your project or request a discovery call. We respond within
                  two business days.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <button
                  type="button"
                  onClick={openQuoteModal}
                  className="inline-flex items-center justify-center gap-2 bg-white text-[var(--ink-900)] font-medium px-6 py-3 hover:bg-[var(--paper-100)] transition-colors text-sm"
                >
                  Request a quote
                  <ArrowRight size={16} />
                </button>
                <Link
                  href="#portfolio"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/5 text-white font-medium px-6 py-3 hover:bg-white/10 hover:border-white/60 transition-colors text-sm"
                >
                  View recent work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 30% 50%, rgba(30,66,159,0.5), transparent 60%), linear-gradient(135deg, #001a4d 0%, #000a1f 100%)',
          }}
        />
        {/* Subtle radial dot texture (no grid lines) */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(rgba(232,226,212,0.45) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 py-24 sm:py-32">
          <Reveal>
            <div className="max-w-3xl">
              <span className="eyebrow text-white/75 text-[11px]">EdLight Labs</span>
              <h2 className="display-xl text-white mt-5 mb-6 leading-[1.04]" style={{ textShadow: '0 1px 24px rgba(0,0,0,0.4)' }}>
                Let&apos;s build with purpose.
              </h2>
              <p className="text-lg sm:text-xl text-white/95 max-w-xl leading-relaxed mb-10" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.4)' }}>
                Launching new, improving existing, or exploring a concept — Labs turns ideas into
                thoughtful digital experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={openQuoteModal}
                  className="group inline-flex items-center justify-center gap-2 bg-white text-[var(--ink-900)] font-medium px-6 py-3 hover:bg-[var(--paper-100)] transition-colors text-sm sm:text-base"
                >
                  Start a project brief
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </button>
                <a
                  href="mailto:labs@edlight.org"
                  className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/5 text-white font-medium px-6 py-3 hover:bg-white/10 hover:border-white/70 transition-colors text-sm sm:text-base backdrop-blur-sm"
                >
                  labs@edlight.org
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quote modal */}
      {showQuoteModal && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center px-3 py-8 sm:px-4 sm:py-10"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
            onClick={closeQuoteModal}
          />
          <div className="relative z-[95] w-full max-w-lg bg-white p-5 shadow-2xl sm:max-w-2xl sm:p-6 lg:max-w-3xl lg:p-8 border border-[var(--paper-200)]">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-[var(--accent)] text-[11px]">Website Development Brief</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--ink-900)]">Tell us about your project</h2>
                <p className="mt-1 text-sm text-[var(--ink-700)]">
                  Share your vision and requirements. We&apos;ll schedule a discovery call within 2–3 business days.
                </p>
              </div>
              <button
                type="button"
                onClick={closeQuoteModal}
                className="border border-[var(--paper-200)] p-2 text-[var(--ink-700)] transition hover:border-[var(--paper-300)] hover:text-[var(--ink-900)]"
                aria-label="Close request quote form"
              >
                <X size={18} />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto pr-1 sm:max-h-[75vh] lg:max-h-[80vh]">
              <RequestQuoteForm onSuccess={closeQuoteModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
