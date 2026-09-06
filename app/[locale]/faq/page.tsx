import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import { CONTACT_EMAIL, CORPORATION_NUMBER, REGISTERED_ADDRESS_LINE } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('faq')

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

/**
 * Every answer here is checked against the page that owns the fact.
 *
 * This file previously contradicted the rest of the site in five places: it
 * advertised an ESLP application window ("open now", closing 31 May 2026) for
 * a cohort that had already graduated; it listed an Academy catalogue — web
 * development, digital marketing, entrepreneurship — that the Academy page
 * does not teach; it said programmes were "free or low-cost" and "may have a
 * small fee" where /about says all programmes are free; it placed the
 * organisation in Haiti where /about places it in Montreal; and it sent
 * donors to /get-involved to find a Donate button that lives on /donate.
 *
 * When a programme's dates or catalogue change, change them on the programme
 * page and then here. An answer that has drifted from its programme page is
 * worse than no answer.
 *
 * The wording itself lives in messages/<locale>/faq.json; only the order of
 * the categories and the destination of each in-answer link live here. An
 * answer that links somewhere carries an `href`, and its message uses a
 * <link> tag rather than being split in two — several of these links sit
 * mid-sentence, where splitting would hand a translator two half-sentences
 * and no way to reorder them.
 */
type FaqQuestion = { key: string; href?: string }
type FaqCategory = { key: string; questions: readonly FaqQuestion[] }

const faqs: readonly FaqCategory[] = [
  {
    key: 'general',
    questions: [
      { key: 'whatIs' },
      { key: 'where' },
      { key: 'who' },
      { key: 'cost' },
      { key: 'funding' },
    ],
  },
  {
    key: 'academy',
    questions: [
      { key: 'teaches' },
      { key: 'free' },
      { key: 'certificate' },
      { key: 'requirements' },
    ],
  },
  {
    key: 'code',
    questions: [{ key: 'whatIs' }, { key: 'creole' }, { key: 'outcome' }],
  },
  {
    key: 'eslp',
    questions: [
      { key: 'whatIs' },
      { key: 'applications', href: '/eslp' },
      { key: 'cost' },
      { key: 'application' },
    ],
  },
  {
    key: 'scholars',
    questions: [{ key: 'whatIs' }, { key: 'applyNow', href: '/coursera-scholars' }],
  },
  {
    key: 'volunteering',
    questions: [
      { key: 'how', href: '/get-involved' },
      { key: 'partner', href: '/get-involved' },
      { key: 'teach' },
    ],
  },
  {
    key: 'donations',
    questions: [{ key: 'how', href: '/donate' }, { key: 'taxDeductible' }, { key: 'use' }],
  },
  {
    key: 'contact',
    questions: [{ key: 'reach', href: '/contact' }, { key: 'keepUp' }],
  },
]

export default async function FAQPage({
  params,
}: {
  params: { locale: string }
}) {
  // Required for static rendering under [locale]: without it next-intl
  // has no locale outside a request and falls back to the default.
  setRequestLocale(params.locale)

  const t = await getTranslations('faq')

  // Facts, not copy. The corporation number, the registered address, and the
  // contact address stay in lib/site.ts and are interpolated into whichever
  // answer needs them, so no locale can assert a different registration.
  const facts = {
    email: CONTACT_EMAIL,
    number: CORPORATION_NUMBER,
    address: REGISTERED_ADDRESS_LINE,
  }

  return (
    <>
      <Hero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage="/edlight_academy_group.webp"
      />

      <section className="py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl space-y-14 sm:space-y-16">
            {faqs.map(({ key: category, questions }) => (
              <div key={category}>
                <h2 className="eyebrow text-[var(--accent)] mb-6 pb-3 border-b border-[var(--paper-200)]">
                  {t(`categories.${category}.title`)}
                </h2>
                <dl className="space-y-7">
                  {questions.map(({ key, href }) => {
                    const path = `categories.${category}.questions.${key}`
                    return (
                      <div key={key}>
                        <dt className="text-base sm:text-lg font-semibold text-[var(--ink-900)] mb-2">
                          {t(`${path}.question`)}
                        </dt>
                        <dd className="text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
                          {href ? (
                            t.rich(`${path}.answer`, {
                              ...facts,
                              link: (chunks) => (
                                <Link href={href} className="underline underline-offset-4">
                                  {chunks}
                                </Link>
                              ),
                            })
                          ) : (
                            t(`${path}.answer`, facts)
                          )}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="border border-[var(--paper-200)] bg-[var(--paper-100)] p-8 sm:p-12 text-center">
            <SectionHeader
              title={t('cta.title')}
              subtitle={t('cta.subtitle')}
              centered
              className="mb-8"
            />
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
              >
                {t('cta.contact')}
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center justify-center border border-[var(--ink-900)] px-6 py-3 text-sm font-medium text-[var(--ink-900)] transition-colors hover:bg-[var(--paper-200)]"
              >
                {t('cta.email', { email: CONTACT_EMAIL })}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
