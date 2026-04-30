<template>
  <v-container id="capabilities" class="py-8 py-md-16">
    <SectionSheet title="Capabilities">
      <v-row class="text-center">
        <v-col v-for="group in capabilities" :key="group.id" cols="12" md="4">
          <CapabilityCard :capability="group" />
        </v-col>
      </v-row>
    </SectionSheet>
  </v-container>
</template>

<script setup lang="ts">
import type { Capability } from "@/shared/type-data";
import SectionSheet from "@/components/ui/SectionSheet.vue";
import CapabilityCard from "./CapabilityCard.vue";

const capabilitiesStore = useCapabilitiesStore();
const capabilities = computed<Capability[]>(() => capabilitiesStore.allCapabilities);
</script>
