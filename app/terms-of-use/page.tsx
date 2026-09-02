import { Metadata } from 'next'

import {
  AREA_SERVED,
  CONTACT_EMAIL,
  CORPORATION_NUMBER,
  REGISTERED_ADDRESS_LINE,
  SITE_URL,
} from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Use | EdLight Initiative',
  description: 'Terms and conditions for using the EdLight Initiative website and services.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Use</h1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: September 2, 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing and using the EdLight Initiative website and services (&quot;Services&quot;), you accept 
            and agree to be bound by these Terms of Use (&quot;Terms&quot;). If you do not agree to these Terms, 
            please do not use our Services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. About EdLight Initiative</h2>
          {/* Said "a non-profit organization" with no jurisdiction and no
              registration number. That is the vaguest true thing we could have
              written: it does not say which country's law made us a legal
              person, which is exactly what a reader has to know before the
              governing-law clause in section 13 means anything. It also let the
              page be read as a Haitian entity, since Haiti is the only place
              this document used to name. We are registered in Canada and we
              work in Haiti — both facts, stated together, from lib/site.ts so
              the footer and this page cannot drift apart. */}
          <p className="text-gray-700 leading-relaxed">
            EdLight Initiative is a not-for-profit corporation registered in Canada (Corporation
            No. {CORPORATION_NUMBER}), based in {REGISTERED_ADDRESS_LINE}, serving secondary-school
            students in {AREA_SERVED}. Our Services include educational programs, courses, leadership
            training, and community initiatives.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Use of Services</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Eligibility</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            You must be at least 13 years old to use our Services. If you are under 18, you must have 
            parental or guardian consent to use our Services.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Responsibilities</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you create an account, you are responsible for:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
            <li>Providing accurate and complete information</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Prohibited Conduct</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            You agree not to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Use our Services for any illegal purpose</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Transmit viruses, malware, or other harmful code</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Impersonate any person or entity</li>
            <li>Collect or harvest information about other users</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual Property</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Content</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            All content on our website, including text, graphics, logos, images, videos, and software, is the 
            property of EdLight Initiative or our licensors and is protected by copyright, trademark, and other 
            intellectual property laws.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">License to Use</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We grant you a limited, non-exclusive, non-transferable license to access and use our Services for 
            personal, non-commercial purposes. You may not:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Modify, copy, or distribute our content without permission</li>
            <li>Use our content for commercial purposes</li>
            <li>Remove any copyright or proprietary notices</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">User Content</h3>
          <p className="text-gray-700 leading-relaxed">
            By submitting content to our Services (e.g., testimonials, feedback), you grant us a non-exclusive, 
            worldwide, royalty-free license to use, reproduce, modify, and display such content in connection 
            with our Services and promotional activities.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Programs and Courses</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Registration</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Registration for our programs and courses is subject to availability and acceptance. We reserve 
            the right to refuse or cancel any registration at our discretion.
          </p>

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
              answers it. */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">No Fees</h3>
          <p className="text-gray-700 leading-relaxed">
            All EdLight Initiative programmes are provided free of charge. There is no application
            fee, no tuition, no paid tier, and no paid upgrade. We will never ask you to pay to
            apply for, enrol in, or complete any of our programmes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Donations</h2>
          {/* Ended with "Donors will receive acknowledgment for tax purposes
              where applicable." Being a not-for-profit corporation is not the
              same as being a registered charity, and we are only the first.
              We hold no charitable registration and cannot issue a tax receipt
              to anyone, so "where applicable" was doing the work of a
              disclaimer while reading as a promise — the reader most likely to
              rely on it is the one about to give money. Say plainly that no
              receipt is coming, before the donation, not after. */}
          <p className="text-gray-700 leading-relaxed">
            Donations to EdLight Initiative are voluntary and non-refundable. We will use donations
            to support our mission and programs. EdLight Initiative does not hold registered-charity
            status and cannot issue tax receipts, so donations are not tax-deductible. Donations are
            processed by PayPal; EdLight Initiative never receives or stores your card details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Services</h2>
          <p className="text-gray-700 leading-relaxed">
            Our Services may contain links to third-party websites or services. We are not responsible for the 
            content, privacy policies, or practices of third-party websites. Your use of third-party services 
            is at your own risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimers</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our Services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, 
            either express or implied, including but not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Warranties of merchantability or fitness for a particular purpose</li>
            <li>Accuracy, reliability, or completeness of content</li>
            <li>Uninterrupted or error-free operation</li>
            <li>Freedom from viruses or harmful components</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            To the fullest extent permitted by law, EdLight Initiative and its directors, officers, employees, 
            and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive 
            damages arising out of or related to your use of our Services, even if we have been advised of the 
            possibility of such damages.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Indemnification</h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to indemnify, defend, and hold harmless EdLight Initiative from any claims, damages, losses, 
            liabilities, and expenses (including legal fees) arising from your use of our Services or violation 
            of these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to terminate or suspend your access to our Services at any time, with or without 
            cause or notice, including for violation of these Terms. Upon termination, your right to use our 
            Services will immediately cease.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Modifications to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We may modify these Terms at any time. We will notify you of material changes by posting the updated 
            Terms on our website with a new &quot;Last Updated&quot; date. Your continued use of our Services after 
            changes constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
          {/* Named the laws of Haiti and the courts of Haiti. That is where our
              students are, not where the corporation is — we are incorporated
              in Canada and based in Quebec, and Haiti's courts have no
              jurisdiction over a Canadian corporation on the strength of a
              clause we wrote ourselves. As drafted the clause pointed at a
              forum that could not hear the dispute, which makes it worse than
              having none. Quebec is both the seat of the corporation and the
              province whose law actually governs it. */}
          <p className="text-gray-700 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of the
            Province of Quebec and the federal laws of Canada applicable therein, without regard to
            conflict of law provisions. Any disputes shall be resolved in the courts of Quebec.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Severability</h2>
          <p className="text-gray-700 leading-relaxed">
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions 
            shall remain in full force and effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about these Terms, please contact us:
          </p>
          {/* Email and a bare domain were the only way to reach the entity
              behind these Terms. A governing-law clause naming Quebec is not
              checkable against an address the page never gives, and a reader
              deciding whether to accept the Terms should not have to take the
              jurisdiction on faith. The registered address closes that gap. */}
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
