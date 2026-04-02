<script setup lang="ts">
import { computed } from 'vue'
import { AppTheme } from '~/shared/constants'

const { portfolio } = usePortfolio()
const { currentTheme, toggleTheme } = useAppTheme()

// Computed nav items
const computedNavItems = computed(() =>
  portfolio.config.navItems.map((item) => ({
    ...item,
    isHash: item.href.startsWith('/#'),
    to: item.href.startsWith('/#') ? undefined : item.href,
    href: item.href.startsWith('/#') ? item.href : undefined,
  }))
)
</script>

<template>
  <v-app-bar flat :elevation="0" scroll-behavior="elevate" height="64">
    <v-container class="d-flex align-center">
      <v-app-bar-title>
        <NuxtLink to="/" class="text-decoration-none font-weight-black text-h4 text-high-emphasis">
          {{ portfolio.person.firstName }} <span class="d-none d-sm-inline">{{ portfolio.person.lastName }}</span>
        </NuxtLink>
      </v-app-bar-title>

      <div class="d-none d-md-flex align-center ml-auto">
        <v-btn
          v-for="item in computedNavItems"
          :key="item.href"
          variant="text"
          class="text-medium-emphasis text-title-medium"
          :to="item.to"
          :href="item.href"
        >
          {{ item.label }}
        </v-btn>

        <v-btn
          :icon="currentTheme === AppTheme.DARK ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="text"
          class="ml-2"
          @click="toggleTheme"
        />
      </div>
    </v-container>
  </v-app-bar>
</template>
