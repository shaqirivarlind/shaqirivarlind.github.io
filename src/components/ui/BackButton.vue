<template>
  <v-btn
    :icon="false"
    variant="text"
    prepend-icon="mdi-arrow-left"
    @click="goBack"
  >
    {{ label }}
  </v-btn>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ label?: string; fallback?: string }>(),
  {
    label: "Back",
    fallback: "/",
  },
);

const router = useRouter();

function goBack() {
  if (router.options.history.state.back) {
    router.back();
  } else {
    router.push(props.fallback);
  }
}
</script>
