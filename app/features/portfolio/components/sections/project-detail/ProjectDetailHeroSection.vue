<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ projectId: string }>()

const projectsStore = useProjectsStore()
const positionsStore = usePositionsStore()

const project = computed(() => projectsStore.getById(props.projectId))

const positionsForProject = computed(() =>
  positionsStore.listByProjectId(props.projectId),
)

const primaryRole = computed(
  () =>
    project.value?.role
    ?? positionsForProject.value[0]?.role
    ?? '',
)

const projectTimeline = computed(() => {
  const p = project.value
  if (!p) return ''
  if (p.startDate == null && p.endDate === undefined) return ''
  if (!p.startDate) return p.endDate ?? ''
  if (!p.endDate) return p.startDate
  return `${p.startDate} – ${p.endDate}`
})
</script>

<template>
  <header v-if="project" class="mb-8">
    <div class="d-flex flex-wrap align-center ga-2 mb-3">
      <v-chip
        v-if="project.featured"
        color="primary"
        size="small"
        variant="tonal"
      >
        Featured
      </v-chip>
      <span
        v-if="projectTimeline"
        class="text-caption text-medium-emphasis"
      >
        {{ projectTimeline }}
      </span>
      <span
        v-if="project.stack.length"
        class="text-caption text-medium-emphasis"
      >
        {{ project.stack.length }} technologies
      </span>
    </div>
    <p class="text-overline text-medium-emphasis project-overline mb-2">
      Case study
    </p>
    <h1 class="text-h4 text-md-h3 font-weight-black text-high-emphasis project-title">
      {{ project.name }}
    </h1>
    <p v-if="primaryRole" class="text-h6 text-medium-emphasis mt-3 font-weight-regular">
      {{ primaryRole }}
    </p>
    <p class="text-body-1 text-medium-emphasis mt-5 project-lead">
      {{ project.description }}
    </p>

    <div v-if="project.demoUrl || project.githubUrl" class="d-flex flex-wrap ga-3 mt-6">
      <v-btn
        v-if="project.demoUrl"
        :href="project.demoUrl"
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
        variant="flat"
        rounded="lg"
        size="large"
        prepend-icon="mdi-open-in-new"
      >
        View live
      </v-btn>
      <v-btn
        v-if="project.githubUrl"
        :href="project.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
        rounded="lg"
        size="large"
        prepend-icon="mdi-github"
      >
        Source code
      </v-btn>
    </div>
  </header>
</template>

<style scoped>
.project-overline {
  letter-spacing: 0.18em;
}

.project-title {
  line-height: 1.15;
}

.project-lead {
  max-width: 720px;
  line-height: 1.75;
}
</style>
