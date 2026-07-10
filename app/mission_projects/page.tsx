import React from 'react'
import { Metadata } from 'next'
import { ArrowRight, BookOpen, Globe, Lightbulb, Rocket, Target, Users } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Mission & Projects | EdLight Initiative',
  description:
    "Learn about EdLight Initiative's mission to empower underserved communities through education and explore our key projects.",
}

const coreValues = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    body: 'We embrace creative solutions and emerging technologies to address educational challenges in new ways.',
  },
  {
    icon: Users,
    title: 'Community',
    body: 'We build strong communities of learners, mentors, and partners working together for collective growth.',
  },
  {
    icon: Globe,
    title: 'Accessibility',
    body: 'We ensure our programs are free or low-cost, making quality education accessible to all.',
  },
]

const projects = [
  {
    title: 'EdLight Academy',
    description:
      'Free online courses in technology, business, and personal development accessible to students worldwide.',
    icon: BookOpen,
    link: '/academy',
    impact: '500+ students enrolled',
  },
  {
    title: 'EdLight Labs',
    description:
      'STEM innovation hub where students learn coding, robotics, and develop technology solutions for real-world problems.',
    icon: Rocket,
    link: '/labs',
    impact: '50+ projects completed',
  },
  {
    title: 'EdLight Nexus',
    description:
      'Global opportunities platform connecting students with scholarships, internships, and conferences worldwide.',
    icon: Globe,
    link: '/nexus',
    impact: '100+ opportunities shared',
  },
  {
    title: 'EdLight Summer Leadership Program (ESLP)',
    description:
      'Intensive summer program training young leaders in entrepreneurship, social impact, and community development.',
    icon: Users,
    link: '/eslp',
    impact: '200+ graduates',
  },
]

export default function MissionProjectsPage() {
  return (
    <>
      <Hero
        eyebrow="EdLight Initiative · Mission"
        title="Our mission & projects"
        subtitle="Empowering underserved communities through education, technology, and leadership development."
        backgroundImage="/about_us.webp"
        meta={[
          { label: 'Students served', value: '2,500+' },
          { label: 'Courses offered', value: '45+' },
          { label: 'Programs', value: '4' },
          { label: 'Partner orgs', value: '6+' },
        ]}
      />

      {/* Mission statement */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our mission" subtitle="What drives us every day." />
          <Reveal>
            <div className="flex items-start gap-5 rounded-2xl border border-[var(--paper-200)] bg-white p-8 sm:p-10">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Target size={24} />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-[var(--ink-900)]">
                  Empowering through education
                </h3>
                <p className="mt-3 leading-relaxed text-[var(--ink-700)] sm:text-lg">
                  EdLight Initiative is dedicated to empowering underserved communities, particularly youth in
                  Haiti, through accessible education, technology training, and leadership development. We believe
                  that education is the key to breaking cycles of poverty and creating sustainable change.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our core values" subtitle="The principles that guide our work." centered />
          <div className="grid gap-6 md:grid-cols-3">
            {coreValues.map((value, i) => {
              const Icon = value.icon
              return (
                <Reveal key={value.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-7">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{value.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Key projects */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our projects"
            subtitle="Transforming lives through education and technology."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => {
              const Icon = project.icon
              return (
                <Reveal key={project.title} delay={i * 60}>
                  <a
                    href={project.link}
                    className="group flex h-full flex-col rounded-2xl border border-[var(--paper-200)] bg-white p-7 transition-shadow hover:shadow-md"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{project.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-700)]">{project.description}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-[var(--paper-200)] pt-4">
                      <span className="text-sm font-semibold text-[var(--accent)]">{project.impact}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] transition-all group-hover:gap-2">
                        Learn more <ArrowRight size={15} />
                      </span>
                    </div>
                  </a>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-24">
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
                <span className="eyebrow text-white/85">Make a difference</span>
                <h2 className="display-md mt-3 text-white">Join us in making a difference</h2>
                <p className="mt-3 text-white/90">
                  Whether you want to volunteer, partner, or support our mission financially, there are many ways
                  to get involved with EdLight Initiative.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="/get-involved" className="btn btn-light">
                  Get involved <ArrowRight size={18} />
                </a>
                <a href="/contact" className="btn btn-ghost">
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
