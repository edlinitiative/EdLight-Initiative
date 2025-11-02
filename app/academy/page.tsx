import React from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Calculator,
  TrendingUp,
  FlaskConical,
  Languages,
  Sparkles,
  CheckCircle2,
  Users,
} from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
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

const platformFeatures = [
  {
    title: 'Engaging Video Lessons',
    description: 'Bite-sized sessions created by educators and professionals in Haitian Creole and French.',
    icon: <Sparkles size={24} />,
  },
  {
    title: 'Interactive Practice',
    description: 'Chapter-based quizzes and exercises with instant feedback to reinforce learning.',
    icon: <CheckCircle2 size={24} />,
  },
  {
    title: 'Mentors & Community',
    description: 'Guidance from university students, industry experts, and a network of motivated peers.',
    icon: <Users size={24} />,
  },
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

      <section id="start" className="py-20">
        <div className="container mx-auto px-4 space-y-20">
          <div className="max-w-4xl mx-auto space-y-10">
            <SectionHeader title="Learning Without Barriers" />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
              <div className="space-y-6 text-gray-700 leading-relaxed">
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
              <div className="grid gap-4 sm:grid-cols-2">
                {platformFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-primary/15 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="mb-3 text-primary">{feature.icon}</div>
                    <h3 className="font-heading text-lg font-semibold text-text mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <SectionHeader title="Course Categories" centered />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courseCategories.map((category) => (
              <div
                key={category.title}
                className="group rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 text-primary">{category.icon}</div>
                <h3 className="font-heading text-xl font-semibold text-text mb-2">{category.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <SectionHeader title="How It Works" centered />
            <div className="rounded-3xl border border-primary/10 bg-white p-10 text-gray-700 space-y-4 shadow-lg">
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
            <div className="rounded-3xl bg-gradient-to-br from-white via-white to-blue-50 p-10 shadow-lg text-gray-700 space-y-5 border border-primary/10">
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
            <div className="rounded-3xl border border-primary/10 bg-white p-10 text-gray-700 leading-relaxed shadow-lg">
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
              <div key={video.id} className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-shadow hover:shadow-lg">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
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
