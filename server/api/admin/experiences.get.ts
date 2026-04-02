// NOTE: This route only works in `nuxt dev`. It is not available in the static build.
import { loadAdminTables } from '../../utils/admin-data'

export default defineEventHandler(async () => {
  const { experiences, positions, clients, projects } = await loadAdminTables()

  const positionById = new Map(positions.map((p) => [p.id, p]))
  const clientById = new Map(clients.map((c) => [c.id, c]))
  const projectById = new Map(projects.map((p) => [p.id, p]))

  return experiences.map((exp) => ({
    id: exp.id,
    companyId: exp.companyId,
    positions: (exp.positionIds ?? [])
      .map((positionId: string) => {
        const pos = positionById.get(positionId)
        if (!pos) return null

        const denormProjects = (pos.projectIds ?? []).map((projectId: string) => projectById.get(projectId)).filter(Boolean)
        const denormClients = (pos.clientIds ?? []).map((clientId: string) => {
          const cl = clientById.get(clientId)
          if (!cl) return null
          const clientProjects = (cl.projectIds ?? []).map((projectId: string) => projectById.get(projectId)).filter(Boolean)
          return { companyId: cl.companyId, projects: clientProjects }
        }).filter(Boolean)

        return {
          role: pos.role,
          employmentType: pos.employmentType,
          workType: pos.workType,
          startDate: pos.startDate,
          endDate: pos.endDate,
          locationType: pos.locationType,
          location: pos.location,
          description: pos.description,
          highlights: pos.highlights ?? [],
          stack: pos.stack ?? [],
          ...(denormProjects.length ? { projects: denormProjects } : {}),
          ...(denormClients.length ? { clients: denormClients } : {}),
        }
      })
      .filter(Boolean),
  }))
})
