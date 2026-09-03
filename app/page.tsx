import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Code2,
  Lightbulb,
  Globe,
  GraduationCap,
  Laptop,
  Users,
  Compass,
  HelpCircle,
  Heart,
} from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import ImpactCounters from '@/components/ImpactCounters'
import PartnerLogoGrid from '@/components/PartnerLogoGrid'
import impactData from '@/data/impact.json'
import testimonialsData from '@/data/testimonials.json'
import partnersData from '@/data/partners.json'
import {
  FOUNDED_YEAR,
  MISSION_STATEMENT,
  NONPROFIT_STATUS_LINE,
  NONPROFIT_STATUS_SHORT,
} from '@/lib/site'

// A single static hero image, rendered through next/image with priority.
// This used to be a 4-image carousel rotating every 5 seconds via CSS
// background-image — unoptimized, un-preloaded, and repainting the whole
// viewport mid-load, which tanked LCP and Speed Index on mobile (the load
// speed the Ad Grants website policy reviews against).
const heroImage = '/edlight_academy_group.webp'

// Four, not five. EdLight Nexus is gone from this list: it has no dates, no
// cohort, and no way to apply, and a card promising a programme that a
// visitor cannot join is the "under construction" page the Ad Grants website
// policy names explicitly. It returns here when there is something to join.
// EdLight Labs is gone for a different reason — it sells commercial web
// services, which does not belong in a list of free student programmes.
const ecosystemPrograms = [
  {
    title: 'EdLight Academy',
    description:
      'Free courses in Mathematics, Physics, Chemistry, SVT, Economics, and Languages — built around the 9e Année and Baccalauréat exams.',
    icon: <BookOpen size={32} />,
    href: '/academy',
  },
  {
    title: 'EdLight Code',
    description:
      'Six hands-on coding tracks — Python, SQL, HTML, CSS, JavaScript, Terminal & Git — taught in Haitian Creole, French, and English.',
    icon: <Code2 size={32} />,
    href: '/code',
  },
  {
    title: 'Coursera Scholars',
    description:
      'Funded Coursera certificates, run with Coursera, so Haitian students can earn recognised professional credentials at no cost.',
    icon: <GraduationCap size={32} />,
    href: '/coursera-scholars',
  },
  {
    title: 'ESLP',
    description:
      'A two-week summer leadership programme: seminars, mentorship, a company excursion, and a community impact project.',
    icon: <Users size={32} />,
    href: '/eslp',
  },
]

// Every number here can be checked against a page on this site. The three
// that used to be here — 2,500 students served, 45 courses offered, 3 partner
// organisations — could not: the first two are unsupported by anything we
// publish, and 2,500 students a year sat oddly beside ESLP's own record of
// 135 alumni in total.
const impactCounters = [
  { label: `ESLP alumni through ${impactData.eslpAlumniThrough}`, value: impactData.eslpAlumni },
  { label: 'Free subjects and coding tracks', value: impactData.academySubjects + impactData.codeTracks },
  { label: 'Partner organisations', value: impactData.partnerOrganizations, suffix: '' },
]

const howItWorks = [
  {
    icon: <Laptop size={28} />,
    title: 'Learn online, at no cost',
    body: 'Every course we offer is free. Lessons run in a web browser and in our mobile apps, so a student with an ordinary phone and an intermittent connection can still take part. EdLight Code teaches in Haitian Creole, French, and English, because learning to program in a language you had to learn first is a barrier we would rather remove.',
  },
  {
    icon: <Users size={28} />,
    title: 'Learn alongside mentors',
    body: 'Courses on their own are not enough. Our programmes pair students with educators, builders, and mentors who review work, answer questions, and help students decide what to study next. ESLP goes further, putting a cohort in a room together for two weeks with people who have done the thing they want to do.',
  },
  {
    icon: <Compass size={28} />,
    title: 'Reach further than Haiti',
    body: 'Strong students should not be limited by where they were born. Coursera Scholars funds recognised professional certificates that carry weight outside Haiti, and ESLP develops the leadership and civic confidence that scholarships and universities ask for.',
  },
]

// /courses, /global-exchange and /mission_projects were removed. These cards
// now point at the pages that still cover the same ground — deleting them
// outright would have left this section with a single FAQ card in it.
//
// "Scholarships and exchange" used to point at /nexus, which is now noindexed
// for having no cohort or application. It points at Coursera Scholars
// instead, which is the scholarship route students can actually take.
const exploreMore = [
  {
    href: '/academy',
    icon: <BookOpen size={24} />,
    title: 'Browse the course catalogue',
    body: 'Free courses in the six subjects Haitian students need for the national exams.',
  },
  {
    href: '/coursera-scholars',
    icon: <Globe size={24} />,
    title: 'Scholarships and certificates',
    body: 'Funded Coursera credentials for Haitian students, run in partnership with Coursera.',
  },
  {
    href: '/about',
    icon: <Lightbulb size={24} />,
    title: 'Our mission',
    body: 'Who we are, how we are registered, and how we work to widen access to education.',
  },
  {
    href: '/faq',
    icon: <HelpCircle size={24} />,
    title: 'Frequently asked questions',
    body: 'Who can apply, what our programmes cost, and how to get started as a student or a supporter.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      {/* The eyebrow is the first text on the site. It used to spend itself on
          "EdLight Initiative · Est. 2020" — the name, which the logo an inch
          above it already says, and a founding year. The nonprofit status goes
          there instead, because the Ad Grants policy asks for it to be
          displayed prominently and that is the most prominent line on the
          site. The founding year survives beside it. */}
      <Hero
        eyebrow={`${NONPROFIT_STATUS_SHORT} · Est. ${FOUNDED_YEAR}`}
        title="Empowering the next generation of Haitian innovators."
        subtitle="Quality education, mentorship, and global opportunities — built with and for students across Haiti."
        backgroundImage={heroImage}
        meta={[
          { label: 'Programmes', value: String(ecosystemPrograms.length) },
          { label: 'ESLP alumni', value: `${impactData.eslpAlumni}` },
          { label: 'Partner orgs', value: String(impactData.partnerOrganizations) },
          { label: 'Cost to students', value: '$0' },
        ]}
      >
        <Link
          href="/academy"
          className="group inline-flex items-center justify-center gap-2 bg-white text-[var(--ink-900)] font-medium px-6 py-3 hover:bg-[var(--paper-100)] transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          Explore Programs
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/get-involved"
          className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/5 text-white font-medium px-6 py-3 hover:bg-white/10 hover:border-white/70 transition-colors text-sm sm:text-base w-full sm:w-auto backdrop-blur-sm"
        >
          Support Us
        </Link>
      </Hero>

      {/* Who we are — the band directly under the hero.
          The rejection asked for two things by name: that the nonprofit
          status be displayed prominently, and that there be a clear
          description of the mission and activities. Both used to be reachable
          only by scrolling into the fifth paragraph of the mission block
          below, where the status sat in a subordinate clause. A reviewer who
          reads the top of the homepage and stops now has both.

          Deliberately plain — no card, no icon, no animation. It is a
          statement of fact and it should read like one. */}
      <section className="border-b border-[var(--paper-200)] bg-[var(--paper-100)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-8 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h2 className="text-lg sm:text-xl font-semibold leading-snug text-[var(--ink-900)]">
                {MISSION_STATEMENT}
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
                We run free online courses in the subjects Haitian students sit national exams
                in, a coding platform taught in Haitian Creole, French, and English, funded
                professional certificates, and a two-week residential summer leadership
                programme. Every one of them is free to the student.
              </p>
            </div>
            <div className="lg:col-span-5 lg:border-l lg:border-[var(--paper-300)] lg:pl-10">
              {/* Not the `eyebrow` class. It hardcodes `color:
                  var(--ink-400)` (#747683), which a Tailwind arbitrary text
                  colour layered on top does not override — the same trap the
                  mobile nav has a note about. On --paper-100 that measures
                  4.06:1 at 12px, under the 4.5:1 floor, so the label on the
                  one block the Ad Grants review is looking for was the least
                  legible text on the page. Same look, spelled out, with a
                  colour that wins. */}
              <h3 className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--ink-700)]">
                Our nonprofit status
              </h3>
              <p className="text-sm leading-relaxed text-[var(--ink-700)]">
                {NONPROFIT_STATUS_LINE}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-700)]">
                We do not yet hold registered-charity status, so we cannot issue tax receipts.{' '}
                <Link
                  href="/about"
                  className="text-[var(--accent)] underline underline-offset-4 hover:text-[var(--accent-hover)]"
                >
                  Read more about who we are
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="Our Mission & Vision"
              subtitle="Creating pathways to excellence for Haitian youth"
              centered
            />
            {/* Three paragraphs, down from five. The first two said the same
                thing twice in the register of a grant application ("bridge
                the educational gap", "become the innovators, leaders, and
                changemakers Haiti needs") without naming a single concrete
                thing the organisation does, and the fifth restated the
                nonprofit registration that the band under the hero now
                carries. What is left is the mission, the three barriers we
                actually work on, and the vision. */}
            <div className="border border-[var(--paper-200)] bg-[var(--paper-100)] p-6 sm:p-8 space-y-4 text-[var(--ink-700)] leading-relaxed text-sm sm:text-base">
              {/* Does not re-state MISSION_STATEMENT: the status band a
                  screen above already opens with it, and reading the same
                  sentence twice in one scroll makes the second one look like
                  boilerplate. This picks up where that band left off. */}
              <p>
                A student in Haiti who wants to sit the Baccalauréat, learn to program, or earn a
                credential an employer outside the country will recognise should not be stopped
                by what their family can pay, how far they live from a city, or which language
                the material happens to be in.
              </p>
              <p>
                Those three barriers are what our programmes are built around. Every course we
                offer is free, with no fee at any stage. Lessons run in a web browser and in our
                mobile apps, so a student with an ordinary phone and an intermittent connection
                can take part without moving cities. And EdLight Code teaches in Haitian Creole
                and French as well as English, because having to learn a second language before
                you can learn to program is a barrier we would rather remove than accept. We work
                with high school students across Haiti, and with the teachers and community
                organisations already serving them.
              </p>
              <p>
                Our vision is a Haiti where every motivated student has the resources,
                mentorship, and opportunities to reach their full potential — and where the
                students who do go on to build the country were not selected by their families&apos;
                means.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="How EdLight Works"
            subtitle="What a student actually gets, and what it costs them"
            centered
          />
          <div className="grid gap-px bg-[var(--paper-200)] sm:grid-cols-3">
            {howItWorks.map(({ icon, title, body }) => (
              <div key={title} className="bg-[var(--paper-50)] p-6 sm:p-8">
                <div className="text-[var(--accent)] mb-4">{icon}</div>
                <h3 className="text-lg font-semibold text-[var(--ink-900)] mb-3">{title}</h3>
                <p className="text-sm leading-relaxed text-[var(--ink-700)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Programs */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Our Ecosystem"
            subtitle="Comprehensive programs supporting students at every stage"
            centered
          />
          <p className="max-w-3xl mx-auto mb-10 text-center text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
            Four programmes, each aimed at a different point in a student&apos;s path. Academy and
            Code cover the learning itself, from secondary-school maths and physics through to
            programming in Python and SQL. Coursera Scholars and ESLP handle what comes next — the
            credentials and the leadership experience that turn a strong student into a candidate.
            All four are free, and a student can start anywhere and move between them.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--paper-200)]">
            {ecosystemPrograms.map((program) => (
              <Card
                key={program.title}
                title={program.title}
                description={program.description}
                icon={program.icon}
                href={program.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Counters */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title="Our Impact" subtitle="Making a difference in communities across Haiti" centered />
          <ImpactCounters counters={impactCounters} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader title="Student Stories" subtitle="Hear from our alumni" centered />
          <TestimonialCarousel testimonials={testimonialsData} />
        </div>
      </section>

      {/* Partners */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Our Partners"
            subtitle="Organisations we work with to widen what our students can reach"
            centered
          />
          <PartnerLogoGrid partners={partnersData} />
        </div>
      </section>

      {/* Explore more — surfaces the deeper pages from the homepage */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Explore Further"
            subtitle="More detail on our courses, our projects, and how to join"
            centered
          />
          <div className="grid gap-px bg-[var(--paper-200)] sm:grid-cols-2">
            {exploreMore.map(({ href, icon, title, body }) => (
              <Link
                key={href}
                href={href}
                className="group bg-[var(--paper-50)] p-6 sm:p-8 transition-colors hover:bg-[var(--paper-100)]"
              >
                <div className="text-[var(--accent)] mb-3">{icon}</div>
                <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-[var(--ink-900)]">
                  {title}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </h3>
                <p className="text-sm leading-relaxed text-[var(--ink-700)]">{body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Calls to action */}
      <section className="py-14 sm:py-20 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="border border-[var(--paper-200)] bg-[var(--paper-100)] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--ink-900)] mb-3">
              Take the next step
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
              Whether you are a student in Haiti looking for a course, a professional willing to
              mentor, or a donor deciding where a hundred dollars goes furthest — here is where to
              start.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/academy"
                className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
              >
                <BookOpen size={16} />
                Start a free course
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 border border-[var(--ink-900)] px-6 py-3 text-sm font-medium text-[var(--ink-900)] transition-colors hover:bg-[var(--paper-200)]"
              >
                <Heart size={16} />
                Donate
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center gap-2 border border-[var(--ink-400)] px-6 py-3 text-sm font-medium text-[var(--ink-700)] transition-colors hover:border-[var(--ink-900)] hover:text-[var(--ink-900)]"
              >
                <Users size={16} />
                Volunteer or partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
