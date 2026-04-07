import { mkdir, readdir, copyFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const fromDir = path.join(root, 'server', 'db')
const toDir = path.join(root, 'public', 'db')

await mkdir(toDir, { recursive: true })

const files = await readdir(fromDir)
const jsonFiles = files.filter((f) => f.endsWith('.json'))

await Promise.all(
  jsonFiles.map(async (file) => {
    await copyFile(path.join(fromDir, file), path.join(toDir, file))
  }),
)

console.log(`[sync-public-db] Copied ${jsonFiles.length} files to public/db`)

