<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <section class="mb-5">
    <div class="d-flex align-center justify-space-between text-medium-emphasis">
      <span class="text-uppercase text-label-small text-overline">
        {{ title }}
      </span>
    </div>

    <v-divider class="opacity-30 mb-3" />

    <div>
      <slot />
    </div>
  </section>
</template>
