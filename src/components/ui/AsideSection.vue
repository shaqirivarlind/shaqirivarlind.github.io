<template>
  <v-sheet class="mb-5 print-no-break">
    <span
      class="text-uppercase text-overline text-label-small text-medium-emphasis"
      >{{ title }}</span
    >
    <v-divider class="opacity-30 mb-2" />
    <slot />
  </v-sheet>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>
