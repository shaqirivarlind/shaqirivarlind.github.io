import { countries } from 'countries-list'

const baseCountries = [...new Set(Object.values(countries).map(country => country.name))]
export const COUNTRIES = [...baseCountries, 'Kosovo'].sort()

const NOW = new Date().getFullYear()
export const YEARS = Array.from({ length: NOW - 1990 + 3 }, (_, i) => NOW + 2 - i)

export const ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'Frontend Engineer',
  'Backend Engineer',
  'Software Engineer',
  'Software Engineer (Frontend Lead)',
  'Senior Frontend Developer',
  'Senior Backend Developer',
  'Senior Software Engineer',
  'Lead Frontend Developer',
  'Lead Backend Developer',
  'Lead Software Engineer',
  'Principal Engineer',
  'Staff Engineer',
  'Mobile Developer',
  'Mobile App Developer',
  'React Developer',
  'Vue Developer',
  'Angular Developer',
  'UI Developer',
  'UI/UX Developer',
  'Web Developer',
  'Fullstack Web Developer',
  'DevOps Engineer',
  'Cloud Engineer',
  'Platform Engineer',
  'Site Reliability Engineer',
  'Solutions Architect',
  'Tech Lead',
  'Engineering Manager',
  'Product Engineer',
  'Freelance Developer',
  'Contractor',
] as const

export const EMPLOYMENT_TYPES = [
  { value: 'full-time',  label: 'Full-time'  },
  { value: 'part-time',  label: 'Part-time'  },
  { value: 'contract',   label: 'Contract'   },
  { value: 'freelance',  label: 'Freelance'  },
] as const

export const WORK_TYPES = [
  { value: 'product',   label: 'Product'   },
  { value: 'outsource', label: 'Outsource' },
  { value: 'mixed',     label: 'Mixed'     },
] as const

export const LOCATION_TYPES = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'Onsite' },
] as const

export const TOAST_DURATION_MS    = 4000
export const DEFAULT_ORDER_WEIGHT = 50
