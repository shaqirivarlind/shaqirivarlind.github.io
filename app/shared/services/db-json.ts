import { DB_JSON_LOAD_PATH, DB_JSON_SAVE_PATH } from '~/shared/constants'
import type {
  DbJsonSaveBody,
  DbJsonTableKey,
  DbJsonTablePayloadMap,
  DbJsonTableSaveDataMap,
} from '~/shared/types'
import { dbJsonFetch } from '~/shared/utils/db-json-fetch'

export async function loadDbJsonTable<K extends DbJsonTableKey>(
  key: K,
): Promise<DbJsonTablePayloadMap[K]> {
  // GitHub Pages is static hosting (no Nitro `/api/*` at runtime).
  // - dev: use Nitro endpoints (`/api/load`)
  // - prod/static: read from generated static assets (`/db/<key>.json`)
  if (!import.meta.dev) {
    return dbJsonFetch<DbJsonTablePayloadMap[K]>(`/db/${key}.json`)
  }

  return dbJsonFetch<DbJsonTablePayloadMap[K]>(DB_JSON_LOAD_PATH, { query: { key } })
}

export async function saveDbJsonTable<K extends DbJsonTableKey>(
  key: K,
  data: DbJsonTableSaveDataMap[K],
): Promise<void> {
  // Prevent accidental writes in static/prod hosting.
  if (!import.meta.dev) {
    throw new Error('saveDbJsonTable is not available in production static builds')
  }
  const body = { key, data } as DbJsonSaveBody
  await dbJsonFetch<unknown>(DB_JSON_SAVE_PATH, { method: 'POST', body })
}
