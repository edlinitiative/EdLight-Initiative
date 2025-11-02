import React from 'react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'

export default function NexusPage() {
  return (
    <>
      <Hero
        title="EdLight Nexus"
        subtitle="Connecting Haitian Students to the World"
        backgroundImage="/nexus_pic.png"
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="space-y-6 text-gray-700">
              <SectionHeader title="EdLight Nexus" subtitle="Global mobility and exchange for Haitian students" />
              <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-8 shadow-xl">
                <p className="mb-4">
                  EdLight Nexus is a global mobility and exchange initiative that gives Haitian students the chance to
                  explore new cultures, experience international learning environments, and build lifelong networks.
                </p>
                <p className="mb-4">
                  Through short-term programs, internships, and immersive opportunities, Nexus empowers young people to
                  see beyond borders and bring fresh ideas home.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link href="/get-involved" className="btn btn-primary">
                    Partner with Us
                  </Link>
                  <Link href="/get-involved#contact" className="btn btn-light">
                    Student Interest Form
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <SectionHeader title="Our Current Focus" subtitle="Erasmus Mobility Program" centered />
              <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-8 shadow-xl">
                <p className="text-gray-700 mb-4">
                  In collaboration with the Erasmus+ network, EdLight Nexus offers Haitian university students a one-week
                  academic and cultural immersion experience in Europe. Participants visit partner universities, attend
                  workshops, and engage in group projects centered on leadership, innovation, and cross-cultural
                  collaboration.
                </p>
                <p className="text-gray-700">
                  This partnership marks the beginning of EdLight&apos;s broader mission to make international learning
                  experiences accessible to Haitian youth, both in Haiti and abroad.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <SectionHeader title="Future Opportunities" centered />
              <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-8 shadow-xl">
                <ul className="space-y-3 text-gray-700">
                  <li>• Internships abroad – Gain professional experience with global organizations.</li>
                  <li>• Job shadowing – Observe professionals in your field and learn in real-world settings.</li>
                  <li>• Research &amp; innovation exchanges – Collaborate on short-term research or innovation projects.</li>
                  <li>• Cultural fellowships – Participate in thematic programs on peacebuilding, entrepreneurship, or sustainability.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <SectionHeader title="Eligibility" subtitle="Qualifications for the 2025 pilot cohort" centered />
              <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-8 shadow-xl">
                <div className="grid gap-6 md:grid-cols-2 text-gray-700">
                  <ul className="space-y-3">
                    <li>• Ages 18–21 at the time of travel</li>
                    <li>• Haitian students in Haiti or the diaspora</li>
                    <li>• Currently enrolled or recent graduates (within 12 months)</li>
                    <li>• Valid passport or proof of application in progress</li>
                  </ul>
                  <ul className="space-y-3">
                    <li>• Available for a 7-day international program</li>
                    <li>• Functional English or French proficiency</li>
                    <li>• Agreement with EdLight&apos;s code of conduct</li>
                    <li>• Full participation in all scheduled activities</li>
                  </ul>
                </div>
                <div className="mt-6 rounded-2xl bg-white/70 p-6">
                  <h4 className="font-heading text-lg font-semibold mb-3 text-primary">Selection Criteria</h4>
                  <p className="text-gray-700">
                    Motivation and fit • Community impact potential • Leadership and teamwork • Academic or professional alignment • Equity and representation
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <SectionHeader title="Program Cost & Scholarships" centered />
              <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-8 shadow-xl">
                <div className="overflow-hidden rounded-2xl border border-primary/10">
                  <table className="w-full text-left text-sm text-gray-700">
                    <thead className="bg-primary/10 text-primary uppercase tracking-wide">
                      <tr>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Estimated Cost (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white/90">
                      <tr className="border-t border-gray-200/70">
                        <td className="px-4 py-3">Program Fee (tuition, workshops, visits)</td>
                        <td className="px-4 py-3 font-semibold">$650</td>
                      </tr>
                      <tr className="border-t border-gray-200/70">
                        <td className="px-4 py-3">Shared Accommodation (6 nights)</td>
                        <td className="px-4 py-3 font-semibold">$250</td>
                      </tr>
                      <tr className="border-t border-gray-200/70">
                        <td className="px-4 py-3">Meals (partial coverage)</td>
                        <td className="px-4 py-3 font-semibold">$150</td>
                      </tr>
                      <tr className="border-t border-gray-200/70">
                        <td className="px-4 py-3">Local Transport &amp; Activities</td>
                        <td className="px-4 py-3 font-semibold">$100</td>
                      </tr>
                      <tr className="border-t border-gray-200/70 bg-primary/5">
                        <td className="px-4 py-3 font-semibold text-primary">Total Estimated Cost</td>
                        <td className="px-4 py-3 font-semibold text-primary">$1,150</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Travel costs:</strong> Participants are responsible for round-trip airfare and visa fees, averaging $700–$1,200 depending on destination and travel dates.
                  </p>
                  <p>
                    <strong>Scholarships:</strong> EdLight Nexus offers partial or full scholarships based on financial need, academic merit, and community involvement. Priority goes to first-time travelers and students from underrepresented backgrounds. All selected students receive guidance on fundraising and sponsorship through EdLight&apos;s partners.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-gray-700">
              <SectionHeader title="Our Vision" centered />
              <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-8 shadow-xl">
                <p className="mb-4">
                  We believe every Haitian student deserves the opportunity to learn from the world and give back to it.
                </p>
                <p>
                  By creating bridges between Haiti and international partners, EdLight Nexus equips young leaders with the knowledge, exposure, and confidence to transform their communities and careers.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <SectionHeader title="Get Involved" centered />
              <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-8 shadow-xl text-gray-700">
                <p className="mb-4">
                  We&apos;re building partnerships with universities, foundations, and companies that share our belief in equitable access to global education.
                </p>
                <p className="mb-4">
                  <strong>Students:</strong> Submit your interest form to be considered for upcoming cohorts.
                </p>
                <p className="mb-6">
                  <strong>Partners:</strong> Host a student, sponsor an exchange, or co-design a new program.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/get-involved#contact" className="btn btn-primary">
                    Student Interest Form
                  </Link>
                  <Link href="mailto:nexus@edlight.org" className="btn btn-light">
                    Partner with Us
                  </Link>
                </div>
                <p className="mt-6 text-sm text-gray-600">
                  📩 Contact: <a href="mailto:nexus@edlight.org" className="underline decoration-primary/60 underline-offset-4">nexus@edlight.org</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
