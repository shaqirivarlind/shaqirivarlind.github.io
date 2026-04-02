import skillsCatalogJson from './skills.json'
import type { Skill } from '~/shared/types'

export const skillsCatalog = skillsCatalogJson as readonly Skill[]

export const skillLabelById = Object.fromEntries(
  skillsCatalog.map((skill) => [skill.id, skill.label])
) as Record<string, string>

