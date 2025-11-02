import React from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Users, Star, HeartHandshake } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'

const highlights = [
  'Workshops & seminars on leadership, communication, teamwork, innovation, and civic engagement.',
  'Guest speakers from organizations like Deutsche Bank, Microsoft, the United Nations, and more.',
  'Excursions to local institutions, companies, and media outlets for experiential learning.',
  'Team projects that design and pitch actionable solutions for social and environmental issues.',
  'Graduation ceremony celebrating growth with certificates for all successful participants.',
]

const eligibility = [
  'Students aged 15–19 currently enrolled in a Haitian high school (NSI to NS4).',
  'Motivated learners who demonstrate curiosity, teamwork, and leadership potential.',
  'Committed participants willing to attend all sessions, workshops, and excursions. (Unjustified absences may result in no certificate being awarded.)',
]

const selectionCriteria = [
  'Motivation and character',
  'Community engagement and potential for impact',
  'Leadership ability and teamwork',
  'Academic curiosity and discipline',
  'Balanced representation across schools, regions, and gender',
]

const programBenefits = [
  'Full access to workshops, learning materials, and mentorship sessions.',
  'Meals and refreshments throughout the program.',
  'Organized excursions and activities.',
  'Certificate of completion upon successful participation.',
]

const impactPoints = [
  'Launch community projects and youth-led initiatives.',
  'Excel in higher education in Haiti and abroad.',
  'Serve as mentors, role models, and ambassadors for EdLight’s mission.',
]

const involvementOptions = [
  'Students: Apply now to join the next ESLP cohort.',
  'Partners & Sponsors: Support a session, host an excursion, or contribute to the program’s continued growth.',
]

export default function ESLPPage() {
  return (
    <>
      <Hero
        title="EdLight Summer Leadership Program (ESLP)"
        subtitle="Empowering the next generation of Haitian leaders"
        backgroundImage="/ESLP_Cultural_Performances.jpg"
      >
        <div className="flex justify-center">
          <Link href="#apply" className="btn btn-primary">
            Apply Now <ArrowRight size={18} />
          </Link>
        </div>
      </Hero>

      <section className="py-20">
        <div className="container mx-auto px-4 space-y-20">
          <div className="max-w-4xl mx-auto space-y-10">
            <SectionHeader title="About the Program" />
            <div className="glass rounded-3xl p-10 text-gray-700 leading-relaxed space-y-6">
              <p>
                The EdLight Summer Leadership Program (ESLP) is a transformative, free, and highly competitive educational experience
                that equips Haitian high school students with the skills, mindset, and confidence to lead change in their communities.
                Through interactive workshops, mentorship, and real-world projects, participants discover their leadership potential,
                strengthen their communication, and build a vision for a better Haiti.
              </p>
              <p>
                Each summer, EdLight selects 30 to 40 of Haiti’s most promising high school students for a two-week immersive leadership experience
                focused on personal growth, collaboration, and community impact. Participants engage in hands-on sessions led by professionals from
                fields such as business, media, diplomacy, and education. The experience culminates in a pitch competition and graduation ceremony
                where students present innovative projects addressing real challenges in their communities.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <SectionHeader title="Program Highlights" subtitle="What makes the ESLP experience unforgettable" centered />
            <div className="grid gap-6 lg:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-4 rounded-2xl bg-white/70 p-6 shadow">
                  <CheckCircle2 className="text-primary flex-shrink-0" size={28} />
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <SectionHeader title="Eligibility" subtitle="Qualifications for the 2025 cohort" centered />
            <div className="glass rounded-3xl p-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
              <div className="space-y-4 text-gray-700">
                <h3 className="font-heading text-xl font-semibold text-primary flex items-center gap-2">
                  <Users size={24} /> Who should apply?
                </h3>
                <ul className="space-y-3">
                  {eligibility.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-white/80 p-6 shadow-inner space-y-3 text-gray-700">
                <h4 className="font-heading text-lg font-semibold text-primary flex items-center gap-2">
                  <Star size={22} /> Selection process
                </h4>
                <p>The EdLight Summer Leadership Program is highly competitive. Applicants are evaluated on:</p>
                <ul className="space-y-2">
                  {selectionCriteria.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <SectionHeader title="Program Cost" subtitle="Investing in access and opportunity" centered />
            <div className="glass rounded-3xl p-10 text-gray-700 space-y-6">
              <p className="text-lg font-medium text-primary flex items-center gap-2">
                <HeartHandshake size={24} /> The EdLight Summer Leadership Program is completely free of charge.
              </p>
              <p>
                Thanks to our partners and sponsors, every accepted student attends at no cost. EdLight covers all program-related expenses so that
                financial barriers never limit access to opportunity.
              </p>
              <p className="font-semibold">All selected participants receive:</p>
              <ul className="space-y-2">
                {programBenefits.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-10">
            <SectionHeader title="Our Impact" subtitle="Alumni outcomes and ripple effects" centered />
            <div className="grid gap-6 md:grid-cols-3">
              {impactPoints.map((item) => (
                <div key={item} className="rounded-2xl bg-white/70 p-6 shadow text-gray-700">
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              Each year, ESLP graduates continue to embody empathy, resilience, and leadership—building initiatives that transform their communities and
              inspire Haiti’s next generation of changemakers.
            </p>
          </div>

          <div className="space-y-10">
            <SectionHeader title="Our Vision" centered />
            <div className="glass rounded-3xl p-10 text-gray-700 leading-relaxed">
              <p>
                Our vision is to build a generation of ethical, skilled, and community-driven leaders who are prepared to transform Haiti through innovation,
                collaboration, and compassion. The EdLight Summer Leadership Program is more than a summer opportunity—it’s the foundation for a lifelong
                journey toward impact and excellence.
              </p>
            </div>
          </div>

          <div id="apply" className="space-y-10">
            <SectionHeader title="Get Involved" centered />
            <div className="glass rounded-3xl p-10 text-gray-700 space-y-6 text-center">
              <ul className="space-y-3 max-w-xl mx-auto text-left">
                {involvementOptions.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600">📩 Contact: <a href="mailto:eslp@edlight.org" className="text-primary underline underline-offset-4">eslp@edlight.org</a></p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-involved#contact" className="btn btn-primary">
                  Apply Now
                </Link>
                <Link href="/get-involved#partner" className="btn btn-light">
                  Partner With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
