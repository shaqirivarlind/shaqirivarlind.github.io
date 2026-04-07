import { defineStore } from 'pinia'
import type { DbJsonTablePayloadMap, Skill } from '~/shared/types'
import { loadDbJsonTable, saveDbJsonTable } from '~/shared/services/db-json'

export type SkillsState = {
  skills: Skill[]
  loading: boolean
}

export const useSkillsStore = defineStore('skills', {
  state: (): SkillsState => ({
    skills: [],
    loading: false,
  }),

  getters: {
    getById: (state) => {
      return (id: string): Skill | undefined =>
        state.skills.find((item) => item.id === id)
    },
    itemCount: (state) => state.skills.length,
  },

  actions: {
    async fetchItems() {
      this.loading = true
      try {
        const data: DbJsonTablePayloadMap['skills'] = await loadDbJsonTable('skills')
        this.skills = data
      } finally {
        this.loading = false
      }
    },

    async addItem(item: Skill) {
      this.skills = [...this.skills, item]
      await saveDbJsonTable('skills', this.skills)
    },

    async updateItem(id: string, patch: Partial<Skill>) {
      const next = this.skills.map((item) =>
        item.id === id ? { ...item, ...patch } as Skill : item,
      )
      this.skills = next
      await saveDbJsonTable('skills', this.skills)
    },

    async removeItem(id: string) {
      this.skills = this.skills.filter((item) => item.id !== id)
      await saveDbJsonTable('skills', this.skills)
    },
  },
})
