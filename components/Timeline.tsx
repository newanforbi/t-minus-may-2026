'use client'

import { useRef, useState } from 'react'
import { TIMELINE_EVENTS, TimelineEvent } from '@/data/timeline'
import { WAVE_COLORS, COURT_COLORS } from '@/lib/utils'

const TYPE_COLORS: Record<string, string> = {
  prep: '#94a3b8',
  filing: '#ef4444',
  deadline: '#f59e0b',
  expected: '#06b6d4',
  closure: '#6b7280',
}

const TYPE_LABELS: Record<string, string> = {
  prep: 'Preparation',
  filing: 'Filing',
  deadline: 'Deadline',
  expected: 'Expected',
  closure: 'Closure',
}

// Date range: May 1 → June 10
const START = new Date('2026-05-01').getTime()
const END = new Date('2026-06-10').getTime()
const RANGE = END - START

function dateToPercent(isoDate: string): number {
  const t = new Date(isoDate).getTime()
  return ((t - START) / RANGE) * 100
}

function Tooltip({ event }: { event: TimelineEvent }) {
  const color = TYPE_COLORS[event.type]
  return (
    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-30 w-72 pointer-events-none">
      <div
        className="bg-[#1a2030] border rounded-lg p-3 text-left shadow-xl"
        style={{ borderColor: color + '60' }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="inline-block w-2 h-2 rounded-full shrink-0"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
          <span className="text-xs font-semibold" style={{ color }}>
            {event.date}
          </span>
          {event.isHard && (
            <span className="text-xs text-wave1 font-bold ml-auto">HARD</span>
          )}
        </div>
        <p className="font-semibold text-white text-sm mb-1">{event.label}</p>
        <p className="text-xs text-slate-400 leading-relaxed">{event.detail}</p>
        {event.cases.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {event.cases.map((c) => (
              <span key={c} className="text-xs bg-white/10 text-slate-300 rounded px-1.5 py-0.5">
                {c}
              </span>
            ))}
          </div>
        )}
        {/* Arrow */}
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
          style={{ borderTopColor: color + '60' }}
        />
      </div>
    </div>
  )
}

export default function Timeline() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const today = new Date()
  const todayPct = dateToPercent(today.toISOString().split('T')[0])
  const showToday = todayPct >= 0 && todayPct <= 100

  // Month labels
  const months = [
    { label: 'May 2026', pct: dateToPercent('2026-05-01') },
    { label: 'June 2026', pct: dateToPercent('2026-06-01') },
  ]

  return (
    <section className="section" id="timeline">
      <h2 className="section-title">Campaign Timeline</h2>
      <p className="section-subtitle">
        Scroll horizontally · Hover events for detail · Hard deadlines marked in red
      </p>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(TYPE_LABELS).map(([type, label]) => (
          <div key={type} className="flex items-center gap-1.5 text-xs text-slate-400">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: TYPE_COLORS[type], boxShadow: `0 0 4px ${TYPE_COLORS[type]}` }}
            />
            {label}
          </div>
        ))}
        {showToday && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-0.5 h-4 bg-white/40 rounded-full" />
            Today
          </div>
        )}
      </div>

      {/* Scrollable timeline */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-4"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div style={{ minWidth: 900, width: '100%', position: 'relative', height: 180 }}>
          {/* Month headers */}
          {months.map((m) => (
            <span
              key={m.label}
              className="absolute top-0 text-xs text-slate-600 font-medium"
              style={{ left: `${m.pct}%` }}
            >
              {m.label}
            </span>
          ))}

          {/* Track */}
          <div
            className="absolute rounded-full"
            style={{
              top: 72,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(to right, #1f2937, #374151, #1f2937)',
            }}
          />

          {/* Today marker */}
          {showToday && (
            <div
              className="absolute flex flex-col items-center"
              style={{ left: `${todayPct}%`, top: 58, transform: 'translateX(-50%)' }}
            >
              <span className="text-xs text-white/40 font-medium mb-1">TODAY</span>
              <div className="w-px h-10 bg-white/20" />
            </div>
          )}

          {/* Events */}
          {TIMELINE_EVENTS.map((event) => {
            const pct = dateToPercent(event.isoDate)
            const color = TYPE_COLORS[event.type]
            const isHovered = hoveredId === event.id
            const isHard = event.isHard

            return (
              <div
                key={event.id}
                className="absolute flex flex-col items-center cursor-pointer"
                style={{
                  left: `${pct}%`,
                  top: 56,
                  transform: 'translateX(-50%)',
                  zIndex: isHovered ? 20 : 10,
                }}
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Tooltip */}
                {isHovered && <Tooltip event={event} />}

                {/* Dot */}
                <div
                  className="rounded-full transition-all duration-150"
                  style={{
                    width: isHovered ? 16 : isHard ? 14 : 12,
                    height: isHovered ? 16 : isHard ? 14 : 12,
                    background: color,
                    boxShadow: `0 0 ${isHovered ? 16 : 8}px ${color}`,
                    border: isHard ? `2px solid white` : 'none',
                    marginBottom: 0,
                  }}
                />

                {/* Stem */}
                <div
                  className="w-px"
                  style={{ height: 24, background: color + '60' }}
                />

                {/* Label */}
                <div className="text-center" style={{ width: 80 }}>
                  <p
                    className="text-xs font-semibold leading-tight"
                    style={{ color: isHovered ? 'white' : color }}
                  >
                    {event.date}
                  </p>
                  <p
                    className="text-xs leading-tight mt-0.5"
                    style={{ color: isHovered ? '#cbd5e1' : '#64748b', fontSize: 10 }}
                  >
                    {event.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
