import type { PositionRow } from '~/shared/types'
import type { Company } from '~/shared/shared.types'
import type { Experience, Project, ResolvedExperience, ResolvedPosition } from './types'

/** Resolve `positionIds` (experience row order) against loaded position rows. */
export function orderedPositionsByIds(
  positions: readonly PositionRow[],
  positionIds: readonly string[],
): PositionRow[] {
  const byId = new Map(positions.map((p) => [p.id, p] as const))
  return positionIds
    .map((id) => byId.get(id))
    .filter((p): p is PositionRow => p != null)
}

export function latestPositionRow(positions: readonly PositionRow[]): PositionRow | undefined {
  return positions.length ? positions[positions.length - 1] : undefined
}

export function experienceStartDateRows(positions: readonly PositionRow[]): string {
  return positions[0]?.startDate ?? ''
}

export function experienceEndDateRows(positions: readonly PositionRow[]): string | null {
  return latestPositionRow(positions)?.endDate ?? null
}

export function resolveExperiences(experiences: Experience[], companies: Company[]): ResolvedExperience[] {
  const companyById = new Map(companies.map((company) => [company.id, company]))

  return experiences.map((experience) => {
    const company = companyById.get(experience.companyId) ?? { id: experience.companyId, name: experience.companyId }

    const positions: ResolvedPosition[] = experience.positions.map((position) => ({
      ...position,
      clients: position.clients?.map((client) => ({
        company: companyById.get(client.companyId) ?? { id: client.companyId, name: client.companyId },
        projects: client.projects,
      })),
    }))

    return { id: experience.id, company, positions }
  })
}

export function latestPosition(experience: ResolvedExperience): ResolvedPosition {
  return experience.positions[experience.positions.length - 1]!
}

export function experienceStartDate(experience: ResolvedExperience): string {
  return experience.positions[0]!.startDate
}

export function experienceEndDate(experience: ResolvedExperience): string | null {
  return latestPosition(experience).endDate
}

export function flattenProjects(experiences: ResolvedExperience[]): Project[] {
  const projects: Project[] = []

  for (const experience of experiences) {
    for (const position of experience.positions) {
      const positionRole = position.role

      for (const project of position.projects ?? []) {
        if (project.featured === false) continue
        projects.push({
          ...project,
          images: project.images ?? [],
          company: experience.company.name,
          role:    project.role ?? positionRole,
        })
      }

      for (const client of position.clients ?? []) {
        for (const project of client.projects) {
          if (project.featured === false) continue
          projects.push({
            ...project,
            images: project.images ?? [],
            company: client.company.name,
            role:    project.role ?? positionRole,
          })
        }
      }
    }
  }

  return projects
}
