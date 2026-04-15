'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Code2, Lightbulb, Globe, GraduationCap, CircleCheckBig } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'
import TestimonialCard from '@/components/TestimonialCard'
import ImpactCounters from '@/components/ImpactCounters'
import impactData from '@/data/impact.json'
import testimonialsData from '@/data/testimonials.json'

const heroImages = [
  '/edlight_academy_group.webp',
  '/labs_pics.webp',
  '/nexus_pic.webp',
  '/ESLP_Cultural_Performances.webp',
]

const ecosystemPrograms = [
  {
    title: 'EdLight Academy',
    description: 'Free online courses in Math, Physics, Economics, and Leadership for Haitian students.',
    icon: <BookOpen size={32} />,
    href: '/academy',
  },
  {
    title: 'EdLight Code',
    description: 'Hands-on coding tracks in Python, SQL, Web Development, and more — learn and earn certificates in your browser.',
    icon: <Code2 size={32} />,
    href: '/code',
  },
  {
    title: 'EdLight Labs',
    description: 'STEM incubator providing training, mentorship, and demo day opportunities for tech innovators.',
    icon: <Lightbulb size={32} />,
    href: '/labs',
  },
  {
    title: 'EdLight Nexus',
    description: 'Connecting students with global exchange programs, scholarships, and opportunities.',
    icon: <Globe size={32} />,
    href: '/nexus',
  },
  {
    title: 'ESLP',
    description: 'Summer Leadership Program developing the next generation of Haitian leaders.',
    icon: <GraduationCap size={32} />,
    href: '/eslp',
  },
]

const impactCounters = [
  { label: 'Students Served', value: impactData.studentsServed },
  { label: 'Courses Offered', value: impactData.coursesOffered },
  { label: 'Partner Organizations', value: impactData.partnerOrganizations },
  { label: 'Community Members', value: impactData.communityMembers },
]

const priorities = [
  'Expand equitable access to high-quality STEM and leadership education',
  'Strengthen mentorship pipelines from local communities to global institutions',
  'Develop future-ready skills aligned with innovation and workforce opportunities',
  'Scale measurable social impact through strategic program partnerships',
]

export default function HomePage() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Empowering the Next Generation of Haitian Innovators"
        subtitle="Building a brighter future through quality education, mentorship, and global opportunities"
        backgroundImage={heroImages[currentHeroImage]}
      >
        <div className="mb-5 inline-flex rounded-full border border-white/45 bg-white/15 px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase text-white/95">
          Strategic education ecosystem
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/academy"
            className="btn btn-light"
          >
            Explore Programs <ArrowRight size={20} />
          </Link>
          <Link
            href="/get-involved"
            className="btn btn-primary"
          >
            Support Us
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-white/90">
          <span>Trusted by students and families across Haiti</span>
          <span className="hidden sm:inline text-white/65">•</span>
          <span>Community-led since 2015</span>
        </div>
      </Hero>

      {/* Leadership Snapshot */}
      <section className="py-8 border-y border-primary/10 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 items-center">
            {impactCounters.map((item) => (
              <div key={item.label} className="rounded-2xl border border-primary/10 bg-white/80 px-5 py-4 shadow-sm">
                <p className="text-2xl sm:text-3xl font-heading font-bold text-primary">{item.value.toLocaleString()}+</p>
                <p className="mt-1 text-sm text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <SectionHeader
                title="Our Mission & Vision"
                subtitle="Creating pathways to excellence for Haitian youth through high-impact education and leadership development"
              />
              <div className="glass rounded-2xl p-6 sm:p-8 space-y-5 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
                <p>
                  EdLight Initiative was founded on the belief that every young person in Haiti deserves
                  access to world-class education and opportunities. We work to bridge the educational gap
                  by providing free, high-quality learning resources and creating connections with global
                  institutions.
                </p>
                <p>
                  Through our comprehensive ecosystem of programs—from online courses to tech incubators
                  to leadership development—we empower students to pursue their dreams and become the
                  innovators, leaders, and changemakers Haiti needs.
                </p>
                <p>
                  Our vision is a Haiti where every motivated student has the resources, mentorship, and
                  opportunities to reach their full potential and contribute to building a more prosperous
                  nation.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-primary/15 bg-white/85 p-6 sm:p-7 shadow-[0_20px_45px_-28px_rgba(4,75,171,0.5)]">
                <h3 className="font-heading text-xl font-bold text-text mb-4">Strategic Priorities</h3>
                <ul className="space-y-3">
                  {priorities.map((priority) => (
                    <li key={priority} className="flex items-start gap-3 text-sm sm:text-[0.95rem] text-slate-700 leading-relaxed">
                      <CircleCheckBig className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{priority}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Programs */}
      <section className="py-14 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Ecosystem"
            subtitle="Comprehensive programs supporting students at every stage"
            centered
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ecosystemPrograms.map((program) => (
              <Card
                key={program.title}
                title={program.title}
                description={program.description}
                icon={program.icon}
                href={program.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Counters */}
      <section className="py-14 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center rounded-3xl border border-primary/10 bg-white/80 p-6 sm:p-8 md:p-10 shadow-[0_22px_50px_-30px_rgba(4,75,171,0.55)]">
            <div className="lg:col-span-4">
              <SectionHeader title="Our Impact" subtitle="Measurable outcomes across communities in Haiti" className="mb-0" />
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                We prioritize transparent results and sustained student growth through a model that combines access,
                mentorship, and long-term support.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ImpactCounters counters={impactCounters} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader title="Student Stories" subtitle="Hear from our alumni" centered />
          <div className="max-w-3xl mx-auto">
            <TestimonialCard {...testimonialsData[currentTestimonial]} />
            <div className="flex justify-center gap-2 mt-5 sm:mt-6">
              {testimonialsData.map((_, index) => (
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
            <div className="mt-8 text-center">
              <Link href="/get-involved" className="btn btn-primary">
                Partner With Us <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
