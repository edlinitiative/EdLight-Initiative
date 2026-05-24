import React from 'react'
import { cn } from '@/lib/utils'

interface HeroMetaItem {
  label: string
  value: string
}

interface HeroProps {
  title: string
  subtitle: string
  /** Small uppercase label rendered above the headline, e.g. "Initiative · Est. 2020" */
  eyebrow?: string
  backgroundImage?: string
  /** Optional metadata strip rendered below the CTAs */
  meta?: HeroMetaItem[]
  children?: React.ReactNode
  className?: string
}

export default function Hero({
  title,
  subtitle,
  eyebrow,
  backgroundImage,
  meta,
  children,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-white/10',
        backgroundImage
          ? 'min-h-[520px] sm:min-h-[600px] flex items-stretch'
          : 'flex items-stretch',
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
            }
          : { background: 'var(--ink-deep)' }
      }
    >
      {/* Image hero: editorial duotone + readability scrim weighted to the left */}
      {backgroundImage && (
        <>
          <div className="absolute inset-0 photo-duotone" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(13,11,9,0.85) 0%, rgba(13,11,9,0.65) 45%, rgba(13,11,9,0.25) 100%)',
            }}
          />
        </>
      )}

      {/* Non-image: deep ink + subtle accent radial + grain */}
      {!backgroundImage && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 85% 30%, rgba(30,66,159,0.35) 0%, transparent 55%), linear-gradient(135deg, var(--ink-deep) 0%, #0a1530 70%, #0f1e4a 100%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(rgba(232,226,212,0.6) 1px, transparent 1px)',
              backgroundSize: '3px 3px',
            }}
          />
        </>
      )}

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10 py-16 sm:py-24 lg:py-28 w-full flex flex-col justify-end">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="flex items-center gap-3 mb-5 sm:mb-7 animate-fade-in">
              <span className="h-px w-8 bg-white/40" aria-hidden="true" />
              <span className="eyebrow text-white/85 text-[11px] sm:text-xs">
                {eyebrow}
              </span>
            </div>
          )}

          <h1
            className="display-xl mb-5 sm:mb-6 text-white leading-[1.04] animate-fade-in"
            style={{ textShadow: '0 1px 24px rgba(0,0,0,0.35)' }}
          >
            {title}
          </h1>

          <p
            className="body-lg text-white/95 mb-8 sm:mb-10 max-w-[620px] leading-relaxed text-base sm:text-lg"
            style={{ textShadow: '0 1px 16px rgba(0,0,0,0.4)' }}
          >
            {subtitle}
          </p>

          {children && (
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              {children}
            </div>
          )}

          {meta && meta.length > 0 && (
            <dl className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/10 border-t border-white/15 max-w-3xl">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="px-4 py-4 sm:px-5 sm:py-5"
                  style={{ background: 'rgba(13,11,9,0.55)' }}
                >
                  <dt className="eyebrow text-white/85 text-[10px] mb-1">{item.label}</dt>
                  <dd className="numeral text-white text-lg sm:text-xl font-semibold">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  )
}
