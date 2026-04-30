<template>
  <v-sheet tag="section" color="background">
    <SectionHeader
      v-if="title || subtitle"
      :title="title"
      :subtitle="subtitle"
    />
    <slot />
    <div v-if="note" class="text-center mb-3">
      <span class="text-caption text-medium-emphasis">{{ note }}</span>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import type { SectionSheetProps } from "@/components/views/types";
import SectionHeader from "./SectionHeader.vue";

defineProps<SectionSheetProps>();
</script>
