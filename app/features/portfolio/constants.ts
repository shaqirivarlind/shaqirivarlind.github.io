import type { PortfolioConfig } from './types'

/** Fixed “document” width for resume (screen + consistent layout; mobile scrolls horizontally). */
export const RESUME_PAPER_WIDTH_PX = 1120

export const RESUME_PRINT_TARGET_KEY = Symbol('resumePrintTarget')

export const portfolioConfig: PortfolioConfig = {
  navItems: [
    { label: 'Projects',      href: '/#projects',      platform: 'internal' },
    { label: 'Capabilities',  href: '/#capabilities',  platform: 'internal' },
    { label: 'Resume',        href: '/resume',         platform: 'internal' },
    { label: 'Contact',       href: '/#contact',       platform: 'internal' },
  ],
}
