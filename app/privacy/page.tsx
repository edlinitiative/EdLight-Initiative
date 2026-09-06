import { Metadata } from 'next'

import { CONTACT_EMAIL, CORPORATION_NUMBER, REGISTERED_ADDRESS_LINE, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy | EdLight Initiative',
  description: 'Learn how EdLight Initiative collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: September 2, 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            EdLight Initiative (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
            visit our website or use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
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
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Information You Give Us</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We only collect personal information that you type into one of our forms. There are four:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li><strong>Contact form:</strong> your name, email address, the subject and area of interest you select, and your message</li>
            <li><strong>Newsletter signup:</strong> your email address only</li>
            <li><strong>ESLP notification list:</strong> your name, email address, and phone number if you choose to give one, so we can tell you when applications open</li>
            <li><strong>Website quote request:</strong> your name, email address, organisation, existing website, and the project details you describe</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            All four forms are delivered to our inbox as email by <strong>Resend</strong>, our email
            provider. Subscribing to the newsletter or a notification list also sends you a
            confirmation email. Nothing you submit is written to a database or stored on this
            website; the record is the message in our inbox, and you can ask us to delete yours at
            any time.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            We do not ask for payment information anywhere on this site, and we never see your card
            details. All programmes are free, so there is nothing to pay for; donations are handled
            entirely by PayPal, as described in section 4.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Automatically Collected Information</h3>
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
              tag. Say that Google Analytics and Google Ads measurement set
              cookies on your device, that they record pages viewed, approximate
              location derived from IP, and actions such as form submissions,
              and that Google processes this as a third party under its own
              privacy policy. Do not add that text before the tag ships: a
              policy claiming cookies the site never sets is its own problem. */}
          <p className="text-gray-700 leading-relaxed">
            This site does not use analytics, advertising, or tracking cookies, and it does not
            build a profile of your browsing. Like any website, our hosting provider automatically
            logs basic technical information with each request — your IP address, browser type, and
            the page requested — which is used to serve the site, keep it secure, and diagnose
            faults. If we introduce analytics or advertising measurement in future, we will update
            this policy and the &quot;Last Updated&quot; date before doing so.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>To provide, operate, and maintain our services</li>
            <li>To process registrations and applications</li>
            <li>To send you newsletters and updates (with your consent)</li>
            <li>To respond to your inquiries and provide customer support</li>
            {/* Was "To process donations and payments". We process neither —
                PayPal does. All we do with a donation is acknowledge it. */}
            <li>To acknowledge and keep a record of donations</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
            <li>To protect against fraud and ensure security</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share your 
            information in the following circumstances:
          </p>
          {/* "Trusted third-party service providers (e.g., payment processors,
              email service providers)" named nobody, so a reader could not tell
              which companies actually receive their data or go read those
              companies' policies. There are only three, and two of them are the
              ones people ask about — who takes the card, and who Coursera is to
              us. Naming them costs a line each. */}
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li><strong>Resend:</strong> our email provider, which delivers every form submission and every email we send you on our behalf</li>
            <li><strong>PayPal:</strong> which processes donations on its own site. You enter your payment details with PayPal, not with us; we receive only the donation record PayPal shows us, never your card or bank details</li>
            <li><strong>Coursera:</strong> for learners selected as EdLight Scholars, we share the details needed to create your Coursera account under our Social Impact partnership. This applies only if you apply and are selected; Coursera then handles your account under its own privacy policy</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            <li><strong>With Your Consent:</strong> When you have given us explicit permission</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
          {/* Opened with "We use cookies and similar tracking technologies to
              track activity on our website" and warned that refusing cookies
              would break parts of the site. Both were false: nothing in this
              codebase sets a cookie, and every page works with cookies fully
              disabled. Telling people you track them when you do not is not a
              safe default — it invites a consent-banner question that does not
              apply, and it is the kind of copied-in claim a reviewer checks
              against the actual page. See the note in section 2 before adding
              a Google tag; this section changes with it. */}
          <p className="text-gray-700 leading-relaxed">
            We do not use cookies on this website. We set no cookies of our own and load no
            third-party analytics or advertising scripts, so there is nothing here for you to accept
            or refuse, and the site works normally with cookies disabled in your browser. Note that
            PayPal and Coursera do use cookies on their own sites once you follow a link to them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your personal 
            information. However, no method of transmission over the Internet or electronic storage is 100% 
            secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. How Long We Keep Information</h2>
          {/* The policy previously said nothing about retention while section 8
              offered a deletion right, which left the partner convention (which
              relies on keeping participation records for the alumni network)
              contradicting this page. Retention is stated here as the default,
              with the statutory rights left intact in section 8. */}
          <p className="text-gray-700 leading-relaxed mb-4">
            We keep information for as long as it is needed for the purpose it was collected for.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>
              <strong>Programme participants.</strong> If you are selected for one of our programmes —
              including the EdLight Scholars Program and ESLP — we keep your participation record after
              your cohort ends. We use it to follow your progress, to report the programme&apos;s impact to
              our funders and partners, and to keep you part of the EdLight alumni network. Taking part in a
              programme includes agreeing to this.
            </li>
            <li>
              <strong>Enquiries and messages.</strong> Kept while we handle your message and for a
              reasonable period afterwards as a record of the exchange.
            </li>
            <li>
              <strong>Notify lists.</strong> Kept until you unsubscribe, or until the cycle you signed up
              for has passed.
            </li>
            <li>
              <strong>Donation records.</strong> Kept for as long as Canadian charitable and tax
              record-keeping rules require.
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            You can ask us to stop sending you communications at any time. We will act on that without
            deleting your participation record.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Depending on your location, you may have the following rights:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Objection to processing</li>
            <li>Withdrawal of consent</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            These rights are not absolute. Where we have a continuing legitimate interest or a legal
            obligation — for example the record that you took part in and completed a programme, or
            records we must keep for charitable reporting — we may retain some information after a
            deletion request. If that happens we will tell you what we kept and why.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            To exercise these rights, please contact us at {CONTACT_EMAIL}, or write to us at the
            address in section 13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children&apos;s Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Our services are not directed to children under 13, and we do not knowingly collect personal
            information from them. Some of our programmes accept participants aged 16 and over. Where a
            participant is under the age of majority, we rely on their school or the parent or guardian to
            confirm they may take part and that their information may be shared with us. If you are a parent
            or guardian and believe your child has provided us with personal information, please contact us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Third-Party Links</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website may contain links to third-party websites. We are not responsible for the privacy 
            practices of these websites. We encourage you to read the privacy policies of any third-party 
            sites you visit.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. International Data Transfers</h2>
          <p className="text-gray-700 leading-relaxed">
            Your information may be transferred to and maintained on servers located outside of your state, 
            province, country, or other governmental jurisdiction where data protection laws may differ. 
            By using our services, you consent to this transfer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
            the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          {/* An email address alone is not a usable route for a data-protection
              request. Section 8 invites people to exercise access and deletion
              rights, and those requests are the ones most likely to need a
              postal address — a reader in that position had nowhere to send a
              letter, and no way to see which country's regulator covers us.
              Address and corporation number come from lib/site.ts so this block
              and the footer state the same thing. */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700"><strong>EdLight Initiative</strong></p>
            <p className="text-gray-700">Corporation No. {CORPORATION_NUMBER}</p>
            <p className="text-gray-700">{REGISTERED_ADDRESS_LINE}</p>
            <p className="text-gray-700">Email: {CONTACT_EMAIL}</p>
            <p className="text-gray-700">Website: {SITE_URL.replace('https://', '')}</p>
          </div>
        </section>
      </div>
    </main>
  )
}
