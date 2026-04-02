export type Court = 'edca' | 'sacramento' | 'santa-clara'
export type FilingWave = 1 | 2 | 'habeas'
export type FeeType = 'waiver' | 'paid' | 'none'
export type CaseStatus = 'upcoming' | 'filed' | 'served'

export interface Claim {
  amendment: string   // '1st' | '4th' | '14th' | 'State Tort' | 'Habeas'
  theory: string
}

export interface Case {
  id: string
  name: string
  shortName: string
  court: Court
  defendants: string[]
  claims: Claim[]
  filingDate: string
  isoFilingDate: string
  filingWave: FilingWave
  feeType: FeeType
  feePaid?: number
  damages?: string
  summary: string
  legalBasis: string[]
  procedural: string[]
  status: CaseStatus
}

export const CASES: Case[] = [
  {
    id: 'dodd',
    name: 'Newanforbi v. Dodd, et al.',
    shortName: 'v. Dodd',
    court: 'sacramento',
    defendants: ['Keely Dodd', 'Gary Noguchi', 'Joseelyn Rojo', 'Doe 1', 'CDCR'],
    claims: [
      { amendment: 'State Tort', theory: 'False Imprisonment' },
      { amendment: 'State Tort', theory: 'Intentional Infliction of Emotional Distress' },
      { amendment: 'State Tort', theory: 'Breach of Mandatory Duty' },
    ],
    filingDate: 'May 8, 2026',
    isoFilingDate: '2026-05-08',
    filingWave: 1,
    feeType: 'waiver',
    feePaid: 435,
    damages: '$109,408+ in lost CDL wages; ongoing $6,000/month losses',
    summary:
      'State tort action targeting procedural and substantive deficiencies in a November 2025 discharge review. Defendants fabricated a "10-year parole term" and "6.5-year" minimum supervision requirement with no basis in law. The review used obsolete Form 1502-DR (Rev. 01/22) riddled with copy-paste errors instead of the mandated Form 3043. Causes of action include false imprisonment, IIED, and breach of mandatory duty under the Government Claims Act.',
    legalBasis: [
      'California Government Claims Act',
      'Penal Code § 3000.1',
      'Title 15, CCR § 3574',
      'Gov. Code § 815.6',
    ],
    procedural: [
      'Filing fee: $435 (unlimited civil case)',
      'Fee waiver application filed concurrently',
      'New courthouse location as of April 13, 2026: 500 G Street, 2nd Floor, Sacramento',
      'Phone: (916) 874-5522, option 3',
    ],
    status: 'upcoming',
  },
  {
    id: 'macomber',
    name: 'Newanforbi v. Macomber',
    shortName: 'v. Macomber',
    court: 'edca',
    defendants: ['Jeff Macomber'],
    claims: [
      { amendment: '14th', theory: 'Challenge to CDCR Policy 19-03' },
      { amendment: '14th', theory: 'Substantive Due Process' },
    ],
    filingDate: 'May 8, 2026',
    isoFilingDate: '2026-05-08',
    filingWave: 1,
    feeType: 'paid',
    feePaid: 405,
    summary:
      'Federal constitutional challenge to CDCR Policy 19-03, which imposes rigid categorical temporal minimums on parole discharge eligibility. The policy directly conflicts with Penal Code § 3008(d) and Title 15, CCR § 3574 (April 2025 revision). Secretary Macomber is named in his official capacity only, invoking Ex parte Young to bypass Eleventh Amendment sovereign immunity and obtain prospective injunctive relief.',
    legalBasis: [
      'U.S. Const. amend. XIV',
      'Ex parte Young, 209 U.S. 123 (1908)',
      'CDCR Policy 19-03',
      'Penal Code § 3008(d)',
      'Title 15, CCR § 3574',
      '42 U.S.C. § 1983',
    ],
    procedural: [
      'Filing fee: $405 ($350 + $55 administrative)',
      'IFP-to-Paid conversion: withdraw IFP application upon fee payment',
      'Present completed AO 440 summons at intake for immediate issuance',
      'Clerk: 501 I Street, Room 4-200, Sacramento, CA 95814',
    ],
    status: 'upcoming',
  },
  {
    id: 'urrea',
    name: 'Newanforbi v. Urrea, et al.',
    shortName: 'v. Urrea',
    court: 'edca',
    defendants: ['Urrea', 'Gary Noguchi', 'Jeff Macomber'],
    claims: [
      { amendment: '4th', theory: 'Unlawful Seizure / Arbitrary Over-detention' },
      { amendment: '14th', theory: 'Due Process Violation' },
    ],
    filingDate: 'May 8, 2026',
    isoFilingDate: '2026-05-08',
    filingWave: 1,
    feeType: 'paid',
    feePaid: 405,
    damages: '$1,534–$2,301 in lost commercial driver wages',
    summary:
      'Challenges an arbitrary 5-day detention from November 1–6, 2024. Plaintiff was arrested for DUI; the DA never filed charges. A parole hold was then placed based on an invalid "Halloween curfew" Special Condition No. 063 — a condition facially invalid as applied per People v. Lent. The CHP issued a formal Detention Certificate under PC § 849(b)(1) on November 5, 2024, certifying "insufficient grounds" for the original arrest, yet the parole hold continued.',
    legalBasis: [
      'U.S. Const. amend. IV',
      'U.S. Const. amend. XIV',
      'PC § 849(b)(1)',
      'People v. Lent, 15 Cal.3d 481 (1975)',
      '42 U.S.C. § 1983',
    ],
    procedural: [
      'Filing fee: $405 ($350 + $55 administrative)',
      'IFP-to-Paid conversion strategy',
      'Detention Certificate (PC § 849(b)(1)) as key exhibit',
      'Service on Stockton Parole Office: 612 Carlton Ave, Stockton, CA 95203',
    ],
    status: 'upcoming',
  },
  {
    id: 'candelaria',
    name: 'Newanforbi v. Candelaria, et al.',
    shortName: 'v. Candelaria',
    court: 'edca',
    defendants: ['Candelaria', 'Gordon (DMV)'],
    claims: [
      { amendment: '14th', theory: 'DMV Structural Bias & Due Process Nullity' },
      { amendment: '14th', theory: 'Dual-Role Conflict of Interest' },
    ],
    filingDate: 'May 22, 2026',
    isoFilingDate: '2026-05-22',
    filingWave: 2,
    feeType: 'paid',
    feePaid: 405,
    summary:
      'Challenges the DMV Administrative Per Se (APS) hearing framework for CDL suspension. Plaintiff was asleep in a parked vehicle when arrested — no volitional movement. The CHP issued a Detention Certificate under PC § 849(b)(1) certifying "insufficient grounds." Despite this, DMV Hearing Officer Gordon sustained a 1-year CDL suspension on January 24, 2025. Invokes California DUI Lawyers Ass\'n v. DMV (2022) to attack the structural bias of the DMV dual-role hearing officer system.',
    legalBasis: [
      'U.S. Const. amend. XIV',
      'California DUI Lawyers Ass\'n v. DMV (2022)',
      'Vehicle Code § 13353',
      'PC § 849(b)(1)',
      '42 U.S.C. § 1983',
    ],
    procedural: [
      'Filing fee: $405 ($350 + $55 administrative)',
      'Service on DMV Legal Affairs only: 2415 First Ave, Mail Station C128, Sacramento',
      'DMV does NOT accept service on non-officer employees individually',
      'Phone: (916) 657-6469',
    ],
    status: 'upcoming',
  },
  {
    id: 'rojo',
    name: 'Newanforbi v. Rojo, et al.',
    shortName: 'v. Rojo',
    court: 'edca',
    defendants: ['Joseelyn Rojo', 'Gary Noguchi', 'Jeff Macomber'],
    claims: [
      { amendment: '1st', theory: 'Free Exercise Clause Violation' },
      { amendment: '14th', theory: 'Substantive Due Process' },
    ],
    filingDate: 'May 22, 2026',
    isoFilingDate: '2026-05-22',
    filingWave: 2,
    feeType: 'paid',
    feePaid: 405,
    summary:
      'Challenges the denial of out-of-state travel to Reno, Nevada (November 21–23, 2025) to attend plaintiff\'s parents\' 19th church anniversary celebration. Parole agents concealed the denial decision until the exact moment the family was departing, maximizing emotional harm. The denial was based on an unwritten, unpublished office policy restricting out-of-state travel — a policy never disclosed to plaintiff. Alleges First Amendment Free Exercise Clause violation and due process deprivation.',
    legalBasis: [
      'U.S. Const. amend. I (Free Exercise Clause)',
      'U.S. Const. amend. XIV',
      '42 U.S.C. § 1983',
      'Penal Code § 3000 et seq.',
    ],
    procedural: [
      'Filing fee: $405 ($350 + $55 administrative)',
      'Service on Stockton Parole Office: 612 Carlton Ave, Stockton, CA 95203',
      'Contact Litigation Coordinator before service',
      'Hours: 8:00 a.m.–5:00 p.m. M-F',
    ],
    status: 'upcoming',
  },
  {
    id: 'habeas',
    name: 'In re Newanforbi',
    shortName: 'In re Newanforbi',
    court: 'santa-clara',
    defendants: ['Keely Dodd', 'Jeff Macomber'],
    claims: [
      { amendment: 'Habeas', theory: 'Unlawful Custodial Restraint' },
      { amendment: 'Habeas', theory: 'Discharge Denial Based on Obsolete Policy' },
    ],
    filingDate: 'OSC Expected May 29, 2026',
    isoFilingDate: '2026-05-29',
    filingWave: 'habeas',
    feeType: 'none',
    summary:
      'Habeas corpus petition challenging the fundamental legality of continued parole supervision. The November 2025 discharge denial relied on an obsolete "completion impossible" treatment policy and used unauthorized obsolete Form 1502-DR instead of the mandated Form 3043. Plaintiff\'s LS/CMI score of 5 falls below the regulatory retention threshold of 11, making continued supervision unlawful. Seeks an Order to Show Cause expected by May 29, 2026.',
    legalBasis: [
      'Cal. Penal Code § 1473 (Habeas Corpus)',
      'Title 15, CCR § 3574',
      'LS/CMI Score Threshold (score: 5, threshold: 11)',
      'Unauthorized Form 1502-DR vs. required Form 3043',
    ],
    procedural: [
      'No filing fee (habeas petition)',
      'OSC expected: May 29, 2026 (Friday)',
      'Filed in Santa Clara County Superior Court',
      'High-alert checkpoint: Friday May 29',
    ],
    status: 'upcoming',
  },
]
