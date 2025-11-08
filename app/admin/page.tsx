"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { ADMIN_SECTIONS, type AdminSectionId } from '@/lib/adminConfig'

interface ImpactData {
  studentsServed: number
  coursesOffered: number
  partnerOrganizations: number
  communityMembers: number
}

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  bio: string
}

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  quote: string
}

interface NexusOpportunity {
  id: number
  title: string
  type: string
  deadline: string
  description: string
  eligibility: string
}

interface MediaMention {
  id: number
  outlet: string
  title: string
  date: string
  url: string
}

interface PartnerOrg {
  id: number
  name: string
  logo: string
  website: string
}

interface StoreItem {
  id: number
  name: string
  price: number
  image: string
  description: string
}

interface TimelineEntry {
  year: number
  title: string
  description: string
}

interface VideoEntry {
  id: number
  title: string
  videoId: string
  description: string
}

type StatusTone = 'success' | 'error' | 'info'

interface StatusMessage {
  tone: StatusTone
  message: string
}

const inputClass = 'w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200'
const textareaClass = `${inputClass} min-h-[120px]`

function resolveSectionMeta(section: AdminSectionId) {
  const meta = ADMIN_SECTIONS.find((candidate) => candidate.id === section)
  if (!meta) {
    throw new Error(`Missing admin section metadata for ${section}`)
  }
  return meta
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<AdminSectionId>('impact')
  const [impactData, setImpactData] = useState<ImpactData | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[] | null>(null)
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null)
  const [opportunities, setOpportunities] = useState<NexusOpportunity[] | null>(null)
  const [mediaMentions, setMediaMentions] = useState<MediaMention[] | null>(null)
  const [partners, setPartners] = useState<PartnerOrg[] | null>(null)
  const [storeItems, setStoreItems] = useState<StoreItem[] | null>(null)
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[] | null>(null)
  const [videos, setVideos] = useState<VideoEntry[] | null>(null)
  const [status, setStatus] = useState<StatusMessage | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const activeMeta = useMemo(
    () => ADMIN_SECTIONS.find((section) => section.id === activeSection),
    [activeSection]
  )

  const statusToneClass: Record<StatusTone, string> = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    error: 'border-red-200 bg-red-50 text-red-700',
    info: 'border-sky-200 bg-sky-50 text-sky-700',
  }

  const getCurrentData = useCallback(
    (section: AdminSectionId) => {
      switch (section) {
        case 'impact':
          return impactData
        case 'team':
          return teamMembers
        case 'testimonials':
          return testimonials
        case 'nexus':
          return opportunities
        case 'media':
          return mediaMentions
        case 'partners':
          return partners
        case 'store':
          return storeItems
        case 'timeline':
          return timelineEntries
        case 'videos':
          return videos
        default:
          return null
      }
    },
    [
      impactData,
      mediaMentions,
      opportunities,
      partners,
      storeItems,
      teamMembers,
      testimonials,
      timelineEntries,
      videos,
    ]
  )

  const setSectionData = useCallback((section: AdminSectionId, payload: unknown) => {
    switch (section) {
      case 'impact':
        setImpactData((payload as ImpactData) ?? null)
        break
      case 'team':
        setTeamMembers((payload as TeamMember[]) ?? null)
        break
      case 'testimonials':
        setTestimonials((payload as Testimonial[]) ?? null)
        break
      case 'nexus':
        setOpportunities((payload as NexusOpportunity[]) ?? null)
        break
      case 'media':
        setMediaMentions((payload as MediaMention[]) ?? null)
        break
      case 'partners':
        setPartners((payload as PartnerOrg[]) ?? null)
        break
      case 'store':
        setStoreItems((payload as StoreItem[]) ?? null)
        break
      case 'timeline':
        setTimelineEntries((payload as TimelineEntry[]) ?? null)
        break
      case 'videos':
        setVideos((payload as VideoEntry[]) ?? null)
        break
    }
  }, [])

  const sectionHasData = useCallback(
    (section: AdminSectionId) => {
      const data = getCurrentData(section)
      return data !== null
    },
    [getCurrentData]
  )

  const loadSection = useCallback(
    async (
      section: AdminSectionId,
      options?: { force?: boolean; suppressStatus?: boolean }
    ) => {
      const { force = false, suppressStatus = false } = options ?? {}

      if (!force && sectionHasData(section)) {
        return
      }

      setIsLoading(true)
      if (!force && !suppressStatus) {
        setStatus(null)
      }

      try {
        const meta = resolveSectionMeta(section)
        const res = await fetch(`/api/admin/read?file=${encodeURIComponent(meta.file)}`, {
          cache: 'no-store',
        })

        if (!res.ok) {
          const { error } = await res.json()
          throw new Error(error || 'Unable to load data')
        }

        const json = await res.json()
        if (json?.data === undefined) {
          throw new Error('Malformed response from server')
        }

        setSectionData(section, json.data)
        if (!suppressStatus) {
          setStatus({ tone: 'info', message: `${meta.label} loaded.` })
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err)
        setStatus({ tone: 'error', message: message })
        setSectionData(section, null)
      } finally {
        setIsLoading(false)
      }
    },
    [sectionHasData, setSectionData]
  )

  const saveSection = useCallback(
    async (section: AdminSectionId) => {
      const data = getCurrentData(section)
      if (data == null) {
        setStatus({ tone: 'error', message: 'Load the section data before saving.' })
        return
      }

      setIsSaving(true)
      setStatus(null)

      try {
        const meta = resolveSectionMeta(section)
        const res = await fetch('/api/admin/write', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: meta.file, data }),
        })

        const json = await res.json()
        if (!res.ok || !json?.ok) {
          throw new Error(json?.error || 'Unable to save data')
        }

        await loadSection(section, { force: true, suppressStatus: true })
        setStatus({ tone: 'success', message: `${meta.label} saved successfully.` })
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err)
        setStatus({ tone: 'error', message: message })
      } finally {
        setIsSaving(false)
      }
    },
    [getCurrentData, loadSection]
  )

  useEffect(() => {
    void loadSection(activeSection)
  }, [activeSection, loadSection])

  function renderImpactEditor() {
    if (!impactData) {
      return <p className="text-sm text-gray-600">Select “Reload” to pull the latest impact metrics.</p>
    }

    const fields: Array<{ key: keyof ImpactData; label: string }> = [
      { key: 'studentsServed', label: 'Students Served' },
      { key: 'coursesOffered', label: 'Courses Offered' },
      { key: 'partnerOrganizations', label: 'Partner Organizations' },
      { key: 'communityMembers', label: 'Community Members Reached' },
    ]

    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(({ key, label }) => (
          <label key={key} className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            {label}
            <input
              type="number"
              className={inputClass}
              value={impactData[key] ?? ''}
              onChange={(event) =>
                setImpactData((prev) =>
                  prev ? { ...prev, [key]: Number(event.target.value || 0) } : prev
                )
              }
              min={0}
            />
          </label>
        ))}
      </div>
    )
  }

  function renderTeamEditor() {
    if (!teamMembers) {
      return <p className="text-sm text-gray-600">Reload to fetch current team members.</p>
    }

    return (
      <div className="space-y-6">
        {teamMembers.map((member, index) => (
          <div key={member.id ?? index} className="space-y-4 rounded border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-800">Member {index + 1}</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() =>
                  setTeamMembers((prev) =>
                    prev ? prev.filter((candidate) => candidate.id !== member.id) : prev
                  )
                }
              >
                Remove
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Full Name
                <input
                  className={inputClass}
                  value={member.name}
                  onChange={(event) =>
                    setTeamMembers((prev) => updateList(prev, index, { name: event.target.value }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Role / Title
                <input
                  className={inputClass}
                  value={member.role}
                  onChange={(event) =>
                    setTeamMembers((prev) => updateList(prev, index, { role: event.target.value }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Image Path
                <input
                  className={inputClass}
                  value={member.image}
                  onChange={(event) =>
                    setTeamMembers((prev) => updateList(prev, index, { image: event.target.value }))
                  }
                  placeholder="/team/filename.jpg"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 md:col-span-2">
                Bio
                <textarea
                  className={textareaClass}
                  value={member.bio}
                  onChange={(event) =>
                    setTeamMembers((prev) => updateList(prev, index, { bio: event.target.value }))
                  }
                />
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-light"
          onClick={() =>
            setTeamMembers((prev) => {
              const nextId = nextEntityId(prev ?? [])
              const template: TeamMember = {
                id: nextId,
                name: '',
                role: '',
                image: '',
                bio: '',
              }
              return prev ? [...prev, template] : [template]
            })
          }
        >
          Add team member
        </button>
      </div>
    )
  }

  function renderTestimonialsEditor() {
    if (!testimonials) {
      return <p className="text-sm text-gray-600">Reload to fetch the latest testimonials.</p>
    }

    return (
      <div className="space-y-6">
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.id ?? index} className="space-y-4 rounded border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-800">Testimonial {index + 1}</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() =>
                  setTestimonials((prev) =>
                    prev ? prev.filter((candidate) => candidate.id !== testimonial.id) : prev
                  )
                }
              >
                Remove
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Name
                <input
                  className={inputClass}
                  value={testimonial.name}
                  onChange={(event) =>
                    setTestimonials((prev) => updateList(prev, index, { name: event.target.value }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Role
                <input
                  className={inputClass}
                  value={testimonial.role}
                  onChange={(event) =>
                    setTestimonials((prev) => updateList(prev, index, { role: event.target.value }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Image Path
                <input
                  className={inputClass}
                  value={testimonial.image}
                  onChange={(event) =>
                    setTestimonials((prev) => updateList(prev, index, { image: event.target.value }))
                  }
                  placeholder="/gallery/filename.jpg"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 md:col-span-2">
                Quote
                <textarea
                  className={textareaClass}
                  value={testimonial.quote}
                  onChange={(event) =>
                    setTestimonials((prev) => updateList(prev, index, { quote: event.target.value }))
                  }
                />
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-light"
          onClick={() =>
            setTestimonials((prev) => {
              const nextId = nextEntityId(prev ?? [])
              const template: Testimonial = {
                id: nextId,
                name: '',
                role: '',
                image: '',
                quote: '',
              }
              return prev ? [...prev, template] : [template]
            })
          }
        >
          Add testimonial
        </button>
      </div>
    )
  }

  function renderNexusEditor() {
    if (!opportunities) {
      return <p className="text-sm text-gray-600">Reload to fetch opportunity listings.</p>
    }

    return (
      <div className="space-y-6">
        {opportunities.map((opportunity, index) => (
          <div key={opportunity.id ?? index} className="space-y-4 rounded border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-800">Opportunity {index + 1}</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() =>
                  setOpportunities((prev) =>
                    prev ? prev.filter((candidate) => candidate.id !== opportunity.id) : prev
                  )
                }
              >
                Remove
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Title
                <input
                  className={inputClass}
                  value={opportunity.title}
                  onChange={(event) =>
                    setOpportunities((prev) => updateList(prev, index, { title: event.target.value }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Type
                <input
                  className={inputClass}
                  value={opportunity.type}
                  onChange={(event) =>
                    setOpportunities((prev) => updateList(prev, index, { type: event.target.value }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Deadline
                <input
                  type="date"
                  className={inputClass}
                  value={opportunity.deadline}
                  onChange={(event) =>
                    setOpportunities((prev) => updateList(prev, index, { deadline: event.target.value }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Eligibility
                <textarea
                  className={textareaClass}
                  value={opportunity.eligibility}
                  onChange={(event) =>
                    setOpportunities((prev) =>
                      updateList(prev, index, { eligibility: event.target.value })
                    )
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 md:col-span-2">
                Description
                <textarea
                  className={textareaClass}
                  value={opportunity.description}
                  onChange={(event) =>
                    setOpportunities((prev) =>
                      updateList(prev, index, { description: event.target.value })
                    )
                  }
                />
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-light"
          onClick={() =>
            setOpportunities((prev) => {
              const nextId = nextEntityId(prev ?? [])
              const template: NexusOpportunity = {
                id: nextId,
                title: '',
                type: '',
                deadline: '',
                description: '',
                eligibility: '',
              }
              return prev ? [...prev, template] : [template]
            })
          }
        >
          Add opportunity
        </button>
      </div>
    )
  }

  function renderMediaEditor() {
    if (!mediaMentions) {
      return <p className="text-sm text-gray-600">Reload to fetch media coverage.</p>
    }

    return (
      <div className="space-y-6">
        {mediaMentions.map((mention, index) => (
          <div key={mention.id ?? index} className="space-y-4 rounded border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-800">Media mention {index + 1}</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() =>
                  setMediaMentions((prev) =>
                    prev ? prev.filter((candidate) => candidate.id !== mention.id) : prev
                  )
                }
              >
                Remove
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Outlet
                <input
                  className={inputClass}
                  value={mention.outlet}
                  onChange={(event) =>
                    setMediaMentions((prev) => updateList(prev, index, { outlet: event.target.value }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Title
                <input
                  className={inputClass}
                  value={mention.title}
                  onChange={(event) =>
                    setMediaMentions((prev) => updateList(prev, index, { title: event.target.value }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Date
                <input
                  type="date"
                  className={inputClass}
                  value={mention.date}
                  onChange={(event) =>
                    setMediaMentions((prev) => updateList(prev, index, { date: event.target.value }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Article URL
                <input
                  className={inputClass}
                  value={mention.url}
                  onChange={(event) =>
                    setMediaMentions((prev) => updateList(prev, index, { url: event.target.value }))
                  }
                  placeholder="https://example.com"
                />
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-light"
          onClick={() =>
            setMediaMentions((prev) => {
              const nextId = nextEntityId(prev ?? [])
              const template: MediaMention = {
                id: nextId,
                outlet: '',
                title: '',
                date: '',
                url: '',
              }
              return prev ? [...prev, template] : [template]
            })
          }
        >
          Add media mention
        </button>
      </div>
    )
  }

  function renderPartnersEditor() {
    if (!partners) {
      return <p className="text-sm text-gray-600">Reload to manage partner organizations.</p>
    }

    return (
      <div className="space-y-6">
        {partners.map((partner, index) => (
          <div key={partner.id ?? index} className="space-y-4 rounded border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-800">Partner {index + 1}</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() =>
                  setPartners((prev) =>
                    prev ? prev.filter((candidate) => candidate.id !== partner.id) : prev
                  )
                }
              >
                Remove
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Name
                <input
                  className={inputClass}
                  value={partner.name}
                  onChange={(event) =>
                    setPartners((prev) => updateList(prev, index, { name: event.target.value }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Logo Path
                <input
                  className={inputClass}
                  value={partner.logo}
                  onChange={(event) =>
                    setPartners((prev) => updateList(prev, index, { logo: event.target.value }))
                  }
                  placeholder="/partners/filename.png"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 md:col-span-2">
                Website URL
                <input
                  className={inputClass}
                  value={partner.website}
                  onChange={(event) =>
                    setPartners((prev) => updateList(prev, index, { website: event.target.value }))
                  }
                  placeholder="https://partner.org"
                />
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-light"
          onClick={() =>
            setPartners((prev) => {
              const nextId = nextEntityId(prev ?? [])
              const template: PartnerOrg = {
                id: nextId,
                name: '',
                logo: '',
                website: '',
              }
              return prev ? [...prev, template] : [template]
            })
          }
        >
          Add partner
        </button>
      </div>
    )
  }

  function renderStoreEditor() {
    if (!storeItems) {
      return <p className="text-sm text-gray-600">Reload to manage store items.</p>
    }

    return (
      <div className="space-y-6">
        {storeItems.map((item, index) => (
          <div key={item.id ?? index} className="space-y-4 rounded border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-800">Item {index + 1}</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() =>
                  setStoreItems((prev) =>
                    prev ? prev.filter((candidate) => candidate.id !== item.id) : prev
                  )
                }
              >
                Remove
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Name
                <input
                  className={inputClass}
                  value={item.name}
                  onChange={(event) =>
                    setStoreItems((prev) => updateList(prev, index, { name: event.target.value }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Price (USD)
                <input
                  type="number"
                  min={0}
                  className={inputClass}
                  value={item.price}
                  onChange={(event) =>
                    setStoreItems((prev) =>
                      updateList(prev, index, { price: Number(event.target.value || 0) })
                    )
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Image Path
                <input
                  className={inputClass}
                  value={item.image}
                  onChange={(event) =>
                    setStoreItems((prev) => updateList(prev, index, { image: event.target.value }))
                  }
                  placeholder="/store/filename.jpg"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 md:col-span-2">
                Description
                <textarea
                  className={textareaClass}
                  value={item.description}
                  onChange={(event) =>
                    setStoreItems((prev) =>
                      updateList(prev, index, { description: event.target.value })
                    )
                  }
                />
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-light"
          onClick={() =>
            setStoreItems((prev) => {
              const nextId = nextEntityId(prev ?? [])
              const template: StoreItem = {
                id: nextId,
                name: '',
                price: 0,
                image: '',
                description: '',
              }
              return prev ? [...prev, template] : [template]
            })
          }
        >
          Add store item
        </button>
      </div>
    )
  }

  function renderTimelineEditor() {
    if (!timelineEntries) {
      return <p className="text-sm text-gray-600">Reload to manage timeline milestones.</p>
    }

    return (
      <div className="space-y-6">
        {timelineEntries.map((entry, index) => (
          <div key={`${entry.year}-${index}`} className="space-y-4 rounded border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-800">Milestone {index + 1}</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() =>
                  setTimelineEntries((prev) =>
                    prev ? prev.filter((_, candidateIndex) => candidateIndex !== index) : prev
                  )
                }
              >
                Remove
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Year
                <input
                  type="number"
                  className={inputClass}
                  value={entry.year}
                  onChange={(event) =>
                    setTimelineEntries((prev) =>
                      updateList(prev, index, { year: Number(event.target.value || entry.year) })
                    )
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Title
                <input
                  className={inputClass}
                  value={entry.title}
                  onChange={(event) =>
                    setTimelineEntries((prev) => updateList(prev, index, { title: event.target.value }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 md:col-span-2">
                Description
                <textarea
                  className={textareaClass}
                  value={entry.description}
                  onChange={(event) =>
                    setTimelineEntries((prev) =>
                      updateList(prev, index, { description: event.target.value })
                    )
                  }
                />
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-light"
          onClick={() =>
            setTimelineEntries((prev) => {
              const template: TimelineEntry = {
                year: new Date().getFullYear(),
                title: '',
                description: '',
              }
              return prev ? [...prev, template] : [template]
            })
          }
        >
          Add milestone
        </button>
      </div>
    )
  }

  function renderVideoEditor() {
    if (!videos) {
      return <p className="text-sm text-gray-600">Reload to manage videos.</p>
    }

    return (
      <div className="space-y-6">
        {videos.map((video, index) => (
          <div key={video.id ?? index} className="space-y-4 rounded border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-800">Video {index + 1}</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() =>
                  setVideos((prev) =>
                    prev ? prev.filter((candidate) => candidate.id !== video.id) : prev
                  )
                }
              >
                Remove
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                Title
                <input
                  className={inputClass}
                  value={video.title}
                  onChange={(event) =>
                    setVideos((prev) => updateList(prev, index, { title: event.target.value }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                YouTube Video ID
                <input
                  className={inputClass}
                  value={video.videoId}
                  onChange={(event) =>
                    setVideos((prev) => updateList(prev, index, { videoId: event.target.value }))
                  }
                  placeholder="dQw4w9WgXcQ"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 md:col-span-2">
                Description
                <textarea
                  className={textareaClass}
                  value={video.description}
                  onChange={(event) =>
                    setVideos((prev) => updateList(prev, index, { description: event.target.value }))
                  }
                />
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-light"
          onClick={() =>
            setVideos((prev) => {
              const nextId = nextEntityId(prev ?? [])
              const template: VideoEntry = {
                id: nextId,
                title: '',
                videoId: '',
                description: '',
              }
              return prev ? [...prev, template] : [template]
            })
          }
        >
          Add video
        </button>
      </div>
    )
  }

  function renderSectionContent() {
    switch (activeSection) {
      case 'impact':
        return renderImpactEditor()
      case 'team':
        return renderTeamEditor()
      case 'testimonials':
        return renderTestimonialsEditor()
      case 'nexus':
        return renderNexusEditor()
      case 'media':
        return renderMediaEditor()
      case 'partners':
        return renderPartnersEditor()
      case 'store':
        return renderStoreEditor()
      case 'timeline':
        return renderTimelineEditor()
      case 'videos':
        return renderVideoEditor()
      default:
        return null
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-bold">Admin Console</h1>
        <p className="max-w-3xl text-sm text-gray-600">
          Manage the content, stats, and program information displayed across the site. Select a section
          below to load the latest data, make edits, then save to publish your changes.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {ADMIN_SECTIONS.map((section) => {
          const isActive = section.id === activeSection
          return (
            <button
              key={section.id}
              type="button"
              className={`btn ${isActive ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setActiveSection(section.id)}
              disabled={isSaving && isActive}
            >
              {section.label}
            </button>
          )
        })}
      </div>

      {activeMeta && (
        <div className="space-y-6 rounded border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{activeMeta.label}</h2>
              <p className="text-sm text-gray-600">{activeMeta.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => void loadSection(activeSection, { force: true })}
                disabled={isLoading}
              >
                {isLoading ? 'Loading…' : 'Reload'}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => void saveSection(activeSection)}
                disabled={isSaving || isLoading}
              >
                {isSaving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>

          {status && (
            <div className={`rounded border px-4 py-3 text-sm ${statusToneClass[status.tone]}`}>
              {status.message}
            </div>
          )}

          <div className="space-y-6">{renderSectionContent()}</div>
        </div>
      )}

      <p className="text-xs text-gray-500">
        Changes apply directly to the JSON files stored on the server. Save only when you’re confident the
        data is accurate.
      </p>
    </div>
  )
}

function updateList<T extends object>(
  list: T[] | null,
  index: number,
  patch: Partial<T>
): T[] | null {
  if (!list) {
    return list
  }

  const next = [...list]
  next[index] = { ...next[index], ...patch } as T
  return next
}

function nextEntityId<T extends { id?: number }>(items: T[]) {
  // Ensures newly added entries receive a unique positive id.
  const ids = items
    .map((item) => item.id ?? 0)
    .filter((value) => Number.isFinite(value)) as number[]
  const max = ids.length ? Math.max(...ids) : 0
  return max + 1
}
