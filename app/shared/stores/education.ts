import { defineStore } from 'pinia'
import type { DbJsonTablePayloadMap, EducationRow } from '~/shared/types'
import { loadDbJsonTable, saveDbJsonTable } from '~/shared/services/db-json'

export type EducationState = {
  educations: EducationRow[]
  loading: boolean
}

/** Rows have no `id`; `getById` / `updateItem` / `removeItem` use numeric indices as strings (`"0"`, `"1"`, …). */
export const useEducationStore = defineStore('education', {
  state: (): EducationState => ({
    educations: [],
    loading: false,
  }),

  getters: {
    itemCount: (state) => state.educations.length,
  },

  actions: {
    async fetchItems() {
      this.loading = true
      try {
        const data: DbJsonTablePayloadMap['education'] = await loadDbJsonTable('education')
        this.educations = data
      } finally {
        this.loading = false
      }
    },
  },
})
