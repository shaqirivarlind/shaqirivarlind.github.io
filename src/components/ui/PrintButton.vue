<template>
  <v-btn
    :loading="printing"
    prepend-icon="mdi-printer-outline"
    variant="tonal"
    color="primary"
    @click="handlePrint"
  >
    Print
  </v-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useVueToPrint } from "vue-to-print";

const props = defineProps<{ contentRef: HTMLElement | null }>();

const printing = ref(false);

function unwrapVueRef(reference: HTMLElement | null): HTMLElement | null {
  if (!reference) return null;
  return (reference as any).$el ?? reference;
}

const { handlePrint } = useVueToPrint({
  content: () => unwrapVueRef(props.contentRef)!,
  documentTitle: "Resume",
  removeAfterPrint: true,
  copyStyles: true,
  pageStyle: `@page { size: A4 portrait; margin: 0.5in 0.5in 0.75in 0.5in; }`,
  print: async (iframe) => {
    await iframe.contentDocument?.fonts.ready;
    iframe.contentWindow?.print();
  },
  onBeforeGetContent: () => {
    printing.value = true;
  },
  onAfterPrint: () => {
    printing.value = false;
  },
});
</script>
