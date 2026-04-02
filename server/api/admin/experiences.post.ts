// NOTE: This route only works in `nuxt dev`. It is not available in the static build.
import { randomUUID } from 'crypto'
import { loadAdminTables, saveAdminTables } from '../../utils/admin-data'
import { experiencePayloadSchema } from '../../utils/admin-schemas'
import { readBodyValidated } from '../../utils/validate'

export default defineEventHandler(async (event) => {
  const body = await readBodyValidated(event, experiencePayloadSchema)

  const id = randomUUID()

  const tables = await loadAdminTables()

  const positionIds: string[] = []
  for (const pos of body.positions) {
    const positionId = randomUUID()
    positionIds.push(positionId)

    const projectIds: string[] = []
    for (const p of (pos.projects ?? [])) {
      const projectId = randomUUID()
      projectIds.push(projectId)
      tables.projects.push({ ...(p as Record<string, unknown>), id: projectId } as any)
    }

    const clientIds: string[] = []
    for (const cl of (pos.clients ?? [])) {
      const clientId = randomUUID()
      clientIds.push(clientId)

      const clientProjectIds: string[] = []
      for (const p of (cl.projects ?? [])) {
        const projectId = randomUUID()
        clientProjectIds.push(projectId)
        tables.projects.push({ ...(p as Record<string, unknown>), id: projectId } as any)
      }

      tables.clients.push({ id: clientId, positionId, companyId: cl.companyId, projectIds: clientProjectIds })
    }

    tables.positions.push({
      id: positionId,
      experienceId: id,
      role: pos.role,
      employmentType: pos.employmentType,
      workType: pos.workType,
      startDate: pos.startDate,
      endDate: pos.endDate ?? null,
      locationType: pos.locationType,
      location: pos.location,
      description: pos.description,
      highlights: pos.highlights ?? [],
      stack: pos.stack ?? [],
      projectIds,
      clientIds,
    })
  }

  // Newest first: prepend so admin list and portfolio (JSON order) show latest on top.
  tables.experiences.unshift({ id, companyId: body.companyId, positionIds })
  await saveAdminTables(tables)

  return { success: true, id }
})
