import type { ExperienceRow, PositionRow, ClientRow, ProjectRow } from '../app/shared/types'

/** Normalized admin JSON tables (row shapes live in `app/shared/types.ts`). */
export type AdminTables = {
  experiences: ExperienceRow[]
  positions: PositionRow[]
  clients: ClientRow[]
  projects: ProjectRow[]
}
