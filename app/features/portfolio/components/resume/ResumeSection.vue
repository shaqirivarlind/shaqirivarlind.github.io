<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  experienceEndDateRows,
  experienceStartDateRows,
  latestPositionRow,
  orderedPositionsByIds,
} from '~/features/portfolio/utils'
import { formatMonthRange } from '~/shared/utils/date'

const personStore = usePersonStore()
const experiencesStore = useExperiencesStore()
const positionsStore = usePositionsStore()
const companiesStore = useCompaniesStore()
const educationStore = useEducationStore()

const pending = ref(true)

onMounted(async () => {
  try {
    await Promise.all([
      personStore.fetchItems(),
      experiencesStore.fetchItems(),
      positionsStore.fetchItems(),
      companiesStore.fetchItems(),
      educationStore.fetchItems(),
    ])
  } finally {
    pending.value = false
  }
})

const person = computed(() => personStore.person)

const currentExperienceRow = computed(() =>
  experiencesStore.experiences.find((exp) => {
    const positions = orderedPositionsByIds(positionsStore.items, exp.positionIds)
    return experienceEndDateRows(positions) === null
  }),
)

const currentPositions = computed(() =>
  currentExperienceRow.value
    ? orderedPositionsByIds(positionsStore.items, currentExperienceRow.value.positionIds)
    : [],
)

const currentCompany = computed(() =>
  currentExperienceRow.value
    ? companiesStore.getById(currentExperienceRow.value.companyId)
    : undefined,
)

const currentLatest = computed(() => latestPositionRow(currentPositions.value))

const latestEducation = computed(() => educationStore.educations[0])

const currentStartDate = computed(() =>
  experienceStartDateRows(currentPositions.value),
)

const currentEndDate = computed(() =>
  experienceEndDateRows(currentPositions.value),
)
</script>

<template>
  <section v-if="!pending && person" id="resume">
    <v-container max-width="1152" class="py-16">
      <v-card rounded="xl" elevation="1" class="pa-6 pa-sm-8">
        <h2 class="text-h5 text-sm-h4 font-weight-semibold text-high-emphasis">Resume</h2>
        <p class="text-body-2 text-medium-emphasis mt-3 mb-4" style="max-width: 640px; line-height: 1.7">
          {{ person.bio }}
        </p>

        <v-row>
          <v-col v-if="currentExperienceRow && currentLatest && currentCompany" cols="12" sm="6">
            <v-sheet rounded="lg" color="surface-variant" class="pa-4">
              <p class="text-subtitle-2 font-weight-semibold text-high-emphasis">Current</p>
              <p class="text-body-2 text-medium-emphasis mt-1">
                {{ currentLatest.role }} at {{ currentCompany.name }}
                ({{ formatMonthRange(currentStartDate, currentEndDate) }}).
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

          <v-col v-if="person.profileNote" cols="12">
            <v-sheet rounded="lg" color="surface-variant" class="pa-4">
              <p class="text-subtitle-2 font-weight-semibold text-high-emphasis">Profile Note</p>
              <p class="text-body-2 text-medium-emphasis mt-1">
                {{ person.profileNote }}
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
