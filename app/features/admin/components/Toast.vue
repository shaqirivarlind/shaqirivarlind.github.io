<script setup lang="ts">
interface Props {
  toast: { text: string; ok: boolean } | null
}

defineProps<Props>()
</script>

<template>
  <v-snackbar
    :model-value="toast !== null"
    :color="toast?.ok ? 'success' : 'error'"
    :timeout="4000"
    location="top right"
    rounded="lg"
  >
    {{ toast?.text }}
  </v-snackbar>
</template>
