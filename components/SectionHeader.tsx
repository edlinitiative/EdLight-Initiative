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
    <div className={cn('mb-10 sm:mb-12 md:mb-14', centered && 'text-center', className)}>
      <h2 className="mb-4 font-heading text-3xl font-black leading-tight tracking-tight text-primary sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className={cn('mb-4 h-1.5 w-20 rounded-full bg-tertiary-fixed-dim', centered && 'mx-auto')} />
      {subtitle && (
        <p
          className={cn(
            'font-body text-base leading-relaxed text-on-surface-variant sm:text-lg',
            centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
