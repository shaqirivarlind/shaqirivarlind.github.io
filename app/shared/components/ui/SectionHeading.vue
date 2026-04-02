<script setup lang="ts">
import type { SectionHeadingProps } from '~/shared/types'

defineProps<SectionHeadingProps>()
</script>

<template>
  <div class="text-center mb-8">
    <h2 class="text-h5 text-sm-h4 font-weight-black text-high-emphasis">{{ title }}</h2>
    <p class="text-body-1 text-medium-emphasis mt-2 mx-auto" style="max-width: 520px">{{ subtitle }}</p>
  </div>
</template>
