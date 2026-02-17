import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | EdLight Initiative',
  description: 'Find answers to common questions about EdLight Initiative programs, courses, and opportunities.',
}

export default function FAQPage() {
  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is EdLight Initiative?',
          answer: 'EdLight Initiative is a non-profit organization dedicated to empowering underserved communities through education, technology, and leadership development. We provide free educational programs, STEM courses, leadership training, and global opportunities to students in Haiti and beyond.'
        },
        {
          question: 'Who can participate in EdLight programs?',
          answer: 'Our programs are primarily designed for students and young professionals from underserved communities. Most programs are free or low-cost. Specific eligibility requirements vary by program - check individual program pages for details.'
        },
        {
          question: 'How is EdLight Initiative funded?',
          answer: 'EdLight Initiative is funded through donations, grants, partnerships with organizations, and the support of individual donors. We are committed to keeping most programs free for participants.'
        }
      ]
    },
    {
      category: 'EdLight Academy',
      questions: [
        {
          question: 'What courses does EdLight Academy offer?',
          answer: 'EdLight Academy offers online courses in technology, business, language, and personal development. Courses include web development, digital marketing, English language, entrepreneurship, and more. Visit our Academy page for the full course catalog.'
        },
        {
          question: 'Are the courses really free?',
          answer: 'Yes! Most EdLight Academy courses are completely free. Some advanced courses or certification programs may have a small fee to cover materials and certification costs.'
        },
        {
          question: 'Do I receive a certificate after completing a course?',
          answer: 'Yes, participants who complete a course and meet all requirements receive a digital certificate of completion that can be shared on social media and added to your resume.'
        },
        {
          question: 'What are the technical requirements for online courses?',
          answer: 'You need a computer or smartphone with internet access. Most courses use video lessons and online platforms that work on any device. Specific software requirements (if any) are listed on each course page.'
        }
      ]
    },
    {
      category: 'ESLP (EdLight Summer Leadership Program)',
      questions: [
        {
          question: 'What is ESLP?',
          answer: 'ESLP is our flagship Summer Leadership Program that brings together young leaders for intensive training in leadership, entrepreneurship, and social impact. The program includes workshops, mentorship, project development, and cultural activities.'
        },
        {
          question: 'When does ESLP take place?',
          answer: 'ESLP typically runs for 4-6 weeks during the summer months (June-August). Exact dates are announced in early spring each year.'
        },
        {
          question: 'How do I apply to ESLP?',
          answer: 'Applications open in early spring. Visit our ESLP page and fill out the application form. The selection process includes a written application and may include an interview.'
        },
        {
          question: 'Is there a cost to participate in ESLP?',
          answer: 'ESLP participation is free for selected participants. We cover program costs including materials, meals during program days, and certificates. Participants are responsible for their own transportation.'
        }
      ]
    },
    {
      category: 'EdLight Labs',
      questions: [
        {
          question: 'What is EdLight Labs?',
          answer: 'EdLight Labs is our STEM innovation hub where students work on hands-on technology projects, learn coding and electronics, and develop solutions to real-world problems. It\'s a makerspace and incubator for young innovators.'
        },
        {
          question: 'Do I need prior experience to join EdLight Labs?',
          answer: 'No prior experience is required! We welcome beginners. Our programs start with foundational skills and progress to more advanced projects. We provide mentorship and guidance throughout.'
        },
        {
          question: 'What kind of projects do participants work on?',
          answer: 'Projects range from building websites and mobile apps to robotics and Arduino projects. Recent projects include community apps, environmental monitoring systems, and educational games.'
        }
      ]
    },
    {
      category: 'EdLight Nexus',
      questions: [
        {
          question: 'What is EdLight Nexus?',
          answer: 'EdLight Nexus is our global opportunities platform where we share scholarships, internships, conferences, competitions, and other opportunities for students worldwide. It\'s your gateway to global experiences.'
        },
        {
          question: 'How often are new opportunities posted?',
          answer: 'We update the Nexus platform regularly, typically adding new opportunities weekly. Subscribe to our newsletter to receive notifications about opportunities that match your interests.'
        },
        {
          question: 'Can EdLight Initiative help me apply to opportunities?',
          answer: 'Yes! We provide application support including essay review, interview preparation, and guidance on building your profile. Contact us to learn more about our application support services.'
        }
      ]
    },
    {
      category: 'Volunteering & Partnerships',
      questions: [
        {
          question: 'How can I volunteer with EdLight Initiative?',
          answer: 'We welcome volunteers! You can help by mentoring students, teaching courses, supporting events, or assisting with operations. Visit our Get Involved page and fill out the volunteer form with your skills and availability.'
        },
        {
          question: 'Can my organization partner with EdLight Initiative?',
          answer: 'Yes! We partner with schools, universities, businesses, and NGOs to expand opportunities for students. Contact us through the partnership form on our Get Involved page to discuss collaboration opportunities.'
        },
        {
          question: 'I want to teach a course or workshop. How do I get started?',
          answer: 'That\'s wonderful! Fill out the volunteer form and indicate your area of expertise. Our team will contact you to discuss course topics, schedule, and format.'
        }
      ]
    },
    {
      category: 'Donations',
      questions: [
        {
          question: 'How can I donate to EdLight Initiative?',
          answer: 'You can donate through our website using PayPal or credit/debit card. Visit the Get Involved page and click the Donate button. All donations directly support our programs and students.'
        },
        {
          question: 'Is my donation tax-deductible?',
          answer: 'We are working on obtaining tax-exempt status. Please contact us at info@edlight.org for information about donation receipts and tax deductibility.'
        },
        {
          question: 'How is my donation used?',
          answer: 'Donations support our free programs, provide materials and equipment for students, fund scholarships, cover operational costs, and help us expand our reach to more communities.'
        }
      ]
    },
    {
      category: 'Contact & Support',
      questions: [
        {
          question: 'How can I contact EdLight Initiative?',
          answer: 'You can reach us via email at info@edlight.org or through the contact form on our website. We typically respond within 2-3 business days.'
        },
        {
          question: 'Where is EdLight Initiative located?',
          answer: 'EdLight Initiative is based in Haiti and serves students throughout the country and globally through our online programs.'
        },
        {
          question: 'How can I stay updated on EdLight Initiative activities?',
          answer: 'Subscribe to our newsletter, follow us on social media (Facebook, Twitter, Instagram, LinkedIn, YouTube), and check our website regularly for updates on programs, opportunities, and events.'
        }
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our programs and services
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b pb-3">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="border-l-4 border-yellow-400 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-700 mb-6">
            Can&apos;t find the answer you&apos;re looking for? We&apos;re here to help!
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  )
}
