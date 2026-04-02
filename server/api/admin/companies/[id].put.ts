// NOTE: This route only works in `nuxt dev`. It is not available in the static build.
import { readJson, writeJson } from '../../../utils/json'
import { ADMIN_DATA_PATHS } from '../../../constants'
import { companyPayloadSchema } from '../../../utils/admin-schemas'
import { readBodyValidated } from '../../../utils/validate'

export default defineEventHandler(async (event) => {
  const id   = getRouterParam(event, 'id')
  const body = await readBodyValidated(event, companyPayloadSchema)

  const current = await readJson<any[]>(ADMIN_DATA_PATHS.companies)
  const index = current.findIndex((company) => company.id === id)

  if (index === -1) {
    throw createError({ statusCode: 404, message: `Company "${id}" not found` })
  }

  current[index] = { ...body, id }
  await writeJson(ADMIN_DATA_PATHS.companies, current)

  return { success: true }
})
