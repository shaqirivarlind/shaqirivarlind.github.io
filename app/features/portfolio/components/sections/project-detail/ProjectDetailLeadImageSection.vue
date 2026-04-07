<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ projectId: string }>()

const projectsStore = useProjectsStore()

const project = computed(() => projectsStore.getById(props.projectId))
const heroImage = computed(() => project.value?.images[0])
</script>

<template>
  <v-sheet
    v-if="project && heroImage"
    rounded="xl"
    class="mb-10 overflow-hidden hero-shot"
    border
  >
    <v-img
      :src="heroImage"
      :alt="`${project.name} — main preview`"
      cover
      class="hero-shot__img"
    />
  </v-sheet>
</template>

<style scoped>
.hero-shot {
  background: rgb(var(--v-theme-surface-variant));
}

.hero-shot__img {
  min-height: min(52vw, 420px);
  max-height: 520px;
}
</style>
