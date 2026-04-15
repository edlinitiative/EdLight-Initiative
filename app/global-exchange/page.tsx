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
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                EdLight Nexus is EdLight&apos;s international exposure and exchange initiative. This page highlights the
                kinds of pathways that can help Haitian students engage global learning, cultural exchange, and new
                ideas through thoughtful exploration and preparation.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
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
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Illustrative examples:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
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
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700">
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
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Exploration</h3>
                <p className="text-sm text-gray-700">
                  We help frame the kinds of global pathways that may align with student goals and readiness
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Preparation</h3>
                <p className="text-sm text-gray-700">
                  Participants may receive guidance that helps them prepare thoughtfully for the experience
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-600">3</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Immersion</h3>
                <p className="text-sm text-gray-700">
                  The experience centers on learning through exposure, exchange, and engagement with new contexts
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">4</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Reflection</h3>
                <p className="text-sm text-gray-700">
                  Fellows are encouraged to reflect on what they learn and how it can create value back home
                </p>
              </div>
            </div>
          </section>

          {/* Why this matters */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Why this matters
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Global exposure can expand what students believe is possible. It can strengthen confidence,
                    ambition, and a deeper understanding of how learning connects across borders.
                  </p>
                  <p className="font-semibold text-gray-900">Broader perspective</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    When designed carefully, exchange experiences can help young Haitians return with new insight,
                    stronger leadership instincts, and a renewed sense of contribution.
                  </p>
                  <p className="font-semibold text-gray-900">Meaningful return value</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Interested in Nexus?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Learn more about EdLight&apos;s approach to global exposure and exchange, or reach out to continue the conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:nexus@edlight.org"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Contact nexus@edlight.org
                </a>
                <a
                  href="/nexus"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
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
