<script setup lang="ts">
import type { DialogListItem } from '~/shared/types'

const props = defineProps<{
  message?: string
  list?: DialogListItem[]
  label?: string
  onClose: (result?: void) => void
}>()
</script>

<template>
  <div>
    <p v-if="props.message" class="text-body-2 text-medium-emphasis">
      {{ props.message }}
    </p>

    <v-row v-if="props.list?.length">
      <v-col
        v-for="item in props.list"
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
            {{ item.name }}
          </span>
        </v-avatar>
        <p class="text-caption text-medium-emphasis">{{ item.name }}</p>
        <p v-if="item.subtitle" class="text-caption text-disabled">{{ item.subtitle }}</p>
      </v-col>
    </v-row>

    <div class="d-flex justify-end mt-4">
      <v-btn color="primary" variant="elevated" rounded="lg" @click="props.onClose()">
        {{ props.label ?? 'OK' }}
      </v-btn>
    </div>
  </div>
</template>

