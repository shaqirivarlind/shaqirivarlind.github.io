<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { ClientRow, CompanyRow, ExperienceRow, PositionRow } from '~/shared/types'
import {
  experienceEndDateRows,
  experienceStartDateRows,
  orderedPositionsByIds,
} from '~/features/portfolio/utils'
import { formatMonth, formatMonthRange } from '~/shared/utils/date'

const props = defineProps<{
  experience: ExperienceRow
}>()

const companiesStore = useCompaniesStore()
const positionsStore = usePositionsStore()
const skillsStore = useSkillsStore()
const clientsStore = useClientsStore()

const { items: positions } = storeToRefs(positionsStore)
const { skills } = storeToRefs(skillsStore)
const { items: clients } = storeToRefs(clientsStore)

const company = computed<CompanyRow | undefined>(() =>
  companiesStore.getById(props.experience.companyId),
)

const resolvedPositions = computed<PositionRow[]>(() => {
  const byExperienceIds = orderedPositionsByIds(positions.value, props.experience.positionIds)
  if (byExperienceIds.length > 0) return byExperienceIds

  // Fallback if `positionIds` aren’t maintained yet.
  return positions.value.filter((p) => p.experienceId === props.experience.id)
})

const overallDateRange = computed(() =>
  ({
    start: experienceStartDateRows(resolvedPositions.value),
    end: experienceEndDateRows(resolvedPositions.value),
  }),
)

function skillLabel(skillId: string): string {
  return skills.value.find((s) => s.id === skillId)?.label ?? skillId
}

function clientsForPosition(position: PositionRow): ClientRow[] {
  if (!position.clientIds?.length) return []
  const byId = new Map(clients.value.map((c) => [c.id, c] as const))
  return position.clientIds
    .map((id) => byId.get(id))
    .filter((c): c is ClientRow => c != null)
}

function clientName(client: ClientRow): string {
  return companiesStore.getById(client.companyId)?.name ?? client.companyId
}
</script>

<template>
  <article class="resume-exp">
    <!-- Company = main row (LinkedIn-like) -->
    <v-list density="compact" bg-color="transparent" class="pa-0">
      <v-list-item class="px-0">
        <div class="w-100">
          <div class="d-flex align-center justify-space-between ga-4">
            <div class="min-w-0 text-subtitle-1 font-weight-semibold text-high-emphasis text-truncate">
              <template v-if="company?.url">
                <a
                  class="text-decoration-none text-high-emphasis"
                  :href="company.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ company?.name ?? 'Company' }}
                </a>
              </template>
              <template v-else>
                {{ company?.name ?? 'Company' }}
              </template>
            </div>
          </div>
          <div class="text-caption text-medium-emphasis mt-1">
            {{ formatMonthRange(overallDateRange.start, overallDateRange.end) }}
          </div>
        </div>
      </v-list-item>
    </v-list>

    <v-timeline
      density="compact"
      side="end"
      align="start"
      line-thickness="2"
      class="resume-exp__timeline mt-3"
    >
      <v-timeline-item
        v-for="position in resolvedPositions"
        :key="position.id"
        dot-color="on-surface"
        size="x-small"
      >
        <template #opposite>
          <div class="text-caption text-medium-emphasis text-no-wrap">
            {{ formatMonthRange(position.startDate, position.endDate) }}
          </div>
        </template>

        <div class="min-w-0">
          <div class="text-caption font-weight-medium text-high-emphasis">
            {{ position.role }}
          </div>

          <div class="text-caption text-medium-emphasis mt-1">
            {{ position.employmentType }}
            <template v-if="position.locationType"> · {{ position.locationType }}</template>
          </div>

          <div class="text-caption text-medium-emphasis">
            {{ position.location }}
            <template v-if="position.workType"> · {{ position.workType }}</template>
          </div>

          <div v-if="clientsForPosition(position).length" class="text-caption text-medium-emphasis mt-1">
            <span class="font-weight-medium">Client:</span>
            {{ clientsForPosition(position).map(clientName).join(', ') }}
          </div>

          <div v-if="position.stack?.length" class="text-caption text-medium-emphasis mt-1">
            <span class="font-weight-medium">Stack:</span>
            {{ position.stack.slice(0, 10).map(skillLabel).join(', ') }}
          </div>

          <div v-if="position.description" class="text-caption text-disabled mt-2">
            {{ position.description }}
          </div>

          <v-list
            v-if="position.highlights?.length"
            density="compact"
            bg-color="transparent"
            class="pa-0 mt-2 resume-exp__highlights"
          >
            <v-list-item
              v-for="(h, hIdx) in position.highlights.slice(0, 5)"
              :key="`${position.id}-h-${hIdx}`"
              class="px-0 py-0 resume-exp__highlight-item"
            >
              <template #prepend>
                <v-icon icon="mdi-circle-small" size="16" class="text-medium-emphasis" />
              </template>
              <v-list-item-title class="text-caption text-medium-emphasis">
                {{ h }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-timeline-item>
    </v-timeline>
  </article>
</template>

<style scoped>
.resume-exp {
  break-inside: avoid;
}

.resume-exp__timeline :deep(.v-timeline-item__opposite) {
  padding-inline-end: 32px;
  flex: 0 0 auto;
}

.resume-exp__timeline :deep(.v-timeline-item__body) {
  /* Override Vuetify default (24px) for more breathing room */
  padding-inline-start: 32px;
}

.resume-exp__highlights :deep(.v-list-item__prepend) {
  width: 16px;
  min-width: 16px;
  margin-inline-end: 6px;
}

.resume-exp__highlights :deep(.v-list-item__spacer) {
  width: 6px;
}

.resume-exp__highlights :deep(.v-list-item) {
  min-height: unset;
}

.resume-exp__highlight-item :deep(.v-list-item__content) {
  padding: 0 !important;
}
</style>
