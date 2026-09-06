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
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Reveal from '@/components/Reveal'

// Structure, icons, and numeric facts live here; every word lives in
// messages/<locale>/code.json. `key` indexes into the catalogue — e.g.
// code.tracks.items.<key>.title — so copy and layout change independently.

type Stat = {
  key: string
  value: string
}

type Track = {
  key: string
  /** Interpolated into the `tracks.courseCount` plural, not translated. */
  courses: number
  hours: string
  icon: React.ElementType
}

type Step = {
  key: string
  number: string
}

type Project = {
  key: string
  level: 'beginner' | 'intermediate'
  tags: readonly string[]
  hours: string
}

type Feature = {
  key: string
  icon: React.ElementType
}

const stats: Stat[] = [
  { key: 'tracks', value: '6+' },
  { key: 'free', value: '100%' },
  { key: 'certificates', value: '✓' },
]

const tracks: Track[] = [
  { key: 'sql', courses: 6, hours: '~60 h', icon: Database },
  { key: 'python', courses: 7, hours: '~55 h', icon: Code2 },
  { key: 'terminal', courses: 3, hours: '~9 h', icon: Terminal },
  { key: 'html', courses: 3, hours: '~12 h', icon: Globe2 },
  { key: 'css', courses: 3, hours: '~14 h', icon: Laptop },
  { key: 'javascript', courses: 3, hours: '~14 h', icon: Sparkles },
]

const howItWorks: Step[] = [
  { key: 'pick', number: '01' },
  { key: 'learn', number: '02' },
  { key: 'certify', number: '03' },
]

const projects: Project[] = [
  {
    key: 'portfolio',
    level: 'intermediate',
    tags: ['html', 'css', 'javascript'],
    hours: '~8 h',
  },
  {
    key: 'salesData',
    level: 'beginner',
    tags: ['sql', 'dataAnalysis'],
    hours: '~3 h',
  },
  {
    key: 'expenseReports',
    level: 'beginner',
    tags: ['python', 'automation'],
    hours: '~3 h',
  },
  {
    key: 'quizApp',
    level: 'intermediate',
    tags: ['html', 'css', 'javascript'],
    hours: '~5 h',
  },
]

const lessonFeatures: Feature[] = [
  { key: 'biteSized', icon: BookOpenCheck },
  { key: 'handsOn', icon: Code2 },
  { key: 'anyDevice', icon: Laptop },
  { key: 'multilingual', icon: GraduationCap },
]

const certFeatures: Feature[] = [
  { key: 'link', icon: Link2 },
  { key: 'employer', icon: CheckCircle2 },
  { key: 'shareable', icon: Award },
]

function IconBadge({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
      <Icon size={22} />
    </div>
  )
}

export default async function CodePage({
  params,
}: {
  params: { locale: string }
}) {
  // Required for static rendering under [locale]: without it next-intl
  // has no locale outside a request and falls back to the default.
  setRequestLocale(params.locale)

  const t = await getTranslations('code')

  return (
    <>
      <Hero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage="/edlight_academy_group.webp"
        meta={[
          { label: t('hero.meta.tracks'), value: '6+' },
          { label: t('hero.meta.cost'), value: t('hero.meta.costValue') },
          { label: t('hero.meta.certificates'), value: t('hero.meta.certificatesValue') },
          { label: t('hero.meta.setup'), value: t('hero.meta.setupValue') },
        ]}
      >
        <a
          href="https://code.edlight.org/tracks"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          {t('hero.ctaPrimary')} <ArrowRight size={18} />
        </a>
        <a
          href="https://code.edlight.org/tracks"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          {t('hero.ctaSecondary')}
        </a>
      </Hero>

      {/* Stats */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title={t('stats.title')} subtitle={t('stats.subtitle')} centered />
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat, i) => (
              <Reveal key={stat.key} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-8 transition-shadow hover:shadow-md">
                  <span className="numeral text-4xl font-bold text-[var(--accent)]">{stat.value}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-[var(--ink-900)]">
                    {t(`stats.items.${stat.key}.label`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">
                    {t(`stats.items.${stat.key}.description`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title={t('howItWorks.title')} subtitle={t('howItWorks.subtitle')} centered />
          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((step, i) => (
              <Reveal key={step.number} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-8 transition-shadow hover:shadow-md">
                  <span className="numeral text-5xl font-bold text-[var(--accent-soft)]">{step.number}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-[var(--ink-900)]">
                    {t(`howItWorks.steps.${step.key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-700)]">
                    {t(`howItWorks.steps.${step.key}.description`)}
                  </p>
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
        <div className="max-w-[1200px] relative mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-white/40" aria-hidden="true" />
              <span className="eyebrow text-white/85">{t('tracks.eyebrow')}</span>
            </div>
            <h2 className="display-lg text-white">{t('tracks.title')}</h2>
            <p className="body-lg mt-4 text-white/90">{t('tracks.body')}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track, i) => {
              const Icon = track.icon
              return (
                <Reveal key={track.key} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--accent-soft)]">
                        <Icon size={22} />
                      </span>
                      <h3 className="font-display text-lg font-semibold text-white">
                        {t(`tracks.items.${track.key}.title`)}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/80">
                      {t(`tracks.items.${track.key}.description`)}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-white/70">
                      <span className="rounded-full bg-white/10 px-3 py-1">
                        {t('tracks.courseCount', { count: track.courses })}
                      </span>
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
              {t('tracks.viewAll')} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Learn by building */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title={t('projects.title')} subtitle={t('projects.subtitle')} centered />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.key} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-7 transition-shadow hover:shadow-md">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">
                      {t(`projects.items.${project.key}.title`)}
                    </h3>
                    <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                      {t(`projects.levels.${project.level}`)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-700)]">
                    {t(`projects.items.${project.key}.description`)}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--paper-200)] px-3 py-1 text-xs font-medium text-[var(--ink-700)]"
                      >
                        {t(`projects.tags.${tag}`)}
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
              {t('projects.exploreAll')} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Lesson format */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-[var(--paper-300)]" aria-hidden="true" />
                <span className="eyebrow">{t('lessonFormat.eyebrow')}</span>
              </div>
              <h2 className="display-lg text-[var(--ink-900)]">{t('lessonFormat.title')}</h2>
              <p className="body-lg mt-4 text-[var(--ink-700)]">{t('lessonFormat.body')}</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {lessonFeatures.map((feature, i) => {
                  const Icon = feature.icon
                  return (
                    <Reveal key={feature.key} delay={i * 80}>
                      <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-6 transition-shadow hover:shadow-md">
                        <IconBadge icon={Icon} />
                        <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">
                          {t(`lessonFormat.features.${feature.key}.title`)}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">
                          {t(`lessonFormat.features.${feature.key}.description`)}
                        </p>
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
                <span className="eyebrow text-white/85">{t('lessonFormat.insideEyebrow')}</span>
                <h3 className="display-md mt-3 text-white">{t('lessonFormat.insideTitle')}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/85">
                  {t('lessonFormat.insideBody')}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[var(--accent-soft)]">
                    {t('lessonFormat.badges.noSetup')}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[var(--accent-soft)]">
                    {t('lessonFormat.badges.instantFeedback')}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[var(--accent-soft)]">
                    {t('lessonFormat.badges.realCode')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title={t('certificates.title')} subtitle={t('certificates.subtitle')} centered />
          <div className="grid gap-6 md:grid-cols-3">
            {certFeatures.map((feature, i) => {
              const Icon = feature.icon
              return (
                <Reveal key={feature.key} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-7 transition-shadow hover:shadow-md">
                    <IconBadge icon={Icon} />
                    <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">
                      {t(`certificates.items.${feature.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">
                      {t(`certificates.items.${feature.key}.description`)}
                    </p>
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
              {t('certificates.seeVerification')} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div
            className="relative overflow-hidden rounded-3xl p-10 text-white sm:p-14"
            style={{
              background:
                'radial-gradient(circle at 80% 20%, rgba(30,66,159,0.4) 0%, transparent 55%), linear-gradient(135deg, var(--ink-deep) 0%, #0a1530 70%, #0f1e4a 100%)',
            }}
          >
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <span className="eyebrow text-white/85">{t('cta.eyebrow')}</span>
                <h2 className="display-md mt-3 text-white">{t('cta.title')}</h2>
                <p className="mt-3 text-white/90">{t('cta.body')}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://code.edlight.org/tracks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light"
                >
                  {t('cta.primary')}
                </a>
                <a href="/get-involved" className="btn btn-ghost">
                  {t('cta.secondary')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
