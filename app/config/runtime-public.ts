/**
 * Default public site origin for resolving relative `/api/*` when plain ofetch runs without Nuxt `$fetch`.
 * Used by `nuxt.config` `runtimeConfig.public.siteUrl`.
 * Override with `NUXT_PUBLIC_SITE_URL` (e.g. custom dev port).
 */
export function defaultPublicSiteUrl(): string {
  if (process.env.NUXT_PUBLIC_SITE_URL) {
    return process.env.NUXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://shaqirivarlind.github.io'
}
