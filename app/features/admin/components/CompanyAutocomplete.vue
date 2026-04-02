<template>
  <v-autocomplete
    v-model="companyId"
    :items="items"
    item-value="value"
    item-title="title"
    label="Company *"
    density="comfortable"
    variant="outlined"
    auto-select-first
    clearable
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CompanyEntry } from '~/features/admin/types'

interface Props {
  companies: CompanyEntry[]
  companyId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{ 'update:companyId': [value: string] }>()

const companyId = computed({
  get: () => props.companyId,
  set: (val: string) => emit('update:companyId', val),
})

const items = computed(() => props.companies.map(c => ({ value: c.id, title: c.name })))
</script>