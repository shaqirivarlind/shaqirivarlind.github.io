<script setup lang="ts">
import { linkRel, linkTarget } from '~/shared/utils/link'
import UiSectionHeading from '~/shared/components/ui/SectionHeading.vue'

const { portfolio } = usePortfolio()
</script>

<template>
  <v-sheet id="contact" tag="section" border="t" color="background">
    <v-container class="py-16">
      <UiSectionHeading
        title="Contact"
        subtitle="Let's connect for frontend roles, freelance projects, or collaboration."
      />

      <v-row>
        <v-col
          v-for="item in portfolio.person.contacts"
          :key="item.label"
          cols="12"
          sm="6"
          lg="4"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              :href="item.href"
              :target="linkTarget(item.href)"
              :rel="linkRel(item.href)"
              :elevation="isHovering ? 4 : 1"
              rounded="xl"
              class="pa-4"
              style="text-decoration: none"
            >
              <p class="text-subtitle-2 font-weight-semibold text-high-emphasis">
                {{ item.label }}
              </p>
              <p class="text-body-2 text-medium-emphasis mt-1" style="word-break: break-all">
                {{ item.value }}
              </p>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
