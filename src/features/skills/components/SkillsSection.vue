<template>
  <v-container id="skills" class="py-8 py-md-16">
    <SectionSheet title="Skills">
      <v-tabs v-model="activeTab" align-tabs="center">
        <v-tab v-for="group in groupedTabs" :key="group.key" :value="group.key">
          {{ group.label.toUpperCase() }}
        </v-tab>
      </v-tabs>

      <v-window v-model="activeTab">
        <v-window-item
          v-for="group in groupedTabs"
          :key="group.key"
          :value="group.key"
        >
          <v-row class="py-6">
            <v-col
              v-for="skill in group.skills"
              :key="skill.id"
              cols="6"
              sm="4"
              md="3"
              lg="2"
            >
              <SkillChip :skill="skill" />
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </SectionSheet>
  </v-container>
</template>

<script setup lang="ts">
import type { Skill } from "@/shared/type-data";
import SectionSheet from "@/components/ui/SectionSheet.vue";
import SkillChip from "./SkillChip.vue";
import {
  RESUME_SKILL_CATEGORY_TO_GROUP,
  RESUME_SKILL_GROUP_ORDER,
} from "@/features/skills/constants";
import type { ResumeSkillGroup } from "@/features/skills/types";
import { useProjectsStore } from "@/stores/projects";
import { useSkillsStore } from "@/stores/skills";

const skillsStore = useSkillsStore();
const projectsStore = useProjectsStore();

const activeTab = ref<string | null>(null);

const projectSkills = computed<Skill[]>(() =>
  projectsStore.allSkills
    .map((id: string) => skillsStore.skillById(id))
    .filter((skill: Skill | undefined): skill is Skill => skill !== undefined),
);

type TabGroup = { key: ResumeSkillGroup; label: string; skills: Skill[] };

const groupedTabs = computed<TabGroup[]>(() => {
  const grouped = new Map<ResumeSkillGroup, Skill[]>(
    RESUME_SKILL_GROUP_ORDER.map((g) => [g, []]),
  );

  for (const skill of projectSkills.value) {
    const group = RESUME_SKILL_CATEGORY_TO_GROUP[skill.category];
    grouped.get(group)!.push(skill);
  }

  return RESUME_SKILL_GROUP_ORDER.map((group) => ({
    key: group,
    label: group === "Backend" ? "Backend & APIs" : group,
    skills: grouped.get(group)!,
  }));
});

watchEffect(() => {
  if (!groupedTabs.value.length) {
    activeTab.value = null;
    return;
  }
  const hasActive = groupedTabs.value.some((g) => g.key === activeTab.value);
  if (!hasActive) activeTab.value = groupedTabs.value[0]!.key;
});
</script>
