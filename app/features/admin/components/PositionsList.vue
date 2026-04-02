<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-3">
      <p class="text-caption text-medium-emphasis font-weight-semibold">Positions</p>
      <v-btn size="x-small" variant="tonal" @click="positions.push(makePosition())">
        + Add position
      </v-btn>
    </div>

    <v-expansion-panels multiple variant="accordion" class="mb-4">
      <v-expansion-panel v-for="(position, index) in positions" :key="index" :value="index">
        <v-expansion-panel-title>
          <div class="d-flex align-center justify-space-between w-100 mr-2">
            <div>
              <span class="text-body-2 font-weight-medium">
                {{ position.role || `Position ${index + 1}` }}
              </span>
              <span class="text-caption text-disabled ml-2">
                {{ position.startDate || '…' }} – {{ position.endPresent ? 'Present' : (position.endDate || '…') }}
              </span>
            </div>
            <v-btn
              icon="mdi-close"
              size="x-small"
              variant="text"
              color="error"
              @click.stop="removePositionAt(index)"
            />
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <AdminPositionForm
            :position="position"
            :all-categories="allCategories"
            :skills-by-category="skillsByCategory"
            :companies="companies"
            :make-project="makeProject"
            :make-client="makeClient"
            :on-create-client-company="onCreateClientCompany"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import type { PositionForm, ProjectForm, ClientForm, SkillEntry, CompanyEntry } from '~/features/admin/types'
import AdminPositionForm from './PositionForm.vue'

interface Props {
  positions: PositionForm[]
  makePosition: () => PositionForm
  allCategories: string[]
  skillsByCategory: Record<string, SkillEntry[]>
  companies: CompanyEntry[]
  makeProject: () => ProjectForm
  makeClient: () => ClientForm
  onCreateClientCompany?: (input: { name: string }) => Promise<string | null>
}

const props = defineProps<Props>()

const { confirmRemove } = useAdminConfirmRemove()

async function removePositionAt(index: number): Promise<void> {
  const position = props.positions[index]
  const label = position?.role?.trim() || `Position ${index + 1}`
  if (!await confirmRemove('position', label)) return
  props.positions.splice(index, 1)
}
</script>
