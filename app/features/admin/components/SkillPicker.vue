<script lang="ts" setup>
import { computed } from 'vue'
import type { SkillEntry } from '~/features/admin/types'

interface Props {
  modelValue: string[]
  allCategories: string[]
  skillsByCategory: Record<string, SkillEntry[]>
}

const props = defineProps<Props>()

const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>()

// Stable computed map — avoids returning new array references on every render,
// which would cause v-select[multiple] to emit update:modelValue infinitely.
const selectedByCategory = computed((): Record<string, string[]> => {
  const result: Record<string, string[]> = {}
  for (const category of props.allCategories) {
    const categoryIds = new Set((props.skillsByCategory[category] ?? []).map(s => s.id))
    result[category] = props.modelValue.filter(id => categoryIds.has(id))
  }
  return result
})

const itemsByCategory = computed((): Record<string, { value: string; title: string }[]> => {
  const result: Record<string, { value: string; title: string }[]> = {}
  for (const category of props.allCategories) {
    result[category] = (props.skillsByCategory[category] ?? []).map(s => ({ value: s.id, title: s.label }))
  }
  return result
})

function onCategoryChange(category: string, newSelection: string[]): void {
  const categoryIds = new Set((props.skillsByCategory[category] ?? []).map(s => s.id))
  const withoutThisCategory = props.modelValue.filter(id => !categoryIds.has(id))
  emit('update:modelValue', [...withoutThisCategory, ...newSelection])
}
</script>

<template>
  <v-row>
    <v-col
      v-for="category in allCategories"
      :key="category"
      cols="12"
      sm="6"
      md="4"
    >
      <v-select
        :model-value="selectedByCategory[category]"
        :items="itemsByCategory[category]"
        :label="category"
        item-value="value"
        item-title="title"
        multiple
        chips
        closable-chips
        density="comfortable"
        variant="outlined"
        hide-details
        @update:model-value="onCategoryChange(category, $event)"
      />
    </v-col>
  </v-row>
</template>
