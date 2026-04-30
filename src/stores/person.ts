import { defineStore } from "pinia";
import type { Certificate, Education, Person } from "@/shared/type-data";
import type { PersonState } from "./type-stores";
import { DbTableKey } from "@/shared/types";
import { loadContent } from "@/lib/content";

export const usePersonStore = defineStore("person", {
  state: (): PersonState => ({
    person: null,
    educations: [],
    certificates: [],
    loading: false,
  }),

  getters: {
    fullName: (state) =>
      `${state.person?.firstName ?? ""} ${state.person?.lastName ?? ""}`.trim(),

    contacts: (state) => state.person?.contacts ?? [],

    languages: (state) => state.person?.languages ?? [],
  },

  actions: {
    async fetchItems() {
      this.loading = true;
      try {
        this.person = await loadContent<Person>(DbTableKey.Person);
      } finally {
        this.loading = false;
      }
    },
    async fetchEducations() {
      this.loading = true;
      try {
        this.educations = await loadContent<Education[]>(DbTableKey.Education);
      } finally {
        this.loading = false;
      }
    },
    async fetchCertificates() {
      this.loading = true;
      try {
        this.certificates = await loadContent<Certificate[]>(
          DbTableKey.Certificates,
        );
      } finally {
        this.loading = false;
      }
    },
  },
});
