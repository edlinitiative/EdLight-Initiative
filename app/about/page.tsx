import React from 'react'
import { Target, Eye, Heart } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import teamData from '@/data/team.json'
import timelineData from '@/data/timeline.json'
import mediaData from '@/data/media.json'

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About EdLight Initiative"
        subtitle="Building a brighter future for Haiti through education"
        backgroundImage="/hero.jpg"
      />

      <section className="py-20 bg-white">
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
            <div className="bg-background rounded-xl p-8 text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold mb-3">Mission</h3>
              <p className="text-gray-700">
                To provide access to quality education, mentorship, and global opportunities for
                Haitian youth.
              </p>
            </div>
            <div className="bg-background rounded-xl p-8 text-center">
              <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold mb-3">Vision</h3>
              <p className="text-gray-700">
                A Haiti where every motivated student can reach their full potential and drive
                positive change.
              </p>
            </div>
            <div className="bg-background rounded-xl p-8 text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold mb-3">Values</h3>
              <p className="text-gray-700">
                Excellence, equity, community, innovation, and sustainable impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader title="Our Journey" centered />
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timelineData.map((item) => (
                <div key={item.year} className="flex gap-6">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-2xl font-bold text-primary">{item.year}</span>
                  </div>
                  <div className="flex-grow pb-8 border-l-2 border-primary pl-6 relative">
                    <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary -translate-x-[9px]" />
                    <h3 className="font-heading text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader title="Meet Our Team" centered />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData.map((member) => (
              <div key={member.id} className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Users size={48} />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader title="In the Media" centered />
          <div className="max-w-3xl mx-auto space-y-4">
            {mediaData.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
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

// Import Users for team placeholder
import { Users } from 'lucide-react'
