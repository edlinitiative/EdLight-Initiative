export type AdminSectionId =
  | 'impact'
  | 'team'
  | 'testimonials'
  | 'nexus'
  | 'media'
  | 'partners'
  | 'store'
  | 'timeline'
  | 'videos'

export interface AdminSectionMeta {
  id: AdminSectionId
  file: string
  label: string
  description: string
}

export const ADMIN_SECTIONS: AdminSectionMeta[] = [
  {
    id: 'impact',
    file: 'impact.json',
    label: 'Impact Metrics',
    description: 'Update the headline statistics that appear across the site.'
  },
  {
    id: 'team',
    file: 'team.json',
    label: 'Team Members',
    description: 'Manage bios, roles, and images for the EdLight team.'
  },
  {
    id: 'testimonials',
    file: 'testimonials.json',
    label: 'Testimonials',
    description: 'Edit alumni and partner quotes displayed on program pages.'
  },
  {
    id: 'nexus',
    file: 'nexus.json',
    label: 'Nexus Opportunities',
    description: 'Curate the opportunities and deadlines featured in EdLight Nexus.'
  },
  {
    id: 'media',
    file: 'media.json',
    label: 'Media Mentions',
    description: 'Keep press coverage and publication links up to date.'
  },
  {
    id: 'partners',
    file: 'partners.json',
    label: 'Partners',
    description: 'Configure partner logos and outbound website links.'
  },
  {
    id: 'store',
    file: 'store.json',
    label: 'Store Items',
    description: 'Edit the fundraising merchandise and sponsorship packages.'
  },
  {
    id: 'timeline',
    file: 'timeline.json',
    label: 'Milestone Timeline',
    description: 'Tell the story of key moments in the organization’s history.'
  },
  {
    id: 'videos',
    file: 'videos.json',
    label: 'Video Library',
    description: 'Update embedded videos available throughout the site.'
  }
]

export const ADMIN_FILE_ALLOW_LIST = ADMIN_SECTIONS.map((section) => section.file)
