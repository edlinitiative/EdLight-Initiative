'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  Bell,
  BookOpenCheck,
  Brain,
  Briefcase,
  CalendarDays,
  Compass,
  DollarSign,
  GraduationCap,
  Lightbulb,
  Mail,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'
import TestimonialCard from '@/components/TestimonialCard'
import ImpactCounters from '@/components/ImpactCounters'
import ImageCarousel from '@/components/ImageCarousel'
import NotifyModal from '@/components/NotifyModal'
import testimonialsData from '@/data/testimonials.json'

/* ── Links ──────────────────────────────────────────────── */
const APP_PREVIEW_URL =
  'https://drive.google.com/file/d/1Yj2Esxmw2khDxFmOXiupMOtZwKr1wERv/view?usp=sharing'
const PROGRAM_DESC_URL =
  'https://drive.google.com/file/d/1lhB-m426vXymiwZW24HNC8EsAgh2aaZ_/view?usp=sharing'
const EMAIL = 'info@edlight.org'

/* ── Hero images (auto-carousel) ────────────────────────── */
const heroImages = [
  '/Graduation_Pics.webp',
  '/ESLP_Cultural_Performances.webp',
  '/Best_Participant_Award.webp',
]

/* ── Impact counters ────────────────────────────────────── */
const impactCounters = [
  { label: 'Participants', value: 65, suffix: '+' },
  { label: 'Women', value: 73, suffix: '%' },
  { label: 'Years of Experience', value: 3, suffix: '+' },
  { label: 'Scholarships', value: 100, suffix: '%' },
]

/* ── Experience highlights ──────────────────────────────── */
const experienceHighlights = [
  {
    title: 'Leadership studios',
    description:
      'Interactive sessions on personal leadership, social innovation, public speaking, and collaborative problem solving.',
    icon: <Users size={28} />,
  },
  {
    title: 'Masterclasses & mentors',
    description:
      'Facilitated by Haitian and international leaders from Harvard, MIT, Deutsche Bank, Microsoft, and more.',
    icon: <Star size={28} />,
  },
  {
    title: 'City immersions',
    description:
      "Site visits to companies, embassies, media houses, and cultural institutions that expand each fellow's worldview.",
    icon: <Compass size={28} />,
  },
  {
    title: 'Impact pitch night',
    description:
      'Cohort teams design initiatives for Haitian communities and present them to a panel of mentors and partners.',
    icon: <Sparkles size={28} />,
  },
]

/* ── Curriculum pillars ─────────────────────────────────── */
const curriculumPillars = [
  {
    title: 'Personal Discovery',
    description: 'Self-awareness, leadership styles, values mapping, and public speaking.',
    icon: <Brain size={28} />,
  },
  {
    title: 'Professional Orientation',
    description: 'Career exploration, résumé clinics, and mentorship from industry professionals.',
    icon: <Briefcase size={28} />,
  },
  {
    title: 'College Admissions & Scholarships',
    description: 'Guidance on studying abroad in the USA, Canada, France, Taiwan, Morocco, and more.',
    icon: <GraduationCap size={28} />,
  },
  {
    title: 'Finance',
    description: 'Personal finance, budgeting, saving, and understanding the economic landscape.',
    icon: <DollarSign size={28} />,
  },
  {
    title: 'Entrepreneurship',
    description: 'Business model canvas, market research, prototyping, and the final capstone pitch.',
    icon: <Lightbulb size={28} />,
  },
]

/* ── Curriculum experience tabs ──────────────────────────── */
const curriculumTabs = [
  {
    label: 'Seminary',
    image: '/gallery/eslp-3.jpg',
    alt: 'Virtual seminary session with expert speakers on Zoom',
    description:
      'From 9 AM to 12 PM, fellows meet virtually with expert speakers from institutions like Harvard, MIT, Cornell, Deutsche Bank, and Microsoft. Interactive sessions cover leadership, personal development, college admissions, finance, and entrepreneurship — offering students a platform to engage directly with industry leaders.',
  },
  {
    label: 'Excursion',
    image: '/gallery/eslp-4.jpg',
    alt: 'ESLP fellows visiting a prominent company in Port-au-Prince',
    description:
      'The program includes an enriching excursion to a prominent company in Port-au-Prince, allowing fellows to gain real-world insights into workplace dynamics, innovation, and leadership in action. Transportation and entries are fully covered for every fellow.',
  },
  {
    label: 'Graduation',
    image: '/gallery/eslp-6.jpg',
    alt: 'ESLP graduation ceremony and celebration',
    description:
      'The program culminates in a capstone pitch showcase where cohort teams present their community initiatives to a panel of mentors, partners, and families. Fellows receive certificates of distinction recognizing their leadership, collaboration, and successful completion of projects.',
  },
]

/* ── Journey phases ─────────────────────────────────────── */
const phases = [
  {
    title: 'Discover',
    description: 'We recruit curious, community-minded students ready to grow as leaders.',
    bullets: [
      'Application form with short essays',
      'Submit transcripts and an ID photo',
      'Selection based on motivation, service, and representation',
    ],
    icon: Compass,
  },
  {
    title: 'Prepare',
    description: 'Accepted fellows join pre-program circles that build community before day one.',
    bullets: [
      'Welcome orientation for fellows and families',
      'Laptop, webcam, and stable internet required',
      'Receive your EdLight welcome package',
    ],
    icon: CalendarDays,
  },
  {
    title: 'Immerse',
    description: 'Two weeks of experiential learning blending seminars, fieldwork, and creative expression.',
    bullets: [
      'Morning virtual seminars with expert speakers',
      'Team-based entrepreneurial projects with mentors',
      'Excursion to a prominent company in Port-au-Prince',
    ],
    icon: BookOpenCheck,
  },
  {
    title: 'Amplify',
    description: 'Fellows graduate, join the alumni network, and continue to launch community projects.',
    bullets: [
      'Capstone pitch showcase with partners and families',
      'Alumni mentorship and micro-grant opportunities',
      'Ongoing leadership coaching with the EdLight team',
    ],
    icon: Sparkles,
  },
]

/* ── Eligibility & selection ────────────────────────────── */
const eligibility = [
  'Students aged 15–18 currently enrolled in a Haitian high school.',
  'Learners who demonstrate curiosity, teamwork, empathy, and leadership potential.',
  'Participants committed to attending every session, workshop, and excursion.',
]

const selectionCriteria = [
  "Motivation, character, and alignment with EdLight's mission",
  'Community involvement or leadership in clubs, faith groups, or initiatives',
  'Academic curiosity, discipline, and willingness to learn',
  'Balanced representation across regions, schools, and gender',
]

/* ── Benefits ───────────────────────────────────────────── */
const benefits = [
  {
    title: 'All-inclusive experience',
    description: 'Workshops, curriculum materials, supplies, and daily meals provided for every fellow.',
    icon: <BookOpenCheck size={28} />,
  },
  {
    title: 'Excursions & cultural labs',
    description: 'Transportation and entries for site visits, service projects, and cultural events covered in full.',
    icon: <Compass size={28} />,
  },
  {
    title: 'Mentors & alumni network',
    description: 'Access to industry mentors plus ongoing guidance from ESLP alumni after graduation.',
    icon: <Users size={28} />,
  },
  {
    title: 'Certificate of distinction',
    description: 'Recognizes leadership, collaboration, and successful completion of capstone projects.',
    icon: <Star size={28} />,
  },
]

/* ── ESLP testimonials (from data + inline) ─────────────── */
const eslpTestimonial = testimonialsData.find((t) => t.role.includes('ESLP'))
const eslpTestimonials = [
  ...(eslpTestimonial ? [eslpTestimonial] : []),
  {
    id: 10,
    name: 'Nathalie',
    role: 'ESLP 2023 Fellow',
    image: '/gallery/student-1.jpg',
    quote:
      'ESLP helped me discover my voice. I launched a literacy club at my school with the support of alumni mentors.',
  },
  {
    id: 11,
    name: 'James',
    role: 'ESLP 2024 Fellow',
    image: '/gallery/student-2.jpg',
    quote:
      'From day one, I felt seen and challenged. The workshops sharpened my confidence to lead community change.',
  },
]

/* ── FAQ ─────────────────────────────────────────────────── */
const faqs = [
  {
    question: 'When does the next cohort take place?',
    answer:
      'The ESLP 2026 edition has not been announced yet. Dates, application deadlines, and orientation details will be shared on our channels and by email. Stay tuned!',
  },
  {
    question: 'Is the program really free?',
    answer:
      'Yes. Thanks to generous partners and sponsors, ESLP covers all program costs including materials, meals, excursions, and local transportation.',
  },
  {
    question: 'What documents will I need to apply?',
    answer:
      'Typically you submit: (1) an application form, (2) two essays — one about your extracurricular activities and another about your interest in the program, (3) a recent ID picture, and (4) your current academic transcripts as a PDF.',
  },
  {
    question: 'Do fellows need to speak English?',
    answer:
      'Sessions are bilingual (Kreyòl and French/English). Comfort with Kreyòl is essential. Fellows also gain access to additional language practice resources during the residency.',
  },
  {
    question: 'What do I need to prepare before the program?',
    answer:
      'You will need a laptop or desktop with a webcam, a reliable internet connection, Zoom installed, plus a notebook and pencil. You may also receive a welcome package from EdLight.',
  },
  {
    question: 'How can organizations get involved?',
    answer: `Organizations can mentor a session, host an excursion, provide scholarships, or offer internships to ESLP alumni. Reach out to ${EMAIL} to co-create a partnership.`,
  },
]

/* ── "What is ESLP" section carousel images ─────────────── */
const whatIsEslpImages = [
  { src: '/gallery/eslp-1.jpg', alt: 'ESLP fellows during a leadership workshop' },
  { src: '/gallery/eslp-2.jpg', alt: 'Students collaborating on their capstone project' },
  { src: '/gallery/eslp-5.jpg', alt: 'Fellows presenting their entrepreneurial ideas' },
]

/* ═══════════════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════════════ */
export default function ESLPPage() {
  /* ── Notify modal ── */
  const [notifyOpen, setNotifyOpen] = useState(false)

  /* ── Hero carousel ── */
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  /* ── Curriculum tab ── */
  const [activeTab, setActiveTab] = useState(0)

  /* ── Testimonial carousel ── */
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % eslpTestimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* ═══ Hero ═══ */}
      <Hero
        title="EdLight Summer Leadership Program"
        subtitle="Empowering the youth of Haiti with skills and knowledge to become better leaders and future citizens."
        backgroundImage={heroImages[currentHeroImage]}
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => setNotifyOpen(true)} className="btn btn-primary">
            <Bell size={18} /> Get notified for ESLP 2026
          </button>
          <a
            href={APP_PREVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light"
          >
            See past application
          </a>
        </div>
      </Hero>

      {/* ═══ Impact Stats — Animated Counters ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="The flagship leadership experience for Haitian teens"
            subtitle="Since 2022, ESLP has combined world-class facilitation, real-world exposure, and a vibrant alumni network so young leaders can transform their ideas into action."
            centered
          />
          <div className="glass rounded-2xl p-6 sm:p-10">
            <ImpactCounters counters={impactCounters} />
          </div>
        </div>
      </section>

      {/* ═══ What is ESLP — text + image ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <SectionHeader
                title="What is the EdLight Summer Leadership Program?"
                subtitle="Launched in August 2022, ESLP is a two-week summer program for students between 15 and 18 years old designed to empower their leadership skills."
              />
              <div className="glass rounded-2xl p-6 space-y-4">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  The idea came from the fact that no proper programs in Haiti
                  bring students together to reflect on global and local issues.
                  ESLP creates a viable space where students are introduced to
                  concepts and practices that help make them better future citizens.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  We have had several prominent speakers from leading organizations
                  and institutions — including{' '}
                  <strong className="text-primary">
                    Harvard, MIT, Microsoft, Deutsche Bank, and Cornell
                  </strong>{' '}
                  — who joined the program to share their expertise and inspire our
                  fellows.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={PROGRAM_DESC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Program description
                </a>
                <button onClick={() => setNotifyOpen(true)} className="btn btn-light">
                  Get notified <Bell size={16} />
                </button>
              </div>
            </div>
            <ImageCarousel
              images={whatIsEslpImages}
              interval={4500}
              aspectRatio="aspect-[3/2]"
            />
          </div>
        </div>
      </section>

      {/* ═══ Inside the Residency — Card component ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <SectionHeader
                title="Inside the ESLP residency"
                subtitle="High-energy days blend leadership labs, design thinking, cultural exploration, and community-building."
              />
              <div className="grid gap-6 sm:grid-cols-2">
                {experienceHighlights.map((h) => (
                  <Card
                    key={h.title}
                    title={h.title}
                    description={h.description}
                    icon={h.icon}
                  />
                ))}
              </div>
            </div>

            <div className="glass-strong rounded-2xl bg-gradient-to-br from-primary/90 via-primary/80 to-primary/95 p-8 text-white shadow-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                Signature experience
              </p>
              <h3 className="mt-4 font-heading text-2xl font-semibold">
                Capstone Challenge Week
              </h3>
              <p className="mt-4 text-sm text-white/80 leading-relaxed">
                Fellows collaborate in multidisciplinary squads of 4–5 to design
                solutions for local challenges. Each team is paired with an
                experienced mentor in entrepreneurship and project development. They
                complete stakeholder interviews, prototype ideas, and present an
                actionable roadmap during the closing pitch night in front of
                families, alumni, and partners.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide">
                {['Design thinking', 'Community impact', 'Team coaching', 'Mentorship'].map(
                  (tag) => (
                    <span key={tag} className="rounded-full bg-white/15 px-3 py-1">
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Curriculum Pillars — Card component ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Curriculum"
            subtitle="The ESLP curriculum focuses on five core areas spread across the two-week program. For each topic, we invite expert speakers from leading institutions."
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {curriculumPillars.map((pillar) => (
              <Card
                key={pillar.title}
                title={pillar.title}
                description={pillar.description}
                icon={pillar.icon}
              />
            ))}
          </div>
          <div className="glass rounded-2xl mt-10 p-6">
            <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 leading-relaxed">
              In parallel, students are grouped into teams and challenged to
              develop a project that addresses a specific need in their community.
              The program also includes an excursion to a major company in
              Port-au-Prince, allowing students to gain real-world insights into
              workplace dynamics, innovation, and leadership in action.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Curriculum Experience — Tabbed ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Experience the curriculum"
            subtitle="From virtual seminars with world-class speakers to hands-on excursions and a celebration of achievement."
            centered
          />

          {/* Tab buttons */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-10">
            {curriculumTabs.map((tab, idx) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(idx)}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === idx
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'glass text-gray-600 hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[3/2]">
              {curriculumTabs.map((tab, idx) => (
                <div
                  key={tab.label}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeTab === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={tab.image}
                    alt={tab.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="glass rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                {curriculumTabs[activeTab].label}
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-text">
                {curriculumTabs[activeTab].label === 'Seminary'
                  ? 'Interactive virtual seminars'
                  : curriculumTabs[activeTab].label === 'Excursion'
                    ? 'Real-world company visits'
                    : 'Capstone showcase & ceremony'}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {curriculumTabs[activeTab].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Journey Phases ═══ */}
      <section className="relative overflow-hidden bg-slate-950 py-16 md:py-20 text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_rgba(15,23,42,0.9))]" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
              Journey
            </p>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-white">
              From application to alumni leadership
            </h2>
            <p className="mt-4 text-base text-slate-300">
              ESLP is designed as a guided journey. Fellows receive holistic
              support at every phase — from recruitment to post-program mentorship.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            {phases.map((phase, idx) => {
              return (
                <div
                  key={phase.title}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-[0_10px_40px_rgba(15,23,42,0.5)]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-sm">
                      {idx + 1}
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-white">
                      {phase.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">
                    {phase.description}
                  </p>
                  <ul className="space-y-2 text-sm text-slate-200/80">
                    {phase.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <ArrowRight size={14} className="mt-1 text-primary shrink-0" />
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

      {/* ═══ Eligibility & Selection ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Eligibility & selection"
            subtitle="We're looking for young leaders who are eager to learn, collaborate, and serve their communities."
            centered
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-text mb-4">
                <Users size={22} className="text-primary" /> Who should apply?
              </h3>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                {eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-text mb-4">
                <Star size={22} className="text-primary" /> How we select fellows
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                ESLP is highly competitive. We evaluate each application
                holistically to build a diverse, mission-aligned cohort of ~30
                students.
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                {selectionCriteria.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ArrowRight size={14} className="mt-1.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Application Process — with image ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/edlight_academy_group.webp"
                alt="EdLight students in a group setting"
                width={720}
                height={480}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <SectionHeader
                title="How to apply"
                subtitle="When applications open, submit your documents through our online form. Here's what you'll need:"
              />
              <div className="glass rounded-2xl p-6 space-y-5">
                {[
                  {
                    step: '1',
                    title: 'Application Form',
                    desc: 'Fill out the form with your name, address, school information, and more.',
                  },
                  {
                    step: '2',
                    title: 'Two Essays',
                    desc: 'One about your extracurricular activities, another showcasing your interest in the program.',
                  },
                  {
                    step: '3',
                    title: 'ID Picture',
                    desc: 'Provide a recent ID picture for identification purposes.',
                  },
                  {
                    step: '4',
                    title: 'Transcripts',
                    desc: 'Submit your current academic year transcripts as a PDF.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm shadow-md">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-heading font-semibold text-text">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={APP_PREVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light"
                >
                  Preview past application
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ESLP 2026 — Coming Soon Announcement ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-primary/90 p-8 sm:p-12 text-white shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent)]" />
            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                  <Bell size={14} /> Coming Soon
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  ESLP 2026
                </h2>
                <p className="text-base text-white/80 leading-relaxed max-w-xl">
                  The next edition of the EdLight Summer Leadership Program has not
                  been announced yet. Dates, application deadlines, and details will
                  be shared soon. Sign up to be the first to know!
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:flex-col lg:flex-row shrink-0">
                <button onClick={() => setNotifyOpen(true)} className="btn btn-light">
                  <Bell size={16} /> Get notified
                </button>
                <a
                  href={`mailto:${EMAIL}`}
                  className="btn btn-ghost"
                >
                  <Mail size={16} /> {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Fully Funded — Card component ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Fully funded for every fellow"
            subtitle="ESLP is powered by partners and donors who believe that leadership development should be accessible."
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <Card
                key={benefit.title}
                title={benefit.title}
                description={benefit.description}
                icon={benefit.icon}
              />
            ))}
          </div>
          <div className="glass-strong rounded-2xl mt-10 p-6 sm:p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70 mb-2">
              Scholarship guarantee
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Every fellow attends ESLP tuition-free. Sponsors help cover travel
              stipends, technology, and launch grants for alumni-led initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Alumni & Testimonials — TestimonialCard + carousel ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Voices from our alumni"
            subtitle="Meet the inspiring faces of our past participants. Through ESLP, they have honed their skills, gained invaluable insights, and forged lifelong connections."
            centered
          />
          <div className="max-w-3xl mx-auto">
            <TestimonialCard {...eslpTestimonials[currentTestimonial]} />
            <div className="flex justify-center gap-2 mt-6">
              {eslpTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Frequently asked questions"
            subtitle={`Need more details? Email ${EMAIL} and our team will follow up within two business days.`}
            centered
          />
          <div className="mx-auto max-w-4xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group glass rounded-2xl p-6 transition"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-left text-base font-semibold text-text">
                  {faq.question}
                  <span className="text-primary transition group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="pb-20 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 via-primary to-primary/90 p-8 sm:p-10 text-white shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent)]" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                  ESLP 2026 · Dates coming soon
                </p>
                <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold">
                  Ready to lead with purpose?
                </h2>
                <p className="mt-3 text-sm md:text-base text-white/80 max-w-lg">
                  Sign up to be notified when applications open. You can also
                  nominate a student or partner with ESLP to sponsor the next
                  generation of Haitian leaders.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0">
                <button onClick={() => setNotifyOpen(true)} className="btn btn-light">
                  <Bell size={16} /> Get notified
                </button>
                <a href={`mailto:${EMAIL}`} className="btn btn-ghost">
                  <Mail size={16} /> Partner with ESLP
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Notify Modal ═══ */}
      <NotifyModal open={notifyOpen} onClose={() => setNotifyOpen(false)} />
    </>
  )
}
