<template>
  <v-container id="companies" class="py-8 py-md-16">
    <SectionSheet
      subtitle="At agency side, client side or as freelancer"
      :note="note"
    >
      <v-row class="justify-center">
        <v-col
          v-for="company in visibleGrid"
          :key="company.id"
          cols="6"
          sm="4"
          md="3"
          lg="2"
          class="d-flex justify-center align-center"
        >
          <CompanyLogo :company="company" />
        </v-col>
      </v-row>

      <div class="text-center mb-4">
        <v-btn
          v-if="hasMore || expanded"
          variant="text"
          @click="toggleExpanded"
        >
          {{ expanded ? "Show less" : "Show all partners" }}
        </v-btn>
      </div>
    </SectionSheet>
  </v-container>
</template>

<script setup lang="ts">
import type { Company } from "@/shared/type-data";
import { GRID_LIMIT, TEXT_LIMIT } from "../constants";
import SectionSheet from "@/components/ui/SectionSheet.vue";
import CompanyLogo from "./CompanyLogo.vue";

const companiesStore = useCompaniesStore();
const companies = computed<Company[]>(() => companiesStore.allCompanies);

const expanded = ref(false);

const visibleGrid = computed<Company[]>(() =>
  expanded.value ? companies.value : companies.value.slice(0, GRID_LIMIT),
);
const hasMore = computed<boolean>(() => companies.value.length > GRID_LIMIT);

const visibleText = computed<Company[]>(() => companies.value.slice(0, TEXT_LIMIT));
const hasMoreText = computed<boolean>(() => companies.value.length > TEXT_LIMIT);

const note = computed<string>(() => {
  const names = visibleText.value.map((company) => company.name).join(", ");
  return `Hired by creative, strategic and digital agencies, like ${names}${hasMoreText.value ? " and more" : ""}.`;
});

function toggleExpanded() {
  expanded.value = !expanded.value;
}
</script>
