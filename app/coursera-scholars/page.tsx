import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import {
  BarChart3,
  BrainCircuit,
  Briefcase,
  Code2,
  GraduationCap,
  Lightbulb,
  Rocket,
  Users,
} from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import NotifyButton from '@/components/NotifyButton'

// ── Framing, and the lines that must not drift ───────────────────────────────
// EdLight Initiative is a Coursera Social Impact Partner. EdLight — not
// Coursera — runs this program and selects its Scholars. Nothing on this page
// may imply Coursera picks scholars, co-operates the program, or endorses it,
// and no specific university, employer, degree or certificate is promised,
// because what the licence actually unlocks is set by the catalogue in
// EdLight's plan, not by us.
//
// The count of donated licences (300) and the first cohort size are
// deliberately absent from the public page: the brief says not to advertise a
// number of places unless EdLight decides to, and a public number is very hard
// to walk back once the cohort is sized differently.

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('scholars.meta')

  return {
    // Bare title: the root layout applies the template '%s | EdLight Initiative'.
    // Spelling out the suffix here rendered "… | EdLight Initiative | EdLight
    // Initiative" in the browser tab and in search results.
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
    },
  }
}

// Applications are not open, and the page no longer says they are.
//
// It used to read "Applications for the inaugural cohort open in September
// 2026" — written while that was in the future, and left standing once it
// arrived, so the page was advertising a window in the future tense on a date
// that had already passed. Worse, "Apply now" pointed at
// https://apply.edlight.org/coursera-scholars, which is a general portal
// landing page rather than a Scholars form, so the button did not do what it
// said. Both are things the Ad Grants website policy rejects a site over.
//
// The CTA is the notify list until there is a form to point at. To reopen:
// set APPLICATIONS_OPEN to the real window, restore an APPLICATION_URL that
// resolves to an actual Scholars application, and swap the NotifyButton back
// to a link.
const SCHOLARS_NOTIFY_LABEL = 'Coursera Scholars'

// Structure stays here, wording lives in messages/<locale>/scholars.json and is
// looked up by `key`. Same pattern as the footer's link columns.
const benefits = [
  { icon: GraduationCap, key: 'learn' },
  { icon: Rocket, key: 'build' },
  { icon: BarChart3, key: 'earn' },
  { icon: Users, key: 'grow' },
] as const

const pathways = [
  { icon: BrainCircuit, key: 'ai' },
  { icon: Code2, key: 'tech' },
  { icon: BarChart3, key: 'data' },
  { icon: Briefcase, key: 'business' },
  { icon: Lightbulb, key: 'entrepreneurship' },
  { icon: Users, key: 'professional' },
] as const

const steps = [
  { number: '01', key: 'apply' },
  { number: '02', key: 'selected' },
  { number: '03', key: 'start' },
  { number: '04', key: 'finish' },
] as const

const whoCanApply = [
  'students',
  'graduates',
  'professionals',
  'entrepreneurs',
  'jobSeekers',
  'selfDirected',
] as const

const faqs = [
  'cost',
  'eligibility',
  'enrolment',
  'experience',
  'subjects',
  'certificate',
  'selection',
  'notSelected',
  'inactive',
  'outsideHaiti',
] as const

export default async function CourseraScholarsPage() {
  const t = await getTranslations('scholars')

  return (
    <>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        {/* Left-aligned, NOT centred. Hero renders its children inside a
            left-aligned max-w-3xl block, so `mx-auto` on this paragraph and
            `justify-center` on the buttons centred them underneath a headline
            that stays hard left — the whole hero read as misaligned. */}
        <p className="mb-6 max-w-2xl text-sm sm:text-base text-white/85 leading-relaxed">
          {t('hero.body')}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <NotifyButton cycleLabel={SCHOLARS_NOTIFY_LABEL} className="btn btn-primary">
            {t('hero.notify')}
          </NotifyButton>
          {/* btn-ghost, not btn-outline. btn-outline is the light-ground
              variant: near-black label on a transparent background. Inside
              this Hero that put --ink-900 text on a dark navy photograph, so
              the site's secondary call to action was effectively invisible.
              btn-ghost is the on-dark counterpart, and it is what every other
              hero on the site already uses. */}
          <a href="#how-it-works" className="btn btn-ghost">
            {t('hero.learnMore')}
          </a>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/70">
          {t('hero.note')}
        </p>
      </Hero>

      {/* Partnership. The one section where the wording is a compliance matter
          rather than a style choice — see the note at the top of this file. */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('partnership.title')}
            subtitle={t('partnership.subtitle')}
            centered
          />
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="body-lg text-[var(--ink-700)]">
              {t('partnership.p1')}
            </p>
            <p className="body-lg text-[var(--ink-700)]">
              {t('partnership.p2')}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('benefits.title')}
            subtitle={t('benefits.subtitle')}
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, key }) => (
              <div key={key} className="border border-[var(--paper-200)] bg-white p-6">
                <Icon size={24} className="text-[var(--accent)]" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-[var(--ink-900)]">{t(`benefits.items.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{t(`benefits.items.${key}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('who.title')}
            subtitle={t('who.subtitle')}
          />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ul className="grid gap-3 sm:grid-cols-2">
                {whoCanApply.map((who) => (
                  <li
                    key={who}
                    className="flex items-center gap-3 border border-[var(--paper-200)] px-4 py-3 text-sm text-[var(--ink-900)]"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 bg-[var(--accent)]" aria-hidden="true" />
                    {t(`who.list.${who}`)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <p className="body-lg text-[var(--ink-700)]">
                {t('who.body')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-50 py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title={t('steps.title')} subtitle={t('steps.subtitle')} centered />
          {/* Numbered because these genuinely are sequential — you cannot start
              learning before selection. */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ number, key }) => (
              <div key={number} className="border-t-2 border-[var(--ink-900)] pt-5">
                <span className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">{number}</span>
                <h3 className="mt-3 text-lg font-semibold text-[var(--ink-900)]">{t(`steps.items.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{t(`steps.items.${key}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('pathways.title')}
            subtitle={t('pathways.subtitle')}
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pathways.map(({ icon: Icon, key }) => (
              <div key={key} className="border border-[var(--paper-200)] p-6">
                <Icon size={24} className="text-[var(--accent)]" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-[var(--ink-900)]">{t(`pathways.items.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{t(`pathways.items.${key}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment. Encouraging, not threatening — the point is that places are
          scarce, not that scholars are on probation. */}
      <section className="bg-[var(--ink-900)] py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="display-lg mb-4 leading-tight text-white">
              {t('commitment.title')}
            </h2>
            <p className="body-lg text-[var(--on-dark-muted)]">
              {t('commitment.p1')}
            </p>
            <p className="mt-4 body-lg text-[var(--on-dark-muted)]">
              {t('commitment.p2')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title={t('faq.title')} centered />
          <div className="mx-auto max-w-3xl divide-y divide-[var(--paper-200)] border-y border-[var(--paper-200)]">
            {faqs.map((key) => (
              // <details> rather than JS state: it works without hydration, is
              // keyboard and screen-reader accessible for free, and this page
              // should stay light on a slow connection.
              <details key={key} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-medium text-[var(--ink-900)] marker:content-none">
                  {t(`faqs.${key}.q`)}
                  <span
                    className="shrink-0 font-mono text-lg leading-none text-[var(--accent)] transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-700)]">{t(`faqs.${key}.a`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="display-lg mb-3 leading-tight text-[var(--ink-900)]">
              {t('cta.title')}
            </h2>
            <p className="mb-8 body-lg text-[var(--ink-700)]">
              {t('cta.body')}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <NotifyButton cycleLabel={SCHOLARS_NOTIFY_LABEL} className="btn btn-primary">
                {t('cta.notify')}
              </NotifyButton>
              <Link href="/contact" className="btn btn-outline">
                {t('cta.ask')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
