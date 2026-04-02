/** Formats 'YYYY-MM' → 'MM/YYYY', or 'YYYY' → 'YYYY' (year-only). */
const formatDateDisplay = (date: string): string => {
  if (/^\d{4}-\d{2}$/.test(date)) {
    const [year, month] = date.split('-')
    return `${month}/${year}`
  }
  return date
}

/** Returns a formatted range like "11/2021 - Present" or "2017 - 2021". */
export const formatDateRange = (startDate: string, endDate: string | null): string => {
  const start = formatDateDisplay(startDate)
  const end = endDate ? formatDateDisplay(endDate) : 'Present'
  return `${start} - ${end}`
}
