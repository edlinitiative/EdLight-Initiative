import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import {
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  Briefcase,
  Building2,
  ClipboardList,
  Code2,
  GraduationCap,
  Lightbulb,
  RefreshCw,
  Rocket,
  Users,
} from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import NotifyButton from '@/components/NotifyButton'
import GalleryGrid from '@/components/GalleryGrid'

// ── Framing, and the lines that must not drift ───────────────────────────────
// EdLight Initiative is a Coursera Social Impact Partner. EdLight — not
// Coursera — runs this program and selects its Scholars. Nothing on this page
// may imply Coursera picks scholars, co-operates the program, or endorses it,
// and no specific university, employer, degree or certificate is promised,
// because what the licence actually unlocks is set by the catalogue in
// EdLight's plan, not by us.
//
// The count of donated licences (300) and the first cohort size are
// deliberately absent from the public page: the brief says not to advertise a
// number of places unless EdLight decides to, and a public number is very hard
// to walk back once the cohort is sized differently. That still holds, and it
// is why the institutional section below says "a block of licences" rather
// than the per-school figure that appears in the PDF sent to universities.
//
// There are now TWO routes in, and every section has to hold both without
// promising either a place it cannot fill:
//   1. Partner institutions nominate their own students (the route being sold
//      to universities right now, ahead of the first cohort).
//   2. Individual learners apply directly to EdLight.
// Route 2 has no form yet, so its CTA stays the notify list. Route 1 has a
// real, working CTA — email — which is why it can be a live link.
//
// Dates ARE public as of the Coursera contract: the first cohort begins
// 1 October 2026 and cohorts run three months. Because the page states a
// date, it now carries a maintenance duty the old copy failed: once
// 1 October 2026 passes, "begins" is wrong and must be revised. That exact
// drift — a future-tense window left standing after its date — is what the Ad
// Grants website policy previously failed this site over.

export const metadata: Metadata = {
  // Bare title: the root layout applies the template '%s | EdLight Initiative'.
  // Spelling out the suffix here rendered "… | EdLight Initiative | EdLight
  // Initiative" in the browser tab and in search results.
  title: 'EdLight Coursera Scholars',
  description:
    'Free access to world-class online learning through EdLight Initiative’s Coursera Social Impact partnership. Learners can apply directly, and universities can partner with EdLight to bring Coursera to their own students.',
  openGraph: {
    title: 'EdLight Coursera Scholars | EdLight Initiative',
    description:
      'Free access to world-class online learning for motivated Haitian learners, directly or through a partner university. Build skills, earn certificates, and take your next step.',
    type: 'website',
  },
}

// Applications are not open, and the page no longer says they are.
//
// It used to read "Applications for the inaugural cohort open in September
// 2026" — written while that was in the future, and left standing once it
// arrived, so the page was advertising a window in the future tense on a date
// that had already passed. Worse, "Apply now" pointed at
// https://apply.edlight.org/coursera-scholars, which is a general portal
// landing page rather than a Scholars form, so the button did not do what it
// said. Both are things the Ad Grants website policy rejects a site over.
//
// The CTA is the notify list until there is a form to point at. To reopen:
// set APPLICATIONS_OPEN to the real window, restore an APPLICATION_URL that
// resolves to an actual Scholars application, and swap the NotifyButton back
// to a link.
const SCHOLARS_NOTIFY_LABEL = 'Coursera Scholars'

const benefits = [
  {
    icon: GraduationCap,
    title: 'Learn',
    body: 'Study across technology, business, data, AI, and many other fields through the catalogue available under EdLight’s Coursera partnership.',
  },
  {
    icon: Rocket,
    title: 'Build',
    body: 'Develop practical, career-relevant skills that support the academic or professional goal you are actually working toward.',
  },
  {
    icon: BarChart3,
    title: 'Earn',
    body: 'Complete eligible courses and professional certificates, and finish with something you can show a university or an employer.',
  },
  {
    icon: Users,
    title: 'Grow',
    body: 'Join a cohort of ambitious learners from across Haiti, with support and check-ins from EdLight along the way.',
  },
]

const pathways = [
  { icon: BrainCircuit, title: 'AI & Machine Learning', body: 'Fundamentals, generative AI, and applied machine learning.' },
  { icon: Code2, title: 'Technology & Software', body: 'Programming, web development, cloud, and cybersecurity.' },
  { icon: BarChart3, title: 'Data & Analytics', body: 'Data analysis, SQL, Python, Excel, and business intelligence.' },
  { icon: Briefcase, title: 'Business & Finance', body: 'Finance, accounting, marketing, strategy, and project management.' },
  { icon: Lightbulb, title: 'Entrepreneurship', body: 'Building a business, innovation, and digital growth.' },
  { icon: Users, title: 'Professional Skills', body: 'Communication, leadership, English, and interview preparation.' },
]

// Deliberately no per-school licence figure here — see the framing note above.
const institutionBenefits = [
  {
    icon: Building2,
    title: 'Licences for your students',
    body: 'Your institution receives a block of Coursera licences each cohort, and chooses which of your students receive them.',
  },
  {
    icon: RefreshCw,
    title: 'A new cohort every three months',
    body: 'At the end of each three-month cohort the licences are released and reassigned to a new group of your students.',
  },
  {
    icon: ClipboardList,
    title: 'Progress you can see',
    body: 'EdLight tracks how your nominated students are doing and sends the institution a report at the end of every cohort.',
  },
  {
    icon: BadgeCheck,
    title: 'Recognised as a partner',
    body: 'Your institution is named as an official partner of the program, at no cost and with no financial commitment.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Apply or get nominated',
    body: 'If your university is a partner institution, it nominates its own students — ask your school. Otherwise you apply to EdLight directly when applications open.',
  },
  {
    number: '02',
    title: 'Get selected',
    body: 'Partner institutions select their own students. For direct applications, EdLight reviews each one on motivation, learning goals, potential impact, commitment, and access.',
  },
  {
    number: '03',
    title: 'Start learning',
    body: 'Selected Scholars receive free Coursera access through EdLight and choose their first course.',
  },
  {
    number: '04',
    title: 'Finish what you start',
    body: 'Complete your courses, earn eligible certificates, and share your progress with EdLight.',
  },
]

// Cohort windows as published in the partner-institution PDF. Cohorts 2-4 are
// deliberately off a strict three-month roll so none opens during the holiday
// or academic break. Dates are public; the licence count is not.
const cohorts = [
  { name: 'Cohort 1', window: '1 October – 31 December 2026', note: 'Programme launch' },
  { name: 'Cohort 2', window: '11 January – 11 April 2027', note: 'After the academic break' },
  { name: 'Cohort 3', window: '19 April – 19 July 2027', note: 'Second semester' },
  { name: 'Cohort 4', window: '26 July – 26 October 2027', note: 'Summer session' },
]

// EdLight programme photography. These are learners from EdLight's own
// programmes, NOT Coursera Scholars (there is no cohort yet) — alt text and
// the section copy stay accurate about that.
const gallery = [
  { src: '/gallery/student-1.jpg', alt: 'An EdLight learner receiving a certificate' },
  { src: '/gallery/eslp-2026-graduation-promotion.webp', alt: 'An EdLight cohort at their graduation' },
  { src: '/gallery/student-2.jpg', alt: 'EdLight learners at a programme session' },
  { src: '/gallery/eslp-2026-graduation-certificat.webp', alt: 'A certificate being awarded at an EdLight graduation' },
  { src: '/gallery/student-3.jpg', alt: 'An EdLight learner at a programme session' },
  { src: '/gallery/eslp-3.jpg', alt: 'EdLight learners working together' },
]

const faqs = [
  {
    q: 'How much does the program cost?',
    a: 'Nothing. Participation is free for selected EdLight Coursera Scholars, and there is never an application fee.',
  },
  {
    q: 'When does the program start?',
    a: 'The first cohort begins on 1 October 2026. Every cohort runs for three months, after which the places are passed on to a new group of learners.',
  },
  {
    q: 'Who can apply?',
    a: 'Motivated learners aged 16 and over — students, graduates, young professionals, entrepreneurs, and self-directed learners. The first cohort primarily serves learners based in Haiti.',
  },
  {
    q: 'How do I join — do I apply, or does my university nominate me?',
    a: 'Both routes exist. If you study at a partner institution, your university selects its own students, so ask your faculty or student affairs office whether it takes part. If it does not, or if you are not currently a student, you can apply to EdLight directly once applications open — join the notify list and we will tell you when they do.',
  },
  {
    q: 'Do I need to be enrolled in school?',
    a: 'Not for the direct route — current enrolment is not required and we do not expect a perfect academic record. The nomination route is different: those places belong to a partner institution, so they go to that institution’s own students.',
  },
  {
    q: 'My university would like to take part. What do we do?',
    a: 'Write to info@edlight.org with the name of your institution and a contact person. We agree the number of licences and your cohort dates, sign a one-page partnership agreement, and you nominate your students. There is no cost to the institution or to its students.',
  },
  {
    q: 'Do I need previous Coursera experience?',
    a: 'No. Previous experience neither helps nor hurts your application.',
  },
  {
    q: 'What can I study?',
    a: 'Available subjects depend on the Coursera catalogue provided through EdLight’s Social Impact partnership. You will choose a learning pathway on your application, and pursue learning aligned with your goals across many fields.',
  },
  {
    q: 'Will I receive a certificate?',
    a: 'Many Coursera courses and programs provide a certificate on successful completion, depending on the specific course and the catalogue available. Scholars who complete EdLight’s own program requirements may also receive recognition from EdLight, which is separate from any Coursera certificate.',
  },
  {
    q: 'Is Coursera selecting the Scholars?',
    a: 'No. EdLight Initiative is a Coursera Social Impact Partner. EdLight runs the program — managing direct applications itself, and working with partner institutions who select their own nominated students. Coursera does not choose Scholars or co-administer the program.',
  },
  {
    q: 'What happens if I am not selected?',
    a: 'Strong applicants may be placed on the waitlist and considered when additional places become available or for a future cohort.',
  },
  {
    q: 'What happens if I stop using Coursera?',
    a: 'Places are limited. If a Scholar does not begin learning after several reminders, EdLight may offer that place to someone on the waitlist so the opportunity is not wasted.',
  },
  {
    q: 'Can I apply from outside Haiti?',
    a: 'The first cohort primarily serves learners in Haiti. EdLight may widen eligibility in future cohorts.',
  },
]

export default function CourseraScholarsPage() {
  return (
    <>
      <Hero
        title="Become an EdLight Coursera Scholar"
        subtitle="Talent is everywhere. Opportunity is not."
        backgroundImage="/gallery/eslp-2026-graduation-promotion.webp"
        /* Wide group shot: anchor to the top so the back row's heads survive
           the crop at every viewport width. */
        objectPosition="center top"
      >
        {/* Left-aligned, NOT centred. Hero renders its children inside a
            left-aligned max-w-3xl block, so `mx-auto` on this paragraph and
            `justify-center` on the buttons centred them underneath a headline
            that stays hard left — the whole hero read as misaligned. */}
        <p className="mb-6 max-w-2xl text-sm sm:text-base text-white/85 leading-relaxed">
          Gain free access to world-class online learning through EdLight Initiative&apos;s partnership with
          Coursera. Build new skills, earn certificates, and take the next step toward your academic and
          professional goals.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <NotifyButton cycleLabel={SCHOLARS_NOTIFY_LABEL} className="btn btn-primary">
            Get notified when applications open
          </NotifyButton>
          {/* btn-ghost, not btn-outline. btn-outline is the light-ground
              variant: near-black label on a transparent background. Inside
              this Hero that put --ink-900 text on a dark navy photograph, so
              the site's secondary call to action was effectively invisible.
              btn-ghost is the on-dark counterpart, and it is what every other
              hero on the site already uses. */}
          <a href="#how-it-works" className="btn btn-ghost">
            Learn more
          </a>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/70">
          Inaugural cohort begins 1 October 2026 · direct applications not yet open
        </p>
      </Hero>

      {/* Partnership. The one section where the wording is a compliance matter
          rather than a style choice — see the note at the top of this file. */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="EdLight × Coursera"
            subtitle="A partnership that turns access into opportunity."
            centered
          />
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="body-lg text-[var(--ink-700)]">
              EdLight Initiative has been selected as a Coursera Social Impact Partner, allowing us to provide
              eligible learners with free access to high-quality online courses and professional learning
              opportunities.
            </p>
            <p className="body-lg text-[var(--ink-700)]">
              Through EdLight Coursera Scholars, we are turning that partnership into a structured program
              designed to help talented learners gain skills that create real opportunities for their futures.
            </p>
            <p className="body-lg text-[var(--ink-700)]">
              Scholars join in one of two ways: nominated by a partner university, or by applying to EdLight
              directly. The first cohort begins on 1 October 2026, and every cohort runs for three months.
            </p>
          </div>
        </div>
      </section>

      {/* Universities. Placed directly after the partnership section because
          this is the audience with the nearer deadline — institutions have to
          nominate before a cohort opens, students only have to apply. */}
      <section id="institutions" className="bg-slate-50 py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="For universities and institutions"
            subtitle="Bring Coursera to a cohort of your students. EdLight provides the licences and the follow-up; your institution chooses who receives them."
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {institutionBenefits.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border border-[var(--paper-200)] bg-white p-6">
                <Icon size={24} className="text-[var(--accent)]" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-[var(--ink-900)]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{body}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-3xl border-l-2 border-[var(--accent)] bg-white p-6">
            <h3 className="text-lg font-semibold text-[var(--ink-900)]">How your institution joins</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">
              Write to us with the name of your institution and a contact person. We agree the number of
              licences and your cohort dates, sign a one-page partnership agreement, and you send us the
              students you have selected. There is no cost to the institution or to the students.
            </p>
            {/* A real mailto, not a portal link that does not lead to a form —
                this CTA can be live precisely because it does what it says. */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="mailto:info@edlight.org?subject=Coursera%20partnership%20enquiry" className="btn btn-primary">
                Email us about a partnership
              </a>
              <Link href="/contact" className="btn btn-outline">
                Contact form
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Why become a Scholar?"
            subtitle="A scholarship is more than an account — it is a structured push toward the thing you are trying to reach."
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border border-[var(--paper-200)] bg-white p-6">
                <Icon size={24} className="text-[var(--accent)]" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-[var(--ink-900)]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Who can apply?"
            subtitle="EdLight Coursera Scholars is for motivated learners who are ready to invest in themselves."
          />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  'Students',
                  'University graduates',
                  'Young professionals',
                  'Entrepreneurs',
                  'Job seekers',
                  'Self-directed learners',
                ].map((who) => (
                  <li
                    key={who}
                    className="flex items-center gap-3 border border-[var(--paper-200)] px-4 py-3 text-sm text-[var(--ink-900)]"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 bg-[var(--accent)]" aria-hidden="true" />
                    {who}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <p className="body-lg text-[var(--ink-700)]">
                What matters most is a clear goal and the commitment to learn. You do not need a perfect
                academic record or previous experience with online courses.
              </p>
              <p className="mt-4 body-lg text-[var(--ink-700)]">
                A university place is not required to apply directly. If you are studying at a{' '}
                <a href="#institutions" className="underline underline-offset-4">partner institution</a>,
                your school nominates its own students — so it is worth asking there first.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title="How it works" subtitle="Four steps, from application to certificate." centered />
          {/* Numbered because these genuinely are sequential — you cannot start
              learning before selection. */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ number, title, body }) => (
              <div key={number} className="border-t-2 border-[var(--ink-900)] pt-5">
                <span className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">{number}</span>
                <h3 className="mt-3 text-lg font-semibold text-[var(--ink-900)]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Key dates"
            subtitle="Cohorts run for three months. When one ends, the places pass to the next group of learners."
            centered
          />
          <div className="mx-auto max-w-3xl border-t border-[var(--paper-200)]">
            {cohorts.map(({ name, window, note }) => (
              <div
                key={name}
                className="flex flex-col gap-1 border-b border-[var(--paper-200)] py-5 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="w-28 shrink-0 font-semibold text-[var(--ink-900)]">{name}</span>
                <span className="flex-1 text-[var(--ink-900)]">{window}</span>
                <span className="text-sm text-[var(--ink-700)]">{note}</span>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-[var(--ink-700)]">
            Partner institutions nominate their students before a cohort opens — for Cohort 1 the deadline is
            20 September 2026. Direct applications open separately; join the notify list and we will write to
            you with the date.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Learning pathways"
            subtitle="Choose a direction on your application. You stay free to pick your own courses within the available catalogue."
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pathways.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border border-[var(--paper-200)] p-6">
                <Icon size={24} className="text-[var(--accent)]" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-[var(--ink-900)]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="EdLight learners"
            subtitle="Photographs from EdLight programmes in Haiti — the community Scholars join."
            centered
          />
          <GalleryGrid images={gallery} columns={3} />
        </div>
      </section>

      {/* Commitment. Encouraging, not threatening — the point is that places are
          scarce, not that scholars are on probation. */}
      <section className="bg-[var(--ink-900)] py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="display-lg mb-4 leading-tight text-white">
              A scholarship is an opportunity — and a commitment.
            </h2>
            <p className="body-lg text-[var(--on-dark-muted)]">
              Places are limited, and every one of them could go to someone else. Selected Scholars are expected
              to activate their access, start a course, and complete at least one meaningful course or
              certificate.
            </p>
            <p className="mt-4 body-lg text-[var(--on-dark-muted)]">
              If a Scholar is not able to begin, we would rather hear it early and offer the place to someone on
              the waitlist than let it go unused.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title="Questions" centered />
          <div className="mx-auto max-w-3xl divide-y divide-[var(--paper-200)] border-y border-[var(--paper-200)]">
            {faqs.map(({ q, a }) => (
              // <details> rather than JS state: it works without hydration, is
              // keyboard and screen-reader accessible for free, and this page
              // should stay light on a slow connection.
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-medium text-[var(--ink-900)] marker:content-none">
                  {q}
                  <span
                    className="shrink-0 font-mono text-lg leading-none text-[var(--accent)] transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-700)]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="display-lg mb-3 leading-tight text-[var(--ink-900)]">
              Want to be first to know?
            </h2>
            <p className="mb-8 body-lg text-[var(--ink-700)]">
              The inaugural cohort is still being put together and direct applications have not opened
              yet. Join the list and we will write to you the day they do — before we announce it
              anywhere else. If you are writing on behalf of a university,{' '}
              <a href="#institutions" className="underline underline-offset-4">start here</a> instead.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <NotifyButton cycleLabel={SCHOLARS_NOTIFY_LABEL} className="btn btn-primary">
                Get notified
              </NotifyButton>
              <Link href="/contact" className="btn btn-outline">
                Ask a question
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
