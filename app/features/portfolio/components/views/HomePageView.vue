<script setup lang="ts">
import PortfolioLayoutHeaderNav from '~/features/portfolio/components/layout/HeaderNav.vue'
import PortfolioLayoutPageFooter from '~/features/portfolio/components/layout/PageFooter.vue'
import PortfolioSectionsBannerSection from '~/features/portfolio/components/sections/BannerSection.vue'
import PortfolioSectionsPartnersSection from '~/features/portfolio/components/sections/PartnersSection.vue'
import PortfolioSectionsProjectsSection from '~/features/portfolio/components/sections/ProjectsSection.vue'
import PortfolioSectionsCapabilitiesSection from '~/features/portfolio/components/sections/CapabilitiesSection.vue'
import PortfolioSectionsSkillsToolsSection from '~/features/portfolio/components/sections/SkillsToolsSection.vue'
import PortfolioSectionsContactSection from '~/features/portfolio/components/sections/ContactSection.vue'

const { portfolio } = usePortfolio()
useHead({
  title: `${portfolio.person.firstName} ${portfolio.person.lastName} — Portfolio`,
})
</script>

<template>
  <div>
    <PortfolioLayoutHeaderNav />
    <v-main>
      <PortfolioSectionsBannerSection />
      <PortfolioSectionsPartnersSection />
      <PortfolioSectionsProjectsSection />
      <PortfolioSectionsCapabilitiesSection />
      <PortfolioSectionsSkillsToolsSection />
      <PortfolioSectionsContactSection />
    </v-main>
    <PortfolioLayoutPageFooter />
  </div>
</template>
