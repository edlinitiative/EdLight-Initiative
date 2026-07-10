import React from 'react'
import { Metadata } from 'next'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Camera,
  Code,
  Languages,
  TrendingUp,
} from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Courses | EdLight Initiative',
  description: 'Explore our free online courses in technology, business, languages, and personal development.',
}

type Course = {
  name: string
  level: string
  duration: string
  description: string
}

const courseCategories: { title: string; icon: React.ElementType; courses: Course[] }[] = [
  {
    title: 'Technology & Programming',
    icon: Code,
    courses: [
      { name: 'Web Development Fundamentals', level: 'Beginner', duration: '8 weeks', description: 'Learn HTML, CSS, and JavaScript to build your first website.' },
      { name: 'Python Programming', level: 'Beginner', duration: '6 weeks', description: 'Master Python basics and build practical applications.' },
      { name: 'Mobile App Development', level: 'Intermediate', duration: '10 weeks', description: 'Create Android and iOS apps using modern frameworks.' },
      { name: 'Database Design & SQL', level: 'Intermediate', duration: '6 weeks', description: 'Learn to design and manage databases efficiently.' },
    ],
  },
  {
    title: 'Business & Entrepreneurship',
    icon: Briefcase,
    courses: [
      { name: 'Entrepreneurship Essentials', level: 'Beginner', duration: '6 weeks', description: 'Learn how to start and grow your own business.' },
      { name: 'Digital Marketing', level: 'Beginner', duration: '8 weeks', description: 'Master social media marketing, SEO, and content marketing.' },
      { name: 'Business Plan Development', level: 'Intermediate', duration: '4 weeks', description: 'Create a comprehensive business plan for your startup.' },
      { name: 'Financial Literacy', level: 'Beginner', duration: '4 weeks', description: 'Understand personal and business financial management.' },
    ],
  },
  {
    title: 'Languages',
    icon: Languages,
    courses: [
      { name: 'English for Beginners', level: 'Beginner', duration: '12 weeks', description: 'Learn English fundamentals for everyday communication.' },
      { name: 'Business English', level: 'Intermediate', duration: '8 weeks', description: 'Professional English for workplace communication.' },
      { name: 'French Conversation', level: 'Intermediate', duration: '8 weeks', description: 'Improve your French speaking and listening skills.' },
    ],
  },
  {
    title: 'Personal Development',
    icon: TrendingUp,
    courses: [
      { name: 'Leadership Skills', level: 'All Levels', duration: '6 weeks', description: 'Develop essential leadership and team management skills.' },
      { name: 'Public Speaking', level: 'All Levels', duration: '4 weeks', description: 'Build confidence and master public presentation skills.' },
      { name: 'Time Management', level: 'All Levels', duration: '3 weeks', description: 'Learn to manage your time effectively and boost productivity.' },
      { name: 'Critical Thinking', level: 'All Levels', duration: '4 weeks', description: 'Enhance your problem-solving and analytical skills.' },
    ],
  },
  {
    title: 'Creative Skills',
    icon: Camera,
    courses: [
      { name: 'Graphic Design Basics', level: 'Beginner', duration: '6 weeks', description: 'Learn design principles and tools like Canva and GIMP.' },
      { name: 'Video Editing', level: 'Beginner', duration: '5 weeks', description: 'Create professional videos using free editing software.' },
      { name: 'Photography Fundamentals', level: 'Beginner', duration: '4 weeks', description: 'Master smartphone photography and basic editing.' },
    ],
  },
]

const stats = [
  { value: '100%', label: 'Free access' },
  { value: '45+', label: 'Courses available' },
  { value: '24/7', label: 'Learn anytime' },
]

const steps = [
  { title: 'Choose a course', body: 'Browse our catalog and select a course that matches your interests and goals.' },
  { title: 'Learn at your pace', body: 'Access video lessons, practice exercises, and course materials anytime, anywhere.' },
  { title: 'Earn a certificate', body: 'Complete the course and receive a digital certificate to showcase your new skills.' },
]

export default function CoursesPage() {
  return (
    <>
      <Hero
        eyebrow="EdLight Ecosystem · Free Courses"
        title="Our courses"
        subtitle="Free online courses to help you build valuable skills and transform your future — self-paced and accessible from anywhere with an internet connection."
        backgroundImage="/EdLight_Academy.webp"
        meta={[
          { label: 'Cost', value: 'Free' },
          { label: 'Courses', value: '45+' },
          { label: 'Access', value: '24/7' },
          { label: 'Format', value: 'Self-paced' },
        ]}
      >
        <a href="/academy" className="btn btn-primary">
          Browse all courses <ArrowRight size={18} />
        </a>
        <a href="/contact" className="btn btn-ghost">
          Contact us
        </a>
      </Hero>

      {/* Intro + stats */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="body-lg text-[var(--ink-700)]">
              EdLight Initiative offers free, high-quality online courses designed to help you develop
              practical skills for the modern workforce. All courses are self-paced and accessible from
              anywhere with an internet connection.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="rounded-2xl border border-[var(--paper-200)] bg-white p-6 text-center">
                  <div className="numeral text-3xl font-semibold text-[var(--accent)]">{stat.value}</div>
                  <div className="mt-1 text-sm text-[var(--ink-700)]">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Course categories */}
      <section className="bg-[var(--paper-100)] py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 space-y-16">
          {courseCategories.map((category) => {
            const Icon = category.icon
            return (
              <div key={category.title}>
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon size={22} />
                  </div>
                  <h2 className="display-md text-[var(--ink-900)]">{category.title}</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {category.courses.map((course, i) => (
                    <Reveal key={course.name} delay={i * 60}>
                      <div className="flex h-full flex-col rounded-2xl border border-[var(--paper-200)] bg-white p-6 transition-shadow hover:shadow-md">
                        <div className="mb-3">
                          <span className="inline-block rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                            {course.level}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-[var(--ink-900)]">{course.name}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-700)]">{course.description}</p>
                        <div className="mt-5 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-400)]">
                            <BookOpen size={16} />
                            {course.duration}
                          </span>
                          <a
                            href="/academy"
                            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:gap-2 transition-all"
                          >
                            Enroll now <ArrowRight size={15} />
                          </a>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader title="How it works" subtitle="Start learning in three simple steps." centered />
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[var(--paper-200)] bg-white p-7 text-center">
                  <span className="numeral mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-semibold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-[var(--ink-900)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{step.body}</p>
                </div>
              </Reveal>
            ))}
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
                <span className="eyebrow text-white/85">Start today</span>
                <h2 className="display-md mt-3 text-white">Ready to start learning?</h2>
                <p className="mt-3 text-white/90">
                  Join thousands of students who are already learning and building their future with
                  EdLight Academy.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="/academy" className="btn btn-light">
                  Browse all courses
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
