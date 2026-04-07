import type { ExperienceRow, PositionRow, ClientRow, ProjectRow } from '~/shared/types'

export type AdminExperienceDraft = {
  experience: ExperienceRow
  positions: PositionRow[]
  clients: ClientRow[]
  projects: ProjectRow[]
}

export type AdminAuthStorageShape = { ok: true; at: number }

/** Prefixes used for `crypto.randomUUID()` draft ids (must match Zod + JSON rows). */
export type AdminDraftIdPrefix = 'exp' | 'pos' | 'client' | 'prj'

