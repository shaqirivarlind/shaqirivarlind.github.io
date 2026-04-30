<template>
  <v-sheet class="mt-3">
    <p class="text-body-medium text-medium-emphasis my-0">
      {{ role }} {{ tagline }}
      <br />
      {{ bio }}
    </p>
  </v-sheet>
</template>

<script setup lang="ts">
const personStore = usePersonStore();
const role = computed<string | undefined>(() => personStore.person?.role);
const tagline = computed<string | undefined>(() => personStore.person?.tagline);
const bio = computed<string | undefined>(() => personStore.person?.bio);
</script>
