import { authBodySchema } from '../../utils/admin-schemas'
import { readBodyValidated } from '../../utils/validate'

export default defineEventHandler(async (event) => {
  const { password } = await readBodyValidated(event, authBodySchema)
  const expected = process.env.ADMIN_PASSWORD

  if (!expected) {
    throw createError({ statusCode: 500, message: 'ADMIN_PASSWORD is not set in .env' })
  }

  if (password !== expected) {
    throw createError({ statusCode: 401, message: 'Incorrect password' })
  }

  return { ok: true }
})
