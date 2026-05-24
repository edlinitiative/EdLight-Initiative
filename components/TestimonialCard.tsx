import React from 'react'
import { Quote } from 'lucide-react'

interface TestimonialCardProps {
  name: string
  role: string
  quote: string
  image: string
}

export default function TestimonialCard({ name, role, quote }: TestimonialCardProps) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <div className="bg-[var(--paper-100)] border border-[var(--paper-200)] hover:border-[var(--paper-300)] transition-colors rounded-sm p-6 sm:p-8 relative">
      <Quote className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 text-[var(--accent)] opacity-20" />
      <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--paper-200)] flex items-center justify-center flex-shrink-0 font-display font-semibold text-sm sm:text-base">
          <span aria-hidden="true">{initials}</span>
          <span className="sr-only">Initials for {name}</span>
        </div>
        <div>
          <h4 className="font-display font-semibold text-[var(--ink-900)] text-sm sm:text-base">{name}</h4>
          <p className="eyebrow text-[10px] sm:text-xs text-[var(--ink-400)] mt-0.5">{role}</p>
        </div>
      </div>
      <p className="body-lg text-[var(--ink-700)] italic leading-relaxed text-sm sm:text-base">&quot;{quote}&quot;</p>
    </div>
  )
}
