import { defineStore } from 'pinia'
import type { DbJsonTablePayloadMap, PositionRow } from '~/shared/types'
import { loadDbJsonTable, saveDbJsonTable } from '~/shared/services/db-json'

export type PositionsState = {
  items: PositionRow[]
  loading: boolean
}

export const usePositionsStore = defineStore('positions', {
  state: (): PositionsState => ({
    items: [],
    loading: false,
  }),

  getters: {
    getById: (state) => {
      return (id: string): PositionRow | undefined =>
        state.items.find((item) => item.id === id)
    },
    /** Positions that list this project on the product / in-house leg. */
    listByProjectId: (state) => {
      return (projectId: string): PositionRow[] =>
        state.items.filter((item) => item.projectIds.includes(projectId))
    },
    itemCount: (state) => state.items.length,
  },

  actions: {
    async fetchItems() {
      this.loading = true
      try {
        const data: DbJsonTablePayloadMap['positions'] = await loadDbJsonTable('positions')
        this.items = data
      } finally {
        this.loading = false
      }
    },

    async addItem(item: PositionRow) {
      this.items = [...this.items, item]
      await saveDbJsonTable('positions', this.items)
    },

    async updateItem(id: string, patch: Partial<PositionRow>) {
      const next = this.items.map((item) =>
        item.id === id ? { ...item, ...patch } as PositionRow : item,
      )
      this.items = next
      await saveDbJsonTable('positions', this.items)
    },

    async removeItem(id: string) {
      this.items = this.items.filter((item) => item.id !== id)
      await saveDbJsonTable('positions', this.items)
    },
  },
})
