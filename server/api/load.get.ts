// Public read of CV JSON tables (portfolio SSG + admin load).
import { getQuery } from 'h3'
import { DB_PATHS } from '../constants'
import { isDbTableKey, readJson } from '../utils/storage'

export default defineEventHandler(async (event) => {
  const key = getQuery(event).key
  if (typeof key !== 'string' || !isDbTableKey(key)) {
    throw createError({ statusCode: 400, message: 'Missing or invalid key' })
  }
  return readJson(DB_PATHS[key])
})
