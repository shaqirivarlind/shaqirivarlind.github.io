import { join } from 'node:path'

const db = (filename: string) => join(process.cwd(), 'server', 'db', filename)

export const DB_PATHS = {
  companies: db('companies.json'),
  experiences: db('experiences.json'),
  positions: db('positions.json'),
  clients: db('clients.json'),
  projects: db('projects.json'),
  skills: db('skills.json'),
  person: db('person.json'),
  education: db('education.json'),
  certificates: db('certificates.json'),
  capabilities: db('capabilities.json'),
} as const

export enum UploadKinds {
  COMPANY = 'company',
  PROJECT = 'project',
  PARTNER = 'partner',
}

export const ALLOWED_TYPES = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp']
export const ALLOWED_EXTS = ['.svg', '.png', '.jpg', '.jpeg', '.webp']

export const IMAGES_DIR = join(process.cwd(), 'public', 'images')

const uploadDirCompany = join(IMAGES_DIR, 'companies')
const uploadDirProject = join(IMAGES_DIR, 'projects')
const uploadDirPartners = join(IMAGES_DIR, 'partners')

export const UPLOAD_BY_KIND: Record<UploadKinds, { dir: string; urlPrefix: string }> = {
  [UploadKinds.COMPANY]: {
    dir:       uploadDirCompany,
    urlPrefix: '/images/companies',
  },
  [UploadKinds.PROJECT]: {
    dir:       uploadDirProject,
    urlPrefix: '/images/projects',
  },
  [UploadKinds.PARTNER]: {
    dir:       uploadDirPartners,
    urlPrefix: '/images/partners',
  },
}