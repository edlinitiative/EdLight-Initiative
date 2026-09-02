'use client'

import React, { useEffect, useRef, useState } from 'react'
import TestimonialCard from '@/components/TestimonialCard'

interface Testimonial {
  quote: string
  name: string
  role: string
  image: string
}

// Client island for the rotating student stories. Keeping the interval inside
// this small component (instead of making the whole homepage a client
// component) keeps hydration off the critical path — the rest of the page is
// static server output. Rotation only runs while the section is on screen, so
// it never repaints during the initial load that Lighthouse measures.
export default function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  const [current, setCurrent] = useState(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [inView, testimonials.length])

  return (
    <div ref={sectionRef} className="max-w-2xl mx-auto">
      <TestimonialCard {...testimonials[current]} />
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? 'bg-[var(--accent)]' : 'bg-[var(--paper-300)]'
            }`}
            aria-label={`View testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
