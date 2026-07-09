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
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Reveal from '@/components/Reveal'

type Item = {
  title: string
  description: string
  icon: React.ElementType
}

// The four core product areas of the platform.
const pillars: Item[] = [
  {
    title: 'Structured courses',
    description:
      'Video lessons organized by subject and level, aligned to the Haitian national curriculum and taught in French and Kreyòl.',
    icon: GraduationCap,
  },
  {
    title: 'Mock exams',
    description:
      'Real past national exams — from 9e Année to the Baccalauréat and university entrance — each with detailed, worked corrections.',
    icon: ClipboardList,
  },
  {
    title: 'Trivia game',
    description:
      'A fast, daily trivia game across 15 categories, from chemistry and math to Haitian history, proverbs, and culture.',
    icon: Gamepad2,
  },
  {
    title: 'Progress & rewards',
    description:
      'Quizzes with instant feedback, XP, levels, daily streaks, achievement badges, and a weekly leaderboard to keep you motivated.',
    icon: Trophy,
  },
]

// The gamification layer — the part that keeps learners coming back.
const gamification: Item[] = [
  {
    title: 'XP & levels',
    description: 'Earn XP for every lesson, quiz, and trivia round, and level up as you go.',
    icon: Zap,
  },
  {
    title: 'Daily streaks',
    description: 'Keep your streak alive with a little learning each day — 3 days, a week, a month, and beyond.',
    icon: Flame,
  },
  {
    title: 'Weekly leaderboard',
    description: 'See how you rank against other learners across the platform each week.',
    icon: Trophy,
  },
  {
    title: 'Achievements',
    description: 'Unlock badges for milestones — from your first quiz to a full year of consistency.',
    icon: Medal,
  },
]

const subjects: Item[] = [
  { title: 'Mathematics', description: 'Algebra, calculus, and exam strategy.', icon: Calculator },
  { title: 'Physics', description: 'Motion, energy, and the laws of the world.', icon: Atom },
  { title: 'Chemistry', description: 'Reactions, matter, and lab concepts.', icon: FlaskConical },
  { title: 'Life & Earth sciences (SVT)', description: 'Biology, the body, and the environment.', icon: Dna },
  { title: 'Economics', description: 'Markets, development, and decision-making.', icon: TrendingUp },
  { title: 'Languages', description: 'English and Spanish for the national exams.', icon: Languages },
]

const examTiers: Item[] = [
  {
    title: '9e Année',
    description: 'Official 9th-grade fundamental exams with complete past papers and detailed corrections.',
    icon: School,
  },
  {
    title: 'Baccalauréat',
    description: 'Terminale exams across every track — SVT, SMP, SES, Lettres, and Arts.',
    icon: GraduationCap,
  },
  {
    title: 'University entrance',
    description: 'Admission concours and university exams to prepare for higher education with confidence.',
    icon: Landmark,
  },
]

const triviaCategories = [
  'Flash Math',
  'Chemical Symbols',
  'Body & Life Science',
  'English Express',
  'World Capitals',
  'Currencies',
  'Flags',
  'History of Haiti',
  'Geography of Haiti',
  'Haitian Culture',
  'Haitian Figures',
  'Haitian Proverbs',
  'Science & Nature',
  'National Symbols',
  'Haitian Sport',
]

const studyPlan: Item[] = [
  {
    title: 'Personalized study plan',
    description: 'A tailored plan with spaced repetition that schedules reviews so knowledge actually sticks.',
    icon: CalendarCheck,
  },
  {
    title: 'Weighted BAC score',
    description: 'Track your readiness with a score weighted by your track’s coefficients — SVT ×4, Chemistry ×3, and more.',
    icon: Target,
  },
  {
    title: 'Progress dashboard',
    description: 'See active courses, quizzes taken, average score, and your streak at a glance.',
    icon: BookOpenCheck,
  },
]

const howItWorks = [
  'Create a free account at academy.edlight.org.',
  'Pick a subject and follow structured lessons in French and Kreyòl.',
  'Test yourself with quizzes, real past exams, and daily trivia.',
  'Track your progress with XP, streaks, and a weighted BAC score.',
  'Walk into your national exams prepared and confident.',
]

function IconBadge({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
      <Icon size={22} />
    </div>
  )
}

export default function AcademyPage() {
  return (
    <>
      <Hero
        eyebrow="EdLight Ecosystem · Learning Platform"
        title="EdLight Academy"
        subtitle="A full learning platform for Haitian students — structured courses, real national exam prep, and a daily trivia game, all with progress tracking that keeps you motivated. Free and bilingual."
        backgroundImage="/edlight_academy_group.webp"
        meta={[
          { label: 'Subjects', value: '6+' },
          { label: 'Exam levels', value: '3' },
          { label: 'Trivia categories', value: '15' },
          { label: 'Cost to learners', value: 'Free' },
        ]}
      >
        <a
          href="https://academy.edlight.org"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Start learning <ArrowRight size={18} />
        </a>
        <a
          href="https://academy.edlight.org/courses"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Explore courses
        </a>
      </Hero>

      {/* Four ways to learn — the core restructure */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="One platform, four ways to learn"
            subtitle="EdLight Academy is more than video lessons. Learners move between courses, exam practice, trivia, and a progress system built to keep them going."
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-6 transition-shadow hover:shadow-md">
                  <IconBadge icon={pillar.icon} />
                  <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{pillar.description}</p>
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
        <div className="container relative mx-auto px-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-white/40" aria-hidden="true" />
              <span className="eyebrow text-white/85">Stay motivated</span>
            </div>
            <h2 className="display-lg text-white">Learning that keeps you coming back</h2>
            <p className="body-lg mt-4 text-white/90">
              Every lesson, quiz, and trivia round earns XP. Streaks, badges, and a weekly leaderboard turn steady
              studying into something you actually look forward to.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gamification.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[var(--accent-soft)]">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">{item.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Structured courses, built for the Haitian curriculum"
            subtitle="Designed with Haitian educators and delivered in French and Kreyòl, each subject is organized into levels so learners always know what comes next."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject, i) => {
              const Icon = subject.icon
              return (
                <Reveal key={subject.title} delay={i * 60}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-[var(--paper-200)] bg-white p-6">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-[var(--ink-900)]">{subject.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--ink-700)]">{subject.description}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-[var(--ink-400)]">
            <Languages size={16} />
            <span>Every course is available in both French and Haitian Creole.</span>
          </div>
        </div>
      </section>

      {/* Mock exams */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Practice with real national exams"
            subtitle="Our mock-exam library (examens blancs) covers the full Haitian path, using authentic past papers with detailed, step-by-step corrections."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {examTiers.map((tier, i) => {
              const Icon = tier.icon
              return (
                <Reveal key={tier.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-7">
                    <IconBadge icon={Icon} />
                    <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{tier.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{tier.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trivia */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-[var(--paper-300)]" aria-hidden="true" />
                <span className="eyebrow">Play &amp; learn</span>
              </div>
              <h2 className="display-lg text-[var(--ink-900)]">Trivia: quick, daily, addictive</h2>
              <p className="body-lg mt-4 text-[var(--ink-700)]">
                A daily challenge of 10 questions worth bonus XP, plus 15 categories that mix core subjects with Haitian
                history, geography, and culture. Perfect for a two-minute study break.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-[var(--paper-200)] bg-[var(--paper-50)] px-5 py-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Sparkles size={22} />
                </div>
                <div>
                  <p className="font-display font-semibold text-[var(--ink-900)]">Daily challenge</p>
                  <p className="text-sm text-[var(--ink-700)]">10 questions · +50 XP bonus</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {triviaCategories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-[var(--paper-200)] bg-white px-4 py-2 text-sm text-[var(--ink-700)]"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Study plan / BAC prep */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Your personalized path to the bac"
            subtitle="EdLight Academy turns scattered studying into a plan — and shows you exactly how ready you are for exam day."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {studyPlan.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-7">
                    <IconBadge icon={Icon} />
                    <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{item.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <SectionHeader title="How it works" subtitle="Five steps to start learning with EdLight Academy." centered />
            <ol className="mt-4 space-y-4">
              {howItWorks.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border border-[var(--paper-200)] bg-white p-5"
                >
                  <span className="numeral flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-[var(--ink-700)]">{step}</p>
                </li>
              ))}
            </ol>
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
                <span className="eyebrow text-white/85">Join the community</span>
                <h2 className="display-md mt-3 text-white">Ready to unlock EdLight Academy?</h2>
                <p className="mt-3 text-white/90">
                  Start learning for free, bring the platform to your classroom, or sponsor new courses for Haitian
                  learners.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://academy.edlight.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light"
                >
                  Start learning today
                </a>
                <a href="mailto:academy@edlight.org" className="btn btn-ghost">
                  Partner with EdLight
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
