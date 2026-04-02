import type { PortfolioData } from '../types'
import { portfolioConfig } from '../constants'
import { resolveExperiences, flattenProjects } from '../utils'
import { person } from './person'
import { companies } from './companies'
import { experiences } from './experience'
import { education } from './education'
import { certificates } from './certificates'
import { capabilities } from './capabilities'

const resolvedExperiences = resolveExperiences(experiences, companies)

export const portfolioData: PortfolioData = {
  config:       portfolioConfig,
  person,
  companies,
  projects:     flattenProjects(resolvedExperiences),
  experiences:  resolvedExperiences,
  education,
  certificates,
  capabilities,
}
