import type { DbTableKey } from '../types'
import { DB_PATHS, UploadKinds } from '../constants'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { dirname } from 'path'

export function isUploadKind(value: string): value is UploadKinds {
  return (Object.values(UploadKinds) as string[]).includes(value)
}

export function isDbTableKey(key: string): key is DbTableKey {
  return key in DB_PATHS
}

export async function readJson<T>(filePath: string): Promise<T> {
  try {
    const raw = await readFile(filePath, 'utf8')
    return JSON.parse(raw) as T
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in "${filePath}": ${error.message}`)
    }

    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to read JSON "${filePath}": ${message}`)
  }
}


export async function writeJson<T>(filePath: string, data: T): Promise<void> {
  try {
    await mkdir(dirname(filePath), { recursive: true })
    const json = JSON.stringify(data, null, 2) + '\n'
    await writeFile(filePath, json, 'utf8')
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to write JSON "${filePath}": ${message}`)
  }
}
