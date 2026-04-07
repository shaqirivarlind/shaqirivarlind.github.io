<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { AppTheme } from '~/shared/constants'
import { portfolioConfig } from '~/features/portfolio/constants'

const personStore = usePersonStore()
const { person } = storeToRefs(personStore)
const { currentTheme, toggleTheme } = useAppTheme()

const mobileOpen = ref(false)

const computedNavItems = computed(() =>
  portfolioConfig.navItems.map((item) => ({
    label: item.label,
    key: item.href,
    to: item.href.startsWith('/#') ? undefined : item.href,
    href: item.href.startsWith('/#') ? item.href : undefined,
  })),
)

// ✅ computed theme icon
const themeIcon = computed(() =>
  currentTheme.value === AppTheme.DARK
    ? 'mdi-weather-sunny'
    : 'mdi-weather-night',
)
</script>

<template>
  <div v-if="person">
    <v-app-bar flat height="64">
      
      <!-- ✅ keep alignment -->
      <v-container class="d-flex align-center h-100">
        
        <!-- Mobile menu button -->
        <v-btn
          class="d-md-none"
          icon="mdi-menu"
          variant="text"
          @click="mobileOpen = !mobileOpen"
        />

        <!-- Title -->
        <v-app-bar-title>
          <NuxtLink
            to="/"
            class="text-decoration-none text-high-emphasis font-weight-bold hover:text-primary"
          >
            {{ person.firstName }} {{ person.lastName }}
          </NuxtLink>
        </v-app-bar-title>

        <!-- Desktop nav -->
        <div class="d-none d-md-flex align-center">
          <v-btn
            v-for="item in computedNavItems"
            :key="item.key"
            variant="text"
            :to="item.to"
            :href="item.href"
          >
            {{ item.label }}
          </v-btn>

          <v-btn
            :icon="themeIcon"
            variant="text"
            @click="toggleTheme"
          />
        </div>

        <!-- Mobile theme -->
        <v-btn
          class="d-md-none"
          :icon="themeIcon"
          variant="text"
          @click="toggleTheme"
        />
      </v-container>
    </v-app-bar>

    <v-navigation-drawer
      v-model="mobileOpen"
      temporary
      location="start"
    >
      <v-list nav>
        <v-list-item
          v-for="item in computedNavItems"
          :key="item.key"
          :title="item.label"
          :to="item.to"
          :href="item.href"
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>