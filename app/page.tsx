'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Code2, Lightbulb, Globe, GraduationCap } from 'lucide-react'
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
    description: 'A two-week hybrid leadership programme helping Haitian students grow through seminars, mentorship, and community impact projects.',
    icon: <GraduationCap size={32} />,
    href: '/eslp',
  },
]

const impactCounters = [
  { label: 'Students Served', value: impactData.studentsServed },
  { label: 'Courses Offered', value: impactData.coursesOffered },
  { label: 'Partner Organizations', value: impactData.partnerOrganizations },
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
        eyebrow="EdLight Initiative · Est. 2020"
        title="Empowering the next generation of Haitian innovators."
        subtitle="Quality education, mentorship, and global opportunities — built with and for students across Haiti."
        backgroundImage={heroImages[currentHeroImage]}
        meta={[
          { label: 'Students Served', value: `${impactData.studentsServed}+` },
          { label: 'Programs', value: '5' },
          { label: 'Partner Orgs', value: `${impactData.partnerOrganizations}+` },
          { label: 'Founded', value: '2020' },
        ]}
      >
        <Link
          href="/academy"
          className="group inline-flex items-center justify-center gap-2 bg-white text-[var(--ink-900)] font-medium px-6 py-3 hover:bg-[var(--paper-100)] transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          Explore Programs
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/get-involved"
          className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/5 text-white font-medium px-6 py-3 hover:bg-white/10 hover:border-white/70 transition-colors text-sm sm:text-base w-full sm:w-auto backdrop-blur-sm"
        >
          Support Us
        </Link>
      </Hero>

      {/* Mission & Vision */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="Our Mission & Vision"
              subtitle="Creating pathways to excellence for Haitian youth"
              centered
            />
            <div className="border border-[var(--paper-200)] bg-[var(--paper-100)] p-6 sm:p-8 space-y-4 text-[var(--ink-700)] leading-relaxed text-sm sm:text-base">
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
        </div>
      </section>

      {/* Ecosystem Programs */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Our Ecosystem"
            subtitle="Comprehensive programs supporting students at every stage"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--paper-200)]">
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
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title="Our Impact" subtitle="Making a difference in communities across Haiti" centered />
          <ImpactCounters counters={impactCounters} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title="Student Stories" subtitle="Hear from our alumni" centered />
          <div className="max-w-2xl mx-auto">
            <TestimonialCard {...testimonialsData[currentTestimonial]} />
            <div className="flex justify-center gap-2 mt-6">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-[var(--accent)]' : 'bg-[var(--paper-300)]'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
