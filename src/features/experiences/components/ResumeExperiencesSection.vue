<template>
  <v-sheet>
    <h2 class="text-overline text-medium-emphasis mb-2 mt-0">Experience</h2>

    <div
      v-for="experience in experiencesStore.allVisibleExperiences"
      :key="experience.id"
      class="mb-4 print-no-break"
    >
      <ResumeCompanyNameSection :id="experience.companyId" />
      <div class="text-title-small text-medium-emphasis mt-n1">
        {{
          formatDuration(experience.dateRange.start, experience.dateRange.end)
        }}
      </div>

      <v-timeline
        side="end"
        density="compact"
        truncate-line="both"
        class="resume-timeline"
        align="start"
      >
        <v-timeline-item
          v-for="roleId in experience.roleIds"
          :key="roleId"
          size="x-small"
          dot-color="medium-emphasis"
        >
          <ResumeRolesSection :role-id="roleId" />
        </v-timeline-item>
      </v-timeline>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { formatDuration } from "@/utils/date";
import ResumeCompanyNameSection from "@/features/companies/components/ResumeCompanyNameSection.vue";
import ResumeRolesSection from "../../roles/components/ResumeRolesSection.vue";

const experiencesStore = useExperiencesStore();
</script>

<style scoped>
.resume-timeline {
  row-gap: 10px;
}

.resume-timeline :deep(.v-timeline-divider__dot) {
  width: 14px !important;
  height: 14px !important;
  margin-top: 5px;
}

.resume-timeline :deep(.v-timeline-divider__inner-dot) {
  width: 10px !important;
  height: 10px !important;
}

.resume-timeline :deep(.v-timeline-item__body) {
  padding-inline-start: 8px !important;
}
</style>
