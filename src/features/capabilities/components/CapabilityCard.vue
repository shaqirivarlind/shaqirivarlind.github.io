<template>
  <div>
    <p class="mt-0 mb-4" style="font-size: 3.5rem; line-height: 1">
      {{ capability.icon }}
    </p>

    <h3 class="text-h6 font-weight-black mt-0 mb-4">
      {{ capability.title }}
    </h3>

    <div
      v-for="item in capability.items ?? []"
      :key="item"
      class="text-body-1 text-medium-emphasis"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Capability } from "@/shared/type-data";

defineProps<{ capability: Capability }>();
</script>
