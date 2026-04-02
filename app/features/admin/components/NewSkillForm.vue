<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import slugify from 'slugify'
import { DEFAULT_ORDER_WEIGHT } from '~/features/admin/constants'

interface Props {
  allCategories: string[]
  submitting: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [{ id: string; label: string; category: string; orderWeight: number }]
}>()

const skillId = ref('')
const skillLabel = ref('')
const skillCategory = ref('tech')
const customCategory = ref('')
const useCustomCategory = ref(false)
const skillOrderWeight = ref(DEFAULT_ORDER_WEIGHT)

const categoryItems = computed(() => [
  ...props.allCategories.map(category => ({ value: category, title: category })),
  { value: '__new__', title: '+ New category…' },
])

watch(skillLabel, (newLabel) => {
  if (!skillId.value) skillId.value = slugify(newLabel, { lower: true, strict: true })
})

function handleCategoryChange(value: string) {
  useCustomCategory.value = value === '__new__'
}

function handleSubmit() {
  const resolvedCategory = useCustomCategory.value ? customCategory.value.trim() : skillCategory.value
  emit('submit', {
    id: skillId.value,
    label: skillLabel.value,
    category: resolvedCategory,
    orderWeight: skillOrderWeight.value,
  })
}

function reset() {
  skillId.value = ''
  skillLabel.value = ''
  skillCategory.value = 'tech'
  customCategory.value = ''
  useCustomCategory.value = false
  skillOrderWeight.value = DEFAULT_ORDER_WEIGHT
}

defineExpose({ reset })
</script>

<template>
  <v-row density="comfortable">
    <v-col cols="12" sm="6">
      <v-text-field v-model="skillLabel" label="Label" placeholder="Tailwind CSS" density="compact" variant="outlined" />
    </v-col>
    <v-col cols="12" sm="3">
      <v-text-field
        v-model="skillId"
        label="ID (auto)"
        placeholder="tailwindcss"
        density="compact"
        variant="outlined"
        class="font-monospace"
      />
    </v-col>
    <v-col cols="12" sm="3">
      <v-text-field
        v-model.number="skillOrderWeight"
        label="Weight (0–100)"
        type="number"
        min="0"
        max="100"
        density="compact"
        variant="outlined"
      />
    </v-col>
    <v-col cols="12" :sm="useCustomCategory ? 4 : 8">
      <v-select
        v-model="skillCategory"
        :items="categoryItems"
        item-value="value"
        item-title="title"
        label="Category"
        density="compact"
        variant="outlined"
        @update:model-value="handleCategoryChange"
      />
    </v-col>
    <v-col v-if="useCustomCategory" cols="12" sm="4">
      <v-text-field
        v-model="customCategory"
        label="New category name"
        placeholder="e.g. mobile"
        density="compact"
        variant="outlined"
      />
    </v-col>
    <v-col cols="12">
      <v-btn
        :loading="submitting"
        color="secondary"
        variant="tonal"
        size="small"
        @click="handleSubmit"
      >
        Add skill
      </v-btn>
    </v-col>
  </v-row>
</template>
