<template>
  <AsideSection title="Contact">
    <v-list density="compact" class="pa-0 bg-transparent">
      <v-list-item
        v-for="contact in contacts"
        :key="contact.label"
        :href="contact.link?.url"
        :target="contact.link?.target"
        :ripple="false"
        class="pa-0 contact-item align-center"
        style="min-height: unset; height: auto"
      >
        <template #prepend>
          <div style="width: 22px">
            <v-icon
              :icon="contact.link?.icon ?? 'mdi-link-variant'"
              size="18"
              class="text-medium-emphasis"
            />
          </div>
        </template>

        <v-list-item-title class="text-body-medium text-medium-emphasis">
          {{ contact.value }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </AsideSection>
</template>

<script setup lang="ts">
import type { PersonContact } from "@/shared/type-data";
import AsideSection from "@/components/ui/AsideSection.vue";

const personStore = usePersonStore();
const contacts = computed<PersonContact[]>(() => personStore.contacts);
</script>

<style scoped>
.contact-item {
  overflow: visible !important;
}

.contact-item :deep(.v-list-item__overlay) {
  display: none;
}

.contact-item:hover :deep(.v-list-item-title),
.contact-item:hover :deep(.v-icon) {
  color: rgb(var(--v-theme-primary)) !important;
  cursor: pointer;
}
</style>
