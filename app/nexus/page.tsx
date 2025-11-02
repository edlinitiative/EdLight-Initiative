import React from 'react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'

const highlights = [
  {
    title: 'Academic & Cultural Exchange',
    description: 'A 7-day immersion featuring campus visits, workshops, and guided cultural experiences.',
  },
  {
    title: 'Global Networking',
    description: 'Connect with peers, faculty, and professionals from across Europe and beyond.',
  },
  {
    title: 'Skill Development',
    description: 'Strengthen communication, teamwork, problem-solving, and cultural intelligence.',
  },
  {
    title: 'Community Impact',
    description: 'Return home ready to translate global insights into local projects and leadership.',
  },
]

const eligibilityItems = [
  'Age 18-21 at the time of travel',
  'Haitian students living in Haiti or the diaspora',
  'Currently enrolled in university or recent graduates (within 12 months)',
  'Valid passport or proof of application in progress',
  'Available to travel for a 7-day program',
  'Functional English or French proficiency',
  'Commitment to EdLight&apos;s code of conduct',
  'Willingness to fully participate in all activities',
]

const selectionCriteria = [
  'Motivation, character, and growth mindset',
  'Community involvement and potential for impact',
  'Leadership and teamwork experience',
  'Academic or professional alignment with program goals',
  'Representation across schools, regions, and backgrounds',
]

const costBreakdown = [
  { category: 'Program Fee (tuition, workshops, visits)', cost: '$650' },
  { category: 'Shared Accommodation (6 nights)', cost: '$250' },
  { category: 'Meals (partial coverage)', cost: '$150' },
  { category: 'Local Transport & Activities', cost: '$100' },
]

const applicationSteps = [
  'Submit the interest form on our website.',
  'Shortlisted applicants complete a detailed profile and essay.',
  'Interview with the Nexus selection committee.',
  'Attend virtual pre-departure orientation sessions.',
  'Participate in the 7-day mobility experience abroad.',
  'Share lessons learned through a reflection or community project.',
]

const impactGoals = [
  'Increase global access for Haitian university students.',
  'Build collaborative partnerships with international institutions.',
  'Foster leadership and cultural awareness among participants.',
  'Amplify Haiti&apos;s voice in global education networks.',
]

const testimonials = [
  {
    quote:
      'Traveling with EdLight Nexus completely changed my perspective. I realized how much Haitian youth can contribute when given global exposure.',
    attribution: 'Participant, Pilot Cohort',
  },
  {
    quote:
      'The program helped me gain confidence and a clearer vision of how I can use what I learned abroad to create opportunities back home.',
    attribution: 'Participant, Erasmus Mobility Program',
  },
]

const partnerActions = [
  'Host a Nexus cohort or offer campus visits and workshops.',
  'Provide travel or scholarship support for student participation.',
  'Co-design exchange programs that promote leadership and innovation.',
  'Offer mentorship, internships, or project collaborations for alumni.',
]

export default function NexusPage() {
  const eligibilityColumns = [
    eligibilityItems.slice(0, 4),
    eligibilityItems.slice(4),
  ]

  return (
    <>
      <Hero
        title="EdLight Nexus"
        subtitle="Connecting Haitian students to the world through international mobility and exchange."
        backgroundImage="/nexus_pic.png"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/get-involved#contact" className="btn btn-primary">
            Apply Now
          </Link>
          <a href="mailto:nexus@edlight.org" className="btn btn-light">
            Partner With Us
          </a>
        </div>
      </Hero>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl space-y-16">
            <div className="space-y-6 text-gray-700">
              <SectionHeader
                title="About the Program"
                subtitle="Short-term international exchanges that expand worldviews and unlock opportunity."
              />
              <div className="rounded-2xl border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-xl">
                <p className="mb-4">
                  EdLight Nexus is a global mobility and exchange initiative that opens the door for Haitian students to
                  experience international education, culture, and collaboration.
                </p>
                <p>
                  Through short-term academic and cultural programs abroad, Nexus helps participants develop leadership
                  skills, build global connections, and bring fresh perspectives back to their communities.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-gray-700">
              <SectionHeader
                title="Our Mission"
                subtitle="Making global learning accessible for Haiti's next generation of leaders."
                centered
              />
              <div className="rounded-2xl border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-xl">
                <p className="mb-4">
                  We empower Haitian students to become active, informed, and connected world citizens by fostering
                  cultural exchange and collaboration.
                </p>
                <p>
                  EdLight Nexus equips youth with the confidence, skills, and networks they need to thrive in an
                  increasingly interconnected world and to uplift their communities in the process.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-gray-700">
              <SectionHeader title="Program Highlights" centered />
              <div className="grid gap-6 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-primary/10 bg-white/70 p-6 shadow-lg"
                  >
                    <h3 className="font-heading text-xl font-semibold text-primary mb-2">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 text-gray-700">
              <SectionHeader
                title="Eligibility"
                subtitle="Qualifications for the 2025 pilot cohort"
                centered
              />
              <div className="rounded-2xl border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-xl">
                <div className="grid gap-6 md:grid-cols-2">
                  {eligibilityColumns.map((column, index) => (
                    <ul key={index} className="space-y-3 list-disc list-inside">
                      {column.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-white/80 p-6">
                  <h4 className="font-heading text-lg font-semibold text-primary mb-3">Selection Process</h4>
                  <p className="mb-3">
                    EdLight Nexus is highly competitive. Applicants are evaluated on their readiness to represent Haiti
                    abroad and their potential to create lasting impact at home.
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    {selectionCriteria.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-gray-700">
              <SectionHeader title="Program Cost & Scholarships" centered />
              <div className="rounded-2xl border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-xl space-y-6">
                <div className="overflow-hidden rounded-2xl border border-primary/10">
                  <table className="w-full text-left text-sm text-gray-700">
                    <thead className="bg-primary/10 text-primary uppercase tracking-wide">
                      <tr>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Estimated Cost (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white/95">
                      {costBreakdown.map((item) => (
                        <tr key={item.category} className="border-t border-gray-200/70">
                          <td className="px-4 py-3">{item.category}</td>
                          <td className="px-4 py-3 font-semibold">{item.cost}</td>
                        </tr>
                      ))}
                      <tr className="border-t border-gray-200/70 bg-primary/5">
                        <td className="px-4 py-3 font-semibold text-primary">Total Estimated Cost</td>
                        <td className="px-4 py-3 font-semibold text-primary">$1,150</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="space-y-3">
                  <p>
                    <strong>Travel costs:</strong> Participants cover round-trip airfare and visa fees, typically ranging
                    from $700 to $1,200 depending on the destination and travel dates.
                  </p>
                  <p>
                    <strong>Scholarships:</strong> Partial and full scholarships are available based on financial need,
                    merit, and community engagement. Priority is given to first-time travelers and students from
                    underrepresented backgrounds.
                  </p>
                  <p>
                    Every selected student receives guidance on fundraising, sponsorship, and financial planning through
                    EdLight&apos;s partner network.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-gray-700">
              <SectionHeader title="Application Process" centered />
              <div className="rounded-2xl border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-xl">
                <ol className="space-y-3 list-decimal list-inside">
                  {applicationSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="space-y-6 text-gray-700">
              <SectionHeader title="Impact" centered />
              <div className="rounded-2xl border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-xl space-y-4">
                <p>
                  EdLight Nexus represents a new chapter in Haiti&apos;s educational story, connecting local talent to
                  global opportunity and equipping students to bring meaningful change back home.
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  {impactGoals.map((goal) => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6 text-gray-700">
              <SectionHeader title="Testimonials" centered />
              <div className="grid gap-6 md:grid-cols-2">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.attribution} className="rounded-2xl border border-white/40 bg-white/70 p-6 shadow-lg">
                    <p className="italic mb-4">&quot;{testimonial.quote}&quot;</p>
                    <p className="text-sm font-semibold text-primary">{testimonial.attribution}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 text-gray-700">
              <SectionHeader title="Our Vision" centered />
              <div className="rounded-2xl border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-xl">
                <p className="mb-4">
                  EdLight Nexus is more than an exchange program; it is a bridge linking Haiti&apos;s youth to new ideas,
                  communities of learning, and purpose-driven careers.
                </p>
                <p>
                  We envision a world where Haitian students learn from the global community and contribute boldly in
                  return.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-gray-700">
              <SectionHeader title="Partner With Us" centered />
              <div className="rounded-2xl border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-xl space-y-4">
                <p>
                  We collaborate with universities, foundations, and organizations that share our vision of equitable
                  global learning access.
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  {partnerActions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
                <p>
                  Partnering with EdLight Nexus means investing in a generation of young leaders ready to connect,
                  collaborate, and create change.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link href="/get-involved#contact" className="btn btn-primary">
                    Apply Now
                  </Link>
                  <a href="mailto:nexus@edlight.org" className="btn btn-light">
                    Partner With Us
                  </a>
                </div>
                <p className="text-sm text-gray-600">
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
