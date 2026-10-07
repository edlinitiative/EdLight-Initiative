import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ANALYTICS_ENABLED } from '@/lib/analytics'
import { CONTACT_EMAIL, CORPORATION_NUMBER, REGISTERED_ADDRESS_LINE, SITE_URL } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('privacy')

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

// Structure stays in the component, wording lives in messages/<locale>/privacy.json.
// These are the list orders; the copy is looked up by key.
const FORM_KEYS = ['contact', 'newsletter', 'eslp', 'quote'] as const

const USE_KEYS = [
  'operate',
  'registrations',
  'newsletters',
  'inquiries',
  'donations',
  'improve',
  'legal',
  'fraud',
] as const

// Google is listed only while the GA tag is on (see the note in section 2).
const SHARING_KEYS = [
  'resend',
  'paypal',
  'coursera',
  'datacamp',
  ...(ANALYTICS_ENABLED ? (['google'] as const) : []),
  'legal',
  'business',
  'consent',
] as const

const RETENTION_KEYS = ['participants', 'enquiries', 'notify', 'donations'] as const

const RIGHT_KEYS = [
  'access',
  'correction',
  'deletion',
  'restriction',
  'portability',
  'objection',
  'withdrawal',
] as const

export default async function PrivacyPage({
  params,
}: {
  params: { locale: string }
}) {
  // Required for static rendering under [locale]: without it next-intl
  // has no locale outside a request and falls back to the default.
  setRequestLocale(params.locale)

  const t = await getTranslations('privacy')

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{t('title')}</h1>
        <p className="text-sm text-gray-600 mb-2">{t('lastUpdated')}</p>
        {/* Shown in every locale, English included: a reader who lands on a
            translation has to know which text actually binds, and a reader on
            the English page has to know that other versions exist and do not.
            A notice only the translations carry says nothing to the version
            that governs. */}
        <p className="text-xs text-gray-500 mb-8">{t('precedenceNotice')}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s1.heading')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('s1.body')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s2.heading')}</h2>
          {/* This section used to be a generic list — "register for our programs",
              "participate in surveys", and a catch-all sentence ending in
              "payment information" — that matched no form on the site. There
              are exactly four forms, each collects a known set of fields, and
              two of them behave differently from the other two, which is the
              part a reader actually needs. It also claimed we collect payment
              information; we never have. Donations leave the site for PayPal
              before any card number is typed, and there is nothing else to pay
              for, so the sentence invented a category of data we do not hold.
              Enumerate the real forms instead: a policy that overstates is as
              hard to rely on as one that understates. */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('s2.giveUsHeading')}</h3>
          <p className="text-gray-700 leading-relaxed mb-4">{t('s2.giveUsIntro')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            {FORM_KEYS.map((key) => (
              <li key={key}>
                <strong>{t(`s2.forms.${key}.label`)}</strong> {t(`s2.forms.${key}.text`)}
              </li>
            ))}
          </ul>
          {/* Resend sits mid-sentence, so splitting the paragraph into two keys
              would hand a translator half a clause. t.rich keeps the sentence
              whole and the <strong> out of the catalogue. */}
          <p className="text-gray-700 leading-relaxed mt-4">
            {t.rich('s2.delivery', {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">{t('s2.noPayment')}</p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{t('s2.autoHeading')}</h3>
          {/* TWO VERSIONS, switched by the same value that switches the tag.
              ANALYTICS_ENABLED (lib/analytics.ts) is true only when
              NEXT_PUBLIC_GA_MEASUREMENT_ID is set at build time, and the root
              layout renders the GA4 tag (components/Analytics.tsx) on exactly
              that condition. So this paragraph, section 4's Google entry and
              section 5 always describe what the build actually loads; never
              hardcode either version.

              Off (autoBody): no analytics, no advertising, no tracking cookies;
              the only automatic collection is the host's request logging. This
              was verified against the source when it was written: no Google
              tag, no Tag Manager, no Vercel Analytics, no analytics dependency.

              On (autoBodyAnalytics): GA4 + Google Ads measurement set cookies,
              record pages viewed, referral source, device, approximate location
              from IP and the three conversion events (donate_click,
              generate_lead, program_click), with no form contents sent; ad
              storage and ad personalisation are denied by Consent Mode and
              Google signals is off. If any of that changes in Analytics.tsx —
              a new event that could carry personal data, ad_storage granted,
              remarketing turned on, a consent banner added — this text, section
              4 and section 5 change in the same commit, in every locale.

              Do not add a second tracker (Meta pixel, Tag Manager container,
              Vercel Analytics) without the same treatment. And when the env var
              is first set in production, bump lastUpdated: the policy a visitor
              sees changes that day. */}
          <p className="text-gray-700 leading-relaxed">
            {ANALYTICS_ENABLED ? t('s2.autoBodyAnalytics') : t('s2.autoBody')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s3.heading')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('s3.intro')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            {USE_KEYS.map((key) => (
              <li key={key}>{t(`s3.uses.${key}`)}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s4.heading')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('s4.intro')}</p>
          {/* "Trusted third-party service providers (e.g., payment processors,
              email service providers)" named nobody, so a reader could not tell
              which companies actually receive their data or go read those
              companies' policies. There are only three, and two of them are the
              ones people ask about — who takes the card, and who Coursera and
              DataCamp are to us. Naming them costs a line each. */}
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            {SHARING_KEYS.map((key) => (
              <li key={key}>
                <strong>{t(`s4.items.${key}.label`)}</strong> {t(`s4.items.${key}.text`)}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s5.heading')}</h2>
          {/* Originally opened with "We use cookies and similar tracking
              technologies to track activity on our website" when nothing set a
              cookie: a copied-in claim a reviewer checks against the page. It
              then swung to "we do not use cookies", which was also wrong —
              components/LanguageSwitcher.tsx sets NEXT_LOCALE when someone picks
              a language. Both versions now name that cookie. The analytics
              version is selected by the same ANALYTICS_ENABLED switch as the
              tag; see the note in section 2. */}
          <p className="text-gray-700 leading-relaxed">
            {ANALYTICS_ENABLED ? t('s5.bodyAnalytics') : t('s5.body')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s6.heading')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('s6.body')}</p>
        </section>

        <section className="mb-8">
          {/* Retention is stated as the default here so the partner convention,
              which relies on keeping participation records for the alumni
              network, does not contradict this page. The statutory rights stay
              intact in the next section. */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s7.heading')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('s7.intro')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            {RETENTION_KEYS.map((key) => (
              <li key={key}>{t(`s7.items.${key}`)}</li>
            ))}
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">{t('s7.note')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s8.heading')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('s8.intro')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            {RIGHT_KEYS.map((key) => (
              <li key={key}>{t(`s8.rights.${key}`)}</li>
            ))}
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">{t('s8.limits')}</p>
          <p className="text-gray-700 leading-relaxed mt-4">
            {t('s8.exercise', { email: CONTACT_EMAIL })}
          </p>
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
          <p className="text-gray-700 leading-relaxed mb-4">{t('s13.intro')}</p>
          {/* An email address alone is not a usable route for a data-protection
              request. Section 8 invites people to exercise access and deletion
              rights, and those requests are the ones most likely to need a
              postal address — a reader in that position had nowhere to send a
              letter, and no way to see which country's regulator covers us.
              Address and corporation number come from lib/site.ts so this block
              and the footer state the same thing, and so that no locale can end
              up asserting a different registration. */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700"><strong>{t('s13.orgName')}</strong></p>
            <p className="text-gray-700">{t('s13.corporationLine', { number: CORPORATION_NUMBER })}</p>
            <p className="text-gray-700">{REGISTERED_ADDRESS_LINE}</p>
            <p className="text-gray-700">{t('s13.emailLine', { email: CONTACT_EMAIL })}</p>
            <p className="text-gray-700">
              {t('s13.websiteLine', { website: SITE_URL.replace('https://', '') })}
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
