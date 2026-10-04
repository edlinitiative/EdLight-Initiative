import React from 'react'
import { notFound } from 'next/navigation'
import { STORE_ENABLED } from '@/lib/site'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, GraduationCap, HandHeart, Sparkles } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import StoreInterestButton from '@/components/StoreInterestButton'
import storeData from '@/data/store.json'
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'EdLight Store',
  description:
    'EdLight apparel, gear, and student kits. Tell us what you want and every purchase will fund scholarships and programs for young people in Haiti.',
  alternates: { canonical: '/store' },
}

type Product = (typeof storeData)[number] & {
  featured?: boolean
  details?: string[]
  badge?: string
  priceSuffix?: string
}

const products = storeData as Product[]

const SECTIONS = [
  { category: 'apparel', title: 'Apparel', subtitle: 'Wear the light.' },
  { category: 'gear', title: 'Gear & desk', subtitle: 'For school, study nights, and everything in between.' },
  {
    category: 'give',
    title: 'Give back',
    subtitle: 'Put supplies directly in the hands of a student in Haiti.',
  },
] as const

const IMPACT = [
  { icon: GraduationCap, title: 'Scholarships', body: 'Proceeds go toward scholarships for students in our programs.' },
  { icon: Sparkles, title: 'Learning materials', body: 'Notebooks and school supplies for the students we work with.' },
  { icon: HandHeart, title: 'Programs', body: 'They help keep ESLP, EdLight Academy, and EdLight Code running for young people in Haiti.' },
]

// Images either fill the square (photos with their own backdrop) or sit on
// the card's paper background (cut-out PNGs).
const fitClass: Record<string, string> = {
  cover: 'object-cover group-hover:scale-[1.03] transition-transform duration-500',
  contain: 'object-contain p-6 group-hover:scale-[1.03] transition-transform duration-500',
  'contain-flush': 'object-contain group-hover:scale-[1.03] transition-transform duration-500',
}

function Price({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <span className={`whitespace-nowrap font-display text-[var(--ink-900)] font-semibold ${large ? 'text-4xl' : 'text-2xl'}`}>
      ${product.price}
      {product.priceSuffix && (
        <span className="text-sm font-normal text-[var(--ink-400)]">{product.priceSuffix}</span>
      )}
    </span>
  )
}

const interestButtonClass =
  'inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] border border-[var(--accent)] px-3.5 py-2 hover:bg-[var(--accent)] hover:text-white transition-colors'

export default function StorePage({
  params,
}: {
  params: { locale: string }
}) {
  // Required for static rendering under [locale]: without it next-intl
  // has no locale outside a request and falls back to the default.
  setRequestLocale(params.locale)

  // Gated inside the page, not a layout: a layout gate leaves the page's
  // markup in the flight payload. See STORE_ENABLED in lib/site.ts.
  if (!STORE_ENABLED) {
    notFound()
  }

  const featured = products.find((p) => p.featured)

  return (
    <>
      <Hero
        eyebrow="EdLight Store"
        title="Wear it. Carry it. Fund it."
        subtitle="Apparel, gear, and student kits. Every purchase will support educational programs for young people in Haiti."
        backgroundImage="/about_us.webp"
      />

      {featured && (
        <section className="py-20 sm:py-28 bg-white border-b border-[var(--paper-200)]">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-square bg-[var(--paper-100)] overflow-hidden">
              <Image
                src={featured.image}
                alt={`${featured.name} with the EdLight lightbulb logo embroidered on the chest`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
              <span className="absolute top-4 left-4 eyebrow text-[10px] text-white bg-[var(--accent)] px-2.5 py-1">
                New
              </span>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-5">
                <Image src="/EdLight_Logo.png" alt="EdLight logo" width={44} height={44} />
                <span className="eyebrow text-[var(--ink-400)] text-[11px]">Featured</span>
              </div>
              <h2 className="font-display text-[var(--ink-900)] text-3xl sm:text-4xl font-semibold leading-tight mb-4">
                {featured.name}
              </h2>
              <p className="body-lg text-[var(--ink-700)] mb-6">{featured.description}</p>
              {featured.details && (
                <ul className="space-y-2.5 mb-8">
                  {featured.details.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[var(--ink-700)]">
                      <Check size={18} className="text-[var(--accent)] mt-0.5 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap items-center gap-5">
                <Price product={featured} large />
                <span className="eyebrow text-[10px] text-[var(--ink-400)] border border-[var(--paper-200)] px-2.5 py-1">
                  Not available yet
                </span>
              </div>
              <StoreInterestButton
                itemId={featured.id}
                itemName={featured.name}
                needsSize
                className="mt-7 inline-flex items-center gap-2 bg-[var(--accent)] text-white font-medium px-6 py-3 hover:bg-[var(--accent-hover)] transition-colors"
              />
              <p className="text-sm text-[var(--ink-400)] mt-3">
                No payment now. We&apos;ll email you when it&apos;s ready to order.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 sm:py-28 bg-[var(--paper-50)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Shop EdLight"
            subtitle="Nothing here ships yet. Tap “I want one” on anything you’d buy, and we’ll make what people ask for first."
            centered
          />

          {SECTIONS.map((section) => {
            const items = products.filter((p) => p.category === section.category && !p.featured)
            if (items.length === 0) return null
            return (
              <div key={section.category} className="mt-16">
                <div className="flex items-baseline justify-between gap-4 border-b border-[var(--paper-200)] pb-3 mb-8">
                  <h3 className="font-display text-[var(--ink-900)] text-2xl font-semibold">{section.title}</h3>
                  <p className="text-sm text-[var(--ink-400)] hidden sm:block">{section.subtitle}</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {items.map((product) => (
                    <article
                      key={product.id}
                      className="group flex flex-col bg-white border border-[var(--paper-200)] hover:border-[var(--ink-400)] transition-colors overflow-hidden"
                    >
                      <div className="relative aspect-square bg-[var(--paper-100)] overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className={fitClass[product.fit] ?? fitClass.contain}
                        />
                        {product.badge && (
                          <span className="absolute top-3 left-3 eyebrow text-[10px] text-white bg-[var(--accent)] px-2.5 py-1">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h4 className="font-display text-[var(--ink-900)] text-lg font-semibold mb-2 leading-snug">
                          {product.name}
                        </h4>
                        <p className="text-sm leading-relaxed text-[var(--ink-700)] mb-5 flex-1">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between gap-2 border-t border-[var(--paper-200)] pt-4 mb-4">
                          <Price product={product} />
                          <span className="eyebrow text-[10px] text-[var(--ink-400)] whitespace-nowrap">Not available yet</span>
                        </div>
                        <StoreInterestButton
                          itemId={product.id}
                          itemName={product.name}
                          needsSize={product.category === 'apparel' && product.id !== 'cap'}
                          className={`${interestButtonClass} justify-center w-full`}
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white border-t border-[var(--paper-200)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Where your purchase goes"
            subtitle="EdLight Initiative is a registered Canadian not-for-profit. Store proceeds go back into our programs."
            centered
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {IMPACT.map(({ icon: Icon, title, body }) => (
              <div key={title} className="text-center px-4">
                <Icon size={32} className="mx-auto text-[var(--accent)] mb-4" />
                <h3 className="font-display text-xl font-semibold text-[var(--ink-900)] mb-2">{title}</h3>
                <p className="text-[var(--ink-700)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border border-[var(--paper-200)] bg-[var(--paper-50)] p-8 sm:p-10 max-w-3xl mx-auto text-center">
            <h3 className="font-display text-[var(--ink-900)] text-2xl sm:text-3xl font-semibold mb-4">
              Want to help right now?
            </h3>
            <p className="body-lg text-[var(--ink-700)] mb-7 max-w-xl mx-auto">
              While the store gets ready, a direct gift goes straight to scholarships, learning materials, and
              youth programs.
            </p>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-[var(--accent)] text-white font-medium px-6 py-3 hover:bg-[var(--accent-hover)] transition-colors text-sm sm:text-base"
            >
              Make a donation
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
