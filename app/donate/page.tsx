'use client'

import { useEffect } from 'react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import { Heart, Users, BookOpen, Laptop, Globe } from 'lucide-react'

declare global {
  interface Window {
    PayPal?: {
      Donation: {
        Button: (config: {
          env: string
          hosted_button_id: string
          image: {
            src: string
            alt: string
            title: string
          }
        }) => {
          render: (selector: string) => void
        }
      }
    }
  }
}

export default function DonatePage() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js'
    script.charset = 'UTF-8'
    document.body.appendChild(script)

    script.onload = () => {
      if (window.PayPal) {
        window.PayPal.Donation.Button({
          env: 'production',
          hosted_button_id: 'YOUR_BUTTON_ID',
          image: {
            src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
            alt: 'Donate with PayPal button',
            title: 'PayPal - The safer, easier way to pay online!',
          },
        }).render('#donate-button')
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const impactAreas = [
    {
      icon: <Users size={48} className="text-blue-600" />,
      title: 'Student Scholarships',
      description: 'Provide full or partial scholarships for students to access programs and courses',
      amount: '$100',
      impact: 'Sponsors 1 student for a full course'
    },
    {
      icon: <BookOpen size={48} className="text-green-600" />,
      title: 'Educational Materials',
      description: 'Supply textbooks, course materials, and online resources for learners',
      amount: '$50',
      impact: 'Provides materials for 5 students'
    },
    {
      icon: <Laptop size={48} className="text-purple-600" />,
      title: 'Technology Access',
      description: 'Purchase computers, tablets, and equipment for EdLight Labs',
      amount: '$500',
      impact: 'Equips 1 computer workstation'
    },
    {
      icon: <Globe size={48} className="text-yellow-600" />,
      title: 'Program Operations',
      description: 'Cover operational costs including internet, facilities, and staff',
      amount: '$250',
      impact: 'Supports 1 month of operations'
    }
  ]

  const donationLevels = [
    {
      amount: 25,
      title: 'Supporter',
      description: 'Help us maintain our online learning platform',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      amount: 50,
      title: 'Contributor',
      description: 'Provide learning materials for students',
      color: 'bg-green-100 text-green-800'
    },
    {
      amount: 100,
      title: 'Sponsor',
      description: 'Sponsor a student for a complete course',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      amount: 250,
      title: 'Patron',
      description: 'Support multiple students and programs',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      amount: 500,
      title: 'Champion',
      description: 'Make a transformative impact on our community',
      color: 'bg-red-100 text-red-800'
    }
  ]

  return (
    <>
      <Hero
        title="Support Our Mission"
        subtitle="Your donation empowers students and transforms communities through education"
        backgroundImage="/about_us.webp"
      />

      <main className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Why Donate */}
          <section className="mb-16 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6 text-3xl font-bold text-primary md:text-4xl">
                Why Your Support Matters
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-on-surface-variant">
                EdLight Initiative relies on the generosity of donors like you to provide free education 
                and opportunities to underserved youth in Haiti and beyond. Every contribution, no matter 
                the size, directly impacts students&apos; lives and helps break the cycle of poverty through education.
              </p>
              <div className="rounded-3xl border border-outline/20 bg-surface-container-low p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
                    <div className="text-on-surface-variant">Students Served Annually</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                    <div className="text-on-surface-variant">Free Programs</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">45+</div>
                    <div className="text-on-surface-variant">Courses Offered</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Impact Areas */}
          <section className="mb-16">
            <SectionHeader
              title="Where Your Donation Goes"
              subtitle="See the direct impact of your contribution"
            />
            <div className="grid md:grid-cols-2 gap-8">
              {impactAreas.map((area, index) => (
                <div key={index} className="rounded-3xl border border-outline/20 bg-surface-container-lowest p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{area.icon}</div>
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-primary">
                        {area.title}
                      </h3>
                      <p className="mb-4 text-on-surface-variant">
                        {area.description}
                      </p>
                      <div className="rounded-xl border border-outline/20 bg-surface-container-low p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-blue-600">{area.amount}</span>
                          <span className="text-sm text-on-surface-variant">{area.impact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Donation Levels */}
          <section className="mb-16">
            <SectionHeader
              title="Donation Levels"
              subtitle="Choose an amount that works for you"
            />
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {donationLevels.map((level, index) => (
                <div key={index} className="rounded-3xl border border-outline/20 bg-surface-container-lowest p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3 ${level.color}`}>
                    {level.title}
                  </div>
                  <div className="mb-2 text-3xl font-bold text-primary">
                    ${level.amount}
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    {level.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-on-surface-variant">
              Or choose a custom amount below
            </p>
          </section>

          {/* Donation Button */}
          <section className="mb-16">
            <div className="rounded-3xl bg-gradient-to-r from-primary to-primary-container p-8 text-white md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Make Your Donation Today
                </h2>
                <p className="mb-6 text-lg text-primary-fixed">
                  Secure donation processing through PayPal
                </p>
              </div>
              <div className="flex justify-center">
                <div id="donate-button" className="rounded-2xl bg-surface-container-lowest p-6">
                  {/* PayPal button will render here */}
                  <div className="text-center">
                    <p className="mb-4 text-on-surface-variant">
                      Donate securely with PayPal or credit card
                    </p>
                    <button className="btn btn-primary text-lg">
                      <Heart className="inline mr-2" size={24} />
                      Donate Now
                    </button>
                    <p className="mt-4 text-sm text-outline">
                      All donations are secure and tax-deductible
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Other Ways to Give */}
          <section className="mb-16">
            <SectionHeader
              title="Other Ways to Give"
              subtitle="Additional options to support our mission"
            />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-3xl border border-outline/20 bg-surface-container-lowest p-6 text-center shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-primary">
                  Monthly Giving
                </h3>
                <p className="mb-4 text-on-surface-variant">
                  Become a sustaining donor with recurring monthly contributions
                </p>
                <a href="/contact" className="text-blue-600 hover:underline font-semibold">
                  Learn More →
                </a>
              </div>
              <div className="rounded-3xl border border-outline/20 bg-surface-container-lowest p-6 text-center shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-primary">
                  Corporate Partnership
                </h3>
                <p className="mb-4 text-on-surface-variant">
                  Partner with us to make a larger impact through corporate giving
                </p>
                <a href="/contact" className="text-blue-600 hover:underline font-semibold">
                  Contact Us →
                </a>
              </div>
              <div className="rounded-3xl border border-outline/20 bg-surface-container-lowest p-6 text-center shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-primary">
                  In-Kind Donations
                </h3>
                <p className="mb-4 text-on-surface-variant">
                  Donate equipment, books, or other materials to support our programs
                </p>
                <a href="/contact" className="text-blue-600 hover:underline font-semibold">
                  Get in Touch →
                </a>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <SectionHeader
              title="Donation FAQ"
              subtitle="Common questions about giving"
            />
            <div className="space-y-6 rounded-3xl border border-outline/20 bg-surface-container-lowest p-8 shadow-sm">
              <div>
                <h3 className="mb-2 text-lg font-bold text-primary">
                  Is my donation tax-deductible?
                </h3>
                <p className="text-on-surface-variant">
                  We are working on obtaining tax-exempt status. Please contact us at info@edlight.org 
                  for information about donation receipts and tax deductibility.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-primary">
                  How is my donation used?
                </h3>
                <p className="text-on-surface-variant">
                  100% of your donation goes directly to supporting our programs, students, and operations. 
                  We maintain transparency and provide regular updates on how funds are utilized.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-primary">
                  Can I donate in memory or honor of someone?
                </h3>
                <p className="text-on-surface-variant">
                  Yes! Please include a note with your donation or contact us to arrange a memorial or 
                  honorary gift. We can notify the honoree or their family of your generous contribution.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-primary">
                  Will I receive updates on the impact of my donation?
                </h3>
                <p className="text-on-surface-variant">
                  Absolutely! Donors receive our quarterly newsletter with stories, updates, and reports 
                  on how contributions are making a difference in students&apos; lives.
                </p>
              </div>
            </div>
          </section>

          {/* Thank You */}
          <section className="text-center">
            <div className="rounded-3xl border border-outline/20 bg-surface-container-low p-8 md:p-12">
              <Heart size={64} className="text-red-500 mx-auto mb-6" />
              <h2 className="mb-4 text-3xl font-bold text-primary">
                Thank You for Your Support
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-on-surface-variant">
                Every donation, no matter the size, brings us closer to our mission of empowering 
                underserved communities through education. Together, we are changing lives and 
                building a brighter future.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
