<script setup lang="ts">
import { computed } from 'vue'
import { Dialog } from '~/shared/constants'
import type { ConfirmOptions, InfoOptions } from '~/shared/types'
import { initialsFor } from '~/shared/utils/text'

const { _state: dialogState, _respond: respondToDialog } = useDialog()

const confirmOptions = computed((): ConfirmOptions | null =>
  dialogState.options?.type === Dialog.CONFIRM ? dialogState.options : null,
)

const infoOptions = computed((): InfoOptions | null =>
  dialogState.options?.type === Dialog.INFO ? dialogState.options : null,
)
</script>

<template>
  <ClientOnly>
    <v-dialog
      :model-value="dialogState.open"
      :max-width="dialogState.options?.type === Dialog.INFO && dialogState.options?.list ? 720 : 480"
      persistent
      @update:model-value="v => !v && respondToDialog(false)"
    >
      <v-card v-if="dialogState.options" rounded="xl" elevation="8">

        <!-- Title -->
        <v-card-title class="d-flex align-center justify-space-between pt-5 px-6">
          <span class="text-h6 font-weight-semibold">{{ dialogState.options.title }}</span>
          <v-btn
            v-if="dialogState.options.type === Dialog.INFO"
            icon="mdi-close"
            size="small"
            variant="text"
            @click="respondToDialog(false)"
          />
        </v-card-title>

        <v-card-text class="px-6 pb-2">
          <!-- Text message -->
          <p
            v-if="dialogState.options.message"
            class="text-body-2 text-medium-emphasis"
          >
            {{ dialogState.options.message }}
          </p>

          <!-- List (INFO + list) -->
          <v-row v-if="dialogState.options.type === Dialog.INFO && dialogState.options.list?.length">
            <v-col
              v-for="item in dialogState.options.list"
              :key="item.name"
              cols="6"
              sm="4"
              md="3"
              class="text-center"
            >
              <v-img
                v-if="item.logoSrc"
                :src="item.logoSrc"
                :alt="item.name"
                height="48"
                contain
                class="mb-2"
              />
              <v-avatar v-else color="surface-variant" size="48" rounded="lg" class="mb-2">
                <span class="text-caption font-weight-bold text-medium-emphasis">
                  {{ initialsFor(item.name) }}
                </span>
              </v-avatar>
              <p class="text-caption text-medium-emphasis">{{ item.name }}</p>
              <p v-if="item.subtitle" class="text-caption text-disabled">{{ item.subtitle }}</p>
            </v-col>
          </v-row>
        </v-card-text>

        <!-- Actions -->
        <v-card-actions class="pa-4 pt-2 justify-end ga-2">
          <v-btn
            v-if="confirmOptions"
            variant="text"
            @click="respondToDialog(false)"
          >
            {{ confirmOptions.cancelLabel ?? 'Cancel' }}
          </v-btn>
          <v-btn
            :color="confirmOptions ? (confirmOptions.confirmColor ?? 'error') : 'primary'"
            variant="elevated"
            rounded="lg"
            @click="respondToDialog(true)"
          >
            {{
              confirmOptions
                ? (confirmOptions.confirmLabel ?? 'Confirm')
                : (infoOptions?.label ?? 'OK')
            }}
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </ClientOnly>
</template>
