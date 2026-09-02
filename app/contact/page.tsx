import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/Hero'
import ContactForm from '@/components/ContactForm'
import { SOCIAL_LINKS, type SocialPlatform } from '@/lib/socials'
import {
  AREA_SERVED,
  CONTACT_EMAIL,
  CORPORATION_NUMBER,
  REGISTERED_ADDRESS_LINE,
} from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contact')

  // openGraph and twitter carried the same pair of strings as each other, so
  // they share one key rather than three copies a translator has to keep in
  // step.
  const shareTitle = t('shareTitle')
  const shareDescription = t('shareDescription')

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: shareTitle,
      description: shareDescription,
    },
    twitter: {
      title: shareTitle,
      description: shareDescription,
    },
  }
}

const socialIcons: Record<SocialPlatform, typeof Mail> = {
  facebook: Facebook,
  x: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
}

export default async function ContactPage() {
  const t = await getTranslations('contact')

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
   *
   * The address, the corporation number, and the area served come from
   * lib/site.ts and are interpolated, not translated — a locale must not be
   * able to assert a different registration.
   */
  const contactChannels = [
    {
      key: 'email',
      icon: Mail,
      body: (
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-[var(--accent)] underline underline-offset-4 hover:text-[var(--accent-hover)]"
        >
          {CONTACT_EMAIL}
        </a>
      ),
      note: t('channels.email.note'),
    },
    {
      key: 'location',
      icon: MapPin,
      body: <>{REGISTERED_ADDRESS_LINE}</>,
      note: t('channels.location.note', {
        number: CORPORATION_NUMBER,
        area: AREA_SERVED,
      }),
    },
    {
      key: 'response',
      icon: Clock,
      body: <>{t('channels.response.body')}</>,
      note: t('channels.response.note'),
    },
  ]

  return (
    <>
      <Hero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage="/edlight_academy_group.webp"
      />

      <section className="py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Channels */}
            <div className="space-y-10">
              <div className="space-y-8">
                {contactChannels.map(({ key, icon: Icon, body, note }) => (
                  <div key={key} className="flex gap-4">
                    <div className="text-[var(--accent)] shrink-0 pt-0.5">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-[var(--ink-900)]">
                        {t(`channels.${key}.title`)}
                      </h2>
                      <p className="mt-1 text-sm sm:text-base text-[var(--ink-900)]">{body}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--ink-700)]">{note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--paper-200)] pt-8">
                <h2 className="eyebrow text-[var(--ink-700)] mb-4">{t('followHeading')}</h2>
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
                <h2 className="eyebrow text-[var(--ink-700)] mb-3">
                  {t('beforeYouWrite.heading')}
                </h2>
                {/* Both links sit mid-paragraph, so this is one message with
                    two tags rather than four fragments a translator would have
                    to reassemble in French word order. */}
                <p className="text-sm leading-relaxed text-[var(--ink-700)]">
                  {t.rich('beforeYouWrite.body', {
                    faqLink: (chunks) => (
                      <Link
                        href="/faq"
                        className="underline underline-offset-4 text-[var(--accent)]"
                      >
                        {chunks}
                      </Link>
                    ),
                    involvedLink: (chunks) => (
                      <Link
                        href="/get-involved"
                        className="underline underline-offset-4 text-[var(--accent)]"
                      >
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="border border-[var(--paper-200)] bg-[var(--paper-100)] p-6 sm:p-8">
              <h2 className="display-lg text-[var(--ink-900)] mb-2 leading-tight">
                {t('form.heading')}
              </h2>
              <p className="mb-7 text-sm leading-relaxed text-[var(--ink-700)]">
                {t('form.requiredNote')}
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
