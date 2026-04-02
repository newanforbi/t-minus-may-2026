'use client'

import { useEffect } from 'react'
import { Case } from '@/data/cases'
import { COURT_COLORS, COURT_LABELS, WAVE_COLORS, WAVE_LABELS, CLAIM_COLORS } from '@/lib/utils'
import { X, Scale, Calendar, DollarSign, FileText, Gavel, AlertCircle } from 'lucide-react'

interface Props {
  caseData: Case | null
  onClose: () => void
}

export default function CaseModal({ caseData, onClose }: Props) {
  useEffect(() => {
    if (!caseData) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [caseData, onClose])

  if (!caseData) return null

  const courtColor = COURT_COLORS[caseData.court]
  const waveColor = WAVE_COLORS[caseData.filingWave]

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Drawer */}
      <div
        className="relative w-full max-w-2xl h-full bg-surface border-l border-border overflow-y-auto"
        style={{ boxShadow: `-20px 0 60px rgba(0,0,0,0.5)` }}
      >
        {/* Header bar */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-surface"
          style={{ borderTopColor: courtColor, borderTopWidth: 3 }}
        >
          <div className="flex items-center gap-3">
            <Scale className="w-4 h-4" style={{ color: courtColor }} />
            <span className="text-sm font-medium text-slate-300">Case Detail</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-8 space-y-8">
          {/* Case name */}
          <div>
            <h2 className="text-2xl font-bold text-white font-display mb-3">{caseData.name}</h2>
            <div className="flex flex-wrap gap-2">
              <span
                className="badge"
                style={{ background: courtColor + '22', color: courtColor, borderColor: courtColor + '44', border: '1px solid' }}
              >
                {COURT_LABELS[caseData.court]}
              </span>
              <span
                className="badge"
                style={{ background: waveColor + '22', color: waveColor, borderColor: waveColor + '44', border: '1px solid' }}
              >
                {WAVE_LABELS[caseData.filingWave]}
              </span>
              {caseData.feeType === 'paid' && (
                <span className="badge bg-emerald-900/30 text-emerald-400 border border-emerald-800/40">
                  Fee Paid · ${caseData.feePaid}
                </span>
              )}
              {caseData.feeType === 'waiver' && (
                <span className="badge bg-amber-900/30 text-amber-400 border border-amber-800/40">
                  Fee Waiver
                </span>
              )}
            </div>
          </div>

          {/* Summary */}
          <Section icon={FileText} title="Case Summary">
            <p className="text-slate-300 text-sm leading-relaxed">{caseData.summary}</p>
          </Section>

          {/* Claims */}
          <Section icon={Scale} title="Constitutional Claims & Legal Theories">
            <div className="space-y-2">
              {caseData.claims.map((claim, i) => {
                const color = CLAIM_COLORS[claim.amendment] || '#94a3b8'
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg border"
                    style={{ borderColor: color + '33', background: color + '0d' }}
                  >
                    <span
                      className="badge mt-0.5 shrink-0"
                      style={{ background: color + '22', color, border: `1px solid ${color}44` }}
                    >
                      {claim.amendment}
                    </span>
                    <span className="text-sm text-slate-300">{claim.theory}</span>
                  </div>
                )
              })}
            </div>
          </Section>

          {/* Legal Basis */}
          <Section icon={Gavel} title="Statutes & Legal Authority">
            <ul className="space-y-1.5">
              {caseData.legalBasis.map((basis, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-slate-600 mt-0.5 shrink-0">›</span>
                  <code className="font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded text-slate-300">{basis}</code>
                </li>
              ))}
            </ul>
          </Section>

          {/* Defendants */}
          <Section icon={Users2} title="Named Defendants">
            <div className="flex flex-wrap gap-2">
              {caseData.defendants.map((d) => (
                <span
                  key={d}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-border text-sm text-slate-300 font-medium"
                >
                  {d}
                </span>
              ))}
            </div>
          </Section>

          {/* Damages */}
          {caseData.damages && (
            <Section icon={DollarSign} title="Damages">
              <p className="text-sm text-emerald-400 font-medium">{caseData.damages}</p>
            </Section>
          )}

          {/* Procedural notes */}
          <Section icon={AlertCircle} title="Procedural Notes">
            <ul className="space-y-2">
              {caseData.procedural.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-slate-600 mt-0.5 shrink-0">·</span>
                  {note}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-slate-500" />
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function Users2({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}
