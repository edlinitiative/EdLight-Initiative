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
        <div className="relative h-44 sm:h-48 overflow-hidden rounded-t-2xl">
          <Image src={image} alt={title} fill className="object-cover" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" />
        </div>
      )}
      <div className="p-5 sm:p-6">
        {icon && <div className="mb-3 sm:mb-4 text-primary">{icon}</div>}
        <h3 className="font-heading text-lg sm:text-xl font-semibold text-text mb-2 sm:mb-3 leading-tight">{title}</h3>
        <p className="font-body text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">{description}</p>
        {children}
      </div>
    </>
  )

  const baseClasses = cn(
    'glass rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
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
