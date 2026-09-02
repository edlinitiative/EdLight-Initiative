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
  const [isVisible, setIsVisible] = useState(false)
  const [displayValues, setDisplayValues] = useState<number[]>(counters.map(() => 0))
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          counters.forEach((counter, index) => {
            animateCounter(counter.value, 2000, (value) => {
              setDisplayValues((prev) => {
                const newValues = [...prev]
                newValues[index] = value
                return newValues
              })
            })
          })
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [counters, isVisible])

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
            {formatNumber(displayValues[index])}
            {/* `??`, not `||`. With `||`, a counter that deliberately passes
                suffix: '' — an exact count, like our three partner
                organisations — fell through to '+' and rendered "3+",
                inflating a number we can name every one of. */}
            {counter.suffix ?? '+'}
          </div>
          <div className="eyebrow text-[10px] sm:text-[11px] text-[var(--ink-700)] mt-1">{counter.label}</div>
        </div>
      ))}
    </div>
  )
}
