import { defineStore } from "pinia";
import type { Role } from "@/shared/type-data";
import type { RolesState } from "./type-stores";
import { DbTableKey } from "@/shared/types";
import { loadContent } from "@/lib/content";

export const useRolesStore = defineStore("roles", {
  state: (): RolesState => ({
    roles: [],
    loading: false,
  }),

  getters: {
    roleById: (state) => (id: string) =>
      state.roles.find((role: Role) => role.id === id),
  },

  actions: {
    async fetchItems() {
      this.loading = true;
      try {
        this.roles = await loadContent<Role[]>(DbTableKey.Roles);
      } finally {
        this.loading = false;
      }
    },
  },
});
