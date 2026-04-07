<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ResumeAsideSection from '~/features/portfolio/components/resume/ResumeAsideSection.vue'
import { resumeContactEntryIcon } from '~/features/portfolio/utils/resume-contact'

const { person, contacts } = storeToRefs(usePersonStore())
const educationStore = useEducationStore()
const { educations } = storeToRefs(educationStore)
const certificationsStore = useCertificatesStore()
const { certifications } = storeToRefs(certificationsStore)
</script>

<template>
  <v-col v-if="person" cols="3">
    <h1 class="text-high-emphasis">
      {{ person.fullName }}
    </h1>

    <ResumeAsideSection title="Contact">
      <v-list density="compact" class="pa-0 bg-transparent">
        <v-list-item
          v-for="con in contacts"
          :key="con.label"
          :href="con.href"
          :target="con.target || undefined"
          class="pa-0"
          style="min-height: unset; height: auto;"
        >
          <template #prepend>
            <div style="width: 22px;">
              <v-icon
                :icon="resumeContactEntryIcon(con.platform)"
                size="18"
                class="text-medium-emphasis"
              />
            </div>
          </template>

          <v-list-item-title class="text-body-medium text-medium-emphasis">
            {{ con.value }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </ResumeAsideSection>

    <!-- Core technologies -->
    <ResumeAsideSection title="Core technologies">
      <div class="d-flex flex-wrap ga-1">
        <v-chip
          v-for="skill in person.coreSkills"
          :key="skill"
          size="small"
          variant="outlined"
          color="primary"
          class="font-weight-medium"
        >
          {{ skill }}
        </v-chip>
      </div>
    </ResumeAsideSection>

    <!-- Education -->
    <ResumeAsideSection title="Education">
      <v-list density="compact" class="pa-0 bg-transparent">
        <v-list-item
          v-for="edu in educations"
          :key="edu.institution"
          class="pa-0"
          style="min-height: unset; height: auto;"
        >
          <v-list-item-title class="text-body-2 font-weight-semibold text-high-emphasis">
            {{ edu.degree }}, {{ edu.field }}
          </v-list-item-title>

          <v-list-item-subtitle class="text-body-small text-medium-emphasis">
            {{ edu.institution }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </ResumeAsideSection>

    <!-- Languages -->
    <ResumeAsideSection title="Languages">
      <v-list density="compact" class="pa-0 bg-transparent">
        <v-list-item
          v-for="row in person.languages"
          :key="row.language"
          class="pa-0"
          style="min-height: unset; height: auto;"
        >
          <v-list-item-title class="text-body-2 font-weight-semibold text-high-emphasis">
            {{ row.language }}
          </v-list-item-title>

          <v-list-item-subtitle class="text-body-small text-medium-emphasis">
            {{ row.level }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </ResumeAsideSection>

    <!-- Certification -->
    <ResumeAsideSection title="Certifications">
      <v-list density="compact" class="pa-0 bg-transparent" lines="three">
        <v-list-item
          v-for="cert in certifications"
          :key="cert.title"
          class="pa-0"
          style="min-height: unset; height: auto;"
        >
          <v-list-item-title class="text-body-medium font-weight-semibold text-high-emphasis overflow-visible text-pre-wrap">
            {{ cert.title }}
          </v-list-item-title>

          <v-list-item-subtitle class="text-body-small text-medium-emphasis">
            {{ cert.date }} / {{ cert.issuer }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </ResumeAsideSection>
  </v-col>
</template>
