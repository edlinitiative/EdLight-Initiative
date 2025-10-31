import React from 'react'
import Image from 'next/image'

interface Partner {
  id: number
  name: string
  logo: string
  website?: string
}

interface PartnerLogoGridProps {
  partners: Partner[]
}

export default function PartnerLogoGrid({ partners }: PartnerLogoGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
      {partners.map((partner) => (
        <a
          key={partner.id}
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
        >
          <Image
            src={partner.logo}
            alt={partner.name}
            width={120}
            height={60}
            className="object-contain max-h-full w-auto"
          />
        </a>
      ))}
    </div>
  )
}
