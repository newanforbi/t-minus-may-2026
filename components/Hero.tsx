'use client'

import { useCountdown } from '@/hooks/useCountdown'
import { CASES } from '@/data/cases'
import { DEFENDANTS } from '@/data/defendants'
import { Scale, Building2, Users, DollarSign, AlertTriangle } from 'lucide-react'

const FILING_DATE = '2026-05-08T09:00:00-07:00'

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="countdown-digit text-white"
        style={{ textShadow: '0 0 40px rgba(239,68,68,0.6)' }}
      >
        {padded}
      </span>
      <span className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  )
}

function Divider() {
  return (
    <span
      className="countdown-digit text-wave1 self-start mt-1"
      style={{ textShadow: '0 0 20px rgba(239,68,68,0.5)' }}
    >
      :
    </span>
  )
}

export default function Hero() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(FILING_DATE)

  const totalDamages = '$109,408+'
  const totalFees = (CASES.filter((c) => c.feeType === 'paid').length * 405).toLocaleString()

  const stats = [
    { icon: Scale, label: 'Cases', value: '6', sub: '3 federal · 2 state · 1 habeas' },
    { icon: Building2, label: 'Courts', value: '3', sub: 'EDCA · Sacramento · Santa Clara' },
    { icon: Users, label: 'Defendants', value: String(DEFENDANTS.length), sub: 'CDCR (6) · DMV (1)' },
    { icon: DollarSign, label: 'CDL Damages', value: totalDamages, sub: 'Plus ongoing $6k/mo losses' },
  ]

  return (
    <header className="relative overflow-hidden border-b border-border">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(239,68,68,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative section pb-12 pt-16">
        {/* Label */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-wave1/40 bg-wave1/10 text-wave1 text-xs font-semibold tracking-widest uppercase">
            <AlertTriangle className="w-3 h-3" />
            Active Campaign
          </span>
          <span className="text-xs text-slate-500">Multi-jurisdictional · May 2026</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
          T-Minus{' '}
          <span style={{ color: 'var(--wave1)', textShadow: '0 0 40px rgba(239,68,68,0.4)' }}>
            May 2026
          </span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mb-12">
          Coordinated six-front litigation campaign against CDCR and DMV. Simultaneous strikes
          across federal and state jurisdictions — engineered to fragment the state&apos;s defense.
        </p>

        {/* Countdown */}
        <div className="mb-12">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">
            {isPast ? 'Wave 1 Filed' : 'Wave 1 Filing — May 8, 2026'}
          </p>
          {isPast ? (
            <p className="text-wave1 text-2xl font-bold font-mono">FILED</p>
          ) : (
            <div className="flex items-start gap-3 sm:gap-5">
              <CountdownUnit value={days} label="Days" />
              <Divider />
              <CountdownUnit value={hours} label="Hrs" />
              <Divider />
              <CountdownUnit value={minutes} label="Min" />
              <Divider />
              <CountdownUnit value={seconds} label="Sec" />
            </div>
          )}
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="flex items-start gap-3 bg-surface border border-border rounded-lg p-4"
            >
              <div className="mt-0.5 p-2 rounded-md bg-white/5">
                <Icon className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <div className="text-xl font-bold text-white font-mono">{value}</div>
                <div className="text-xs font-medium text-slate-300">{label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
