import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const COURT_COLORS: Record<string, string> = {
  edca: '#3b82f6',
  sacramento: '#f59e0b',
  'santa-clara': '#10b981',
}

export const COURT_LABELS: Record<string, string> = {
  edca: 'EDCA Federal',
  sacramento: 'Sacramento Superior',
  'santa-clara': 'Santa Clara Superior',
}

export const WAVE_COLORS: Record<string | number, string> = {
  1: '#ef4444',
  2: '#8b5cf6',
  habeas: '#06b6d4',
}

export const WAVE_LABELS: Record<string | number, string> = {
  1: 'Wave 1 · May 8',
  2: 'Wave 2 · May 22',
  habeas: 'Habeas · May 29 OSC',
}

export const CLAIM_COLORS: Record<string, string> = {
  '1st': '#f97316',
  '4th': '#a855f7',
  '14th': '#3b82f6',
  'State Tort': '#f59e0b',
  'Habeas': '#10b981',
}
