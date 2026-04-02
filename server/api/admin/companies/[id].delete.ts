// NOTE: This route only works in `nuxt dev`. It is not available in the static build.
import { readJson, writeJson } from '../../../utils/json'
import { ADMIN_DATA_PATHS } from '../../../constants'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const [experiences, clients] = await Promise.all([
    readJson<{ companyId?: string }[]>(ADMIN_DATA_PATHS.experiences),
    readJson<{ companyId?: string }[]>(ADMIN_DATA_PATHS.clients),
  ])

  let employerUses = 0
  for (const entry of experiences) if (entry.companyId === id) employerUses++

  let clientUses = 0
  for (const entry of clients) if (entry.companyId === id) clientUses++

  if (employerUses > 0 || clientUses > 0) {
    const parts: string[] = []
    if (employerUses) parts.push(`${employerUses} experience${employerUses === 1 ? '' : 's'}`)
    if (clientUses) parts.push(`${clientUses} client engagement${clientUses === 1 ? '' : 's'}`)
    throw createError({
      statusCode: 409,
      message:    `Cannot delete: ${parts.join(' and ')} still use this company.`,
    })
  }

  const current = await readJson<any[]>(ADMIN_DATA_PATHS.companies)
  const updated = current.filter((company) => company.id !== id)

  if (updated.length === current.length) {
    throw createError({ statusCode: 404, message: `Company "${id}" not found` })
  }

  await writeJson(ADMIN_DATA_PATHS.companies, updated)
  return { success: true }
})
