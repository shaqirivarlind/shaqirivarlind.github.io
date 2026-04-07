// NOTE: Only works in `nuxt dev` (or a Node host). Not available in pure static output.
import { DB_PATHS } from '../constants'
import { isDbTableKey, writeJson } from '../utils/storage'

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as { key?: unknown; data?: unknown }
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, message: 'Invalid body' })
  }
  const { key, data } = body
  if (typeof key !== 'string' || !isDbTableKey(key)) {
    throw createError({ statusCode: 400, message: 'Missing or invalid key' })
  }
  await writeJson(DB_PATHS[key], data)
  return { ok: true }
})
