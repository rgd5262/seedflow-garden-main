import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toIsoDateKey(date: Date): string {
  return new Date(date.getTime() - (date.getMilliseconds())).toISOString().split('T')[0]
}

export function isLeapYear(year: number): boolean {
  return new Date(year, 1, 29).getDate() === 29
}
