<template>
  <div
    v-if="loading"
    class="d-flex justify-center align-center loading-container"
  >
    <v-progress-circular indeterminate color="primary" />
  </div>

  <template v-else>
    <PersonSection />
    <CompaniesSection />
    <v-divider />
    <ProjectsSection />
    <v-divider />
    <CapabilitiesSection />
    <v-divider />
    <SkillsSection />
    <v-divider />
    <ContactSection />
  </template>
</template>

<script setup lang="ts">
import PersonSection from "@/features/person/components/PersonSection.vue";
import CompaniesSection from "@/features/companies/components/CompaniesSection.vue";
import CapabilitiesSection from "@/features/capabilities/components/CapabilitiesSection.vue";
import ContactSection from "@/features/contacts/components/ContactSection.vue";
import SkillsSection from "@/features/skills/components/SkillsSection.vue";
import ProjectsSection from "@/features/projects/components/ProjectsSection.vue";

const personStore = usePersonStore();
const companiesStore = useCompaniesStore();
const capabilitiesStore = useCapabilitiesStore();
const skillStore = useSkillsStore();
const projectsStore = useProjectsStore();

const isLoaded = () =>
  personStore.person !== null && projectsStore.projects.length > 0;

const loading = ref(!isLoaded());

onMounted(async () => {
  if (isLoaded()) return;
  await Promise.all([
    personStore.fetchItems(),
    companiesStore.fetchItems(),
    capabilitiesStore.fetchItems(),
    skillStore.fetchItems(),
    projectsStore.fetchItems(),
  ]);
  loading.value = false;
});
</script>
