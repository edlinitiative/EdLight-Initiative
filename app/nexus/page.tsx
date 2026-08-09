import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, CalendarCheck, Compass, Globe2, GraduationCap, Plane, Sparkles, Users } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = {
  title: 'EdLight Nexus | EdLight Initiative',
  description:
    'EdLight Nexus is EdLight’s global exposure and exchange initiative, designed to broaden opportunity for Haitian students through thoughtful international learning experiences.',
}

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

const programHighlights = [
  {
    title: 'Immersive learning experiences',
    description:
      'Experiences may include visits, workshops, and guided exchanges designed to help students learn through direct exposure.',
  },
  {
    title: 'Institutional and cultural exposure',
    description:
      'Nexus is designed to introduce fellows to universities, innovation ecosystems, and cultural institutions in ways that broaden perspective.',
  },
  {
    title: 'Leadership and cross-cultural development',
    description:
      'Participants are encouraged to strengthen confidence, communication, and intercultural awareness through thoughtful preparation and reflection.',
  },
  {
    title: 'A commitment to bring learning home',
    description:
      'Each experience is intended to help fellows return with ideas, relationships, and insight that can create value in Haiti.',
  },
]

const phases: Phase[] = [
  {
    title: 'Discover',
    description: 'Students begin by exploring whether the experience matches their goals, interests, and sense of purpose.',
    details: [
      'Interest and readiness review',
      'Orientation to the goals and expectations of the experience',
      'Initial reflection on academic, personal, and leadership priorities',
    ],
    icon: Compass,
  },
  {
    title: 'Prepare',
    description: 'Preparation may include practical planning, context-building, and intentional goal setting before travel.',
    details: [
      'Pre-departure guidance and planning support',
      'Cultural orientation and group learning sessions',
      'Goal setting around learning, conduct, and contribution',
    ],
    icon: CalendarCheck,
  },
  {
    title: 'Immerse',
    description: 'The immersion phase centers on learning through place, people, and exposure to new institutions and ideas.',
    details: [
      'Visits to educational, civic, or cultural spaces as available',
      'Structured conversations, workshops, or guided activities',
      'Time for observation, exchange, and reflection',
    ],
    icon: Plane,
  },
  {
    title: 'Amplify',
    description: 'After the experience, fellows are encouraged to translate what they learned into action, leadership, and service.',
    details: [
      'Reflection on lessons, perspective, and next steps',
      'Sharing insight with peers and communities where appropriate',
      'Continued connection to EdLight as the initiative develops',
    ],
    icon: Sparkles,
  },
]

const tracks: Track[] = [
  {
    title: 'Academic Immersion',
    description: 'Explore learning environments, academic culture, and ideas that broaden what higher education can look like.',
    highlights: [
      'Exposure to universities and academic environments',
      'Conversations around study pathways and intellectual curiosity',
      'Space to connect learning to future ambition',
    ],
    icon: GraduationCap,
  },
  {
    title: 'Leadership & Policy',
    description: 'Engage ideas related to public leadership, civic responsibility, and the systems that shape opportunity.',
    highlights: [
      'Exposure to civic and leadership conversations',
      'Reflection on service, responsibility, and public problem-solving',
      'Learning that connects local action to global perspective',
    ],
    icon: Users,
  },
  {
    title: 'Culture & Creative Industries',
    description: 'Discover how culture, storytelling, and creativity can expand identity, imagination, and economic possibility.',
    highlights: [
      'Exposure to cultural institutions and creative spaces',
      'Exploration of narrative, identity, and artistic expression',
      'Encounters that deepen intercultural understanding',
    ],
    icon: Globe2,
  },
]

const supportHighlights = [
  {
    title: 'Fundraising guidance',
    description:
      'EdLight works to help participants think through fundraising pathways and practical strategies for making an experience more reachable.',
  },
  {
    title: 'Partnership development',
    description:
      'Where possible, EdLight explores relationships and support structures that can strengthen the accessibility and quality of each cohort.',
  },
  {
    title: 'Financial support where available',
    description:
      'Available support may vary depending on the destination, cohort model, timing, and partner availability.',
  },
]

const faqs = [
  {
    question: 'Who is Nexus designed for?',
    answer:
      'Nexus is designed for Haitian students and emerging young leaders who are ready to grow through exposure, reflection, and cross-cultural learning.',
  },
  {
    question: 'What kinds of experiences might Nexus include?',
    answer:
      'Depending on the format, a Nexus experience may include preparation sessions, guided visits, workshops, cultural exchange, and structured reflection.',
  },
  {
    question: 'How does funding work?',
    answer:
      'Funding structures may vary. EdLight aims to expand access through fundraising guidance, partnership development, and support where available.',
  },
  {
    question: 'What happens after the trip?',
    answer:
      'Nexus is designed to encourage fellows to reflect on what they learned and consider how that insight can be shared or applied back home.',
  },
]

export default function NexusPage() {
  return (
    <>
      <Hero
        title="EdLight Nexus"
        subtitle="Global learning and exchange experiences designed to broaden opportunity for Haitian students."
        backgroundImage="/nexus_pic.webp"
      >
        <p className="mx-auto mb-6 max-w-2xl text-sm sm:text-base text-white/85 leading-relaxed">
          EdLight Nexus is EdLight&apos;s international exposure and exchange initiative. It is designed to connect
          Haitian students to new ideas, institutions, and communities through thoughtfully curated global learning
          experiences.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a href="mailto:nexus@edlight.org" className="btn btn-primary">
            Contact nexus@edlight.org
          </a>
          <Link href="/get-involved#contact" className="btn btn-light">
            Stay informed
          </Link>
        </div>
      </Hero>

      <section className="bg-gradient-to-b from-slate-50 via-white to-white py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="mx-auto max-w-4xl rounded-3xl border border-primary/10 bg-white p-8 shadow-sm md:p-10">
            <SectionHeader
              title="A gateway to global exposure"
              subtitle="Nexus helps Haitian students expand their horizons through cross-cultural learning, leadership development, and international exposure. The program is built to create meaningful experiences that strengthen confidence, perspective, and long-term ambition."
              centered
              className="mb-0"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-8">
              <SectionHeader
                title="What Nexus is designed to offer"
                subtitle="A thoughtful framework for global learning, cross-cultural growth, and meaningful return value for Haiti."
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
              <p className="text-sm uppercase tracking-[0.2em] text-white/85">Illustrative residency format</p>
              <h3 className="mt-4 font-heading text-2xl font-semibold">How a Nexus experience may come together</h3>
              <p className="mt-4 text-sm text-white/95 leading-relaxed">
                A Nexus residency may combine preparation, institutional exposure, cultural learning, and guided
                reflection. The format can vary depending on the destination, timing, and organizational readiness, but
                the goal remains consistent: meaningful international experience rooted in learning, perspective, and
                contribution.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide">
                <span className="rounded-full bg-white/15 px-3 py-1">Preparation</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Immersion</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Reflection</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Community impact</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 py-20 text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_rgba(15,23,42,0.9))]" />
        <div className="max-w-[1200px] relative mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-100">Journey</p>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-white">From preparation to impact</h2>
            <p className="mt-4 text-base text-slate-100">
              Each Nexus experience is designed around a thoughtful progression that may include preparation,
              immersion, reflection, and community impact.
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
                  <p className="mt-4 text-sm text-slate-100">{phase.description}</p>
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
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Curated pathways"
            subtitle="Nexus can be shaped around areas that align with student interests, learning goals, and the nature of each experience."
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
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="rounded-3xl border border-primary/20 bg-white p-8 shadow-xl">
              <SectionHeader
                title="Access and support"
                subtitle="EdLight aims to make Nexus as accessible as possible through fundraising guidance, partnership development, and financial support where available. Final funding structures may vary by cohort, destination, and partner availability."
              />
              <div className="rounded-2xl border border-primary/10 bg-slate-50 p-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Nexus is being developed with access in mind. Depending on the format of a given cohort, support may
                  involve fundraising guidance, external relationship-building, or direct assistance when resources are
                  available. Because each experience is shaped by real conditions, financial arrangements are reviewed on
                  a case-by-case basis.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {supportHighlights.map((item) => (
                <div key={item.title} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
              <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-6 text-white shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/90">Access principle</p>
                <p className="mt-3 text-lg leading-relaxed text-white/90">
                  The long-term aim is to ensure that financial barriers do not prevent promising Haitian students from
                  benefiting from global exposure when meaningful opportunities arise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Frequently asked questions"
            subtitle="If you still need clarity, send us a note at nexus@edlight.org. We will share more as Nexus continues to develop."
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
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/90 via-primary to-primary/90 p-10 text-white shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent)]" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/90">EdLight Nexus</p>
                <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold">A broader horizon for Haitian student leaders</h2>
                <p className="mt-3 text-sm md:text-base text-white/95">
                  Nexus is part of EdLight&apos;s broader mission to expand opportunity through education, leadership, and
                  exposure. As the initiative grows, it aims to create meaningful international experiences that help
                  young Haitians learn, connect, and lead.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="mailto:nexus@edlight.org" className="btn btn-light">
                  Contact nexus@edlight.org
                </a>
                <Link href="/get-involved#contact" className="btn btn-primary">
                  Learn more about EdLight
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
