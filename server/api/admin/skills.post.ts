// NOTE: This route only works in `nuxt dev`. It is not available in the static build.
import { readJson, writeJson } from '../../utils/json'
import { ADMIN_DATA_PATHS } from '../../constants'
import { skillPayloadSchema } from '../../utils/admin-schemas'
import { readBodyValidated } from '../../utils/validate'

export default defineEventHandler(async (event) => {
  const { id, label, category, orderWeight } = await readBodyValidated(event, skillPayloadSchema)

  const skills = await readJson<{ id: string; label: string; category: string; orderWeight: number }[]>(
    ADMIN_DATA_PATHS.skills,
  )
  const idStr = String(id)

  if (skills.some((s) => s.id === idStr)) {
    throw createError({ statusCode: 409, message: `Skill "${idStr}" already exists` })
  }

  const weight = typeof orderWeight === 'number' && Number.isFinite(orderWeight) ? orderWeight : 50

  skills.push({ id: idStr, label: String(label), category: String(category), orderWeight: weight })
  await writeJson(ADMIN_DATA_PATHS.skills, skills)

  return { success: true }
})
