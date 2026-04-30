<template>
  <v-sheet>
    <h1 class="text-high-emphasis mt-0">
      {{ personStore.fullName }}
    </h1>
  </v-sheet>
</template>

<script setup lang="ts">
const personStore = usePersonStore();
</script>
