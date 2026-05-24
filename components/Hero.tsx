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
        'relative overflow-hidden',
        backgroundImage ? 'min-h-[480px] flex items-center' : '',
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
            }
          : undefined
      }
    >
      {/* Photo overlay for image heroes */}
      {backgroundImage && (
        <div className="absolute inset-0 photo-duotone" />
      )}

      {/* Solid dark hero for non-image heroes */}
      {!backgroundImage && (
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, var(--ink-deep) 0%, #0f1e4a 60%, #1a3a7a 100%)' }}
        />
      )}

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10 py-20 sm:py-28">
        <div className="max-w-2xl">
          <h1 className="display-xl mb-6 text-[var(--paper-on-dark)] leading-[1.05] animate-fade-in">
            {title}
          </h1>
          <p className="body-lg text-[var(--paper-on-dark)]/90 mb-8 max-w-[560px] leading-relaxed">
            {subtitle}
          </p>
          {children && (
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start gap-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
