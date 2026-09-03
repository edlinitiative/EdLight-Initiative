import React from 'react'
import { notFound } from 'next/navigation'
import { STORE_ENABLED } from '@/lib/site'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import storeData from '@/data/store.json'

// Every item here is still "coming soon". The Ad Grants website policy counts
// placeholder and under-construction pages against the whole site, so this one
// stays out of the index until the store actually sells something. It is
// already absent from the nav and sitemap.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function StorePage() {
  // Every product here is marked "Coming soon" and the page says the store
  // is launching soon, so there is nothing a visitor can act on. Same
  // reasoning as /nexus, and the same placement: gating in a layout leaves
  // the page's markup in the response's flight payload, so the gate has to
  // be inside the page. See STORE_ENABLED in lib/site.ts.
  if (!STORE_ENABLED) {
    notFound()
  }

  return (
    <>
      <Hero
        eyebrow="EdLight Store"
        title="Wear it. Carry it. Fund it."
        subtitle="Apparel, accessories, and a sponsorship kit — every order supports educational programs for Haitian youth."
        backgroundImage="/about_us.webp"
      />

      <section className="py-20 sm:py-28 bg-[var(--paper-50)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title="Shop EdLight"
            subtitle="All proceeds fund scholarships, learning materials, and program operations."
            centered
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12">
            {storeData.map((product) => {
              const isSponsorKit = product.name.toLowerCase().includes('sponsor')
              const isTote = product.name.toLowerCase().includes('tote')
              return (
                <article
                  key={product.id}
                  className="group flex flex-col bg-white border border-[var(--paper-200)] hover:border-[var(--ink-400)] transition-colors overflow-hidden"
                >
                  {/* Product image */}
                  <div className="relative aspect-square bg-[var(--paper-100)] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className={
                        isSponsorKit
                          ? 'object-cover'
                          : isTote
                          ? 'object-contain group-hover:scale-[1.03] transition-transform duration-500'
                          : 'object-contain p-6 group-hover:scale-[1.03] transition-transform duration-500'
                      }
                    />
                    {isSponsorKit && (
                      <span className="absolute top-3 left-3 eyebrow text-[10px] text-white bg-[var(--accent)] px-2.5 py-1">
                        Sponsorship
                      </span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-[var(--ink-900)] text-lg font-semibold mb-2 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--ink-700)] mb-5 flex-1">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-[var(--paper-200)] pt-4">
                      <span className="font-display text-[var(--ink-900)] text-2xl font-semibold">
                        ${product.price}
                        {product.priceSuffix && (
                          <span className="text-sm font-normal text-[var(--ink-500)]">
                            {product.priceSuffix}
                          </span>
                        )}
                      </span>
                      <span className="eyebrow text-[10px] text-[var(--ink-400)] border border-[var(--paper-200)] px-2.5 py-1">
                        Coming soon
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Support callout */}
          <div className="mt-20 border border-[var(--paper-200)] bg-white p-8 sm:p-10 max-w-3xl mx-auto text-center">
            <span className="eyebrow text-[var(--ink-400)] text-[11px]">Coming soon</span>
            <h3 className="font-display text-[var(--ink-900)] text-2xl sm:text-3xl font-semibold mt-3 mb-4">
              Our online store is launching soon.
            </h3>
            <p className="body-lg text-[var(--ink-700)] mb-7 max-w-xl mx-auto">
              In the meantime, you can support EdLight&apos;s scholarships, learning materials, and youth
              programs through a direct contribution.
            </p>
            <Link
              href="/get-involved#donate"
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
