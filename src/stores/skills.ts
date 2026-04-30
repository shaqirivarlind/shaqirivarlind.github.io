import { defineStore } from "pinia";
import type { Skill } from "@/shared/type-data";
import type { SkillsState } from "./type-stores";
import { DbTableKey } from "@/shared/types";
import { loadContent } from "@/lib/content";

export const useSkillsStore = defineStore("skills", {
  state: (): SkillsState => ({
    skills: [],
    loading: false,
  }),

  getters: {
    skillById: (state) => (id: string) =>
      state.skills?.find((skill: Skill) => skill.id === id),
  },

  actions: {
    async fetchItems() {
      this.loading = true;
      try {
        this.skills = await loadContent<Skill[]>(DbTableKey.Skills);
      } finally {
        this.loading = false;
      }
    },
  },
});
