'use client'

import { useState, useEffect } from 'react'
import { CHECKLIST_GROUPS } from '@/data/checklist'
import { CheckCircle2, Circle, AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react'

const STORAGE_KEY = 't-minus-checklist'

export default function Checklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState<Set<string>>(new Set(CHECKLIST_GROUPS.map(g => g.date)))
  const [mounted, setMounted] = useState(false)

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setChecked(new Set(JSON.parse(stored)))
    } catch {}
    setMounted(true)
  }, [])

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])) } catch {}
      return next
    })
  }

  const toggleGroup = (date: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(date)) next.delete(date)
      else next.add(date)
      return next
    })
  }

  const totalItems = CHECKLIST_GROUPS.reduce((sum, g) => sum + g.items.length, 0)
  const doneItems = checked.size
  const pct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0

  return (
    <section className="section" id="checklist">
      <h2 className="section-title">Pre-Filing Checklist</h2>
      <p className="section-subtitle">
        Track preparation progress · Checks persist across sessions
      </p>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-400">{doneItems} of {totalItems} tasks complete</span>
          <span
            className="font-bold font-mono"
            style={{
              color: pct === 100 ? '#10b981' : pct > 50 ? '#f59e0b' : '#ef4444',
            }}
          >
            {pct}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background:
                pct === 100
                  ? 'linear-gradient(to right, #10b981, #34d399)'
                  : pct > 50
                  ? 'linear-gradient(to right, #f59e0b, #fbbf24)'
                  : 'linear-gradient(to right, #ef4444, #f97316)',
            }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {CHECKLIST_GROUPS.map((group) => {
          const groupDone = group.items.filter((item) => checked.has(item.id)).length
          const isExpanded = expanded.has(group.date)
          const isFilingDay = group.date === 'May 8'

          return (
            <div
              key={group.date}
              className="rounded-xl border border-border bg-surface overflow-hidden"
              style={isFilingDay ? { borderColor: '#ef444460', boxShadow: '0 0 20px rgba(239,68,68,0.08)' } : {}}
            >
              {/* Group header */}
              <button
                className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                onClick={() => toggleGroup(group.date)}
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold text-sm ${isFilingDay ? 'text-wave1' : 'text-white'}`}
                    >
                      {group.label}
                    </span>
                    {isFilingDay && (
                      <span className="flex items-center gap-1 text-xs text-wave1">
                        <AlertTriangle className="w-3 h-3" />
                        CRITICAL
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-slate-500 shrink-0 font-mono">
                  {groupDone}/{group.items.length}
                </span>
                {groupDone === group.items.length && group.items.length > 0 && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                )}
              </button>

              {/* Items */}
              {isExpanded && (
                <div className="border-t border-border divide-y divide-border/50">
                  {group.items.map((item) => {
                    const isDone = mounted && checked.has(item.id)
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        className="w-full flex items-start gap-3 px-5 py-3.5 text-left hover:bg-white/[0.03] transition-colors group"
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                        ) : (
                          <Circle className="w-4 h-4 mt-0.5 shrink-0 text-slate-600 group-hover:text-slate-400 transition-colors" />
                        )}
                        <div className="min-w-0">
                          <p
                            className={`text-sm leading-snug transition-colors ${
                              isDone ? 'line-through text-slate-500' : 'text-slate-200'
                            }`}
                          >
                            {item.task}
                          </p>
                          {item.note && (
                            <p className="text-xs text-slate-500 mt-1 font-mono">{item.note}</p>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
