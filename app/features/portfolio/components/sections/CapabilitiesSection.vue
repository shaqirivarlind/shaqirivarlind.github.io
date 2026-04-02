<script setup lang="ts">
const { portfolio } = usePortfolio()

const categoryEmoji: Record<string, string> = {
  'UX/CX': '😍',
  'Product Design': '🎨',
  Development: '👨🏼‍💻',
}
</script>

<template>
  <v-sheet id="capabilities" tag="section" border="t" color="background">
    <v-container class="py-16 py-md-24">
      <h2 class="text-h4 text-md-h3 font-weight-black text-high-emphasis text-center mb-12">
        Capabilities
      </h2>

      <v-row class="text-center">
        <v-col
          v-for="group in portfolio.capabilities"
          :key="group.category"
          cols="12"
          md="4"
          class="px-6"
        >
          <p class="mb-3" style="font-size: 3.75rem; line-height: 1">
            {{ categoryEmoji[group.category] ?? '✨' }}
          </p>
          <h3 class="text-h6 font-weight-black text-high-emphasis mb-4">
            {{ group.category }}
          </h3>
          <div
            v-for="item in group.items"
            :key="item"
            class="text-body-1 text-medium-emphasis"
            style="line-height: 1.6"
          >
            {{ item }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
