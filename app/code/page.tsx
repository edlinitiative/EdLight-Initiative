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

export default function CodePage() {
  return (
    <>
      <Hero
        title="EdLight Code"
        subtitle="The skills you need. The portfolio to prove it. Master Python, SQL, Web Development, and more through guided, hands-on courses — all in your browser."
        backgroundImage="/edlight_academy_group.webp"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
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
            className="btn btn-light"
          >
            Explore tracks
          </a>
        </div>
      </Hero>

      {/* Stats */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-white py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Learn by doing, not watching"
            subtitle="EdLight Code turns lessons into real-world skills. Every lesson is a focused reading followed by a hands-on coding exercise — no video lectures, just learn at your own pace and write real code."
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

      {/* How it works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="From zero to certified in three steps"
            subtitle="No complicated setup. No long lectures. Just learn, practice, and prove your skills."
            centered
          />
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-primary/10 bg-white p-8 shadow-sm"
              >
                <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                <h3 className="mt-4 font-heading text-xl font-semibold text-text">{step.title}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_rgba(15,23,42,0.9))]" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-100">Tracks</p>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-white">
              Structured paths from beginner to advanced
            </h2>
            <p className="mt-4 text-base text-slate-100">
              Pick your language and start learning. Each track takes you from the fundamentals to job-ready skills.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => {
              const Icon = track.icon
              return (
                <div
                  key={track.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.5)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-white/10 p-2 text-primary">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-white">{track.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-slate-100">{track.description}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-200">
                    <span className="rounded-full bg-white/10 px-3 py-1">{track.courses}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">{track.hours}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://code.edlight.org/tracks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              View all tracks <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Learn by building */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Learn by building"
            subtitle="Apply your skills by building real-world applications — from portfolio sites to data analysis pipelines."
            centered
          />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.title}
                className="rounded-3xl border border-primary/10 bg-white p-7 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-lg font-semibold text-text">{project.title}</h3>
                  <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {project.level}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{project.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto text-xs text-gray-400">{project.hours}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://code.edlight.org/tracks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Explore all projects on EdLight Code <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Lesson format */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-8">
              <SectionHeader
                title="Short reads. Real practice."
                subtitle="Every lesson is a focused reading followed by a hands-on coding exercise. No video lectures — just learn at your own pace and write real code."
              />
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BookOpenCheck size={20} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text">Bite-sized lessons</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Focused readings you can finish in 5-10 minutes. No fluff, just the concepts you need.
                  </p>
                </div>
                <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Code2 size={20} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text">Hands-on exercises</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Practice coding directly in your browser after every lesson. No setup, no downloads.
                  </p>
                </div>
                <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Laptop size={20} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text">Works on any device</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Mobile-friendly and browser-based. Learn on a phone, tablet, or laptop — wherever you are.
                  </p>
                </div>
                <div className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <GraduationCap size={20} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text">Multilingual support</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Available in English, French, and Haitian Creole so you can learn in the language you think in.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/95 via-primary/85 to-primary p-8 text-white shadow-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/85">Inside a lesson</p>
              <h3 className="mt-4 font-heading text-2xl font-semibold">Read → Code → Repeat</h3>
              <p className="mt-4 text-sm text-white/95 leading-relaxed">
                Each lesson pairs a clear, focused explanation with an interactive coding exercise. You read the concept,
                then immediately apply it by writing real code in the browser. Instant feedback tells you if you got it
                right. No passive watching — you learn by doing.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide">
                <span className="rounded-full bg-white/15 px-3 py-1">No setup</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Instant feedback</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Real code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Certificates that employers trust"
            subtitle="Complete a track and earn a certificate with a unique verification link. No more 'trust me' — employers can verify your skills in seconds."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {certFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="rounded-3xl border border-primary/10 bg-white p-7 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://code.edlight.org/verify/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              See certificate verification <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/90 via-primary to-primary/90 p-10 text-white shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent)]" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
                  Start building your future
                </p>
                <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold">
                  Learn to code, earn certificates, build a portfolio
                </h2>
                <p className="mt-3 text-sm md:text-base text-white/95">
                  EdLight Code is free and open to everyone. Pick a track and start writing real code today.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="https://code.edlight.org/tracks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light"
                >
                  Start learning free
                </a>
                <a href="mailto:code@edlight.org" className="btn btn-primary">
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
