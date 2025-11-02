'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Lightbulb, Globe, GraduationCap } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'
import TestimonialCard from '@/components/TestimonialCard'
import ImpactCounters from '@/components/ImpactCounters'
import impactData from '@/data/impact.json'
import testimonialsData from '@/data/testimonials.json'

const heroImages = [
  '/edlight_academy_group.jpg',
  '/labs_pics.png',
  '/nexus_pic.png',
  '/ESLP_Cultural_Performances.jpg',
]

const ecosystemPrograms = [
  {
    title: 'EdLight Academy',
    description: 'Free online courses in Math, Physics, Economics, and Leadership for Haitian students.',
    icon: <BookOpen size={32} />,
    href: '/academy',
  },
  {
    title: 'CISJ Labs',
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
      </Hero>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Our Mission & Vision"
              subtitle="Creating pathways to excellence for Haitian youth"
              centered
            />
            <div className="glass rounded-2xl p-8 space-y-6 text-gray-700 leading-relaxed">
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Ecosystem"
            subtitle="Comprehensive programs supporting students at every stage"
            centered
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our Impact" subtitle="Making a difference in communities across Haiti" centered />
          <div className="glass rounded-2xl p-8">
            <ImpactCounters counters={impactCounters} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader title="Student Stories" subtitle="Hear from our alumni" centered />
          <div className="max-w-3xl mx-auto">
            <TestimonialCard {...testimonialsData[currentTestimonial]} />
            <div className="flex justify-center gap-2 mt-6">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
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
