<script setup lang="ts">
import { formatDateRange } from '~/shared/utils/date'
import { latestPosition, experienceStartDate, experienceEndDate } from '~/features/portfolio/utils'

const { portfolio } = usePortfolio()

const currentExperience = computed(() =>
  portfolio.experiences.find((experience) => experienceEndDate(experience) === null)
)

const latestEducation = computed(() => portfolio.education[0])
</script>

<template>
  <section id="resume">
    <v-container max-width="1152" class="py-16">
      <v-card rounded="xl" elevation="1" class="pa-6 pa-sm-8">
        <h2 class="text-h5 text-sm-h4 font-weight-semibold text-high-emphasis">Resume</h2>
        <p class="text-body-2 text-medium-emphasis mt-3 mb-4" style="max-width: 640px; line-height: 1.7">
          {{ portfolio.person.bio }}
        </p>

        <v-row>
          <v-col v-if="currentExperience" cols="12" sm="6">
            <v-sheet rounded="lg" color="surface-variant" class="pa-4">
              <p class="text-subtitle-2 font-weight-semibold text-high-emphasis">Current</p>
              <p class="text-body-2 text-medium-emphasis mt-1">
                {{ latestPosition(currentExperience).role }} at {{ currentExperience.company.name }}
                ({{ formatDateRange(experienceStartDate(currentExperience), experienceEndDate(currentExperience)) }}).
              </p>
            </v-sheet>
          </v-col>

          <v-col v-if="latestEducation" cols="12" sm="6">
            <v-sheet rounded="lg" color="surface-variant" class="pa-4">
              <p class="text-subtitle-2 font-weight-semibold text-high-emphasis">Education</p>
              <p class="text-body-2 text-medium-emphasis mt-1">
                {{ latestEducation.degree }} in {{ latestEducation.field }},
                {{ latestEducation.institution }}
                ({{ latestEducation.startYear }} - {{ latestEducation.endYear }}).
              </p>
            </v-sheet>
          </v-col>

          <v-col v-if="portfolio.person.profileNote" cols="12">
            <v-sheet rounded="lg" color="surface-variant" class="pa-4">
              <p class="text-subtitle-2 font-weight-semibold text-high-emphasis">Profile Note</p>
              <p class="text-body-2 text-medium-emphasis mt-1">
                {{ portfolio.person.profileNote }}
              </p>
            </v-sheet>
          </v-col>
        </v-row>

        <div class="mt-6">
          <v-btn :to="'/resume'" color="primary" variant="elevated" rounded="lg">
            View Full Resume
          </v-btn>
        </div>
      </v-card>
    </v-container>
  </section>
</template>
