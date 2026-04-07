// Shared models used by multiple packages (features + shared).

export type DateRange = { startDate: string; endDate: string | null }

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'freelance'
export type LocationType = 'remote' | 'onsite' | 'hybrid'
export type CompanyWorkType = 'product' | 'outsource' | 'mixed'

export type Company = {
  id: string
  name: string
  logoSrc?: string
  url?: string
}

