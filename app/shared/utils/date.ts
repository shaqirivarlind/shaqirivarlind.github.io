import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

type DateInput = string | null | undefined

function parseLoose(input: string): dayjs.Dayjs {
  // Support both `YYYY-MM` (most common in this app) and ISO-like `YYYY-MM-DD`.
  const trimmed = input.trim()
  if (/^\d{4}-\d{2}$/.test(trimmed)) return dayjs(trimmed, 'YYYY-MM', true)
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return dayjs(trimmed, 'YYYY-MM-DD', true)
  return dayjs(trimmed)
}

export function formatMonth(input: DateInput, fallback = ''): string {
  if (!input) return fallback
  const d = parseLoose(input)
  return d.isValid() ? d.format('MMM YYYY') : input
}

export function formatMonthRange(start: DateInput, end: DateInput): string {
  const s = formatMonth(start, '')
  const e = formatMonth(end, '')
  if (!s && !e) return ''
  if (s && !e) return s
  if (!s && e) return e
  return `${s} – ${e}`
}

