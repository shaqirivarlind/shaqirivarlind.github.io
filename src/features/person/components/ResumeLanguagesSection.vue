<template>
  <ResumeListSection title="Languages" :items="items" />
</template>

<script setup lang="ts">
import ResumeListSection from "./ResumeListSection.vue";
import type { ListItem } from "@/shared/types";

const personStore = usePersonStore();
const items = computed<ListItem[]>(() =>
  personStore.languages.map((lang) => ({
    primary: lang.language,
    secondary: lang.level,
  })),
);
</script>
