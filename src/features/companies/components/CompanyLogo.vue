<template>
  <v-img
    :src="company.logo"
    :alt="`${company.name} logo`"
    height="64"
    contain
    :class="['grayscale-img', isDark && 'grayscale-img--dark']"
  />
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
import type { Company } from "@/shared/type-data";

defineProps<{ company: Company }>();

const theme = useTheme();
const isDark = computed<boolean>(() => theme.global.current.value.dark);
</script>

<style scoped>
.grayscale-img {
  filter: grayscale(90%) opacity(0.8);
  transition: filter 0.3s ease;
}

.grayscale-img--dark {
  filter: grayscale(90%) invert(1) opacity(0.7);
}
</style>
