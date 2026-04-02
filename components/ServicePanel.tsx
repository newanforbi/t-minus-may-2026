'use client'

import { useState } from 'react'
import { SERVICE_LOCATIONS } from '@/data/service'
import { MapPin, Phone, Clock, Copy, Check, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react'
import { COURT_COLORS } from '@/lib/utils'

const LOCATION_COLORS: Record<string, string> = {
  edca: '#3b82f6',
  'sacramento-superior': '#f59e0b',
  'cdcr-hq': '#3b82f6',
  'stockton-parole': '#3b82f6',
  'dmv-legal': '#f59e0b',
  'santa-clara-superior': '#10b981',
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <button
      onClick={copy}
      className="p-1 rounded text-slate-600 hover:text-slate-300 transition-colors"
      title="Copy"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

export default function ServicePanel() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set([SERVICE_LOCATIONS[0].id]))

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section className="section" id="service">
      <h2 className="section-title">Service of Process</h2>
      <p className="section-subtitle">
        Addresses, phones, and hours for every service location · Click to expand
      </p>

      <div className="space-y-3">
        {SERVICE_LOCATIONS.map((loc) => {
          const color = LOCATION_COLORS[loc.id] || '#94a3b8'
          const isExpanded = expanded.has(loc.id)
          const fullAddress = `${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}`

          return (
            <div
              key={loc.id}
              className="rounded-xl border border-border bg-surface overflow-hidden"
            >
              <button
                className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                onClick={() => toggle(loc.id)}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{loc.name}</p>
                  <p className="text-xs text-slate-500 truncate">{loc.address}, {loc.city}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {loc.cases.length > 0 && (
                    <div className="flex gap-1">
                      {loc.cases.slice(0, 3).map((c) => (
                        <span key={c} className="text-xs bg-white/5 text-slate-400 rounded px-1.5 py-0.5">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-border px-5 py-5 space-y-5">
                  {/* Contact info */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <InfoRow icon={MapPin} label="Address">
                      <span className="text-sm text-slate-300 font-mono">{fullAddress}</span>
                      <CopyButton value={fullAddress} />
                    </InfoRow>
                    <InfoRow icon={Phone} label="Phone">
                      <span className="text-sm text-slate-300 font-mono">{loc.phone}</span>
                      <CopyButton value={loc.phone} />
                    </InfoRow>
                    <InfoRow icon={Clock} label="Hours">
                      <span className="text-sm text-slate-300">{loc.hours}</span>
                    </InfoRow>
                  </div>

                  {/* Accepts */}
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Accepted Payment / Service Methods</p>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.accepts.map((a) => (
                        <span key={a} className="text-xs px-2 py-1 rounded bg-white/5 border border-border text-slate-300">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Defendants served here */}
                  {loc.defendants.length > 0 && (
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Defendants to be Served Here</p>
                      <div className="flex flex-wrap gap-1.5">
                        {loc.defendants.map((d) => (
                          <span key={d} className="text-xs px-2 py-1 rounded bg-white/5 border border-border text-slate-300 font-medium">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Notes</p>
                    <ul className="space-y-1.5">
                      {loc.notes.map((note, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="text-slate-600 shrink-0 mt-0.5">·</span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Directions link */}
                  <a
                    href={`https://maps.google.com/?q=${loc.mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open in Google Maps
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-xs text-slate-500 uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-center gap-1.5">{children}</div>
    </div>
  )
}
