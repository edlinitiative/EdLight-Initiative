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
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-2">{title}</h2>
      {subtitle && (
        <p className="font-body text-lg text-gray-600/90 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
