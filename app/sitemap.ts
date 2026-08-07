import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL
  const lastModified = new Date()

  return [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/academy`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/code`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/labs`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/nexus`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/eslp`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/courses`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/global-exchange`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/mission_projects`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/get-involved`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/donate`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/terms-of-use`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
  ]
}
