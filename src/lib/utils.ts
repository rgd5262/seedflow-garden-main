import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toIsoDateKey(date: Date): string {
  return new Date(date.getTime() - (date.getMilliseconds())).toISOString().split('T')[0]
}

// Local-date helpers: create and parse YYYY-MM-DD without UTC shifts
export function formatLocalDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const mm = m < 10 ? `0${m}` : `${m}`
  const dd = d < 10 ? `0${d}` : `${d}`
  return `${y}-${mm}-${dd}`
}

export function parseLocalDateKey(key: string): Date {
  // Expect key as YYYY-MM-DD; construct local Date to avoid UTC interpretation
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, (m || 1) - 1, d || 1)
}

export function isLeapYear(year: number): boolean {
  return new Date(year, 1, 29).getDate() === 29
}
