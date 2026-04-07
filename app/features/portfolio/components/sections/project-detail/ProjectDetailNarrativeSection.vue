<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ projectId: string }>()

const projectsStore = useProjectsStore()
const project = computed(() => projectsStore.getById(props.projectId))
</script>

<template>
  <v-row v-if="project" class="mb-8">
    <v-col cols="12" md="6">
      <v-card rounded="xl" elevation="1" class="pa-5 pa-sm-6 h-100">
        <h2 class="text-h6 font-weight-semibold text-high-emphasis">Overview</h2>
        <p class="text-body-2 text-medium-emphasis mt-4 project-body">
          {{ project.overview }}
        </p>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card rounded="xl" elevation="1" class="pa-5 pa-sm-6 h-100">
        <h2 class="text-h6 font-weight-semibold text-high-emphasis">Impact &amp; contributions</h2>
        <ul class="mt-4 pl-5 text-body-2 text-medium-emphasis">
          <li
            v-for="highlight in project.highlights"
            :key="highlight"
            class="project-list-item"
          >
            {{ highlight }}
          </li>
        </ul>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.project-body {
  line-height: 1.8;
}

.project-list-item {
  line-height: 1.75;
  margin-bottom: 6px;
}
</style>
