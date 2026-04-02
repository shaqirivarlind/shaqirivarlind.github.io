import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { SkillEntry, ExpEntry, CompanyEntry } from '../types'
import { TOAST_DURATION_MS } from '../constants'
import { Dialog } from '~/shared/constants'

/** Loads and manages experiences, companies, and skills data for the admin panel. */
export function useAdminData(): {
  experiences: Ref<ExpEntry[]>
  companies: Ref<CompanyEntry[]>
  skills: Ref<SkillEntry[]>
  loading: Ref<boolean>
  toast: Ref<{ text: string; ok: boolean } | null>
  skillsByCategory: ComputedRef<Record<string, SkillEntry[]>>
  allCategories: ComputedRef<string[]>
  companyById: ComputedRef<Map<string, CompanyEntry>>
  showToast: (text: string, isSuccess: boolean) => void
  loadData: () => Promise<void>
  deleteExperience: (experienceId: string, companyName: string) => Promise<boolean>
  deleteCompany: (companyId: string, companyName: string) => Promise<boolean>
} {
  const experiences = ref<ExpEntry[]>([])
  const companies   = ref<CompanyEntry[]>([])
  const skills      = ref<SkillEntry[]>([])
  const loading     = ref(false)
  const toast       = ref<{ text: string; ok: boolean } | null>(null)

  const skillsByCategory = computed(() => {
    const categoryMap: Record<string, SkillEntry[]> = {}
    for (const skill of skills.value) {
      ;(categoryMap[skill.category] ??= []).push(skill)
    }
    for (const category of Object.keys(categoryMap)) {
      categoryMap[category]!.sort((skillA, skillB) => skillB.orderWeight - skillA.orderWeight)
    }
    return categoryMap
  })

  const allCategories = computed(() => Object.keys(skillsByCategory.value))

  const companyById = computed(() => new Map(companies.value.map((company) => [company.id, company])))

  function showToast(text: string, isSuccess: boolean) {
    toast.value = { text, ok: isSuccess }
    setTimeout(() => { toast.value = null }, TOAST_DURATION_MS)
  }

  async function loadData() {
    loading.value = true
    try {
      ;[experiences.value, companies.value, skills.value] = await Promise.all([
        $fetch<ExpEntry[]>('/api/admin/experiences'),
        $fetch<CompanyEntry[]>('/api/admin/companies'),
        $fetch<SkillEntry[]>('/api/admin/skills'),
      ])
    } catch {
      showToast('Could not load data. Are you in dev mode?', false)
    }
    loading.value = false
  }

  async function deleteExperience(experienceId: string, companyName: string): Promise<boolean> {
    const { show } = useDialog()
    const confirmed = await show({
      type:         Dialog.CONFIRM,
      title:        `Are you sure you want to delete "${companyName}"?`,
      message:      `This will remove the experience (${experienceId}). This cannot be undone.`,
      confirmLabel: 'Delete',
    })
    if (!confirmed) return false
    try {
      await $fetch(`/api/admin/experiences/${experienceId}`, { method: 'DELETE' })
      showToast('Deleted.', true)
      await loadData()
      return true
    } catch {
      showToast('Failed to delete.', false)
      return false
    }
  }

  async function deleteCompany(companyId: string, companyName: string): Promise<boolean> {
    const { show } = useDialog()
    const confirmed = await show({
      type:         Dialog.CONFIRM,
      title:        `Are you sure you want to delete "${companyName}"?`,
      message:      `This will remove the company from the list (id: ${companyId}). This cannot be undone.`,
      confirmLabel: 'Delete',
    })
    if (!confirmed) return false
    try {
      await $fetch(`/api/admin/companies/${encodeURIComponent(companyId)}`, { method: 'DELETE' })
      showToast('Company removed.', true)
      await loadData()
      return true
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : (error as { data?: { message?: string } }).data?.message
      showToast(msg ?? 'Failed to remove company.', false)
      return false
    }
  }

  return {
    experiences,
    companies,
    skills,
    loading,
    toast,
    skillsByCategory,
    allCategories,
    companyById,
    showToast,
    loadData,
    deleteExperience,
    deleteCompany,
  }
}
