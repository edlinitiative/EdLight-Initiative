import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/**
 * Only pages we want indexed, each with a date that means something.
 *
 * Two things were wrong here. `/labs` and `/nexus` were listed — Labs sells
 * commercial web services, and Nexus has no cohort, dates, or application, so
 * neither belongs in a nonprofit site's index; both are now noindexed, and a
 * sitemap entry for a noindexed page is a contradiction a crawler has to
 * resolve. And every URL carried `lastModified: new Date()`, which told
 * Google that all fourteen pages changed on every deploy. A sitemap that
 * claims everything is always fresh conveys nothing, so the dates below are
 * set by hand when a page's content actually changes.
 */
const LAST_CONTENT_REVIEW = '2026-09-02'

type Entry = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
  lastModified?: string
}

const entries: Entry[] = [
  { path: '', changeFrequency: 'monthly', priority: 1 },
  { path: '/academy', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/code', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/coursera-scholars', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/eslp', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/get-involved', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/donate', changeFrequency: 'yearly', priority: 0.9 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/faq', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-of-use', changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map(({ path, changeFrequency, priority, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastModified ?? LAST_CONTENT_REVIEW,
    changeFrequency,
    priority,
  }))
}
