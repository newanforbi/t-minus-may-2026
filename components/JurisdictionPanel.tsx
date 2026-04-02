'use client'

import { CASES } from '@/data/cases'
import { COURT_COLORS, COURT_LABELS, WAVE_COLORS, CLAIM_COLORS } from '@/lib/utils'
import { Building2, Scale } from 'lucide-react'

const COURTS = [
  {
    id: 'edca' as const,
    fullName: 'U.S. District Court',
    subName: 'Eastern District of California',
    address: '501 I Street, Room 4-200\nSacramento, CA 95814',
    type: 'Federal',
  },
  {
    id: 'sacramento' as const,
    fullName: 'Sacramento County',
    subName: 'Superior Court',
    address: '500 G Street, 2nd Floor\nSacramento, CA 95814',
    type: 'State (new location Apr 13, 2026)',
  },
  {
    id: 'santa-clara' as const,
    fullName: 'Santa Clara County',
    subName: 'Superior Court',
    address: '191 North First Street\nSan Jose, CA 95113',
    type: 'State',
  },
]

export default function JurisdictionPanel() {
  return (
    <section className="section" id="jurisdictions">
      <h2 className="section-title">Courts & Jurisdictions</h2>
      <p className="section-subtitle">
        Three simultaneous fronts — federal and state — designed to fragment the defense.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COURTS.map((court) => {
          const color = COURT_COLORS[court.id]
          const cases = CASES.filter((c) => c.court === court.id)

          return (
            <div
              key={court.id}
              className="rounded-xl border border-border bg-surface overflow-hidden"
              style={{ borderTopColor: color, borderTopWidth: 3 }}
            >
              {/* Court header */}
              <div className="p-5 border-b border-border">
                <div className="flex items-start gap-3">
                  <div
                    className="mt-0.5 p-2 rounded-lg"
                    style={{ background: color + '18' }}
                  >
                    <Building2 className="w-4 h-4" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color }}>
                      {court.type}
                    </p>
                    <h3 className="font-bold text-white text-base leading-tight">{court.fullName}</h3>
                    <p className="text-slate-400 text-sm">{court.subName}</p>
                  </div>
                </div>
                <div className="mt-3 pl-11">
                  <p className="text-xs text-slate-500 whitespace-pre-line font-mono">{court.address}</p>
                </div>
              </div>

              {/* Cases in this court */}
              <div className="p-4 space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  {cases.length} Case{cases.length !== 1 ? 's' : ''}
                </p>
                {cases.map((c) => {
                  const waveColor = WAVE_COLORS[c.filingWave]
                  return (
                    <div
                      key={c.id}
                      className="flex items-start gap-2.5 p-3 rounded-lg border border-border/60 bg-white/[0.02]"
                    >
                      <Scale className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color }} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{c.name}</p>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span
                            className="badge text-xs"
                            style={{
                              background: waveColor + '20',
                              color: waveColor,
                              border: `1px solid ${waveColor}40`,
                            }}
                          >
                            {c.filingDate}
                          </span>
                          {c.claims.slice(0, 1).map((claim, i) => {
                            const claimColor = CLAIM_COLORS[claim.amendment] || '#94a3b8'
                            return (
                              <span
                                key={i}
                                className="badge text-xs"
                                style={{
                                  background: claimColor + '18',
                                  color: claimColor,
                                  border: `1px solid ${claimColor}30`,
                                }}
                              >
                                {claim.amendment}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Fee total */}
              <div className="px-4 pb-4">
                <div
                  className="text-xs text-slate-500 font-mono px-3 py-2 rounded-lg"
                  style={{ background: color + '0a', border: `1px solid ${color}20` }}
                >
                  Fees:{' '}
                  <span style={{ color }} className="font-semibold">
                    {court.id === 'edca'
                      ? `$${cases.filter(c => c.feeType === 'paid').length * 405} total`
                      : court.id === 'sacramento'
                      ? '$435 (fee waiver filed)'
                      : 'No fee (habeas)'}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
