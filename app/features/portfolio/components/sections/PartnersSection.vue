<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { AppTheme } from '~/shared/constants'
import InfoDialogBody from '~/shared/components/dialog/InfoDialogBody.vue'

const companiesStore = useCompaniesStore()
const { companies } = storeToRefs(companiesStore)

const { showComponent } = useDialog()
const { currentTheme } = useAppTheme()

const isDark = computed(() => currentTheme.value === AppTheme.DARK)

const GRID_LIMIT = 18
const TEXT_LIMIT = 4

const visibleGrid = computed(() => companies.value.slice(0, GRID_LIMIT))
const hasMore = computed(() => companies.value.length > GRID_LIMIT)

const visibleText = computed(() => companies.value.slice(0, TEXT_LIMIT))
const hasMoreText = computed(() => companies.value.length > TEXT_LIMIT)

function showAll(): void {
  showComponent({
    title: 'All Partners',
    component: InfoDialogBody,
    maxWidth: 720,
    componentProps: {
      list: companies.value.map((company) => ({
        name: company.name,
        logoSrc: company.logoSrc,
      })),
    },
  })
}
</script>

<template>
  <v-container class="py-12 text-center">
    <p class="text-body-large text-overline text-medium-emphasis mb-6">
      At agency side, client side or as freelancer
    </p>

    <v-row class="justify-center">
      <v-col
        v-for="company in visibleGrid"
        :key="company.id"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        class="d-flex justify-center align-center"
      >
        <v-img
          v-if="company.logoSrc"
          :src="company.logoSrc"
          :alt="`${company.name} logo`"
          height="64"
          contain
          :class="['grayscale-img', isDark && 'grayscale-img--dark']"
        />
        <v-avatar v-else color="surface-variant" size="48" rounded="lg" class="mb-2">
          <span class="text-caption font-weight-bold text-medium-emphasis">
            {{ company.name }}
          </span>
        </v-avatar>
      </v-col>
    </v-row>

      <v-btn v-if="hasMore" variant="text" class="mt-4" @click="showAll">
        Show all partners
      </v-btn>

      <p class="text-body-large text-medium-emphasis mt-8 mx-auto" style="max-width: 680px">
        Hired by creative, strategic and digital agencies, like
        <span v-for="(company, i) in visibleText" :key="company.id">
          {{ company.name }}<span v-if="i < visibleText.length - 1">, </span>
        </span>
        <span v-if="hasMoreText"> and more</span>.
      </p>
  </v-container>
</template>

<style scoped>
.grayscale-img {
  filter: grayscale(90%) opacity(0.8);
  transition: filter 0.3s ease;
}

.grayscale-img--dark {
  filter: grayscale(90%) invert(1) opacity(0.7);
}
</style>
