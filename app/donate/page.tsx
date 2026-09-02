import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import { Heart, Users, BookOpen, Laptop, Globe } from 'lucide-react'
import impactData from '@/data/impact.json'
import { CONTACT_EMAIL } from '@/lib/site'

// The same hosted button used by the header CTA and /get-involved. This page
// previously loaded PayPal's JS SDK with a literal 'YOUR_BUTTON_ID' placeholder
// and rendered a <button> with no handler, so the donate action did nothing at
// all. A plain link is server-rendered, crawlable, and works without JS.
const PAYPAL_DONATE_URL = 'https://www.paypal.com/donate/?hosted_button_id=6AKKBQXK47EZU'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('donate')

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

// Icons and ordering stay here; the wording lives in
// messages/<locale>/donate.json, keyed by the `key` field.
//
// The per-amount equivalences that used to sit in these descriptions — "$500
// equips 1 computer workstation", "$50 provides materials for 5 students" —
// were not derived from any cost model we can show a donor. Precise-sounding
// numbers nobody can check are worse for trust than an honest description of
// what the money is for, so the categories stayed and the arithmetic went.
const impactAreas = [
  { key: 'scholarships', icon: <Users size={48} className="text-blue-600" /> },
  { key: 'materials', icon: <BookOpen size={48} className="text-green-600" /> },
  { key: 'platform', icon: <Laptop size={48} className="text-purple-600" /> },
  { key: 'operations', icon: <Globe size={48} className="text-yellow-600" /> },
] as const

// Amounts are facts, not copy: they are passed to the catalogue as ICU values
// so a locale can format the currency its own way ("$25" / "25 $") without
// being able to change the number.
const donationLevels = [
  { key: 'supporter', amount: 25, color: 'bg-blue-100 text-blue-800' },
  { key: 'contributor', amount: 50, color: 'bg-green-100 text-green-800' },
  { key: 'sponsor', amount: 100, color: 'bg-purple-100 text-purple-800' },
  { key: 'patron', amount: 250, color: 'bg-yellow-100 text-yellow-800' },
  { key: 'champion', amount: 500, color: 'bg-red-100 text-red-800' },
] as const

const otherWays = [
  { key: 'monthly', href: '/contact' },
  { key: 'corporate', href: '/contact' },
  { key: 'inKind', href: '/contact' },
] as const

const faqItems = ['tax', 'use', 'memory', 'updates'] as const

export default async function DonatePage() {
  const t = await getTranslations('donate')

  return (
    <>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage="/about_us.webp"
      />

      <main className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Why Donate */}
          <section className="mb-16 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('why.heading')}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {t('why.body')}
              </p>
              {/* These three replace "2,500+ students served annually" and
                  "45+ courses offered", neither of which the organisation can
                  evidence and both of which contradicted ESLP's own alumni
                  record. Each figure below is checkable against a page on this
                  site: the alumni count against the ESLP cohort record, the
                  subject and track counts against the Academy catalogue and
                  code.edlight.org/tracks, and the price against every
                  programme page. Every one of them comes from
                  data/impact.json and is interpolated, never translated. */}
              <div className="bg-blue-50 p-8 rounded-lg">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {impactData.eslpAlumni}
                    </div>
                    <div className="text-gray-700">
                      {t('why.alumniLabel', { through: impactData.eslpAlumniThrough })}
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {t('why.costAmount', { amount: 0 })}
                    </div>
                    <div className="text-gray-700">{t('why.costLabel')}</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {impactData.academySubjects + impactData.codeTracks}
                    </div>
                    <div className="text-gray-700">
                      {t('why.subjectsLabel')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Impact Areas */}
          <section className="mb-16">
            <SectionHeader
              title={t('impact.heading')}
              subtitle={t('impact.subtitle')}
            />
            <div className="grid md:grid-cols-2 gap-8">
              {impactAreas.map(({ key, icon }) => (
                <div key={key} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {t(`impact.areas.${key}.title`)}
                      </h3>
                      <p className="text-gray-700">
                        {t(`impact.areas.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Donation Levels */}
          <section className="mb-16">
            <SectionHeader
              title={t('levels.heading')}
              subtitle={t('levels.subtitle')}
            />
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {donationLevels.map(({ key, amount, color }) => (
                <div key={key} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                  <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3 ${color}`}>
                    {t(`levels.tiers.${key}.title`)}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {t('levels.amount', { amount })}
                  </div>
                  <p className="text-sm text-gray-600">
                    {t(`levels.tiers.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-6">
              {t('levels.custom')}
            </p>
          </section>

          {/* Donation Button */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t('cta.heading')}
                </h2>
                <p className="text-lg text-blue-100 mb-6">
                  {t('cta.subheading')}
                </p>
              </div>
              <div className="flex justify-center">
                <div className="bg-white p-6 rounded-lg">
                  <div className="text-center">
                    <p className="text-gray-700 mb-4">
                      {t('cta.body')}
                    </p>
                    <a
                      href={PAYPAL_DONATE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                    >
                      <Heart className="inline mr-2" size={24} />
                      {t('cta.button')}
                    </a>
                    <p className="text-sm text-gray-500 mt-4">
                      {t('cta.note')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Other Ways to Give */}
          <section className="mb-16">
            <SectionHeader
              title={t('otherWays.heading')}
              subtitle={t('otherWays.subtitle')}
            />
            <div className="grid md:grid-cols-3 gap-8">
              {otherWays.map(({ key, href }) => (
                <div key={key} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t(`otherWays.${key}.title`)}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {t(`otherWays.${key}.body`)}
                  </p>
                  {/* The arrow stays in the layout, not in the catalogue: it is
                      a glyph, not a word, and a translator has no reason to be
                      handed one. */}
                  <a href={href} className="text-blue-600 hover:underline font-semibold">
                    {t(`otherWays.${key}.link`)} →
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <SectionHeader
              title={t('faq.heading')}
              subtitle={t('faq.subtitle')}
            />
            {/* The tax answer is kept deliberately blunt, and worded to match
                the same answer on /faq and section 6 of /terms-of-use. A donor
                who assumes a receipt is coming and discovers otherwise at tax
                time is a worse outcome than one who knows before giving — in
                any language. */}
            <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
              {faqItems.map((key) => (
                <div key={key}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {t(`faq.${key}.question`)}
                  </h3>
                  <p className="text-gray-700">
                    {t(`faq.${key}.answer`, { email: CONTACT_EMAIL })}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Thank You */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-yellow-50 to-blue-50 rounded-lg p-8 md:p-12">
              <Heart size={64} className="text-red-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('thanks.heading')}
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                {t('thanks.body')}
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
