'use client'
import { ClerkProvider } from '@clerk/nextjs'
import { arSA } from '@clerk/localizations'
import { useLanguage } from '../context/LanguageContext'

export default function ClientProvider({ children }) {
  const { lang } = useLanguage()
  
  return (
    <ClerkProvider localization={lang === 'ar' ? arSA : undefined}>
      {children}
    </ClerkProvider>
  )
}
