"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Lightbulb,
  MonitorSmartphone,
  Palette,
  Rocket,
  Target,
  Workflow,
  Wrench,
  X,
} from 'lucide-react'
import RequestQuoteForm from '@/components/RequestQuoteForm'
import Reveal from '@/components/Reveal'

type Item = {
  title: string
  description: string
  icon: React.ElementType
}

type Service = Item & { bullets: string[] }

type ProjectGroup = 'edlight' | 'partners'

type Project = {
  name: string
  /** Omitted for work that is not public yet. */
  url?: string
  description: string
  tag: string
  /** Screenshot of the live site, taken from the site itself (public/labs). */
  image: string
  status: 'live' | 'development'
  group: ProjectGroup
}

const valueProps: Item[] = [
  {
    title: 'Mission-driven by default',
    description:
      'Everything we build is shaped by a commitment to education, equity, and community impact, not just deliverables.',
    icon: Target,
  },
  {
    title: 'Design meets engineering',
    description:
      'Strategy, design, and full-stack development under one roof, so teams get one cohesive product from concept to launch.',
    icon: Palette,
  },
  {
    title: 'Built to grow with you',
    description: 'We plan past launch, with support that keeps a platform evolving alongside your work.',
    icon: Wrench,
  },
]

const services: Service[] = [
  {
    title: 'Websites & product design',
    description: 'Responsive interfaces rooted in your story, accessibility, and clear user journeys.',
    bullets: ['Strategy and user journey mapping', 'UI design systems', 'Content management your team can run'],
    icon: Palette,
  },
  {
    title: 'Web & mobile apps',
    description: 'Modern engineering that keeps your platform fast, secure, and easy to extend.',
    bullets: ['Next.js, React, and TypeScript', 'React Native mobile apps', 'Payments, auth, and integrations'],
    icon: MonitorSmartphone,
  },
  {
    title: 'Care & optimization',
    description: 'Ongoing support so your site keeps pace with your audience after launch.',
    bullets: ['Maintenance and monitoring', 'Performance, SEO, and accessibility work', 'Training and documentation'],
    icon: Wrench,
  },
  {
    title: 'Prototypes & pilots',
    description: 'Rapid builds to test a new idea with real users before committing to it.',
    bullets: ['Product framing and feasibility', 'Prototype builds with user feedback', 'A scoped roadmap for what comes next'],
    icon: Lightbulb,
  },
]

const processPhases: Service[] = [
  {
    title: 'Discover',
    description: 'We align on goals, audience, features, and what success looks like.',
    bullets: ['Stakeholder interviews', 'Technical plan', 'Clear scope and timeline'],
    icon: Compass,
  },
  {
    title: 'Design',
    description: 'We turn what we learned into visuals, components, and content flows.',
    bullets: ['Design system', 'Prototypes of key journeys', 'Copy and content'],
    icon: Palette,
  },
  {
    title: 'Build',
    description: 'We build in short cycles with regular reviews and testing.',
    bullets: ['Responsive build', 'Integrations', 'Accessibility and performance checks'],
    icon: Workflow,
  },
  {
    title: 'Launch & grow',
    description: 'We ship, train your team, and stay on as your needs change.',
    bullets: ['Launch and handoff', 'Analytics setup', 'Ongoing improvements'],
    icon: Rocket,
  },
]

// Only work we can point to. Every entry links to a live site (or, for Nexus,
// a page that says plainly it is in development), and nothing carries a
// statistic we cannot show the source for.
const projects: Project[] = [
  {
    name: 'EdLight Initiative',
    url: 'https://www.edlight.org',
    description:
      'This site: our programmes, donations, the store, and enrolment, in English and French.',
    tag: 'Nonprofit website',
    image: '/labs/edlight.webp',
    status: 'live',
    group: 'edlight',
  },
  {
    name: 'EdLight Academy',
    url: 'https://academy.edlight.org',
    description:
      'Free, bilingual courses for Haitian secondary students: video lessons, quizzes, and more than 500 official past exam papers.',
    tag: 'Learning platform',
    image: '/labs/academy.webp',
    status: 'live',
    group: 'edlight',
  },
  {
    name: 'EdLight Code',
    url: 'https://code.edlight.org',
    description:
      'Self-guided courses in Python, SQL, R, Excel, and web development, run in the browser, with verifiable certificates.',
    tag: 'Coding platform',
    image: '/labs/code.webp',
    status: 'live',
    group: 'edlight',
  },
  {
    name: 'EdLight Nexus',
    url: '/nexus',
    description: 'A global learning and exchange programme for Haitian students, now being designed.',
    tag: 'Programme site',
    image: '/nexus_pic.webp',
    status: 'development',
    group: 'edlight',
  },
  {
    name: 'Tikèm',
    url: 'https://www.tikem.co',
    description:
      'Ticketing for Haitian events in Haiti and the diaspora: find events, buy tickets, and check in with QR codes. Web app, with a mobile app in beta.',
    tag: 'Event ticketing',
    image: '/labs/tikem.webp',
    status: 'live',
    group: 'partners',
  },
  {
    name: 'Rotaract Club at the UN, NYC',
    url: 'https://rotaractnyc.org',
    description:
      'Website for a New York service club of young professionals: events, news, gallery, donations, and a member login.',
    tag: 'Community organization',
    image: '/labs/rotaract.webp',
    status: 'live',
    group: 'partners',
  },
  {
    name: 'Nazeefa Ahmed',
    url: 'https://www.nazeefaahmed.com/',
    description: 'Portfolio for a New York multimedia business reporter: on-camera work, articles, and contact.',
    tag: 'Journalist portfolio',
    image: '/labs/nazeefa.webp',
    status: 'live',
    group: 'partners',
  },
]

const projectGroups: { key: ProjectGroup; title: string; description: string }[] = [
  {
    key: 'edlight',
    title: 'EdLight platforms',
    description: 'The products behind EdLight’s own programmes.',
  },
  {
    key: 'partners',
    title: 'Products & client work',
    description: 'Built by Labs for founders and mission-aligned organizations.',
  },
]

const stack = ['Next.js', 'TypeScript', 'React', 'React Native', 'Tailwind', 'Firebase', 'Stripe', 'Vercel']

const differentiators = [
  {
    title: 'Mission-aligned',
    description:
      'We work with organizations that put education, entrepreneurship, and community first, because that is our mission too.',
  },
  {
    title: 'Clear process',
    description: 'Defined scopes, honest timelines, and regular check-ins from kickoff to launch.',
  },
  {
    title: 'Modern, practical tools',
    description: 'Current web technology without overengineering for its own sake.',
  },
  {
    title: 'In it for the long run',
    description: 'We keep platforms healthy and improving well after launch.',
  },
]

const involvementPaths = [
  {
    title: 'Organizations',
    description: 'Launch or refresh your digital presence with a tailored build and a long-term partner.',
  },
  {
    title: 'Students & technologists',
    description: 'Join Labs projects, get mentorship, and build a portfolio on real work.',
  },
  {
    title: 'Supporters & partners',
    description: 'Help fund technology access and digital infrastructure for mission-led communities.',
  },
]

const primaryButton =
  'group inline-flex items-center justify-center gap-2 bg-white text-[var(--ink-900)] font-medium px-6 py-3 hover:bg-[var(--paper-100)] transition-colors text-sm sm:text-base'
const secondaryButton =
  'inline-flex items-center justify-center gap-2 border border-white/40 bg-white/5 text-white font-medium px-6 py-3 hover:bg-white/10 hover:border-white/70 transition-colors text-sm sm:text-base'

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-emerald-400/80">✦</span>
      <span className="eyebrow text-[var(--on-dark-faint)] text-[11px]">
        {index} · {children}
      </span>
    </div>
  )
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const external = project.url?.startsWith('http')
  const displayUrl = project.url
    ? project.url.startsWith('/')
      ? `edlight.org${project.url}`
      : project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
    : null

  const card = (
    <article className="group h-full flex flex-col border border-white/15 bg-black/40 hover:border-white/35 transition-colors overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-black">
        <Image
          src={project.image}
          alt={`${project.name} website`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
        />
      </div>
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="eyebrow text-[10px] text-[var(--on-dark-faint)] border border-white/15 px-2.5 py-1">
            {project.tag}
          </span>
          {project.status === 'live' ? (
            <span className="eyebrow text-[10px] text-emerald-300/90 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live
            </span>
          ) : (
            <span className="eyebrow text-[10px] text-amber-300/90">In development</span>
          )}
        </div>
        <h3 className="font-display text-white text-xl font-semibold mb-2 leading-tight">{project.name}</h3>
        <p className="text-sm leading-relaxed text-[var(--on-dark-muted)] mb-5 flex-1">{project.description}</p>
        {displayUrl && (
          <span className="inline-flex items-center gap-1.5 font-mono-edl text-xs text-white/70 group-hover:text-white transition-colors">
            {displayUrl}
            <ArrowUpRight size={13} />
          </span>
        )}
      </div>
    </article>
  )

  return (
    <Reveal as="div" delay={delay} className="h-full">
      {project.url ? (
        <Link
          href={project.url}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="block h-full"
        >
          {card}
        </Link>
      ) : (
        card
      )}
    </Reveal>
  )
}

export default function LabsPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const openQuoteModal = () => setShowQuoteModal(true)
  const closeQuoteModal = () => setShowQuoteModal(false)

  return (
    <div className="bg-[var(--ink-deep)] text-[var(--paper-on-dark)] min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-stretch border-b border-white/10">
        <div className="absolute inset-0">
          <Image src="/labs_pics.webp" alt="" fill priority className="object-cover object-center" />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,11,9,0.7) 0%, rgba(13,11,9,0.5) 40%, rgba(13,11,9,0.88) 100%), radial-gradient(circle at 20% 30%, rgba(30,66,159,0.45), transparent 55%)',
            mixBlendMode: 'multiply',
          }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10 py-24 sm:py-28 w-full flex flex-col justify-end">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <span className="h-px w-10 bg-white/50" aria-hidden="true" />
              <span className="eyebrow text-white text-xs">EdLight Labs</span>
            </div>
            <h1
              className="display-xl text-white leading-[1.02] mb-6 animate-fade-in"
              style={{ textShadow: '0 1px 30px rgba(0,0,0,0.5)' }}
            >
              Where ideas become
              <br />
              <span className="italic font-display text-[var(--paper-on-dark)]">working products.</span>
            </h1>
            <p
              className="body-lg text-white/95 max-w-[620px] text-base sm:text-lg leading-relaxed mb-10"
              style={{ textShadow: '0 1px 16px rgba(0,0,0,0.5)' }}
            >
              The design and engineering team inside EdLight Initiative. We build the platforms behind our own
              programmes, and websites and apps for teams creating meaningful impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
              <button type="button" onClick={openQuoteModal} className={primaryButton}>
                Start a project
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <Link href="#work" className={`${secondaryButton} backdrop-blur-sm`}>
                See our work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STACK ─── */}
      <section className="border-b border-white/10 bg-black">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <span className="eyebrow text-white/55 text-[10px] sm:text-[11px] flex items-center gap-2 shrink-0">
            <span className="text-emerald-400/80">✦</span> Built with
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-x-8 text-sm font-mono-edl text-white/70">
            {stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="border-b border-white/10 bg-[#0a0a0a]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 sm:py-28 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal as="div" className="lg:col-span-4" from="left">
            <SectionLabel index="01">About</SectionLabel>
            <h2 className="display-lg text-white leading-tight">Technology for social impact.</h2>
          </Reveal>
          <Reveal as="div" className="lg:col-span-7 lg:col-start-6 space-y-6" delay={120}>
            <p className="text-lg sm:text-xl leading-relaxed text-white/90">
              Labs brings together strategy, design, and full-stack engineering to help mission-driven teams launch
              digital products that are clear, useful, and built to grow.
            </p>
            <div className="grid sm:grid-cols-3 gap-px bg-white/10 border-y border-white/15 mt-10">
              {valueProps.map((vp, i) => {
                const Icon = vp.icon
                return (
                  <Reveal key={vp.title} as="div" delay={200 + i * 100} className="bg-[#0a0a0a] p-5 sm:p-6">
                    <Icon size={18} className="text-[var(--paper-on-dark)] mb-3" />
                    <h3 className="font-display text-white text-sm font-semibold mb-2">{vp.title}</h3>
                    <p className="text-xs leading-relaxed text-[var(--on-dark-muted)]">{vp.description}</p>
                  </Reveal>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── WORK ─── */}
      <section id="work" className="border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 sm:py-28">
          <Reveal as="div" className="max-w-xl mb-14">
            <SectionLabel index="02">Our work</SectionLabel>
            <h2 className="display-lg text-white leading-tight mb-4">What we’ve built.</h2>
            <p className="body-lg text-[var(--on-dark-muted)]">Live platforms you can visit today.</p>
          </Reveal>

          {projectGroups.map((group) => {
            const items = projects.filter((p) => p.group === group.key)
            // Four cards in a three-column grid strands one on its own row.
            const columns = items.length === 4 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
            return (
            <div key={group.key} className="mb-16 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 border-b border-white/10 pb-3 mb-8">
                <h3 className="font-display text-white text-2xl font-semibold">{group.title}</h3>
                <p className="text-sm text-[var(--on-dark-faint)]">{group.description}</p>
              </div>
              <div className={`grid sm:grid-cols-2 ${columns} gap-6`}>
                {items.map((project, i) => (
                  <ProjectCard key={project.name} project={project} delay={i * 90} />
                ))}
              </div>
            </div>
            )
          })}
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="border-b border-white/10 bg-[#0a0a0a]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 sm:py-28">
          <Reveal as="div" className="max-w-xl mb-12 sm:mb-16">
            <SectionLabel index="03">Services</SectionLabel>
            <h2 className="display-lg text-white leading-tight mb-4">What we can build for you.</h2>
            <p className="body-lg text-[var(--on-dark-muted)]">
              From strategy to launch, products that move your mission forward.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/15">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <Reveal key={service.title} as="div" delay={i * 90} className="bg-[#0a0a0a] p-7 sm:p-9">
                  <div className="flex h-11 w-11 items-center justify-center border border-white/15 text-white mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-white text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--on-dark-muted)] mb-5">{service.description}</p>
                  <ul className="space-y-2.5 border-t border-white/10 pt-5">
                    {service.bullets.map((bullet) => (
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
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 sm:py-28">
          <Reveal as="div" className="max-w-2xl mb-14">
            <SectionLabel index="04">Process</SectionLabel>
            <h2 className="display-lg text-white leading-tight mb-4">How we work.</h2>
            <p className="body-lg text-[var(--on-dark-muted)]">
              We work as an extension of your team, with structure and technical rigor so you can stay focused on
              your mission.
            </p>
          </Reveal>

          <ol className="grid lg:grid-cols-4 gap-px bg-white/10 border border-white/15">
            {processPhases.map((phase, i) => {
              const Icon = phase.icon
              return (
                <li key={phase.title} className="bg-[var(--ink-deep)] p-7 sm:p-8">
                  <span className="font-mono-edl text-emerald-400/80 text-xs">0{i + 1}</span>
                  <div className="flex items-center gap-3 mt-4 mb-4">
                    <span className="border border-white/20 p-2 text-white">
                      <Icon size={18} />
                    </span>
                    <h3 className="font-display text-white text-lg font-semibold">{phase.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--on-dark-muted)] mb-5">{phase.description}</p>
                  <ul className="space-y-2 border-t border-white/10 pt-4">
                    {phase.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-xs text-[var(--on-dark-muted)]">
                        <span className="text-emerald-400/60">→</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ─── WHY LABS ─── */}
      <section className="border-b border-white/10 bg-[#0a0a0a]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 sm:py-28 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal as="div" className="lg:col-span-4" from="left">
            <SectionLabel index="05">Why Labs</SectionLabel>
            <h2 className="display-lg text-white leading-tight mb-4">Why teams choose us.</h2>
            <p className="body-lg text-[var(--on-dark-muted)]">
              Designers and engineers who care about the impact of what we build.
            </p>
          </Reveal>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-white/10 border border-white/15">
            {differentiators.map((point, i) => (
              <Reveal key={point.title} as="div" delay={i * 90} className="bg-[#0a0a0a] p-6 sm:p-7">
                <h3 className="font-display text-white text-base sm:text-lg font-semibold mb-2.5">{point.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--on-dark-muted)]">{point.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GET INVOLVED + CONTACT ─── */}
      <section id="contact" className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 30% 40%, rgba(30,66,159,0.5), transparent 60%), linear-gradient(135deg, #001a4d 0%, #000a1f 100%)',
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 py-20 sm:py-28">
          <Reveal as="div" className="max-w-2xl mb-12">
            <SectionLabel index="06">Work with us</SectionLabel>
            <h2 className="display-xl text-white leading-[1.04] mb-5">Let’s build with purpose.</h2>
            <p className="text-lg text-white/90 max-w-xl leading-relaxed">
              Launching something new, improving what you have, or testing an idea, Labs can help.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-px bg-white/15 border border-white/20 mb-12">
            {involvementPaths.map((path) => (
              <div key={path.title} className="bg-[#000a1f]/80 p-7 sm:p-8">
                <h3 className="font-display text-white text-lg font-semibold mb-3">{path.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--on-dark-muted)]">{path.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <button type="button" onClick={openQuoteModal} className={primaryButton}>
              Start a project brief
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a href="mailto:labs@edlight.org" className={secondaryButton}>
              labs@edlight.org
            </a>
          </div>
        </div>
      </section>

      {showQuoteModal && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center px-3 py-8 sm:px-4 sm:py-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="labs-quote-title"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" onClick={closeQuoteModal} />
          <div className="relative z-[95] w-full max-w-lg bg-white p-5 shadow-2xl sm:max-w-2xl sm:p-6 lg:max-w-3xl lg:p-8 border border-[var(--paper-200)]">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-[var(--accent)] text-[11px]">Project brief</p>
                <h2 id="labs-quote-title" className="mt-2 font-display text-2xl font-semibold text-[var(--ink-900)]">
                  Tell us about your project
                </h2>
                <p className="mt-1 text-sm text-[var(--ink-700)]">
                  Share your goals and we&apos;ll get back to you to set up a discovery call.
                </p>
              </div>
              <button
                type="button"
                onClick={closeQuoteModal}
                className="border border-[var(--paper-200)] p-2 text-[var(--ink-700)] transition hover:border-[var(--paper-300)] hover:text-[var(--ink-900)]"
                aria-label="Close project brief form"
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
