<template>
  <v-container id="projects" class="py-8 py-md-16">
    <SectionSheet
      title="Projects"
      subtitle="Prototypes, digital products and design systems that are visually pleasing, user-centric, and easy to use."
      note="Click any project to open a dedicated page with company context, product details, and image sections."
    >
      <v-row class="mt-6">
        <v-col
          v-for="(project, index) in visibleProjects"
          :key="project.id"
          cols="12"
          sm="6"
        >
          <ProjectCard
            :project="project"
            :bgColor="CARD_COLORS[index] ?? '#008080'"
            :textPosition="TEXT_POSITION_VALUES[index % 2]!"
          />
        </v-col>
      </v-row>

      <div class="text-center mt-2">
        <v-btn v-if="hasMore || expanded" variant="text" @click="toggleExpanded">
          {{ expanded ? "Show less" : "Show more" }}
        </v-btn>
      </div>
    </SectionSheet>
  </v-container>
</template>

<script setup lang="ts">
import type { Project } from "@/shared/type-data";
import SectionSheet from "@/components/ui/SectionSheet.vue";
import ProjectCard from "./ProjectCard.vue";
import { CARD_COLORS } from "../constants";
import { PROJECTS_LIMIT, TEXT_POSITION } from "../types";

const TEXT_POSITION_VALUES = Object.values(TEXT_POSITION);

const projectsStore = useProjectsStore();
onMounted(() => projectsStore.fetchItems());
const projects = computed<Project[]>(() => projectsStore.hideOnHomepage);

const expanded = ref(false);
const hasMore = computed<boolean>(() => projects.value.length > PROJECTS_LIMIT);
const visibleProjects = computed<Project[]>(() =>
  expanded.value ? projects.value : projects.value.slice(0, PROJECTS_LIMIT),
);

function toggleExpanded() {
  expanded.value = !expanded.value;
}
</script>
