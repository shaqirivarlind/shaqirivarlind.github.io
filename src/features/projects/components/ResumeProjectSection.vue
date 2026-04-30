<template>
  <div v-if="visibleProjects.length">
    <template v-if="!expanded">
      <div class="text-body-small text-medium-emphasis">
        <div>
          <span class="font-weight-medium">Projects:</span>
          <span
            v-for="(project, index) in visibleProjects"
            :key="project.id"
            class="font-weight-medium"
          >
            <span v-if="index > 0">, </span>{{ project.name }}
          </span>
        </div>

        <ResumeProjectSkillsSection
          v-if="skillIds.length"
          :skill-ids="skillIds"
        />
      </div>
    </template>

    <template v-else>
      <p
        class="text-label-medium font-weight-bold text-medium-emphasis ma-0 mb-1"
      >
        Projects
      </p>
      <ul class="ma-0 mb-1 pl-4">
        <li
          v-for="project in visibleProjects"
          :key="project.id"
          class="text-body-small text-medium-emphasis mb-1"
        >
          <span class="font-weight-medium">{{ project.name }}</span>
          <span v-if="project.summary"> — {{ project.summary }}</span>
          <ResumeClientSection
            v-if="project.clientId"
            :client-id="project.clientId"
          />
          <ul
            v-if="project.achievements.length"
            class="text-label-medium ma-0 pl-3"
          >
            <li
              v-for="(achievement, index) in project.achievements"
              :key="index"
              class="pr-2"
            >
              {{ achievement }}
            </li>
          </ul>
          <ResumeProjectSkillsSection
            v-if="project.skillIds.length"
            :skill-ids="project.skillIds"
          />
        </li>
      </ul>
    </template>

    <v-btn variant="text" class="px-0 do-not-print" @click="expanded = !expanded">
      {{ expanded ? "Show less" : "Show more" }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import type { Project } from "@/shared/type-data";
import ResumeClientSection from "../../client/components/ResumeClientSection.vue";
import ResumeProjectSkillsSection from "../../skills/components/ResumeProjectSkillsSection.vue";

const props = defineProps<{ ids: string[] }>();

const projectsStore = useProjectsStore();

const expanded = ref(false);

const visibleProjects = computed<Project[]>(() =>
  props.ids
    .map((id) => projectsStore.getById(id))
    .filter(
      (project): project is Project =>
        !!project && project.hideOnResume !== true,
    ),
);

const skillIds = computed<string[]>(() =>
  visibleProjects.value.flatMap((p) => p.skillIds),
);
</script>
