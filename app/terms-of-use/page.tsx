import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import {
  AREA_SERVED,
  CONTACT_EMAIL,
  CORPORATION_NUMBER,
  REGISTERED_ADDRESS_LINE,
  SITE_URL,
} from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('terms')

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

// List orders live here; the wording lives in messages/<locale>/terms.json.
const ACCOUNT_KEYS = ['credentials', 'activities', 'notify', 'accurate'] as const

const PROHIBITED_KEYS = [
  'illegal',
  'laws',
  'rights',
  'malware',
  'access',
  'harass',
  'impersonate',
  'harvest',
] as const

const LICENSE_KEYS = ['modify', 'commercial', 'notices'] as const

const DISCLAIMER_KEYS = ['merchantability', 'accuracy', 'uninterrupted', 'viruses'] as const

export default async function TermsPage() {
  const t = await getTranslations('terms')

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{t('title')}</h1>
        <p className="text-sm text-gray-600 mb-2">{t('lastUpdated')}</p>
        {/* Shown in every locale, English included. These Terms are a contract:
            a reader accepting them has to know which language version is the
            one they are accepting, and that is as true on the English page —
            which is the binding one — as on a translation. */}
        <p className="text-xs text-gray-500 mb-8">{t('precedenceNotice')}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s1.heading')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('s1.body')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s2.heading')}</h2>
          {/* Said "a non-profit organization" with no jurisdiction and no
              registration number. That is the vaguest true thing we could have
              written: it does not say which country's law made us a legal
              person, which is exactly what a reader has to know before the
              governing-law clause in section 13 means anything. It also let the
              page be read as a Haitian entity, since Haiti is the only place
              this document used to name. We are registered in Canada and we
              work in Haiti — both facts, stated together, from lib/site.ts so
              the footer and this page cannot drift apart, and interpolated
              rather than translated so no locale can state a different one. */}
          <p className="text-gray-700 leading-relaxed">
            {t('s2.body', {
              number: CORPORATION_NUMBER,
              address: REGISTERED_ADDRESS_LINE,
              area: AREA_SERVED,
            })}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s3.heading')}</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('s3.eligibilityHeading')}</h3>
          <p className="text-gray-700 leading-relaxed mb-4">{t('s3.eligibilityBody')}</p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('s3.accountHeading')}</h3>
          <p className="text-gray-700 leading-relaxed mb-4">{t('s3.accountIntro')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            {ACCOUNT_KEYS.map((key) => (
              <li key={key}>{t(`s3.account.${key}`)}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{t('s3.prohibitedHeading')}</h3>
          <p className="text-gray-700 leading-relaxed mb-4">{t('s3.prohibitedIntro')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            {PROHIBITED_KEYS.map((key) => (
              <li key={key}>{t(`s3.prohibited.${key}`)}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s4.heading')}</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('s4.ourContentHeading')}</h3>
          <p className="text-gray-700 leading-relaxed mb-4">{t('s4.ourContentBody')}</p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('s4.licenseHeading')}</h3>
          <p className="text-gray-700 leading-relaxed mb-4">{t('s4.licenseIntro')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            {LICENSE_KEYS.map((key) => (
              <li key={key}>{t(`s4.license.${key}`)}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{t('s4.userContentHeading')}</h3>
          <p className="text-gray-700 leading-relaxed">{t('s4.userContentBody')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s5.heading')}</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('s5.registrationHeading')}</h3>
          <p className="text-gray-700 leading-relaxed mb-4">{t('s5.registrationBody')}</p>

          {/* Was "Fees and Payments": "Some programs may require fees. All fees
              are non-refundable... Payment must be made in advance of program
              participation." None of that is true and none of it ever was.
              Every programme is free — the homepage, the FAQ, the Coursera
              Scholars page ("there is never an application fee") and the footer
              all say so. A prospective student reading the Terms found the one
              page on the site telling them they might be billed, and a
              reviewer checking whether a free-education claim holds up found
              the same contradiction. Deleting the clause is not enough; the
              silence would still leave the question open, so the section now
              answers it — in every locale. */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('s5.noFeesHeading')}</h3>
          <p className="text-gray-700 leading-relaxed">{t('s5.noFeesBody')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s6.heading')}</h2>
          {/* Ended with "Donors will receive acknowledgment for tax purposes
              where applicable." Being a not-for-profit corporation is not the
              same as being a registered charity, and we are only the first.
              We hold no charitable registration and cannot issue a tax receipt
              to anyone, so "where applicable" was doing the work of a
              disclaimer while reading as a promise — the reader most likely to
              rely on it is the one about to give money. Say plainly that no
              receipt is coming, before the donation, not after. The same answer
              appears on /donate and /faq; keep all three in step. */}
          <p className="text-gray-700 leading-relaxed">{t('s6.body')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s7.heading')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('s7.body')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s8.heading')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('s8.intro')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            {DISCLAIMER_KEYS.map((key) => (
              <li key={key}>{t(`s8.items.${key}`)}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s9.heading')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('s9.body')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s10.heading')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('s10.body')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s11.heading')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('s11.body')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s12.heading')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('s12.body')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s13.heading')}</h2>
          {/* Named the laws of Haiti and the courts of Haiti. That is where our
              students are, not where the corporation is — we are incorporated
              in Canada and based in Quebec, and Haiti's courts have no
              jurisdiction over a Canadian corporation on the strength of a
              clause we wrote ourselves. As drafted the clause pointed at a
              forum that could not hear the dispute, which makes it worse than
              having none. Quebec is both the seat of the corporation and the
              province whose law actually governs it. Every translation of this
              clause must name Quebec and Canada, never Haiti. */}
          <p className="text-gray-700 leading-relaxed">{t('s13.body')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s14.heading')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('s14.body')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s15.heading')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('s15.intro')}</p>
          {/* Email and a bare domain were the only way to reach the entity
              behind these Terms. A governing-law clause naming Quebec is not
              checkable against an address the page never gives, and a reader
              deciding whether to accept the Terms should not have to take the
              jurisdiction on faith. The registered address closes that gap. */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700"><strong>{t('s15.orgName')}</strong></p>
            <p className="text-gray-700">{t('s15.corporationLine', { number: CORPORATION_NUMBER })}</p>
            <p className="text-gray-700">{REGISTERED_ADDRESS_LINE}</p>
            <p className="text-gray-700">{t('s15.emailLine', { email: CONTACT_EMAIL })}</p>
            <p className="text-gray-700">
              {t('s15.websiteLine', { website: SITE_URL.replace('https://', '') })}
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
