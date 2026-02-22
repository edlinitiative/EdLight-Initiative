import { Metadata } from 'next'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'
import { Globe, Plane, Award, Users, BookOpen, Building } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Global Exchange Program | EdLight Initiative',
  description: 'Connect with global opportunities including scholarships, conferences, internships, and study abroad programs.',
}

export default function GlobalExchangePage() {
  const opportunities = [
    {
      title: 'International Scholarships',
      description: 'Full and partial scholarships for undergraduate and graduate studies at universities worldwide',
      icon: <Award size={40} className="text-blue-600" />,
      examples: ['Fulbright Program', 'Commonwealth Scholarships', 'DAAD Scholarships', 'Chevening Scholarships']
    },
    {
      title: 'Study Abroad Programs',
      description: 'Short-term and semester-long exchange programs to experience education in different countries',
      icon: <Globe size={40} className="text-green-600" />,
      examples: ['Semester Exchange', 'Summer Programs', 'Language Immersion', 'Cultural Exchange']
    },
    {
      title: 'International Conferences',
      description: 'Attend global conferences, summits, and forums to network and learn from world leaders',
      icon: <Users size={40} className="text-purple-600" />,
      examples: ['Youth Leadership Summits', 'Tech Conferences', 'UN Youth Forums', 'Model UN']
    },
    {
      title: 'Global Internships',
      description: 'Professional internship opportunities with international organizations and companies',
      icon: <Building size={40} className="text-yellow-600" />,
      examples: ['UN Internships', 'NGO Positions', 'Tech Company Internships', 'Embassy Programs']
    },
    {
      title: 'Online Programs',
      description: 'Virtual exchange programs and online courses from top universities and organizations worldwide',
      icon: <BookOpen size={40} className="text-pink-600" />,
      examples: ['MOOCs', 'Virtual Exchanges', 'Online Certificates', 'Webinar Series']
    },
    {
      title: 'Travel Grants',
      description: 'Funding opportunities to attend conferences, training programs, and educational events abroad',
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
        title="Global Exchange Program"
        subtitle="Your gateway to international opportunities and global experiences"
        backgroundImage="/nexus_pic.webp"
      />

      <main className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <section className="mb-16 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                EdLight Nexus connects Haitian students with transformative global opportunities. We curate 
                scholarships, conferences, internships, and exchange programs from around the world, and 
                provide application support to help you succeed.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-blue-900 font-semibold">
                  🌍 New opportunities added weekly • 💯 100% Free access • 🎓 Application support included
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
                    <p className="text-sm font-semibold text-gray-600 mb-2">Examples:</p>
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
              subtitle="From discovery to application, we're with you every step"
            />
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Opportunity Curation</h3>
                <p className="text-sm text-gray-700">
                  We find and share relevant opportunities matched to your profile
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Application Guidance</h3>
                <p className="text-sm text-gray-700">
                  Get help with essays, CVs, and application materials
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-600">3</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Interview Prep</h3>
                <p className="text-sm text-gray-700">
                  Practice interviews and receive feedback from mentors
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">4</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Pre-Departure Support</h3>
                <p className="text-sm text-gray-700">
                  Preparation sessions and alumni networking before you travel
                </p>
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Success Stories
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg">
                  <p className="text-gray-700 italic mb-4">
                    &quot;Thanks to EdLight Nexus, I received a full scholarship to study Computer Science 
                    in Canada. The application support was invaluable!&quot;
                  </p>
                  <p className="font-semibold text-gray-900">- Marie, Computer Science Student</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <p className="text-gray-700 italic mb-4">
                    &quot;I attended a leadership conference in Kenya through an opportunity I found on 
                    Nexus. It changed my perspective and opened doors I never imagined.&quot;
                  </p>
                  <p className="font-semibold text-gray-900">- Jean, ESLP Graduate</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Go Global?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Explore current opportunities and start your journey to a global experience today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/nexus"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Browse Opportunities
                </a>
                <a
                  href="/contact"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Get Application Support
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
