<template>
  <div class="d-flex align-center ga-2">
    <v-img
      v-if="company?.logo"
      :src="company?.logo"
      :alt="company?.name"
      contain
      max-width="20"
      max-height="20"
    />

    <a
      :href="company?.links?.[0]?.url"
      target="_blank"
      class="text-headline-small font-weight-bold text-high-emphasis text-decoration-none"
    >
      {{ company?.name }}
      <span class="text-title-small text-medium-emphasis"
        >/ {{ company?.location }}</span
      >
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Company } from "@/shared/type-data";
import { useCompaniesStore } from "@/stores/companies";

const props = defineProps<{ id: string }>();

const companiesStore = useCompaniesStore();
const company = computed<Company | undefined>(() =>
  companiesStore.companyById(props.id),
);
</script>
