'use client'

import React, { useState, useEffect, useRef } from 'react'
import { X, Bell, Loader2, CheckCircle2 } from 'lucide-react'

interface NotifyModalProps {
  open: boolean
  onClose: () => void
  /**
   * Which cycle this list is for, e.g. "ESLP 2027".
   *
   * This used to be the hardcoded string "ESLP 2026", while every one of the
   * four buttons that opens the modal was labelled "Get notified for ESLP
   * 2027". Someone clicking through to join the 2027 list was told they had
   * joined the 2026 one — for a cohort that had already graduated. Passing
   * the label in means the button and the modal cannot drift apart again.
   */
  cycleLabel: string
}

export default function NotifyModal({ open, onClose, cycleLabel }: NotifyModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const overlayRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  // Focus the first input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => firstInputRef.current?.focus(), 100)
    }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const resetForm = () => {
    setName('')
    setEmail('')
    setPhone('')
    setStatus('idle')
    setErrorMsg('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    // Basic validation
    if (!name.trim()) {
      setErrorMsg('Please enter your name.')
      return
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch('/api/eslp-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          cycle: cycleLabel,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.message || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose()
      }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notify-modal-title"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8">
          {status === 'success' ? (
            /* ── Success state ── */
            <div className="text-center py-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re on the list!</h3>
              <p className="text-gray-600 mb-6">
                We&apos;ll notify you as soon as {cycleLabel} details are announced.
              </p>
              <button
                onClick={handleClose}
                className="btn btn-primary w-full"
              >
                Done
              </button>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              <div className="mb-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Bell size={24} className="text-primary" />
                </div>
                <h2 id="notify-modal-title" className="text-xl font-bold text-gray-900">
                  Get Notified for {cycleLabel}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Be the first to know when applications open.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="notify-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    id="notify-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jean Pierre"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    disabled={status === 'submitting'}
                  />
                </div>

                <div>
                  <label htmlFor="notify-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="notify-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    disabled={status === 'submitting'}
                  />
                </div>

                <div>
                  <label htmlFor="notify-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="notify-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    disabled={status === 'submitting'}
                  />
                </div>

                {errorMsg && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn btn-primary w-full flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      <Bell size={18} /> Notify Me
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
