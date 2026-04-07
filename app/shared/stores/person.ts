import { defineStore } from 'pinia'
import type { DbJsonTablePayloadMap, DbJsonTableSaveDataMap, PersonRow } from '~/shared/types'
import { loadDbJsonTable, saveDbJsonTable } from '~/shared/services/db-json'

export type PersonState = {
  person: PersonRow | null
  loading: boolean
}

export const usePersonStore = defineStore('person', {
  state: (): PersonState => ({
    person: null,
    loading: false,
  }),

  getters: {
    getById: (state) => {
      return (_id: string): PersonRow | undefined => state.person ?? undefined
    },
    contacts: (state) => state.person?.contacts ?? [],
  },

  actions: {
    async fetchItems() {
      if (this.person != null) return
      this.loading = true
      try {
        const data: DbJsonTablePayloadMap['person'] = await loadDbJsonTable('person')
        this.person = data
      } finally {
        this.loading = false
      }
    },

    async addItem(item: PersonRow) {
      this.person = item
      const payload: DbJsonTableSaveDataMap['person'] = item
      await saveDbJsonTable('person', payload)
    },

    async updateItem(_id: string, patch: Partial<PersonRow>) {
      const base: PersonRow = this.person ?? ({} as PersonRow)
      const next: PersonRow = { ...base, ...patch } as PersonRow
      this.person = next
      const payload: DbJsonTableSaveDataMap['person'] = next
      await saveDbJsonTable('person', payload)
    },

    async removeItem(_id: string) {
      this.person = null
      const payload: DbJsonTableSaveDataMap['person'] = {}
      await saveDbJsonTable('person', payload)
    },
  },
})
