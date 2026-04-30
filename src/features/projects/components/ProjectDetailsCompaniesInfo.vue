<template>
  <div v-if="company" class="d-flex align-center ga-3">
    <CompanyLogo :company="company" />
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
import type { Company } from "@/shared/type-data";
import CompanyLogo from "@/features/companies/components/CompanyLogo.vue";

const props = defineProps<{ companyId: string }>();

const companiesStore = useCompaniesStore();
const company = computed<Company | undefined>(() =>
  companiesStore.allCompanies.find((company) => company.id === props.companyId),
);
const companyLink = computed<string | null>(() => company.value?.links?.[0]?.url ?? null);
</script>
