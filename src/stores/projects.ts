import { defineStore } from "pinia";
import type { Project } from "@/shared/type-data";
import type { ProjectState } from "./type-stores";
import { DbTableKey } from "@/shared/types";
import { loadContent } from "@/lib/content";

export const useProjectsStore = defineStore("project", {
  state: (): ProjectState => ({
    projects: [],
    loading: false,
  }),

  getters: {
    allProjects: (state) => state.projects ?? [],
    hideOnHomepage: (state) =>
      (state.projects ?? []).filter((p: Project) =>
        p.hideOnHomepage !== true,
      ),
    hideOnResume: (state) =>
      (state.projects ?? []).filter((p: Project) =>
        p.hideOnResume !== true,
      ),
    getById: (state) => {
      return (id: string): Project | undefined =>
        state.projects.find((item: Project) => item.id === id);
    },
    allSkills: (state): string[] => [
      ...new Set(
        state.projects.flatMap(
          (project: Project) => project.skillIds,
        ) as string[],
      ),
    ],
  },

  actions: {
    async fetchItems() {
      this.loading = true;
      try {
        this.projects = await loadContent<Project[]>(DbTableKey.Projects);
      } finally {
        this.loading = false;
      }
    },
  },
});
