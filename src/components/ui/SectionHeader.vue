<template>
  <div class="text-center">
    <h2
      v-if="title"
      class="text-h5 text-sm-h4 font-weight-black text-high-emphasis mb-8 mt-0"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="text-body-1 text-medium-emphasis mx-auto mb-4 mt-0"
      style="max-width: 520px"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { SectionHeaderProps } from "@/components/views/types";

defineProps<SectionHeaderProps>();
</script>
