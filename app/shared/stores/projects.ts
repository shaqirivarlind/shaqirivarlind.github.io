import { defineStore } from 'pinia'
import type { DbJsonTablePayloadMap, ProjectRow } from '~/shared/types'
import { loadDbJsonTable, saveDbJsonTable } from '~/shared/services/db-json'

export type ProjectsState = {
  projects: ProjectRow[]
  loading: boolean 
}

export const useProjectsStore = defineStore('projects', {
  state: (): ProjectsState => ({
    projects: [],
    loading: false,
  }),

  getters: {
    getById: (state) => {
      return (id: string): ProjectRow | undefined =>
        state.projects.find((item) => item.id === id)
    },
    getBySlug: (state) => {
      return (slug: string): ProjectRow | undefined =>
        state.projects.find((item) => item.slug === slug)
    },
    itemCount: (state) => state.projects.length,
    /** Unique skill ids used across projects (order: first appearance in project list). */
    allSkills: (state): string[] => [
      ...new Set(state.projects.flatMap((project) => project.stack ?? [])),
    ],
  },

  actions: {
    async fetchItems() {
      this.loading = true
      try {
        const data: DbJsonTablePayloadMap['projects'] = await loadDbJsonTable('projects')
        this.projects = Array.isArray(data) ? data : []
      } finally {
        this.loading = false
      }
    },

    /** Skips fetch if store already hydrated (e.g. `ingestPortfolioJsonTables`). */
    async ensureLoaded() {
      if (this.projects.length > 0) return
      await this.fetchItems()
    },

    async addItem(item: ProjectRow) {
      this.projects = [...this.projects, item]
      await saveDbJsonTable('projects', this.projects)
    },

    async updateItem(id: string, patch: Partial<ProjectRow>) {
      const next = this.projects.map((item) =>
        item.id === id ? { ...item, ...patch } as ProjectRow : item,
      )
      this.projects = next
      await saveDbJsonTable('projects', this.projects)
    },

    async removeItem(id: string) {
      this.projects = this.projects.filter((item) => item.id !== id)
      await saveDbJsonTable('projects', this.projects)
    },
  },
})
