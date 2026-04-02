import { readJson, writeJson } from './json'
import type { ExperienceRow, PositionRow, ClientRow, ProjectRow } from '../../app/shared/types'
import type { AdminTables } from '../types'
import { ADMIN_DATA_PATHS } from '../constants'

export async function loadAdminTables(): Promise<AdminTables> {
  const [experiences, positions, clients, projects] = await Promise.all([
    readJson<ExperienceRow[]>(ADMIN_DATA_PATHS.experiences),
    readJson<PositionRow[]>(ADMIN_DATA_PATHS.positions),
    readJson<ClientRow[]>(ADMIN_DATA_PATHS.clients),
    readJson<ProjectRow[]>(ADMIN_DATA_PATHS.projects),
  ])
  return { experiences, positions, clients, projects }
}

export async function saveAdminTables(tables: AdminTables): Promise<void> {
  await Promise.all([
    writeJson(ADMIN_DATA_PATHS.experiences, tables.experiences),
    writeJson(ADMIN_DATA_PATHS.positions, tables.positions),
    writeJson(ADMIN_DATA_PATHS.clients, tables.clients),
    writeJson(ADMIN_DATA_PATHS.projects, tables.projects),
  ])
}

