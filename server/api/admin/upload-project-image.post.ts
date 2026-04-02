// NOTE: This route only works in `nuxt dev`. It is not available in the static build.
import { randomBytes } from 'crypto'
import { writeFile, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'
import { ALLOWED_TYPES, ALLOWED_EXTS, UPLOAD_DIR_PROJECTS } from '../../constants'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  const file = form?.find((f) => f.name === 'file')

  if (!file || !file.filename || !file.data) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const ext = extname(file.filename).toLowerCase()
  if (!ALLOWED_EXTS.includes(ext) || !ALLOWED_TYPES.includes(file.type ?? '')) {
    throw createError({
      statusCode: 400,
      message: `${ALLOWED_EXTS.join(', ')} files are allowed`
    })
  }

  await mkdir(UPLOAD_DIR_PROJECTS, { recursive: true })

  // Use original filename (Option A), but strip any path segments for safety.
  const base = basename(file.filename, ext).toLowerCase().slice(0, 80) || 'image'
  const unique = `${Date.now()}-${randomBytes(4).toString('hex')}-${base}${ext}`
  await writeFile(join(UPLOAD_DIR_PROJECTS, unique), file.data)

  return { path: `/images/projects/${unique}` }
})
