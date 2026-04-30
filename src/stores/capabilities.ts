import { defineStore } from "pinia";
import type { Capability } from "@/shared/type-data";
import type { CapabilitiesState } from "./type-stores";
import { DbTableKey } from "@/shared/types";
import { loadContent } from "@/lib/content";

export const useCapabilitiesStore = defineStore("capabilities", {
  state: (): CapabilitiesState => ({
    capabilities: [],
    loading: false,
  }),

  getters: {
    allCapabilities: (state) => state.capabilities ?? [],
  },

  actions: {
    async fetchItems() {
      this.loading = true;
      try {
        this.capabilities = await loadContent<Capability[]>(
          DbTableKey.Capabilities,
        );
      } finally {
        this.loading = false;
      }
    },
  },
});
