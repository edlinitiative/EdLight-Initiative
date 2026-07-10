import React from 'react'
import { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/Hero'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | EdLight Initiative',
  description: 'Find answers to common questions about EdLight Initiative programs, courses, and opportunities.',
}

const faqs = [
  {
    category: 'General',
    questions: [
      {
        question: 'What is EdLight Initiative?',
        answer:
          'EdLight Initiative is a non-profit organization dedicated to empowering underserved communities through education, technology, and leadership development. We provide free educational programs, STEM courses, leadership training, and global opportunities to students in Haiti and beyond.',
      },
      {
        question: 'Who can participate in EdLight programs?',
        answer:
          'Our programs are primarily designed for students and young professionals from underserved communities. Most programs are free or low-cost. Specific eligibility requirements vary by program — check individual program pages for details.',
      },
      {
        question: 'How is EdLight Initiative funded?',
        answer:
          'EdLight Initiative is funded through donations, grants, partnerships with organizations, and the support of individual donors. We are committed to keeping most programs free for participants.',
      },
    ],
  },
  {
    category: 'EdLight Academy',
    questions: [
      {
        question: 'What courses does EdLight Academy offer?',
        answer:
          'EdLight Academy offers online courses in technology, business, language, and personal development. Courses include web development, digital marketing, English language, entrepreneurship, and more. Visit our Academy page for the full course catalog.',
      },
      {
        question: 'Are the courses really free?',
        answer:
          'Yes! Most EdLight Academy courses are completely free. Some advanced courses or certification programs may have a small fee to cover materials and certification costs.',
      },
      {
        question: 'Do I receive a certificate after completing a course?',
        answer:
          'Yes, participants who complete a course and meet all requirements receive a digital certificate of completion that can be shared on social media and added to your resume.',
      },
      {
        question: 'What are the technical requirements for online courses?',
        answer:
          'You need a computer or smartphone with internet access. Most courses use video lessons and online platforms that work on any device. Specific software requirements (if any) are listed on each course page.',
      },
    ],
  },
  {
    category: 'ESLP (EdLight Summer Leadership Program)',
    questions: [
      {
        question: 'What is ESLP?',
        answer:
          'ESLP is our flagship two-week summer leadership programme for secondary students in Haiti. It combines expert-led seminars, mentorship, project development, civic learning, and a featured company excursion.',
      },
      {
        question: 'When does ESLP take place?',
        answer:
          'For 2026, ESLP runs from August 10 to August 21. Applications are open now and close on May 31, 2026.',
      },
      {
        question: 'How do I apply to ESLP?',
        answer:
          'Visit our ESLP page and complete the online application. Applicants should be ready to submit the form, supporting essays, a recent ID picture, and current school transcripts.',
      },
      {
        question: 'Is there a cost to participate in ESLP?',
        answer:
          'No. ESLP is free for selected participants. We cover core programme costs including learning sessions, materials, the organized excursion, and the closing celebration.',
      },
    ],
  },
  {
    category: 'EdLight Labs',
    questions: [
      {
        question: 'What is EdLight Labs?',
        answer:
          "EdLight Labs is our STEM innovation hub where students work on hands-on technology projects, learn coding and electronics, and develop solutions to real-world problems. It's a makerspace and incubator for young innovators.",
      },
      {
        question: 'Do I need prior experience to join EdLight Labs?',
        answer:
          'No prior experience is required! We welcome beginners. Our programs start with foundational skills and progress to more advanced projects. We provide mentorship and guidance throughout.',
      },
      {
        question: 'What kind of projects do participants work on?',
        answer:
          'Projects range from building websites and mobile apps to robotics and Arduino projects. Recent projects include community apps, environmental monitoring systems, and educational games.',
      },
    ],
  },
  {
    category: 'EdLight Nexus',
    questions: [
      {
        question: 'What is EdLight Nexus?',
        answer:
          "EdLight Nexus is EdLight's global exposure and exchange initiative. It is designed to connect Haitian students to international learning, cultural exchange, and new opportunities through thoughtfully developed experiences.",
      },
      {
        question: 'What kinds of experiences can Nexus include?',
        answer:
          'Depending on the format, Nexus may include preparation sessions, immersive learning activities, institutional exposure, cultural exchange, and reflection on how lessons can be brought back home.',
      },
      {
        question: 'How can I learn more about Nexus?',
        answer:
          'You can visit the Nexus page or contact nexus@edlight.org for updates and additional information as the initiative continues to develop.',
      },
    ],
  },
  {
    category: 'Volunteering & Partnerships',
    questions: [
      {
        question: 'How can I volunteer with EdLight Initiative?',
        answer:
          'We welcome volunteers! You can help by mentoring students, teaching courses, supporting events, or assisting with operations. Visit our Get Involved page and fill out the volunteer form with your skills and availability.',
      },
      {
        question: 'Can my organization partner with EdLight Initiative?',
        answer:
          'Yes! We partner with schools, universities, businesses, and NGOs to expand opportunities for students. Contact us through the partnership form on our Get Involved page to discuss collaboration opportunities.',
      },
      {
        question: 'I want to teach a course or workshop. How do I get started?',
        answer:
          "That's wonderful! Fill out the volunteer form and indicate your area of expertise. Our team will contact you to discuss course topics, schedule, and format.",
      },
    ],
  },
  {
    category: 'Donations',
    questions: [
      {
        question: 'How can I donate to EdLight Initiative?',
        answer:
          'You can donate through our website using PayPal or credit/debit card. Visit the Get Involved page and click the Donate button. All donations directly support our programs and students.',
      },
      {
        question: 'Is my donation tax-deductible?',
        answer:
          'We are working on obtaining tax-exempt status. Please contact us at info@edlight.org for information about donation receipts and tax deductibility.',
      },
      {
        question: 'How is my donation used?',
        answer:
          'Donations support our free programs, provide materials and equipment for students, fund scholarships, cover operational costs, and help us expand our reach to more communities.',
      },
    ],
  },
  {
    category: 'Contact & Support',
    questions: [
      {
        question: 'How can I contact EdLight Initiative?',
        answer:
          'You can reach us via email at info@edlight.org or through the contact form on our website. We typically respond within 2-3 business days.',
      },
      {
        question: 'Where is EdLight Initiative located?',
        answer:
          'EdLight Initiative is based in Haiti and serves students throughout the country and globally through our online programs.',
      },
      {
        question: 'How can I stay updated on EdLight Initiative activities?',
        answer:
          'Subscribe to our newsletter, follow us on social media (Facebook, Twitter, Instagram, LinkedIn, YouTube), and check our website regularly for updates on programs, opportunities, and events.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <>
      <Hero
        eyebrow="Help Center · FAQ"
        title="Frequently asked questions"
        subtitle="Find answers to common questions about our programs, courses, and opportunities — from EdLight Academy and ESLP to Labs, Nexus, and giving."
      />

      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-14">
            {faqs.map((category) => (
              <div key={category.category}>
                <h2 className="display-md mb-6 text-[var(--ink-900)]">{category.category}</h2>
                <div className="space-y-3">
                  {category.questions.map((faq, i) => (
                    <Reveal key={faq.question} delay={i * 40}>
                      <details className="group rounded-2xl border border-[var(--paper-200)] bg-white p-5 open:shadow-sm sm:p-6">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-[var(--ink-900)]">
                          {faq.question}
                          <span
                            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)] transition-transform group-open:rotate-45"
                            aria-hidden="true"
                          >
                            +
                          </span>
                        </summary>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--ink-700)]">{faq.answer}</p>
                      </details>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="pb-20 sm:pb-24">
        <div className="container mx-auto px-4">
          <div
            className="relative overflow-hidden rounded-3xl p-10 text-white sm:p-14"
            style={{
              background:
                'radial-gradient(circle at 80% 20%, rgba(30,66,159,0.4) 0%, transparent 55%), linear-gradient(135deg, var(--ink-deep) 0%, #0a1530 70%, #0f1e4a 100%)',
            }}
          >
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <span className="eyebrow text-white/85">We&apos;re here to help</span>
                <h2 className="display-md mt-3 text-white">Still have questions?</h2>
                <p className="mt-3 text-white/90">
                  Can&apos;t find the answer you&apos;re looking for? Reach out and our team will get back to
                  you within 2-3 business days.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="/contact" className="btn btn-light">
                  Contact us <ArrowRight size={18} />
                </a>
                <a href="/get-involved" className="btn btn-ghost">
                  Get involved
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
