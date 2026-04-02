import { vuetifyDefaults } from './defaults'
import { vuetifyIcons } from './icons'
import { vuetifyTheme } from './theme'

/** Passed to `vuetify.vuetifyOptions` in `nuxt.config`. */
export const vuetifyAppOptions = {
  icons: vuetifyIcons,
  theme: vuetifyTheme,
  defaults: vuetifyDefaults,
} as const

export { vuetifyModuleOptions } from './module-options'
export { vuetifyTheme } from './theme'
