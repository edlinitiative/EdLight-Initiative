import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import { Heart, Users, BookOpen, Laptop, Globe } from 'lucide-react'

// The same hosted button used by the header CTA and /get-involved. This page
// previously loaded PayPal's JS SDK with a literal 'YOUR_BUTTON_ID' placeholder
// and rendered a <button> with no handler, so the donate action did nothing at
// all. A plain link is server-rendered, crawlable, and works without JS.
const PAYPAL_DONATE_URL = 'https://www.paypal.com/donate/?hosted_button_id=6AKKBQXK47EZU'

export const metadata: Metadata = {
  title: 'Donate | EdLight Initiative',
  description:
    'Support free, quality education for high school students in Haiti. Your donation funds scholarships, learning materials, and technology access.',
}

export default function DonatePage() {
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Your Support Matters
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                EdLight Initiative relies on the generosity of donors like you to provide free education 
                and opportunities to underserved youth in Haiti and beyond. Every contribution, no matter 
                the size, directly impacts students&apos; lives and helps break the cycle of poverty through education.
              </p>
              <div className="bg-blue-50 p-8 rounded-lg">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
                    <div className="text-gray-700">Students Served Annually</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                    <div className="text-gray-700">Free Programs</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">45+</div>
                    <div className="text-gray-700">Courses Offered</div>
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
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{area.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {area.title}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {area.description}
                      </p>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-blue-600">{area.amount}</span>
                          <span className="text-sm text-gray-600">{area.impact}</span>
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
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                  <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3 ${level.color}`}>
                    {level.title}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ${level.amount}
                  </div>
                  <p className="text-sm text-gray-600">
                    {level.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-6">
              Or choose a custom amount below
            </p>
          </section>

          {/* Donation Button */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Make Your Donation Today
                </h2>
                <p className="text-lg text-blue-100 mb-6">
                  Secure donation processing through PayPal
                </p>
              </div>
              <div className="flex justify-center">
                <div className="bg-white p-6 rounded-lg">
                  <div className="text-center">
                    <p className="text-gray-700 mb-4">
                      Donate securely with PayPal or credit card
                    </p>
                    <a
                      href={PAYPAL_DONATE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                    >
                      <Heart className="inline mr-2" size={24} />
                      Donate Now
                    </a>
                    <p className="text-sm text-gray-500 mt-4">
                      Processed securely by PayPal. No account required.
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
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Monthly Giving
                </h3>
                <p className="text-gray-700 mb-4">
                  Become a sustaining donor with recurring monthly contributions
                </p>
                <a href="/contact" className="text-blue-600 hover:underline font-semibold">
                  Learn More →
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Corporate Partnership
                </h3>
                <p className="text-gray-700 mb-4">
                  Partner with us to make a larger impact through corporate giving
                </p>
                <a href="/contact" className="text-blue-600 hover:underline font-semibold">
                  Contact Us →
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  In-Kind Donations
                </h3>
                <p className="text-gray-700 mb-4">
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
            <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Is my donation tax-deductible?
                </h3>
                <p className="text-gray-700">
                  We are working on obtaining tax-exempt status. Please contact us at info@edlight.org 
                  for information about donation receipts and tax deductibility.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  How is my donation used?
                </h3>
                <p className="text-gray-700">
                  100% of your donation goes directly to supporting our programs, students, and operations. 
                  We maintain transparency and provide regular updates on how funds are utilized.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Can I donate in memory or honor of someone?
                </h3>
                <p className="text-gray-700">
                  Yes! Please include a note with your donation or contact us to arrange a memorial or 
                  honorary gift. We can notify the honoree or their family of your generous contribution.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Will I receive updates on the impact of my donation?
                </h3>
                <p className="text-gray-700">
                  Absolutely! Donors receive our quarterly newsletter with stories, updates, and reports 
                  on how contributions are making a difference in students&apos; lives.
                </p>
              </div>
            </div>
          </section>

          {/* Thank You */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-yellow-50 to-blue-50 rounded-lg p-8 md:p-12">
              <Heart size={64} className="text-red-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Thank You for Your Support
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
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
