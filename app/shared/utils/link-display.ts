/** Shorten a URL for display / print (no `https://`, no leading `www.`). */
export function displayHrefForPrint(href: string): string {
  const t = href.trim()
  if (!t) return ''
  const lower = t.toLowerCase()
  if (lower.startsWith('mailto:')) {
    const raw = t.slice(7)
    try {
      return decodeURIComponent(raw)
    } catch {
      return raw
    }
  }
  if (lower.startsWith('tel:')) return t.slice(4).trim()
  try {
    const u = new URL(t)
    const host = u.hostname.replace(/^www\./i, '')
    const path = u.pathname === '/' ? '' : u.pathname
    return `${host}${path}${u.search}${u.hash}`.replace(/\/$/, '') || host
  } catch {
    return t
      .replace(/^https?:\/\//i, '')
      .replace(/^www\./i, '')
      .replace(/\/$/, '')
  }
}
