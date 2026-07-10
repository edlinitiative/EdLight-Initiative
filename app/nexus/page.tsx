import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, CalendarCheck, Compass, Globe2, GraduationCap, Plane, Sparkles, Users } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Reveal from '@/components/Reveal'

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

// Shared dark editorial band background (matches academy / get-involved).
const darkBand =
  'radial-gradient(circle at 85% 20%, rgba(30,66,159,0.35) 0%, transparent 55%), linear-gradient(135deg, var(--ink-deep) 0%, #0a1530 70%, #0f1e4a 100%)'

function IconChip({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
      <Icon size={20} />
    </span>
  )
}

export default function NexusPage() {
  return (
    <>
      <Hero
        eyebrow="EdLight Ecosystem · Global Exchange"
        title="EdLight Nexus"
        subtitle="Global learning and exchange experiences designed to broaden opportunity for Haitian students."
        backgroundImage="/nexus_pic.webp"
        meta={[
          { label: 'Program phases', value: '4' },
          { label: 'Curated tracks', value: '3' },
          { label: 'Focus', value: 'Global exposure' },
        ]}
      >
        <a href="mailto:nexus@edlight.org" className="btn btn-primary">
          Contact nexus@edlight.org
        </a>
        <Link href="/get-involved#contact" className="btn btn-ghost">
          Stay informed
        </Link>
      </Hero>

      {/* Intro */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeader
              title="A gateway to global exposure"
              subtitle="Nexus helps Haitian students expand their horizons through cross-cultural learning, leadership development, and international exposure. The program is built to create meaningful experiences that strengthen confidence, perspective, and long-term ambition."
              centered
              className="mb-0"
            />
          </div>
        </div>
      </section>

      {/* What Nexus offers */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-8">
              <SectionHeader
                title="What Nexus is designed to offer"
                subtitle="A thoughtful framework for global learning, cross-cultural growth, and meaningful return value for Haiti."
                className="mb-0"
              />
              <div className="grid gap-6 sm:grid-cols-2">
                {programHighlights.map((item, i) => (
                  <Reveal key={item.title} delay={i * 60}>
                    <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-6">
                      <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{item.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-3xl p-8 text-white"
              style={{ background: darkBand }}
            >
              <p className="eyebrow text-white/85">Illustrative residency format</p>
              <h3 className="mt-4 font-display text-2xl font-semibold">How a Nexus experience may come together</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/90">
                A Nexus residency may combine preparation, institutional exposure, cultural learning, and guided
                reflection. The format can vary depending on the destination, timing, and organizational readiness,
                but the goal remains consistent: meaningful international experience rooted in learning, perspective,
                and contribution.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
                {['Preparation', 'Immersion', 'Reflection', 'Community impact'].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-[var(--accent-soft)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey / phases — dark editorial band */}
      <section className="relative overflow-hidden py-16 text-white sm:py-20 md:py-24" style={{ background: darkBand }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage: 'radial-gradient(rgba(232,226,212,0.6) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
          }}
          aria-hidden="true"
        />
        <div className="container relative mx-auto px-4">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-white/40" aria-hidden="true" />
              <span className="eyebrow text-white/85">Journey</span>
            </div>
            <h2 className="display-lg text-white">From preparation to impact</h2>
            <p className="body-lg mt-4 text-white/90">
              Each Nexus experience is designed around a thoughtful progression that may include preparation,
              immersion, reflection, and community impact.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {phases.map((phase, i) => {
              const Icon = phase.icon
              return (
                <Reveal key={phase.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[var(--accent-soft)]">
                        <Icon size={20} />
                      </span>
                      <h3 className="font-display text-lg font-semibold text-white">{phase.title}</h3>
                    </div>
                    <p className="mt-4 text-sm text-white/80">{phase.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-white/70">
                      {phase.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2">
                          <ArrowRight size={14} className="mt-1 flex-shrink-0 text-[var(--accent-soft)]" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Curated pathways */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Curated pathways"
            subtitle="Nexus can be shaped around areas that align with student interests, learning goals, and the nature of each experience."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {tracks.map((track, i) => {
              const Icon = track.icon
              return (
                <Reveal key={track.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-7">
                    <div className="flex items-center gap-3">
                      <IconChip icon={Icon} />
                      <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{track.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-700)]">{track.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-[var(--ink-700)]">
                      {track.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <ArrowRight size={14} className="mt-1 flex-shrink-0 text-[var(--accent)]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Access and support */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="rounded-2xl border border-[var(--paper-200)] bg-white p-8">
              <SectionHeader
                title="Access and support"
                subtitle="EdLight aims to make Nexus as accessible as possible through fundraising guidance, partnership development, and financial support where available. Final funding structures may vary by cohort, destination, and partner availability."
              />
              <div className="rounded-xl border border-[var(--paper-200)] bg-[var(--paper-50)] p-6">
                <p className="text-sm leading-relaxed text-[var(--ink-700)]">
                  Nexus is being developed with access in mind. Depending on the format of a given cohort, support
                  may involve fundraising guidance, external relationship-building, or direct assistance when
                  resources are available. Because each experience is shaped by real conditions, financial
                  arrangements are reviewed on a case-by-case basis.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {supportHighlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[var(--paper-200)] bg-white p-6">
                  <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{item.description}</p>
                </div>
              ))}
              <div className="relative overflow-hidden rounded-2xl p-6 text-white" style={{ background: darkBand }}>
                <p className="eyebrow text-white/85">Access principle</p>
                <p className="mt-3 leading-relaxed text-white/90">
                  The long-term aim is to ensure that financial barriers do not prevent promising Haitian students
                  from benefiting from global exposure when meaningful opportunities arise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Frequently asked questions"
            subtitle="If you still need clarity, send us a note at nexus@edlight.org. We will share more as Nexus continues to develop."
            centered
          />
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-[var(--paper-200)] bg-white p-5 open:shadow-sm sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-[var(--ink-900)]">
                  {faq.question}
                  <span
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)] transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-700)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-24 pt-16 sm:pt-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl p-10 text-white sm:p-14" style={{ background: darkBand }}>
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <span className="eyebrow text-white/85">EdLight Nexus</span>
                <h2 className="display-md mt-3 text-white">A broader horizon for Haitian student leaders</h2>
                <p className="mt-3 text-white/90">
                  Nexus is part of EdLight&apos;s broader mission to expand opportunity through education, leadership,
                  and exposure. As the initiative grows, it aims to create meaningful international experiences that
                  help young Haitians learn, connect, and lead.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="mailto:nexus@edlight.org" className="btn btn-light">
                  Contact nexus@edlight.org
                </a>
                <Link href="/get-involved#contact" className="btn btn-ghost">
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
