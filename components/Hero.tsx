import React from 'react'
import { cn } from '@/lib/utils'

interface HeroProps {
  title: string
  subtitle: string
  backgroundImage?: string
  children?: React.ReactNode
  className?: string
}

export default function Hero({ title, subtitle, backgroundImage, children, className }: HeroProps) {
  return (
    <section
      className={cn(
        'relative min-h-[500px] flex items-center justify-center overflow-hidden',
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(30, 41, 59, 0.7), rgba(30, 41, 59, 0.7)), url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]" />
        </div>
      )}
      <div className="container relative z-10 text-center text-white px-4">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
          {title}
        </h1>
        <p className="font-body text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          {subtitle}
        </p>
        {children}
      </div>
    </section>
  )
}
