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
  return dbJsonFetch<DbJsonTablePayloadMap[K]>(DB_JSON_LOAD_PATH, { query: { key } })
}

export async function saveDbJsonTable<K extends DbJsonTableKey>(
  key: K,
  data: DbJsonTableSaveDataMap[K],
): Promise<void> {
  const body = { key, data } as DbJsonSaveBody
  await dbJsonFetch<unknown>(DB_JSON_SAVE_PATH, { method: 'POST', body })
}
