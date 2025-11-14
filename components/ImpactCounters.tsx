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
    <div ref={sectionRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {counters.map((counter, index) => (
        <div key={index} className="text-center">
          <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
            {formatNumber(displayValues[index])}
            {counter.suffix || '+'}
          </div>
          <div className="font-body text-gray-600 text-sm sm:text-base">{counter.label}</div>
        </div>
      ))}
    </div>
  )
}
