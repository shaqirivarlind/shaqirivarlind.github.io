<script setup lang="ts">
import { ref } from 'vue'
import AdminPositionForm from '~/features/admin/components/PositionForm.vue'
import type { CompanyEntry, PositionForm, ProjectForm, ClientForm, SkillEntry, ExperienceFormModel } from '~/features/admin/types'

const ADD_COMPANY = {
  item: 'Add new company…',
  dialogTitle: 'New company',
  name: 'Company name',
  create: 'Create company',
  cancel: 'Cancel',
} as const

const REMOVE_COMPANY = {
  label: 'Remove company from list',
} as const

interface Props {
  form: ExperienceFormModel
  companyItems: { value: string; title: string }[]
  companyFieldLabel: string
  positionsSectionLabel: string
  addPositionLabel: string
  allCategories: string[]
  skillsByCategory: Record<string, SkillEntry[]>
  companies: CompanyEntry[]
  makePosition: () => PositionForm
  makeProject: () => ProjectForm
  makeClient: () => ClientForm
  /**
   * POST new company then reload list. Return true on success so the field selects the new id.
   * The server id is derived from the name on the client.
   */
  onCreateCompany?: (input: { name: string }) => Promise<boolean>
  /** DELETE company after confirmation in the parent; return true on success. */
  onDeleteCompany?: (companyId: string) => Promise<boolean>
  /** For outsource clients: add any company name to the catalog; returns new id (does not change employer). */
  onCreateClientCompany?: (input: { name: string }) => Promise<string | null>
}

const props = defineProps<Props>()

const { confirmRemove } = useAdminConfirmRemove()

const addCompanyOpen = ref(false)
const newCompanyName = ref('')
const creatingCompany = ref(false)
const removingCompany = ref(false)

function openAddCompanyDialog(): void {
  newCompanyName.value = ''
  addCompanyOpen.value = true
}

function closeAddCompanyDialog(): void {
  addCompanyOpen.value = false
}

async function submitNewCompany(): Promise<void> {
  const fn = props.onCreateCompany
  if (!fn) return
  const name = newCompanyName.value.trim()
  if (!name) return
  creatingCompany.value = true
  try {
    const ok = await fn({ name })
    if (ok) closeAddCompanyDialog()
  } finally {
    creatingCompany.value = false
  }
}

async function removeSelectedCompany(): Promise<void> {
  const fn = props.onDeleteCompany
  const id = props.form.companyId
  if (!fn || !id) return
  removingCompany.value = true
  try {
    await fn(id)
  } finally {
    removingCompany.value = false
  }
}

async function removePositionAt(positionIndex: number): Promise<void> {
  const position = props.form.positions[positionIndex]
  const label = position?.role?.trim() || `Position ${positionIndex + 1}`
  if (!await confirmRemove('position', label)) return
  props.form.positions.splice(positionIndex, 1)
}
</script>

<template>
  <div>
    <v-row class="mb-4">
      <v-col cols="12" sm="8">
        <v-autocomplete
          v-model="form.companyId"
          :items="companyItems"
          item-value="value"
          item-title="title"
          :label="companyFieldLabel"
          density="comfortable"
          variant="outlined"
          auto-select-first
          clearable
        >
          <template v-if="onCreateCompany" #prepend-item>
            <v-list-item
              :title="ADD_COMPANY.item"
              prepend-icon="mdi-plus-circle-outline"
              class="text-primary"
              @mousedown.prevent
              @click="openAddCompanyDialog"
            />
            <v-divider class="my-1" />
          </template>
        </v-autocomplete>
        <div v-if="onCreateCompany || onDeleteCompany" class="d-flex flex-wrap align-center ga-2 mt-1">
          <v-btn
            v-if="onCreateCompany"
            class="px-0 text-none"
            size="small"
            variant="text"
            color="primary"
            prepend-icon="mdi-domain-plus"
            @click="openAddCompanyDialog"
          >
            {{ ADD_COMPANY.item }}
          </v-btn>
          <v-btn
            v-if="onDeleteCompany && form.companyId"
            class="px-0 text-none"
            size="small"
            variant="text"
            color="error"
            prepend-icon="mdi-delete-outline"
            :loading="removingCompany"
            @click="removeSelectedCompany"
          >
            {{ REMOVE_COMPANY.label }}
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="addCompanyOpen" max-width="480" persistent>
      <v-card rounded="xl">
        <v-card-title class="text-h6">{{ ADD_COMPANY.dialogTitle }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newCompanyName"
            :label="ADD_COMPANY.name"
            variant="outlined"
            density="comfortable"
            autofocus
            hide-details="auto"
            @keyup.enter="submitNewCompany"
          />
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn variant="text" @click="closeAddCompanyDialog">{{ ADD_COMPANY.cancel }}</v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            :loading="creatingCompany"
            :disabled="!newCompanyName.trim()"
            @click="submitNewCompany"
          >
            {{ ADD_COMPANY.create }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-divider class="mb-4" />

    <div class="d-flex align-center justify-space-between mb-3">
      <p class="text-caption text-medium-emphasis font-weight-semibold">{{ positionsSectionLabel }}</p>
      <v-btn size="x-small" variant="tonal" @click="form.positions.push(makePosition())">
        {{ addPositionLabel }}
      </v-btn>
    </div>

    <v-expansion-panels multiple variant="accordion" class="mb-4">
      <v-expansion-panel
        v-for="(position, positionIndex) in form.positions"
        :key="positionIndex"
        :value="positionIndex"
      >
        <v-expansion-panel-title>
          <div class="d-flex align-center justify-space-between w-100 mr-2">
            <div>
              <span class="text-body-2 font-weight-medium">
                {{ position.role || `Position ${positionIndex + 1}` }}
              </span>
              <span class="text-caption text-disabled ml-2">
                {{ position.startDate || '…' }} –
                {{ position.endPresent ? 'Present' : (position.endDate || '…') }}
              </span>
            </div>
            <v-btn
              icon="mdi-close"
              size="x-small"
              variant="text"
              color="error"
              @click.stop="removePositionAt(positionIndex)"
            />
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <AdminPositionForm
            :position="position"
            :all-categories="allCategories"
            :skills-by-category="skillsByCategory"
            :companies="companies"
            :make-project="makeProject"
            :make-client="makeClient"
            :on-create-client-company="onCreateClientCompany"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <slot name="after-positions" />
  </div>
</template>
