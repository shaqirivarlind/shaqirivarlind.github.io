import type { SkillId } from '~/shared/types'

// ── Common ─────────────────────────────────────────────────────────────────────

export type Link      = { label: string; href: string }
export type DateRange = { startDate: string; endDate: string | null }

// ── Company ────────────────────────────────────────────────────────────────────

export type Company = {
  id: string
  name: string
  logoSrc?: string
  url?: string
}

// ── Embedded project (inside a position or client engagement) ──────────────────

export type EmbeddedProject = Partial<DateRange> & {
  slug: string
  name: string
  role?: string
  description: string
  product: string
  overview: string
  highlights: string[]
  outcomes?: string[]
  images: string[]
  stack: SkillId[]
  githubUrl?: string
  demoUrl?: string
  featured?: boolean
}

/** Display-ready project with company + role resolved from its parent. */
export type Project = Omit<EmbeddedProject, 'role'> & {
  role: string
  company: string
}

// ── Experience ─────────────────────────────────────────────────────────────────

export type EmploymentType  = 'full-time' | 'part-time' | 'contract' | 'freelance'
export type LocationType    = 'remote' | 'onsite' | 'hybrid'
export type CompanyWorkType = 'product' | 'outsource' | 'mixed'

/**
 * A client engagement stored in experience.json.
 * References a Company by id — resolved at build time.
 */
export type ClientEngagement = {
  companyId: string
  projects: EmbeddedProject[]
}

/**
 * A single position / role period at a company.
 * Adding a new Position captures a promotion, hours change, location change, etc.
 * Positions are ordered oldest → newest.
 */
export type Position = DateRange & {
  role: string
  employmentType: EmploymentType
  workType: CompanyWorkType
  locationType: LocationType
  location: string
  description: string
  highlights: string[]
  stack: SkillId[]
  projects?: EmbeddedProject[]   // workType: product | mixed
  clients?: ClientEngagement[]   // workType: outsource | mixed
}

/** Raw experience as stored in experience.json — references Company by id. */
export type Experience = {
  id: string
  companyId: string
  positions: Position[]
}

// ── Resolved types (company data joined in — used by portfolio components) ────

export type ResolvedClientEngagement = {
  company: Company
  projects: EmbeddedProject[]
}

export type ResolvedPosition = Omit<Position, 'clients'> & {
  clients?: ResolvedClientEngagement[]
}

export type ResolvedExperience = {
  id: string
  company: Company
  positions: ResolvedPosition[]
}

// ── Person ─────────────────────────────────────────────────────────────────────

type SocialPlatform = 'linkedin' | 'github' | 'gitlab' | 'twitter' | 'website' | 'email' | 'other'

export type SocialLink  = Link & { platform: SocialPlatform }
export type ContactItem = Link & { value: string }

export type Person = {
  fullName: string
  firstName: string
  lastName: string
  role: string
  tagline: string
  bio: string
  profileNote?: string
  profileImage: string
  location: string
  email: string
  phone?: string
  websiteUrl: string
  coreSkills: SkillId[]
  otherCompetencies: string[]
  socialLinks: SocialLink[]
  contacts: ContactItem[]
}

// ── Education ──────────────────────────────────────────────────────────────────

export type Education = {
  institution: string
  degree: string
  field: string
  startYear: number
  endYear: number
  description?: string
}

// ── Certificate ────────────────────────────────────────────────────────────────

export type Certificate = {
  title: string
  issuer: string
  date: string
  imageSrc?: string
  credentialId?: string
  verifyUrl?: string
  category?: string
}

// ── Portfolio aggregate ────────────────────────────────────────────────────────

type NavItem = Link

export type PortfolioConfig  = { navItems: NavItem[] }
export type CapabilityGroup  = { category: string; items: string[] }

export type PortfolioData = {
  config: PortfolioConfig
  person: Person
  companies: Company[]
  projects: Project[]
  experiences: ResolvedExperience[]
  education: Education[]
  certificates: Certificate[]
  capabilities: CapabilityGroup[]
}
