<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      :href="href"
      :target="target"
      :elevation="isHovering ? 4 : 1"
      rounded="xl"
      class="pa-4 text-decoration-none"
    >
      <p class="text-subtitle-2 font-weight-semibold text-high-emphasis">
        {{ title }}
      </p>
      <p
        class="text-body-2 text-medium-emphasis mt-1"
        style="word-break: break-all"
      >
        {{ value }}
      </p>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
import type { HoverLinkCardProps } from "@/components/views/types";

defineProps<HoverLinkCardProps>();
</script>
