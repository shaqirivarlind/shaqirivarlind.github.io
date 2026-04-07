<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ projectId: string }>()

const projectsStore = useProjectsStore()
const skillsStore = useSkillsStore()

const project = computed(() => projectsStore.getById(props.projectId))
</script>

<template>
  <v-card v-if="project" rounded="xl" elevation="1" class="pa-5 pa-sm-6 mb-8">
    <h2 class="text-h6 font-weight-semibold text-high-emphasis">Tech stack</h2>
    <p class="text-caption text-medium-emphasis mt-1 mb-4">
      Tools and technologies used on this project.
    </p>
    <div v-if="project.stack.length" class="d-flex flex-wrap ga-2">
      <v-chip
        v-for="techId in project.stack"
        :key="techId"
        size="default"
        variant="tonal"
        color="secondary"
        class="font-weight-medium"
      >
        {{ skillsStore.getById(techId)?.label ?? techId }}
      </v-chip>
    </div>
    <p v-else class="text-body-2 text-medium-emphasis">
      No stack listed yet.
    </p>
  </v-card>
</template>
