import type { H3Event } from 'h3'
import { z, type ZodType } from 'zod'

export async function readBodyValidated<T>(event: H3Event, schema: ZodType<T>): Promise<T> {
  const body = await readBody(event)
  const result = schema.safeParse(body)

  if (!result.success) {
    throw createError({ statusCode: 400, message: 'Invalid request body' })
  }

  return result.data
}

