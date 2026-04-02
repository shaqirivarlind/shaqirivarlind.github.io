// NOTE: This route only works in `nuxt dev`. It is not available in the static build.
import { randomUUID } from 'crypto'
import { loadAdminTables, saveAdminTables } from '../../../utils/admin-data'
import { experiencePayloadSchema } from '../../../utils/admin-schemas'
import { readBodyValidated } from '../../../utils/validate'

export default defineEventHandler(async (event) => {
  const id   = getRouterParam(event, 'id')
  const body = await readBodyValidated(event, experiencePayloadSchema)

  if (!id) {
    throw createError({ statusCode: 400, message: 'id is required' })
  }

  const tables = await loadAdminTables()

  const existing = tables.experiences.find((e) => e.id === id)
  if (!existing) {
    throw createError({ statusCode: 404, message: `Experience "${id}" not found` })
  }

  const positionsToRemove = new Set<string>(existing.positionIds ?? [])
  const clientsToRemove = new Set<string>()
  const projectsToRemove = new Set<string>()

  for (const pos of tables.positions) {
    if (!positionsToRemove.has(pos.id)) continue
    for (const cid of (pos.clientIds ?? [])) clientsToRemove.add(cid)
    for (const pid of (pos.projectIds ?? [])) projectsToRemove.add(pid)
  }
  for (const cl of tables.clients) {
    if (!clientsToRemove.has(cl.id)) continue
    for (const pid of (cl.projectIds ?? [])) projectsToRemove.add(pid)
  }

  tables.positions = tables.positions.filter((p) => !positionsToRemove.has(p.id))
  tables.clients = tables.clients.filter((c) => !clientsToRemove.has(c.id))
  tables.projects = tables.projects.filter((p) => !projectsToRemove.has(p.id))

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

  existing.companyId = body.companyId
  existing.positionIds = positionIds

  await saveAdminTables(tables)

  return { success: true }
})
