import rawExperiences from './experiences.json'
import rawPositions from './positions.json'
import rawClients from './clients.json'
import rawProjects from './projects.json'
import type { ExperienceRow, PositionRow, ClientRow, ProjectRow } from '~/shared/types'

export const experiencesTable = rawExperiences as unknown as ExperienceRow[]
export const positionsTable = rawPositions as unknown as PositionRow[]
export const clientsTable = rawClients as unknown as ClientRow[]
export const projectsTable = rawProjects as unknown as ProjectRow[]

