export default defineEventHandler(async (event) => {
  const body = await readBody(event) as { password?: unknown }
  const password = typeof body?.password === 'string' ? body.password : ''
  const expected = process.env.ADMIN_PASSWORD

  if (!expected) {
    throw createError({ statusCode: 500, message: 'ADMIN_PASSWORD is not set in .env' })
  }

  if (!password || password !== expected) {
    throw createError({ statusCode: 401, message: 'Incorrect password' })
  }

  return { ok: true }
})
