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
        <div className="relative h-44 overflow-hidden rounded-t-3xl sm:h-48">
          <Image src={image} alt={title} fill className="object-cover" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" />
        </div>
      )}
      <div className="p-6 sm:p-7">
        {icon && <div className="mb-4 text-secondary">{icon}</div>}
        <h3 className="mb-3 font-heading text-xl font-bold leading-tight text-primary sm:text-2xl">{title}</h3>
        <p className="mb-4 font-body text-sm leading-relaxed text-on-surface-variant sm:text-base">{description}</p>
        {children}
      </div>
    </>
  )

  const baseClasses = cn(
    'group rounded-3xl border border-outline/20 bg-surface-container-lowest shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
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
