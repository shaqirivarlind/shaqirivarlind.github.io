<template>
  <div
    v-if="loading"
    class="d-flex justify-center align-center loading-container"
  >
    <v-progress-circular indeterminate color="primary" />
  </div>

  <template v-else>
    <v-container>
      <div class="d-flex justify-space-between align-center">
        <BackButton />
        <PrintButton :content-ref="printTargetEl" />
      </div>
    </v-container>

    <div class="py-10 px-4 overflow-x-auto">
      <p class="text-caption text-medium-emphasis mt-1 text-center">
        Scroll to the bottom once before printing to ensure all images are fully
        loaded.
      </p>
      <v-container
        :id="RESUME_PAPER_ID"
        ref="printTargetEl"
        class="bg-white elevation-4 rounded-lg"
      >
        <v-theme-provider theme="light">
          <!-- Row 1: header -->
          <v-row class="mb-4">
            <v-col cols="4">
              <ResumePersonName />
            </v-col>
            <v-col cols="8">
              <ResumeBioSection />
            </v-col>
          </v-row>

          <!-- Row 2: sidebar + main -->
          <v-row class="mt-0">
            <v-col cols="4">
              <ResumeContactSection class="mt-2" />
              <ResumeSkillsSection />
              <ResumeEducationSection />
              <ResumeLanguagesSection />
              <ResumeCertificatesSection />
            </v-col>
            <v-col cols="8">
              <ResumeExperiencesSection />
            </v-col>
          </v-row>
        </v-theme-provider>
      </v-container>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import BackButton from "@/components/ui/BackButton.vue";
import PrintButton from "@/components/ui/PrintButton.vue";
import { RESUME_PAPER_ID } from "./constants";
import ResumePersonName from "@/features/person/components/ResumePersonName.vue";
import ResumeContactSection from "@/features/contacts/components/ResumeContactSection.vue";
import ResumeSkillsSection from "@/features/skills/components/ResumeSkillsSection.vue";
import ResumeEducationSection from "@/features/person/components/ResumeEducationSection.vue";
import ResumeLanguagesSection from "@/features/person/components/ResumeLanguagesSection.vue";
import ResumeCertificatesSection from "@/features/person/components/ResumeCertificatesSection.vue";
import ResumeBioSection from "@/features/person/components/ResumeBioSection.vue";
import ResumeExperiencesSection from "@/features/experiences/components/ResumeExperiencesSection.vue";

const printTargetEl = ref<HTMLElement | null>(null);
const loading = ref(true);
const personStore = usePersonStore();
const skillsStore = useSkillsStore();
const projectsStore = useProjectsStore();
const experiencesStore = useExperiencesStore();
const companiesStore = useCompaniesStore();
const rolesStore = useRolesStore();
const clientsStore = useClientsStore();

onMounted(async () => {
  await Promise.all([
    personStore.fetchItems(),
    skillsStore.fetchItems(),
    projectsStore.fetchItems(),
    personStore.fetchEducations(),
    personStore.fetchCertificates(),
    experiencesStore.fetchItems(),
    companiesStore.fetchItems(),
    rolesStore.fetchItems(),
    clientsStore.fetchItems(),
  ]);
  loading.value = false;
});
</script>

<style lang="css">
#resume-paper {
  width: 210mm;
  min-height: 297mm;

  padding: 8mm;
  margin: 0 auto;
}
</style>
