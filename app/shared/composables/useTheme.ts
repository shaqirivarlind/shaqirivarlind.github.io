import { computed, type ComputedRef } from 'vue'
import { useTheme as useVuetifyTheme } from 'vuetify'
import { AppTheme } from '~/shared/constants'
import type { AppThemeName } from '~/shared/types'

/**
 * Thin wrapper around Vuetify `useTheme`.
 * Persistence + SSR alignment come from **vuetify-nuxt-module** `ssrClientHints.prefersColorScheme`
 * (cookie `color-scheme`, optional `Sec-CH-Prefers-Color-Scheme`), not localStorage.
 */
export const useAppTheme = (): {
  currentTheme: ComputedRef<AppThemeName>
  toggleTheme: () => void
} => {
  const vuetifyTheme = useVuetifyTheme()

  const currentTheme = computed(() => vuetifyTheme.global.name.value as AppThemeName)

  const toggleTheme = () => {
    const nextTheme = currentTheme.value === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK
    vuetifyTheme.change(nextTheme)
  }

  return { currentTheme, toggleTheme }
}
