export enum AppTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

// Skills
export const SHOWN_SKILLS_ON_HOME = [
  'ai',
  'api',
  'backend',
  'build',
  'cms',
  'database',
  'design',
  'devops',
  'languages',
  'mobile',
  'state',
  'styling',
  'testing',
  'tools',
  'web',
] as const

type ShownSkillsCategory = (typeof SHOWN_SKILLS_ON_HOME)[number]

export const SHOWN_SKILLS_ON_HOME_LABEL: Record<ShownSkillsCategory, string> = {
  ai: 'AI',
  api: 'API',
  backend: 'Backend',
  build: 'Build',
  cms: 'CMS',
  database: 'Data',
  design: 'Design',
  devops: 'DevOps',
  languages: 'Languages',
  mobile: 'Mobile',
  state: 'State',
  styling: 'Styling',
  testing: 'Testing',
  tools: 'Tools',
  web: 'Web',
}

/**
 * Nitro JSON persistence (`server/api/load.get.ts`, `save.post.ts`).
 * Keys must stay aligned with `server/constants` `DB_PATHS`.
 */
export const DB_JSON_LOAD_PATH = '/api/load' as const
export const DB_JSON_SAVE_PATH = '/api/save' as const

export const DB_JSON_TABLE_KEYS = [
  'companies',
  'experiences',
  'positions',
  'clients',
  'projects',
  'skills',
  'person',
  'education',
  'certificates',
  'capabilities',
] as const
