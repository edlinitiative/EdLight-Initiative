/**
 * The organisation's social profiles — one list, used everywhere.
 *
 * There used to be two. The footer linked facebook.com/edlinitiative and
 * instagram.com/edlinitiative; /contact linked facebook.com/edlightinitiative
 * and instagram.com/edlightinitiative, and omitted YouTube entirely. Two
 * divergent sets of handles for the same organisation meant at least one set
 * was dead, and the Ad Grants website policy fails a site for broken links.
 * These are the handles the footer has been shipping, which are the ones the
 * accounts actually use.
 *
 * Keep this as the only place any social URL is written down. If a handle
 * changes, it changes here and both the footer and the contact page follow.
 */
export type SocialPlatform = 'facebook' | 'x' | 'instagram' | 'youtube' | 'linkedin'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  href: string
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { platform: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/edlinitiative' },
  { platform: 'x', label: 'X (formerly Twitter)', href: 'https://x.com/edlinitiative' },
  { platform: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/edlinitiative/' },
  { platform: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@edlight-initiative' },
  { platform: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/edlight-initiative/' },
] as const

/** The `sameAs` array for Organization JSON-LD. */
export const SOCIAL_URLS = SOCIAL_LINKS.map((link) => link.href)
