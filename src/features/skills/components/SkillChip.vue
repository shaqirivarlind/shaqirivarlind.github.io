<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      :elevation="isHovering ? 3 : 0"
      border
      rounded="xl"
      class="d-flex flex-column align-center justify-center pa-5 h-100 ga-3"
    >
      <v-sheet
        rounded="lg"
        width="64"
        height="64"
        class="d-flex align-center justify-center flex-shrink-0"
      >
        <v-img
          v-if="skill.logo"
          :src="skill.logo"
          :alt="`${skill.label} icon`"
          width="50"
          height="50"
          contain
        />
        <span
          v-else
          class="text-subtitle-2 font-weight-bold text-medium-emphasis"
        >
          {{ fallbackInitial }}
        </span>
      </v-sheet>
      <p
        class="text-caption font-weight-semibold text-high-emphasis text-center ma-0"
      >
        {{ skill.label }}
      </p>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
import type { Skill } from "@/shared/type-data";

const props = defineProps<{ skill: Skill }>();

const fallbackInitial = computed<string>(() =>
  props.skill.label.charAt(0).toUpperCase(),
);
</script>
