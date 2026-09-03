import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Code2,
  GraduationCap,
  Heart,
  Users,
} from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import {
  MISSION_STATEMENT,
  NONPROFIT_STATUS_LINE,
  NONPROFIT_STATUS_SHORT,
  CORPORATION_NUMBER,
  REGISTERED_ADDRESS_LINE,
  AREA_SERVED,
  FOUNDED_YEAR,
  CONTACT_EMAIL,
} from '@/lib/site'
import impactData from '@/data/impact.json'

// /about is the page an Ad Grants reviewer opens to answer "is the mission
// clear?" and "is the nonprofit status displayed?", so it gets its own
// description rather than inheriting the site default.
export const metadata: Metadata = {
  title: 'About Us',
  description: `${MISSION_STATEMENT} A ${NONPROFIT_STATUS_SHORT.toLowerCase()} (Corporation No. ${CORPORATION_NUMBER}) based in ${REGISTERED_ADDRESS_LINE}, serving students across ${AREA_SERVED}.`,
  alternates: { canonical: '/about' },
}

const leadershipTeam = [
  { name: 'Stevenson Michel', title: 'Co-Founder & CEO' },
  { name: 'Ted Jacquet', title: 'Co-Founder & CFO / Product & Growth' },
  { name: 'Rony Francillon', title: 'Director, ESLP & Nexus' },
  { name: 'Hérode Métellus', title: 'Fundraising Coordinator' },
  { name: 'Williamson Michel', title: 'Haiti Operations Manager' },
  { name: 'Christopher Michel', title: 'Internal Operations & Logistics' },
  { name: 'Stéphane Lainé', title: 'Haiti Operations Coordinator' },
  { name: 'Fredler Pierre-Louis', title: 'Cybersecurity Lead / Advisor' },
]

/**
 * What we run, with somewhere to go for each.
 *
 * This section did not exist. A mission page that never names a programme
 * leaves the reviewer's second question — "a clear description of its
 * activities" — unanswered, and left /about as the only top-level page with
 * no link to anything EdLight actually does.
 *
 * Four programmes, matching the nav, the footer, and the homepage. Nexus and
 * Labs are not here: Nexus has no cohort, dates, or application, and Labs
 * sells commercial web services. Both are noindexed and out of the sitemap,
 * and the "Our Journey" copy on this page used to present both as live parts
 * of the ecosystem — which is the one claim on this page a reviewer could
 * have checked and found unsupported.
 */
const activities = [
  {
    href: '/academy',
    icon: <BookOpen size={24} />,
    title: 'EdLight Academy',
    body: `Free courses in the ${impactData.academySubjects} subjects Haitian students sit national exams in — Mathematics, Physics, Chemistry, SVT, Economics, and Languages — built around the 9e Année and Baccalauréat syllabi.`,
  },
  {
    href: '/code',
    icon: <Code2 size={24} />,
    title: 'EdLight Code',
    body: `${impactData.codeTracks} hands-on coding tracks — Python, SQL, HTML, CSS, JavaScript, and Terminal & Git — taught in Haitian Creole, French, and English.`,
  },
  {
    href: '/coursera-scholars',
    icon: <GraduationCap size={24} />,
    title: 'Coursera Scholars',
    body: 'Funded Coursera certificates, run with Coursera, so Haitian students can earn professional credentials that carry weight outside Haiti at no cost.',
  },
  {
    href: '/eslp',
    icon: <Users size={24} />,
    title: 'EdLight Summer Leadership Program',
    body: `A two-week residential programme of seminars, mentorship, a company excursion, and a community impact project. ${impactData.eslpEditions} editions have run, with ${impactData.eslpAlumni} alumni through ${impactData.eslpAlumniThrough}.`,
  },
]

/**
 * Milestones we can evidence.
 *
 * This was two entries: "2022 — Launch of ESLP", and "Today — A growing
 * ecosystem", the second of which named Nexus and Labs as live programmes and
 * carried no date at all. An organisation founded in 2020 showing a two-item
 * history under the heading "Our Journey" reads as a page nobody has
 * revisited, which is the "up-to-date content" finding in the rejection.
 *
 * Every claim below is checkable against something this site already
 * publishes: the founding year against lib/site.ts, the editions and the 2026
 * cohort against /eslp, the subject and track counts against /academy and
 * /code, the app listings against the footer.
 *
 * Where the three previously-missing dates came from, since none of them is
 * derivable from the code:
 *
 *   - Incorporation in Canada, 2022: confirmed by the team. The month is not
 *     recorded, and nothing establishes whether it fell before or after that
 *     August's first ESLP cohort — so the two share one 2022 entry rather
 *     than being listed in an order we cannot support.
 *   - EdLight Code, 2026: the /code page entered this repository on
 *     2026-02-22 (commit 9974b16). That dates Code joining the public
 *     programme lineup, which is what the entry claims; it is not a claim
 *     about when the platform itself first existed.
 *   - The mobile apps, 2026: the footer began linking both listings on
 *     2026-08-07 (commit bb6e283), and both store pages are live. Google Play
 *     no longer publishes a "Released on" date and the App Store listing
 *     shows none, so the year is as precise as the evidence goes.
 *
 * If anyone can supply the actual incorporation month or store release dates,
 * tighten these — but do not guess them.
 */
const timeline = [
  {
    year: String(FOUNDED_YEAR),
    title: 'EdLight Initiative founded',
    description:
      'Ted Jacquet and Stevenson Michel start EdLight to widen access to quality education for students in Haiti, beginning with free online course material.',
  },
  {
    year: '2022',
    title: 'Incorporated in Canada, and the first ESLP cohort',
    description: `EdLight Initiative is incorporated as a not-for-profit corporation in Canada — Corporation No. ${CORPORATION_NUMBER}, based in ${REGISTERED_ADDRESS_LINE}. The same year, the EdLight Summer Leadership Program runs for the first time in August: a leadership experience built to grow students’ confidence, vision, and civic engagement.`,
  },
  {
    year: `2022–2026`,
    title: `${impactData.eslpEditions} consecutive ESLP editions`,
    description: `ESLP has run every summer since, reaching ${impactData.eslpAlumni} alumni through ${impactData.eslpAlumniThrough}. The 2026 edition ran 10–21 August and graduated 35 fellows at IICA in Pétion-Ville, with a company excursion to Radio Télé Métropole in Port-au-Prince.`,
  },
  {
    year: '2026',
    title: 'EdLight Code launches, and the courses reach phones',
    description: `EdLight Code joins the public programme lineup with ${impactData.codeTracks} tracks taught in Haitian Creole, French, and English — so a student does not have to learn a second language before learning to program. The same year, EdLight Academy ships on the App Store and Google Play and EdLight Code on Google Play, putting the courses on the phones students already own.`,
  },
  {
    year: 'Today',
    title: 'Four free programmes, open to any student in Haiti',
    description: `EdLight runs Academy, Code, Coursera Scholars, and ESLP — ${impactData.academySubjects} exam subjects and ${impactData.codeTracks} coding tracks between them, free at every stage, on the web and on mobile. Applications for ESLP 2027 open in spring 2027.`,
  },
]

// Initials, not a repeated stock glyph. Eight identical grey person icons
// read as photographs that never arrived — the visual signature of an
// unfinished site, and the thing the "under construction" clause of the
// website policy is aimed at. A monogram is a deliberate choice rather than
// an absence, and it distinguishes the eight people from each other.
function initialsOf(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow={`${NONPROFIT_STATUS_SHORT} · Est. ${FOUNDED_YEAR}`}
        title="About EdLight"
        // Not MISSION_STATEMENT. It is the first line under "Our mission" a
        // screen below, and a hero that says the same sentence the section
        // beneath it says reads as a page with one idea in it.
        subtitle="Who we are, how we are registered, and what we run for students in Haiti."
        backgroundImage="/about_us.webp"
        meta={[
          { label: 'Founded', value: String(FOUNDED_YEAR) },
          { label: 'Registered in', value: 'Canada' },
          // "Students served in" wrapped onto two lines in its cell and left
          // that one column taller than the other three.
          { label: 'Students in', value: AREA_SERVED },
          { label: 'Cost to students', value: '$0' },
        ]}
      >
        <Link
          href="/academy"
          className="group inline-flex items-center justify-center gap-2 bg-white text-[var(--ink-900)] font-medium px-6 py-3 hover:bg-[var(--paper-100)] transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          Explore our programmes
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/5 text-white font-medium px-6 py-3 hover:bg-white/10 hover:border-white/70 transition-colors text-sm sm:text-base w-full sm:w-auto backdrop-blur-sm"
        >
          Contact us
        </Link>
      </Hero>

      {/* Who we are — mission, activities, and registration, in that order,
          before anything else on the page. The mission used to arrive in the
          third sentence of a paragraph that opened "EdLight Initiative is a
          mission-driven organization committed to expanding access to..." —
          a sentence that describes a category of organisation rather than
          this one. The registration was in the third paragraph. */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="max-w-4xl">
            <SectionHeader title="Our mission" />
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
              <p className="text-lg sm:text-xl font-semibold text-[var(--ink-900)]">
                {MISSION_STATEMENT}
              </p>
              <p>
                EdLight was founded in {FOUNDED_YEAR} on a straightforward observation: Haiti has
                no shortage of motivated students, and a serious shortage of ways for them to
                study without paying, travelling, or working in a language they had to learn
                first. Cost, distance, and language are the three barriers our programmes are
                built to remove.
              </p>
              <p>
                Our vision is a Haiti where every motivated student has the resources,
                mentorship, and opportunities to reach their full potential — and where the
                students who go on to build the country were not selected by their families&apos;
                means. All of our programmes are free to the student, at every stage.
              </p>
            </div>
          </div>

          {/* Nonprofit status, in its own bordered block with its own heading.
              It was previously the third paragraph of "Our Story", with the
              corporation number typed as a literal rather than read from
              lib/site.ts — so a change to the registration would have left
              this page silently disagreeing with the footer. */}
          <div className="mt-10 max-w-4xl border border-[var(--paper-200)] bg-[var(--paper-100)] p-6 sm:p-8">
            <h2 className="text-base sm:text-lg font-semibold text-[var(--ink-900)]">
              Our nonprofit status
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
              {NONPROFIT_STATUS_LINE}
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
              We do not yet hold registered-charity status, which means we cannot issue tax
              receipts and donations to us are not tax-deductible. We would rather say so here
              than let a donor discover it at tax time. Write to{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[var(--accent)] underline underline-offset-4 hover:text-[var(--accent-hover)]"
              >
                {CONTACT_EMAIL}
              </a>{' '}
              if you need documentation of a gift, and see our{' '}
              <Link
                href="/faq"
                className="text-[var(--accent)] underline underline-offset-4 hover:text-[var(--accent-hover)]"
              >
                FAQ
              </Link>{' '}
              for the longer answer.
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-12 sm:py-16 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="What we do"
            subtitle="Four programmes, each aimed at a different point in a student's path — and all free to join"
          />
          <div className="grid gap-px bg-[var(--paper-200)] sm:grid-cols-2">
            {activities.map(({ href, icon, title, body }) => (
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

      {/* Team */}
      <section className="py-12 sm:py-16 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Meet the EdLight team"
            subtitle="A multidisciplinary team of educators, builders, mentors, and operators working across education, technology, and leadership development"
          />
          <p className="max-w-3xl mb-10 text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
            EdLight was founded by Ted Jacquet and Stevenson Michel in {FOUNDED_YEAR}. The team
            below runs the programmes day to day, split between {REGISTERED_ADDRESS_LINE} and
            operations on the ground in {AREA_SERVED}.
          </p>
          <ul className="grid gap-px bg-[var(--paper-200)] grid-cols-2 md:grid-cols-4">
            {leadershipTeam.map((leader) => (
              <li key={leader.name} className="bg-[var(--paper-50)] p-5 sm:p-6">
                <div
                  className="flex h-14 w-14 items-center justify-center bg-[var(--accent-soft)] text-sm font-semibold tracking-wide text-[var(--accent)]"
                  aria-hidden="true"
                >
                  {initialsOf(leader.name)}
                </div>
                <h3 className="mt-4 text-sm sm:text-base font-semibold text-[var(--ink-900)]">
                  {leader.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[var(--ink-700)]">
                  {leader.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey */}
      <section className="py-12 sm:py-16 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Our journey"
            subtitle={`From a set of free course notes in ${FOUNDED_YEAR} to four programmes, two mobile apps, and ${impactData.eslpAlumni} leadership programme alumni`}
          />
          <ol className="max-w-3xl">
            {timeline.map((item, index) => (
              <li
                key={item.year + item.title}
                className={`flex gap-5 sm:gap-8 ${
                  index === timeline.length - 1 ? '' : 'pb-8'
                }`}
              >
                {/* The connector is a flex child that grows, not an absolutely
                    positioned element with a percentage height. It was the
                    latter, and `h-[calc(100%-0.5rem)]` resolved against this
                    column — which is only as tall as the year label — rather
                    than against the row, so it rendered as a stub under the
                    first entry and was invisible everywhere else. As a
                    `flex-1` child of a column that stretches to the row, it
                    fills whatever height the entry turns out to need.

                    w-16/w-20, not w-14/w-16: "2022–2026" wrapped onto two
                    lines in the narrower column. */}
                <div className="flex w-16 flex-shrink-0 flex-col items-start sm:w-20">
                  {/* Stays at text-sm at every breakpoint. At sm:text-base the
                      range label "2022–2026" is wider than the column and
                      wrapped onto two lines. */}
                  <span className="numeral whitespace-nowrap text-sm font-semibold text-[var(--accent)]">
                    {item.year}
                  </span>
                  {index !== timeline.length - 1 && (
                    <span
                      className="mt-2 w-px flex-1 bg-[var(--paper-300)]"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="flex-1 border-t border-[var(--paper-200)] pt-1">
                  <h3 className="text-base font-semibold text-[var(--ink-900)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-700)]">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Calls to action. This page used to end on a closing line — "EdLight
          continues to build practical, mission-driven pathways for students
          through education, leadership, technology, and community" — which
          restated the mission a fourth time and gave the reader nowhere to
          go. /about was the only top-level page with no call to action on it
          at all, which the rejection names directly. */}
      <section className="py-12 sm:py-16 border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="border border-[var(--paper-200)] bg-[var(--paper-100)] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--ink-900)] mb-3">
              Work with us
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed text-[var(--ink-700)]">
              Every programme is free to the student, which means it is funded and staffed by
              people who chose to be here. If you are a student in {AREA_SERVED}, a professional
              willing to mentor, or a donor deciding where a hundred dollars goes furthest — here
              is where to start.
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
                href="/get-involved"
                className="inline-flex items-center justify-center gap-2 border border-[var(--ink-900)] px-6 py-3 text-sm font-medium text-[var(--ink-900)] transition-colors hover:bg-[var(--paper-200)]"
              >
                <Users size={16} />
                Volunteer or partner
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 border border-[var(--paper-300)] px-6 py-3 text-sm font-medium text-[var(--ink-700)] transition-colors hover:border-[var(--ink-900)] hover:text-[var(--ink-900)]"
              >
                <Heart size={16} />
                Donate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
