import { mkdir, readFile, writeFile } from 'fs/promises'
import { dirname } from 'path'

/**
 * Read a JSON file and parse it into `T`.
 * (For untrusted input, validate the parsed value with Zod.)
 */
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

/**
 * Write `data` to a JSON file (pretty-printed, with trailing newline).
 */
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
