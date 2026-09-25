import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart, Handshake, Users } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import HomeHero from '@/components/home/HomeHero'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import AudiencePaths, { type Audience } from '@/components/home/AudiencePaths'
import testimonialsData from '@/data/testimonials.json'
import partnersData from '@/data/partners.json'
import { FOUNDED_YEAR, REGISTERED_YEAR } from '@/lib/site'

// The homepage reads as a story in short chapters: who is this for (the
// "I am a…" selector), why EdLight exists, then Learn, Lead, Go further and
// Join. Each chapter is one photo and a few sentences that end in a link to
// that programme's own page, so the page shows everything on offer without
// being the whole site. There are no stat cards: the facts sit in the copy.
//
// Wording is in messages/<locale>/home.json under `story`.

const SCHOLARS_STUDENT_URL = 'https://apply.edlight.org/scholars/individuals'
const SCHOLARS_INSTITUTION_URL = 'https://apply.edlight.org/scholars/institutions'

// Which programmes each audience sees, and where each one goes. The wording
// for every item is home.story.audiences.<audience>.items.<item>.
const audienceRoutes: Record<string, Record<string, string>> = {
  student: { academy: '/academy', code: '/code', eslp: '/eslp' },
  university: { scholars: '/coursera-scholars', code: '/code' },
  partner: { scholars: SCHOLARS_INSTITUTION_URL, partner: '/get-involved', speak: '/get-involved' },
  supporter: { donate: '/donate', volunteer: '/get-involved', contact: '/contact' },
}

const chapters = ['why', 'learn', 'lead', 'further', 'join'] as const

function Eyebrow({ index, label }: { index: number; label: string }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
      {String(index).padStart(2, '0')} · {label}
    </p>
  )
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]"
    >
      {children}
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}

function Photo({ src, alt, className = '', priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[4px] bg-[var(--paper-200)] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 560px, 100vw"
        className="object-cover"
      />
    </div>
  )
}

export default async function HomePage({
  params,
}: {
  params: { locale: string }
}) {
  // Required for static rendering under [locale]: without it next-intl
  // has no locale outside a request and falls back to the default.
  setRequestLocale(params.locale)

  const t = await getTranslations('home')

  const audiences: Audience[] = Object.entries(audienceRoutes).map(([key, items]) => ({
    key,
    label: t(`story.audiences.${key}.label`),
    items: Object.entries(items).map(([item, href]) => ({
      href,
      title: t(`story.audiences.${key}.items.${item}.title`),
      body: t(`story.audiences.${key}.items.${item}.body`),
      cta: t(`story.audiences.${key}.items.${item}.cta`),
    })),
  }))

  return (
    <>
      {/* Opening: a full-bleed photo hero, with the partners as its credibility line */}
      <HomeHero
        eyebrow={t('hero.eyebrow', { year: String(FOUNDED_YEAR), registered: String(REGISTERED_YEAR) })}
        eyebrowShort={t('hero.eyebrowShort', { year: String(FOUNDED_YEAR) })}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="/edlight_academy_group.webp"
        partnersLabel={t('story.heroPartners')}
        partners={partnersData}
      >
        <Link
          href="/#programmes"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-white px-7 py-3.5 text-sm font-medium text-[var(--ink-900)] transition-colors hover:bg-[var(--paper-100)] sm:w-auto sm:text-base"
        >
          {t('hero.explorePrograms')}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/get-involved"
          className="inline-flex w-full items-center justify-center gap-2 rounded-[4px] border border-white/40 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/10 sm:w-auto sm:text-base"
        >
          {t('hero.supportUs')}
        </Link>
      </HomeHero>

      {/* "I am a…": every visitor finds what is for them, straight after the hero.
          #programmes is where the hero button and the About page's
          "Explore our programmes" land. */}
      <section id="programmes" className="scroll-mt-24 border-b border-[var(--paper-200)] bg-[var(--paper-50)] py-10 sm:py-12">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <AudiencePaths label={t('story.iAm')} hint={t('story.audienceHint')} audiences={audiences} />
        </div>
      </section>

      {/* Chapter bar: sticks under the navbar while the story scrolls */}
      <nav
        aria-label={t('story.chaptersLabel')}
        className="sticky top-16 z-30 border-b border-[var(--paper-200)] bg-[var(--nav-surface)] backdrop-blur-md"
      >
        <ol className="mx-auto flex max-w-[1200px] gap-5 overflow-x-auto px-6 py-3 text-sm lg:px-10">
          {chapters.map((key, i) => (
            <li key={key} className="shrink-0">
              <a href={`#${key}`} className="text-[var(--ink-700)] transition-colors hover:text-[var(--accent)]">
                <span className="mr-1.5 text-xs tabular-nums text-[var(--ink-400)]">{String(i + 1).padStart(2, '0')}</span>
                {t(`story.chapters.${key}`)}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* 01 Why we exist */}
      <section id="why" className="scroll-mt-32 py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 lg:grid-cols-2 lg:gap-14 lg:px-10">
          <Photo src="/about_us.webp" alt="" className="aspect-[4/3]" />
          <div>
            <Eyebrow index={1} label={t('story.chapters.why')} />
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] lg:text-[1.4rem] xl:text-[1.7rem]">
              {t('story.why.title')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-700)]">{t('story.why.body')}</p>
            <div className="mt-6">
              <TextLink href="/about">{t('story.why.link')}</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Learn: the two learning platforms, side by side */}
      <section id="learn" className="scroll-mt-32 border-t border-[var(--paper-200)] bg-[var(--paper-100)] py-14 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="max-w-2xl">
            <Eyebrow index={2} label={t('story.chapters.learn')} />
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] lg:text-[1.4rem] xl:text-[1.7rem]">
              {t('story.learn.title')}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--ink-700)]">{t('story.learn.body')}</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {([
              { key: 'academy', name: 'EdLight Academy', href: '/academy', img: '/EdLight_Academy.webp' },
              { key: 'code', name: 'EdLight Code', href: '/code', img: '/labs_pics.webp' },
            ] as const).map((p) => (
              <article key={p.key} className="flex flex-col overflow-hidden rounded-[4px] border border-[var(--paper-200)] bg-white">
                <Photo src={p.img} alt="" className="aspect-[16/9] rounded-none" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-[var(--ink-900)]">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-700)]">{t(`story.learn.${p.key}`)}</p>
                  <div className="mt-5">
                    <TextLink href={p.href}>{t(`story.learn.${p.key}Cta`)}</TextLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 Lead: ESLP, told as the 2026 cohort's story */}
      <section id="lead" className="scroll-mt-32 border-t border-[var(--paper-200)] py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 lg:grid-cols-2 lg:gap-14 lg:px-10">
          <div className="lg:order-2">
            <Photo src="/gallery/eslp-2026-graduation-promotion.webp" alt={t('story.lead.alt')} className="aspect-[3/2]" />
          </div>
          <div>
            <Eyebrow index={3} label={t('story.chapters.lead')} />
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] lg:text-[1.4rem] xl:text-[1.7rem]">
              {t('story.lead.title')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-700)]">{t('story.lead.body')}</p>
            <p className="mt-3 text-sm text-[var(--ink-700)]">{t('story.lead.note')}</p>
            <div className="mt-6">
              <TextLink href="/eslp">{t('story.lead.cta')}</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* 04 Go further: EdLight Scholars */}
      <section id="further" className="scroll-mt-32 border-t border-[var(--paper-200)] bg-[var(--paper-100)] py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 lg:grid-cols-2 lg:gap-14 lg:px-10">
          <Photo src="/Best_Participant_Award.webp" alt="" className="aspect-[4/3] [&_img]:object-[center_30%]" />
          <div>
            <Eyebrow index={4} label={t('story.chapters.further')} />
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[var(--ink-900)] lg:text-[1.4rem] xl:text-[1.7rem]">
              {t('story.further.title')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-700)]">{t('story.further.body')}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-6">
              <TextLink href={SCHOLARS_STUDENT_URL}>{t('story.further.studentCta')}</TextLink>
              <TextLink href={SCHOLARS_INSTITUTION_URL}>{t('story.further.partnerCta')}</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* Voices */}
      <section className="border-t border-[var(--paper-200)] py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <h2 className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            {t('story.voices.title')}
          </h2>
          <TestimonialCarousel testimonials={testimonialsData} />
        </div>
      </section>

      {/* 05 Join */}
      {/* -mb-16 cancels the footer's mt-16 so the navy band meets the navy footer. */}
      <section id="join" className="-mb-16 scroll-mt-32 bg-[var(--accent)] py-14 text-white sm:py-16">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
              05 · {t('story.chapters.join')}
            </p>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{t('story.join.title')}</h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">{t('story.join.body')}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-white px-6 py-3 text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--paper-100)]"
            >
              <Heart size={16} />
              {t('story.join.donate')}
            </Link>
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Handshake size={16} />
              {t('story.join.partner')}
            </Link>
            <Link
              href="/get-involved"
              className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Users size={16} />
              {t('story.join.volunteer')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
