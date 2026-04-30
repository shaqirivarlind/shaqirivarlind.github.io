<template>
  <ProjectPageView :id="id" />
</template>

<script setup lang="ts">
import ProjectPageView from "@/components/views/ProjectPageView.vue";

const route = useRoute();

const id = computed<string>(() => String(route.params.id));
</script>
