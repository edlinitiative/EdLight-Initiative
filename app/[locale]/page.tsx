import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Code2,
  Lightbulb,
  Globe,
  GraduationCap,
  Laptop,
  Users,
  Compass,
  HelpCircle,
  Heart,
} from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import ImpactCounters from '@/components/ImpactCounters'
import PartnerLogoGrid from '@/components/PartnerLogoGrid'
import impactData from '@/data/impact.json'
import testimonialsData from '@/data/testimonials.json'
import partnersData from '@/data/partners.json'
import { FOUNDED_YEAR } from '@/lib/site'

// A single static hero image, rendered through next/image with priority.
// This used to be a 4-image carousel rotating every 5 seconds via CSS
// background-image — unoptimized, un-preloaded, and repainting the whole
// viewport mid-load, which tanked LCP and Speed Index on mobile (the load
// speed the Ad Grants website policy reviews against).
const heroImage = '/edlight_academy_group.webp'

// Four, not five. EdLight Nexus is gone from this list: it has no dates, no
// cohort, and no way to apply, and a card promising a programme that a
// visitor cannot join is the "under construction" page the Ad Grants website
// policy names explicitly. It returns here when there is something to join.
// EdLight Labs is gone for a different reason — it sells commercial web
// services, which does not belong in a list of free student programmes.
//
// Structure here, wording in messages/<locale>/home.json. `key` indexes into
// the `home` namespace — home.ecosystem.programs.academy.title and .description
// — so a translator changes copy without touching this file and a developer
// changes routes and icons without touching a translation.
const ecosystemPrograms = [
  { key: 'academy', icon: <BookOpen size={32} />, href: '/academy' },
  { key: 'code', icon: <Code2 size={32} />, href: '/code' },
  { key: 'scholars', icon: <GraduationCap size={32} />, href: '/coursera-scholars' },
  { key: 'eslp', icon: <Users size={32} />, href: '/eslp' },
] as const

// Every number here can be checked against a page on this site. The three
// that used to be here — 2,500 students served, 45 courses offered, 3 partner
// organisations — could not: the first two are unsupported by anything we
// publish, and 2,500 students a year sat oddly beside ESLP's own record of
// 135 alumni in total.
//
// The numbers stay in data/impact.json and are passed straight through; only
// the labels are translated, and the one date in them is interpolated.
const impactCounters: { key: string; value: number; suffix?: string }[] = [
  { key: 'alumni', value: impactData.eslpAlumni },
  { key: 'subjects', value: impactData.academySubjects + impactData.codeTracks },
  { key: 'partners', value: impactData.partnerOrganizations, suffix: '' },
]

const howItWorks = [
  { key: 'online', icon: <Laptop size={28} /> },
  { key: 'mentors', icon: <Users size={28} /> },
  { key: 'beyond', icon: <Compass size={28} /> },
] as const

// /courses, /global-exchange and /mission_projects were removed. These cards
// now point at the pages that still cover the same ground — deleting them
// outright would have left this section with a single FAQ card in it.
//
// "Scholarships and exchange" used to point at /nexus, which is now noindexed
// for having no cohort or application. It points at Coursera Scholars
// instead, which is the scholarship route students can actually take.
const exploreMore = [
  { key: 'academy', href: '/academy', icon: <BookOpen size={24} /> },
  { key: 'scholars', href: '/coursera-scholars', icon: <Globe size={24} /> },
  { key: 'about', href: '/about', icon: <Lightbulb size={24} /> },
  { key: 'faq', href: '/faq', icon: <HelpCircle size={24} /> },
] as const

export default async function HomePage({
  params,
}: {
  params: { locale: string }
}) {
  // Required for static rendering under [locale]: without it next-intl
  // has no locale outside a request and falls back to the default.
  setRequestLocale(params.locale)

  const t = await getTranslations('home')

  return (
    <>
      {/* Hero Section */}
      <Hero
        eyebrow={t('hero.eyebrow', { year: String(FOUNDED_YEAR) })}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage={heroImage}
        meta={[
          { label: t('hero.meta.programmes'), value: String(ecosystemPrograms.length) },
          { label: t('hero.meta.alumni'), value: `${impactData.eslpAlumni}` },
          { label: t('hero.meta.partners'), value: String(impactData.partnerOrganizations) },
          { label: t('hero.meta.cost'), value: t('hero.meta.costValue') },
        ]}
      >
        <Link
          href="/academy"
          className="group inline-flex items-center justify-center gap-2 bg-white text-[var(--ink-900)] font-medium px-6 py-3 hover:bg-[var(--paper-100)] transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          {t('hero.explorePrograms')}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/get-involved"
          className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/5 text-white font-medium px-6 py-3 hover:bg-white/10 hover:border-white/70 transition-colors text-sm sm:text-base w-full sm:w-auto backdrop-blur-sm"
        >
          {t('hero.supportUs')}
        </Link>
      </Hero>

      {/* Mission & Vision */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title={t('mission.title')}
              subtitle={t('mission.subtitle')}
              centered
            />
            <div className="border border-[var(--paper-200)] bg-[var(--paper-100)] p-6 sm:p-8 space-y-4 text-[var(--ink-700)] leading-relaxed text-sm sm:text-base">
              <p>{t('mission.p1')}</p>
              <p>{t('mission.p2')}</p>
              <p>{t('mission.p3')}</p>
              <p>{t('mission.p4')}</p>
              <p>{t('mission.p5')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('howItWorks.title')}
            subtitle={t('howItWorks.subtitle')}
            centered
          />
          <div className="grid gap-px bg-[var(--paper-200)] sm:grid-cols-3">
            {howItWorks.map(({ key, icon }) => (
              <div key={key} className="bg-[var(--paper-50)] p-6 sm:p-8">
                <div className="text-[var(--accent)] mb-4">{icon}</div>
                <h3 className="text-lg font-semibold text-[var(--ink-900)] mb-3">
                  {t(`howItWorks.items.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--ink-700)]">
                  {t(`howItWorks.items.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Programs */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('ecosystem.title')}
            subtitle={t('ecosystem.subtitle')}
            centered
          />
          <p className="max-w-3xl mx-auto mb-10 text-center text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
            {t('ecosystem.intro')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--paper-200)]">
            {ecosystemPrograms.map((program) => (
              <Card
                key={program.key}
                title={t(`ecosystem.programs.${program.key}.title`)}
                description={t(`ecosystem.programs.${program.key}.description`)}
                icon={program.icon}
                href={program.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Counters */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title={t('impact.title')} subtitle={t('impact.subtitle')} centered />
          <ImpactCounters
            counters={impactCounters.map(({ key, value, suffix }) => ({
              value,
              suffix,
              label: t(`impact.counters.${key}`, { through: impactData.eslpAlumniThrough }),
            }))}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('testimonials.title')}
            subtitle={t('testimonials.subtitle')}
            centered
          />
          <TestimonialCarousel testimonials={testimonialsData} />
        </div>
      </section>

      {/* Partners */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('partners.title')}
            subtitle={t('partners.subtitle')}
            centered
          />
          <PartnerLogoGrid partners={partnersData} />
        </div>
      </section>

      {/* Explore more — surfaces the deeper pages from the homepage */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('explore.title')}
            subtitle={t('explore.subtitle')}
            centered
          />
          <div className="grid gap-px bg-[var(--paper-200)] sm:grid-cols-2">
            {exploreMore.map(({ key, href, icon }) => (
              <Link
                key={href}
                href={href}
                className="group bg-[var(--paper-50)] p-6 sm:p-8 transition-colors hover:bg-[var(--paper-100)]"
              >
                <div className="text-[var(--accent)] mb-3">{icon}</div>
                <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-[var(--ink-900)]">
                  {t(`explore.items.${key}.title`)}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </h3>
                <p className="text-sm leading-relaxed text-[var(--ink-700)]">
                  {t(`explore.items.${key}.body`)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Calls to action */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="border border-[var(--paper-200)] bg-[var(--paper-100)] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--ink-900)] mb-3">
              {t('cta.title')}
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
              {t('cta.body')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/academy"
                className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
              >
                <BookOpen size={16} />
                {t('cta.startCourse')}
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 border border-[var(--ink-900)] px-6 py-3 text-sm font-medium text-[var(--ink-900)] transition-colors hover:bg-[var(--paper-200)]"
              >
                <Heart size={16} />
                {t('cta.donate')}
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center gap-2 border border-[var(--ink-400)] px-6 py-3 text-sm font-medium text-[var(--ink-700)] transition-colors hover:border-[var(--ink-900)] hover:text-[var(--ink-900)]"
              >
                <Users size={16} />
                {t('cta.volunteer')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
