'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import {
  ArrowRight,
  Bell,
  BookOpenCheck,
  Brain,
  Briefcase,
  CalendarDays,
  Compass,
  DollarSign,
  GraduationCap,
  Lightbulb,
  Mail,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'
import TestimonialCard from '@/components/TestimonialCard'
import ImpactCounters from '@/components/ImpactCounters'
import ImageCarousel from '@/components/ImageCarousel'
import NotifyModal from '@/components/NotifyModal'
import testimonialsData from '@/data/testimonials.json'

/* ── Links ──────────────────────────────────────────────── */
const APP_PREVIEW_URL =
  'https://drive.google.com/file/d/1Yj2Esxmw2khDxFmOXiupMOtZwKr1wERv/view?usp=sharing'
const PROGRAM_DESC_URL =
  'https://drive.google.com/file/d/1IhfSC8LyVbs2nAJiL3lRSy06h_8oUntv/view?usp=sharing'
const EMAIL = 'eslp@edlight.org'
// The programme window ("August 10–21, 2026") and the next application window
// ("spring 2027") used to be constants here. They read as English prose, not as
// data — a French reader needs "du 10 au 21 août 2026" — so they live in
// messages/<locale>/eslp.json as `programDates` and `nextCycleOpens` and are
// interpolated into the sentences that quote them.
/**
 * The cycle the notify list is collecting for. Keep in step with the buttons.
 *
 * NOT translatable. This exact string is posted to /api/eslp-notify as the
 * `cycle` field and matched against the NOTIFY_CYCLES allowlist there, so a
 * translated value would be rejected and the notify form would break.
 */
const NEXT_CYCLE_LABEL = 'ESLP 2027'

/* ── Hero images (auto-carousel) ────────────────────────── */
const heroImages = [
  '/gallery/eslp-2026-graduation-promotion.webp',
  '/gallery/eslp-2026-metropole-plateau.webp',
  '/gallery/eslp-2026-graduation-danse.webp',
  '/Best_Participant_Award.webp',
]

/* ── Impact counters ───────────────────────────────────── */
// These were computed, not recorded. The old version took a 2026 baseline and
// added 35 alumni and one edition every time the calendar passed 1 September,
// whether or not an edition had actually run — so on 1 September 2027 the page
// would have claimed 170 alumni from a cohort that might never have met. A
// counter that invents its own numbers is the kind of unverifiable statistic
// the Ad Grants website policy treats as a content-quality failure, and it
// would have been wrong in EdLight's favour every year.
//
// They are recorded figures now. After each August edition, update these by
// hand from the actual cohort record.
// The numbers are the recorded facts and stay here; the labels are copy and
// live in messages/<locale>/eslp.json under `counters`.
const impactCounters = [
  { key: 'alumni', value: 135, suffix: '' },           // total through August 2026
  { key: 'women', value: 73, suffix: '%' },            // share of the 2026 cohort
  { key: 'editions', value: 5, suffix: '' },           // 2022 through 2026
  { key: 'scholarship', value: 100, suffix: '%' },     // every participant, every edition
] as const

/* ── Experience highlights ──────────────────────────────── */
const experienceHighlights = [
  { key: 'leadershipStudios', icon: <Users size={28} /> },
  { key: 'masterclasses', icon: <Star size={28} /> },
  { key: 'cityImmersions', icon: <Compass size={28} /> },
  { key: 'pitchNight', icon: <Sparkles size={28} /> },
] as const

const capstoneTags = [
  'designThinking',
  'communityImpact',
  'teamCoaching',
  'mentorship',
] as const

/* ── Curriculum pillars ─────────────────────────────────── */
const curriculumPillars = [
  { key: 'personalDiscovery', icon: <Brain size={28} /> },
  { key: 'professionalOrientation', icon: <Briefcase size={28} /> },
  { key: 'collegeAdmissions', icon: <GraduationCap size={28} /> },
  { key: 'finance', icon: <DollarSign size={28} /> },
  { key: 'entrepreneurship', icon: <Lightbulb size={28} /> },
] as const

/* ── Curriculum experience tabs ──────────────────────────── */
// The panel heading used to be derived from the visible label with a chain of
// string comparisons, which would have stopped matching the moment the label
// was translated. Each tab carries its own `heading` key instead.
const curriculumTabs = [
  { key: 'seminars', image: '/gallery/eslp-seminary-zoom.png' },
  { key: 'excursion', image: '/gallery/eslp-2026-metropole-plateau.webp' },
  { key: 'graduation', image: '/gallery/eslp-2026-graduation-promotion.webp' },
] as const

/* ── Journey phases ─────────────────────────────────────── */
const phases = [
  { key: 'discover', icon: Compass },
  { key: 'prepare', icon: CalendarDays },
  { key: 'immerse', icon: BookOpenCheck },
  { key: 'amplify', icon: Sparkles },
] as const

/** Every phase carries exactly three bullets. */
const PHASE_BULLETS = ['bullet1', 'bullet2', 'bullet3'] as const

/* ── Eligibility & selection ────────────────────────────── */
const eligibility = ['age', 'qualities', 'commitment'] as const

const selectionCriteria = [
  'motivation',
  'community',
  'curiosity',
  'representation',
] as const

/* ── Application steps ──────────────────────────────────── */
const applicationSteps = [
  { step: '1', key: 'form' },
  { step: '2', key: 'essays' },
  { step: '3', key: 'photo' },
  { step: '4', key: 'transcripts' },
] as const

/* ── Benefits ───────────────────────────────────────────── */
const benefits = [
  { key: 'allInclusive', icon: <BookOpenCheck size={28} /> },
  { key: 'excursions', icon: <Compass size={28} /> },
  { key: 'mentors', icon: <Users size={28} /> },
  { key: 'certificate', icon: <Star size={28} /> },
] as const

/* ── ESLP testimonials ──────────────────────────────────── */
const eslpTestimonials = testimonialsData.filter((testimonial) => testimonial.role.includes('ESLP'))

/* ── FAQ ─────────────────────────────────────────────────── */
const faqs = ['dates', 'free', 'documents', 'english', 'prepare', 'organizations'] as const

/* ── "What is ESLP" section carousel images ─────────────── */
const whatIsEslpImages = [
  { src: '/gallery/eslp-2026-metropole-groupe.webp', key: 'metropoleGroupe' },
  { src: '/gallery/eslp-2026-graduation-certificat.webp', key: 'graduationCertificat' },
  { src: '/gallery/eslp-2026-graduation-violon.webp', key: 'graduationViolon' },
  { src: '/gallery/eslp-2026-metropole-exterieur.webp', key: 'metropoleExterieur' },
] as const

/* ═══════════════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════════════ */
export default function ESLPPage() {

  const t = useTranslations('eslp')

  /* The dates are copy, not layout: they are read from the catalogue and
     interpolated into every sentence that quotes them. */
  const programDates = t('programDates')
  const nextCycleOpens = t('nextCycleOpens')

  /* ── Notify modal ── */
  const [notifyOpen, setNotifyOpen] = useState(false)

  /* ── Hero carousel ── */
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  /* ── Curriculum tab ── */
  const [activeTab, setActiveTab] = useState(0)

  /* Memoised so ImpactCounters, which keys an effect off the array identity,
     does not rebuild its IntersectionObserver on every re-render of this page
     (the hero and testimonial carousels re-render it every few seconds). */
  const counters = useMemo(
    () => impactCounters.map(({ key, value, suffix }) => ({ label: t(`counters.${key}`), value, suffix })),
    [t]
  )

  const carouselImages = useMemo(
    () => whatIsEslpImages.map(({ src, key }) => ({ src, alt: t(`gallery.${key}`) })),
    [t]
  )

  /* ── Testimonial carousel ── */
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % eslpTestimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* ═══ Hero ═══ */}
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage={heroImages[currentHeroImage]}
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => setNotifyOpen(true)}
            className="btn btn-primary"
          >
            <Bell size={18} /> {t('hero.notify')}
          </button>
          <a
            href={APP_PREVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light"
          >
            {t('hero.seeApplication')}
          </a>
        </div>
      </Hero>

      {/* ═══ Impact Stats — Animated Counters ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('stats.title')}
            subtitle={t('stats.subtitle')}
            centered
          />
          <div className="glass rounded-2xl p-6 sm:p-10">
            <ImpactCounters counters={counters} />
          </div>
        </div>
      </section>

      {/* ═══ What is ESLP — text + image ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <SectionHeader
                title={t('whatIs.title')}
                subtitle={t('whatIs.subtitle')}
              />
              <div className="glass rounded-2xl p-6 space-y-4">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {t('whatIs.p1')}
                </p>
                {/* The emphasised run of institution names sits mid-sentence, so
                    splitting it into two keys would leave a translator with two
                    half-sentences. t.rich keeps the sentence whole and passes the
                    markup in as a tag. */}
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {t.rich('whatIs.p2', {
                    b: (chunks) => <strong className="text-primary">{chunks}</strong>,
                  })}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={PROGRAM_DESC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  {t('whatIs.programDescription')}
                </a>
                <button
                  type="button"
                  onClick={() => setNotifyOpen(true)}
                  className="btn btn-light"
                >
                  {t('notifyCta')} <ArrowRight size={16} />
                </button>
              </div>
            </div>
            <ImageCarousel
              images={carouselImages}
              interval={4500}
              aspectRatio="aspect-[3/2]"
            />
          </div>
        </div>
      </section>

      {/* ═══ Inside the Experience — Card component ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <SectionHeader
                title={t('experience.title')}
                subtitle={t('experience.subtitle')}
              />
              <div className="grid gap-6 sm:grid-cols-2">
                {experienceHighlights.map((h) => (
                  <Card
                    key={h.key}
                    title={t(`highlights.${h.key}.title`)}
                    description={t(`highlights.${h.key}.description`)}
                    icon={h.icon}
                  />
                ))}
              </div>
            </div>

            <div className="glass-strong rounded-2xl bg-gradient-to-br from-primary/90 via-primary/80 to-primary/95 p-8 text-white shadow-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/85">
                {t('capstone.eyebrow')}
              </p>
              <h3 className="mt-4 font-heading text-2xl font-semibold">
                {t('capstone.title')}
              </h3>
              <p className="mt-4 text-sm text-white/95 leading-relaxed">
                {t('capstone.body')}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide">
                {capstoneTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/15 px-3 py-1">
                    {t(`capstone.tags.${tag}`)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Curriculum Pillars — Card component ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('curriculum.title')}
            subtitle={t('curriculum.subtitle')}
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {curriculumPillars.map((pillar) => (
              <Card
                key={pillar.key}
                title={t(`pillars.${pillar.key}.title`)}
                description={t(`pillars.${pillar.key}.description`)}
                icon={pillar.icon}
              />
            ))}
          </div>
          <div className="glass rounded-2xl mt-10 p-6">
            <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 leading-relaxed">
              {t('curriculum.note')}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Curriculum Experience — Tabbed ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('tabs.title')}
            subtitle={t('tabs.subtitle')}
            centered
          />

          {/* Tab buttons */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-10">
            {curriculumTabs.map((tab, idx) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(idx)}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === idx
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'glass text-gray-600 hover:text-primary'
                }`}
              >
                {t(`tabs.${tab.key}.label`)}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[3/2]">
              {curriculumTabs.map((tab, idx) => (
                <div
                  key={tab.key}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeTab === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={tab.image}
                    alt={t(`tabs.${tab.key}.alt`)}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="glass rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                {t(`tabs.${curriculumTabs[activeTab].key}.label`)}
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-text">
                {t(`tabs.${curriculumTabs[activeTab].key}.heading`)}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {t(`tabs.${curriculumTabs[activeTab].key}.description`)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Journey Phases ═══ */}
      <section className="relative overflow-hidden bg-slate-950 py-16 md:py-20 text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_rgba(15,23,42,0.9))]" />
        <div className="max-w-[1200px] relative mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-100">
              {t('journey.eyebrow')}
            </p>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-white">
              {t('journey.title')}
            </h2>
            <p className="mt-4 text-base text-slate-100">
              {t('journey.intro')}
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            {phases.map((phase, idx) => {
              return (
                <div
                  key={phase.key}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-[0_10px_40px_rgba(15,23,42,0.5)]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[var(--accent-soft)] font-bold text-sm">
                      {idx + 1}
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-white">
                      {t(`phases.${phase.key}.title`)}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-100 mb-4">
                    {t(`phases.${phase.key}.description`)}
                  </p>
                  <ul className="space-y-2 text-sm text-slate-200/80">
                    {PHASE_BULLETS.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <ArrowRight size={14} className="mt-1 text-[var(--accent-soft)] shrink-0" />
                        <span>{t(`phases.${phase.key}.${bullet}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ Eligibility & Selection ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('eligibility.title')}
            subtitle={t('eligibility.subtitle')}
            centered
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-text mb-4">
                <Users size={22} className="text-primary" /> {t('eligibility.whoTitle')}
              </h3>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                {eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span>{t(`eligibility.items.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-text mb-4">
                <Star size={22} className="text-primary" /> {t('selection.title')}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                {t('selection.intro')}
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                {selectionCriteria.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ArrowRight size={14} className="mt-1.5 text-primary shrink-0" />
                    <span>{t(`selection.criteria.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Application Process — with image ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/edlight_academy_group.webp"
                alt={t('apply.imageAlt')}
                width={720}
                height={480}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <SectionHeader
                title={t('apply.title')}
                subtitle={t('apply.subtitle', { cycle: NEXT_CYCLE_LABEL, opens: nextCycleOpens })}
              />
              <div className="glass rounded-2xl p-6 space-y-5">
                {applicationSteps.map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm shadow-md">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-heading font-semibold text-text">
                        {t(`apply.steps.${item.key}.title`)}
                      </h4>
                      <p className="text-sm text-gray-600">{t(`apply.steps.${item.key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={APP_PREVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light"
                >
                  {t('apply.preview')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ESLP 2026 — Applications Open ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-primary/90 p-8 sm:p-12 text-white shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent)]" />
            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                  <GraduationCap size={14} /> {t('cohort2026.badge')}
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  {t('cohort2026.title')}
                </h2>
                <p className="text-base text-white/95 leading-relaxed max-w-xl">
                  {t.rich('cohort2026.body', {
                    dates: programDates,
                    opens: nextCycleOpens,
                    b: (chunks) => <strong className="text-white">{chunks}</strong>,
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:flex-col lg:flex-row shrink-0">
                <button
                  type="button"
                  onClick={() => setNotifyOpen(true)}
                  className="btn btn-light"
                >
                  <Bell size={16} /> {t('notifyCta')}
                </button>
                <a
                  href={`mailto:${EMAIL}`}
                  className="btn btn-ghost"
                >
                  <Mail size={16} /> {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Fully Funded — Card component ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('funding.title')}
            subtitle={t('funding.subtitle')}
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <Card
                key={benefit.key}
                title={t(`benefits.${benefit.key}.title`)}
                description={t(`benefits.${benefit.key}.description`)}
                icon={benefit.icon}
              />
            ))}
          </div>
          <div className="glass-strong rounded-2xl mt-10 p-6 sm:p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70 mb-2">
              {t('funding.guaranteeEyebrow')}
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {t('funding.guaranteeBody')}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Alumni & Testimonials — TestimonialCard + carousel ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('testimonials.title')}
            subtitle={t('testimonials.subtitle')}
            centered
          />
          <div className="max-w-3xl mx-auto">
            <TestimonialCard {...eslpTestimonials[currentTestimonial]} />
            <div className="flex justify-center gap-2 mt-6">
              {eslpTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={t('testimonials.dotAria', { number: index + 1 })}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('faq.title')}
            subtitle={t('faq.subtitle', { email: EMAIL })}
            centered
          />
          <div className="mx-auto max-w-4xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq}
                className="group glass rounded-2xl p-6 transition"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-left text-base font-semibold text-text">
                  {t(`faqs.${faq}.question`)}
                  <span className="text-primary transition group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {t(`faqs.${faq}.answer`, {
                    dates: programDates,
                    opens: nextCycleOpens,
                    email: EMAIL,
                  })}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="pb-20 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 via-primary to-primary/90 p-8 sm:p-10 text-white shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent)]" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
                  {t('finalCta.eyebrow', { opens: nextCycleOpens })}
                </p>
                <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold">
                  {t('finalCta.title')}
                </h2>
                <p className="mt-3 text-sm md:text-base text-white/95 max-w-lg">
                  {t('finalCta.body')}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0">
                <button type="button" onClick={() => setNotifyOpen(true)} className="btn btn-light">
                  <Bell size={16} /> {t('notifyCta')}
                </button>
                <a href={`mailto:${EMAIL}`} className="btn btn-ghost">
                  <Mail size={16} /> {t('finalCta.partner')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Notify Modal ═══ */}
      <NotifyModal
        open={notifyOpen}
        onClose={() => setNotifyOpen(false)}
        cycleLabel={NEXT_CYCLE_LABEL}
      />
    </>
  )
}
