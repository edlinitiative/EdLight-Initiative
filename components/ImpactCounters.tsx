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

  return (
    <div ref={sectionRef} className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--paper-200)]">
      {counters.map((counter, index) => (
        <div key={index} className="bg-[var(--paper-50)] px-4 py-6 sm:py-8 text-center">
          <div className="numeral text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--accent)] mb-1">
            {formatNumber(displayValues[index])}
            {counter.suffix || '+'}
          </div>
          <div className="eyebrow text-[9px] sm:text-[10px] text-[var(--ink-700)] mt-1">{counter.label}</div>
        </div>
      ))}
    </div>
  )
}
