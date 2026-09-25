'use client'

import React, { useId, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export type AudienceItem = {
  title: string
  body: string
  cta: string
  href: string
}

export type Audience = {
  key: string
  label: string
  items: AudienceItem[]
}

/**
 * The homepage's "I am a…" selector: pick who you are, see what EdLight has
 * for you, with a link straight to each programme's own page.
 *
 * Every panel is rendered and only the unselected ones are `hidden`, so the
 * links to all four programmes are in the server HTML for crawlers and for
 * anyone without JavaScript. The strings arrive as props from the server
 * component, so this ships no translation catalogue of its own.
 */
export default function AudiencePaths({
  label,
  hint,
  audiences,
}: {
  label: string
  hint: string
  audiences: Audience[]
}) {
  const [active, setActive] = useState(audiences[0]?.key)
  const baseId = useId()

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + audiences.length) % audiences.length
    setActive(audiences[next].key)
    document.getElementById(`${baseId}-tab-${audiences[next].key}`)?.focus()
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <p className="text-sm font-semibold text-[var(--ink-900)] shrink-0">{label}</p>
        <div
          role="tablist"
          aria-label={label}
          className="flex flex-wrap gap-2 md:flex-nowrap"
        >
          {audiences.map((audience, index) => {
            const selected = audience.key === active
            return (
              <button
                key={audience.key}
                id={`${baseId}-tab-${audience.key}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${audience.key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(audience.key)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={
                  selected
                    ? 'whitespace-nowrap rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white md:px-3.5 md:text-[13px] lg:px-4 lg:text-sm'
                    : 'whitespace-nowrap rounded-full border border-[var(--paper-300)] bg-white px-4 py-2 text-sm font-medium text-[var(--ink-700)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:px-3.5 md:text-[13px] lg:px-4 lg:text-sm'
                }
              >
                {audience.label}
              </button>
            )
          })}
        </div>
      </div>
      <p className="mt-3 text-xs text-[var(--ink-700)]">{hint}</p>

      {audiences.map((audience) => (
        <div
          key={audience.key}
          id={`${baseId}-panel-${audience.key}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${audience.key}`}
          hidden={audience.key !== active}
          className="mt-5"
        >
          <ul className="grid gap-px overflow-hidden border border-[var(--paper-200)] bg-[var(--paper-200)] sm:grid-cols-2 lg:grid-cols-3">
            {audience.items.map((item) => (
              <li key={item.title} className="bg-white">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col p-5 transition-colors hover:bg-[var(--paper-50)]"
                >
                  <span className="text-base font-semibold text-[var(--ink-900)]">{item.title}</span>
                  <span className="mt-1.5 flex-1 text-sm leading-relaxed text-[var(--ink-700)]">{item.body}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
                    {item.cta}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
