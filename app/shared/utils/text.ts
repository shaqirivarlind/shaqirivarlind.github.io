import _slugify from 'slugify'

/** Converts a string to a URL-safe slug: lowercase, alphanumeric and hyphens only. */
export const slugify = (text: string): string =>
  _slugify(text, { lower: true, strict: true })

/** Returns up to 2 initials from a name, splitting on spaces, colons, ampersands and hyphens. */
export const initialsFor = (name: string): string =>
  name
    .split(/[\s:&-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
