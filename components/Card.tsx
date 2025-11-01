import React from 'react'
import Link from 'next/link'
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
        <div className="h-48 overflow-hidden rounded-t-xl">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6">
        {icon && <div className="mb-4 text-primary">{icon}</div>}
        <h3 className="font-heading text-xl font-semibold text-text mb-3">{title}</h3>
        <p className="font-body text-gray-600 mb-4">{description}</p>
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
