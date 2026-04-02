<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ExpEntry } from '~/features/admin/types'
import AdminPasswordGate from '~/features/admin/components/PasswordGate.vue'
import AdminToast from '~/features/admin/components/Toast.vue'
import AdminExperienceFormFields from '~/features/admin/components/ExperienceFormFields.vue'

const LABELS = {
  pageTitle: 'Edit Experiences',
  editingPrefix: 'Editing:',
  devNote: 'dev mode only · /edit-experience',
  company: 'Company *',
  positions: 'Positions',
  addPosition: '+ Add position',
  saveChanges: 'Save Changes',
  cancel: 'Cancel',
  deleteEntry: 'Delete this entry',
  logout: 'Logout',
  edit: 'Edit',
  delete: 'Delete',
  noExperiences: 'No experiences found.',
} as const

const data = useAdminData()
const { experiences, companies, loading, toast, skillsByCategory, allCategories, showToast, loadData, deleteExperience: deleteExperienceFromData, deleteCompany: deleteCompanyFromData, companyById } = data

const { authenticated, passwordInput, passwordError, login, logout } = useAdminAuth(loadData)
const { form, makeProject, makeClient, makePosition, buildPayload, loadFromExperience } = useAdminForm()

type EditMode = 'list' | 'edit'
const editMode = ref<EditMode>('list')
const editingId = ref<string | null>(null)

const submitting = ref(false)

const companyItems = computed(() =>
  companies.value.map((company) => ({ value: company.id, title: company.name })),
)

function resolvedCompanyName(companyId: string): string {
  return companyById.value.get(companyId)?.name ?? companyId
}

function latestRole(experience: ExpEntry): string {
  return experience.positions.at(-1)?.role ?? '—'
}

function experienceStartDate(experience: ExpEntry): string {
  return experience.positions[0]?.startDate ?? '—'
}

function experienceEndDate(experience: ExpEntry): string | null {
  return experience.positions.at(-1)?.endDate ?? null
}

function startEdit(experience: ExpEntry): void {
  editingId.value = experience.id
  loadFromExperience(experience)
  editMode.value = 'edit'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function cancelEdit(): void {
  editMode.value = 'list'
  editingId.value = null
}

async function saveEdit(): Promise<void> {
  if (!form.value.companyId) {
    showToast('Company is required.', false)
    return
  }
  if (!form.value.positions.length || !form.value.positions[0]?.role || !form.value.positions[0]?.startDate) {
    showToast('At least one position with Role and Start Date is required.', false)
    return
  }
  submitting.value = true
  try {
    await $fetch(`/api/admin/experiences/${editingId.value}`, { method: 'PUT', body: buildPayload() })
    showToast('Saved!', true)
    await loadData()
    editMode.value = 'list'
    editingId.value = null
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : (error as { data?: { message?: string } }).data?.message
    showToast(msg ?? 'Failed to save.', false)
  }
  submitting.value = false
}

async function createCompanyInCatalog(input: { name: string }): Promise<string | null> {
  try {
    const res = await $fetch<{ success: boolean; id: string }>('/api/admin/companies', { method: 'POST', body: { name: input.name } })
    showToast(`Company "${input.name}" added.`, true)
    await loadData()
    return res.id
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : (error as { data?: { message?: string } }).data?.message
    showToast(msg ?? 'Failed to add company.', false)
    return null
  }
}

async function createCompany(input: { name: string }): Promise<boolean> {
  const id = await createCompanyInCatalog(input)
  if (id) {
    form.value.companyId = id
    return true
  }
  return false
}

async function handleDeleteCompany(companyId: string): Promise<boolean> {
  const name = companyById.value.get(companyId)?.name ?? companyId
  const ok = await deleteCompanyFromData(companyId, name)
  if (ok && form.value.companyId === companyId) {
    form.value.companyId = ''
  }
  return ok
}

async function deleteExperience(id: string, companyName: string): Promise<void> {
  const wasDeleted = await deleteExperienceFromData(id, companyName)
  if (wasDeleted && editingId.value === id) {
    editMode.value = 'list'
    editingId.value = null
  }
}

useHead({ title: LABELS.pageTitle })
</script>

<template>
  <div>
    <AdminPasswordGate
      v-if="!authenticated"
      v-model="passwordInput"
      :password-error="passwordError"
      @submit="login"
    />

    <template v-else>
      <AdminToast :toast="toast" />

      <v-app-bar elevation="0" border="b" color="surface">
        <template v-if="editMode === 'edit'" #prepend>
          <v-btn icon="mdi-arrow-left" variant="text" @click="cancelEdit" />
        </template>
        <v-app-bar-title>
          <span class="text-body-1 font-weight-bold">
            {{ editMode === 'list' ? LABELS.pageTitle : `${LABELS.editingPrefix} ${resolvedCompanyName(form.companyId)}` }}
          </span>
        </v-app-bar-title>
        <template #append>
          <span class="text-caption text-disabled mr-4">{{ LABELS.devNote }}</span>
          <v-btn size="small" variant="text" @click="logout">{{ LABELS.logout }}</v-btn>
        </template>
      </v-app-bar>

      <v-main>
        <v-container max-width="900" class="py-8">

          <v-progress-circular v-if="loading" indeterminate class="d-block mx-auto" />

          <template v-else>

            <template v-if="editMode === 'list'">
              <v-card
                v-for="experience in experiences"
                :key="experience.id"
                rounded="xl"
                border
                elevation="0"
                class="mb-2 px-4 py-3"
              >
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <p class="text-body-2 font-weight-medium">
                      {{ resolvedCompanyName(experience.companyId) }}
                    </p>
                    <p class="text-caption text-medium-emphasis">
                      {{ latestRole(experience) }} ·
                      {{ experienceStartDate(experience) }} –
                      {{ experienceEndDate(experience) ?? 'Present' }}
                    </p>
                    <p class="text-caption text-disabled font-monospace mt-0.5">
                      {{ experience.id }} · {{ experience.positions.length }} position{{ experience.positions.length !== 1 ? 's' : '' }}
                    </p>
                  </div>
                  <div class="d-flex ga-2 ml-4">
                    <v-btn size="small" variant="outlined" @click="startEdit(experience)">{{ LABELS.edit }}</v-btn>
                    <v-btn
                      size="small"
                      variant="outlined"
                      color="error"
                      @click="deleteExperience(experience.id, resolvedCompanyName(experience.companyId))"
                    >
                      {{ LABELS.delete }}
                    </v-btn>
                  </div>
                </div>
              </v-card>
              <p v-if="!experiences.length" class="text-caption text-disabled">{{ LABELS.noExperiences }}</p>
            </template>

            <v-card v-else rounded="xl" elevation="1" class="pa-6">
              <v-form @submit.prevent="saveEdit">
                <AdminExperienceFormFields
                  :form="form"
                  :company-items="companyItems"
                  :company-field-label="LABELS.company"
                  :positions-section-label="LABELS.positions"
                  :add-position-label="LABELS.addPosition"
                  :all-categories="allCategories"
                  :skills-by-category="skillsByCategory"
                  :companies="companies"
                  :make-position="makePosition"
                  :make-project="makeProject"
                  :make-client="makeClient"
                  :on-create-company="createCompany"
                  :on-delete-company="handleDeleteCompany"
                  :on-create-client-company="createCompanyInCatalog"
                />

                <v-divider class="my-4" />

                <div class="d-flex align-center ga-3">
                  <v-btn type="submit" :loading="submitting" color="primary" variant="elevated">
                    {{ LABELS.saveChanges }}
                  </v-btn>
                  <v-btn variant="text" size="small" @click="cancelEdit">{{ LABELS.cancel }}</v-btn>
                  <v-btn
                    class="ml-auto"
                    size="small"
                    variant="outlined"
                    color="error"
                    @click="deleteExperience(editingId!, resolvedCompanyName(form.companyId))"
                  >
                    {{ LABELS.deleteEntry }}
                  </v-btn>
                </div>
              </v-form>
            </v-card>

          </template>
        </v-container>
      </v-main>
    </template>
  </div>
</template>
