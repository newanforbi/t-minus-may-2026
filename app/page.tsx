import Hero from '@/components/Hero'
import Timeline from '@/components/Timeline'
import CaseGrid from '@/components/CaseGrid'
import JurisdictionPanel from '@/components/JurisdictionPanel'
import DefendantNetwork from '@/components/DefendantNetwork'
import Checklist from '@/components/Checklist'
import ServicePanel from '@/components/ServicePanel'
import ClaimsBreakdown from '@/components/ClaimsBreakdown'

const NAV_ITEMS = [
  { href: '#cases', label: 'Cases' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#jurisdictions', label: 'Courts' },
  { href: '#network', label: 'Network' },
  { href: '#checklist', label: 'Checklist' },
  { href: '#service', label: 'Service' },
  { href: '#claims', label: 'Claims' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Sticky nav */}
      <nav className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 h-12 overflow-x-auto">
            <span className="text-xs font-bold text-slate-600 mr-3 shrink-0 uppercase tracking-widest">
              T-Minus
            </span>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>
        <Hero />

        <div className="divide-y divide-border">
          <CaseGrid />
          <Timeline />
          <JurisdictionPanel />
          <DefendantNetwork />
          <Checklist />
          <ServicePanel />
          <ClaimsBreakdown />
        </div>

        {/* Footer */}
        <footer className="border-t border-border py-8 px-4 text-center">
          <p className="text-xs text-slate-600">
            T-Minus May 2026 · Litigation Operations Dashboard ·{' '}
            <span className="font-mono">newanforbi/t-minus-may-2026</span>
          </p>
        </footer>
      </main>
    </div>
  )
}
