import React from 'react'
import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import RequestQuoteForm from '@/components/RequestQuoteForm'

// De-listed from the sitemap in the earlier Ad Grants pass as a commercial-
// activity flag; noindex finishes that job, since a de-listed page is still
// indexable. Still reachable by direct link for partners sent here.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function RequestQuotePage() {
  return (
    <>
      <Hero
        title="Request a Quote"
        subtitle="Tell us about your needs and we'll prepare a customized quote for your organization."
  backgroundImage="/about_us.webp"
      />

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="Request a Quote"
              subtitle="Complete the form below and our partnerships team will follow up within 3 business days."
              centered
            />

            <div className="glass rounded-2xl p-8">
              <RequestQuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
