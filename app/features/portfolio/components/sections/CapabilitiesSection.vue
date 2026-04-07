<script setup lang="ts">
import { storeToRefs } from 'pinia'

const capabilityStore = useCapabilitiesStore()
const { capabilities } = storeToRefs(capabilityStore)
</script>

<template>
  <v-sheet
    id="capabilities"
    tag="section"
    border="t"
    color="background"
  >
    <v-container class="py-16 py-md-24">
      <template v-if="capabilities.length">
        <h2 class="text-h4 text-md-h3 font-weight-black text-center mb-12">
          Capabilities
        </h2>

        <v-row class="text-center">
          <v-col
            v-for="group in capabilities"
            :key="group.category"
            cols="12"
            md="4"
            class="px-6"
          >
            <p class="mb-3" style="font-size: 3.5rem; line-height: 1">
              {{ group.icon }}
            </p>

            <h3 class="text-h6 font-weight-black mb-4">
              {{ group.category }}
            </h3>

            <div
              v-for="item in group.items ?? []"
              :key="item"
              class="text-body-1 text-medium-emphasis"
            >
              {{ item }}
            </div>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </v-sheet>
</template>
