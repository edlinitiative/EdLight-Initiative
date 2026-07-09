import React from 'react'
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  CheckCircle2,
  Code2,
  Database,
  Globe2,
  GraduationCap,
  Laptop,
  Link2,
  Sparkles,
  Terminal,
} from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Reveal from '@/components/Reveal'

type Stat = {
  value: string
  label: string
  description: string
}

type Track = {
  title: string
  description: string
  courses: string
  hours: string
  icon: React.ElementType
}

type Step = {
  number: string
  title: string
  description: string
}

type Project = {
  title: string
  level: string
  description: string
  tags: string[]
  hours: string
}

const stats: Stat[] = [
  {
    value: '6+',
    label: 'Learning tracks',
    description: 'SQL, Python, HTML, CSS, JavaScript, Terminal & Git — with more on the way.',
  },
  {
    value: '100%',
    label: 'Free & browser-based',
    description: 'No downloads, no setup. Write real code directly in your browser from any device.',
  },
  {
    value: '✓',
    label: 'Verifiable certificates',
    description: 'Complete a track and earn a certificate with a unique verification link employers can check instantly.',
  },
]

const tracks: Track[] = [
  {
    title: 'SQL Track',
    description: 'Master database querying from basics to advanced analytics. Learn to extract insights from data.',
    courses: '6 courses',
    hours: '~60 h',
    icon: Database,
  },
  {
    title: 'Python Track',
    description: 'Learn Python programming from scratch. From variables and functions to pandas DataFrames.',
    courses: '7 courses',
    hours: '~55 h',
    icon: Code2,
  },
  {
    title: 'Terminal & Git',
    description: 'Master the command line, Git fundamentals, and professional collaboration workflows with GitHub.',
    courses: '3 courses',
    hours: '~9 h',
    icon: Terminal,
  },
  {
    title: 'HTML Track',
    description: 'Build semantic, accessible, and search-optimized web pages from the ground up.',
    courses: '3 courses',
    hours: '~12 h',
    icon: Globe2,
  },
  {
    title: 'CSS Track',
    description: 'From selectors and the box model through Flexbox, Grid layouts, responsive design, and animations.',
    courses: '3 courses',
    hours: '~14 h',
    icon: Laptop,
  },
  {
    title: 'JavaScript Track',
    description: 'Master JavaScript from fundamentals through DOM manipulation, events, async/await, and advanced patterns.',
    courses: '3 courses',
    hours: '~14 h',
    icon: Sparkles,
  },
]

const howItWorks: Step[] = [
  {
    number: '01',
    title: 'Pick a track',
    description:
      'Choose from Python, SQL, HTML, CSS, JavaScript, Terminal & Git, and more. Start from the beginning or jump to what you need.',
  },
  {
    number: '02',
    title: 'Learn with lessons & labs',
    description:
      'Read bite-sized lessons, then practice with hands-on coding exercises directly in your browser — no setup required.',
  },
  {
    number: '03',
    title: 'Earn a certificate',
    description:
      'Complete a track and get a verifiable certificate. Share it on LinkedIn or let employers verify it in seconds.',
  },
]

const projects: Project[] = [
  {
    title: 'Build Your Personal Portfolio',
    level: 'Intermediate',
    description:
      'Create a professional portfolio website from scratch using HTML, CSS, and JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    hours: '~8 h',
  },
  {
    title: 'SQL: Analyze Sales Data',
    level: 'Beginner',
    description:
      'Query customers, orders, and products to uncover business insights using SELECT, JOIN, and GROUP BY.',
    tags: ['SQL', 'Data Analysis'],
    hours: '~3 h',
  },
  {
    title: 'Python: Automate Expense Reports',
    level: 'Beginner',
    description:
      'Filter, aggregate, and generate reports from real-world expense data using Python.',
    tags: ['Python', 'Automation'],
    hours: '~3 h',
  },
  {
    title: 'Interactive Quiz App',
    level: 'Intermediate',
    description:
      'Build a fully functional quiz application with scoring, timers, and results using JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    hours: '~5 h',
  },
]

const lessonFeatures = [
  {
    title: 'Bite-sized lessons',
    description: 'Focused readings you can finish in 5-10 minutes. No fluff, just the concepts you need.',
    icon: BookOpenCheck,
  },
  {
    title: 'Hands-on exercises',
    description: 'Practice coding directly in your browser after every lesson. No setup, no downloads.',
    icon: Code2,
  },
  {
    title: 'Works on any device',
    description: 'Mobile-friendly and browser-based. Learn on a phone, tablet, or laptop — wherever you are.',
    icon: Laptop,
  },
  {
    title: 'Multilingual support',
    description: 'Available in English, French, and Haitian Creole so you can learn in the language you think in.',
    icon: GraduationCap,
  },
]

const certFeatures = [
  {
    title: 'Unique verification link',
    description: 'Each certificate has a unique URL that anyone can visit to verify authenticity.',
    icon: Link2,
  },
  {
    title: 'Instant employer verification',
    description: 'Employers can verify your certificate in seconds — no login required.',
    icon: CheckCircle2,
  },
  {
    title: 'Shareable credentials',
    description: 'Add your certificate to LinkedIn or share the verification link directly.',
    icon: Award,
  },
]

function IconBadge({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
      <Icon size={22} />
    </div>
  )
}

export default function CodePage() {
  return (
    <>
      <Hero
        eyebrow="EdLight Ecosystem · Learn to Code"
        title="EdLight Code"
        subtitle="The skills you need. The portfolio to prove it. Master Python, SQL, Web Development, and more through guided, hands-on courses — all in your browser."
        backgroundImage="/edlight_academy_group.webp"
        meta={[
          { label: 'Learning tracks', value: '6+' },
          { label: 'Cost', value: 'Free' },
          { label: 'Certificates', value: 'Verifiable' },
          { label: 'Setup', value: 'None' },
        ]}
      >
        <a
          href="https://code.edlight.org/tracks"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Start learning free <ArrowRight size={18} />
        </a>
        <a
          href="https://code.edlight.org/tracks"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Explore tracks
        </a>
      </Hero>

      {/* Stats */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Learn by doing, not watching"
            subtitle="EdLight Code turns lessons into real-world skills. Every lesson is a focused reading followed by a hands-on coding exercise — no video lectures, just learn at your own pace and write real code."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-8 transition-shadow hover:shadow-md">
                  <span className="numeral text-4xl font-bold text-[var(--accent)]">{stat.value}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-[var(--ink-900)]">{stat.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{stat.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="From zero to certified in three steps"
            subtitle="No complicated setup. No long lectures. Just learn, practice, and prove your skills."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((step, i) => (
              <Reveal key={step.number} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-8 transition-shadow hover:shadow-md">
                  <span className="numeral text-5xl font-bold text-[var(--accent-soft)]">{step.number}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-[var(--ink-900)]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-700)]">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks — dark editorial band */}
      <section
        className="relative overflow-hidden py-16 sm:py-20 md:py-24 text-white"
        style={{
          background:
            'radial-gradient(circle at 85% 20%, rgba(30,66,159,0.35) 0%, transparent 55%), linear-gradient(135deg, var(--ink-deep) 0%, #0a1530 70%, #0f1e4a 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage: 'radial-gradient(rgba(232,226,212,0.6) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
          }}
          aria-hidden="true"
        />
        <div className="container relative mx-auto px-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-white/40" aria-hidden="true" />
              <span className="eyebrow text-white/85">Tracks</span>
            </div>
            <h2 className="display-lg text-white">Structured paths from beginner to advanced</h2>
            <p className="body-lg mt-4 text-white/90">
              Pick your language and start learning. Each track takes you from the fundamentals to job-ready skills.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track, i) => {
              const Icon = track.icon
              return (
                <Reveal key={track.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--accent-soft)]">
                        <Icon size={22} />
                      </span>
                      <h3 className="font-display text-lg font-semibold text-white">{track.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/80">{track.description}</p>
                    <div className="mt-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-white/70">
                      <span className="rounded-full bg-white/10 px-3 py-1">{track.courses}</span>
                      <span className="rounded-full bg-white/10 px-3 py-1">{track.hours}</span>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://code.edlight.org/tracks"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light"
            >
              View all tracks <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Learn by building */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Learn by building"
            subtitle="Apply your skills by building real-world applications — from portfolio sites to data analysis pipelines."
            centered
          />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-7 transition-shadow hover:shadow-md">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{project.title}</h3>
                    <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                      {project.level}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-700)]">{project.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--paper-200)] px-3 py-1 text-xs font-medium text-[var(--ink-700)]"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="numeral ml-auto text-xs text-[var(--ink-400)]">{project.hours}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://code.edlight.org/tracks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              Explore all projects on EdLight Code <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Lesson format */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-[var(--paper-300)]" aria-hidden="true" />
                <span className="eyebrow">Lesson format</span>
              </div>
              <h2 className="display-lg text-[var(--ink-900)]">Short reads. Real practice.</h2>
              <p className="body-lg mt-4 text-[var(--ink-700)]">
                Every lesson is a focused reading followed by a hands-on coding exercise. No video lectures — just learn
                at your own pace and write real code.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {lessonFeatures.map((feature, i) => {
                  const Icon = feature.icon
                  return (
                    <Reveal key={feature.title} delay={i * 80}>
                      <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-6 transition-shadow hover:shadow-md">
                        <IconBadge icon={Icon} />
                        <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{feature.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{feature.description}</p>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-3xl p-8 text-white"
              style={{
                background:
                  'radial-gradient(circle at 80% 20%, rgba(30,66,159,0.4) 0%, transparent 55%), linear-gradient(135deg, var(--ink-deep) 0%, #0a1530 70%, #0f1e4a 100%)',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
                style={{
                  backgroundImage: 'radial-gradient(rgba(232,226,212,0.6) 1px, transparent 1px)',
                  backgroundSize: '3px 3px',
                }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <span className="eyebrow text-white/85">Inside a lesson</span>
                <h3 className="display-md mt-3 text-white">Read → Code → Repeat</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/85">
                  Each lesson pairs a clear, focused explanation with an interactive coding exercise. You read the
                  concept, then immediately apply it by writing real code in the browser. Instant feedback tells you if
                  you got it right. No passive watching — you learn by doing.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[var(--accent-soft)]">No setup</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[var(--accent-soft)]">Instant feedback</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[var(--accent-soft)]">Real code</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Certificates that employers trust"
            subtitle="Complete a track and earn a certificate with a unique verification link. No more 'trust me' — employers can verify your skills in seconds."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {certFeatures.map((feature, i) => {
              const Icon = feature.icon
              return (
                <Reveal key={feature.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-7 transition-shadow hover:shadow-md">
                    <IconBadge icon={Icon} />
                    <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{feature.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://code.edlight.org/verify/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              See certificate verification <ArrowRight size={16} />
            </a>
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
                <span className="eyebrow text-white/85">Start building your future</span>
                <h2 className="display-md mt-3 text-white">
                  Learn to code, earn certificates, build a portfolio
                </h2>
                <p className="mt-3 text-white/90">
                  EdLight Code is free and open to everyone. Pick a track and start writing real code today.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://code.edlight.org/tracks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light"
                >
                  Start learning free
                </a>
                <a href="/get-involved" className="btn btn-ghost">
                  Partner with us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
