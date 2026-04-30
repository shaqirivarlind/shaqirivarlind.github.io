<template>
  <NuxtLink :to="`/projects/${project.id}`" class="text-decoration-none">
    <v-card
      :color="bgColor"
      rounded="lg"
      flat
      class="project-card overflow-hidden pa-6 d-flex flex-column justify-space-between flex-wrap ga-12"
      height="650"
    >
      <!-- Title top: text top-left, image bleeds off right -->
      <template v-if="textPosition === TEXT_POSITION.TOP">
        <h2 class="font-weight-black text-white ma-0">
          {{ project.name }}
        </h2>

        <div class="position-relative flex-grow-1">
          <div class="large-image mt-16 ml-16">
            <v-img
              v-if="images[0]"
              :src="images[0]!.src"
              rounded="xl"
              cover
              gradient="to right, transparent, rgba(0,0,0,.15)"
            />
          </div>
          <div class="small-image top-0 mt-1 ml-4">
            <v-img
              v-if="images[1]"
              :src="images[1]!.src"
              rounded="xl"
              gradient="to right, transparent, rgba(0,0,0,.15)"
            />
          </div>
        </div>
      </template>

      <!-- Title bottom: image bleeds off left, text bottom-right -->
      <template v-else>
        <div class="position-relative flex-grow-1">
          <div class="large-image bottom-0 mb-16 ml-16">
            <v-img
              v-if="images[0]"
              :src="images[0]!.src"
              rounded="xl"
              cover
              gradient="to right, transparent, rgba(0,0,0,.15)"
            />
          </div>
          <div class="small-image bottom-0 mb-n16 ml-4">
            <v-img
              v-if="images[1]"
              :src="images[1]!.src"
              rounded="xl"
              gradient="to right, transparent, rgba(0,0,0,.15)"
            />
          </div>
        </div>

        <h2 class="font-weight-black text-white ma-0 mt-16">
          {{ project.name }}
        </h2>
      </template>
    </v-card>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ProjectImage } from "@/shared/type-data";
import { TEXT_POSITION } from "../types";
import type { ProjectCardProps } from "../types";

const props = defineProps<ProjectCardProps>();

const images = computed<ProjectImage[]>(() => props.project.images?.slice(0, 2) ?? []);
</script>

<style scoped>
.project-card {
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12) !important;
  will-change: transform;
  transform-origin: center;
}

.project-card:hover {
  transform: scale(1.03);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18) !important;
}

.large-image {
  position: absolute;
  width: 150%;
  height: auto;
}
.small-image {
  position: absolute;
  width: 250px;
  height: auto;
}
</style>
