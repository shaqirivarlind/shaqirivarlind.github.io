<template>
  <ResumeListSection
    title="Education"
    :items="items"
    lines="three"
    item-style="min-height: unset; height: auto"
    title-class="text-body-medium overflow-visible text-pre-wrap"
  />
</template>

<script setup lang="ts">
import ResumeListSection from "./ResumeListSection.vue";
import type { ListItem } from "@/shared/types";

const personStore = usePersonStore();
const items = computed<ListItem[]>(() =>
  personStore.educations.map((edu) => ({
    primary: `${edu.degree}, ${edu.field}`,
    secondary: edu.institution,
  })),
);
</script>
