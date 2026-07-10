import React from 'react'
import { ArrowRight, Eye, Target, Users } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Reveal from '@/components/Reveal'

const leadershipTeam = [
  { name: 'Ted Jacquet', title: 'Co-Founder & CFO' },
  { name: 'Stevenson Michel', title: 'Co-Founder & CEO' },
  { name: 'Rony Francillon', title: 'Director of ESLP & EdLight Nexus' },
  { name: 'Herode Metellus', title: 'Fundraising Coordinator' },
  { name: 'Williamson Michel', title: 'Operations Manager' },
  { name: 'Stéphane Lainé', title: 'Lead Developer, EdLight Labs' },
  { name: 'Fredler Pierre-Louis', title: 'Technology and Cybersecurity Lead' },
]

const timeline = [
  {
    year: '2022',
    title: 'Launch of ESLP',
    description:
      'The EdLight Summer Leadership Program launched in August 2022 as a leadership experience designed to help students grow in confidence, vision, and civic engagement.',
  },
  {
    year: 'Today',
    title: 'A growing ecosystem',
    description:
      "Today, EdLight's public platform highlights a broader ecosystem that includes EdLight Academy, ESLP, EdLight Nexus, and EdLight Labs — all working together to expand opportunity for Haitian youth.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="EdLight Initiative · Est. 2022"
        title="About EdLight"
        subtitle="Expanding access to education, leadership, innovation, and opportunity for Haitian youth."
        backgroundImage="/edlight_academy_group.webp"
        meta={[
          { label: 'Founded', value: '2022' },
          { label: 'Ecosystem programs', value: '4' },
          { label: 'Leadership team', value: '7+' },
          { label: 'Focus', value: 'Haitian youth' },
        ]}
      />

      {/* Our Story */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <SectionHeader title="Our story" />
            <div className="space-y-5 text-[var(--ink-700)] leading-relaxed sm:text-lg">
              <Reveal>
                <p>
                  EdLight Initiative is a mission-driven organization committed to expanding access to
                  quality education, leadership development, and global opportunities for Haitian youth.
                  Through a growing ecosystem of programs, EdLight works to equip students with the
                  knowledge, skills, and exposure needed to thrive academically, professionally, and as
                  future leaders.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p>
                  Its work spans digital learning, coding and technical training, leadership development,
                  global exposure, and technology-enabled solutions built for impact. Across these
                  initiatives, EdLight seeks to bridge opportunity gaps and create practical pathways for
                  young Haitians in Haiti and beyond.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {[
              {
                icon: Target,
                title: 'Mission',
                body: 'To expand access to quality education, mentorship, innovation, and global opportunities for Haitian youth.',
              },
              {
                icon: Eye,
                title: 'Vision',
                body: 'A future in which Haitian students have the tools, support, and opportunities to reach their full potential and drive positive change in their communities and beyond.',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-8">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-[var(--ink-700)]">{item.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Meet the EdLight team"
            subtitle="EdLight is powered by a multidisciplinary team of educators, builders, mentors, and operators working across education, technology, and leadership development."
            centered
          />
          <p className="mx-auto -mt-4 mb-10 max-w-2xl text-center text-[var(--ink-700)]">
            EdLight was founded by Ted Jacquet, Stevenson Michel, and Christopher Michel. Our leadership
            team includes:
          </p>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
            {leadershipTeam.map((leader, i) => (
              <Reveal key={leader.name} delay={i * 60}>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-[var(--paper-200)] bg-[var(--accent-soft)] text-[var(--accent)] sm:h-28 sm:w-28">
                    <Users size={44} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-[var(--ink-900)]">{leader.name}</h3>
                  <p className="mt-1 text-sm text-[var(--ink-400)]">{leader.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our journey"
            subtitle="EdLight has grown into a broader ecosystem of educational and leadership initiatives designed to serve Haitian youth through learning, mentorship, innovation, and exposure to global opportunities."
            centered
          />
          <div className="mx-auto mt-4 max-w-3xl space-y-4">
            {timeline.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="flex items-start gap-4 rounded-2xl border border-[var(--paper-200)] bg-white p-6 sm:gap-6">
                  <span className="numeral flex flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">
                    {item.year}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-[var(--ink-700)]">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div className="container mx-auto px-4">
          <div
            className="relative overflow-hidden rounded-3xl p-10 text-white sm:p-14"
            style={{
              background:
                'radial-gradient(circle at 80% 20%, rgba(30,66,159,0.4) 0%, transparent 55%), linear-gradient(135deg, var(--ink-deep) 0%, #0a1530 70%, #0f1e4a 100%)',
            }}
          >
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <span className="eyebrow text-white/85">Join the mission</span>
                <h2 className="display-md mt-3 text-white">
                  Building practical pathways for Haitian students
                </h2>
                <p className="mt-3 text-white/90">
                  EdLight continues to build mission-driven pathways for students through education,
                  leadership, technology, and community. There is a place for you in that work.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="/get-involved" className="btn btn-light">
                  Get involved <ArrowRight size={18} />
                </a>
                <a href="/academy" className="btn btn-ghost">
                  Explore the ecosystem
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
