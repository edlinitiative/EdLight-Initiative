import React from 'react'
import Link from 'next/link'
import { Users, BookOpen, Presentation, Heart } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'
import GalleryGrid from '@/components/GalleryGrid'

const programHighlights = [
  {
    title: 'Leadership Workshops',
    description: 'Interactive sessions on communication, team building, project management, and social entrepreneurship.',
    icon: <Users size={32} />,
  },
  {
    title: 'Skill Development',
    description: 'Public speaking, critical thinking, conflict resolution, and other essential leadership competencies.',
    icon: <BookOpen size={32} />,
  },
  {
    title: 'Guest Speakers',
    description: 'Learn from successful Haitian leaders, entrepreneurs, and changemakers.',
    icon: <Presentation size={32} />,
  },
  {
    title: 'Community Projects',
    description: 'Design and implement projects that create positive change in your community.',
    icon: <Heart size={32} />,
  },
]

const pastSpeakers = [
  'Sophia Glazer - Social Entrepreneur',
  'Svens Telemaque - Tech Innovator',
  'Marie-Claire Joseph - Education Advocate',
  'Jean-Baptiste Laurent - Community Organizer',
]

const galleryImages = [
  { src: '/Graduation_Pics.jpg', alt: 'ESLP Graduation Ceremony' },
  { src: '/ESLP_Cultural_Performances.jpg', alt: 'Cultural Performances' },
  { src: '/Best_Participant_Award.jpg', alt: 'Best Participant Award' },
]

export default function ESLPPage() {
  return (
    <>
      <Hero
        title="EdLight Summer Leadership Program"
        subtitle="Developing the next generation of Haitian leaders"
        backgroundImage="/Graduation_Pics.jpg"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <SectionHeader title="About ESLP" />
            <p className="text-gray-700 leading-relaxed mb-4">
              The EdLight Summer Leadership Program (ESLP) is an intensive, transformative experience
              that brings together Haiti&apos;s brightest young minds for a summer of learning, growth, and
              community building. Over the course of four weeks, participants develop essential
              leadership skills while tackling real challenges facing their communities.
            </p>
            <p className="text-gray-700 leading-relaxed">
              ESLP combines workshops, guest speaker sessions, team projects, and mentorship to create
              a comprehensive leadership development experience. Participants leave with new skills, a
              strong network, and the confidence to lead change.
            </p>
          </div>

          <SectionHeader title="Program Components" centered />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {programHighlights.map((highlight) => (
              <Card
                key={highlight.title}
                title={highlight.title}
                description={highlight.description}
                icon={highlight.icon}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
              <h3 className="font-heading text-2xl font-bold mb-4">Past Speakers</h3>
              <ul className="space-y-3 text-gray-700">
                {pastSpeakers.map((speaker, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">→</span>
                    {speaker}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
              <h3 className="font-heading text-2xl font-bold mb-4">ESLP 2024: &quot;Synergos&quot;</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our 2024 cohort focused on the theme of &quot;Synergos&quot; (Greek for &quot;working together&quot;),
                exploring how collaboration and collective action can address Haiti&apos;s most pressing
                challenges.
              </p>
              <p className="text-gray-700">
                30 students from across Haiti participated, completing 5 community projects that
                impacted over 500 people.
              </p>
            </div>
          </div>

          <SectionHeader title="Program Highlights" centered />
          <GalleryGrid images={galleryImages} columns={3} />

          <div className="mt-16 text-center">
            <h3 className="font-heading text-2xl font-bold mb-4">Join ESLP</h3>
            <p className="text-gray-600 mb-6">
              Applications for ESLP 2026 will open in early 2026. Stay tuned for details!
            </p>
            <Link
              href="/get-involved"
              className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Express Interest
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
