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
        'relative flex min-h-[520px] items-center justify-center overflow-hidden bg-primary py-16 sm:min-h-[560px] md:min-h-[620px]',
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(90deg, rgba(0,17,58,0.9) 0%, rgba(0,17,58,0.65) 55%, rgba(0,17,58,0.35) 100%), url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%'
            }
          : undefined
      }
    >
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-[#082463]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_15%,rgba(111,215,214,0.25),transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_88%,rgba(250,189,0,0.22),transparent_40%)]" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/75 via-transparent to-transparent" />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-white/10 p-6 text-center text-white shadow-2xl backdrop-blur-md sm:p-8 md:p-10">
          <span className="mb-5 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary-fixed">
            Empowering Potential
          </span>
          <h1 className="mb-4 animate-fade-in font-heading text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mb-6 max-w-3xl font-body text-base leading-relaxed text-primary-fixed sm:text-lg md:text-xl">
            {subtitle}
          </p>
          {children}
        </div>
      </div>
    </section>
  )
}
