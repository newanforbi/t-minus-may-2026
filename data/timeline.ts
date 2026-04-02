export type EventType = 'prep' | 'filing' | 'deadline' | 'expected' | 'closure'

export interface TimelineEvent {
  id: string
  date: string
  isoDate: string
  label: string
  type: EventType
  cases: string[]
  detail: string
  isHard: boolean
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'prep-may1',
    date: 'May 1',
    isoDate: '2026-05-01',
    label: 'Lock Kit Baseline',
    type: 'prep',
    cases: ['dodd', 'macomber', 'urrea', 'candelaria', 'rojo', 'habeas'],
    detail: 'Finalize all complaint drafts. Lock kit baseline — no substantive edits after this point. Begin building service packets for all defendants.',
    isHard: false,
  },
  {
    id: 'prep-may23',
    date: 'May 2–3',
    isoDate: '2026-05-02',
    label: 'Print & Assembly Buffer',
    type: 'prep',
    cases: ['dodd', 'macomber', 'urrea'],
    detail: 'Buffer days for printing, assembly, and final review of Wave 1 filing packets. Organize service copies per defendant.',
    isHard: false,
  },
  {
    id: 'prep-may4',
    date: 'May 4',
    isoDate: '2026-05-04',
    label: 'Pre-Clear Payment Paths',
    type: 'prep',
    cases: ['macomber', 'urrea'],
    detail: 'Confirm cashier\'s check or money order availability for $405 × 2 federal fees. Verify clerk\'s office payment policies. No cash accepted (policy since Jan 1, 2022).',
    isHard: false,
  },
  {
    id: 'prep-may5',
    date: 'May 5',
    isoDate: '2026-05-05',
    label: 'Draft Conversion Filings',
    type: 'prep',
    cases: ['macomber', 'urrea'],
    detail: 'Draft "Notice of Payment and Withdrawal of IFP Application" for both federal Wave 1 cases. Prepare completed AO 440 summons forms for presentation at clerk\'s intake.',
    isHard: false,
  },
  {
    id: 'prep-may6',
    date: 'May 6',
    isoDate: '2026-05-06',
    label: 'Service Route Validation',
    type: 'prep',
    cases: ['dodd', 'macomber', 'urrea'],
    detail: 'Verify service addresses and hours for all Wave 1 defendants: CDCR HQ (10111 Old Placerville Rd), Stockton Parole (612 Carlton Ave). Confirm litigation coordinator contact at Stockton.',
    isHard: false,
  },
  {
    id: 'filing-wave1',
    date: 'May 8',
    isoDate: '2026-05-08',
    label: 'Wave 1 Filing Day',
    type: 'filing',
    cases: ['dodd', 'macomber', 'urrea'],
    detail: 'FILE: Newanforbi v. Dodd (Sacramento Superior, fee waiver). CONVERT & FILE: Newanforbi v. Macomber + Newanforbi v. Urrea (EDCA, $405/case). Pay fees, present AO 440 summons, obtain immediate issuance. Three simultaneous strikes.',
    isHard: true,
  },
  {
    id: 'filing-wave2',
    date: 'May 22',
    isoDate: '2026-05-22',
    label: 'Wave 2 Filing Day',
    type: 'filing',
    cases: ['candelaria', 'rojo'],
    detail: 'FILE: Newanforbi v. Candelaria + Newanforbi v. Rojo (EDCA, $405/case each). Pay fees, present AO 440 summons, obtain immediate summons issuance. Total federal fees to date: $1,215.',
    isHard: true,
  },
  {
    id: 'closure-may25',
    date: 'May 25',
    isoDate: '2026-05-25',
    label: 'Hard Closure',
    type: 'closure',
    cases: ['dodd', 'macomber', 'urrea', 'candelaria', 'rojo', 'habeas'],
    detail: 'Memorial Day. HARD CLOSURE — no filings possible. All service must be underway. Ensure all 4 federal summons issued; begin coordinating process server assignments.',
    isHard: true,
  },
  {
    id: 'habeas-osc',
    date: 'May 29',
    isoDate: '2026-05-29',
    label: 'Habeas OSC Expected',
    type: 'expected',
    cases: ['habeas'],
    detail: 'Expected issuance of Order to Show Cause on In re Newanforbi (Santa Clara Superior). Friday high-alert checkpoint. Monitor court for OSC issuance and coordinate response.',
    isHard: false,
  },
  {
    id: 'service-deadline',
    date: 'Jun 7',
    isoDate: '2026-06-07',
    label: 'Service Deadline',
    type: 'deadline',
    cases: ['macomber', 'urrea', 'candelaria', 'rojo'],
    detail: 'Hard service deadline for all federal defendants. 90-day limit under Federal Rule 4(m) from May 8 filing date. All 7 defendants across 4 federal cases must be served by this date or face dismissal.',
    isHard: true,
  },
]
