// NOTE: This route only works in `nuxt dev`. It is not available in the static build.
import { readJson } from '../../utils/json'
import { ADMIN_DATA_PATHS } from '../../constants'

export default defineEventHandler(async () => {
  return await readJson<unknown>(ADMIN_DATA_PATHS.skills)
})
