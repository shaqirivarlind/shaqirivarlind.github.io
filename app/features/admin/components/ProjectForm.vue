<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectForm, SkillEntry } from '~/features/admin/types'
import AdminProjectImagesEditor from '~/features/admin/components/ProjectImagesEditor.vue'
import AdminSkillPicker from '~/features/admin/components/SkillPicker.vue'

interface Props {
  project: ProjectForm
  years: number[]
  allCategories: string[]
  skillsByCategory: Record<string, SkillEntry[]>
}

const props = defineProps<Props>()

const yearItems = computed(() => props.years.map(year => ({ value: String(year), title: String(year) })))

function onStackChange(newStack: string[]) {
  props.project.stack.splice(0, props.project.stack.length, ...newStack)
}
</script>

<template>
  <v-row density="comfortable">
    <v-col cols="12" sm="6">
      <v-text-field v-model="project.name" label="Name *" density="compact" variant="outlined" />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="project.product" label="Product / Platform" density="compact" variant="outlined" />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="project.role" label="Role (blank = inherit)" density="compact" variant="outlined" />
    </v-col>
    <v-col cols="12" sm="6">
      <div class="d-flex align-center ga-2">
        <v-select
          v-if="project.startYearOnly"
          v-model="project.startDate"
          :items="yearItems"
          item-value="value"
          item-title="title"
          label="Start Year"
          density="compact"
          variant="outlined"
          hide-details
          class="flex-1-1"
        />
        <v-text-field
          v-else
          v-model="project.startDate"
          type="month"
          label="Start Date"
          density="compact"
          variant="outlined"
          hide-details
          class="flex-1-1"
        />
        <v-checkbox v-model="project.startYearOnly" label="Year" density="compact" hide-details />
      </div>
    </v-col>
    <v-col cols="12" sm="6">
      <div class="d-flex align-center ga-2">
        <v-text-field
          v-if="project.endPresent"
          model-value="Present"
          label="End Date"
          density="compact"
          variant="outlined"
          hide-details
          disabled
          class="flex-1-1"
        />
        <v-text-field
          v-else
          v-model="project.endDate"
          type="month"
          label="End Date"
          density="compact"
          variant="outlined"
          hide-details
          class="flex-1-1"
        />
        <v-checkbox v-model="project.endPresent" label="Present" density="compact" hide-details />
      </div>
    </v-col>
    <v-col cols="12">
      <v-textarea v-model="project.description" label="Description" density="compact" variant="outlined" rows="2" auto-grow />
    </v-col>
    <v-col cols="12">
      <v-textarea v-model="project.overview" label="Overview" density="compact" variant="outlined" rows="3" auto-grow />
    </v-col>
    <v-col cols="12">
      <v-textarea v-model="project.highlights" label="Highlights (one per line)" density="compact" variant="outlined" rows="3" auto-grow />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="project.githubUrl" type="url" label="GitHub URL" density="compact" variant="outlined" />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="project.demoUrl" type="url" label="Demo URL" density="compact" variant="outlined" />
    </v-col>
  </v-row>

  <AdminProjectImagesEditor :images="project.images" />

  <div class="mt-2 mb-2">
    <p class="text-caption text-medium-emphasis mb-2">Stack</p>
    <AdminSkillPicker
      :model-value="project.stack"
      :all-categories="allCategories"
      :skills-by-category="skillsByCategory"
      @update:model-value="onStackChange"
    />
  </div>

  <v-checkbox
    v-model="project.featured"
    label="Show on portfolio homepage"
    density="compact"
    hide-details
  />
</template>
