import React from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpenCheck, CalendarDays, Compass, Sparkles, Star, Users } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'

type Stat = {
  value: string
  label: string
  description: string
}

type ExperienceHighlight = {
  title: string
  description: string
}

type Phase = {
  title: string
  description: string
  bullets: string[]
  icon: React.ElementType
}

type Benefit = {
  title: string
  description: string
}

const stats: Stat[] = [
  {
    value: '30–40',
    label: 'Students per cohort',
    description: 'Selected from hundreds of applicants representing schools across Haiti.',
  },
  {
    value: '2 weeks',
    label: 'Immersive residency',
    description: 'Leadership intensives, excursions, and community design labs in Port-au-Prince.',
  },
  {
    value: '100%',
    label: 'Scholarship coverage',
    description: 'Tuition, materials, meals, and activities fully sponsored for every fellow.',
  },
]

const experienceHighlights: ExperienceHighlight[] = [
  {
    title: 'Leadership studios',
    description:
      'Interactive sessions on personal leadership, social innovation, public speaking, and collaborative problem solving.',
  },
  {
    title: 'Masterclasses & mentors',
    description:
      'Facilitated by Haitian and international leaders from finance, media, diplomacy, and the creative industries.',
  },
  {
    title: 'City immersions',
    description:
      'Site visits to companies, embassies, media houses, and cultural institutions that expand each fellow’s worldview.',
  },
  {
    title: 'Impact pitch night',
    description:
      'Cohort teams design initiatives for Haitian communities and present them to a panel of mentors and partners.',
  },
]

const phases: Phase[] = [
  {
    title: 'Discover',
    description: 'We recruit curious, community-minded students ready to grow as leaders.',
    bullets: [
      'Interest form and short essay submission',
      'Values-aligned interviews with ESLP mentors',
      'Selection based on motivation, service, and representation',
    ],
    icon: Compass,
  },
  {
    title: 'Prepare',
    description: 'Accepted fellows join pre-program circles that build community before day one.',
    bullets: [
      'Welcome orientation for fellows and families',
      'Goal-setting sessions and leadership challenges',
      'Community agreements and program expectations',
    ],
    icon: CalendarDays,
  },
  {
    title: 'Immerse',
    description: 'Two weeks of experiential learning that blends classroom, fieldwork, and creative expression.',
    bullets: [
      'Daily workshops with expert facilitators',
      'Team-based design labs tackling real issues',
      'Cultural outings and service learning experiences',
    ],
    icon: BookOpenCheck,
  },
  {
    title: 'Amplify',
    description: 'Fellows graduate, join the alumni guild, and continue to launch community projects.',
    bullets: [
      'Capstone pitch showcase with partners and families',
      'Alumni mentorship and micro-grant opportunities',
      'Ongoing leadership coaching with the EdLight team',
    ],
    icon: Sparkles,
  },
]

const eligibility = [
  'Students aged 15–19 currently enrolled in a Haitian high school (NSI to NS4).',
  'Learners who demonstrate curiosity, teamwork, empathy, and leadership potential.',
  'Participants committed to attending every session, workshop, and excursion.',
]

const selectionCriteria = [
  'Motivation, character, and alignment with EdLight’s mission',
  'Community involvement or leadership in clubs, faith groups, or initiatives',
  'Academic curiosity, discipline, and willingness to learn',
  'Balanced representation across regions, schools, and gender',
]

const benefits: Benefit[] = [
  {
    title: 'All-inclusive experience',
    description: 'Workshops, curriculum materials, supplies, and daily meals provided for every fellow.',
  },
  {
    title: 'Excursions & cultural labs',
    description: 'Transportation and entries for site visits, service projects, and cultural events covered in full.',
  },
  {
    title: 'Mentors & alumni network',
    description: 'Access to industry mentors plus ongoing guidance from ESLP alumni after graduation.',
  },
  {
    title: 'Certificate of distinction',
    description: 'Recognizes leadership, collaboration, and successful completion of capstone projects.',
  },
]

const testimonials = [
  {
    quote:
      'ESLP helped me discover my voice. I launched a literacy club at my school with the support of alumni mentors.',
    name: 'Nathalie – 2023 Fellow',
  },
  {
    quote:
      'From day one, I felt seen and challenged. The workshops sharpened my confidence to lead community change.',
    name: 'James – 2024 Fellow',
  },
  {
    quote:
      'We sponsor ESLP because the program nurtures thoughtful, prepared leaders who invest back into Haiti.',
    name: 'Program Partner',
  },
]

const faqs = [
  {
    question: 'When does the next cohort take place?',
    answer:
      'ESLP typically runs each July in Port-au-Prince. Exact dates, application deadlines, and orientation details are announced on EdLight’s channels and by email.',
  },
  {
    question: 'Is the program really free?',
    answer:
      'Yes. Thanks to generous partners and sponsors, ESLP covers all program costs including materials, meals, excursions, and local transportation.',
  },
  {
    question: 'Do fellows need to speak English?',
    answer:
      'Sessions are bilingual (Kreyòl and French/English). Comfort with Kreyòl is essential. Fellows gain access to additional language practice resources during the residency.',
  },
  {
    question: 'How can organizations get involved?',
    answer:
      'Organizations can mentor a session, host an excursion, provide scholarships, or offer internships to ESLP alumni. Reach out to eslp@edlight.org to co-create a partnership.',
  },
]

export default function ESLPPage() {
  return (
    <>
      <Hero
        title="EdLight Summer Leadership Program"
        subtitle="A fully funded summer residency that equips Haitian high school students to lead, innovate, and serve."
  backgroundImage="/Graduation_Pics.webp"
      >
        <div className="flex justify-center gap-4">
          <Link href="/get-involved#contact" className="btn btn-primary">
            Apply for ESLP <ArrowRight size={18} />
          </Link>
          <a href="mailto:eslp@edlight.org" className="btn btn-light">
            Sponsor a fellow
          </a>
        </div>
      </Hero>

      <section className="bg-gradient-to-b from-slate-50 via-white to-white py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="The flagship leadership experience for Haitian teens"
            subtitle="ESLP combines world-class facilitation, real-world exposure, and a vibrant alumni network so young leaders can transform their ideas into action."
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
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <SectionHeader
                title="Inside the ESLP residency"
                subtitle="High-energy days blend leadership labs, design thinking, cultural exploration, and community-building."
              />
              <div className="grid gap-6 sm:grid-cols-2">
                {experienceHighlights.map((highlight) => (
                  <div key={highlight.title} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
                    <h3 className="font-heading text-lg font-semibold text-text mb-2">{highlight.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/95 via-primary/85 to-primary p-8 text-white shadow-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">Signature experience</p>
              <h3 className="mt-4 font-heading text-2xl font-semibold">Capstone Challenge Week</h3>
              <p className="mt-4 text-sm text-white/80 leading-relaxed">
                Fellows collaborate in multidisciplinary squads to design solutions for local challenges. They complete
                stakeholder interviews, prototype ideas, and present an actionable roadmap during the closing pitch night
                in front of families, alumni, and partners.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide">
                <span className="rounded-full bg-white/15 px-3 py-1">Design thinking</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Community impact</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Team coaching</span>
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
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-white">From application to alumni leadership</h2>
            <p className="mt-4 text-base text-slate-300">
              ESLP is designed as a guided journey. Fellows receive holistic support at every phase—from recruitment to
              post-program mentorship.
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
                    {phase.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <ArrowRight size={14} className="mt-1 text-primary" />
                        <span>{bullet}</span>
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
          <SectionHeader
            title="Eligibility & selection"
            subtitle="We’re looking for young leaders who are eager to learn, collaborate, and serve their communities."
            centered
          />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <div className="rounded-3xl border border-primary/10 bg-white p-7 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-text">
                <Users size={20} className="text-primary" /> Who should apply?
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                {eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-primary/10 bg-white p-7 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-text">
                <Star size={20} className="text-primary" /> How we select fellows
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                ESLP is highly competitive. We evaluate each application holistically to build a diverse, mission-aligned cohort.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {selectionCriteria.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ArrowRight size={14} className="mt-1 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Fully funded for every fellow"
            subtitle="ESLP is powered by partners and donors who believe that leadership development should be accessible."
            centered
          />
          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-text">{benefit.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Scholarship guarantee</p>
            <p className="mt-3 text-base text-white/85">
              Every fellow attends ESLP tuition-free. Sponsors help cover travel stipends, technology, and launch grants for
              alumni-led initiatives.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-slate-100">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Voices from the community"
            subtitle="Fellows and partners share how ESLP sparks growth, confidence, and collaboration."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm italic text-slate-200">“{testimonial.quote}”</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary/80">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Frequently asked questions"
            subtitle="Need more details? Email eslp@edlight.org and our team will follow up within two business days."
            centered
          />
          <div className="mx-auto max-w-4xl space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-3xl border border-primary/10 bg-white p-6 shadow-sm transition">
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
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Join the next chapter</p>
                <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Ready to lead with purpose this summer?</h2>
                <p className="mt-3 text-sm md:text-base text-white/80">
                  Applications open soon. Share your interest, nominate a student, or collaborate with ESLP to sponsor the
                  next generation of Haitian leaders.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/get-involved#contact" className="btn btn-light">
                  Start your application
                </Link>
                <a href="mailto:eslp@edlight.org" className="btn btn-primary">
                  Partner with ESLP
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
