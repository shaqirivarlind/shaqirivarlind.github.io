import { slugify } from '~/shared/utils/text'
import type { ProjectForm, ClientForm, PositionForm, RawProjectEntry, RawPositionEntry } from './types'

/** Picks a unique company id from the display name (slug), appending `-2`, `-3`, … if needed. */
export function uniqueCompanyIdFromName(name: string, existingIds: Iterable<string>): string {
  const base = slugify(name.trim()) || 'company'
  const set  = new Set(existingIds)
  let id     = base
  let n      = 2
  while (set.has(id)) {
    id = `${base}-${n++}`
  }
  return id
}

export function composeLocation(locationType: string, city: string, country: string): string {
  const place = [city, country].filter(Boolean).join(', ')
  if (locationType === 'remote') return place ? `Remote / ${place}` : 'Remote'
  if (locationType === 'hybrid') return place ? `Hybrid / ${place}` : 'Hybrid'
  return place
}

export function createProjectForm(): ProjectForm {
  return {
    name:          '',
    role:          '',
    product:       '',
    description:   '',
    overview:      '',
    highlights:    '',
    stack:         [],
    startDate:     '',
    startYearOnly: false,
    endDate:       '',
    endPresent:    false,
    githubUrl:     '',
    demoUrl:       '',
    featured:      true,
    images:        [],
  }
}

export function createClientForm(): ClientForm {
  return {
    companyId: '',
    projects:  [createProjectForm()],
  }
}

export function createPositionForm(): PositionForm {
  return {
    role:            '',
    employmentType:  'full-time',
    workType:        'product',
    startDate:       '',
    startYearOnly:   false,
    endDate:         '',
    endPresent:      false,
    locationType:    'remote',
    locationCountry: '',
    locationCity:    '',
    description:     '',
    highlights:      '',
    stack:           [],
    projects:        [],
    clients:         [],
  }
}

export function projectFormToPayload(projectForm: ProjectForm) {
  return {
    slug:        slugify(projectForm.name),
    name:        projectForm.name,
    ...(projectForm.role      ? { role:      projectForm.role      } : {}),
    product:     projectForm.product,
    description: projectForm.description,
    overview:    projectForm.overview,
    highlights:  projectForm.highlights
      .split('\n')
      .map((highlight) => highlight.trim())
      .filter(Boolean),
    images: [...projectForm.images],
    stack:  projectForm.stack,
    ...(projectForm.startDate ? { startDate: projectForm.startDate } : {}),
    endDate: projectForm.endPresent ? null : (projectForm.endDate || null),
    ...(projectForm.githubUrl ? { githubUrl: projectForm.githubUrl } : {}),
    ...(projectForm.demoUrl   ? { demoUrl:   projectForm.demoUrl   } : {}),
    featured: projectForm.featured,
  }
}

export function positionFormToPayload(positionForm: PositionForm) {
  const payload: Record<string, unknown> = {
    role:           positionForm.role,
    employmentType: positionForm.employmentType,
    workType:       positionForm.workType,
    startDate:      positionForm.startDate,
    endDate:        positionForm.endPresent ? null : (positionForm.endDate || null),
    location:       composeLocation(positionForm.locationType, positionForm.locationCity, positionForm.locationCountry),
    locationType:   positionForm.locationType,
    description:    positionForm.description,
    highlights:     positionForm.highlights
      .split('\n')
      .map((highlight) => highlight.trim())
      .filter(Boolean),
    stack: positionForm.stack,
  }

  if (positionForm.projects.length) {
    payload.projects = positionForm.projects.map(projectFormToPayload)
  }

  if (positionForm.clients.length) {
    payload.clients = positionForm.clients.map((client) => ({
      companyId: client.companyId,
      projects:  client.projects.map(projectFormToPayload),
    }))
  }

  return payload
}

export function rawProjectToForm(rawProject: RawProjectEntry): ProjectForm {
  return {
    name:          rawProject.name                              || '',
    role:          rawProject.role                              || '',
    product:       rawProject.product                          || '',
    description:   rawProject.description                      || '',
    overview:      rawProject.overview                         || '',
    highlights:    Array.isArray(rawProject.highlights)
      ? rawProject.highlights.join('\n')
      : (rawProject.highlights ?? ''),
    stack:         [...(rawProject.stack   || [])],
    startDate:     rawProject.startDate                        || '',
    startYearOnly: (rawProject.startDate   || '').length === 4,
    endDate:       rawProject.endDate                          || '',
    endPresent:    rawProject.endDate      === null,
    githubUrl:     rawProject.githubUrl                        || '',
    demoUrl:       rawProject.demoUrl                          || '',
    featured:      rawProject.featured                         ?? true,
    images:        [...(rawProject.images || [])],
  }
}

export function rawPositionToForm(rawPosition: RawPositionEntry): PositionForm {
  let rawLocation = rawPosition.location || ''
  if (rawLocation.startsWith('Remote / ') || rawLocation.startsWith('Hybrid / ')) {
    rawLocation = rawLocation.split(' / ')[1] || ''
  }
  const locationParts  = rawLocation.split(', ')
  const locationCountry = locationParts[locationParts.length - 1] || ''
  const locationCity    = locationParts.length >= 2 ? locationParts.slice(0, -1).join(', ') : ''

  return {
    role:            rawPosition.role           || '',
    employmentType:  rawPosition.employmentType || 'full-time',
    workType:        rawPosition.workType       || 'product',
    startDate:       rawPosition.startDate      || '',
    startYearOnly:   (rawPosition.startDate     || '').length === 4,
    endDate:         rawPosition.endDate        || '',
    endPresent:      rawPosition.endDate        === null,
    locationType:    rawPosition.locationType   || 'remote',
    locationCountry,
    locationCity,
    description:     rawPosition.description   || '',
    highlights:      (rawPosition.highlights   || []).join('\n'),
    stack:           [...(rawPosition.stack    || [])],
    projects:        (rawPosition.projects     || []).map(rawProjectToForm),
    clients:         (rawPosition.clients      || []).map((client) => ({
      companyId: client.companyId || '',
      projects:  (client.projects || []).map(rawProjectToForm),
    })),
  }
}

export function toggleSkillInStack(skillId: string, stack: string[]): void {
  const existingIndex = stack.indexOf(skillId)
  if (existingIndex === -1) {
    stack.push(skillId)
  } else {
    stack.splice(existingIndex, 1)
  }
}
