// NOTE: Only works in `nuxt dev`. Not available in the static build.
import { randomBytes } from 'node:crypto'
import { writeFile, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'
import { readMultipartFormData } from 'h3'
import {
  ALLOWED_TYPES,
  ALLOWED_EXTS,
  UploadKinds,
  UPLOAD_BY_KIND,
} from '../constants'
import { isUploadKind } from '../utils/storage'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  const file = form?.find((f) => f.name === 'file')
  const rawKind = form?.find((f) => f.name === 'kind')?.data?.toString('utf8') ?? ''

  if (!isUploadKind(rawKind)) {
    throw createError({
      statusCode: 400,
      message:    `kind must be "${UploadKinds.COMPANY}" or "${UploadKinds.PROJECT}" or "${UploadKinds.PARTNER}"`,
    })
  }

  if (!file?.filename || !file.data) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const ext = extname(file.filename).toLowerCase()
  if (!ALLOWED_EXTS.includes(ext) || !ALLOWED_TYPES.includes(file.type ?? '')) {
    throw createError({
      statusCode: 400,
      message: `${ALLOWED_EXTS.join(', ')} files are allowed`,
    })
  }

  const { dir, urlPrefix } = UPLOAD_BY_KIND[rawKind]
  const stem =
    basename(file.filename, ext)
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, '-')
      .slice(0, 64) || 'image'
  const storedName = `${Date.now()}-${randomBytes(4).toString('hex')}-${stem}${ext}`

  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, storedName), file.data)

  return { path: `${urlPrefix}/${storedName}` }
})
