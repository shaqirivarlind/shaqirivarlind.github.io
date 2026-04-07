import { defineStore } from 'pinia'
import type { DbJsonTablePayloadMap, ExperienceRow } from '~/shared/types'
import { loadDbJsonTable } from '~/shared/services/db-json'

export type ExperiencesState = {
  experiences: ExperienceRow[]
  loading: boolean
}

export const useExperiencesStore = defineStore('experiences', {
  state: (): ExperiencesState => ({
    experiences: [],
    loading: false,
  }),

  getters: {
    getById: (state) => {
      return (id: string): ExperienceRow | undefined =>
        state.experiences.find((item) => item.id === id)
    },
    itemCount: (state) => state.experiences.length,
  },

  actions: {
    async fetchItems() {
      this.loading = true
      try {
        const data: DbJsonTablePayloadMap['experiences'] = await loadDbJsonTable('experiences')
        this.experiences = data
      } finally {
        this.loading = false
      }
    },

    async addItem(item: ExperienceRow) {
      this.experiences = [...this.experiences, item]
    },

    async updateItem(id: string, patch: Partial<ExperienceRow>) {
      const next = this.experiences.map((item) =>
        item.id === id ? { ...item, ...patch } as ExperienceRow : item,
      )
      this.experiences = next
    },

    async removeItem(id: string) {
      this.experiences = this.experiences.filter((item) => item.id !== id)
    },
  },
})
