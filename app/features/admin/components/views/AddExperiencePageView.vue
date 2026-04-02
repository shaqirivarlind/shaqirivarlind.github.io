<script setup lang="ts">
import { ref, computed } from 'vue'
import AdminPasswordGate from '~/features/admin/components/PasswordGate.vue'
import AdminToast from '~/features/admin/components/Toast.vue'
import AdminExperienceFormFields from '~/features/admin/components/ExperienceFormFields.vue'
import AdminNewSkillForm from '~/features/admin/components/NewSkillForm.vue'

const LABELS = {
  pageTitle: 'Experience Admin',
  devNote: 'dev mode only · /add-new-experience',
  addExperience: 'Add New Experience',
  company: 'Company *',
  positions: 'Positions',
  addPosition: '+ Add position',
  skillsCatalog: 'Skills Catalog',
  addNewSkill: 'Add New Skill',
  addSkillToggleHide: '− Hide',
  addSkillToggleShow: '+ Add new skill to catalog',
  saveExperience: 'Save Experience',
  reset: 'Reset',
  logout: 'Logout',
} as const

const data = useAdminData()
const { companies, loading, toast, skillsByCategory, allCategories, showToast, loadData, deleteCompany: deleteCompanyFromData, companyById } = data

const { authenticated, passwordInput, passwordError, login, logout } = useAdminAuth(loadData)
const { form, makeProject, makeClient, makePosition, buildPayload, resetForm } = useAdminForm()

const companyItems = computed(() =>
  companies.value.map((company) => ({ value: company.id, title: company.name })),
)

const submitting = ref(false)
const addSkillOpen = ref(false)

const stackSkillFormRef = ref<{ reset: () => void } | null>(null)
const catalogSkillFormRef = ref<{ reset: () => void } | null>(null)

const addingSkill = ref(false)

async function submit(): Promise<void> {
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
    await $fetch('/api/admin/experiences', { method: 'POST', body: buildPayload() })
    showToast('Experience saved!', true)
    resetForm()
    await loadData()
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : (error as { data?: { message?: string } }).data?.message
    showToast(msg ?? 'Failed to save.', false)
  }
  submitting.value = false
}

/** Adds to `companies.json` and reloads; returns new id for employer or client pickers. */
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

async function addNewSkill(skillData: { id: string; label: string; category: string; orderWeight: number }): Promise<void> {
  if (!skillData.id || !skillData.label || !skillData.category) {
    showToast('ID, Label and Category are required.', false)
    return
  }
  addingSkill.value = true
  try {
    await $fetch('/api/admin/skills', { method: 'POST', body: skillData })
    showToast(`"${skillData.label}" added.`, true)
    stackSkillFormRef.value?.reset()
    catalogSkillFormRef.value?.reset()
    await loadData()
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : (error as { data?: { message?: string } }).data?.message
    showToast(msg ?? 'Failed.', false)
  }
  addingSkill.value = false
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
        <v-app-bar-title>
          <span class="text-body-1 font-weight-bold">{{ LABELS.pageTitle }}</span>
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

            <p class="text-subtitle-1 font-weight-semibold mb-4">{{ LABELS.addExperience }}</p>

            <v-card rounded="xl" elevation="1" class="pa-6 mb-10">
              <v-form @submit.prevent="submit">
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
                >
                  <template #after-positions>
                    <div class="mt-2 mb-4">
                      <v-btn
                        size="x-small"
                        variant="text"
                        class="text-disabled px-0"
                        @click="addSkillOpen = !addSkillOpen"
                      >
                        {{ addSkillOpen ? LABELS.addSkillToggleHide : LABELS.addSkillToggleShow }}
                      </v-btn>
                      <v-expand-transition>
                        <v-sheet v-if="addSkillOpen" color="surface-variant" rounded="lg" class="pa-3 mt-2">
                          <AdminNewSkillForm
                            ref="stackSkillFormRef"
                            :all-categories="allCategories"
                            :submitting="addingSkill"
                            @submit="addNewSkill"
                          />
                        </v-sheet>
                      </v-expand-transition>
                    </div>
                  </template>
                </AdminExperienceFormFields>

                <v-divider class="my-4" />

                <div class="d-flex align-center ga-3">
                  <v-btn type="submit" :loading="submitting" color="primary" variant="elevated">
                    {{ LABELS.saveExperience }}
                  </v-btn>
                  <v-btn variant="text" size="small" @click="resetForm">{{ LABELS.reset }}</v-btn>
                </div>
              </v-form>
            </v-card>

            <p class="text-subtitle-1 font-weight-semibold mb-4">{{ LABELS.skillsCatalog }}</p>

            <v-card rounded="xl" border elevation="0" class="pa-5">
              <div v-for="category in allCategories" :key="category" class="mb-4">
                <p class="text-overline text-disabled mb-2">{{ category }}</p>
                <div class="d-flex flex-wrap ga-1">
                  <v-chip
                    v-for="skill in skillsByCategory[category]"
                    :key="skill.id"
                    size="x-small"
                    variant="outlined"
                  >
                    <span class="font-monospace">{{ skill.id }}</span>
                    <span class="text-disabled ml-1">{{ skill.label }}</span>
                    <span class="text-disabled ml-1 opacity-50">{{ skill.orderWeight }}</span>
                  </v-chip>
                </div>
              </div>

              <v-divider class="my-4" />

              <p class="text-caption font-weight-semibold mb-3">{{ LABELS.addNewSkill }}</p>
              <AdminNewSkillForm
                ref="catalogSkillFormRef"
                :all-categories="allCategories"
                :submitting="addingSkill"
                @submit="addNewSkill"
              />
            </v-card>

          </template>
        </v-container>
      </v-main>
    </template>
  </div>
</template>
