import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'T-Minus May 2026 — Litigation Campaign',
  description:
    'Interactive operations dashboard for the coordinated 6-case, 3-jurisdiction May 2026 litigation campaign against CDCR and DMV.',
  openGraph: {
    title: 'T-Minus May 2026 — Litigation Campaign',
    description: '6 cases. 3 courts. 1 campaign.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-bg antialiased">{children}</body>
    </html>
  )
}
