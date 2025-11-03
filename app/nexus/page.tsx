import React from 'react'
import Link from 'next/link'
import { ArrowRight, CalendarCheck, Compass, Globe2, GraduationCap, Plane, Sparkles, Users } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'

type Phase = {
  title: string
  description: string
  details: string[]
  icon: React.ElementType
}

type Track = {
  title: string
  description: string
  highlights: string[]
  icon: React.ElementType
}

const stats = [
  {
    value: '6',
    label: 'Global destinations',
    description: 'France, Spain, Canada, the United States, Panama, and the Dominican Republic.',
  },
  {
    value: '48',
    label: 'Student fellows',
    description: 'University leaders representing 10+ Haitian cities and the diaspora since launch.',
  },
  {
    value: '70%',
    label: 'Average scholarship',
    description: 'Typical tuition coverage secured through Nexus partners and sponsors.',
  },
]

const programHighlights = [
  {
    title: 'Immersive learning labs',
    description:
      'Seven-day residencies that combine campus visits, innovation workshops, and curated cultural encounters.',
  },
  {
    title: 'Global leadership network',
    description:
      'Meet faculty, founders, and fellow student leaders to design collaborative solutions with real-world impact.',
  },
  {
    title: 'Career readiness',
    description:
      'Build communication, strategy, and cross-cultural fluency that translate into internships and fellowships.',
  },
  {
    title: 'Community return plan',
    description:
      'Every fellow brings insights home through service projects, peer workshops, or campus changemaker labs.',
  },
]

const phases: Phase[] = [
  {
    title: 'Discover',
    description: 'We identify emerging Haitian student leaders ready to learn, collaborate, and represent.',
    details: [
      'Interest form and profile review',
      'Virtual info session with alumni mentors',
      'Values alignment and leadership potential assessment',
    ],
    icon: Compass,
  },
  {
    title: 'Prepare',
    description: 'Selected fellows complete pre-departure sprints that cover culture, funding, and storytelling.',
    details: [
      'Visa and travel coaching',
      'Group learning circles and language refreshers',
      'Customized fundraising and sponsorship toolkit',
    ],
    icon: CalendarCheck,
  },
  {
    title: 'Immerse',
    description: 'A curated on-the-ground experience that blends academics, innovation, and cultural exchange.',
    details: [
      'University labs and entrepreneurship hubs',
      'Hands-on design challenges with local teams',
      'Host family dinners and city expeditions',
    ],
    icon: Plane,
  },
  {
    title: 'Amplify',
    description: 'Fellows return home to implement impact plans with Nexus mentors and partners.',
    details: [
      'Peer-to-peer workshops across Haitian campuses',
      'Micro-grants for community pilots',
      'Long-term mentorship and alumni network',
    ],
    icon: Sparkles,
  },
]

const tracks: Track[] = [
  {
    title: 'Academic Immersion',
    description: 'Explore global higher-ed ecosystems and collaborate with faculty on future-focused research.',
    highlights: [
      'STEM and social innovation lectures',
      'Joint classes with local students',
      'Capstone pitch with feedback from professors',
    ],
    icon: GraduationCap,
  },
  {
    title: 'Leadership & Policy',
    description: 'Understand civic innovation, public policy, and diplomacy through institutional visits.',
    highlights: [
      'Meetings with consulates and embassies',
      'Roundtables with changemakers and non-profits',
      'Scenario labs on governance and resilience',
    ],
    icon: Users,
  },
  {
    title: 'Culture & Creative Industries',
    description: 'Experience art, design, and storytelling labs that celebrate identity and creative economies.',
    highlights: [
      'Museums and cultural heritage tours',
      'Creative entrepreneurship workshops',
      'Cross-cultural showcases with local artists',
    ],
    icon: Globe2,
  },
]

const costBreakdown = [
  { category: 'Program fee (learning labs, mentors, site visits)', cost: '$650' },
  { category: 'Shared accommodation (6 nights)', cost: '$250' },
  { category: 'Meals & local transportation', cost: '$250' },
  { category: 'Immersion materials & insurance', cost: '$100' },
]

const supportHighlights = [
  {
    title: 'Scholarships & sponsorships',
    description:
      'Need-based and merit scholarships cover up to 80% of program costs thanks to Nexus partners and donors.',
  },
  {
    title: 'Fundraising playbook',
    description:
      'Fellows receive coaching, templates, and mentorship to rally support from networks and local businesses.',
  },
  {
    title: 'Travel concierge',
    description:
      'We assist with visa appointments, flights, and travel safety so fellows can stay focused on learning.',
  },
]

const testimonials = [
  {
    quote:
      'Nexus unlocked rooms I never imagined I would enter. I came back with a community of mentors and the courage to launch my own campus initiative.',
    attribution: 'Gaëlle, Business Student – 2024 Fellow',
  },
  {
    quote:
      'The exchange expanded my worldview and sharpened my leadership. I now mentor the next cohort so more Haitian students can experience this.',
    attribution: 'Marc, Engineering Student – 2023 Fellow',
  },
  {
    quote:
      'Our partnership with EdLight Nexus is seamless. Haitian fellows arrive prepared, thoughtful, and ready to collaborate on global challenges.',
    attribution: 'Program Partner, Paris School of Business',
  },
]

const faqs = [
  {
    question: 'Who can apply?',
    answer:
      'Undergraduate students and recent graduates (within 12 months) of Haitian origin who demonstrate leadership, community involvement, and a commitment to returning impact to Haiti.',
  },
  {
    question: 'Do I need a passport before applying?',
    answer:
      'You can submit interest while your passport is in progress. Our team provides guidance on accelerating documentation and visa requirements once you are shortlisted.',
  },
  {
    question: 'How competitive is the program?',
    answer:
      'Nexus cohorts average a 20% acceptance rate. We evaluate mission alignment, leadership readiness, and representation across disciplines and regions.',
  },
  {
    question: 'What happens after the trip?',
    answer:
      'Fellows join the Nexus alumni guild, receive mentorship for community projects, and gain access to internships, grants, and ongoing professional development.',
  },
]

export default function NexusPage() {
  return (
    <>
      <Hero
        title="EdLight Nexus"
        subtitle="Modern exchange journeys that connect Haitian students to global innovation, culture, and opportunity."
        backgroundImage="/nexus_pic.png"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/get-involved#contact" className="btn btn-primary">
            Apply for the next cohort
          </Link>
          <a href="mailto:nexus@edlight.org" className="btn btn-light">
            Explore partnerships
          </a>
        </div>
      </Hero>

      <section className="bg-gradient-to-b from-slate-50 via-white to-white py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="A gateway to global immersion"
            subtitle="Nexus equips Haitian students with the networks, exposure, and confidence to thrive on the world stage—then reinvest what they learn back home."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-md transition hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 transition group-hover:opacity-100" />
                <div className="relative z-10 space-y-3">
                  <span className="text-4xl font-bold text-primary">{stat.value}</span>
                  <h3 className="text-lg font-semibold text-text">{stat.label}</h3>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-8">
              <SectionHeader
                title="What makes Nexus different"
                subtitle="A modern exchange experience built for Haitian students who want to co-create solutions, not just observe them."
              />
              <div className="grid gap-6 sm:grid-cols-2">
                {programHighlights.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
                    <h3 className="font-heading text-lg font-semibold text-text mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/95 via-primary/85 to-primary p-8 text-white shadow-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">Featured Host Location</p>
              <h3 className="mt-4 font-heading text-2xl font-semibold">Barcelona Mobility Residency</h3>
              <p className="mt-4 text-sm text-white/80 leading-relaxed">
                Fellows explore sustainability and creative entrepreneurship through workshops with ESADE Business School,
                visits to Barcelona Activa, and cultural labs across the Gothic Quarter. The residency ends with a
                community pitch night hosted at a partner innovation hub.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide">
                <span className="rounded-full bg-white/15 px-3 py-1">Urban innovation</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Creative economy</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Cross-cultural leadership</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 py-20 text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_rgba(15,23,42,0.9))]" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Journey</p>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-white">From selection to lasting impact</h2>
            <p className="mt-4 text-base text-slate-300">
              Each Nexus cohort moves through four curated phases. Fellows receive tailored mentorship, resources, and community support every step of the way.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            {phases.map((phase) => {
              const Icon = phase.icon
              return (
                <div key={phase.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.5)]">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-white/10 p-2 text-primary">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-white">{phase.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-slate-300">{phase.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-200/80">
                    {phase.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <ArrowRight size={14} className="mt-1 text-primary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Curated pathways for every fellow"
            subtitle="Choose a focus area that matches your academic interests and leadership goals."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {tracks.map((track) => {
              const Icon = track.icon
              return (
                <div key={track.title} className="rounded-3xl border border-primary/10 bg-white p-7 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 p-2 text-primary">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-text">{track.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{track.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                    {track.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <ArrowRight size={14} className="mt-1 text-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="rounded-3xl border border-primary/20 bg-white p-8 shadow-xl">
              <SectionHeader
                title="Investment & support"
                subtitle="We design every cohort so finances are transparent and support is accessible."
              />
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <table className="w-full text-left text-sm text-gray-700">
                  <thead className="bg-primary/10 text-primary uppercase tracking-wide">
                    <tr>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Estimated Cost (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/95">
                    {costBreakdown.map((item) => (
                      <tr key={item.category} className="border-t border-gray-200">
                        <td className="px-4 py-3">{item.category}</td>
                        <td className="px-4 py-3 font-semibold">{item.cost}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-gray-200 bg-primary/5">
                      <td className="px-4 py-3 font-semibold text-primary">Estimated total (excluding flights & visa)</td>
                      <td className="px-4 py-3 font-semibold text-primary">$1,250</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Airfare ranges from $700 – $1,200 depending on the destination and travel dates. We help fellows explore
                partnerships and fundraising pathways to close the gap.
              </p>
            </div>

            <div className="space-y-6">
              {supportHighlights.map((item) => (
                <div key={item.title} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
              <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Average support impact</p>
                <p className="mt-3 text-lg leading-relaxed text-white/90">
                  3 out of 4 fellows receive partial or full scholarships. Our partners include universities, private
                  donors, and the Haitian diaspora committed to equitable global access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Alumni perspectives</p>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-white">Stories from Nexus fellows & partners</h2>
            <p className="mt-4 text-base text-slate-300">
              Nexus is a community. Fellows remain engaged after their residency to mentor the next cohort and co-design
              new opportunities for Haitian youth.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.attribution} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm italic text-slate-200">“{testimonial.quote}”</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary/80">
                  {testimonial.attribution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Frequently asked questions"
            subtitle="If you still need clarity, send us a note at nexus@edlight.org and the team will respond within 48 hours."
            centered
          />
          <div className="mx-auto max-w-4xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-3xl border border-primary/10 bg-white p-6 shadow-sm transition"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-left text-base font-semibold text-text">
                  {faq.question}
                  <span className="text-primary transition group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/90 via-primary to-primary/90 p-10 text-white shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent)]" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Join the movement</p>
                <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Bring Nexus to your campus or organization</h2>
                <p className="mt-3 text-sm md:text-base text-white/80">
                  Cohort applications re-open soon. Let’s design a global experience that elevates Haitian talent and creates lasting partnerships.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/get-involved#contact" className="btn btn-light">
                  Start your application
                </Link>
                <a href="mailto:nexus@edlight.org" className="btn btn-primary">
                  Partner with Nexus
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
