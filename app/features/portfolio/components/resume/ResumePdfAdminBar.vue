<script setup lang="ts">
import type { Ref } from 'vue'
import { useVueToPrint } from 'vue-to-print'
import { RESUME_PRINT_TARGET_KEY } from '~/features/portfolio/constants'

const printTargetEl = inject<Ref<HTMLElement>>(RESUME_PRINT_TARGET_KEY, ref(null as unknown as HTMLElement))

function getPrintTarget(): HTMLElement {
  // `vue-to-print` requires a concrete element; avoid triggering print while ref is not set.
  const el = printTargetEl.value
  if (!el) throw new Error('Print target element not ready')
  return el
}

const { handlePrint } = useVueToPrint({
  content: getPrintTarget,
  documentTitle: 'Resume',
  removeAfterPrint: true,
  async onPrintError(errorLocation, error) {
    console.error('[resume print error]', errorLocation, error)
    // Fallback to regular print (prints whole page) if the library fails.
    try { 
      await nextTick()
      window.print() 
    } catch { /* noop */ }
  },
})
</script>

<template>
  <div class="resume-admin d-flex justify-end mb-3">
    <v-btn
      color="primary"
      variant="tonal"
      size="small"
      rounded="lg"
      class="resume-admin__pdf w-100 w-sm-auto"
      prepend-icon="mdi-file-pdf-box"
      @click="handlePrint"
    >
      Save PDF
    </v-btn>
  </div>
</template>
