import React from 'react'
import Image from 'next/image'

type Partner = { name: string; logo?: string }

/**
 * The homepage's own hero. The shared <Hero> runs every photo through a
 * duotone filter and a boxed stats strip, which reads well on inner pages
 * but flat and dashboard-like as the front door. Here the photograph keeps
 * its colour under a deep navy gradient, the headline is balanced, and the partners appear as a white wordmark row, which
 * is where a visitor looks for credibility.
 */
export default function HomeHero({
  eyebrow,
  eyebrowShort,
  title,
  subtitle,
  partnersLabel,
  partners,
  image,
  children,
}: {
  eyebrow: string
  /** The same line for phones, short enough to stay on one row. */
  eyebrowShort: string
  title: string
  subtitle: string
  partnersLabel: string
  partners: Partner[]
  image: string
  children: React.ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#001233]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: 'center 35%' }}
      />
      {/* Navy wash, heaviest behind the text, clearing to the right so the
          photo still reads; a second pass darkens the base for the partner row. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,18,51,0.94) 0%, rgba(0,27,77,0.82) 38%, rgba(0,27,77,0.35) 72%, rgba(0,27,77,0.15) 100%), linear-gradient(0deg, rgba(0,12,36,0.85) 0%, rgba(0,12,36,0) 38%)',
        }}
      />

      <div className="mx-auto flex min-h-[560px] max-w-[1200px] flex-col justify-end px-6 pb-8 pt-24 sm:min-h-[640px] lg:min-h-[min(760px,calc(100vh-4rem))] lg:px-10">
        <div className="max-w-[64rem]">
          <p className="mb-6 flex items-center gap-3 whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/75 sm:text-xs sm:tracking-[0.22em]">
            <span className="hidden h-px w-10 bg-white/50 sm:block" aria-hidden="true" />
            <span className="sm:hidden">{eyebrowShort}</span>
            <span className="hidden sm:inline">{eyebrow}</span>
          </p>
          <h1 className="text-balance text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.025em] text-white sm:text-[2.5rem] lg:text-[3.4rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-[62rem] text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
            {subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">{children}</div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
            <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
              {partnersLabel}
            </p>
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
              {partners.map((p) =>
                p.logo ? (
                  <li key={p.name} className="relative h-6 w-28 sm:h-7 sm:w-32">
                    <Image
                      src={p.logo}
                      alt={p.name}
                      fill
                      sizes="128px"
                      className="object-contain object-left opacity-80 brightness-0 invert"
                    />
                  </li>
                ) : (
                  <li key={p.name} className="text-sm font-medium text-white/80">
                    {p.name}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
