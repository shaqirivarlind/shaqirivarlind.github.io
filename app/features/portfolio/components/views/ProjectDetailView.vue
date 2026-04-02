<script setup lang="ts">
import { computed } from 'vue'
import { skillLabelById } from '~/shared/data/skills'
import type { Project } from '~/features/portfolio/types'
import PortfolioLayoutHeaderNav from '~/features/portfolio/components/layout/HeaderNav.vue'

const props = defineProps<{ slug: string }>()

const { portfolio } = usePortfolio()

const project = computed((): Project => {
  const found = portfolio.projects.find((item) => item.slug === props.slug)
  if (!found) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }
  return found
})

useHead({
  title: () => `${project.value.name} — Project`,
})
</script>

<template>
  <div>
    <PortfolioLayoutHeaderNav />

    <v-main>
      <v-container class="py-8" max-width="1000">
        <v-btn
          :to="'/#projects'"
          variant="text"
          prepend-icon="mdi-arrow-left"
          class="text-medium-emphasis mb-4"
        >
          Back to projects
        </v-btn>

        <v-card rounded="xl" elevation="1" class="pa-6 pa-sm-8 mb-6">
          <p class="text-overline text-medium-emphasis project-overline">Project details</p>
          <h1 class="text-h4 text-sm-h3 font-weight-black text-high-emphasis mt-3 project-title">
            {{ project.name }}
          </h1>
          <p class="text-body-1 text-medium-emphasis mt-4 project-lead">
            {{ project.description }}
          </p>

          <v-row class="mt-6">
            <v-col cols="12" md="6">
              <v-sheet rounded="lg" color="surface-variant" class="pa-4">
                <p class="text-overline text-disabled project-label">Company</p>
                <p class="text-subtitle-1 font-weight-semibold text-high-emphasis mt-2">
                  {{ project.company }}
                </p>
              </v-sheet>
            </v-col>
            <v-col cols="12" md="6">
              <v-sheet rounded="lg" color="surface-variant" class="pa-4">
                <p class="text-overline text-disabled project-label">Product</p>
                <p class="text-subtitle-1 font-weight-semibold text-high-emphasis mt-2">
                  {{ project.product }}
                </p>
              </v-sheet>
            </v-col>
          </v-row>

          <div class="d-flex flex-wrap ga-2 mt-6">
            <v-chip
              v-for="tech in project.stack"
              :key="tech"
              size="small"
              variant="tonal"
              color="secondary"
            >
              {{ skillLabelById[tech] ?? tech }}
            </v-chip>
          </div>
        </v-card>

        <v-row class="mb-6">
          <v-col cols="12" md="6">
            <v-card rounded="xl" elevation="1" class="pa-5 h-100">
              <h2 class="text-h6 font-weight-semibold text-high-emphasis">Overview</h2>
              <p class="text-body-2 text-medium-emphasis mt-3 project-body">
                {{ project.overview }}
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card rounded="xl" elevation="1" class="pa-5 h-100">
              <h2 class="text-h6 font-weight-semibold text-high-emphasis">Role &amp; Contributions</h2>
              <ul class="mt-3 pl-5 text-body-2 text-medium-emphasis">
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

        <v-card rounded="xl" elevation="1" class="pa-5">
          <h2 class="text-h6 font-weight-semibold text-high-emphasis">Project Images</h2>
          <p v-if="!project.images.length" class="text-body-2 text-medium-emphasis mt-2">
            Add screenshots from the experience admin (project form) to show them here.
          </p>
          <v-row class="mt-4">
            <template v-if="project.images.length">
              <v-col v-for="(image, imageIndex) in project.images" :key="image" cols="12" md="6">
                <v-img
                  :src="image"
                  :alt="`${project.name} preview ${imageIndex + 1}`"
                  height="208"
                  rounded="xl"
                  cover
                />
              </v-col>
            </template>
            <template v-else>
              <v-col v-for="n in 2" :key="n" cols="12" md="6">
                <v-sheet
                  rounded="xl"
                  border
                  height="208"
                  class="d-flex align-center justify-center image-placeholder border-dashed"
                  color="surface-variant"
                >
                  <v-icon icon="mdi-image-outline" size="40" class="text-disabled" />
                </v-sheet>
              </v-col>
            </template>
          </v-row>
        </v-card>
      </v-container>
    </v-main>
  </div>
</template>

<style scoped>
.project-overline {
  letter-spacing: 0.18em;
}

.project-title {
  line-height: 1.1;
}

.project-lead {
  max-width: 640px;
  line-height: 1.7;
}

.project-label {
  letter-spacing: 0.14em;
}

.project-body {
  line-height: 1.8;
}

.project-list-item {
  line-height: 1.8;
  margin-bottom: 4px;
}

.border-dashed {
  border-style: dashed;
}
</style>
