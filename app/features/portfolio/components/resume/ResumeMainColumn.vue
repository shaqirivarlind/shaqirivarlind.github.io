<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ResumeExperience from '~/features/portfolio/components/resume/ResumeExperience.vue'

const personStore = usePersonStore()
const { person } = storeToRefs(personStore)
const experiencesStore = useExperiencesStore()
const { experiences } = storeToRefs(experiencesStore)
</script>

<template>
  <v-col 
    v-if="person" 
    cols="9"
  >
    <section class="mt-6">
      <p class="text-body-1 text-medium-emphasis mt-3 mb-0">
        {{ person.role }} {{ person.tagline }}
      </p>
      <p class="text-body-2 text-medium-emphasis mt-4 mb-0">
        {{ person.bio }}
      </p>
    </section>

    <section>
      <h2 class="text-overline text-medium-emphasis">
        Experience
      </h2>
      <div class="mt-6">
        <template v-for="(experience, idx) in experiences" :key="experience.id">
          <ResumeExperience :experience="experience" />
          <v-divider
            v-if="idx !== experiences.length - 1"
            class="my-6"
            color="on-surface"
            :opacity="0.08"
          />
        </template>
      </div>
    </section>
  </v-col>
</template>
