// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { defaultPublicSiteUrl } from './app/config/runtime-public'
import { vuetifyAppOptions, vuetifyModuleOptions } from './app/config/vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'app',
  devtools: { enabled: true },
  imports: {
    dirs: ['shared/composables', 'features/portfolio/composables', 'features/admin/composables'],
  },
  modules: ['vuetify-nuxt-module', '@pinia/nuxt'],
  pinia: {
    storesDirs: ['./shared/stores'],
  },
  vuetify: {
    moduleOptions: vuetifyModuleOptions,
    vuetifyOptions: vuetifyAppOptions,
  },
  css: ['@mdi/font/css/materialdesignicons.min.css', '~/assets/css/main.css'],
  spaLoadingTemplate: false,
  runtimeConfig: {
    public: {
      /** Resolves relative `/api/*` for ofetch fallback (dev: localhost, prod: GitHub Pages). */
      siteUrl: defaultPublicSiteUrl(),
      /** Simple local-only admin gate (do not use for real security). */
      adminPassword: process.env.NUXT_PUBLIC_ADMIN_PASSWORD || '',
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'slugify', // CJS
        '@vueuse/core',
        'countries-list',
      ],
    },
  },
  /**
   * GitHub Pages base path (must be a path, never a hostname).
   * - User/org site repo `username.github.io` → served at domain root → `'/'` (default).
   * - Project site `username.github.io/repo/` → set to `'/repo/'` (leading + trailing slash).
   */
  app: {
    baseURL: '/',
  },
})