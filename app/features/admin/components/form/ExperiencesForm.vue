<template>
  <v-card rounded="xl" elevation="1" class="pa-6">
    <v-form @submit.prevent="submitHandler">

      <!-- Company Selection -->
      <v-row class="mb-4">
        <v-col cols="12" sm="8">
          <CompanyAutocomplete v-model:companyId="form.companyId" :companies="companies" />
        </v-col>
        <v-col cols="12" sm="4">
          <p class="text-caption text-disabled mt-3">
            ID: <span class="font-monospace text-medium-emphasis">{{ editingId || computedId || '—' }}</span>
          </p>
        </v-col>
      </v-row>

      <v-divider class="mb-4" />

      <!-- Positions -->
      <PositionsList
        :positions="form.positions"
        :make-position="makePosition"
        :all-categories="allCategories"
        :skills-by-category="skillsByCategory"
        :companies="companies"
        :make-project="makeProject"
        :make-client="makeClient"
      />

      <v-divider class="my-4" />

      <!-- Skills Section -->
      <div v-if="showSkillForm" class="mb-4">
        <slot name="skills" />
      </div>

      <!-- Footer Buttons -->
      <div class="d-flex align-center ga-3">
        <v-btn type="submit" :loading="submitting" color="primary" variant="elevated">
          {{ mode === 'edit' ? 'Save Changes' : 'Save Experience' }}
        </v-btn>
        <v-btn v-if="mode === 'edit'" variant="text" size="small" @click="cancelHandler">Cancel</v-btn>
        <v-btn v-if="mode === 'edit'" class="ml-auto" size="small" variant="outlined" color="error"
               @click="editingId && deleteHandler?.(editingId, form.companyId)">
          Delete this entry
        </v-btn>
        <v-btn v-if="mode === 'add'" variant="text" size="small" @click="resetForm?.()">Reset</v-btn>
      </div>

    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CompanyEntry, PositionForm, ProjectForm, ClientForm, SkillEntry } from '~/features/admin/types'
import PositionsList from '~/features/admin/components/PositionsList.vue'
import CompanyAutocomplete from '~/features/admin/components/CompanyAutocomplete.vue'

interface ExperienceFormState {
  companyId: string
  positions: PositionForm[]
}

interface Props {
  form: ExperienceFormState
  mode: 'add' | 'edit'
  editingId?: string | null
  submitHandler: () => Promise<void>
  cancelHandler?: () => void
  deleteHandler?: (id: string, companyId: string) => void
  companies: CompanyEntry[]
  makePosition: () => PositionForm
  allCategories: string[]
  skillsByCategory: Record<string, SkillEntry[]>
  makeProject: () => ProjectForm
  makeClient: () => ClientForm
  showSkillForm?: boolean
  resetForm?: () => void
}

const props = defineProps<Props>()
const {
  form,
  mode,
  editingId,
  submitHandler,
  cancelHandler,
  deleteHandler,
  companies,
  makePosition,
  allCategories,
  skillsByCategory,
  makeProject,
  makeClient,
  showSkillForm = false,
  resetForm,
} = props

const computedId = computed(() => {
  const selectedCompany = companies.find(c => c.id === form.companyId)
  return selectedCompany ? `${selectedCompany.name}-${Date.now()}` : ''
})

const submitting = ref(false)
</script>
