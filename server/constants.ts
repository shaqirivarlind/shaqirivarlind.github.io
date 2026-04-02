import { join } from 'node:path'

export const ALLOWED_TYPES = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp']
export const ALLOWED_EXTS = ['.svg', '.png', '.jpg', '.jpeg', '.webp']
export const UPLOAD_DIR_PROJECTS = join(process.cwd(), 'public/images/projects')
export const UPLOAD_DIR_COMPANIES = join(process.cwd(), 'public/images/partners/companies')

export const ADMIN_DATA_PATHS = {
  companies: join(process.cwd(), 'app/shared/data/companies.json'),
  experiences: join(process.cwd(), 'app/shared/data/experiences.json'),
  positions: join(process.cwd(), 'app/shared/data/positions.json'),
  clients: join(process.cwd(), 'app/shared/data/clients.json'),
  projects: join(process.cwd(), 'app/shared/data/projects.json'),
  skills: join(process.cwd(), 'app/shared/data/skills.json'),
} as const