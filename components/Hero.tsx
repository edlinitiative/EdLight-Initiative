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
        'relative min-h-[450px] sm:min-h-[500px] md:min-h-[550px] flex items-center justify-center overflow-hidden py-12 sm:py-16',
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(2, 6, 23, 0.35), rgba(2, 6, 23, 0.55)), url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
            }
          : undefined
      }
    >
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-[#0C54A6] to-[#0B4B9C]">
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.85),transparent_55%)]" />
        </div>
      )}
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center text-white glass-strong rounded-2xl p-5 sm:p-6 md:p-8">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 animate-fade-in leading-tight">
            {title}
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl lg:text-2xl mb-5 sm:mb-6 max-w-3xl mx-auto opacity-90 leading-relaxed">
            {subtitle}
          </p>
          {children}
        </div>
      </div>
    </section>
  )
}
