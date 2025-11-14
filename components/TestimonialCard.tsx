import React from 'react'
import Image from 'next/image'
import { Quote } from 'lucide-react'

interface TestimonialCardProps {
  name: string
  role: string
  quote: string
  image: string
}

export default function TestimonialCard({ name, role, quote, image }: TestimonialCardProps) {
  return (
    <div className="glass rounded-2xl p-6 sm:p-8 relative">
      <Quote className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 text-primary opacity-30" />
      <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-white/30 flex-shrink-0">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-heading font-semibold text-text text-base sm:text-lg">{name}</h4>
          <p className="font-body text-xs sm:text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <p className="font-body text-gray-700 italic leading-relaxed text-sm sm:text-base">&quot;{quote}&quot;</p>
    </div>
  )
}
