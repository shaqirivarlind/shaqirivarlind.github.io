import { defineStore } from "pinia";
import type { Experiences } from "@/shared/type-data";
import { DbTableKey } from "@/shared/types";
import { loadContent } from "@/lib/content";
import type { ExperiencesState } from "./type-stores";

export const useExperiencesStore = defineStore("experiences", {
  state: (): ExperiencesState => ({
    experiences: [],
    loading: false,
  }),

  getters: {
    allVisibleExperiences: (state) =>
      state.experiences.filter((exp: Experiences) => exp.visible !== false),
  },

  actions: {
    async fetchItems() {
      this.loading = true;
      try {
        this.experiences = await loadContent<Experiences[]>(
          DbTableKey.Experiences,
        );
      } finally {
        this.loading = false;
      }
    },
  },
});
