import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface CardProps {
  title: string
  description: string
  icon?: React.ReactNode
  href?: string
  image?: string
  className?: string
  children?: React.ReactNode
}

export default function Card({ title, description, icon, href, image, className, children }: CardProps) {
  const content = (
    <>
      {image && (
        <div className="relative h-44 sm:h-48 overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
        </div>
      )}
      <div className="p-5 sm:p-6">
        {icon && <div className="mb-4 text-[var(--accent)]">{icon}</div>}
        <h3 className="font-display text-base sm:text-lg font-semibold text-[var(--ink-900)] mb-2 leading-snug">{title}</h3>
        <p className="text-sm leading-relaxed text-[var(--ink-700)] mb-3">{description}</p>
        {children}
      </div>
    </>
  )

  const baseClasses = cn(
    'block bg-[var(--paper-100)] border border-[var(--paper-200)] transition-colors duration-150 hover:border-[var(--paper-300)] hover:bg-[var(--paper-50)]',
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    )
  }

  return <div className={baseClasses}>{content}</div>
}
