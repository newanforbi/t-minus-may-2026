'use client'

import { useEffect, useRef, useState } from 'react'
import { DEFENDANTS } from '@/data/defendants'
import { CASES } from '@/data/cases'
import { COURT_COLORS } from '@/lib/utils'

const AGENCY_COLORS: Record<string, string> = {
  cdcr: '#3b82f6',
  dmv: '#f59e0b',
}

interface Node {
  id: string
  label: string
  type: 'defendant' | 'case'
  color: string
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

interface Link {
  source: string
  target: string
}

function buildGraph(width: number, height: number) {
  const nodes: Node[] = []
  const links: Link[] = []

  // Case nodes — arrange in a horizontal row near top
  CASES.forEach((c, i) => {
    nodes.push({
      id: `case-${c.id}`,
      label: c.shortName,
      type: 'case',
      color: COURT_COLORS[c.court],
      x: (width / (CASES.length + 1)) * (i + 1),
      y: height * 0.28,
      vx: 0,
      vy: 0,
      r: 28,
    })
  })

  // Defendant nodes — arrange in a row near bottom
  DEFENDANTS.forEach((d, i) => {
    nodes.push({
      id: `def-${d.id}`,
      label: d.name,
      type: 'defendant',
      color: AGENCY_COLORS[d.agency],
      x: (width / (DEFENDANTS.length + 1)) * (i + 1),
      y: height * 0.72,
      vx: 0,
      vy: 0,
      r: 22,
    })
    d.cases.forEach((caseId) => {
      links.push({ source: `def-${d.id}`, target: `case-${caseId}` })
    })
  })

  return { nodes, links }
}

export default function DefendantNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const stateRef = useRef<{ nodes: Node[]; links: Link[]; hovered: string | null }>({
    nodes: [],
    links: [],
    hovered: null,
  })
  const animRef = useRef<number>(0)
  const [dimensions, setDimensions] = useState({ width: 900, height: 420 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        const w = Math.max(320, entry.contentRect.width)
        setDimensions({ width: w, height: Math.round(w * 0.46) })
      }
    })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const { width, height } = dimensions
    const { nodes, links } = buildGraph(width, height)
    stateRef.current = { nodes, links, hovered: null }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    // Simple force simulation
    function tick() {
      const { nodes, links, hovered } = stateRef.current

      // Apply forces
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        // Repulsion between all pairs
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const minDist = a.r + b.r + 30
          if (dist < minDist) {
            const force = (minDist - dist) / dist * 0.15
            a.vx += dx * force
            a.vy += dy * force
            b.vx -= dx * force
            b.vy -= dy * force
          }
        }
        // Link attraction
        links.forEach((link) => {
          const src = nodes.find((n) => n.id === link.source)
          const tgt = nodes.find((n) => n.id === link.target)
          if (!src || !tgt) return
          const dx = tgt.x - src.x
          const dy = tgt.y - src.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const target = 140
          const force = (dist - target) / dist * 0.03
          src.vx += dx * force
          src.vy += dy * force
          tgt.vx -= dx * force
          tgt.vy -= dy * force
        })
        // Vertical anchor — keep cases near top, defendants near bottom
        if (a.type === 'case') {
          a.vy += (height * 0.28 - a.y) * 0.04
        } else {
          a.vy += (height * 0.72 - a.y) * 0.04
        }
        // Damping
        a.vx *= 0.85
        a.vy *= 0.85
        a.x += a.vx
        a.y += a.vy
        // Bounds
        a.x = Math.max(a.r + 4, Math.min(width - a.r - 4, a.x))
        a.y = Math.max(a.r + 4, Math.min(height - a.r - 4, a.y))
      }

      // Draw
      ctx!.clearRect(0, 0, width, height)

      const isConnected = (nodeId: string) => {
        if (!hovered) return true
        if (nodeId === hovered) return true
        return links.some(
          (l) =>
            (l.source === hovered && l.target === nodeId) ||
            (l.target === hovered && l.source === nodeId)
        )
      }

      // Links
      links.forEach((link) => {
        const src = nodes.find((n) => n.id === link.source)!
        const tgt = nodes.find((n) => n.id === link.target)!
        const active = !hovered || link.source === hovered || link.target === hovered
        ctx!.beginPath()
        ctx!.moveTo(src.x, src.y)
        ctx!.lineTo(tgt.x, tgt.y)
        ctx!.strokeStyle = active ? 'rgba(148,163,184,0.35)' : 'rgba(148,163,184,0.07)'
        ctx!.lineWidth = active ? 1.5 : 1
        ctx!.stroke()
      })

      // Nodes
      nodes.forEach((node) => {
        const connected = isConnected(node.id)
        const isHov = node.id === hovered
        const alpha = connected ? 1 : 0.25
        ctx!.globalAlpha = alpha

        if (node.type === 'case') {
          // Rounded rect
          const w = node.r * 2.2
          const h = node.r * 1.3
          ctx!.beginPath()
          ctx!.roundRect(node.x - w / 2, node.y - h / 2, w, h, 6)
          ctx!.fillStyle = node.color + (isHov ? 'cc' : '33')
          ctx!.fill()
          ctx!.strokeStyle = node.color + (isHov ? 'ff' : '88')
          ctx!.lineWidth = isHov ? 2 : 1.5
          ctx!.stroke()
        } else {
          // Circle
          ctx!.beginPath()
          ctx!.arc(node.x, node.y, isHov ? node.r + 3 : node.r, 0, Math.PI * 2)
          ctx!.fillStyle = node.color + (isHov ? 'cc' : '2a')
          ctx!.fill()
          ctx!.strokeStyle = node.color + (isHov ? 'ff' : '88')
          ctx!.lineWidth = isHov ? 2 : 1.5
          ctx!.stroke()
        }

        // Label
        ctx!.globalAlpha = connected ? 1 : 0.2
        ctx!.fillStyle = isHov ? '#ffffff' : '#e2e8f0'
        ctx!.font = `${isHov ? 600 : 500} ${node.type === 'case' ? 9 : 9}px Inter, system-ui`
        ctx!.textAlign = 'center'
        ctx!.textBaseline = 'middle'
        const label = node.label.length > 14 ? node.label.slice(0, 13) + '…' : node.label
        ctx!.fillText(label, node.x, node.y)

        ctx!.globalAlpha = 1
      })

      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [dimensions])

  // Update hovered ref
  useEffect(() => {
    stateRef.current.hovered = hovered
  }, [hovered])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    const hit = stateRef.current.nodes.find((n) => {
      const dx = n.x - mx
      const dy = n.y - my
      return Math.sqrt(dx * dx + dy * dy) <= n.r + 8
    })
    setHovered(hit?.id ?? null)
  }

  const hoveredNode = stateRef.current.nodes.find((n) => n.id === hovered)
  const hoveredConnections = hovered
    ? stateRef.current.links
        .filter((l) => l.source === hovered || l.target === hovered)
        .map((l) => (l.source === hovered ? l.target : l.source))
    : []

  return (
    <section className="section" id="network">
      <h2 className="section-title">Defendant–Case Network</h2>
      <p className="section-subtitle">
        Hover a node to highlight connections · Circles = defendants · Rectangles = cases
      </p>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-3 h-3 rounded-full bg-blue-500/60 border border-blue-500" />
          CDCR Defendant
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-3 h-3 rounded-full bg-amber-500/60 border border-amber-500" />
          DMV Defendant
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-5 h-3 rounded bg-blue-500/30 border border-blue-500" />
          Federal Case (EDCA)
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-5 h-3 rounded bg-amber-500/30 border border-amber-500" />
          Sacramento Superior
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-5 h-3 rounded bg-emerald-500/30 border border-emerald-500" />
          Santa Clara Superior
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full rounded-xl border border-border bg-surface overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: hovered ? 'pointer' : 'default', display: 'block' }}
        />
        {/* Hover info */}
        {hoveredNode && (
          <div className="absolute top-3 right-3 bg-[#0d1117] border border-border rounded-lg px-3 py-2 text-xs max-w-[200px]">
            <p className="font-semibold text-white mb-0.5">{hoveredNode.label}</p>
            {hoveredNode.type === 'defendant' && (
              <p className="text-slate-400">
                {DEFENDANTS.find((d) => `def-${d.id}` === hoveredNode.id)?.role}
              </p>
            )}
            {hoveredConnections.length > 0 && (
              <p className="text-slate-500 mt-1">
                Connected to {hoveredConnections.length} node{hoveredConnections.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
