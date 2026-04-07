import { defineStore } from 'pinia'
import type { CapabilityRow, DbJsonTablePayloadMap } from '~/shared/types'
import { loadDbJsonTable } from '~/shared/services/db-json'

export type CapabilitiesState = {
  capabilities: CapabilityRow[]
  loading: boolean
}

export const useCapabilitiesStore = defineStore('capabilities', {
  state: (): CapabilitiesState => ({
    capabilities: [],
    loading: false,
  }),

  actions: {
    async fetchItems() {
      if (this.loading) return

      this.loading = true

      try {
        const data: DbJsonTablePayloadMap['capabilities'] =
          await loadDbJsonTable('capabilities')

        this.capabilities = data
      } finally {
        this.loading = false
      }
    },
  },
})