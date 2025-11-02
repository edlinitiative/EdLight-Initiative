import React from 'react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import nexusData from '@/data/nexus.json'
import partnersData from '@/data/partners.json'

export default function NexusPage() {
  return (
    <>
      <Hero
        title="EdLight Nexus"
        subtitle="Connecting Haitian students with global opportunities"
        backgroundImage="/hero.jpg"
      />

  <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <SectionHeader title="About EdLight Nexus" />
            <p className="text-gray-700 leading-relaxed mb-4">
              EdLight Nexus is our bridge-building initiative that connects talented Haitian students
              with international exchange programs, scholarships, research opportunities, and
              internships. We partner with leading universities and organizations worldwide to open
              doors that might otherwise remain closed.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From United World Colleges to Ivy League summer programs, we help students navigate the
              application process and access life-changing opportunities.
            </p>
          </div>

          <SectionHeader title="Current Opportunities" centered />
          <div className="space-y-6 mb-16">
            {nexusData.map((opportunity) => (
              <div key={opportunity.id} className="glass rounded-2xl p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-text mb-2">
                      {opportunity.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {opportunity.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-semibold">{new Date(opportunity.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{opportunity.description}</p>
                <p className="text-sm text-gray-600">
                  <strong>Eligibility:</strong> {opportunity.eligibility}
                </p>
              </div>
            ))}
          </div>

          <SectionHeader title="Partner Institutions" centered />
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {partnersData.slice(0, 6).map((partner) => (
              <div key={partner.id} className="glass rounded-2xl p-6 text-center">
                <div className="h-20 flex items-center justify-center mb-4">
                  <p className="font-heading font-semibold text-gray-700">{partner.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="font-heading text-2xl font-bold mb-4">Explore Opportunities</h3>
            <p className="text-gray-600 mb-6">
              Interested in applying for scholarships or exchanges? Get in touch with us to learn
              more about current opportunities and application support.
            </p>
            <Link
              href="/get-involved"
              className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Connect with Nexus
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
