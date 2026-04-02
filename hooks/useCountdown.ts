'use client'

import { useState, useEffect } from 'react'

interface CountdownResult {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
  isPast: boolean
}

export function useCountdown(targetDate: string): CountdownResult {
  const target = new Date(targetDate).getTime()

  const calculate = () => {
    const now = Date.now()
    const diff = target - now
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0, isPast: true }
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      total: diff,
      isPast: false,
    }
  }

  const [state, setState] = useState<CountdownResult>(calculate)

  useEffect(() => {
    const timer = setInterval(() => setState(calculate()), 1000)
    return () => clearInterval(timer)
  }, [target])

  return state
}
