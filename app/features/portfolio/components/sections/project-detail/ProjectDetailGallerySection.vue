<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ projectId: string }>()

const projectsStore = useProjectsStore()
const project = computed(() => projectsStore.getById(props.projectId))

const heroImage = computed(() => project.value?.images[0])
const galleryImages = computed(() => project.value?.images.slice(1) ?? [])
</script>

<template>
  <v-card v-if="project" rounded="xl" elevation="1" class="pa-5 pa-sm-6">
    <h2 class="text-h6 font-weight-semibold text-high-emphasis">Gallery</h2>
    <p class="text-caption text-medium-emphasis mt-1 mb-4">
      Additional screenshots and UI captures.
    </p>
    <p
      v-if="!heroImage && !galleryImages.length"
      class="text-body-2 text-medium-emphasis"
    >
      Add images in your project data to strengthen this showcase.
    </p>
    <v-row v-if="galleryImages.length" class="mt-2">
      <v-col
        v-for="(image, imageIndex) in galleryImages"
        :key="image"
        cols="12"
        sm="6"
      >
        <v-img
          :src="image"
          :alt="`${project.name} preview ${imageIndex + 2}`"
          height="260"
          rounded="xl"
          cover
          class="gallery-thumb"
        />
      </v-col>
    </v-row>
    <v-row v-else-if="heroImage" class="mt-2">
      <v-col cols="12">
        <p class="text-body-2 text-medium-emphasis">
          More shots can be added to the project’s image list in data.
        </p>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.gallery-thumb {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}
</style>
