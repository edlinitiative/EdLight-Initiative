import { Metadata } from 'next'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'
import { Target, Lightbulb, Users, Globe, BookOpen, Rocket } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mission & Projects | EdLight Initiative',
  description: 'Learn about EdLight Initiative\'s mission to empower underserved communities through education and explore our key projects.',
}

export default function MissionProjectsPage() {
  const projects = [
    {
      title: 'EdLight Academy',
      description: 'Free online courses in technology, business, and personal development accessible to students worldwide.',
      icon: <BookOpen size={40} className="text-blue-600" />,
      link: '/academy',
      impact: '500+ students enrolled'
    },
    {
      title: 'EdLight Labs',
      description: 'STEM innovation hub where students learn coding, robotics, and develop technology solutions for real-world problems.',
      icon: <Rocket size={40} className="text-blue-600" />,
      link: '/labs',
      impact: '50+ projects completed'
    },
    {
      title: 'EdLight Nexus',
      description: 'Global opportunities platform connecting students with scholarships, internships, and conferences worldwide.',
      icon: <Globe size={40} className="text-blue-600" />,
      link: '/nexus',
      impact: '100+ opportunities shared'
    },
    {
      title: 'EdLight Summer Leadership Program (ESLP)',
      description: 'Intensive summer program training young leaders in entrepreneurship, social impact, and community development.',
      icon: <Users size={40} className="text-blue-600" />,
      link: '/eslp',
      impact: '200+ graduates'
    }
  ]

  return (
    <>
      <Hero
        title="Our Mission & Projects"
        subtitle="Empowering underserved communities through education, technology, and leadership development"
        backgroundImage="/about_us.webp"
      />

      <main className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Mission Statement */}
          <section className="mb-16">
            <SectionHeader
              title="Our Mission"
              subtitle="What drives us every day"
            />
            <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg p-8 md:p-12">
              <div className="flex items-start space-x-4 mb-6">
                <Target size={48} className="text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Empowering Through Education
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    EdLight Initiative is dedicated to empowering underserved communities, particularly youth in Haiti, 
                    through accessible education, technology training, and leadership development. We believe that education 
                    is the key to breaking cycles of poverty and creating sustainable change.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="mb-16">
            <SectionHeader
              title="Our Core Values"
              subtitle="The principles that guide our work"
            />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
                <div className="mb-4">
                  <Lightbulb size={40} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-700">
                  We embrace creative solutions and emerging technologies to address educational challenges in new ways.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-400">
                <div className="mb-4">
                  <Users size={40} className="text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-700">
                  We build strong communities of learners, mentors, and partners working together for collective growth.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
                <div className="mb-4">
                  <Globe size={40} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Accessibility</h3>
                <p className="text-gray-700">
                  We ensure our programs are free or low-cost, making quality education accessible to all.
                </p>
              </div>
            </div>
          </section>

          {/* Key Projects */}
          <section className="mb-16">
            <SectionHeader
              title="Our Projects"
              subtitle="Transforming lives through education and technology"
            />
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card key={index} title={project.title} description={project.description} icon={project.icon} className="hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-600">
                      {project.impact}
                    </span>
                    <a
                      href={project.link}
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
                    >
                      Learn More →
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Impact */}
          <section className="mb-16">
            <div className="bg-blue-600 text-white rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Impact</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">2,500+</div>
                  <div className="text-blue-100">Students Served</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">45+</div>
                  <div className="text-blue-100">Courses Offered</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">6+</div>
                  <div className="text-blue-100">Partner Organizations</div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-yellow-50 to-blue-50 rounded-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join Us in Making a Difference
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Whether you want to volunteer, partner, or support our mission financially, 
                there are many ways to get involved with EdLight Initiative.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/get-involved"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get Involved
                </a>
                <a
                  href="/contact"
                  className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
