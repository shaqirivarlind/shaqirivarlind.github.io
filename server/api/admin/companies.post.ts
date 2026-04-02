// NOTE: This route only works in `nuxt dev`. It is not available in the static build.
import { randomUUID } from 'crypto'
import { readJson, writeJson } from '../../utils/json'
import { ADMIN_DATA_PATHS } from '../../constants'
import { companyPayloadSchema } from '../../utils/admin-schemas'
import { readBodyValidated } from '../../utils/validate'

export default defineEventHandler(async (event) => {
  const body = await readBodyValidated(event, companyPayloadSchema)

  const current = await readJson<any[]>(ADMIN_DATA_PATHS.companies)
  const id = randomUUID()

  current.push({ ...body, id })
  await writeJson(ADMIN_DATA_PATHS.companies, current)

  return { success: true, id }
})
