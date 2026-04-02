/** Skill as returned by the admin API (parsed from skills.ts source). */
export type SkillEntry = {
  id: string
  label: string
  category: string
  orderWeight: number
}

/** Company entity as stored in companies.json. */
export type CompanyEntry = {
  id: string
  name: string
  logoSrc?: string
  url?: string
}

/** Raw project shape as stored in JSON (not form state). */
export type RawProjectEntry = {
  name: string
  role?: string
  product?: string
  description?: string
  overview?: string
  /** Stored as newline-separated string or string[] in JSON. */
  highlights?: string | string[]
  stack?: string[]
  startDate?: string
  startYearOnly?: boolean
  endDate?: string
  endPresent?: boolean
  githubUrl?: string
  demoUrl?: string
  featured?: boolean
  /** Public URLs under `/images/projects/…` (or other static paths). */
  images?: string[]
}

/** Minimal experience summary used in the admin list view. */
export type ExpEntry = {
  id: string
  companyId: string
  positions: RawPositionEntry[]
}

export type RawPositionEntry = {
  role: string
  employmentType: string
  workType: string
  startDate: string
  endDate: string | null
  locationType: string
  location: string
  description: string
  highlights: string[]
  stack: string[]
  projects?: RawProjectEntry[]
  clients?: Array<{ companyId: string; projects: RawProjectEntry[] }>
}

/** Form state for a single project inside a position or client engagement. */
export type ProjectForm = {
  name: string
  role: string
  product: string
  description: string
  overview: string
  highlights: string
  stack: string[]
  startDate: string
  startYearOnly: boolean
  endDate: string
  endPresent: boolean
  githubUrl: string
  demoUrl: string
  featured: boolean
  images: string[]
}

/** Form state for a client engagement inside a position. */
export type ClientForm = {
  companyId: string
  projects: ProjectForm[]
}

/** Form state for a single position inside an experience. */
export type PositionForm = {
  role: string
  employmentType: string
  workType: string
  startDate: string
  startYearOnly: boolean
  endDate: string
  endPresent: boolean
  locationType: string
  locationCountry: string
  locationCity: string
  description: string
  highlights: string
  stack: string[]
  projects: ProjectForm[]
  clients: ClientForm[]
}

export type ExperienceFormModel = {
  companyId: string
  positions: PositionForm[]
}
