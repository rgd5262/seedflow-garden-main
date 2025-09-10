import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Locale } from '@/constants/i18n'

interface LocaleContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

const STORAGE_KEY = 'app-locale'

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('ko')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (saved === 'en' || saved === 'ko') {
      setLocale(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale }), [locale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocale()
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ko">한국어</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
