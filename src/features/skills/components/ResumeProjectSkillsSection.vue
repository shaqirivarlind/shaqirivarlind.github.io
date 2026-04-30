<template>
  <div v-if="labels" class="text-label-medium">{{ labels }}</div>
</template>

<script setup lang="ts">
import type { Skill } from "@/shared/type-data";

const props = defineProps<{ skillIds: string[] }>();

const skillsStore = useSkillsStore();

const uniqueSkillIds = computed<string[]>(() => [...new Set(props.skillIds)]);

const skills = computed<Skill[]>(() =>
  uniqueSkillIds.value
    .map((id) => skillsStore.skillById(id))
    .filter((skill): skill is Skill => skill !== undefined),
);

const labels = computed<string>(() =>
  skills.value.map((skill) => skill.label).join(" · "),
);
</script>
