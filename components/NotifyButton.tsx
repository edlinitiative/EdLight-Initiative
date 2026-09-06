'use client'

import React, { useState } from 'react'
import { Bell } from 'lucide-react'
import NotifyModal from '@/components/NotifyModal'

interface NotifyButtonProps {
  /** Which list this joins, e.g. "EdLight Scholars". Shown in the modal. */
  cycleLabel: string
  children: React.ReactNode
  className?: string
}

/**
 * A button that opens the notify modal, so a server-rendered page can offer
 * the signup without becoming a client component itself.
 *
 * /coursera-scholars needed this. Its call to action was "Apply now", linking
 * to https://apply.edlight.org/coursera-scholars — which is not a Scholars
 * application form but a general portal landing page, so the primary CTA on
 * the page led nowhere in particular. The Ad Grants website policy fails a
 * site for exactly that. Until there is a real form to point at, the honest
 * CTA is a list that tells people when there is one.
 */
export default function NotifyButton({ cycleLabel, children, className }: NotifyButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <Bell size={16} />
        {children}
      </button>
      <NotifyModal open={open} onClose={() => setOpen(false)} cycleLabel={cycleLabel} />
    </>
  )
}
