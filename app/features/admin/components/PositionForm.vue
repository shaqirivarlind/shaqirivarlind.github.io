<script setup lang="ts">
import { computed } from 'vue'
import type { PositionForm, ProjectForm, ClientForm, SkillEntry, CompanyEntry } from '~/features/admin/types'
import { COUNTRIES, YEARS, ROLES, EMPLOYMENT_TYPES, WORK_TYPES, LOCATION_TYPES } from '~/features/admin/constants'
import AdminSkillPicker from '~/features/admin/components/SkillPicker.vue'
import AdminProjectForm from '~/features/admin/components/ProjectForm.vue'
import AdminClientForm from '~/features/admin/components/ClientForm.vue'

interface Props {
  position: PositionForm
  allCategories: string[]
  skillsByCategory: Record<string, SkillEntry[]>
  companies: CompanyEntry[]
  makeProject: () => ProjectForm
  makeClient: () => ClientForm
  /** Add employer-agnostic client company to catalog; returns new id. */
  onCreateClientCompany?: (input: { name: string }) => Promise<string | null>
}

const props = defineProps<Props>()

const { confirmRemove } = useAdminConfirmRemove()

const roleItems: string[] = [...ROLES]
const yearItems           = computed(() => YEARS.map((year) => ({ value: String(year), title: String(year) })))
const employmentTypeItems = computed(() => EMPLOYMENT_TYPES.map((t) => ({ value: t.value, title: t.label })))
const workTypeItems       = computed(() => WORK_TYPES.map((t) => ({ value: t.value, title: t.label })))
const locationTypeItems   = computed(() => LOCATION_TYPES.map((t) => ({ value: t.value, title: t.label })))

const composedLocation = computed(() => {
  const place = [props.position.locationCity, props.position.locationCountry].filter(Boolean).join(', ')
  const locationType = props.position.locationType
  if (locationType === 'remote') return place ? `Remote / ${place}` : 'Remote'
  if (locationType === 'hybrid') return place ? `Hybrid / ${place}` : 'Hybrid'
  return place
})

function clientTitle(client: ClientForm, index: number): string {
  const company = props.companies.find((c) => c.id === client.companyId)
  return company?.name || `Client ${index + 1}`
}

function addProject() {
  props.position.projects.push(props.makeProject())
}

function addClient() {
  props.position.clients.push(props.makeClient())
}

async function removeProjectAt(projectIndex: number): Promise<void> {
  const project = props.position.projects[projectIndex]
  const label = project?.name?.trim() || `Project ${projectIndex + 1}`
  if (!await confirmRemove('project', label)) return
  props.position.projects.splice(projectIndex, 1)
}

async function removeClientAt(clientIndex: number): Promise<void> {
  const client = props.position.clients[clientIndex]
  if (!client) return
  const label = clientTitle(client, clientIndex)
  if (!await confirmRemove('client', label)) return
  props.position.clients.splice(clientIndex, 1)
}
</script>

<template>
  <div>
    <v-row density="compact" class="mb-2">
      <v-col cols="12" sm="6">
        <v-autocomplete
          v-model="position.role"
          :items="roleItems"
          label="Role *"
          density="compact"
          variant="outlined"
          auto-select-first
        />
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          v-model="position.employmentType"
          :items="employmentTypeItems"
          item-value="value"
          item-title="title"
          label="Employment Type"
          density="compact"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          v-model="position.workType"
          :items="workTypeItems"
          item-value="value"
          item-title="title"
          label="Work Type"
          density="compact"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-row density="compact" class="mb-2">
      <v-col cols="12" sm="6">
        <div class="d-flex align-center ga-2">
          <v-select
            v-if="position.startYearOnly"
            v-model="position.startDate"
            :items="yearItems"
            item-value="value"
            item-title="title"
            label="Start Year *"
            density="compact"
            variant="outlined"
            hide-details
            class="flex-1-1"
          />
          <v-text-field
            v-else
            v-model="position.startDate"
            type="month"
            label="Start Date *"
            density="compact"
            variant="outlined"
            hide-details
            class="flex-1-1"
          />
          <v-checkbox v-model="position.startYearOnly" label="Year" density="compact" hide-details />
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="d-flex align-center ga-2">
          <v-text-field
            v-if="position.endPresent"
            model-value="Present"
            label="End Date"
            density="compact"
            variant="outlined"
            hide-details
            disabled
            class="flex-1-1"
          />
          <v-text-field
            v-else
            v-model="position.endDate"
            type="month"
            label="End Date"
            density="compact"
            variant="outlined"
            hide-details
            class="flex-1-1"
          />
          <v-checkbox v-model="position.endPresent" label="Present" density="compact" hide-details />
        </div>
      </v-col>
    </v-row>

    <v-row density="compact" class="mb-2">
      <v-col cols="12" sm="4">
        <v-select
          v-model="position.locationType"
          :items="locationTypeItems"
          item-value="value"
          item-title="title"
          label="Location Type"
          density="compact"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-autocomplete
          v-model="position.locationCountry"
          :items="COUNTRIES"
          label="Country"
          density="compact"
          variant="outlined"
          clearable
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="position.locationCity"
          label="City / Region"
          placeholder="Berlin"
          density="compact"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <p class="text-caption text-disabled">
          Composed: <span class="text-medium-emphasis">{{ composedLocation || '—' }}</span>
        </p>
      </v-col>
    </v-row>

    <v-row density="compact" class="mb-2">
      <v-col cols="12">
        <v-textarea
          v-model="position.description"
          label="Description (one sentence)"
          density="compact"
          variant="outlined"
          rows="2"
          auto-grow
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="position.highlights"
          label="Highlights (one per line)"
          density="compact"
          variant="outlined"
          rows="3"
          auto-grow
        />
      </v-col>
    </v-row>

    <div class="mt-1 mb-4">
      <p class="text-caption text-medium-emphasis mb-2">Stack</p>
      <AdminSkillPicker
        v-model="position.stack"
        :all-categories="allCategories"
        :skills-by-category="skillsByCategory"
      />
    </div>

    <template v-if="position.workType === 'product' || position.workType === 'mixed'">
      <v-divider class="mb-3" />
      <div class="d-flex align-center justify-space-between mb-2">
        <p class="text-caption text-medium-emphasis font-weight-semibold">Own Projects</p>
        <v-btn size="x-small" variant="tonal" @click="addProject">+ Add project</v-btn>
      </div>
      <v-expansion-panels multiple variant="accordion">
        <v-expansion-panel
          v-for="(project, projectIndex) in position.projects"
          :key="projectIndex"
          :value="projectIndex"
          rounded="lg"
        >
          <v-expansion-panel-title density="compact">
            <div class="d-flex align-center justify-space-between w-100 mr-2">
              <span class="text-body-2">{{ project.name || `Project ${projectIndex + 1}` }}</span>
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
              :years="YEARS"
              :all-categories="allCategories"
              :skills-by-category="skillsByCategory"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>

    <template v-if="position.workType === 'outsource' || position.workType === 'mixed'">
      <v-divider class="mb-3 mt-4" />
      <div class="d-flex align-center justify-space-between mb-2">
        <p class="text-caption text-medium-emphasis font-weight-semibold">Client Companies</p>
        <v-btn size="x-small" variant="tonal" @click="addClient">+ Add client</v-btn>
      </div>
      <v-expansion-panels multiple variant="accordion">
        <v-expansion-panel
          v-for="(client, clientIndex) in position.clients"
          :key="clientIndex"
          :value="clientIndex"
          rounded="lg"
        >
          <v-expansion-panel-title density="compact">
            <div class="d-flex align-center justify-space-between w-100 mr-2">
              <span class="text-body-2">{{ clientTitle(client, clientIndex) }}</span>
              <v-btn
                icon="mdi-close"
                size="x-small"
                variant="text"
                color="error"
                @click.stop="removeClientAt(clientIndex)"
              />
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <AdminClientForm
              :client="client"
              :years="YEARS"
              :all-categories="allCategories"
              :skills-by-category="skillsByCategory"
              :companies="companies"
              :make-project="makeProject"
              :on-create-company="onCreateClientCompany"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </div>
</template>
