<template>
  <v-container v-if="project" class="py-8">
    <!-- 1. Header -->
    <v-row>
      <v-col cols="12" md="8">
        <div class="d-flex align-center ga-2 mb-3 flex-wrap">
          <v-chip
            v-if="project.projectType"
            size="small"
            label
            variant="tonal"
            class="text-uppercase font-weight-bold"
          >
            {{ project.projectType }}
          </v-chip>
        </div>
        <h1 class="text-h4 font-weight-bold mb-2">{{ project.name }}</h1>
        <p v-if="project.summary" class="text-body-1 text-medium-emphasis mb-2">
          {{ project.summary }}
        </p>
        <p v-if="project.clientId" class="text-body-2 text-medium-emphasis">
          <v-icon size="x-small" class="mr-1">mdi-domain</v-icon>
          {{ client?.name }}
        </p>
      </v-col>

      <v-col
        v-if="project.links?.length"
        cols="12"
        md="4"
        class="d-flex flex-wrap ga-2 justify-md-end"
      >
        <v-btn
          v-for="link in project.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener"
          variant="outlined"
          size="small"
          append-icon="mdi-open-in-new"
        >
          {{ link.label }}
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="mb-8" />

    <!-- 2. Overview -->
    <section v-if="project.overview" class="mb-8">
      <h2 class="text-h6 font-weight-bold mb-3">Overview</h2>
      <p class="text-body-1">{{ project.overview }}</p>
    </section>

    <!-- 3. Key Achievements -->
    <section v-if="project.achievements?.length" class="mb-8">
      <h2 class="text-h6 font-weight-bold mb-3">Key Achievements</h2>
      <v-list lines="one" class="pa-0 bg-transparent">
        <v-list-item
          v-for="(achievement, index) in project.achievements"
          :key="index"
          class="px-0"
        >
          <template #prepend>
            <v-icon color="primary" size="small"
              >mdi-check-circle-outline</v-icon
            >
          </template>
          <v-list-item-title class="text-body-2 text-wrap">
            {{ achievement }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </section>

    <!-- 4. Role context -->
    <ProjectRoleCard
      v-if="project.roleIds?.length"
      :role-ids="project.roleIds"
    />

    <!-- 5. Tech Stack -->
    <ProjectSkills v-if="skills.length" :skills="skills" />

    <!-- 6. Screenshots -->
    <ImageCarousel
      v-if="project.images?.length"
      :images="project.images"
      title="Screenshots"
    />
  </v-container>

  <v-container v-else class="py-16 text-center">
    <v-icon size="64" color="medium-emphasis">mdi-folder-open-outline</v-icon>
    <p class="text-h6 mt-4 text-medium-emphasis">Project not found</p>
  </v-container>
</template>

<script setup lang="ts">
import type { Client, Project, Skill } from "@/shared/type-data";
import ImageCarousel from "@/components/ui/ImageCarousel.vue";
import ProjectSkills from "./ProjectSkills.vue";
import ProjectRoleCard from "./ProjectRoleCard.vue";

const props = defineProps<{ id: string }>();

const projectsStore = useProjectsStore();
const skillsStore = useSkillsStore();
const clientsStore = useClientsStore();

const project = computed<Project | undefined>(() => projectsStore.getById(props.id));
const client = computed<Client | null | undefined>(() =>
  project.value?.clientId
    ? clientsStore.clientById(project.value.clientId)
    : null,
);

const skills = computed<Skill[]>(() =>
  (project.value?.skillIds ?? [])
    .map((id) => skillsStore.skillById(id))
    .filter((skill): skill is Skill => skill !== undefined),
);
</script>
