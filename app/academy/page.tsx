import React from 'react'
import Link from 'next/link'
import { BookOpen, Calculator, TrendingUp, FlaskConical, Languages } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'
import videosData from '@/data/videos.json'

const courseCategories = [
  {
    title: 'Maths',
    description: 'Strengthen problem-solving with algebra, calculus, and exam strategies.',
    icon: <Calculator size={32} />,
  },
  {
    title: 'Physics',
    description: 'Explore motion, energy, and the laws that explain how the world works.',
    icon: <BookOpen size={32} />,
  },
  {
    title: 'Chemistry',
    description: 'Understand reactions, matter, and laboratory concepts for modern science.',
    icon: <FlaskConical size={32} />,
  },
  {
    title: 'Economics',
    description: 'Analyze markets, development, and decision-making in global contexts.',
    icon: <TrendingUp size={32} />,
  },
]

const howItWorksSteps = [
  'Browse courses and choose your subject or topic.',
  'Learn at your own pace on any device with bite-sized lessons.',
  'Test yourself with quizzes and exercises after each chapter.',
  'Track your progress through a personalized dashboard.',
  'Earn certificates of mastery when you complete full courses.',
]

export default function AcademyPage() {
  return (
    <>
      <Hero
        title="EdLight Academy"
        subtitle="Learning without barriers for every Haitian student"
        backgroundImage="/EdLight_Academy.jpg"
      >
        <div className="flex justify-center">
          <Link href="#start" className="btn btn-primary">
            Start Learning
          </Link>
        </div>
      </Hero>

      <section className="py-20">
        <div className="container mx-auto px-4 space-y-20">
          <div className="max-w-4xl mx-auto space-y-10">
            <SectionHeader title="Learning Without Barriers" />
            <div className="glass rounded-3xl p-10 text-gray-700 leading-relaxed space-y-6">
              <p>
                EdLight Academy is a free online learning platform designed to make quality education accessible to every Haitian
                student, anywhere. Through engaging video lessons, interactive quizzes, and practical exercises, the platform empowers
                learners to master academic subjects, develop new skills, and prepare for their future with confidence.
              </p>
              <p>
                Built by educators, university students, and industry professionals, EdLight Academy blends local relevance with global
                standards. Students can access structured lessons, review key concepts, and test their knowledge through personalized
                learning paths—all from their computer or smartphone.
              </p>
            </div>
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

          <div className="max-w-4xl mx-auto space-y-8">
            <SectionHeader title="How It Works" centered />
            <div className="glass rounded-3xl p-10 text-gray-700 space-y-4">
              {howItWorksSteps.map((step, index) => (
                <div key={step} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-semibold">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-10">
            <SectionHeader title="Accessibility & Language" centered />
            <div className="rounded-3xl bg-white/75 p-10 shadow text-gray-700 space-y-5">
              <p className="text-lg font-medium flex items-center gap-3 text-primary">
                <Languages size={24} /> Learn in Haitian Creole or French
              </p>
              <p>
                To reach as many learners as possible, lessons are offered in both Haitian Creole and French. The platform is optimized for low-bandwidth
                connections so students in urban and rural areas can learn seamlessly.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <SectionHeader title="Our Mission" centered />
            <div className="glass rounded-3xl p-10 text-gray-700 leading-relaxed">
              <p>
                Our mission is to democratize education in Haiti by leveraging technology to make learning interactive, inclusive, and free. EdLight Academy bridges
                the gap between traditional classroom instruction and the digital future—helping students succeed academically while developing skills for life.
              </p>
              <p className="text-sm text-gray-600 mt-4">📩 Contact: <a href="mailto:academy@edlight.org" className="text-primary underline underline-offset-4">academy@edlight.org</a></p>
            </div>
          </div>

          <SectionHeader title="Featured Lessons" centered />
          <div className="grid md:grid-cols-3 gap-8">
            {videosData.map((video) => (
              <div key={video.id} className="glass rounded-2xl overflow-hidden">
                <div className="aspect-video bg-white/30 flex items-center justify-center">
                  <p className="text-gray-700">Video: {video.title}</p>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/get-involved"
              className="btn btn-primary"
            >
              Join EdLight Academy
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
