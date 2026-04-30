<template>
  <v-sheet
    class="d-flex align-center ga-2 text-body-small text-medium-emphasis mb-1"
  >
    Client:
    <a
      :href="client?.links?.[0]?.url"
      target="_blank"
      class="text-high-emphasis text-decoration-none text-body-medium d-flex align-center ga-1"
    >
      <v-img
        v-if="client?.logo"
        :src="client?.logo"
        :alt="client?.name"
        contain
        width="16"
        height="16"
      />
      <span>{{ client?.name }}</span>
    </a>

    <span>{{ client?.location }}</span>
  </v-sheet>
</template>

<script setup lang="ts">
import type { Client } from "@/shared/type-data";

const props = defineProps<{ clientId: string }>();

const clientsStore = useClientsStore();
const client = computed<Client | undefined>(() =>
  clientsStore.clientById(props.clientId),
);
</script>
