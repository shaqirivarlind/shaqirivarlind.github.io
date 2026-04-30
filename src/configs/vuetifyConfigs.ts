import type { ModuleOptions } from "vuetify-nuxt-module";
import { AppTheme } from "../components/layout/types";

export const vuetifyConfigs: ModuleOptions = {
  moduleOptions: {
    ssrClientHints: {
      prefersColorScheme: true,
      prefersColorSchemeOptions: {
        darkThemeName: AppTheme.DARK,
        lightThemeName: AppTheme.LIGHT,
        useBrowserThemeOnly: false,
      },
    },
  },
  vuetifyOptions: {
    icons: {
      defaultSet: "mdi",
    },
    defaults: {
      VContainer: {
        maxWidth: "1200px",
      },
      VBtn: {
        style: "letter-spacing: 0.025em; font-weight: 700;",
      },
    },
    theme: {
      defaultTheme: AppTheme.LIGHT,
      themes: {
        light: {
          dark: false,
          colors: {
            background: "#f8fafc",
            surface: "#ffffff",
            "surface-variant": "#f1f5f9",
            primary: "#0891b2",
            secondary: "#64748b",
            error: "#ef4444",
            success: "#22c55e",
            warning: "#f59e0b",
            info: "#3b82f6",
          },
        },
        dark: {
          dark: true,
          colors: {
            background: "#020617",
            surface: "#0f172a",
            "surface-variant": "#1e293b",
            primary: "#22d3ee",
            secondary: "#94a3b8",
            error: "#f87171",
            success: "#4ade80",
            warning: "#fbbf24",
            info: "#60a5fa",
          },
        },
      },
    },
  },
};
