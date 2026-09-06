import React from 'react'
import {
  ArrowRight,
  Atom,
  BookOpenCheck,
  Calculator,
  CalendarCheck,
  ClipboardList,
  Dna,
  Flame,
  FlaskConical,
  Gamepad2,
  GraduationCap,
  Landmark,
  Languages,
  Medal,
  School,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Reveal from '@/components/Reveal'

// Structure and icons live here; every word lives in messages/<locale>/academy.json.
// `key` indexes into the catalogue — academy.pillars.items.<key>.title — so a
// translator changes copy without touching this file and a developer changes
// layout or icons without touching a translation.
type Item = {
  key: string
  icon: React.ElementType
}

// The four core product areas of the platform.
const pillars: Item[] = [
  { key: 'courses', icon: GraduationCap },
  { key: 'exams', icon: ClipboardList },
  { key: 'trivia', icon: Gamepad2 },
  { key: 'progress', icon: Trophy },
]

// The gamification layer — the part that keeps learners coming back.
const gamification: Item[] = [
  { key: 'xp', icon: Zap },
  { key: 'streaks', icon: Flame },
  { key: 'leaderboard', icon: Trophy },
  { key: 'achievements', icon: Medal },
]

const subjects: Item[] = [
  { key: 'maths', icon: Calculator },
  { key: 'physics', icon: Atom },
  { key: 'chemistry', icon: FlaskConical },
  { key: 'svt', icon: Dna },
  { key: 'economics', icon: TrendingUp },
  { key: 'languages', icon: Languages },
]

const examTiers: Item[] = [
  { key: 'ninthYear', icon: School },
  { key: 'bac', icon: GraduationCap },
  { key: 'university', icon: Landmark },
]

const triviaCategories = [
  'flashMath',
  'chemicalSymbols',
  'bodyLifeScience',
  'englishExpress',
  'worldCapitals',
  'currencies',
  'flags',
  'historyOfHaiti',
  'geographyOfHaiti',
  'haitianCulture',
  'haitianFigures',
  'haitianProverbs',
  'scienceNature',
  'nationalSymbols',
  'haitianSport',
] as const

const studyPlan: Item[] = [
  { key: 'plan', icon: CalendarCheck },
  { key: 'score', icon: Target },
  { key: 'dashboard', icon: BookOpenCheck },
]

const howItWorks = ['account', 'subject', 'test', 'track', 'exams'] as const

function IconBadge({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
      <Icon size={22} />
    </div>
  )
}

export default async function AcademyPage({
  params,
}: {
  params: { locale: string }
}) {
  // Required for static rendering under [locale]: without it next-intl
  // has no locale outside a request and falls back to the default.
  setRequestLocale(params.locale)

  const t = await getTranslations('academy')

  return (
    <>
      <Hero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage="/edlight_academy_group.webp"
        meta={[
          { label: t('hero.meta.subjects'), value: '6+' },
          { label: t('hero.meta.examLevels'), value: '3' },
          { label: t('hero.meta.triviaCategories'), value: '15' },
          { label: t('hero.meta.cost'), value: t('hero.meta.costValue') },
        ]}
      >
        <a
          href="https://academy.edlight.org"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          {t('hero.ctaPrimary')} <ArrowRight size={18} />
        </a>
        <a
          href="https://academy.edlight.org/courses"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          {t('hero.ctaSecondary')}
        </a>
      </Hero>

      {/* Four ways to learn — the core restructure */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('pillars.title')}
            subtitle={t('pillars.subtitle')}
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.key} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-6 transition-shadow hover:shadow-md">
                  <IconBadge icon={pillar.icon} />
                  <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">
                    {t(`pillars.items.${pillar.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">
                    {t(`pillars.items.${pillar.key}.description`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification — dark editorial band */}
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
              <span className="eyebrow text-white/85">{t('gamification.eyebrow')}</span>
            </div>
            <h2 className="display-lg text-white">{t('gamification.title')}</h2>
            <p className="body-lg mt-4 text-white/90">{t('gamification.body')}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gamification.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.key} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[var(--accent-soft)]">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {t(`gamification.items.${item.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                      {t(`gamification.items.${item.key}.description`)}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title={t('subjects.title')} subtitle={t('subjects.subtitle')} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject, i) => {
              const Icon = subject.icon
              return (
                <Reveal key={subject.key} delay={i * 60}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-[var(--paper-200)] bg-white p-6">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-[var(--ink-900)]">
                        {t(`subjects.items.${subject.key}.title`)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--ink-700)]">
                        {t(`subjects.items.${subject.key}.description`)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-[var(--ink-400)]">
            <Languages size={16} />
            <span>{t('subjects.note')}</span>
          </div>
        </div>
      </section>

      {/* Mock exams */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title={t('exams.title')} subtitle={t('exams.subtitle')} centered />
          <div className="grid gap-6 md:grid-cols-3">
            {examTiers.map((tier, i) => {
              const Icon = tier.icon
              return (
                <Reveal key={tier.key} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-7">
                    <IconBadge icon={Icon} />
                    <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">
                      {t(`exams.items.${tier.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">
                      {t(`exams.items.${tier.key}.description`)}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trivia */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-[var(--paper-300)]" aria-hidden="true" />
                <span className="eyebrow">{t('trivia.eyebrow')}</span>
              </div>
              <h2 className="display-lg text-[var(--ink-900)]">{t('trivia.title')}</h2>
              <p className="body-lg mt-4 text-[var(--ink-700)]">{t('trivia.body')}</p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-[var(--paper-200)] bg-[var(--paper-50)] px-5 py-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Sparkles size={22} />
                </div>
                <div>
                  <p className="font-display font-semibold text-[var(--ink-900)]">
                    {t('trivia.dailyChallenge')}
                  </p>
                  <p className="text-sm text-[var(--ink-700)]">{t('trivia.dailyChallengeDetail')}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {triviaCategories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-[var(--paper-200)] bg-white px-4 py-2 text-sm text-[var(--ink-700)]"
                >
                  {t(`trivia.categories.${category}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Study plan / BAC prep */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title={t('studyPlan.title')} subtitle={t('studyPlan.subtitle')} centered />
          <div className="grid gap-6 md:grid-cols-3">
            {studyPlan.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.key} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-7">
                    <IconBadge icon={Icon} />
                    <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">
                      {t(`studyPlan.items.${item.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">
                      {t(`studyPlan.items.${item.key}.description`)}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <SectionHeader title={t('howItWorks.title')} subtitle={t('howItWorks.subtitle')} centered />
            <ol className="mt-4 space-y-4">
              {howItWorks.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border border-[var(--paper-200)] bg-white p-5"
                >
                  <span className="numeral flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-[var(--ink-700)]">{t(`howItWorks.steps.${step}`)}</p>
                </li>
              ))}
            </ol>
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
                  href="https://academy.edlight.org"
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
