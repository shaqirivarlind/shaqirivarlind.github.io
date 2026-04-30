<template>
  <v-skeleton-loader v-if="loading" type="text" class="px-16" />
  <v-footer v-else border="t" class="pa-0" style="max-height: 55px">
    <v-container>
      <span class="text-caption text-medium-emphasis">
        © {{ new Date().getFullYear() }} {{ personStore.fullName }}. Built with
        Nuxt and Vuetify.
      </span>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const personStore = usePersonStore();
const loading = computed<boolean>(() => personStore.loading);
</script>
