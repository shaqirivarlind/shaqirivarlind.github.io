import type { Experience } from '../types'
import { clientsTable, experiencesTable, positionsTable, projectsTable } from '~/shared/data/tables'

function mapById<T extends { id: string }>(rows: T[]): Map<string, T> {
  return new Map(rows.map((row) => [row.id, row]))
}

const positionsById = mapById(positionsTable)
const clientsById = mapById(clientsTable)
const projectsById = mapById(projectsTable)

// Source of truth is the normalized tables under shared/data/*.json (editable via admin in dev mode).
export const experiences = experiencesTable.map((exp): Experience => {
  const positions = exp.positionIds.map((positionId: string) => {
    const pos = positionsById.get(positionId)
    if (!pos) {
      throw new Error(`Position "${positionId}" not found for experience "${exp.id}"`)
    }

    const projects = pos.projectIds.length
      ? pos.projectIds.map((projectId: string) => {
        const p = projectsById.get(projectId)
        if (!p) throw new Error(`Project "${projectId}" not found for position "${pos.id}"`)
        return {
          slug: p.slug,
          name: p.name,
          ...(p.role ? { role: p.role } : {}),
          description: p.description,
          product: p.product,
          overview: p.overview,
          highlights: p.highlights,
          images: p.images,
          stack: p.stack as any,
          ...(p.githubUrl ? { githubUrl: p.githubUrl } : {}),
          ...(p.demoUrl ? { demoUrl: p.demoUrl } : {}),
          ...(p.startDate ? { startDate: p.startDate } : {}),
          ...(p.endDate === undefined ? {} : { endDate: p.endDate }),
          ...(p.featured === undefined ? {} : { featured: p.featured }),
        }
      })
      : undefined

    const clients = pos.clientIds.length
      ? pos.clientIds.map((clientId: string) => {
        const cl = clientsById.get(clientId)
        if (!cl) throw new Error(`Client "${clientId}" not found for position "${pos.id}"`)
        return {
          companyId: cl.companyId,
          projects: cl.projectIds.map((projectId: string) => {
            const p = projectsById.get(projectId)
            if (!p) throw new Error(`Project "${projectId}" not found for client "${cl.id}"`)
            return {
              slug: p.slug,
              name: p.name,
              ...(p.role ? { role: p.role } : {}),
              description: p.description,
              product: p.product,
              overview: p.overview,
              highlights: p.highlights,
              images: p.images,
              stack: p.stack as any,
              ...(p.githubUrl ? { githubUrl: p.githubUrl } : {}),
              ...(p.demoUrl ? { demoUrl: p.demoUrl } : {}),
              ...(p.startDate ? { startDate: p.startDate } : {}),
              ...(p.endDate === undefined ? {} : { endDate: p.endDate }),
              ...(p.featured === undefined ? {} : { featured: p.featured }),
            }
          }),
        }
      })
      : undefined

    return {
      role: pos.role,
      employmentType: pos.employmentType as any,
      workType: pos.workType as any,
      startDate: pos.startDate,
      endDate: pos.endDate,
      locationType: pos.locationType as any,
      location: pos.location,
      description: pos.description,
      highlights: pos.highlights,
      stack: pos.stack as any,
      ...(projects ? { projects } : {}),
      ...(clients ? { clients } : {}),
    }
  })

  return {
    id: exp.id,
    companyId: exp.companyId,
    positions,
  }
}) as Experience[]
