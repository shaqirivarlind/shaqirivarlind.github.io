<template>
  <AsideSection title="Skills">
    <div class="d-flex flex-wrap ga-1">
      <v-chip
        v-for="skill in projectSkills"
        :key="skill.id"
        size="x-small"
        variant="outlined"
        color="primary"
      >
        {{ skill.label }}
      </v-chip>
    </div>
  </AsideSection>
</template>

<script setup lang="ts">
import AsideSection from "@/components/ui/AsideSection.vue";
import type { Skill } from "@/shared/type-data";

const skillsStore = useSkillsStore();
const projectsStore = useProjectsStore();

const projectSkillIds = computed<string[]>(() => projectsStore.allSkills);

const projectSkills = computed<Skill[]>(() =>
  projectSkillIds.value
    .map((id) => skillsStore.skillById(id))
    .filter((skill): skill is Skill => skill !== undefined),
);
</script>
