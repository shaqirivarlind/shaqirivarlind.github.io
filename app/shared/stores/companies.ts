import { defineStore } from 'pinia'
import type { CompanyRow, DbJsonTablePayloadMap } from '~/shared/types'
import { loadDbJsonTable, saveDbJsonTable } from '~/shared/services/db-json'

export type CompaniesState = {
  companies: CompanyRow[]
  loading: boolean
}

export const useCompaniesStore = defineStore('companies', {
  state: (): CompaniesState => ({
    companies: [],
    loading: false,
  }),

  getters: {
    getById: (state) => {
      return (id: string): CompanyRow | undefined =>
        state.companies.find((item) => item.id === id)
    },
    itemCount: (state) => state.companies.length,
  },

  actions: {
    async fetchItems() {
      this.loading = true
      try {
        const data: DbJsonTablePayloadMap['companies'] = await loadDbJsonTable('companies')
        this.companies = data
      } finally {
        this.loading = false
      }
    },

    async addItem(item: CompanyRow) {
      this.companies = [...this.companies, item]
      await saveDbJsonTable('companies', this.companies)
    },

    async updateItem(id: string, patch: Partial<CompanyRow>) {
      const next = this.companies.map((item) =>
        item.id === id ? { ...item, ...patch } as CompanyRow : item,
      )
      this.companies = next
      await saveDbJsonTable('companies', this.companies)
    },

    async removeItem(id: string) {
      this.companies = this.companies.filter((item) => item.id !== id)
      await saveDbJsonTable('companies', this.companies)
    },
  },
})
