export interface ServiceLocation {
  id: string
  name: string
  shortName: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  hours: string
  notes: string[]
  accepts: string[]
  defendants: string[]
  cases: string[]
  mapsQuery: string
}

export const SERVICE_LOCATIONS: ServiceLocation[] = [
  {
    id: 'edca',
    name: 'U.S. District Court, Eastern District of California',
    shortName: 'EDCA Clerk',
    address: '501 I Street, Room 4-200',
    city: 'Sacramento',
    state: 'CA',
    zip: '95814',
    phone: '(916) 930-4000',
    hours: 'Mon–Fri 9:00 a.m.–4:00 p.m.',
    notes: [
      'Pay filing fees here: $405 per case ($350 + $55 administrative)',
      'Present completed AO 440 summons forms at intake for immediate issuance',
      'File Notice of Payment and Withdrawal of IFP Application',
      'No cash accepted (policy effective January 1, 2022)',
    ],
    accepts: ['Cashier\'s check', 'Money order', 'Personal check', 'Credit card'],
    defendants: [],
    cases: ['macomber', 'urrea', 'candelaria', 'rojo'],
    mapsQuery: '501+I+Street+Sacramento+CA+95814',
  },
  {
    id: 'sacramento-superior',
    name: 'Sacramento County Superior Court',
    shortName: 'Sacramento Superior',
    address: '500 G Street, 2nd Floor',
    city: 'Sacramento',
    state: 'CA',
    zip: '95814',
    phone: '(916) 874-5522',
    hours: 'Mon–Fri 8:00 a.m.–4:00 p.m.',
    notes: [
      'NEW LOCATION effective April 13, 2026',
      'File Newanforbi v. Dodd here with fee waiver application',
      'Filing fee: $435 (unlimited civil case)',
      'Phone: option 3 for civil filings',
    ],
    accepts: ['Fee waiver (IFP)', 'Cashier\'s check', 'Credit card'],
    defendants: ['Keely Dodd', 'Gary Noguchi', 'Joseelyn Rojo', 'CDCR'],
    cases: ['dodd'],
    mapsQuery: '500+G+Street+Sacramento+CA+95814',
  },
  {
    id: 'cdcr-hq',
    name: 'CDCR Office of Legal Affairs',
    shortName: 'CDCR HQ',
    address: '10111 Old Placerville Rd, Suite 100',
    city: 'Sacramento',
    state: 'CA',
    zip: '95827',
    phone: '(279) 223-2100',
    hours: 'Mon–Fri 8:00 a.m.–5:00 p.m.',
    notes: [
      'Accepts service for CDCR entity and executive staff (Macomber)',
      'Service on Macomber in official capacity goes here',
      'Call ahead to confirm litigation coordinator availability',
    ],
    accepts: ['Personal service', 'Authorized process server'],
    defendants: ['Jeff Macomber', 'CDCR'],
    cases: ['macomber', 'dodd'],
    mapsQuery: '10111+Old+Placerville+Rd+Sacramento+CA+95827',
  },
  {
    id: 'stockton-parole',
    name: 'Stockton Parole Office',
    shortName: 'Stockton Parole',
    address: '612 Carlton Ave',
    city: 'Stockton',
    state: 'CA',
    zip: '95203',
    phone: '(209) 948-7652',
    hours: 'Mon–Fri 8:00 a.m.–5:00 p.m.',
    notes: [
      'Service on Urrea, Noguchi, Rojo (individual defendants)',
      'Contact Litigation Coordinator before arriving for service',
      'Required for Urrea and Rojo cases',
    ],
    accepts: ['Personal service', 'Authorized process server'],
    defendants: ['Urrea', 'Gary Noguchi', 'Joseelyn Rojo'],
    cases: ['urrea', 'rojo'],
    mapsQuery: '612+Carlton+Ave+Stockton+CA+95203',
  },
  {
    id: 'dmv-legal',
    name: 'DMV Office of Legal Affairs',
    shortName: 'DMV Legal',
    address: '2415 First Ave, Mail Station C128',
    city: 'Sacramento',
    state: 'CA',
    zip: '95818',
    phone: '(916) 657-6469',
    hours: 'Mon–Fri 8:00 a.m.–5:00 p.m.',
    notes: [
      'Only accepts service at Sacramento HQ — no other DMV locations',
      'Does NOT accept service on non-officer employees individually',
      'Service for Candelaria case goes here (for DMV entity)',
      'Gordon (hearing officer) must be served separately at Sacramento HQ only',
    ],
    accepts: ['Personal service', 'Authorized process server'],
    defendants: ['Candelaria', 'Gordon (DMV)'],
    cases: ['candelaria'],
    mapsQuery: '2415+First+Ave+Sacramento+CA+95818',
  },
  {
    id: 'santa-clara-superior',
    name: 'Santa Clara County Superior Court',
    shortName: 'Santa Clara Superior',
    address: '191 North First Street',
    city: 'San Jose',
    state: 'CA',
    zip: '95113',
    phone: '(408) 882-2100',
    hours: 'Mon–Fri 8:00 a.m.–4:00 p.m.',
    notes: [
      'File In re Newanforbi habeas petition here',
      'No filing fee for habeas corpus petition',
      'OSC expected by May 29, 2026 — Friday high-alert checkpoint',
    ],
    accepts: ['No fee (habeas petition)'],
    defendants: ['Keely Dodd', 'Jeff Macomber'],
    cases: ['habeas'],
    mapsQuery: '191+North+First+Street+San+Jose+CA+95113',
  },
]
