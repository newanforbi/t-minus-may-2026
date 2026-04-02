'use client'

import { useState } from 'react'
import { CASES, Case } from '@/data/cases'
import { COURT_COLORS, COURT_LABELS, WAVE_COLORS, WAVE_LABELS, CLAIM_COLORS } from '@/lib/utils'
import CaseModal from './CaseModal'
import { ChevronRight, Calendar } from 'lucide-react'

function CaseCard({ caseData, onClick }: { caseData: Case; onClick: () => void }) {
  const courtColor = COURT_COLORS[caseData.court]
  const waveColor = WAVE_COLORS[caseData.filingWave]

  return (
    <button
      onClick={onClick}
      className="relative text-left w-full bg-surface border border-border rounded-xl overflow-hidden card-hover group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      {/* Jurisdiction color bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: courtColor }} />

      {/* Subtle glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{ background: `radial-gradient(ellipse at 0% 50%, ${courtColor}12 0%, transparent 60%)` }}
      />

      <div className="p-5 pl-6">
        {/* Wave + Court badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="badge text-xs"
            style={{ background: waveColor + '22', color: waveColor, border: `1px solid ${waveColor}44` }}
          >
            {WAVE_LABELS[caseData.filingWave]}
          </span>
          <span
            className="badge text-xs"
            style={{ background: courtColor + '18', color: courtColor, border: `1px solid ${courtColor}35` }}
          >
            {COURT_LABELS[caseData.court]}
          </span>
        </div>

        {/* Case name */}
        <h3 className="font-bold text-white text-base leading-snug mb-1 group-hover:text-white/90 transition-colors">
          {caseData.name}
        </h3>

        {/* Filing date */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <Calendar className="w-3 h-3" />
          {caseData.filingDate}
          {caseData.feeType === 'paid' && (
            <span className="ml-1 text-emerald-500">· $405</span>
          )}
          {caseData.feeType === 'waiver' && (
            <span className="ml-1 text-amber-500">· fee waiver</span>
          )}
        </div>

        {/* Claims */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {caseData.claims.map((claim, i) => {
            const color = CLAIM_COLORS[claim.amendment] || '#94a3b8'
            return (
              <span
                key={i}
                className="badge text-xs"
                style={{ background: color + '18', color, border: `1px solid ${color}35` }}
              >
                {claim.amendment} · {claim.theory}
              </span>
            )
          })}
        </div>

        {/* Defendants */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {caseData.defendants.slice(0, 3).map((d) => (
              <span
                key={d}
                className="text-xs text-slate-500 bg-white/5 rounded px-1.5 py-0.5"
              >
                {d}
              </span>
            ))}
            {caseData.defendants.length > 3 && (
              <span className="text-xs text-slate-600 bg-white/5 rounded px-1.5 py-0.5">
                +{caseData.defendants.length - 3}
              </span>
            )}
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all shrink-0" />
        </div>

        {/* Damages callout */}
        {caseData.damages && (
          <div className="mt-3 pt-3 border-t border-border/60">
            <span className="text-xs text-emerald-400 font-medium">{caseData.damages}</span>
          </div>
        )}
      </div>
    </button>
  )
}

export default function CaseGrid() {
  const [selected, setSelected] = useState<Case | null>(null)

  return (
    <section className="section" id="cases">
      <h2 className="section-title">The Six Cases</h2>
      <p className="section-subtitle">
        Click any case for full details — legal theory, statutes, defendants, and procedural notes.
      </p>

      {/* Wave legend */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { wave: 1, label: 'Wave 1 — May 8', count: CASES.filter(c => c.filingWave === 1).length },
          { wave: 2, label: 'Wave 2 — May 22', count: CASES.filter(c => c.filingWave === 2).length },
          { wave: 'habeas', label: 'Habeas OSC — May 29', count: 1 },
        ].map(({ wave, label, count }) => (
          <div key={wave} className="flex items-center gap-2 text-sm text-slate-400">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: WAVE_COLORS[wave], boxShadow: `0 0 6px ${WAVE_COLORS[wave]}` }}
            />
            <span>{label}</span>
            <span className="text-slate-600">({count})</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CASES.map((c) => (
          <CaseCard key={c.id} caseData={c} onClick={() => setSelected(c)} />
        ))}
      </div>

      <CaseModal caseData={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
