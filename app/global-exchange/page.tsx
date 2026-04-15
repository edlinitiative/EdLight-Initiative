import { Metadata } from 'next'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'
import { Globe, Plane, Award, Users, BookOpen, Building } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Global Exchange | EdLight Initiative',
  description: 'Learn how EdLight approaches global exposure and exchange experiences for Haitian students through Nexus.',
}

export default function GlobalExchangePage() {
  const opportunities = [
    {
      title: 'International Scholarships',
      description: 'Scholarship pathways that may help students access learning opportunities beyond Haiti',
      icon: <Award size={40} className="text-blue-600" />,
      examples: ['Fulbright Program', 'Commonwealth Scholarships', 'DAAD Scholarships', 'Chevening Scholarships']
    },
    {
      title: 'Study Abroad Programs',
      description: 'Short-term and longer-form exchange models that can deepen academic and cultural exposure',
      icon: <Globe size={40} className="text-green-600" />,
      examples: ['Semester Exchange', 'Summer Programs', 'Language Immersion', 'Cultural Exchange']
    },
    {
      title: 'International Conferences',
      description: 'Global gatherings that can broaden perspective, learning, and professional awareness',
      icon: <Users size={40} className="text-purple-600" />,
      examples: ['Youth Leadership Summits', 'Tech Conferences', 'UN Youth Forums', 'Model UN']
    },
    {
      title: 'Global Internships',
      description: 'Selected professional pathways that may offer international experience when available',
      icon: <Building size={40} className="text-yellow-600" />,
      examples: ['UN Internships', 'NGO Positions', 'Tech Company Internships', 'Embassy Programs']
    },
    {
      title: 'Online Programs',
      description: 'Virtual learning and exchange formats that can expand access to global ideas and institutions',
      icon: <BookOpen size={40} className="text-pink-600" />,
      examples: ['MOOCs', 'Virtual Exchanges', 'Online Certificates', 'Webinar Series']
    },
    {
      title: 'Travel Grants',
      description: 'Potential funding sources that may help make exposure-based travel and participation more possible',
      icon: <Plane size={40} className="text-red-600" />,
      examples: ['Conference Travel Grants', 'Research Funding', 'Training Programs', 'Cultural Tours']
    }
  ]

  const benefits = [
    {
      title: 'Cultural Exchange',
      description: 'Experience different cultures, traditions, and perspectives firsthand'
    },
    {
      title: 'Global Network',
      description: 'Build lasting connections with peers, mentors, and professionals worldwide'
    },
    {
      title: 'Career Advancement',
      description: 'Gain international experience that makes you stand out in the job market'
    },
    {
      title: 'Personal Growth',
      description: 'Develop independence, adaptability, and cross-cultural communication skills'
    },
    {
      title: 'Academic Excellence',
      description: 'Access world-class education and cutting-edge research opportunities'
    },
    {
      title: 'Language Skills',
      description: 'Improve language proficiency through immersion and practical use'
    }
  ]

  return (
    <>
      <Hero
        title="Global Exchange"
        subtitle="A closer look at the kinds of international exposure and exchange opportunities that can broaden opportunity for Haitian students"
        backgroundImage="/nexus_pic.webp"
      />

      <main className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <section className="mb-16 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="mb-6 text-lg leading-relaxed text-on-surface-variant">
                EdLight Nexus is EdLight&apos;s international exposure and exchange initiative. This page highlights the
                kinds of pathways that can help Haitian students engage global learning, cultural exchange, and new
                ideas through thoughtful exploration and preparation.
              </p>
              <div className="rounded-2xl border border-outline/20 bg-surface-container-low p-6">
                <p className="text-blue-900 font-semibold">
                  Designed to encourage exploration, perspective, and meaningful opportunity.
                </p>
              </div>
            </div>
          </section>

          {/* Types of Opportunities */}
          <section className="mb-16">
            <SectionHeader
              title="Types of Opportunities"
              subtitle="Discover the various ways you can expand your horizons"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {opportunities.map((opportunity, index) => (
                <Card key={index} title={opportunity.title} description={opportunity.description} icon={opportunity.icon} className="hover:shadow-xl transition-shadow">
                  <div className="border-t border-outline/20 pt-4">
                    <p className="mb-2 text-sm font-semibold text-on-surface-variant">Illustrative examples:</p>
                    <ul className="space-y-1 text-sm text-on-surface-variant">
                      {opportunity.examples.map((example, i) => (
                        <li key={i}>• {example}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <SectionHeader
              title="Why Participate?"
              subtitle="The benefits of global exchange experiences"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="rounded-3xl border border-outline/20 bg-surface-container-lowest p-6 shadow-sm">
                  <h3 className="mb-2 text-lg font-bold text-primary">
                    {benefit.title}
                  </h3>
                  <p className="text-on-surface-variant">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How We Help */}
          <section className="mb-16">
            <SectionHeader
              title="How We Support You"
              subtitle="Nexus is designed to support thoughtful preparation, learning, and follow-through where capacity allows"
            />
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="mb-2 font-bold text-primary">Exploration</h3>
                <p className="text-sm text-on-surface-variant">
                  We help frame the kinds of global pathways that may align with student goals and readiness
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="mb-2 font-bold text-primary">Preparation</h3>
                <p className="text-sm text-on-surface-variant">
                  Participants may receive guidance that helps them prepare thoughtfully for the experience
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-tertiary-fixed-dim/20">
                  <span className="text-2xl font-bold text-yellow-600">3</span>
                </div>
                <h3 className="mb-2 font-bold text-primary">Immersion</h3>
                <p className="text-sm text-on-surface-variant">
                  The experience centers on learning through exposure, exchange, and engagement with new contexts
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed/40">
                  <span className="text-2xl font-bold text-purple-600">4</span>
                </div>
                <h3 className="mb-2 font-bold text-primary">Reflection</h3>
                <p className="text-sm text-on-surface-variant">
                  Fellows are encouraged to reflect on what they learn and how it can create value back home
                </p>
              </div>
            </div>
          </section>

          {/* Why this matters */}
          <section className="mb-16">
            <div className="rounded-3xl border border-outline/20 bg-surface-container-low p-8 md:p-12">
              <h2 className="mb-6 text-center text-3xl font-bold text-primary">
                Why this matters
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-outline/20 bg-surface-container-lowest p-6">
                  <p className="mb-4 leading-relaxed text-on-surface-variant">
                    Global exposure can expand what students believe is possible. It can strengthen confidence,
                    ambition, and a deeper understanding of how learning connects across borders.
                  </p>
                  <p className="font-semibold text-primary">Broader perspective</p>
                </div>
                <div className="rounded-2xl border border-outline/20 bg-surface-container-lowest p-6">
                  <p className="mb-4 leading-relaxed text-on-surface-variant">
                    When designed carefully, exchange experiences can help young Haitians return with new insight,
                    stronger leadership instincts, and a renewed sense of contribution.
                  </p>
                  <p className="font-semibold text-primary">Meaningful return value</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="rounded-3xl bg-gradient-to-r from-primary to-primary-container p-8 text-white md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Interested in Nexus?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-fixed">
                Learn more about EdLight&apos;s approach to global exposure and exchange, or reach out to continue the conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:nexus@edlight.org"
                  className="btn btn-light"
                >
                  Contact nexus@edlight.org
                </a>
                <a
                  href="/nexus"
                  className="btn btn-ghost"
                >
                  Visit the Nexus page
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
