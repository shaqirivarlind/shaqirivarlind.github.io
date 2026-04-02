import { z } from 'zod'

export const authBodySchema = z.object({
  password: z.string().min(1),
})
export type AuthBody = z.infer<typeof authBodySchema>

export const skillPayloadSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  category: z.string().min(1),
  orderWeight: z.coerce.number().finite().optional(),
})
export type SkillPayload = z.infer<typeof skillPayloadSchema>

export const companyPayloadSchema = z
  .object({
    name: z.string().min(1),
  })
  .passthrough()
export type CompanyPayload = z.infer<typeof companyPayloadSchema>

const projectSchema = z.record(z.unknown())

const clientSchema = z.object({
  companyId: z.string().min(1),
  projects: z.array(projectSchema).default([]),
})

const positionSchema = z.object({
  role: z.string().min(1),
  employmentType: z.string().min(1),
  workType: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1).nullable(),
  locationType: z.string().min(1),
  location: z.string().min(1),
  description: z.string(),
  highlights: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([]),
  projects: z.array(projectSchema).optional(),
  clients: z.array(clientSchema).optional(),
})

export const experiencePayloadSchema = z.object({
  companyId: z.string().min(1),
  positions: z.array(positionSchema).min(1),
})
export type ExperiencePayload = z.infer<typeof experiencePayloadSchema>

