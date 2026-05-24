"use client"

import React, { useEffect, useRef, useState } from 'react'

type RevealProps = {
  children: React.ReactNode
  /** Delay before the reveal animation kicks in, in ms. */
  delay?: number
  /** Direction the content slides in from. Default: 'up'. */
  from?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** Distance the element travels during the reveal, in px. Default: 24. */
  distance?: number
  /** Duration of the reveal in ms. Default: 900. */
  duration?: number
  /** Render element. Default: 'div'. */
  as?: keyof React.JSX.IntrinsicElements
  /** Extra className applied to the wrapper. */
  className?: string
  /** Trigger only once (default) or every time the element re-enters the viewport. */
  once?: boolean
  /** rootMargin for the IntersectionObserver. Default: '0px 0px -10% 0px' so reveal fires slightly before fully visible. */
  rootMargin?: string
}

/**
 * Scroll-reveal wrapper.
 *
 * Uses IntersectionObserver to fade + translate the contents into place the
 * first time they enter the viewport. Respects `prefers-reduced-motion` and
 * gracefully renders as visible when JS is disabled or IO is unsupported.
 *
 * Inspired by the on-scroll reveals on code.edlight.org — quiet, slow, and
 * editorial rather than bouncy.
 */
export default function Reveal({
  children,
  delay = 0,
  from = 'up',
  distance = 24,
  duration = 900,
  as = 'div',
  className = '',
  once = true,
  rootMargin = '0px 0px -10% 0px',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { rootMargin, threshold: 0.05 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, rootMargin])

  const getOffset = () => {
    if (visible || reduced || from === 'none') return 'translate3d(0,0,0)'
    switch (from) {
      case 'down':
        return `translate3d(0, -${distance}px, 0)`
      case 'left':
        return `translate3d(-${distance}px, 0, 0)`
      case 'right':
        return `translate3d(${distance}px, 0, 0)`
      case 'up':
      default:
        return `translate3d(0, ${distance}px, 0)`
    }
  }

  const Tag = as as React.ElementType

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={className}
      style={{
        opacity: visible || reduced ? 1 : 0,
        transform: getOffset(),
        transition: reduced
          ? 'none'
          : `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  )
}
