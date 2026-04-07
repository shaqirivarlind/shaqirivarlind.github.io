<template>
  <v-app>
    <NuxtPage />
    <UiDialog />
    <UiToast />
  </v-app>
</template>

<script setup lang="ts">
import UiDialog from '~/shared/components/Dialog.vue'
import UiToast from '~/shared/components/Toast.vue'
</script>
