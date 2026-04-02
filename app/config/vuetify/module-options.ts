import { AppTheme } from '../../shared/constants'

/** vuetify-nuxt-module options (SSR client hints, etc.). */
export const vuetifyModuleOptions = {
  ssrClientHints: {
    prefersColorScheme: true,
    prefersColorSchemeOptions: {
      cookieName: 'color-scheme',
      darkThemeName: AppTheme.DARK,
      lightThemeName: AppTheme.LIGHT,
    },
  },
} as const
