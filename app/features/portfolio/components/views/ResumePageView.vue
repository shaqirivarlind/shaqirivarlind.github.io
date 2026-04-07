<script setup lang="ts">
import { onMounted } from 'vue'
import HeaderNav from '~/features/portfolio/components/layout/HeaderNav.vue'
import PageFooter from '~/features/portfolio/components/layout/PageFooter.vue'
import ResumePdfAdminBar from '~/features/portfolio/components/resume/ResumePdfAdminBar.vue'
import ResumePrintableDocument from '~/features/portfolio/components/resume/ResumePrintableDocument.vue'
import { RESUME_PRINT_TARGET_KEY } from '~/features/portfolio/constants'

const personStore = usePersonStore()
const experiencesStore = useExperiencesStore()
const positionsStore = usePositionsStore()
const companiesStore = useCompaniesStore()
const skillsStore = useSkillsStore()
const educationStore = useEducationStore()
const certificatesStore = useCertificatesStore()
const educationsStore = useEducationStore()

const pending = ref(true)
const printTargetEl = ref<HTMLElement>(null as unknown as HTMLElement)

provide(RESUME_PRINT_TARGET_KEY, printTargetEl)

onMounted(async () => {
  try {
    await Promise.all([
      personStore.fetchItems(),
      experiencesStore.fetchItems(),
      positionsStore.fetchItems(),
      companiesStore.fetchItems(),
      skillsStore.fetchItems(),
      educationStore.fetchItems(),
      certificatesStore.fetchItems(),
      educationsStore.fetchItems(),
    ])
  } finally {
    pending.value = false
  }
})
</script>

<template>
  <div v-if="pending" class="d-flex justify-center align-center py-16">
    <v-progress-circular indeterminate color="primary" />
  </div>
  <div v-else class="resume-page">
    <!-- Screen-only chrome -->
    <HeaderNav class="d-print-none" />

    <v-main class="resume-main">
      <v-container class="py-10">
        <ResumePdfAdminBar class="d-print-none" />

        <div class="overflow-x-auto">
          <div ref="printTargetEl" class="d-inline-block">
            <ResumePrintableDocument />
          </div>
        </div>
      </v-container>
    </v-main>

    <PageFooter class="d-print-none" />
  </div>
</template>

<style scoped>
.resume-page {
  min-height: 100%;
}

.resume-main {
  background: rgb(var(--v-theme-background));
}
</style>
