<script setup lang="ts">
import { ref } from 'vue'

const LABELS = {
  section: 'Project images',
  hint: 'Upload screenshots or visuals for this product. Shown on the project page and the homepage card (first image).',
  add: 'Add images',
  remove: 'Remove',
} as const

interface Props {
  images: string[]
}

const props = defineProps<Props>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const uploading     = ref(false)
const errorMessage  = ref('')

async function onFilesSelected(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement
  const files = input.files
  if (!files?.length) return

  errorMessage.value = ''
  uploading.value    = true
  try {
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      const result = await $fetch<{ path: string }>('/api/admin/upload-project-image', {
        method: 'POST',
        body:   formData,
      })
      props.images.push(result.path)
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : (error as { data?: { message?: string } }).data?.message
    errorMessage.value = msg ?? 'Upload failed'
  } finally {
    uploading.value = false
    input.value       = ''
  }
}

function removeAt(index: number): void {
  props.images.splice(index, 1)
}
</script>

<template>
  <div class="mt-4">
    <p class="text-caption text-medium-emphasis font-weight-semibold mb-1">{{ LABELS.section }}</p>
    <p class="text-caption text-disabled mb-3">{{ LABELS.hint }}</p>

    <input
      ref="fileInputRef"
      type="file"
      accept=".svg,.png,.jpg,.jpeg,.webp"
      multiple
      class="d-none"
      @change="onFilesSelected"
    />
    <v-btn
      variant="outlined"
      size="small"
      prepend-icon="mdi-image-plus"
      :loading="uploading"
      class="mb-3"
      @click="fileInputRef?.click()"
    >
      {{ LABELS.add }}
    </v-btn>
    <p v-if="errorMessage" class="text-caption text-error mb-2">{{ errorMessage }}</p>

    <v-row v-if="images.length" density="compact" class="mt-1">
      <v-col v-for="(src, index) in images" :key="`${src}-${index}`" cols="6" sm="4" md="3">
        <v-sheet rounded="lg" border class="pa-1 position-relative">
          <v-img :src="src" height="100" cover rounded="lg" />
          <v-btn
            icon="mdi-close"
            size="x-small"
            variant="flat"
            color="error"
            class="position-absolute"
            style="top: 6px; right: 6px"
            :aria-label="LABELS.remove"
            @click="removeAt(index)"
          />
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
