<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectDetailCompanyContextLine } from '~/features/portfolio/types'
import { formatMonthRange } from '~/shared/utils/date'

const props = defineProps<{ projectId: string }>()

const experiencesStore = useExperiencesStore()
const positionsStore = usePositionsStore()
const clientsStore = useClientsStore()
const companiesStore = useCompaniesStore()
const projectsStore = useProjectsStore()

const project = computed(() => projectsStore.getById(props.projectId))

const positionsForProject = computed(() =>
  positionsStore.listByProjectId(props.projectId),
)

const clientRowsForProject = computed(() =>
  clientsStore.listByProjectId(props.projectId),
)

const companyContextLines = computed((): ProjectDetailCompanyContextLine[] => {
  const lines: ProjectDetailCompanyContextLine[] = []
  for (const pos of positionsForProject.value) {
    const exp = experiencesStore.getById(pos.experienceId)
    if (!exp) continue
    const company = companiesStore.getById(exp.companyId)
    if (!company) continue
    const tenure = formatMonthRange(pos.startDate, pos.endDate)
    lines.push({
      key: `employer-${pos.id}`,
      name: company.name,
      detail: `Employer — ${pos.role} (${tenure})`,
      logoSrc: company.logoSrc,
      url: company.url,
    })
  }
  for (const cl of clientRowsForProject.value) {
    const company = companiesStore.getById(cl.companyId)
    if (!company) continue
    lines.push({
      key: `client-${cl.id}`,
      name: company.name,
      detail: 'Client engagement',
      logoSrc: company.logoSrc,
      url: company.url,
    })
  }
  return lines
})
</script>

<template>
  <v-row v-if="project" class="mb-8">
    <v-col cols="12" md="7">
      <v-card rounded="xl" elevation="1" class="pa-5 pa-sm-6 h-100">
        <h2 class="text-subtitle-2 font-weight-semibold text-high-emphasis mb-1">
          Where this work happened
        </h2>
        <p class="text-caption text-medium-emphasis mb-4">
          Employers and clients tied to this project in your history.
        </p>
        <template v-if="companyContextLines.length">
          <div
            v-for="line in companyContextLines"
            :key="line.key"
            class="d-flex align-start mb-5 context-row"
          >
            <v-avatar
              v-if="line.logoSrc"
              rounded="lg"
              size="48"
              class="me-4 flex-shrink-0"
            >
              <v-img :src="line.logoSrc" :alt="line.name" cover />
            </v-avatar>
            <v-avatar
              v-else
              rounded="lg"
              size="48"
              color="surface-variant"
              class="me-4 flex-shrink-0"
            >
              <span class="text-caption font-weight-bold">
                {{ line.name.trim().charAt(0).toUpperCase() }}
              </span>
            </v-avatar>
            <div class="min-width-0">
              <a
                v-if="line.url"
                :href="line.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-subtitle-1 font-weight-semibold text-high-emphasis text-decoration-none link-accent"
              >
                {{ line.name }}
                <v-icon icon="mdi-open-in-new" size="16" class="ms-1 text-medium-emphasis" />
              </a>
              <p v-else class="text-subtitle-1 font-weight-semibold text-high-emphasis mb-0">
                {{ line.name }}
              </p>
              <p class="text-caption text-medium-emphasis mt-1 mb-0">
                {{ line.detail }}
              </p>
            </div>
          </div>
        </template>
        <p v-else class="text-body-2 text-medium-emphasis">
          No company linkage in data yet.
        </p>
      </v-card>
    </v-col>
    <v-col cols="12" md="5">
      <v-card rounded="xl" elevation="1" class="pa-5 pa-sm-6 h-100">
        <h2 class="text-subtitle-2 font-weight-semibold text-high-emphasis mb-1">
          Product / domain
        </h2>
        <p class="text-body-1 text-high-emphasis mt-3">
          {{ project.product }}
        </p>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.link-accent:hover {
  color: rgb(var(--v-theme-primary));
}

.min-width-0 {
  min-width: 0;
}

.context-row:last-child {
  margin-bottom: 0 !important;
}
</style>
