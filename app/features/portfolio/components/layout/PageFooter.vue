<script setup lang="ts">
import { storeToRefs } from 'pinia'

const personStore = usePersonStore()
const { person } = storeToRefs(personStore)
</script>

<template>
  <v-footer v-if="person" border="t" class="py-4">
    <v-container>
      <span class="text-caption text-medium-emphasis">
        © {{ new Date().getFullYear() }} {{ person.fullName }}. Built with Nuxt and Vuetify.
      </span>
    </v-container>
  </v-footer>
</template>
