import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        surface: '#111827',
        border: '#1f2937',
        muted: '#94a3b8',
        // Jurisdiction
        federal: '#3b82f6',
        sacramento: '#f59e0b',
        'santa-clara': '#10b981',
        // Waves
        wave1: '#ef4444',
        wave2: '#8b5cf6',
        habeas: '#06b6d4',
        // Claims
        first: '#f97316',
        fourth: '#a855f7',
        fourteenth: '#3b82f6',
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grid-fade': 'gridFade 8s ease-in-out infinite',
      },
      keyframes: {
        gridFade: {
          '0%, 100%': { opacity: '0.03' },
          '50%': { opacity: '0.07' },
        },
      },
    },
  },
  plugins: [],
}

export default config
