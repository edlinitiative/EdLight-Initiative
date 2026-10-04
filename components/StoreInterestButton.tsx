'use client'

import React, { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Heart, Loader2, X } from 'lucide-react'
import { track } from '@/lib/analytics'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const

interface StoreInterestButtonProps {
  itemId: string
  itemName: string
  /** Apparel asks for a size so the interest list doubles as a size run. */
  needsSize?: boolean
  className?: string
  children?: React.ReactNode
}

/**
 * "I want one" for store items that cannot be bought yet. Posts to
 * /api/store-interest, which emails the inbox, so we learn which items and
 * sizes people actually want before ordering stock.
 */
export default function StoreInterestButton({
  itemId,
  itemName,
  needsSize = false,
  className,
  children,
}: StoreInterestButtonProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const overlayRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  const close = () => {
    setOpen(false)
    setStatus('idle')
    setErrorMsg('')
  }

  useEffect(() => {
    if (!open) return
    const focus = setTimeout(() => firstInputRef.current?.focus(), 100)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(focus)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (!name.trim()) return setErrorMsg('Please enter your name.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return setErrorMsg('Please enter a valid email address.')
    }
    if (needsSize && !size) return setErrorMsg('Please choose a size.')

    setStatus('submitting')
    try {
      const res = await fetch('/api/store-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: itemId, name: name.trim(), email: email.trim(), size, quantity }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.success) {
        setErrorMsg(data?.message || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('success')
      // The catalogue id only, never the visitor's details.
      track('generate_lead', { form: 'store_interest', interest: itemId })
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full border border-[var(--paper-200)] bg-white px-4 py-2.5 text-sm text-[var(--ink-900)] placeholder-[var(--ink-400)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring)] outline-none transition-colors'

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children ?? (
          <>
            <Heart size={15} />
            I want one
          </>
        )}
      </button>

      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === overlayRef.current) close()
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`interest-${itemId}-title`}
            className="relative w-full max-w-md bg-[var(--paper-50)] shadow-2xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 p-1.5 text-[var(--ink-400)] hover:text-[var(--ink-900)] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-6 sm:p-8">
              {status === 'success' ? (
                <div className="text-center py-4">
                  <CheckCircle2 size={40} className="mx-auto mb-4 text-[var(--accent)]" />
                  <h2 className="font-display text-2xl font-semibold text-[var(--ink-900)] mb-2">
                    You&apos;re on the list
                  </h2>
                  <p className="text-[var(--ink-700)] mb-6">
                    We&apos;ll email you as soon as the {itemName} can be ordered.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="w-full bg-[var(--accent)] text-white font-medium px-6 py-3 hover:bg-[var(--accent-hover)] transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-2">
                    <span className="eyebrow text-[11px] text-[var(--ink-400)]">Not available yet</span>
                    <h2
                      id={`interest-${itemId}-title`}
                      className="font-display text-2xl font-semibold text-[var(--ink-900)] mt-1"
                    >
                      {itemName}
                    </h2>
                    <p className="text-sm text-[var(--ink-700)] mt-2">
                      We&apos;ll let you know when it&apos;s available.
                    </p>
                  </div>

                  <div>
                    <label htmlFor={`interest-${itemId}-name`} className="block text-sm font-medium text-[var(--ink-700)] mb-1">
                      Full name
                    </label>
                    <input
                      ref={firstInputRef}
                      id={`interest-${itemId}-name`}
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div>
                    <label htmlFor={`interest-${itemId}-email`} className="block text-sm font-medium text-[var(--ink-700)] mb-1">
                      Email address
                    </label>
                    <input
                      id={`interest-${itemId}-email`}
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={inputClass}
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div className="flex gap-3">
                    {needsSize && (
                      <fieldset className="flex-1">
                        <legend className="block text-sm font-medium text-[var(--ink-700)] mb-1">Size</legend>
                        <div className="flex flex-wrap gap-1.5">
                          {SIZES.map((s) => (
                            <button
                              key={s}
                              type="button"
                              aria-pressed={size === s}
                              onClick={() => setSize(s)}
                              className={`min-w-[2.75rem] px-2.5 py-2 text-sm border transition-colors ${
                                size === s
                                  ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                                  : 'bg-white border-[var(--paper-200)] text-[var(--ink-700)] hover:border-[var(--ink-400)]'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    )}
                    <div className={needsSize ? 'w-20' : 'w-24'}>
                      <label htmlFor={`interest-${itemId}-qty`} className="block text-sm font-medium text-[var(--ink-700)] mb-1">
                        Qty
                      </label>
                      <input
                        id={`interest-${itemId}-qty`}
                        type="number"
                        min={1}
                        max={20}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.min(Math.max(Number(e.target.value) || 1, 1), 20))}
                        className={inputClass}
                        disabled={status === 'submitting'}
                      />
                    </div>
                  </div>

                  {errorMsg && <p className="text-sm text-red-700 bg-red-50 px-3 py-2">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-white font-medium px-6 py-3 hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-70"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Saving…
                      </>
                    ) : (
                      <>
                        <Heart size={16} /> Count me in
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
