import { defineStore } from "pinia";
import type { Client } from "@/shared/type-data";
import { DbTableKey } from "@/shared/types";
import { loadContent } from "@/lib/content";
import type { ClientsState } from "./type-stores";

export const useClientsStore = defineStore("clients", {
  state: (): ClientsState => ({
    clients: [],
    loading: false,
  }),

  getters: {
    clientById: (state) => (id: string) =>
      state.clients.find((client) => client.id === id),
  },

  actions: {
    async fetchItems() {
      this.loading = true;
      try {
        this.clients = await loadContent<Client[]>(DbTableKey.Clients);
      } finally {
        this.loading = false;
      }
    },
  },
});
