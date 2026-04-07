<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HeaderNav from '~/features/portfolio/components/layout/HeaderNav.vue'
import PageFooter from '~/features/portfolio/components/layout/PageFooter.vue'
import PortfolioSectionsBannerSection from '~/features/portfolio/components/sections/BannerSection.vue'
import PortfolioSectionsPartnersSection from '~/features/portfolio/components/sections/PartnersSection.vue'
import PortfolioSectionsProjectsSection from '~/features/portfolio/components/sections/ProjectsSection.vue'
import PortfolioSectionsCapabilitiesSection from '~/features/portfolio/components/sections/CapabilitiesSection.vue'
import PortfolioSectionsSkillsToolsSection from '~/features/portfolio/components/sections/SkillsToolsSection.vue'
import PortfolioSectionsContactSection from '~/features/portfolio/components/sections/ContactSection.vue'

const personStore = usePersonStore()
const companiesStore = useCompaniesStore()
const projectsStore = useProjectsStore()
const capabilitiesStore = useCapabilitiesStore()
const skillsStore = useSkillsStore()

const pending = ref(true)

onMounted(async () => {
  try {
    await Promise.all([
      personStore.fetchItems(),
      companiesStore.fetchItems(),
      projectsStore.fetchItems(),
      capabilitiesStore.fetchItems(),
      skillsStore.fetchItems(),
    ])
  } finally {
    pending.value = false
  }
})
// DO NOT REMOVE THIS, need further investigation
// const { pending } = await useAsyncData('homePortfolioStores', async () => {
//   await Promise.all([
//     personStore.fetchItems(),
//     companiesStore.fetchItems(),
//     projectsStore.fetchItems(),
//     capabilitiesStore.fetchItems(),
//     skillsStore.fetchItems(),
//   ])
//   return true
// })
</script>

<template>
  <div v-if="pending" class="d-flex justify-center align-center" style="min-height: 50vh">
    <v-progress-circular indeterminate color="primary" />
  </div>
  <div v-else>
    <HeaderNav />
    <v-main>
      <PortfolioSectionsBannerSection />
      <PortfolioSectionsPartnersSection />
      <PortfolioSectionsProjectsSection />
      <PortfolioSectionsCapabilitiesSection />
      <PortfolioSectionsSkillsToolsSection />
      <PortfolioSectionsContactSection />
    </v-main>
    <PageFooter />
  </div>
</template>
