import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Cast,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Laptop,
  Sparkles,
  Users,
} from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import videosData from '@/data/videos.json'

type Stat = {
  value: string
  label: string
  description: string
}

type Feature = {
  title: string
  description: string
  icon: React.ElementType
}

type Pillar = {
  title: string
  description: string
  highlights: string[]
  icon: React.ElementType
}

type JourneyPhase = {
  title: string
  description: string
  bullets: string[]
  icon: React.ElementType
}

const stats: Stat[] = [
  {
    value: '500+',
    label: 'Video lessons',
    description: 'Covering maths, sciences, language, entrepreneurship, and career development.',
  },
  {
    value: '100%',
    label: 'Free access',
    description: 'Built for Haitian learners everywhere with zero subscription fees.',
  },
  {
    value: '24/7',
    label: 'Learning availability',
    description: 'Self-paced and mobile-friendly so students can learn anytime, anywhere.',
  },
]

const features: Feature[] = [
  {
    title: 'Curriculum-aligned content',
    description:
      'Lessons designed with Haitian educators and university mentors to reinforce national exam requirements.',
    icon: GraduationCap,
  },
  {
    title: 'Bilingual learning experience',
    description:
      'Choose Haitian Creole or French, with subtitles and transcripts optimized for low bandwidth environments.',
    icon: Globe2,
  },
  {
    title: 'Dynamic feedback loop',
    description:
      'Instant feedback on quizzes, downloadable practice sets, and progress tracking dashboards.',
    icon: CheckCircle2,
  },
  {
    title: 'Mentors & community events',
    description:
      'Live study sessions, AMAs with professionals, and a supportive community of peers and alumni.',
    icon: Users,
  },
]

const pillars: Pillar[] = [
  {
    title: 'STEM Foundations',
    description: 'Strengthen core analytical skills across maths, physics, and chemistry modules.',
    highlights: [
      'Interactive problem banks',
      'Exam strategy clinics',
      'Virtual lab demonstrations',
    ],
    icon: Laptop,
  },
  {
    title: 'Business & Economics',
    description: 'Build financial literacy, entrepreneurship skills, and market awareness.',
    highlights: [
      'Budgeting and microenterprise labs',
      'Case studies on Haitian innovators',
      'Career pathways in finance and trade',
    ],
    icon: Award,
  },
  {
    title: 'Languages & Communication',
    description: 'Expand literacy, storytelling, and public speaking confidence in multiple languages.',
    highlights: [
      'Creole and French grammar journeys',
      'Vocabulary builders with audio prompts',
      'Speech workshops led by mentors',
    ],
    icon: Cast,
  },
]

const learningJourney: JourneyPhase[] = [
  {
    title: 'Explore',
    description: 'Learners browse curated playlists or search by subject, grade level, or exam goal.',
    bullets: [
      'Personalized onboarding quiz',
      'Dynamic recommendations by interest',
      'Saved playlists and reminders',
    ],
    icon: Sparkles,
  },
  {
    title: 'Engage',
    description: 'Video lessons combine storytelling, visuals, and real-world examples to explain complex topics.',
    bullets: [
      'Downloadable notes and slide decks',
      'Hands-on prompts and reflection questions',
      'Works seamlessly across mobile devices',
    ],
    icon: BookOpenCheck,
  },
  {
    title: 'Practice',
    description: 'Every lesson ends with interactive quizzes and exercises that provide instant coaching.',
    bullets: [
      'Adaptive question banks',
      'Immediate grading and tips',
      'Progress badges for milestones',
    ],
    icon: CheckCircle2,
  },
  {
    title: 'Level up',
    description: 'Learners connect with mentors, join live workshops, and access certificates for mastery.',
    bullets: [
      'Weekly study community sessions',
      'Project-based showcases',
      'Certificate download for completed tracks',
    ],
    icon: Users,
  },
]

const courseCategories = [
  {
    title: 'Maths',
    description: 'Strengthen problem-solving with algebra, calculus, and exam strategies.',
    icon: Laptop,
  },
  {
    title: 'Physics',
    description: 'Explore motion, energy, and the laws that explain how the world works.',
    icon: GraduationCap,
  },
  {
    title: 'Chemistry',
    description: 'Understand reactions, matter, and laboratory concepts for modern science.',
    icon: BookOpenCheck,
  },
  {
    title: 'Economics',
    description: 'Analyze markets, development, and decision-making in global contexts.',
    icon: Award,
  },
]

export default function AcademyPage() {
  return (
    <>
      <Hero
        title="EdLight Academy"
        subtitle="Modern, free, and bilingual digital learning designed for Haitian students everywhere."
  backgroundImage="/edlight_academy_group.webp"
      >
        <div className="flex justify-center gap-4">
          <Link href="#start" className="btn btn-primary">
            Start learning <ArrowRight size={18} />
          </Link>
          <a href="mailto:academy@edlight.org" className="btn btn-light">
            Bring Academy to my school
          </a>
        </div>
      </Hero>

      <section id="start" className="bg-gradient-to-b from-slate-50 via-white to-white py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Education built for access and impact"
            subtitle="Thousands of Haitian learners log into EdLight Academy to deepen knowledge, prepare for exams, and explore new futures."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-md transition hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 transition group-hover:opacity-100" />
                <div className="relative z-10 space-y-3">
                  <span className="text-4xl font-bold text-primary">{stat.value}</span>
                  <h3 className="text-lg font-semibold text-text">{stat.label}</h3>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <SectionHeader
                title="What makes EdLight Academy different"
                subtitle="Purposeful design, localized stories, and tech-enabled learning keeps students engaged from the first lesson."
              />
              <div className="grid gap-6 sm:grid-cols-2">
                {features.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <div key={feature.title} className="rounded-3xl border border-primary/10 bg-white p-6 shadow-sm">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-text">{feature.title}</h3>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/95 via-primary/85 to-primary p-8 text-white shadow-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">Experience snapshot</p>
              <h3 className="mt-4 font-heading text-2xl font-semibold">Interactive studio lessons</h3>
              <p className="mt-4 text-sm text-white/80 leading-relaxed">
                Lessons are shot in studio with motion graphics, real-life scenarios, and bilingual instructors. Every
                chapter includes downloads and quick challenges so learners stay engaged beyond the video.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide">
                <span className="rounded-full bg-white/15 px-3 py-1">Creole + French</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Offline downloads</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Exam prep labs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 py-20 text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_rgba(15,23,42,0.9))]" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Learning journey</p>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-white">From discovery to mastery</h2>
            <p className="mt-4 text-base text-slate-300">
              EdLight Academy guides students through an intentional flow so they can explore, understand, practice, and
              ultimately lead with confidence.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            {learningJourney.map((phase) => {
              const Icon = phase.icon
              return (
                <div key={phase.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.5)]">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-white/10 p-2 text-primary">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-white">{phase.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-slate-300">{phase.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-200/80">
                    {phase.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <ArrowRight size={14} className="mt-1 text-primary" />
                        <span>{bullet}</span>
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
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Learning pillars"
            subtitle="Learners can curate their journey across STEM, business, and communication tracks."
            centered
          />
          <div className="grid gap-8 lg:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div key={pillar.title} className="rounded-3xl border border-primary/10 bg-white p-7 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 p-2 text-primary">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-text">{pillar.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                    {pillar.highlights.map((highlight) => (
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

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <SectionHeader title="Course collections" subtitle="New playlists are added monthly to support exam prep, career exploration, and creative skills." centered />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {courseCategories.map((category) => {
              const Icon = category.icon
              return (
                <div
                  key={category.title}
                  className="group rounded-3xl border border-primary/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text">{category.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{category.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <SectionHeader
              title="How it works"
              subtitle="Five simple steps to start learning with EdLight Academy"
              centered
            />
            <div className="rounded-3xl border border-primary/10 bg-white p-10 text-gray-700 space-y-4 shadow-lg">
              {[
                'Create a free account or sign in with your Google credentials.',
                'Choose a learning path based on your goals, grade level, or upcoming exams.',
                'Watch lessons and download study materials to revisit offline.',
                'Complete quizzes, earn digital badges, and unlock mentor feedback.',
                'Share progress with parents, teachers, or employers using personalized reports.',
              ].map((step, index) => (
                <div key={step} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-semibold">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-slate-100">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Featured lessons"
            subtitle="Discover what learners are watching right now on EdLight Academy."
            centered
          />
          <div className="grid gap-8 md:grid-cols-3">
            {videosData.map((video) => (
              <div key={video.id} className="rounded-3xl border border-white/10 bg-white/5">
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent">
                  <p className="text-sm text-slate-100/90">Video: {video.title}</p>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-white">{video.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/90 via-primary to-primary/90 p-10 text-white shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent)]" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Join the community</p>
                <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Ready to unlock EdLight Academy?</h2>
                <p className="mt-3 text-sm md:text-base text-white/80">
                  Sign up for free, bring the platform to your classroom, or sponsor new course collections for Haitian
                  learners.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="#start" className="btn btn-light">
                  Start learning today
                </Link>
                <a href="mailto:academy@edlight.org" className="btn btn-primary">
                  Partner with EdLight
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
