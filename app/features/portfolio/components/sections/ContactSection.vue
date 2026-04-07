<script setup lang="ts">
import { storeToRefs } from 'pinia'

const personStore = usePersonStore()
const { contacts } = storeToRefs(personStore)
</script>

<template>
  <v-sheet id="contact" tag="section" border="t" color="background">
    <v-container class="py-16">
      <div class="contact-section-root">
        <div v-if="contacts.length === 0" class="text-center">
          <p class="text-medium-emphasis">
            No contact information available.
          </p>
        </div>

        <div v-else>
          <div class="text-center mb-8">
            <h2 class="text-h5 text-sm-h4 font-weight-black text-high-emphasis">
              Contact
            </h2>
            <p class="text-body-1 text-medium-emphasis mt-2 mx-auto" style="max-width: 520px">
              Let's connect for frontend roles, freelance projects, or collaboration.
            </p>
          </div>

          <v-row>
            <v-col
              v-for="contact in contacts.slice(1)"
              :key="contact.label"
              cols="12"
              sm="6"
              lg="4"
            >
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  :href="contact.href"
                  :target="contact.target"
                  :elevation="isHovering ? 4 : 1"
                  rounded="xl"
                  class="pa-4"
                  style="text-decoration: none"
                >
                  <p class="text-subtitle-2 font-weight-semibold text-high-emphasis">
                    {{ contact.label }}
                  </p>
                  <p class="text-body-2 text-medium-emphasis mt-1" style="word-break: break-all">
                    {{ contact.value }}
                  </p>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </v-sheet>
</template>
