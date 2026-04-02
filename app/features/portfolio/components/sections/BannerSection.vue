<script setup lang="ts">
const { portfolio } = usePortfolio()
</script>

<template>
  <section id="top">
    <v-container>
      <v-row align="center" class="py-12 py-md-20">
        <v-col cols="12" md="7">
          <p class="text-headline-small mb-4">
            <span class="text-medium-emphasis">Hi there, I'm {{ portfolio.person.firstName }}</span> 👋
          </p>
          <h1 class="text-headline-large font-weight-black text-high-emphasis">
            {{ portfolio.person.role }}
          </h1>
          <p class="text-headline-small text-medium-emphasis mt-6">
            {{ portfolio.person.tagline }}
          </p>
        </v-col>

        <v-col cols="12" md="5" class="d-flex justify-center justify-md-end">
          <div style="position: relative; max-width: 320px; width: 100%">
            <v-img
              :src="portfolio.person.profileImage"
              :alt="`${portfolio.person.fullName} profile`"
            />
            <div class="profile-fade" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.profile-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 256px;
  border-radius: 0 0 16px 16px;
  background: linear-gradient(to top, rgb(var(--v-theme-background)) 0%, transparent 100%);
  z-index: 2;
  pointer-events: none;
}
</style>
