import React from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export default function SectionHeader({
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-8 sm:mb-12', centered && 'text-center', className)}>
      <h2 className="display-lg text-[var(--ink-900)] mb-3 leading-tight">{title}</h2>
      {subtitle && (
        <p className={cn('body-lg text-[var(--ink-700)]', centered ? 'max-w-2xl mx-auto' : 'max-w-2xl')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
