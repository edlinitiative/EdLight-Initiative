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
    <div className="bg-white rounded-xl shadow-md p-8 relative">
      <Quote className="absolute top-4 right-4 w-8 h-8 text-primary opacity-20" />
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-heading font-semibold text-text">{name}</h4>
          <p className="font-body text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <p className="font-body text-gray-700 italic leading-relaxed">&quot;{quote}&quot;</p>
    </div>
  )
}
