import type { PortfolioData } from '../types'
import { portfolioData } from '../data/portfolio'

/** Provides the full static portfolio dataset to components. */
export const usePortfolio = (): { portfolio: PortfolioData } => ({ portfolio: portfolioData })
