export type Agency = 'cdcr' | 'dmv'

export interface Defendant {
  id: string
  name: string
  role: string
  agency: Agency
  cases: string[]
}

export const DEFENDANTS: Defendant[] = [
  {
    id: 'dodd',
    name: 'Keely Dodd',
    role: 'Parole Administrator',
    agency: 'cdcr',
    cases: ['dodd', 'habeas'],
  },
  {
    id: 'noguchi',
    name: 'Gary Noguchi',
    role: 'Unit Supervisor',
    agency: 'cdcr',
    cases: ['dodd', 'urrea', 'rojo'],
  },
  {
    id: 'rojo',
    name: 'Joseelyn Rojo',
    role: 'Parole Agent',
    agency: 'cdcr',
    cases: ['dodd', 'rojo'],
  },
  {
    id: 'macomber',
    name: 'Jeff Macomber',
    role: 'CDCR Secretary',
    agency: 'cdcr',
    cases: ['macomber', 'urrea', 'rojo', 'habeas'],
  },
  {
    id: 'urrea',
    name: 'Urrea',
    role: 'Parole Agent',
    agency: 'cdcr',
    cases: ['urrea'],
  },
  {
    id: 'candelaria',
    name: 'Candelaria',
    role: 'CDCR Agent',
    agency: 'cdcr',
    cases: ['candelaria'],
  },
  {
    id: 'gordon',
    name: 'Gordon',
    role: 'DMV Hearing Officer',
    agency: 'dmv',
    cases: ['candelaria'],
  },
]
