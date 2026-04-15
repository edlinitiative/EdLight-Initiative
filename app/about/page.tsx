import React from 'react'
import { Target, Eye, Users } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'

const leadershipTeam = [
  { name: 'Ted Jacquet', title: 'Co-Founder & CFO' },
  { name: 'Stevenson Michel', title: 'Co-Founder & CEO' },
  { name: 'Rony Francillon', title: 'Director of ESLP & EdLight Nexus' },
  { name: 'Herode Metellus', title: 'Fundraising Coordinator' },
  { name: 'Williamson Michel', title: 'Operations Manager' },
  { name: 'Stéphane Lainé', title: 'Lead Developer, EdLight Labs' },
  { name: 'Fredler Pierre-Louis', title: 'Technology and Cybersecurity Lead' },
  { name: 'Tchedly Alexis', title: 'Marketing & Outreach Coordinator' },
]

const timeline = [
  {
    year: '2022',
    title: 'Launch of ESLP',
    description:
      'The EdLight Summer Leadership Program launched in August 2022 as a leadership experience designed to help students grow in confidence, vision, and civic engagement.',
  },
  {
    year: 'Today',
    title: 'A growing ecosystem',
    description:
      "Today, EdLight's public platform highlights a broader ecosystem that includes EdLight Academy, ESLP, EdLight Nexus, and EdLight Labs — all working together to expand opportunity for Haitian youth.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About EdLight"
        subtitle="Expanding access to education, leadership, innovation, and opportunity for Haitian youth."
        backgroundImage="/edlight_academy_group.webp"
      />

      {/* Our Story + Mission / Vision */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 sm:mb-14 md:mb-16">
            <SectionHeader title="Our Story" />
            <div className="space-y-5 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>
                EdLight Initiative is a mission-driven organization committed to expanding access to
                quality education, leadership development, and global opportunities for Haitian
                youth. Through a growing ecosystem of programs, EdLight works to equip students with
                the knowledge, skills, and exposure needed to thrive academically, professionally,
                and as future leaders.
              </p>
              <p>
                Its work spans digital learning, coding and technical training, leadership
                development, global exposure, and technology-enabled solutions built for impact.
                Across these initiatives, EdLight seeks to bridge opportunity gaps and create
                practical pathways for young Haitians in Haiti and beyond.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-14 md:mb-16 max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-6 sm:p-8 text-center">
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="font-heading text-lg sm:text-xl font-bold mb-2 sm:mb-3">Mission</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                To expand access to quality education, mentorship, innovation, and global
                opportunities for Haitian youth.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 sm:p-8 text-center">
              <Eye className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="font-heading text-lg sm:text-xl font-bold mb-2 sm:mb-3">Vision</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                A future in which Haitian students have the tools, support, and opportunities to
                reach their full potential and drive positive change in their communities and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Meet the EdLight Team"
            subtitle="EdLight is powered by a multidisciplinary team of educators, builders, mentors, and operators working across education, technology, and leadership development."
            centered
          />
          <div className="max-w-4xl mx-auto mt-6 mb-10 sm:mb-12 space-y-3 text-gray-700 leading-relaxed text-sm sm:text-base">
            <p>
              EdLight was founded by Ted Jacquet, Stevenson Michel, and Christopher Michel.
            </p>
            <p>Our leadership team includes:</p>
          </div>
          <div className="grid gap-6 sm:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {leadershipTeam.map((leader) => (
              <div key={leader.name} className="text-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full glass mx-auto mb-3 sm:mb-4 overflow-hidden">
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <Users size={48} />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-lg text-text">{leader.name}</h3>
                <p className="mt-1 text-primary text-sm font-medium">{leader.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Journey"
            subtitle="EdLight has grown into a broader ecosystem of educational and leadership initiatives designed to serve Haitian youth through learning, mentorship, innovation, and exposure to global opportunities."
            centered
          />
          <div className="max-w-4xl mx-auto mt-12">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                      {item.year}
                    </span>
                  </div>
                  <div className="relative flex-1 pb-8">
                    {index !== timeline.length - 1 && (
                      <div className="absolute left-0 top-12 bottom-0 w-0.5 bg-blue-200"></div>
                    )}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg sm:text-xl font-medium text-gray-800 leading-relaxed">
              EdLight continues to build practical, mission-driven pathways for students through
              education, leadership, technology, and community.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

