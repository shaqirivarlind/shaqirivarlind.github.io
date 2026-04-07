import { defineStore } from 'pinia'
import type { CertificateRow, DbJsonTablePayloadMap } from '~/shared/types'
import { loadDbJsonTable, saveDbJsonTable } from '~/shared/services/db-json'

export type CertificatesState = {
  certifications: CertificateRow[]
  loading: boolean
}

/** Rows have no `id`; `getById` / `updateItem` / `removeItem` use numeric indices as strings (`"0"`, `"1"`, …). */
export const useCertificatesStore = defineStore('certificates', {
  state: (): CertificatesState => ({
    certifications: [],
    loading: false,
  }),

  getters: {
    itemCount: (state) => state.certifications.length,
  },

  actions: {
    async fetchItems() {
      this.loading = true
      try {
        const data: DbJsonTablePayloadMap['certificates'] = await loadDbJsonTable('certificates')
        this.certifications = data
      } finally {
        this.loading = false
      }
    },
  },
})
