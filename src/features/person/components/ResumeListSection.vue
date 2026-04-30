<template>
  <AsideSection :title="title">
    <v-list density="compact" class="pa-0 bg-transparent" :lines="lines">
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        class="pa-0"
        :style="itemStyle"
      >
        <v-list-item-title
          class="text-body-2 font-weight-semibold text-high-emphasis"
          :class="titleClass"
        >
          {{ item.primary }}
        </v-list-item-title>

        <v-list-item-subtitle
          v-if="item.secondary"
          class="text-body-small text-medium-emphasis"
        >
          {{ item.secondary }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </AsideSection>
</template>

<script setup lang="ts">
import AsideSection from "@/components/ui/AsideSection.vue";
import type { ListItem } from "@/shared/types";

defineProps<{
  title: string;
  items: ListItem[];
  lines?: false | "one" | "two" | "three";
  itemStyle?: string;
  titleClass?: string;
}>();
</script>
