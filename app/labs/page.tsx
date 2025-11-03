"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  ExternalLink,
  Lightbulb,
  MonitorSmartphone,
  Palette,
  Rocket,
  Workflow,
  Wrench,
  X,
} from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import RequestQuoteForm from '@/components/RequestQuoteForm'

type Stat = {
  value: string
  label: string
  description: string
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

type CaseStudy = {
  name: string
  description: string
  url?: string
  tag: string
}

type Differentiator = {
  title: string
  description: string
}

type Testimonial = {
  quote: string
  name: string
  role: string
}

type InvolvementPath = {
  title: string
  description: string
}

const stats: Stat[] = [
  {
    value: '25+',
    label: 'Digital builds launched',
    description: 'Websites, portals, and microsites crafted for schools, nonprofits, and startups across Haiti & the diaspora.',
  },
  {
    value: '8 weeks',
    label: 'Average go-live timeline',
    description: 'From discovery workshop to launch for a typical full website engagement with content support.',
  },
  {
    value: '92%',
    label: 'Client retention',
    description: 'Organizations that continue with Labs for maintenance, feature growth, or new product experiments.',
  },
]

const capabilities: Capability[] = [
  {
    title: 'Website & product design',
    description: 'Responsive interfaces rooted in brand storytelling, accessibility, and conversion best practices.',
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
    title: 'Innovation lab sprints',
    description: 'Rapid prototyping to explore new digital ideas, from 3D printing labs to emerging tech pilots.',
    bullets: [
      'Product framing & feasibility validation',
      'Prototype builds with user testing',
      'Launch plans with impact measurement',
    ],
    icon: Lightbulb,
  },
]

const processPhases: Phase[] = [
  {
    title: 'Discover',
    description: 'We facilitate workshops to align on vision, audience, features, and success metrics.',
    bullets: ['Stakeholder interviews & audits', 'Experience blueprint & technical plan', 'Transparent budget & timeline'],
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
    description: 'Engineers implement agile sprints with weekly demos, QA, and performance checkpoints.',
    bullets: ['Headless architecture & integrations', 'Responsive templates & CMS handoff', 'Accessibility + performance testing'],
    icon: Workflow,
  },
  {
    title: 'Launch & Grow',
    description: 'We deploy, train your team, and stay on to expand features as your needs evolve.',
    bullets: ['Launch playbook & training sessions', 'Maintenance roadmap & analytics dashboards', 'Ongoing experimentation & support'],
    icon: Rocket,
  },
]

const caseStudies: CaseStudy[] = [
  {
    name: 'EdLight Initiative',
    url: 'https://edlight.org',
    description: 'Unified the mission, programs, and fundraising efforts into a storytelling hub with multilingual support.',
    tag: 'Nonprofit platform',
  },
  {
    name: 'EdLight Academy',
    url: 'https://academy.edlight.org',
    description: 'Learning portal with course categorization, embedded video experiences, and student analytics workflows.',
    tag: 'EdTech experience',
  },
  {
    name: 'EdLight Nexus',
    url: 'https://edlight.org/nexus',
    description: 'Mobility and exchange site that highlights cohorts, application journeys, and partnership opportunities.',
    tag: 'Program microsite',
  },
  {
    name: 'École Dominique Savio (Demo)',
    description: 'Concept website for a Haitian school with program navigation, faculty features, and parent resources.',
    tag: 'Education demo',
  },
  {
    name: 'Local Nonprofit (Demo)',
    description: 'Story-first nonprofit layout optimized for donations, volunteer sign-ups, and impact storytelling.',
    tag: 'NGO demo',
  },
]

const differentiators: Differentiator[] = [
  {
    title: 'Mission-aligned partnership',
    description: 'We build with organizations that prioritize education, entrepreneurship, and community impact—because that is our mission too.',
  },
  {
    title: 'Transparent pricing & delivery',
    description: 'Clear scopes, flexible payment plans, and honest timelines keep every team aligned from kickoff to launch.',
  },
  {
    title: 'Maintenance that scales',
    description: 'Our care plans blend technical upkeep with growth experiments so your platform stays fresh after launch.',
  },
  {
    title: 'Local talent, global standards',
    description: 'Haitian designers and engineers collaborate with international mentors to deliver world-class quality.',
  },
]

const innovationFocus = [
  'Maker labs introducing 3D printing and fabrication to Haitian classrooms.',
  'Prototype sprint teams tackling challenges in healthcare, education, and climate resilience.',
  'Mentorship pipelines that pair student developers with real-world client projects.',
]

const testimonials: Testimonial[] = [
  {
    quote: 'EdLight Labs translated our ideas into a platform that feels modern, fast, and aligned with our community.',
    name: 'Program Lead',
    role: 'Haitian nonprofit partner',
  },
  {
    quote: 'From design to launch, the Labs team was collaborative, transparent, and focused on impact.',
    name: 'Communications Director',
    role: 'Education network',
  },
  {
    quote: 'Our site went live in under two months and came with training so our team can keep it updated.',
    name: 'Co-founder',
    role: 'Startup client',
  },
]

const involvementPaths: InvolvementPath[] = [
  {
    title: 'Organizations',
    description: 'Launch or refresh your digital presence with a tailored web experience and long-term maintenance partner.',
  },
  {
    title: 'Students & technologists',
    description: 'Join Labs projects, gain mentorship, and build a portfolio through real client engagements.',
  },
  {
    title: 'Supporters & donors',
    description: 'Fuel technology labs, scholarships, and innovation pilots that expand opportunity in Haiti.',
  },
]

export default function LabsPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false)

  const openQuoteModal = () => setShowQuoteModal(true)
  const closeQuoteModal = () => setShowQuoteModal(false)

  return (
    <>
      <Hero
        title="EdLight Labs"
        subtitle="Digital products, websites, and innovation pilots built for mission-led organizations."
        backgroundImage="/labs_pics.png"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button type="button" className="btn btn-primary" onClick={openQuoteModal}>
            Build with Labs <ArrowRight size={18} />
          </button>
          <Link href="#capabilities" className="btn btn-light">
            Explore capabilities
          </Link>
        </div>
      </Hero>

      <section className="bg-gradient-to-b from-slate-50 via-white to-white py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Technology for social impact"
            subtitle="Labs combines design, engineering, and mentorship to help mission-driven teams launch digital experiences that scale their work."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-md transition hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 transition group-hover:opacity-100" />
                <div className="relative z-10 space-y-3">
                  <span className="text-4xl font-bold text-primary">{stat.value}</span>
                  <h3 className="text-lg font-semibold text-text">{stat.label}</h3>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">Signature engagement</p>
              <h3 className="mt-4 font-heading text-2xl font-semibold">Impact website accelerator</h3>
              <p className="mt-4 text-sm text-white/80 leading-relaxed">
                A focused 6–8 week sprint that combines brand discovery, user-centered design, no-surprise development,
                and a guided launch playbook. Ideal for organizations ready to level up their digital presence quickly.
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

      <section className="relative overflow-hidden bg-slate-950 py-20 text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_rgba(15,23,42,0.9))]" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Process</p>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-white">A collaborative build from strategy to growth</h2>
            <p className="mt-4 text-base text-slate-300">
              Our team becomes an extension of yours—bringing structure, clarity, and technical rigor so you can focus on your mission.
            </p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            {processPhases.map((phase) => {
              const Icon = phase.icon
              return (
                <div key={phase.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.5)]">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-white/10 p-2 text-primary">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-white">{phase.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-slate-300">{phase.description}</p>
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

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Innovation inside and outside the classroom"
            subtitle="We experiment with emerging technology to unlock new opportunities for youth, educators, and entrepreneurs."
            centered
          />
          <div className="rounded-3xl border border-primary/10 bg-white p-10 shadow-lg text-gray-700 space-y-5">
            <ul className="space-y-3 text-sm md:text-base">
              {innovationFocus.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 text-primary" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600">
              Labs projects double as learning environments. Students and young professionals gain hands-on experience
              building with real stakeholders while receiving mentorship from design and engineering leads.
            </p>
          </div>
        </div>
      </section>

      <section id="portfolio" className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Case studies & demos"
            subtitle="A snapshot of platforms we’ve launched and concepts currently in exploration."
            centered
          />
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((project) => (
              <div key={project.name} className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
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
                {!project.url && (
                  <p className="relative z-10 mt-4 text-xs font-semibold uppercase tracking-wide text-primary/70">In development</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Why teams choose EdLight Labs"
            subtitle="We’re technologists, storytellers, and community builders who partner for the long haul."
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

      <section className="bg-slate-950 py-20 text-slate-100">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Client & collaborator feedback"
            subtitle="Our partners value clarity, speed, and the way Labs centers impact."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm italic text-slate-200">“{testimonial.quote}”</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary/80">{testimonial.name}</p>
                <p className="text-[11px] uppercase tracking-wide text-slate-400">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Ways to collaborate"
            subtitle="Whether you need a new platform, ongoing optimization, or an innovation partner—we’re ready."
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
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">Let’s talk</p>
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

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/90 via-primary to-primary/90 p-10 text-white shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent)]" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Build with purpose</p>
                <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Let’s launch your next digital leap</h2>
                <p className="mt-3 text-sm md:text-base text-white/80">
                  Tell us what you’re working on and we’ll map the roadmap together—from first sprint to ongoing growth.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="button" className="btn btn-light" onClick={openQuoteModal}>
                  Start a project brief
                </button>
                <a href="mailto:labs@edlight.org" className="btn btn-primary">
                  Email the Labs team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  Share your vision and requirements. We’ll schedule a discovery call within 2-3 business days.
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
