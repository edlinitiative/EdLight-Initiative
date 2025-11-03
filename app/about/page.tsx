import React from 'react'
import { Target, Eye, Heart } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import mediaData from '@/data/media.json'

const leadershipTeam = [
  {
    name: 'Ted Jacquet',
    title: 'Co-Founder & CFO',
    description:
      'Analyst at Deutsche Bank and social entrepreneur, Ted oversees EdLight\'s strategic growth, finances, and global partnerships.',
  },
  {
    name: 'Stevenson Michel',
    title: 'Co-Founder & CEO',
    description:
      'A visionary educator and program leader, Stevenson brings technical expertise from his role at Red Hat (IBM), guiding EdLight\'s initiatives on the ground in Haiti and ensuring impact through innovation.',
  },
  {
    name: 'Rony Francillon',
    title: 'Director of ESLP & EdLight Nexus',
    description:
      'Currently pursuing his master\'s in France, Rony leads both the EdLight Summer Leadership Program and EdLight Nexus, fostering collaboration, cultural exchange, and youth leadership development.',
  },
  {
    name: 'Herode Metellus',
    title: 'Fundraising Coordinator',
    description:
      'Project Manager at Compassion International and Rotaract District Representative, Herode leads our fundraising and donor engagement efforts.',
  },
  {
    name: 'Williamson Michel',
    title: 'Operations Manager',
    description:
      'Oversees logistics, communications, and internal coordination for EdLight\'s programs and events.',
  },
  {
    name: 'Stéphane Lainé',
    title: 'Lead Developer, EdLight Labs',
    description:
      'Heads the creation of EdLight\'s digital platforms and innovation initiatives, including website development and technical training.',
  },
  {
    name: 'Fredner Pierre',
    title: 'Logistics & Cybersecurity Officer',
    description:
      'Manages technical infrastructure and logistical operations across EdLight\'s programs, ensuring secure, efficient, and reliable systems to support the organization\'s mission.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About EdLight Initiative"
        subtitle="Building a brighter future for Haiti through education"
        backgroundImage="/edlight_academy_group.jpg"
      />

  <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <SectionHeader title="Our Story" />
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                EdLight Initiative was born from a simple yet powerful idea: every young Haitian
                deserves access to world-class education, regardless of their circumstances. Founded
                by Haitian students who benefited from international educational opportunities, we
                understood firsthand how transformative quality education can be.
              </p>
              <p>
                What started as informal tutoring sessions has grown into a comprehensive ecosystem
                of programs serving thousands of students across Haiti. From online courses to tech
                incubators to leadership development, we&apos;re creating pathways for Haitian youth to
                reach their full potential.
              </p>
              <p>
                Today, EdLight Initiative partners with leading universities, organizations, and
                companies worldwide to bring opportunities directly to students in Haiti. Our alumni
                have gone on to study at top universities, launch successful businesses, and lead
                community initiatives across the country.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="glass rounded-2xl p-8 text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold mb-3">Mission</h3>
              <p className="text-gray-700">
                To provide access to quality education, mentorship, and global opportunities for
                Haitian youth.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold mb-3">Vision</h3>
              <p className="text-gray-700">
                A Haiti where every motivated student can reach their full potential and drive
                positive change.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold mb-3">Values</h3>
              <p className="text-gray-700">
                Excellence, equity, community, innovation, and sustainable impact.
              </p>
            </div>
          </div>
        </div>
      </section>

  <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Meet the EdLight Team"
            subtitle="A young and diverse team of educators, innovators, and changemakers reimagining education for Haiti."
            centered
          />
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <p>
              At EdLight, our strength lies in the passion and dedication of a young, diverse, and visionary team committed to reimagining education for the next generation of Haitian leaders. We are educators, innovators, and changemakers united by a single mission to make quality education accessible, engaging, and transformative for all.
            </p>
            <p>
              Founded by Ted Jacquet, Stevenson Michel, and Christopher Michel, EdLight is powered by a network of volunteers, mentors, and professionals across Haiti, Canada, the United States, and Europe. Together, we lead initiatives such as the EdLight Summer Leadership Program (ESLP), EdLight Academy, EdLight Labs, and EdLight Nexus, each designed to empower students with skills, knowledge, and opportunities that extend beyond the classroom.
            </p>
            <p>Our leadership team includes:</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {leadershipTeam.map((leader) => (
              <div key={leader.name} className="rounded-2xl border border-primary/10 bg-white px-6 py-5 shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-text">{leader.name}</h3>
                <p className="text-primary text-sm font-semibold">{leader.title}</p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{leader.description}</p>
              </div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto mt-10 text-gray-700 leading-relaxed">
            <p>
              Together, we are building an ecosystem that bridges education, technology, and leadership, nurturing a generation of problem-solvers who will drive change in their communities and beyond.
            </p>
          </div>
        </div>
      </section>

  <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader title="In the Media" centered />
          <div className="max-w-3xl mx-auto space-y-4">
            {mediaData.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block glass rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{article.outlet}</p>
                    <h3 className="font-heading font-semibold text-lg mb-2 hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

