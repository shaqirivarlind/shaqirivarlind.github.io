import { defineStore } from "pinia";
import type { Company } from "@/shared/type-data";
import type { CompaniesState } from "./type-stores";
import { DbTableKey } from "@/shared/types";
import { loadContent } from "@/lib/content";

export const useCompaniesStore = defineStore("companies", {
  state: (): CompaniesState => ({
    companies: [],
    loading: false,
  }),

  getters: {
    allCompanies: (state) => state.companies ?? [],
    companyById: (state) => (id: string) =>
      state.companies.find((company: Company) => company.id === id),
  },

  actions: {
    async fetchItems() {
      this.loading = true;
      try {
        this.companies = await loadContent<Company[]>(DbTableKey.Companies);
      } finally {
        this.loading = false;
      }
    },
  },
});
