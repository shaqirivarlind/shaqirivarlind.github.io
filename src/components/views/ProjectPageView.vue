<template>
  <div
    v-if="loading"
    class="d-flex justify-center align-center loading-container"
  >
    <v-progress-circular indeterminate color="primary" />
  </div>

  <template v-else>
    <v-container class="pt-4 pb-0">
      <BackButton :fallback="PROJECT_SECTION_HREF" />
    </v-container>
    <ProjectDetails :id="props.id" />
  </template>
</template>

<script setup lang="ts">
import ProjectDetails from "@/features/projects/components/ProjectDetails.vue";
import BackButton from "@/components/ui/BackButton.vue";
import { PROJECT_SECTION_HREF } from "./constants";

const props = defineProps<{ id: string }>();
const loading = ref(true);
const projectsStore = useProjectsStore();
const skillsStore = useSkillsStore();
const rolesStore = useRolesStore();
const companiesStore = useCompaniesStore();
const clientsStore = useClientsStore();

onMounted(async () => {
  await Promise.all([
    projectsStore.fetchItems(),
    skillsStore.fetchItems(),
    rolesStore.fetchItems(),
    companiesStore.fetchItems(),
    clientsStore.fetchItems(),
  ]);

  loading.value = false;
});
</script>
