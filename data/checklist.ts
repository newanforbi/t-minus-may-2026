export interface ChecklistItem {
  id: string
  task: string
  cases?: string[]
  note?: string
}

export interface ChecklistGroup {
  date: string
  isoDate: string
  label: string
  items: ChecklistItem[]
}

export const CHECKLIST_GROUPS: ChecklistGroup[] = [
  {
    date: 'May 1',
    isoDate: '2026-05-01',
    label: 'May 1 — Lock Kit Baseline',
    items: [
      { id: 'may1-1', task: 'Finalize Newanforbi v. Dodd complaint draft', cases: ['dodd'] },
      { id: 'may1-2', task: 'Finalize Newanforbi v. Macomber complaint draft', cases: ['macomber'] },
      { id: 'may1-3', task: 'Finalize Newanforbi v. Urrea complaint draft', cases: ['urrea'] },
      { id: 'may1-4', task: 'Begin building service packets for all Wave 1 defendants' },
      { id: 'may1-5', task: 'Verify form: authorized Form 3043 vs. obsolete Form 1502-DR', note: 'Key exhibit in Dodd and habeas cases' },
    ],
  },
  {
    date: 'May 2–3',
    isoDate: '2026-05-02',
    label: 'May 2–3 — Print & Assembly',
    items: [
      { id: 'may23-1', task: 'Print all Wave 1 complaints (multiple copies per court requirement)' },
      { id: 'may23-2', task: 'Assemble service packet for CDCR HQ (Dodd, Macomber)' },
      { id: 'may23-3', task: 'Assemble service packet for Stockton Parole (Urrea, Noguchi, Rojo)' },
      { id: 'may23-4', task: 'Prepare Sacramento Superior fee waiver application for Dodd case' },
    ],
  },
  {
    date: 'May 4',
    isoDate: '2026-05-04',
    label: 'May 4 — Pre-Clear Payments',
    items: [
      { id: 'may4-1', task: 'Obtain cashier\'s check or money order: $405 × 2 = $810 for federal cases', note: 'No cash accepted at EDCA clerk\'s office' },
      { id: 'may4-2', task: 'Verify EDCA clerk accepts payment method (cashier\'s check / money order / credit card)' },
      { id: 'may4-3', task: 'Confirm Sacramento Superior $435 fee waiver packet is complete' },
    ],
  },
  {
    date: 'May 5',
    isoDate: '2026-05-05',
    label: 'May 5 — Draft Conversion Filings',
    items: [
      { id: 'may5-1', task: 'Draft "Notice of Payment and Withdrawal of IFP Application" for Macomber case', cases: ['macomber'] },
      { id: 'may5-2', task: 'Draft "Notice of Payment and Withdrawal of IFP Application" for Urrea case', cases: ['urrea'] },
      { id: 'may5-3', task: 'Complete AO 440 summons forms for Macomber (1 summons — Macomber official capacity)' },
      { id: 'may5-4', task: 'Complete AO 440 summons forms for Urrea (3 summons — Urrea, Noguchi, Macomber)' },
    ],
  },
  {
    date: 'May 6',
    isoDate: '2026-05-06',
    label: 'May 6 — Service Route Validation',
    items: [
      { id: 'may6-1', task: 'Confirm CDCR HQ hours: 8:00 a.m.–5:00 p.m. M-F', note: '10111 Old Placerville Rd, Suite 100, Sacramento, CA 95827 | (279) 223-2100' },
      { id: 'may6-2', task: 'Confirm Stockton Parole Office hours and litigation coordinator', note: '612 Carlton Ave, Stockton, CA 95203 | (209) 948-7652' },
      { id: 'may6-3', task: 'Confirm Sacramento Superior new location (effective April 13, 2026)', note: '500 G Street, 2nd Floor, Sacramento, CA 95814' },
      { id: 'may6-4', task: 'Plan logistics for May 8: order of courthouse visits and timing' },
    ],
  },
  {
    date: 'May 8',
    isoDate: '2026-05-08',
    label: 'May 8 — WAVE 1 FILING DAY',
    items: [
      { id: 'may8-1', task: 'File Newanforbi v. Dodd at Sacramento Superior (fee waiver)', cases: ['dodd'], note: '500 G Street, 2nd Floor — new location' },
      { id: 'may8-2', task: 'Pay $405 for Macomber at EDCA clerk; present AO 440 summons; receive summons', cases: ['macomber'] },
      { id: 'may8-3', task: 'File Notice of Payment and Withdrawal of IFP for Macomber', cases: ['macomber'] },
      { id: 'may8-4', task: 'Pay $405 for Urrea at EDCA clerk; present AO 440 summons; receive summons', cases: ['urrea'] },
      { id: 'may8-5', task: 'File Notice of Payment and Withdrawal of IFP for Urrea', cases: ['urrea'] },
      { id: 'may8-6', task: 'Initiate service on all Wave 1 defendants (CDCR HQ + Stockton)' },
    ],
  },
]
