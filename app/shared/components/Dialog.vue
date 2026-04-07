<script setup lang="ts">
import { computed } from 'vue'
import { useDialog } from '~/shared/composables/useDialog'
import type { DialogComponentOptions } from '~/shared/types'

const { _state: dialogState, _finish: finishDialog } = useDialog()

const componentOptions = computed((): DialogComponentOptions | null => dialogState.options)

const dialogMaxWidth = computed((): number | string => {
  const o = dialogState.options
  if (!o) return 480
  return o.maxWidth ?? 560
})

function onDialogUpdate(open: boolean): void {
  if (!open) {
    finishDialog(undefined)
  }
}
</script>

<template>
  <ClientOnly>
    <v-dialog
      :model-value="dialogState.open"
      :max-width="dialogMaxWidth"
      persistent
      @update:model-value="onDialogUpdate"
    >
      <v-card v-if="dialogState.options" rounded="xl" elevation="8">

        <!-- Title -->
        <v-card-title class="d-flex align-center justify-space-between pt-5 px-6">
          <span class="text-h6 font-weight-semibold">{{ dialogState.options.title }}</span>
          <v-btn
            icon="mdi-close"
            size="small"
            variant="text"
            @click="finishDialog(undefined)"
          />
        </v-card-title>

        <v-card-text class="px-6 pb-2">
          <component
            v-if="componentOptions"
            :is="componentOptions.component"
            v-bind="{
              ...(componentOptions.componentProps ?? {}),
              onClose: (result?: unknown) => finishDialog(result),
            }"
          />
        </v-card-text>

      </v-card>
    </v-dialog>
  </ClientOnly>
</template>
