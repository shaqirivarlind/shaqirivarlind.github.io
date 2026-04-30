<template>
  <v-container id="contact" class="py-8 py-md-16">
    <SectionSheet
      title="Contact"
      subtitle="Let's connect for frontend roles, freelance projects, or collaboration."
    >
      <div v-if="contacts.length === 0" class="text-center py-8">
        <p class="text-medium-emphasis">No contact information available.</p>
      </div>

      <v-row v-else class="py-4">
        <v-col
          v-for="contact in contacts.slice(1)"
          :key="contact.label"
          cols="12"
          sm="6"
          lg="4"
        >
          <HoverLinkCard
            :title="contact.label"
            :value="contact.value"
            :href="contact.link?.url"
            :target="contact.link?.target"
          />
        </v-col>
      </v-row>
    </SectionSheet>
  </v-container>
</template>

<script setup lang="ts">
import type { PersonContact } from "@/shared/type-data";
import SectionSheet from "@/components/ui/SectionSheet.vue";
import HoverLinkCard from "@/components/ui/HoverLinkCard.vue";

const personStore = usePersonStore();
const contacts = computed<PersonContact[]>(() => personStore.contacts);
</script>
