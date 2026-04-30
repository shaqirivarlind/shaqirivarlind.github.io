<template>
  <div class="mb-8">
    <p
      class="text-caption text-uppercase font-weight-bold text-medium-emphasis mb-4"
    >
      Tech Stack
    </p>
    <v-row density="comfortable">
      <v-col
        v-for="skill in skills"
        :key="skill.id"
        cols="6"
        sm="4"
        md="3"
        lg="2"
      >
        <SkillChip :skill="skill" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { Skill } from "@/shared/type-data";
import SkillChip from "@/features/skills/components/SkillChip.vue";

defineProps<{ skills: Skill[] }>();
</script>
