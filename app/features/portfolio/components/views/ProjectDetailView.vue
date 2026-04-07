<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue'
import PortfolioLayoutHeaderNav from '~/features/portfolio/components/layout/HeaderNav.vue'
import PortfolioSectionsProjectDetailHeroSection from '~/features/portfolio/components/sections/project-detail/ProjectDetailHeroSection.vue'
import PortfolioSectionsProjectDetailLeadImageSection from '~/features/portfolio/components/sections/project-detail/ProjectDetailLeadImageSection.vue'
import PortfolioSectionsProjectDetailContextSection from '~/features/portfolio/components/sections/project-detail/ProjectDetailContextSection.vue'
import PortfolioSectionsProjectDetailNarrativeSection from '~/features/portfolio/components/sections/project-detail/ProjectDetailNarrativeSection.vue'
import PortfolioSectionsProjectDetailTechStackSection from '~/features/portfolio/components/sections/project-detail/ProjectDetailTechStackSection.vue'
import PortfolioSectionsProjectDetailGallerySection from '~/features/portfolio/components/sections/project-detail/ProjectDetailGallerySection.vue'

/** `slug` matches the URL segment; sections resolve the row via stable `id`. */
const props = defineProps<{ slug: string }>()

const experiencesStore = useExperiencesStore()
const positionsStore = usePositionsStore()
const clientsStore = useClientsStore()
const companiesStore = useCompaniesStore()
const projectsStore = useProjectsStore()
const skillsStore = useSkillsStore()

const pending = ref(true)

onMounted(async () => {
  try {
    await Promise.all([
      experiencesStore.fetchItems(),
      positionsStore.fetchItems(),
      clientsStore.fetchItems(),
      companiesStore.fetchItems(),
      projectsStore.fetchItems(),
      skillsStore.fetchItems(),
    ])
  } finally {
    pending.value = false
  }
})

const projectRow = computed(() => projectsStore.getBySlug(props.slug))

watchEffect(() => {
  if (pending.value) return
  if (!projectRow.value) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }
})

const pageTitle = computed(() =>
  projectRow.value ? `${projectRow.value.name} — Project` : 'Project',
)

const pageDescription = computed(
  () => projectRow.value?.description ?? '',
)

useHead({
  title: pageTitle,
})

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
})
</script>

<template>
  <div v-if="pending" class="d-flex justify-center align-center py-16">
    <v-progress-circular indeterminate color="primary" />
  </div>
  <div v-else-if="projectRow">
    <PortfolioLayoutHeaderNav />

    <v-main>
      <v-container class="py-6 py-md-10" max-width="1100">
        <v-btn
          :to="'/#projects'"
          variant="text"
          prepend-icon="mdi-arrow-left"
          class="text-medium-emphasis mb-6"
        >
          Back to projects
        </v-btn>

        <PortfolioSectionsProjectDetailHeroSection :project-id="projectRow.id" />
        <PortfolioSectionsProjectDetailLeadImageSection :project-id="projectRow.id" />
        <PortfolioSectionsProjectDetailContextSection :project-id="projectRow.id" />
        <PortfolioSectionsProjectDetailNarrativeSection :project-id="projectRow.id" />
        <PortfolioSectionsProjectDetailTechStackSection :project-id="projectRow.id" />
        <PortfolioSectionsProjectDetailGallerySection :project-id="projectRow.id" />
      </v-container>
    </v-main>
  </div>
</template>

<style scoped>
/* Shell only — section components own layout styles. */
</style>
