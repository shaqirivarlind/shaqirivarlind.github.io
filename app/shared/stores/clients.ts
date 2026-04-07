import { defineStore } from 'pinia'
import type { ClientRow, DbJsonTablePayloadMap } from '~/shared/types'
import { loadDbJsonTable, saveDbJsonTable } from '~/shared/services/db-json'

export type ClientsState = {
  items: ClientRow[]
  loading: boolean
}

export const useClientsStore = defineStore('clients', {
  state: (): ClientsState => ({
    items: [],
    loading: false,
  }),

  getters: {
    getById: (state) => {
      return (id: string): ClientRow | undefined =>
        state.items.find((item) => item.id === id)
    },
    /** Client engagements that include this project id. */
    listByProjectId: (state) => {
      return (projectId: string): ClientRow[] =>
        state.items.filter((item) => item.projectIds.includes(projectId))
    },
    itemCount: (state) => state.items.length,
  },

  actions: {
    async fetchItems() {
      this.loading = true
      try {
        const data: DbJsonTablePayloadMap['clients'] = await loadDbJsonTable('clients')
        this.items = data
      } finally {
        this.loading = false
      }
    },

    async addItem(item: ClientRow) {
      this.items = [...this.items, item]
      await saveDbJsonTable('clients', this.items)
    },

    async updateItem(id: string, patch: Partial<ClientRow>) {
      const next = this.items.map((item) =>
        item.id === id ? { ...item, ...patch } as ClientRow : item,
      )
      this.items = next
      await saveDbJsonTable('clients', this.items)
    },

    async removeItem(id: string) {
      this.items = this.items.filter((item) => item.id !== id)
      await saveDbJsonTable('clients', this.items)
    },
  },
})
