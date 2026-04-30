<template>
  <div v-if="company" class="d-flex align-center ga-3">
      <v-img
        v-if="company?.logo"
        :src="company?.logo"
        :alt="company?.name"
        contain
        width="64"
      />
    <div>
      <a
        v-if="companyLink"
        :href="companyLink"
        target="_blank"
        rel="noopener"
        class="text-subtitle-2 font-weight-bold text-decoration-none text-high-emphasis cursor-pointer"
        >{{ company.name }}</a
      >
      <p v-else class="text-subtitle-2 font-weight-bold">{{ company.name }}</p>
      <p v-if="company.description" class="text-caption text-medium-emphasis">
        {{ company.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCompaniesStore } from "@/stores/companies";

const props = defineProps<{ companyId: string }>();

const companiesStore = useCompaniesStore();
const company = computed(() =>
  companiesStore.allCompanies.find((company) => company.id === props.companyId),
);
const companyLink = computed(() => company.value?.links?.[0]?.url ?? null);
</script>
