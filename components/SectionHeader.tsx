import React from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  eyebrow?: string
  centered?: boolean
  className?: string
}

export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-8 sm:mb-10 md:mb-12', centered && 'text-center', className)}>
      {eyebrow && (
        <p className={cn('mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/85', centered ? 'text-center' : 'text-left')}>
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-2 leading-tight">{title}</h2>
      {subtitle && (
        <p className={cn('font-body text-base sm:text-lg text-gray-600/90 leading-relaxed', centered ? 'max-w-2xl mx-auto' : 'max-w-2xl')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
