"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Compass,
  ExternalLink,
  Lightbulb,
  MonitorSmartphone,
  Palette,
  Rocket,
  Settings,
  Target,
  Workflow,
  Wrench,
  X,
} from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import RequestQuoteForm from '@/components/RequestQuoteForm'

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
    url: 'https://edlight.org',
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
  },
  {
    name: 'EdLight Nexus',
    url: 'https://edlight.org/nexus',
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
    name: 'École Dominique Savio',
    description:
      'Concept website for a Haitian school featuring program navigation, faculty profiles, and parent resources.',
    tag: 'Education concept',
    category: 'concept',
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
    <>
      <Hero
        title="EdLight Labs"
        subtitle="Digital products, websites, and innovation pilots built for mission-led organizations."
        backgroundImage="/labs_pics.webp"
      >
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-white/95 leading-relaxed">
          EdLight Labs is the digital product and innovation arm of EdLight. We design and build thoughtful digital
          experiences for organizations, initiatives, and communities working to create meaningful impact.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button type="button" className="btn btn-primary" onClick={openQuoteModal}>
            Build with Labs <ArrowRight size={18} />
          </button>
          <Link href="#capabilities" className="btn btn-light">
            Explore capabilities
          </Link>
        </div>
      </Hero>

      {/* Value propositions */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-white py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Technology for social impact"
            subtitle="Labs brings together strategy, design, engineering, and applied learning to help mission-driven teams launch digital experiences that are clear, useful, and built to grow. Our work spans websites, platforms, product prototypes, and internal innovation initiatives."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {valueProps.map((vp) => {
              const Icon = vp.icon
              return (
                <div
                  key={vp.title}
                  className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-md transition hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 transition group-hover:opacity-100" />
                  <div className="relative z-10 space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-text">{vp.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{vp.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <SectionHeader
                title="What we build"
                subtitle="From strategy to launch, Labs crafts human-centered platforms that move your mission forward."
              />
              <div className="grid gap-6 sm:grid-cols-2">
                {capabilities.map((capability) => {
                  const Icon = capability.icon
                  return (
                    <div key={capability.title} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-text">{capability.title}</h3>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{capability.description}</p>
                      <ul className="mt-4 space-y-2 text-sm text-gray-600">
                        {capability.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2">
                            <ArrowRight size={14} className="mt-1 text-primary" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/95 via-primary/85 to-primary p-8 text-white shadow-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/85">Signature engagement</p>
              <h3 className="mt-4 font-heading text-2xl font-semibold">Impact website accelerator</h3>
              <p className="mt-4 text-sm text-white/95 leading-relaxed">
                A focused sprint that combines brand discovery, user-centered design, and a guided launch playbook.
                Ideal for organizations ready to establish or significantly elevate their digital presence.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide">
                <span className="rounded-full bg-white/15 px-3 py-1">Strategy workshop</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Design system</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Training & care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_rgba(15,23,42,0.9))]" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-100">Process</p>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-white">
              A collaborative build from strategy to growth
            </h2>
            <p className="mt-4 text-base text-slate-100">
              Our team becomes an extension of yours — bringing structure, clarity, and technical rigor so you can stay
              focused on your mission.
            </p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            {processPhases.map((phase) => {
              const Icon = phase.icon
              return (
                <div
                  key={phase.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.5)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-white/10 p-2 text-primary">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-white">{phase.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-slate-100">{phase.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-200/80">
                    {phase.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <ArrowRight size={14} className="mt-1 text-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Selected work"
            subtitle="A snapshot of live platforms, internal initiatives, and concepts in development."
            centered
          />

          {/* Category filter tabs */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeCategory === 'all'
                  ? 'bg-primary text-white shadow-md'
                  : 'border border-primary/20 bg-white text-gray-600 hover:border-primary/40'
              }`}
            >
              All work
            </button>
            {portfolioCategories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  activeCategory === cat.key
                    ? 'bg-primary text-white shadow-md'
                    : 'border border-primary/20 bg-white text-gray-600 hover:border-primary/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active category description */}
          {activeCategory !== 'all' && (
            <p className="mb-8 text-center text-sm text-gray-500">
              {portfolioCategories.find((c) => c.key === activeCategory)?.description}
            </p>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {filteredStudies.map((project) => (
              <div
                key={project.name}
                className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 transition group-hover:opacity-100" />
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">{project.tag}</p>
                    <h3 className="mt-2 font-heading text-lg font-semibold text-text">{project.name}</h3>
                  </div>
                  {project.url && (
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary text-sm font-semibold"
                    >
                      Visit <ExternalLink size={14} />
                    </Link>
                  )}
                </div>
                <p className="relative z-10 mt-3 text-sm text-gray-600 leading-relaxed">{project.description}</p>
                {project.category === 'concept' && (
                  <p className="relative z-10 mt-4 text-xs font-semibold uppercase tracking-wide text-amber-600/80">
                    Demo · Not a live client project
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Labs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Why teams work with EdLight Labs"
            subtitle="We are designers, engineers, and strategists who care about the impact of what we build."
            centered
          />
          <div className="grid gap-6 md:grid-cols-2">
            {differentiators.map((point) => (
              <div key={point.title} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-text">{point.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Collaborate */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Ways to get involved"
            subtitle="Whether you need a new platform, ongoing optimization, or an innovation partner — we are ready to explore."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {involvementPaths.map((path) => (
              <div key={path.title} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-text">{path.title}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{path.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-3xl border border-primary/10 bg-white p-8 shadow-lg text-gray-700">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">Get in touch</p>
                <h3 className="mt-2 text-lg font-semibold text-text">labs@edlight.org</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Share a brief about your project or request a discovery call. We respond within two business days.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="button" className="btn btn-primary" onClick={openQuoteModal}>
                  Request a quote
                </button>
                <Link href="#portfolio" className="btn btn-light">
                  View recent work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/90 via-primary to-primary/90 p-10 text-white shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent)]" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/90">EdLight Labs</p>
                <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Let&apos;s build with purpose</h2>
                <p className="mt-3 text-sm md:text-base text-white/95 max-w-lg">
                  Whether you are launching a new platform, improving an existing one, or exploring an early concept,
                  EdLight Labs helps turn ideas into thoughtful digital experiences.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="button" className="btn btn-light" onClick={openQuoteModal}>
                  Start a project brief
                </button>
                <a href="mailto:labs@edlight.org" className="btn btn-primary">
                  Contact labs@edlight.org
                </a>
              </div>
            </div>
          </div>
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
            className="absolute inset-0 bg-black/60"
            aria-hidden="true"
            onClick={closeQuoteModal}
          />
          <div className="relative z-[95] w-full max-w-lg rounded-3xl bg-white p-5 shadow-2xl sm:max-w-2xl sm:p-6 lg:max-w-3xl lg:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Website Development Brief</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-gray-900">Tell us about your project</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Share your vision and requirements. We will schedule a discovery call within 2–3 business days.
                </p>
              </div>
              <button
                type="button"
                onClick={closeQuoteModal}
                className="rounded-full border border-gray-200 p-2 text-gray-500 transition hover:border-gray-300 hover:text-gray-700"
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
    </>
  )
}
