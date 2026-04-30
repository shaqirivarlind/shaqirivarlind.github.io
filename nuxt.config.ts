// https://nuxt.com/docs/api/configuration/nuxt-config
import { vuetifyConfigs } from "./src/configs/vuetifyConfigs";

export default defineNuxtConfig({
  extends: process.env.CV_WITH_ADMIN === "true" ? ["./admin"] : [],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  sourcemap: { client: false, server: false },
  ssr: false,
  srcDir: "src/",
  css: [
    "~/assets/styles/global.css",
    "~/assets/styles/print.css",
    "@mdi/font/css/materialdesignicons.css",
  ],
  modules: ["@pinia/nuxt", "vuetify-nuxt-module"],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      meta: [{ name: "google", content: "notranslate" }],
    },
  },
  experimental: {
    payloadExtraction: "client",
  },
  nitro: {
    experimental: {
      payloadExtraction: true,
    },
  },
  vite: {
    build: {
      sourcemap: false,
      modulePreload: {
        polyfill: false,
      },
      // Avoid noisy esbuild CSS minify warnings caused by Vuetify's layered CSS output.
      // (This only affects minification; CSS is still bundled correctly.)
      cssMinify: false,
    },
    // Avoid noisy esbuild CSS minify warnings caused by Vuetify's layered CSS output.
    // (This only affects minification; CSS is still bundled correctly.)
  },
  vuetify: vuetifyConfigs,
});
