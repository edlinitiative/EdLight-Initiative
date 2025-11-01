import React from 'react'
import Link from 'next/link'
import { BookOpen, Calculator, TrendingUp, Users } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'
import videosData from '@/data/videos.json'

const courseCategories = [
  {
    title: 'Mathematics',
    description: 'From algebra to calculus, build a strong foundation in mathematical thinking.',
    icon: <Calculator size={32} />,
  },
  {
    title: 'Physics',
    description: 'Explore the fundamental principles governing our universe.',
    icon: <BookOpen size={32} />,
  },
  {
    title: 'Economics',
    description: 'Understand economic systems, markets, and decision-making.',
    icon: <TrendingUp size={32} />,
  },
  {
    title: 'Leadership',
    description: 'Develop essential leadership and communication skills.',
    icon: <Users size={32} />,
  },
]

export default function AcademyPage() {
  return (
    <>
      <Hero
        title="EdLight Academy"
        subtitle="Free, world-class education accessible to all Haitian students"
        backgroundImage="/EdLight_Academy.jpg"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <SectionHeader title="About EdLight Academy" />
            <p className="text-gray-700 leading-relaxed mb-4">
              EdLight Academy provides free, high-quality online courses to Haitian students who may
              not have access to quality education in their local schools. Our curriculum covers core
              academic subjects as well as essential soft skills for success in higher education and
              beyond.
            </p>
            <p className="text-gray-700 leading-relaxed">
              All courses are taught by experienced educators and include video lessons, practice
              problems, and opportunities for one-on-one mentorship.
            </p>
          </div>

          <SectionHeader title="Course Categories" centered />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {courseCategories.map((category) => (
              <Card
                key={category.title}
                title={category.title}
                description={category.description}
                icon={category.icon}
              />
            ))}
          </div>

          <SectionHeader title="Featured Lessons" centered />
          <div className="grid md:grid-cols-3 gap-8">
            {videosData.map((video) => (
              <div key={video.id} className="bg-gray-100 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-300 flex items-center justify-center">
                  <p className="text-gray-600">Video: {video.title}</p>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/get-involved"
              className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Join EdLight Academy
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
