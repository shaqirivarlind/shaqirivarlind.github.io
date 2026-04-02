import type { AppTheme, Dialog } from './constants'
import type { Reactive } from 'vue'
import { SHOWN_SKILLS_ON_HOME } from './constants'

// Helpers (prefer derived unions over redeclared literals)
export type ValueOf<T> = T[keyof T]
export type ElementOf<T extends readonly unknown[]> = T[number]

// Theme
export type AppThemeName = `${AppTheme}`

// Dialog
export type DialogType = typeof Dialog[keyof typeof Dialog]

export type DialogListItem = {
  name: string
  logoSrc?: string
  subtitle?: string
}

export type ConfirmOptions = {
  type: typeof Dialog.CONFIRM
  title: string
  message?: string
  confirmLabel?: string
  confirmColor?: string
  cancelLabel?: string
}

export type InfoOptions = {
  type: typeof Dialog.INFO
  title: string
  message?: string
  list?: DialogListItem[]
  label?: string
}

export type DialogOptions = ConfirmOptions | InfoOptions

export type DialogState = {
  open: boolean
  options: DialogOptions | null
  resolve: ((value: boolean) => void) | null
}

export interface UseDialogReturn {
  show: {
    (options: ConfirmOptions): Promise<boolean>
    (options: InfoOptions): Promise<void>
    (options: DialogOptions): Promise<boolean | void>
  }
  Dialog: typeof Dialog
  _state: Reactive<DialogState>
  _respond: (value: boolean) => void
}

// Skills
export type Skill = {
  id: string
  label: string
  category: string
  orderWeight: number
}

export type SkillId = string

export type ShownSkillsOnHome = (typeof SHOWN_SKILLS_ON_HOME)[number]

// Normalized experience tables
export type ExperienceRow = {
  id: string
  companyId: string
  positionIds: string[]
}

export type PositionRow = {
  id: string
  experienceId: string
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

// UI
export type SectionHeadingProps = {
  title: string
  subtitle: string
}

