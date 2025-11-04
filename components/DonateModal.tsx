"use client"

import React, { useEffect } from 'react'
import { ShieldCheck, X } from 'lucide-react'

const PAYPAL_BUTTON_ID = '6AKKBQXK47EZU'
const BUTTON_CONTAINER_ID = 'paypal-donate-modal-button'

declare global {
  interface Window {
    PayPal?: {
      Donation: {
        Button: (config: {
          env: string
          hosted_button_id: string
          image: {
            src: string
            alt: string
            title: string
          }
        }) => {
          render: (selector: string) => void
        }
      }
    }
  }
}

type DonateModalProps = {
  open: boolean
  onClose: () => void
}

export default function DonateModal({ open, onClose }: DonateModalProps) {

  useEffect(() => {
    if (!open) return

    const renderPayPalButton = () => {
      if (!window.PayPal) return
      const container = document.getElementById(BUTTON_CONTAINER_ID)
      if (!container || container.childElementCount > 0) return

      window.PayPal.Donation.Button({
        env: 'production',
        hosted_button_id: PAYPAL_BUTTON_ID,
        image: {
          src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
          alt: 'Donate with PayPal button',
          title: 'PayPal - The safer, easier way to pay online!',
        },
      }).render(`#${BUTTON_CONTAINER_ID}`)
    }

    if (window.PayPal) {
      renderPayPalButton()
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-paypal-donate]')
    const script = existingScript ?? document.createElement('script')
    const handleScriptLoad = () => renderPayPalButton()

    if (!existingScript) {
      script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js'
      script.async = true
      script.charset = 'UTF-8'
      script.dataset.paypalDonate = 'true'
      script.addEventListener('load', handleScriptLoad)
      document.body.appendChild(script)
    } else if (existingScript.dataset.paypalReady === 'true') {
      renderPayPalButton()
    } else {
      existingScript.addEventListener('load', handleScriptLoad)
    }

    const markReady = () => {
      if (!script.dataset.paypalReady) {
        script.dataset.paypalReady = 'true'
      }
    }

    script.addEventListener('load', markReady)

    return () => {
      script.removeEventListener('load', handleScriptLoad)
      script.removeEventListener('load', markReady)
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" onClick={onClose} />
      <div className="relative z-[125] w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">Support EdLight</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-gray-900">Donate securely with PayPal</h2>
            <p className="mt-2 text-sm text-gray-600">
              Your contribution funds scholarships, mentorship, and technology labs for Haitian students.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-200 p-2 text-gray-500 transition hover:border-gray-300 hover:text-gray-700"
            aria-label="Close donate modal"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 via-white to-white p-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
            <ShieldCheck size={16} />
            Secure Checkout
          </div>
          <div className="mt-6 flex justify-center">
            <div id={BUTTON_CONTAINER_ID} />
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Clicking the button will open PayPal in a focused window to complete your donation.
          </p>
        </div>
      </div>
    </div>
  )
}
