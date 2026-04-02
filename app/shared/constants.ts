export enum AppTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export const Dialog = {
  CONFIRM: 'confirm',
  INFO: 'info',
} as const

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

export const SHOWN_SKILLS_ON_HOME_LABEL = {
  ai: 'AI',
  api: 'API',
  backend: 'Backend',
  build: 'Build',
  cms: 'CMS',
  database: 'Database',
  design: 'Design',
  devops: 'DevOps',
  languages: 'Languages',
  mobile: 'Mobile',
  state: 'State',
  styling: 'Styling',
  testing: 'Testing',
  tools: 'Tools',
  web: 'Web',
} satisfies Record<(typeof SHOWN_SKILLS_ON_HOME)[number], string>

