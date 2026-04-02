<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ClientForm, ProjectForm, SkillEntry, CompanyEntry } from '~/features/admin/types'
import AdminProjectForm from '~/features/admin/components/ProjectForm.vue'

const ADD_CLIENT_COMPANY = {
  item: 'Add new client company…',
  dialogTitle: 'New client company',
  name: 'Company name',
  create: 'Add to list',
  cancel: 'Cancel',
} as const

interface Props {
  client: ClientForm
  years: number[]
  allCategories: string[]
  skillsByCategory: Record<string, SkillEntry[]>
  companies: CompanyEntry[]
  makeProject: () => ProjectForm
  /**
   * POST company to the shared catalog; return the new id so the client field can select it.
   * Lets you add a client that is not the employer company (any name).
   */
  onCreateCompany?: (input: { name: string }) => Promise<string | null>
}

const props = defineProps<Props>()

const { confirmRemove } = useAdminConfirmRemove()

const companyItems = computed(() =>
  props.companies.map((company) => ({ value: company.id, title: company.name }))
)

const addCompanyOpen = ref(false)
const newCompanyName = ref('')
const creatingCompany = ref(false)

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
    const id = await fn({ name })
    if (id) {
      props.client.companyId = id
      closeAddCompanyDialog()
    }
  } finally {
    creatingCompany.value = false
  }
}

function addProject() {
  props.client.projects.push(props.makeProject())
}

function projectTitle(project: ProjectForm, index: number): string {
  return project.name || `Project ${index + 1}`
}

async function removeProjectAt(projectIndex: number): Promise<void> {
  const project = props.client.projects[projectIndex]
  if (!project) return
  const label = projectTitle(project, projectIndex)
  if (!await confirmRemove('project', label)) return
  props.client.projects.splice(projectIndex, 1)
}
</script>

<template>
  <div>
    <v-row density="comfortable" class="mb-3">
      <v-col cols="12">
        <v-autocomplete
          v-model="client.companyId"
          :items="companyItems"
          item-value="value"
          item-title="title"
          label="Client Company *"
          density="compact"
          variant="outlined"
          auto-select-first
          clearable
        >
          <template v-if="onCreateCompany" #prepend-item>
            <v-list-item
              :title="ADD_CLIENT_COMPANY.item"
              prepend-icon="mdi-plus-circle-outline"
              class="text-primary"
              @mousedown.prevent
              @click="openAddCompanyDialog"
            />
            <v-divider class="my-1" />
          </template>
        </v-autocomplete>
        <v-btn
          v-if="onCreateCompany"
          class="mt-1 px-0 text-none"
          size="small"
          variant="text"
          color="primary"
          prepend-icon="mdi-domain-plus"
          @click="openAddCompanyDialog"
        >
          {{ ADD_CLIENT_COMPANY.item }}
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="addCompanyOpen" max-width="480" persistent>
      <v-card rounded="xl">
        <v-card-title class="text-h6">{{ ADD_CLIENT_COMPANY.dialogTitle }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newCompanyName"
            :label="ADD_CLIENT_COMPANY.name"
            variant="outlined"
            density="comfortable"
            autofocus
            hide-details="auto"
            @keyup.enter="submitNewCompany"
          />
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn variant="text" @click="closeAddCompanyDialog">{{ ADD_CLIENT_COMPANY.cancel }}</v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            :loading="creatingCompany"
            :disabled="!newCompanyName.trim()"
            @click="submitNewCompany"
          >
            {{ ADD_CLIENT_COMPANY.create }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="d-flex align-center justify-space-between mb-2">
      <p class="text-caption text-medium-emphasis font-weight-semibold">Projects</p>
      <v-btn size="x-small" variant="tonal" @click="addProject">+ Add project</v-btn>
    </div>

    <v-expansion-panels multiple variant="accordion">
      <v-expansion-panel
        v-for="(project, projectIndex) in client.projects"
        :key="projectIndex"
        :value="projectIndex"
        rounded="lg"
      >
        <v-expansion-panel-title density="compact">
          <div class="d-flex align-center justify-space-between w-100 mr-2">
            <span class="text-body-2">{{ projectTitle(project, projectIndex) }}</span>
            <v-btn
              icon="mdi-close"
              size="x-small"
              variant="text"
              color="error"
              @click.stop="removeProjectAt(projectIndex)"
            />
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <AdminProjectForm
            :project="project"
            :years="years"
            :all-categories="allCategories"
            :skills-by-category="skillsByCategory"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
