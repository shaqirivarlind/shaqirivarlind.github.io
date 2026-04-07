<script setup lang="ts">
import { useToast } from '~/shared/composables/useToast'

const { _state, hide } = useToast()
</script>

<template>
  <ClientOnly>
    <v-snackbar
      v-model="_state.open"
      :timeout="_state.timeout"
      :color="_state.color"
      location="bottom"
      @update:model-value="v => !v && hide()"
    >
      {{ _state.message }}
    </v-snackbar>
  </ClientOnly>
</template>

