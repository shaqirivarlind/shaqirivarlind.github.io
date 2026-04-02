<script setup lang="ts">
import PortfolioViewsProjectDetailView from '~/features/portfolio/components/views/ProjectDetailView.vue'

const route = useRoute()

const slug = computed(() => String(route.params.slug))
</script>

<template>
  <PortfolioViewsProjectDetailView :slug="slug" />
</template>
