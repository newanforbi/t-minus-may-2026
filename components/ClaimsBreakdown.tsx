'use client'

import { useState } from 'react'
import { CASES } from '@/data/cases'
import { CLAIM_COLORS } from '@/lib/utils'

interface ClaimEntry {
  amendment: string
  theory: string
  cases: string[]
}

function buildClaims(): ClaimEntry[] {
  const map = new Map<string, ClaimEntry>()
  CASES.forEach((c) => {
    c.claims.forEach((claim) => {
      const key = `${claim.amendment}::${claim.theory}`
      if (map.has(key)) {
        map.get(key)!.cases.push(c.id)
      } else {
        map.set(key, { amendment: claim.amendment, theory: claim.theory, cases: [c.id] })
      }
    })
  })
  return Array.from(map.values()).sort((a, b) => b.cases.length - a.cases.length)
}

const ALL_CLAIMS = buildClaims()
const AMENDMENTS = ['All', ...Array.from(new Set(ALL_CLAIMS.map((c) => c.amendment)))]

const CASE_LABELS: Record<string, string> = {
  dodd: 'v. Dodd',
  macomber: 'v. Macomber',
  urrea: 'v. Urrea',
  candelaria: 'v. Candelaria',
  rojo: 'v. Rojo',
  habeas: 'In re',
}

export default function ClaimsBreakdown() {
  const [filter, setFilter] = useState('All')

  const visible = filter === 'All' ? ALL_CLAIMS : ALL_CLAIMS.filter((c) => c.amendment === filter)

  return (
    <section className="section" id="claims">
      <h2 className="section-title">Legal Claims Breakdown</h2>
      <p className="section-subtitle">
        Every constitutional and statutory theory across all six cases · Filter by amendment
      </p>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {AMENDMENTS.map((a) => {
          const color = a === 'All' ? '#94a3b8' : CLAIM_COLORS[a] || '#94a3b8'
          const active = filter === a
          return (
            <button
              key={a}
              onClick={() => setFilter(a)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150"
              style={{
                background: active ? color + '30' : 'transparent',
                color: active ? color : '#64748b',
                border: `1px solid ${active ? color + '70' : '#1f2937'}`,
              }}
            >
              {a}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {visible.map((claim) => {
          const color = CLAIM_COLORS[claim.amendment] || '#94a3b8'
          return (
            <div
              key={`${claim.amendment}-${claim.theory}`}
              className="rounded-xl border border-border bg-surface p-4"
              style={{ borderLeftColor: color, borderLeftWidth: 3 }}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span
                  className="badge text-xs"
                  style={{
                    background: color + '20',
                    color,
                    border: `1px solid ${color}40`,
                  }}
                >
                  {claim.amendment} Amend.
                </span>
                <span className="text-xs text-slate-500 shrink-0">
                  {claim.cases.length} case{claim.cases.length !== 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-sm font-medium text-white leading-snug mb-3">{claim.theory}</p>
              <div className="flex flex-wrap gap-1">
                {claim.cases.map((caseId) => (
                  <span
                    key={caseId}
                    className="text-xs px-1.5 py-0.5 rounded bg-white/5 border border-border text-slate-400"
                  >
                    {CASE_LABELS[caseId]}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary stats */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {AMENDMENTS.slice(1).map((a) => {
          const color = CLAIM_COLORS[a] || '#94a3b8'
          const count = ALL_CLAIMS.filter((c) => c.amendment === a).length
          return (
            <div
              key={a}
              className="rounded-lg border border-border bg-surface p-3 text-center"
              style={{ borderTopColor: color, borderTopWidth: 2 }}
            >
              <p className="text-2xl font-bold font-mono" style={{ color }}>{count}</p>
              <p className="text-xs text-slate-500 mt-0.5">{a} claims</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
