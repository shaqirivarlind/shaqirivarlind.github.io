<script setup lang="ts">
import { RESUME_PAPER_WIDTH_PX } from '~/features/portfolio/constants'
import ResumeMainColumn from '~/features/portfolio/components/resume/ResumeMainColumn.vue'
import ResumeSidebarColumn from '~/features/portfolio/components/resume/ResumeSidebarColumn.vue'

const paperStyle = {
  '--resume-paper-width': `${RESUME_PAPER_WIDTH_PX}px`,
} as Record<string, string>
</script>

<template>
  <v-row 
    class="resume-paper border-sm rounded-lg elevation-3 pa-8" 
    :style="paperStyle"
  >
    <ResumeSidebarColumn />
    <ResumeMainColumn />
  </v-row>
</template>

<style scoped>
.resume-paper {
  width: var(--resume-paper-width);
  background: rgb(var(--v-theme-surface));
}

@media print {
  @page {
    size: A4 portrait;
    margin: 10mm;
  }

  .resume-paper {
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
}
</style>
