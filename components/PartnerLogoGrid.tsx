import React from 'react'
import Image from 'next/image'

interface Partner {
  id: number
  name: string
  /** Omitted when we have no artwork yet — the name renders as text instead. */
  logo?: string
  /** Omitted when the partner has no working site, so we never link to a 404. */
  website?: string
}

interface PartnerLogoGridProps {
  partners: Partner[]
}

function PartnerMark({ partner }: { partner: Partner }) {
  if (partner.logo) {
    return (
      <Image
        src={partner.logo}
        alt={partner.name}
        width={160}
        height={80}
        className="object-contain max-h-full w-auto"
      />
    )
  }
  // No artwork: a wordmark keeps the cell filled and the partner credited,
  // instead of a broken image icon.
  return (
    <span className="text-center text-sm font-medium leading-tight text-[var(--ink-700)]">
      {partner.name}
    </span>
  )
}

export default function PartnerLogoGrid({ partners }: PartnerLogoGridProps) {
  return (
    <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-3 lg:grid-cols-5">
      {partners.map((partner) => {
        const inner = (
          <div className="relative flex h-20 items-center justify-center">
            <PartnerMark partner={partner} />
          </div>
        )

        // Grayscale-until-hover reads as interactive, so only linked partners
        // get it; unlinked ones stay static.
        return partner.website ? (
          <a
            key={partner.id}
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${partner.name} (opens in a new tab)`}
            className="group grayscale transition-all duration-300 hover:grayscale-0"
          >
            {inner}
          </a>
        ) : (
          <div key={partner.id}>{inner}</div>
        )
      })}
    </div>
  )
}
