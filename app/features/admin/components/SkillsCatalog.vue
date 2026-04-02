<template>
  <v-card rounded="xl" border elevation="0" class="pa-5">
    <div v-for="category in allCategories" :key="category" class="mb-4">
      <p class="text-overline text-disabled mb-2">{{ category }}</p>
      <div class="d-flex flex-wrap ga-1">
        <v-chip v-for="skill in skillsByCategory[category]" :key="skill.id" size="x-small" variant="outlined">
          <span class="font-monospace">{{ skill.id }}</span>
          <span class="text-disabled ml-1">{{ skill.label }}</span>
          <span class="text-disabled ml-1 opacity-50">{{ skill.orderWeight }}</span>
        </v-chip>
      </div>
    </div>

    <v-divider class="my-4" />

    <p class="text-caption font-weight-semibold mb-3">Add New Skill</p>
    <AdminNewSkillForm :all-categories="allCategories" :submitting="submitting" @submit="submitNewSkill" />
  </v-card>
</template>

<script setup lang="ts">
import type { SkillEntry } from '~/features/admin/types'
import AdminNewSkillForm from './NewSkillForm.vue'

interface Props {
  allCategories: string[]
  skillsByCategory: Record<string, SkillEntry[]>
  submitting: boolean
  submitNewSkill: (skillData: { id: string; label: string; category: string; orderWeight: number }) => void
}

const props = defineProps<Props>()
</script>
