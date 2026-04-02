// NOTE: This route only works in `nuxt dev`. It is not available in the static build.
import { writeFile, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'
import { ALLOWED_TYPES, ALLOWED_EXTS, UPLOAD_DIR_COMPANIES } from '../../constants'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  const file = form?.find(f => f.name === 'file')

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

  await mkdir(UPLOAD_DIR_COMPANIES, { recursive: true })

  // Use original filename (Option A), but strip any path segments for safety.
  const filename = basename(file.filename).toLowerCase()
  await writeFile(join(UPLOAD_DIR_COMPANIES, filename), file.data)

  return { path: `/images/partners/companies/${filename}` }
})
