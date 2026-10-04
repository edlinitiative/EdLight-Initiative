'use client'

import { HONEYPOT_FIELD } from '@/lib/honeypot'

interface HoneypotFieldProps {
  value: string
  onChange: (value: string) => void
}

/**
 * The hidden bot trap from lib/honeypot.ts. Off-screen rather than
 * display:none, because some bots skip fields that are not rendered.
 */
export default function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
      <label>
        Leave this field empty
        <input
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  )
}
