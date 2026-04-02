import { ref, type Ref } from 'vue'
import {
  createProjectForm,
  createClientForm,
  createPositionForm,
  positionFormToPayload,
  rawPositionToForm,
} from '../utils'
import type { PositionForm, ExpEntry } from '../types'

type ExperienceFormState = {
  companyId: string
  positions: PositionForm[]
}

type ExperiencePayload = {
  companyId: string
  positions: ReturnType<typeof positionFormToPayload>[]
}

/** Manages add/edit experience form state, payload construction, and reset logic. */
export function useAdminForm(): {
  form: Ref<ExperienceFormState>
  makeProject: typeof createProjectForm
  makeClient: typeof createClientForm
  makePosition: typeof createPositionForm
  buildPayload: () => ExperiencePayload
  resetForm: () => void
  loadFromExperience: (experience: ExpEntry) => void
} {
  const form = ref({
    companyId: '',
    positions: [createPositionForm()] as PositionForm[],
  })

  function buildPayload(): ExperiencePayload {
    return {
      companyId: form.value.companyId,
      positions: form.value.positions.map(positionFormToPayload),
    }
  }

  function resetForm(): void {
    form.value = {
      companyId: '',
      positions: [createPositionForm()],
    }
  }

  function loadFromExperience(experience: ExpEntry): void {
    form.value = {
      companyId: experience.companyId || '',
      positions: (experience.positions || []).map(rawPositionToForm),
    }
    if (!form.value.positions.length) {
      form.value.positions.push(createPositionForm())
    }
  }

  return {
    form,
    makeProject:  createProjectForm,
    makeClient:   createClientForm,
    makePosition: createPositionForm,
    buildPayload,
    resetForm,
    loadFromExperience,
  }
}
