<script setup lang="ts">
const { portfolio } = usePortfolio()
</script>

<template>
  <v-footer border="t" class="py-4">
    <v-container>
      <span class="text-caption text-medium-emphasis">
        © {{ new Date().getFullYear() }} {{ portfolio.person.fullName }}. Built with Nuxt and Vuetify.
      </span>
    </v-container>
  </v-footer>
</template>
