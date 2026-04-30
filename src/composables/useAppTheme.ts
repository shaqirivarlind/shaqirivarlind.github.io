import { computed } from "vue";
import { useTheme } from "vuetify";
import { AppTheme } from "@/components/layout/types";

export function useAppTheme() {
  const theme = useTheme();

  const currentTheme = computed<AppTheme>(
    () => theme.global.name.value as AppTheme,
  );

  const themeIcon = computed<string>(() =>
    currentTheme.value === AppTheme.DARK
      ? "mdi-weather-sunny"
      : "mdi-weather-night",
  );

  function toggleTheme() {
    theme.change(
      currentTheme.value === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK,
    );
  }

  return { themeIcon, toggleTheme };
}
