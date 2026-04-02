const isExternalUrl = (href: string) => /^https?:\/\//.test(href)

export const linkTarget = (href: string) => (isExternalUrl(href) ? '_blank' : undefined)

export const linkRel = (href: string) => (isExternalUrl(href) ? 'noopener noreferrer' : undefined)
