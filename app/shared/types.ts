import type { AppTheme } from './constants'
import type { Component, Reactive } from 'vue'
import { DB_JSON_TABLE_KEYS, SHOWN_SKILLS_ON_HOME } from './constants'
import type { Company, CompanyWorkType, EmploymentType, LocationType } from './shared.types'

export type ElementOf<T extends readonly unknown[]> = T[number]

// Theme
export type AppThemeName = `${AppTheme}`

export type DialogListItem = {
  name: string
  logoSrc?: string
  subtitle?: string
}

export type InfoOptions = {
  title: string
  componentProps?: {
    message?: string
    list?: DialogListItem[]
    label?: string
  }
}

export type DialogComponentOptions<TResult = unknown> = {
  title: string
  component: Component
  componentProps?: Record<string, unknown>
  maxWidth?: number | string
}

export type DialogOptions = DialogComponentOptions

export type DialogState = {
  open: boolean
  options: DialogOptions | null
  resolve: ((value: unknown) => void) | null
}

export interface UseDialogReturn {
  showComponent: <TResult = unknown>(
    options: DialogComponentOptions<TResult>,
  ) => Promise<TResult | undefined>
  _state: Reactive<DialogState>
  /** Ends the dialog and settles the `showComponent()` promise. */
  _finish: (value: unknown) => void
}

// Skills
export type Skill = {
  id: string
  label: string
  category: string
  orderWeight: number
}

export type SkillId = string

export type ShownSkillsOnHome = ElementOf<typeof SHOWN_SKILLS_ON_HOME>

// Uploads (client → Nitro `/api/upload-image`)
export type UploadImageKind = 'company' | 'project' | 'partner'

// Admin / portfolio JSON API (aligned with `DB_JSON_TABLE_KEYS`)
export type DbJsonTableKey = ElementOf<typeof DB_JSON_TABLE_KEYS>
export type DbJsonDocumentTableKey = 'person'

// Normalized experience tables
export type CompanyRow = Company

export type ExperienceRow = {
  id: string
  companyId: string
  positionIds: string[]
}

export type PositionRow = {
  id: string
  experienceId: string
  role: string
  employmentType: EmploymentType
  workType: CompanyWorkType
  startDate: string
  endDate: string | null
  locationType: LocationType
  location: string
  description: string
  highlights: string[]
  stack: string[]
  projectIds: string[]
  clientIds: string[]
}

export type ClientRow = {
  id: string
  positionId: string
  companyId: string
  projectIds: string[]
}

export type ProjectRow = {
  id: string
  slug: string
  name: string
  role?: string
  description: string
  product: string
  overview: string
  highlights: string[]
  images: string[]
  stack: string[]
  startDate?: string
  endDate?: string | null
  githubUrl?: string
  demoUrl?: string
  featured?: boolean
}

/** Normalized JSON bundle for experience CRUD (matches `experiences` + related tables). */
export type NormalizedExperienceBundle = {
  experiences: ExperienceRow[]
  positions: PositionRow[]
  clients: ClientRow[]
  projects: ProjectRow[]
}

/** One position row in the admin experience list (ids resolved to nested `ProjectRow`). */
export type AdminListPosition = {
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
  projects?: ProjectRow[]
  clients?: Array<{ companyId: string; projects: ProjectRow[] }>
}

/** Admin experience list entry (denormalized from `NormalizedExperienceBundle`). */
export type AdminExperienceListEntry = {
  id: string
  companyId: string
  positions: AdminListPosition[]
}

/** `education.json` rows (no stable `id`; list stores use numeric string indices for getById/update/remove). */
export type EducationRow = {
  institution: string
  degree: string
  field: string
  startYear: number
  endYear: number
}

export type CertificateRow = {
  title: string
  issuer: string
  date: string
  category: string
  credentialId?: string
  imageSrc?: string
  verifyUrl?: string
}

export type CapabilityRow = {
  category: string
  icon: string
  items: string[]
}

export type PersonContactRow = {
  label: string
  value: string
  href: string
  target: string | null
  platform: string
}

export type Language = {
  language: string
  level: string
}

export type PersonRow = {
  fullName: string
  firstName: string
  lastName: string
  role: string
  tagline: string
  bio: string
  profileNote: string
  location: string
  email: string
  phone: string
  websiteUrl: string
  coreSkills: string[]
  contacts: PersonContactRow[]
  languages: Language[]
}

/** Raw DB-shaped tables used to build public `PortfolioData` (before profile image injection). */
export type PortfolioJsonTables = {
  companies: CompanyRow[]
  experiences: ExperienceRow[]
  positions: PositionRow[]
  clients: ClientRow[]
  /** Omitted from public portfolio fetch; projects store loads via `loadDbJsonTable('projects')` / admin. */
  projects?: ProjectRow[]
  skills: Skill[]
  person: PersonRow
  education: EducationRow[]
  certificates: CertificateRow[]
}

/** Payload shape per table for typed loads (arrays vs single `person` document). */
export type DbJsonTablePayloadMap = {
  companies: CompanyRow[]
  experiences: ExperienceRow[]
  positions: PositionRow[]
  clients: ClientRow[]
  projects: ProjectRow[]
  skills: Skill[]
  person: PersonRow
  education: EducationRow[]
  certificates: CertificateRow[]
  capabilities: CapabilityRow[]
}

/** POST `/api/save` body: list tables match loaded arrays; `person` allows partial replace / `{}` clear. */
export type DbJsonTableSaveDataMap = {
  [K in DbJsonTableKey]: K extends DbJsonDocumentTableKey ? Partial<PersonRow> : DbJsonTablePayloadMap[K]
}

export type DbJsonSaveBody = {
  [K in DbJsonTableKey]: { key: K; data: DbJsonTableSaveDataMap[K] }
}[DbJsonTableKey]


