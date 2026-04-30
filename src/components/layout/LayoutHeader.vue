<template>
  <v-skeleton-loader v-if="loading" type="text" class="px-16" />
  <template v-else>
    <v-app-bar border="b" scroll-behavior="hide" scroll-threshold="50" flat>
      <v-container class="d-flex align-center fill-height">
        <v-app-bar-title>
          <NuxtLink
            to="/"
            class="text-decoration-none text-high-emphasis font-weight-bold hover:text-primary"
          >
            {{ personStore.fullName }}
          </NuxtLink>
        </v-app-bar-title>

        <v-spacer />
        <template v-if="!mobile">
          <v-btn
            v-for="item in navItems"
            :key="item.href"
            v-bind="navProps(item.href)"
            variant="text"
            size="small"
            @click.prevent="navigate(item.href)"
          >
            {{ item.label }}
          </v-btn>
        </template>

        <v-btn :icon="themeIcon" variant="text" @click="toggleTheme" />

        <v-app-bar-nav-icon v-if="mobile" @click="drawer = !drawer" />
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary location="end">
      <v-list nav>
        <v-list-item
          v-for="item in navItems"
          :key="item.href"
          v-bind="navProps(item.href)"
          :title="item.label"
          @click.prevent="navigate(item.href); drawer = false"
        />
      </v-list>
    </v-navigation-drawer>
  </template>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
import { navItems } from "./constants";
import { useAppTheme } from "@/composables/useAppTheme";

const { themeIcon, toggleTheme } = useAppTheme();
const personStore = usePersonStore();
const loading = computed<boolean>(() => personStore.loading);
const { mobile } = useDisplay();

const drawer = ref(false);

function navProps(href: string) {
  return href.includes("#") ? { href } : { to: href, exact: true };
}

const router = useRouter();

function navigate(href: string) {
  router.push(href);
}
</script>
