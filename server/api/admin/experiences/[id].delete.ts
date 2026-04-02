// NOTE: This route only works in `nuxt dev`. It is not available in the static build.
import { loadAdminTables, saveAdminTables } from '../../../utils/admin-data'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const tables = await loadAdminTables()

  const exp = tables.experiences.find((e) => e.id === id)
  if (!exp) {
    throw createError({ statusCode: 404, message: `Experience "${id}" not found` })
  }

  const positionsToRemove = new Set<string>(exp.positionIds ?? [])
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

  tables.experiences = tables.experiences.filter((e) => e.id !== id)
  tables.positions = tables.positions.filter((p) => !positionsToRemove.has(p.id))
  tables.clients = tables.clients.filter((c) => !clientsToRemove.has(c.id))
  tables.projects = tables.projects.filter((p) => !projectsToRemove.has(p.id))

  await saveAdminTables(tables)
  return { success: true }
})
