import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

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

const SHARING_KEYS = ['resend', 'paypal', 'coursera', 'legal', 'business', 'consent'] as const

const RIGHT_KEYS = [
  'access',
  'correction',
  'deletion',
  'restriction',
  'portability',
  'objection',
  'withdrawal',
] as const

export default async function PrivacyPage() {
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
          {/* Was "we may automatically collect... your web browser, IP address,
              time zone, and cookies... browsing actions and patterns", which
              describes an analytics stack this site does not have. Verified
              against the source before rewriting: there is no Google tag, no
              Google Tag Manager, no Vercel Analytics, no gtag call and no
              analytics dependency in package.json — app/layout.tsx loads two
              JSON-LD blocks and nothing else. The site sets no cookies at all.
              The only automatic collection that genuinely happens is our host's
              standard request logging, so that is what this now says.

              IF YOU ADD GOOGLE ANALYTICS OR A GOOGLE ADS CONVERSION TAG — which
              an Ad Grants account will likely want — this paragraph and section
              5 both become untrue and must be updated in the same change as the
              tag, in every locale. Say that Google Analytics and Google Ads
              measurement set cookies on your device, that they record pages
              viewed, approximate location derived from IP, and actions such as
              form submissions, and that Google processes this as a third party
              under its own privacy policy. Do not add that text before the tag
              ships: a policy claiming cookies the site never sets is its own
              problem. */}
          <p className="text-gray-700 leading-relaxed">{t('s2.autoBody')}</p>
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
              ones people ask about — who takes the card, and who Coursera is to
              us. Naming them costs a line each. */}
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
          {/* Opened with "We use cookies and similar tracking technologies to
              track activity on our website" and warned that refusing cookies
              would break parts of the site. Both were false: nothing in this
              codebase sets a cookie, and every page works with cookies fully
              disabled. Telling people you track them when you do not is not a
              safe default — it invites a consent-banner question that does not
              apply, and it is the kind of copied-in claim a reviewer checks
              against the actual page. See the note in section 2 before adding
              a Google tag; this section changes with it. */}
          <p className="text-gray-700 leading-relaxed">{t('s5.body')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s6.heading')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('s6.body')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s7.heading')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('s7.intro')}</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            {RIGHT_KEYS.map((key) => (
              <li key={key}>{t(`s7.rights.${key}`)}</li>
            ))}
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            {t('s7.exercise', { email: CONTACT_EMAIL })}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('s8.heading')}</h2>
          <p className="text-gray-700 leading-relaxed">{t('s8.body')}</p>
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
          <p className="text-gray-700 leading-relaxed mb-4">{t('s12.intro')}</p>
          {/* An email address alone is not a usable route for a data-protection
              request. Section 7 invites people to exercise access and deletion
              rights, and those requests are the ones most likely to need a
              postal address — a reader in that position had nowhere to send a
              letter, and no way to see which country's regulator covers us.
              Address and corporation number come from lib/site.ts so this block
              and the footer state the same thing, and so that no locale can end
              up asserting a different registration. */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700"><strong>{t('s12.orgName')}</strong></p>
            <p className="text-gray-700">{t('s12.corporationLine', { number: CORPORATION_NUMBER })}</p>
            <p className="text-gray-700">{REGISTERED_ADDRESS_LINE}</p>
            <p className="text-gray-700">{t('s12.emailLine', { email: CONTACT_EMAIL })}</p>
            <p className="text-gray-700">
              {t('s12.websiteLine', { website: SITE_URL.replace('https://', '') })}
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
