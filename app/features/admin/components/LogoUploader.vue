<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const uploading    = ref(false)
const errorMessage = ref('')

async function onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement
  const file  = input.files?.[0]
  if (!file) return

  errorMessage.value = ''
  uploading.value    = true

  try {
    const formData = new FormData()
    formData.append('file', file)
    const result = await $fetch<{ path: string }>('/api/admin/upload-logo', { method: 'POST', body: formData })
    emit('update:modelValue', result.path)
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : (error as { data?: { message?: string } }).data?.message
    errorMessage.value = msg ?? 'Upload failed'
  }

  uploading.value  = false
  input.value      = ''
}
</script>

<template>
  <div>
    <template v-if="modelValue">
      <v-img
        :src="modelValue"
        height="48"
        max-width="160"
        contain
        @click="emit('update:modelValue', '')"
      />
    </template>

    <template v-else>
      <input
        ref="fileInputRef"
        type="file"
        accept=".svg,.png,.jpg,.jpeg,.webp"
        class="d-none"
        @change="onFileSelected"
      />
      <v-btn
        variant="outlined"
        size="small"
        prepend-icon="mdi-upload"
        :loading="uploading"
        @click="fileInputRef?.click()"
      >
        Upload logo
      </v-btn>
      <p v-if="errorMessage" class="text-caption text-error mt-1">{{ errorMessage }}</p>
    </template>
  </div>
</template>
