<template>
  <div class="mb-8">
    <p
      v-if="title"
      class="text-caption text-uppercase font-weight-bold text-medium-emphasis mb-3"
    >
      {{ title }}
    </p>
    <div class="carousel-wrap mx-auto">
      <v-carousel
        show-arrows="hover"
        height="420"
        rounded="xl"
        :hide-delimiters="images.length <= 1"
      >
        <v-carousel-item
          v-for="(image, i) in images"
          :key="i"
          :src="image.src"
          :alt="image.alt"
          contain
        />
      </v-carousel>
      <p
        v-if="images.length > 1"
        class="text-caption text-center text-medium-emphasis mt-2"
      >
        {{ images.length }} screenshots — use arrows to browse
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  images: Array<{ src: string; alt?: string }>;
  title?: string;
}>();
</script>

<style scoped>
.carousel-wrap {
  max-width: 820px;
}
</style>
