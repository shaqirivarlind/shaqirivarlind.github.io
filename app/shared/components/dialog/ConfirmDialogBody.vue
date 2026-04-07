<script setup lang="ts">
const props = defineProps<{
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  confirmColor?: string
  onClose: (result?: boolean) => void
}>()
</script>

<template>
  <div>
    <p v-if="props.message" class="text-body-2 text-medium-emphasis">
      {{ props.message }}
    </p>

    <div class="d-flex justify-end mt-4 ga-2">
      <v-btn variant="text" @click="props.onClose(false)">
        {{ props.cancelLabel ?? 'Cancel' }}
      </v-btn>
      <v-btn
        :color="props.confirmColor ?? 'error'"
        variant="elevated"
        @click="props.onClose(true)"
      >
        {{ props.confirmLabel ?? 'Confirm' }}
      </v-btn>
    </div>
  </div>
</template>

