'use client'

import React, { useEffect, useRef, useState } from 'react'
import { formatNumber, animateCounter } from '@/lib/utils'

interface ImpactCounter {
  label: string
  value: number
  suffix?: string
}

interface ImpactCountersProps {
  counters: ImpactCounter[]
}

export default function ImpactCounters({ counters }: ImpactCountersProps) {
  // Starts at the real numbers, not 0. The server HTML is what crawlers, ad
  // reviewers and visitors without JS see, and it used to read "0 Alumni,
  // 0 % Women, 0 Editions". The count-up now only runs when the section starts
  // below the fold: it is zeroed while off-screen and animates in on scroll.
  // Already in view on load, or with reduced motion, the numbers just stay.
  const [displayValues, setDisplayValues] = useState<number[]>(() => counters.map((c) => c.value))
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const timers: ReturnType<typeof setInterval>[] = []
    let first = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false
          if (entry.isIntersecting) {
            observer.disconnect()
            return
          }
          setDisplayValues(counters.map(() => 0))
          return
        }
        if (!entry.isIntersecting) return
        observer.disconnect()
        counters.forEach((counter, index) => {
          timers.push(
            animateCounter(counter.value, 2000, (value) => {
              setDisplayValues((prev) => {
                const next = [...prev]
                next[index] = value
                return next
              })
            })
          )
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      timers.forEach(clearInterval)
      // Never leave the numbers zeroed if the effect is torn down mid-way.
      setDisplayValues(counters.map((c) => c.value))
    }
  }, [counters])

  // Layout: 2 cols on mobile, then up to 4 cols on desktop matching counter count
  const n = counters.length
  const desktopColsClass =
    n === 1 ? 'sm:grid-cols-1' :
    n === 2 ? 'sm:grid-cols-2' :
    n === 3 ? 'sm:grid-cols-3' :
    'sm:grid-cols-4'
  const mobileColsClass = n === 1 ? 'grid-cols-1' : 'grid-cols-2'

  return (
    <div
      ref={sectionRef}
      className={`grid ${mobileColsClass} ${desktopColsClass} gap-px bg-[var(--paper-200)] border border-[var(--paper-200)]`}
    >
      {counters.map((counter, index) => (
        <div key={index} className="bg-[var(--paper-50)] px-4 py-8 sm:py-10 text-center">
          <div className="numeral text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--accent)] mb-2">
            {formatNumber(displayValues[index] ?? counter.value)}
            {/* `??`, not `||`. With `||`, a counter that deliberately passes
                suffix: '' — an exact count, like our three partner
                organisations — fell through to '+' and rendered "3+",
                inflating a number we can name every one of. */}
            {counter.suffix ?? '+'}
          </div>
          <div className="eyebrow-ink text-[10px] sm:text-[11px] mt-1">{counter.label}</div>
        </div>
      ))}
    </div>
  )
}
