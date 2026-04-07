import { $fetch } from 'ofetch'

type NuxtGlobalFetch = <T>(url: string, opts?: object) => Promise<T>

function trimTrailingSlash(s: string) {
  return s.replace(/\/$/, '')
}

function toAbsolutePath(path: string, origin: string): string {
  const rel = path.startsWith('/') ? path : `/${path}`
  return `${trimTrailingSlash(origin)}${rel}`
}

/**
 * Shared fetch for `/api/load` and `/api/save`:
 * 1. Nuxt `globalThis.$fetch` when set (SSR/prerender + relative paths).
 * 2. Otherwise ofetch with absolute URL from `runtimeConfig.public.siteUrl` or `NUXT_PUBLIC_SITE_URL`.
 * 3. Last resort: relative ofetch (browser-only).
 */
export async function dbJsonFetch<T>(path: string, opts?: object): Promise<T> {
  const g = globalThis as { $fetch?: NuxtGlobalFetch }
  if (typeof g.$fetch === 'function') {
    return g.$fetch<T>(path, opts ?? {})
  }

  let origin = typeof process !== 'undefined' && process.env.NUXT_PUBLIC_SITE_URL
    ? trimTrailingSlash(process.env.NUXT_PUBLIC_SITE_URL)
    : ''

  if (!origin) {
    try {
      origin = trimTrailingSlash(String(useRuntimeConfig().public.siteUrl || ''))
    } catch {
      origin = ''
    }
  }

  if (origin) {
    return $fetch<T>(toAbsolutePath(path, origin), opts ?? {})
  }

  return $fetch<T>(path, opts ?? {})
}
