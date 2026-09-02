import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'
import Hero from '@/components/Hero'
import ContactForm from '@/components/ContactForm'
import { SOCIAL_LINKS, type SocialPlatform } from '@/lib/socials'
import {
  AREA_SERVED,
  CONTACT_EMAIL,
  CORPORATION_NUMBER,
  REGISTERED_ADDRESS_LINE,
} from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Reach EdLight Initiative by email or through our contact form. We reply to students, volunteers, partners, and donors within two to three business days.',
  openGraph: {
    title: 'Contact Us | EdLight Initiative',
    description:
      'Reach EdLight Initiative by email or through our contact form. We reply within two to three business days.',
  },
  twitter: {
    title: 'Contact Us | EdLight Initiative',
    description:
      'Reach EdLight Initiative by email or through our contact form. We reply within two to three business days.',
  },
}

const socialIcons: Record<SocialPlatform, typeof Mail> = {
  facebook: Facebook,
  x: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
}

/**
 * Two things on this page used to be wrong in ways a visitor could see.
 *
 * The phone number was the literal string "+509 XXXX-XXXX" — a placeholder
 * that had been shipping to every visitor. There is no published phone line,
 * so the block is gone rather than filled with an invented number; email and
 * the form are the channels that actually work.
 *
 * The location said "Haiti" while /about said Montreal, Quebec. Both are
 * true of different things, and stating only one of them made the pair read
 * as a contradiction. It now says where the corporation is registered and
 * where the students are, which is the whole answer.
 */
const contactChannels = [
  {
    icon: Mail,
    title: 'Email',
    body: (
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="text-[var(--accent)] underline underline-offset-4 hover:text-[var(--accent-hover)]"
      >
        {CONTACT_EMAIL}
      </a>
    ),
    note: 'The fastest way to reach us.',
  },
  {
    icon: MapPin,
    title: 'Where we are',
    body: <>{REGISTERED_ADDRESS_LINE}</>,
    note: `Registered as a Canadian not-for-profit corporation (No. ${CORPORATION_NUMBER}). Our programmes serve students across ${AREA_SERVED}.`,
  },
  {
    icon: Clock,
    title: 'Response time',
    body: <>Two to three business days</>,
    note: 'Monday to Friday, Eastern Time. We read everything that comes in.',
  },
]

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Questions about a programme, an offer to help, a partnership, or a gift — this reaches the team directly."
        backgroundImage="/edlight_academy_group.webp"
      />

      <section className="py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Channels */}
            <div className="space-y-10">
              <div className="space-y-8">
                {contactChannels.map(({ icon: Icon, title, body, note }) => (
                  <div key={title} className="flex gap-4">
                    <div className="text-[var(--accent)] shrink-0 pt-0.5">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-[var(--ink-900)]">{title}</h2>
                      <p className="mt-1 text-sm sm:text-base text-[var(--ink-900)]">{body}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--ink-700)]">{note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--paper-200)] pt-8">
                <h2 className="eyebrow text-[var(--ink-700)] mb-4">Follow our work</h2>
                <div className="flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map(({ platform, label, href }) => {
                    const Icon = socialIcons[platform]
                    return (
                      <a
                        key={platform}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex h-11 w-11 items-center justify-center border border-[var(--paper-200)] text-[var(--ink-700)] transition-colors hover:border-[var(--ink-900)] hover:text-[var(--ink-900)]"
                      >
                        <Icon size={18} />
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="border-t border-[var(--paper-200)] pt-8">
                <h2 className="eyebrow text-[var(--ink-700)] mb-3">Before you write</h2>
                <p className="text-sm leading-relaxed text-[var(--ink-700)]">
                  Many questions about eligibility, cost, and how to apply are already answered on
                  the{' '}
                  <Link href="/faq" className="underline underline-offset-4 text-[var(--accent)]">
                    FAQ page
                  </Link>
                  . If you want to volunteer or partner with us, the{' '}
                  <Link
                    href="/get-involved"
                    className="underline underline-offset-4 text-[var(--accent)]"
                  >
                    Get Involved page
                  </Link>{' '}
                  has a form built for that.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="border border-[var(--paper-200)] bg-[var(--paper-100)] p-6 sm:p-8">
              <h2 className="display-lg text-[var(--ink-900)] mb-2 leading-tight">
                Send us a message
              </h2>
              <p className="mb-7 text-sm leading-relaxed text-[var(--ink-700)]">
                Fields marked * are required.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
