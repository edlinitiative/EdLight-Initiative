import { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import { CONTACT_EMAIL, CORPORATION_NUMBER, REGISTERED_ADDRESS_LINE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | EdLight Initiative',
  description:
    'Who can join EdLight programmes, what they cost, how to apply, and how to support the work. Answers for students, volunteers, partners, and donors.',
}

/**
 * Every answer here is checked against the page that owns the fact.
 *
 * This file previously contradicted the rest of the site in five places: it
 * advertised an ESLP application window ("open now", closing 31 May 2026) for
 * a cohort that had already graduated; it listed an Academy catalogue — web
 * development, digital marketing, entrepreneurship — that the Academy page
 * does not teach; it said programmes were "free or low-cost" and "may have a
 * small fee" where /about says all programmes are free; it placed the
 * organisation in Haiti where /about places it in Montreal; and it sent
 * donors to /get-involved to find a Donate button that lives on /donate.
 *
 * When a programme's dates or catalogue change, change them on the programme
 * page and then here. An answer that has drifted from its programme page is
 * worse than no answer.
 */
type Faq = { question: string; answer: React.ReactNode }
type FaqCategory = { category: string; questions: Faq[] }

const faqs: FaqCategory[] = [
  {
    category: 'General',
    questions: [
      {
        question: 'What is EdLight Initiative?',
        answer:
          'EdLight Initiative is a not-for-profit organisation working to make quality education free and accessible to students in Haiti. We run online courses, a coding platform, a summer leadership programme, and a scholarship programme, and we connect students with mentors and opportunities beyond Haiti.',
      },
      {
        question: 'Where is EdLight Initiative based?',
        answer: (
          <>
            EdLight Initiative is a not-for-profit corporation registered in Canada (Corporation
            No. {CORPORATION_NUMBER}), based in {REGISTERED_ADDRESS_LINE}. Our programmes serve
            secondary students across Haiti, and our operations team works in Haiti year-round.
          </>
        ),
      },
      {
        question: 'Who can participate in EdLight programmes?',
        answer:
          'Our programmes are built for secondary-school students in Haiti and for young people preparing for the Baccalauréat or for university. EdLight Academy and EdLight Code are open to anyone who can reach them online. ESLP and Coursera Scholars select participants through an application. Eligibility for each is described on that programme\'s page.',
      },
      {
        question: 'What do EdLight programmes cost?',
        answer:
          'Nothing. All EdLight programmes are free for students, including course materials, certificates, and — for selected ESLP participants — the sessions, the excursion, and the closing celebration. There is no paid tier and no upgrade.',
      },
      {
        question: 'How is EdLight Initiative funded?',
        answer:
          'Through individual donations, grants, and partnerships with organisations. Programmes stay free for students because the costs are carried by donors and partners rather than by participants.',
      },
    ],
  },
  {
    category: 'EdLight Academy',
    questions: [
      {
        question: 'What does EdLight Academy teach?',
        answer:
          'Academy covers the six subjects Haitian students need for the national exams: Mathematics, Physics, Chemistry, Life & Earth sciences (SVT), Economics, and Languages (English and Spanish). Courses are organised around 9e Année, the Baccalauréat, and university entrance, and include structured lessons, mock exams, and a daily trivia game.',
      },
      {
        question: 'Are the courses really free?',
        answer:
          'Yes — all of them, with no fee for materials or certificates. Academy is free and bilingual.',
      },
      {
        question: 'Do I receive a certificate?',
        answer:
          'Yes. Students who complete a course and meet its requirements receive a digital certificate they can share or add to a CV.',
      },
      {
        question: 'What do I need to take a course?',
        answer:
          'A phone or a computer with an internet connection. Lessons run in a web browser and in our mobile apps, and they are built to work on an ordinary phone with an intermittent connection. There is nothing to install and nothing to buy.',
      },
    ],
  },
  {
    category: 'EdLight Code',
    questions: [
      {
        question: 'What is EdLight Code?',
        answer:
          'A hands-on coding platform with six learning tracks — Python, SQL, HTML, CSS, JavaScript, and Terminal & Git — taught through lessons and practical labs you complete in your browser.',
      },
      {
        question: 'Can I learn in Haitian Creole?',
        answer:
          'Yes. EdLight Code teaches in Haitian Creole, French, and English. Having to learn a second language before you can start learning to program is a barrier we would rather remove.',
      },
      {
        question: 'What do I get at the end of a track?',
        answer:
          'A certificate with a verification link an employer can check, and the projects you built along the way, which matter more than the certificate.',
      },
    ],
  },
  {
    category: 'ESLP (EdLight Summer Leadership Program)',
    questions: [
      {
        question: 'What is ESLP?',
        answer:
          'ESLP is our two-week summer leadership programme for secondary students in Haiti. It combines expert-led seminars, mentorship, project development, civic learning, and a company excursion, and it closes with a graduation.',
      },
      {
        question: 'Is ESLP taking applications right now?',
        answer: (
          <>
            No. The 2026 cohort ran from 10 to 21 August 2026 and has graduated. Dates and
            application details for the next edition have not been announced yet. Join the notify
            list on the <Link href="/eslp" className="underline underline-offset-4">ESLP page</Link>{' '}
            and we will write to you as soon as the next cycle opens.
          </>
        ),
      },
      {
        question: 'What does ESLP cost participants?',
        answer:
          'Nothing. Selected participants attend on full scholarship. Programme costs — sessions, materials, the excursion, and the closing celebration — are covered.',
      },
      {
        question: 'What does the application involve?',
        answer:
          'When a cycle is open, applicants complete an online form and submit supporting essays, a recent ID photograph, and current school transcripts. The ESLP page carries the full requirements while applications are open.',
      },
    ],
  },
  {
    category: 'Coursera Scholars',
    questions: [
      {
        question: 'What is Coursera Scholars?',
        answer:
          'A programme that funds Coursera certificates for Haitian students, run in partnership with Coursera, so that students can earn recognised professional credentials at no cost to them.',
      },
      {
        question: 'Can I apply now?',
        answer: (
          <>
            Not yet. The inaugural cohort is being finalised and applications are not open. Join the
            notify list on the{' '}
            <Link href="/coursera-scholars" className="underline underline-offset-4">
              Coursera Scholars page
            </Link>{' '}
            to hear when it opens.
          </>
        ),
      },
    ],
  },
  {
    category: 'Volunteering & partnerships',
    questions: [
      {
        question: 'How can I volunteer?',
        answer: (
          <>
            By mentoring students, teaching a course or workshop, supporting events, or helping with
            operations. Tell us what you can offer and when you are available through the form on the{' '}
            <Link href="/get-involved" className="underline underline-offset-4">Get Involved page</Link>.
          </>
        ),
      },
      {
        question: 'Can my organisation partner with EdLight?',
        answer: (
          <>
            Yes. We work with schools, universities, businesses, and NGOs to widen what our students
            can reach — our current partners are UWC, Coursera, and IICA. Start a conversation
            through the{' '}
            <Link href="/get-involved" className="underline underline-offset-4">Get Involved page</Link>{' '}
            or write to {CONTACT_EMAIL}.
          </>
        ),
      },
      {
        question: 'I want to teach a course. How do I start?',
        answer:
          'Fill in the volunteer form and say what you would teach. Someone from the team will follow up to talk through the topic, the format, and the schedule.',
      },
    ],
  },
  {
    category: 'Donations',
    questions: [
      {
        question: 'How do I donate?',
        answer: (
          <>
            Through the{' '}
            <Link href="/donate" className="underline underline-offset-4">donate page</Link>, using
            PayPal or a credit or debit card. A PayPal account is not required.
          </>
        ),
      },
      {
        question: 'Is my donation tax-deductible?',
        answer: (
          <>
            Not at present. EdLight Initiative is a registered Canadian not-for-profit corporation,
            but it does not yet hold registered-charity status, so we cannot issue tax receipts.
            We would rather say so plainly than let a donor assume otherwise. Write to{' '}
            {CONTACT_EMAIL} if you need documentation of a gift.
          </>
        ),
      },
      {
        question: 'How is my donation used?',
        answer:
          'It funds the things that keep programmes free: course materials and platform costs, equipment, scholarships for selected programmes, and the operations that run them.',
      },
    ],
  },
  {
    category: 'Contact & support',
    questions: [
      {
        question: 'How do I reach EdLight Initiative?',
        answer: (
          <>
            Write to {CONTACT_EMAIL} or use the form on the{' '}
            <Link href="/contact" className="underline underline-offset-4">contact page</Link>. We
            usually reply within two to three business days.
          </>
        ),
      },
      {
        question: 'How do I keep up with what EdLight is doing?',
        answer:
          'Subscribe to the newsletter at the bottom of any page for monthly highlights, student stories, and programme openings, or follow us on Facebook, X, Instagram, YouTube, and LinkedIn.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <>
      <Hero
        eyebrow="Support"
        title="Frequently asked questions"
        subtitle="Who can join, what our programmes cost, how to apply, and how to support the work."
        backgroundImage="/edlight_academy_group.webp"
      />

      <section className="py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl space-y-14 sm:space-y-16">
            {faqs.map(({ category, questions }) => (
              <div key={category}>
                <h2 className="eyebrow text-[var(--accent)] mb-6 pb-3 border-b border-[var(--paper-200)]">
                  {category}
                </h2>
                <dl className="space-y-7">
                  {questions.map(({ question, answer }, i) => (
                    <div key={i}>
                      <dt className="text-base sm:text-lg font-semibold text-[var(--ink-900)] mb-2">
                        {question}
                      </dt>
                      <dd className="text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
                        {answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="border border-[var(--paper-200)] bg-[var(--paper-100)] p-8 sm:p-12 text-center">
            <SectionHeader
              title="Still have a question?"
              subtitle="If the answer is not here, ask us directly — we read everything that comes in."
              centered
              className="mb-8"
            />
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
              >
                Contact us
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center justify-center border border-[var(--ink-900)] px-6 py-3 text-sm font-medium text-[var(--ink-900)] transition-colors hover:bg-[var(--paper-200)]"
              >
                Email {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
