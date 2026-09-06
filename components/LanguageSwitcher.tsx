'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'

import { LOCALES, LOCALE_NAMES, type Locale } from '@/i18n/config'

/**
 * Language switcher.
 *
 * The url is the same in both languages, so there is nothing to navigate to —
 * the choice is a cookie that middleware reads on the next request. Setting it
 * therefore has to be followed by a full reload rather than router.refresh(),
 * because middleware runs before rendering and a soft refresh would re-request
 * the page the server already decided on.
 */
export default function LanguageSwitcher({ className }: { className?: string }) {
  const active = useLocale() as Locale
  const t = useTranslations('common')
  const [pending, startTransition] = useTransition()

  function choose(locale: Locale) {
    if (locale === active) return
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`
    startTransition(() => window.location.reload())
  }

  return (
    <div className={className} role="group" aria-label={t('language')}>
      {LOCALES.map((locale, i) => (
        <span key={locale}>
          {i > 0 && <span aria-hidden="true" className="px-1.5 opacity-40">/</span>}
          <button
            type="button"
            onClick={() => choose(locale)}
            disabled={pending}
            aria-current={locale === active ? 'true' : undefined}
            className={
              locale === active
                ? 'font-semibold underline underline-offset-4'
                : 'opacity-70 hover:opacity-100 underline-offset-4 hover:underline'
            }
          >
            {LOCALE_NAMES[locale]}
          </button>
        </span>
      ))}
    </div>
  )
}
