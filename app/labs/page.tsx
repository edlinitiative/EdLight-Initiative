"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Code2,
  MonitorSmartphone,
  Wrench,
  Cpu,
  Printer,
  CheckCircle2,
  ExternalLink,
  Mail,
  X,
} from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import RequestQuoteForm from '@/components/RequestQuoteForm'

const serviceHighlights = [
  {
    title: 'Website Design & Development',
    description:
      'Custom, responsive websites crafted for schools, nonprofits, and small businesses. We combine storytelling, modern design, and technical excellence.',
    details: [
      'Custom design and development tailored to your brand',
      'Domain setup, hosting support, and content organization',
      'SEO and performance optimization for fast, accessible sites',
      'Training sessions so your team can manage updates confidently',
    ],
    icon: <MonitorSmartphone size={26} className="text-primary" />,
    pricing: '1/3 upfront • 2/3 on delivery. Maintenance starts at $150/year or 20% of the project cost.',
  },
  {
    title: 'Website Maintenance & Optimization',
    description:
      'Already have a website? We keep it secure, updated, and polished so your audience always enjoys a seamless experience.',
    details: [
      'Regular updates, backups, and performance checks',
      'Content refreshes and design enhancements',
      'Security monitoring with quick troubleshooting support',
      'Flexible maintenance tiers to match your budget',
    ],
    icon: <Wrench size={26} className="text-primary" />,
  },
]

const innovationFocus = [
  'Launching one of Haiti’s first educational 3D printing hubs.',
  'Building prototypes that support healthcare, education, and engineering.',
  'Creating hands-on learning experiences that inspire entrepreneurship.',
]

const portfolioItems = [
  {
    name: 'EdLight Initiative',
    url: 'https://edlight.org',
    description:
      'EdLight’s main platform unites mission, programs, and impact stories with a fast, mobile-friendly experience.',
  },
  {
    name: 'EdLight Academy',
    url: 'https://academy.edlight.org',
    description:
      'A multi-language learning portal with structured course navigation, YouTube lessons, and interactive quizzes.',
  },
  {
    name: 'EdLight Nexus',
    url: 'https://edlight.org/nexus',
    description:
      'Showcases global mobility opportunities for Haitian students with clear storytelling and partner-focused CTAs.',
  },
  {
    name: 'Client Project – École Dominique Savio (Demo)',
    url: undefined,
    description:
      'A school website concept highlighting academic programs, galleries, and easy-to-manage updates for administrators.',
  },
  {
    name: 'Client Project – Local Nonprofit (Demo)',
    url: undefined,
    description:
      'A lightweight nonprofit site with donation tools, storytelling layouts, and a blog to feature ongoing initiatives.',
  },
]

const reasons = [
  'Professional, mission-aligned web solutions at accessible pricing.',
  'Transparent process with flexible payment and maintenance plans.',
  'Fast turnaround times, responsive support, and clear communication.',
  'Trusted by schools, nonprofits, and startups across Haiti.',
  'Backed by the EdLight Initiative’s commitment to education and impact.',
]

const involvementOptions = [
  'Organizations: Partner with us to design or upgrade your website or digital platform.',
  'Students & Developers: Join our talent network and work on real client projects.',
  'Supporters: Help us bring 3D printing labs and innovation tools to Haiti.',
]

export default function LabsPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false)

  const openQuoteModal = () => setShowQuoteModal(true)
  const closeQuoteModal = () => setShowQuoteModal(false)

  return (
    <>
      <Hero
        title="EdLight Labs"
        subtitle="Building digital solutions that power education, entrepreneurship, and social impact"
        backgroundImage="/labs_pics.png"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button type="button" className="btn btn-primary" onClick={openQuoteModal}>
            Work With Us <ArrowRight size={18} />
          </button>
          <Link href="#services" className="btn btn-light">
            Explore Services
          </Link>
        </div>
      </Hero>

      <section className="py-20">
        <div className="container mx-auto px-4 space-y-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <SectionHeader
                title="Innovation for Education and Impact"
                subtitle="Technology as a catalyst for learning, entrepreneurship, and community change"
              />
              <p>
                EdLight Labs is the creative and technological branch of the EdLight Initiative. We build digital solutions that empower
                students, educators, and mission-driven organizations across Haiti—and increasingly beyond. From modern websites to applied
                technology projects, we use tech as a tool for opportunity and social impact.
              </p>
              <p>
                The Lab manages EdLight’s educational platforms, including EdLight Academy and Nexus, while collaborating with schools,
                nonprofits, and small businesses to create digital experiences that amplify their reach. Every project blends purposeful
                design with reliable engineering.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                <Code2 className="text-primary mb-3" size={26} />
                <h3 className="font-heading text-lg font-semibold text-text mb-2">Built for Impact</h3>
                <p className="text-sm text-gray-600">
                  We prototype, design, and maintain tools that make learning more accessible and engaging for the next generation.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                <Cpu className="text-primary mb-3" size={26} />
                <h3 className="font-heading text-lg font-semibold text-text mb-2">Innovation in Motion</h3>
                <p className="text-sm text-gray-600">
                  Our roadmap includes 3D printing hubs, applied tech experiments, and maker initiatives for Haitian students.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm sm:col-span-2">
                <Printer className="text-primary mb-3" size={26} />
                <h3 className="font-heading text-lg font-semibold text-text mb-2">Community Collaboration</h3>
                <p className="text-sm text-gray-600">
                  We partner with local organizations to deliver digital platforms that grow their visibility, fundraising, and community reach.
                </p>
              </div>
            </div>
          </div>

          <div id="services" className="space-y-12">
            <SectionHeader title="What We Do" centered />
            <div className="grid gap-8 lg:grid-cols-2">
              {serviceHighlights.map((service) => (
                <div key={service.title} className="rounded-3xl border border-primary/10 bg-white p-8 shadow-lg">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="mb-4">{service.icon}</div>
                      <h3 className="font-heading text-xl font-semibold text-text mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-5 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-700">
                    {service.details.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="text-primary mt-0.5" size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {service.pricing && (
                    <p className="mt-6 text-sm font-medium text-primary/90">{service.pricing}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <SectionHeader title="Innovation & Technology Projects" centered />
            <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-white via-white to-blue-50 p-10 shadow-lg text-gray-700">
              <p className="text-lg font-medium mb-5">
                EdLight Labs is expanding into 3D printing and applied technology to create tangible change across education, healthcare, and engineering.
              </p>
              <ul className="space-y-3">
                {innovationFocus.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-gray-600">
                By nurturing local talent and creativity, we envision EdLight Labs as a launchpad where students, innovators, and entrepreneurs turn ideas into reality.
              </p>
            </div>
          </div>

          <div id="portfolio" className="space-y-12">
            <SectionHeader title="Portfolio" subtitle="Recent websites and digital platforms we’ve designed and launched" centered />
            <div className="grid gap-6 md:grid-cols-2">
              {portfolioItems.map((project) => (
                <div key={project.name} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-heading text-lg font-semibold text-text">{project.name}</h3>
                    {project.url && (
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary text-sm font-semibold"
                      >
                        Visit <ExternalLink size={14} />
                      </Link>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{project.description}</p>
                  {!project.url && (
                    <p className="mt-3 text-xs uppercase tracking-wide text-gray-400">Coming soon</p>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500">💡 We regularly update our portfolio as new projects launch. Want to be featured here? Reach out and let’s build together.</p>
          </div>

          <div className="space-y-10">
            <SectionHeader title="Why Choose EdLight Labs?" centered />
            <div className="grid gap-6 md:grid-cols-2">
              {reasons.map((reason) => (
                <div key={reason} className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary mt-0.5" size={18} />
                    <p className="text-gray-700">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="contact" className="space-y-10">
            <SectionHeader title="Get Involved" centered />
            <div className="rounded-3xl border border-primary/10 bg-white p-10 shadow-lg text-gray-700">
              <ul className="space-y-3 text-sm">
                {involvementOptions.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary mt-0.5" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-gray-600 flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>
                  Contact us: <a href="mailto:labs@edlight.org" className="text-primary underline underline-offset-4">labs@edlight.org</a>
                </span>
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button type="button" className="btn btn-primary" onClick={openQuoteModal}>
                  Request a Quote
                </button>
                <Link href="#portfolio" className="btn btn-light">
                  See More Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showQuoteModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-10">
          <div
            className="absolute inset-0 bg-black/60"
            aria-hidden="true"
            onClick={closeQuoteModal}
          />
          <div className="relative z-[95] w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Website Development Brief</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-gray-900">Tell us about your project</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Share your vision and requirements. We’ll schedule a discovery call within 2-3 business days.
                </p>
              </div>
              <button
                type="button"
                onClick={closeQuoteModal}
                className="rounded-full border border-gray-200 p-2 text-gray-500 transition hover:border-gray-300 hover:text-gray-700"
                aria-label="Close request quote form"
              >
                <X size={18} />
              </button>
            </div>
            <RequestQuoteForm onSuccess={closeQuoteModal} />
          </div>
        </div>
      )}
    </>
  )
}
