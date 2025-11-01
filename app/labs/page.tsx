import React from 'react'
import Link from 'next/link'
import { Code, Rocket, Users2, Award } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'

const programPhases = [
  {
    title: 'Training',
    description: 'Intensive bootcamp-style training in web development, mobile app development, and entrepreneurship.',
    icon: <Code size={32} />,
  },
  {
    title: 'Mentorship',
    description: 'Work directly with experienced developers and entrepreneurs to build your project.',
    icon: <Users2 size={32} />,
  },
  {
    title: 'Demo Day',
    description: 'Present your project to potential investors, partners, and the tech community.',
    icon: <Rocket size={32} />,
  },
]

export default function LabsPage() {
  return (
    <>
      <Hero
        title="EdLight Labs"
        subtitle="Tech Incubator: Training → Mentorship → Demo Day"
        backgroundImage="/hero.jpg"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <SectionHeader title="About EdLight Labs" />
            <p className="text-gray-700 leading-relaxed mb-4">
              EdLight Labs is our tech incubator program
              that transforms motivated students into skilled developers and entrepreneurs. Through a
              comprehensive curriculum combining technical training with business fundamentals, we
              empower participants to build real-world solutions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Past cohorts have built mobile apps, web platforms, and social enterprises addressing
              local challenges in education, agriculture, healthcare, and more.
            </p>
          </div>

          <SectionHeader title="Program Structure" centered />
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {programPhases.map((phase) => (
              <Card
                key={phase.title}
                title={phase.title}
                description={phase.description}
                icon={phase.icon}
              />
            ))}
          </div>

          <div className="bg-background rounded-xl p-8 mb-16">
            <h3 className="font-heading text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="text-primary" />
              Cohort Highlights
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>• 12-week intensive program</li>
              <li>• Hands-on project-based learning</li>
              <li>• Access to mentors from leading tech companies</li>
              <li>• Networking opportunities with investors and entrepreneurs</li>
              <li>• Certificate of completion</li>
              <li>• Potential seed funding for top projects</li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="font-heading text-2xl font-bold mb-4">Ready to Build?</h3>
            <p className="text-gray-600 mb-6">
              Applications for the next cohort open soon. Join us in creating technology solutions
              for Haiti&apos;s future.
            </p>
            <Link
              href="/get-involved"
              className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Apply to EdLight Labs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
