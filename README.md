# T-Minus May 2026

**Litigation operations dashboard** for a coordinated 6-case, 3-jurisdiction civil rights campaign against the California Department of Corrections and Rehabilitation (CDCR) and the California Department of Motor Vehicles (DMV). Simultaneous strikes across federal and state courts — engineered to fragment the state's defense.

---

## Overview

This is a Next.js 14 single-page application that serves as a real-time command center for the May 2026 litigation campaign. It tracks case status, filing deadlines, defendant networks, constitutional claims, service-of-process logistics, and settlement exposure across all six active matters.

**Live deployment:** Vercel (`newanforbi/t-minus-may-2026`)

---

## The Six Cases

| Case | Court | Wave | Theory | Filing |
|------|-------|------|--------|--------|
| Newanforbi v. Dodd, et al. | Sacramento Superior | Wave 1 | State Tort · False Imprisonment · IIED · Breach of Mandatory Duty | May 8, 2026 |
| Newanforbi v. Macomber | EDCA (Federal) | Wave 1 | 14th Amend. · Challenge to CDCR Policy 19-03 | May 8, 2026 |
| Newanforbi v. Urrea, et al. | EDCA (Federal) | Wave 1 | 4th + 14th Amend. · Unlawful 5-day Over-detention | May 8, 2026 |
| Newanforbi v. Candelaria, et al. | EDCA (Federal) | Wave 2 | 14th Amend. · DMV Structural Bias / Dual-Role Due Process | May 22, 2026 |
| Newanforbi v. Rojo, et al. | EDCA (Federal) | Wave 2 | 1st + 14th Amend. · Free Exercise Clause Violation | May 22, 2026 |
| In re Newanforbi | Santa Clara Superior | Habeas | Habeas Corpus · Unlawful Custodial Restraint | OSC: May 29, 2026 |

### Filing Waves

- **Wave 1 — May 8:** Three simultaneous filings (2 federal, 1 state). Federal cases pay filing fees directly ($405 each) to bypass IFP screening and trigger immediate summons issuance.
- **Wave 2 — May 22:** Two additional federal cases expanding the constitutional front.
- **Habeas — May 29:** State habeas petition targeting the fundamental legality of continued parole supervision; OSC expected.

---

## Defendants

Seven named defendants across two state agencies:

| Defendant | Role | Agency | Cases |
|-----------|------|--------|-------|
| Keely Dodd | Parole Administrator | CDCR | Dodd, Habeas |
| Gary Noguchi | Unit Supervisor | CDCR | Dodd, Urrea, Rojo |
| Joseelyn Rojo | Parole Agent | CDCR | Dodd, Rojo |
| Jeff Macomber | CDCR Secretary | CDCR | Macomber, Urrea, Rojo, Habeas |
| Urrea | Parole Agent | CDCR | Urrea |
| Candelaria | Hearing Officer | CDCR / DMV | Candelaria |
| Gordon | DMV Hearing Officer | DMV | Candelaria |

---

## Settlement Exposure

Derived from multi-source analysis in [`exposure.md`](./exposure.md). Ranges reflect the most-probable negotiated outcome for each assessed case.

| Case | Settlement Range | Mean |
|------|-----------------|------|
| v. Dodd | $200K – $275K | $237,500 |
| v. Candelaria | $90K – $175K | $132,500 |
| v. Macomber | $35K – $85K | $60,000 |
| v. Urrea | $25K – $75K | $50,000 |
| v. Rojo | *pending analysis* | — |
| In re Newanforbi | *primarily equitable relief* | — |

**Total mean exposure (4 assessed cases): ~$480K**

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 11 |
| Visualization | D3.js 7 |
| Icons | Lucide React |
| Utilities | clsx · tailwind-merge · class-variance-authority |
| Date handling | date-fns 3 |
| Deployment | Vercel |

---

## Project Structure

```
t-minus-may-2026/
├── app/
│   ├── layout.tsx          # Root layout, metadata, dark mode
│   ├── page.tsx            # Main page — sticky nav + component composition
│   └── globals.css         # CSS custom properties, base styles
│
├── components/
│   ├── Hero.tsx            # Countdown timer + stats bar (cases, courts, defendants, exposure)
│   ├── CaseGrid.tsx        # 6-card grid; click-to-open modal
│   ├── CaseModal.tsx       # Slide-in drawer with full case details
│   ├── Timeline.tsx        # Filing wave timeline visualization
│   ├── JurisdictionPanel.tsx  # Per-court details (EDCA, Sacramento, Santa Clara)
│   ├── DefendantNetwork.tsx   # D3 force graph of defendant cross-case relationships
│   ├── ClaimsBreakdown.tsx    # Constitutional claims grouped by amendment
│   ├── ServicePanel.tsx       # Service-of-process logistics per defendant
│   └── Checklist.tsx          # Pre-filing checklist with status tracking
│
├── data/
│   ├── cases.ts            # CASES array — source of truth for all case data
│   ├── defendants.ts       # DEFENDANTS array with role + case cross-references
│   ├── timeline.ts         # Timeline events data
│   ├── service.ts          # Service logistics data
│   └── checklist.ts        # Pre-filing checklist items
│
├── hooks/
│   └── useCountdown.ts     # Live countdown hook targeting Wave 1 filing date
│
├── lib/
│   └── utils.ts            # Color maps (courts, waves, claims), cn() helper
│
├── exposure.md             # Detailed settlement valuation analysis (4 cases)
└── litigation-campaign-rollout.md  # Strategic rollout document
```

---

## Data Model

### `Case` (`data/cases.ts`)

```typescript
interface Case {
  id: string
  name: string
  shortName: string
  court: 'edca' | 'sacramento' | 'santa-clara'
  defendants: string[]
  claims: Claim[]                // { amendment, theory }[]
  filingDate: string
  isoFilingDate: string
  filingWave: 1 | 2 | 'habeas'
  feeType: 'waiver' | 'paid' | 'none'
  feePaid?: number
  damages?: string               // Documented economic harm
  exposure?: {                   // Settlement range from exposure.md
    lo: number
    hi: number
    mean: number
  }
  summary: string
  legalBasis: string[]
  procedural: string[]
  status: 'upcoming' | 'filed' | 'served'
}
```

### Color System (`lib/utils.ts`)

| Category | Key → Color |
|----------|-------------|
| Courts | `edca` → blue · `sacramento` → amber · `santa-clara` → green |
| Waves | `1` → red · `2` → purple · `habeas` → cyan |
| Claims | `1st` → orange · `4th` → violet · `14th` → blue · `State Tort` → amber · `Habeas` → green |

---

## Components

### `Hero`
Sticky countdown timer targeting Wave 1 (May 8, 2026 09:00 PT). Stats bar shows: Cases · Courts · Defendants · **Exposure** (total mean settlement exposure derived from `cases.ts` exposure fields).

### `CaseGrid`
Responsive 3-column grid of `CaseCard` components. Each card shows the jurisdiction color bar, wave/court badges, claims, defendants, and damages. Click opens `CaseModal`.

### `CaseModal`
Full-width slide-in drawer. Displays case summary, legal basis statutes, damages, and procedural notes. Closes on `Escape` or backdrop click.

### `DefendantNetwork`
D3 force-directed graph showing defendants as nodes and their shared-case relationships as edges. Nodes are colored by agency (CDCR / DMV).

### `Timeline`
Visual timeline of filing waves with event markers for Wave 1, Wave 2, and the Habeas OSC.

### `JurisdictionPanel`
Per-court breakdown of venue, filing mechanics, and case assignments for EDCA, Sacramento Superior, and Santa Clara Superior.

### `ClaimsBreakdown`
Groups constitutional claims by amendment type with case counts and related-case badges.

### `ServicePanel`
Service-of-process logistics: addresses, phone numbers, accepted methods, and special notes for CDCR HQ, DMV Legal Affairs, and Stockton Parole Office.

### `Checklist`
Pre-filing checklist with completion status for all procedural steps across the three filing waves.

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → http://localhost:3000

# Type-check + build
npm run build

# Lint
npm run lint
```

**Node version:** 20+  
**Package manager:** npm

---

## Deployment

Deployed on Vercel via the `vercel.json` config at the repo root. Any push to `main` triggers an automatic production deployment.

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next"
}
```

---

## Development Branch

Active feature development happens on `claude/add-exposure-card-eg4eE`. See open PRs for pending work.

### Roadmap (piecemeal)

- [ ] **`CaseModal` exposure section** — per-case lo/hi range bar + mean badge inside the slide-in drawer
- [ ] **`CaseGrid` exposure callout** — replace raw damages text with formatted settlement range on each card
- [ ] **`ExposurePanel` component** — bar chart / table summarizing all 6 cases' exposure side-by-side
- [ ] **Rojo exposure analysis** — add settlement range data for `v. Rojo` once assessed
- [ ] **Habeas exposure analysis** — characterize equitable relief value for `In re Newanforbi`
- [ ] **Status updates** — flip case `status` fields from `upcoming` → `filed` → `served` as filings complete

---

## Key Documents

| File | Purpose |
|------|---------|
| [`exposure.md`](./exposure.md) | Multi-source settlement valuation analysis for Dodd, Urrea, Candelaria, and Macomber |
| [`litigation-campaign-rollout.md`](./litigation-campaign-rollout.md) | Strategic architecture, IFP-to-paid conversion mechanics, service logistics, and second-order systemic impacts |
