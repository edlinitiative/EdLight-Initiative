import React from 'react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import RequestQuoteForm from '@/components/RequestQuoteForm'

export default function RequestQuotePage() {
  return (
    <>
      <Hero
        title="Request a Quote"
        subtitle="Tell us about your needs and we'll prepare a customized quote for your organization."
        backgroundImage="/about_us.png"
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
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
