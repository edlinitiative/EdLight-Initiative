import ClientMessages from '@/components/ClientMessages'

// This page is a client component, so its copy has to reach the browser.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClientMessages namespaces={['eslp', 'notify']}>{children}</ClientMessages>
}
