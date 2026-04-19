'use client'
import { SignUp } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { useLanguage } from '../../../../context/LanguageContext'
import { arSA } from '@clerk/localizations'

const clerkAppearance = {
  variables: {
    colorBackground: 'rgba(13, 19, 31, 0.65)',
    colorText: '#f1f5f9',
    colorTextSecondary: '#94a3b8',
    colorInputBackground: 'rgba(8, 14, 26, 0.8)',
    colorInputText: '#f1f5f9',
    colorPrimary: '#ff5260',
    colorDanger: '#fc8181',
    colorSuccess: '#00daf3',
    borderRadius: '1rem',
    fontFamily: 'Inter, sans-serif',
  },
  elements: {
    rootBox: { width: '100%', display: 'flex', justifyContent: 'center' },
    card: {
      background: 'rgba(13, 19, 31, 0.8)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 82, 96, 0.15)',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(255, 82, 96, 0.08)',
      width: '100%',
      padding: '2rem 1.5rem',
    },
    logoBox: { display: 'none' },
    headerTitle: { color: '#f8fafc', fontWeight: '800', fontSize: '1.5rem', textAlign: 'center' },
    headerSubtitle: { color: '#94a3b8', textAlign: 'center', fontSize: '0.9rem' },
    socialButtonsBlockButton: {
      background: 'rgba(8, 14, 26, 0.8)',
      border: '1px solid rgba(91, 64, 64, 0.4)',
      color: '#f1f5f9',
      transition: 'all 0.2s',
      '&:hover': {
        background: 'rgba(255, 82, 96, 0.08)',
        borderColor: 'rgba(255, 82, 96, 0.3)',
      }
    },
    formFieldLabel: { color: '#cbd5e1', fontWeight: '500' },
    formFieldInput: {
      background: 'rgba(8, 14, 26, 0.9)',
      border: '1px solid rgba(91, 64, 64, 0.4)',
      color: '#f1f5f9',
      transition: 'all 0.2s',
      '&:focus': {
        borderColor: '#ff5260',
        boxShadow: '0 0 0 3px rgba(255, 82, 96, 0.15)',
      }
    },
    formButtonPrimary: {
      background: 'linear-gradient(135deg, #ffb3b3 0%, #ff5260 100%)',
      color: '#5b0011',
      fontWeight: '800',
      letterSpacing: '0.025em',
      boxShadow: '0 10px 25px -5px rgba(255, 82, 96, 0.35)',
      border: 'none',
      textTransform: 'uppercase',
      transition: 'all 0.3s',
      '&:hover': {
        boxShadow: '0 15px 35px -5px rgba(255, 82, 96, 0.5)',
        transform: 'translateY(-1px)',
      }
    },
    footerActionLink: { color: '#ff5260', fontWeight: '700' },
    footerActionText: { color: '#94a3b8' },
    dividerLine: { background: 'rgba(255, 82, 96, 0.15)' },
    dividerText: { color: '#94a3b8' },
  },
}

export default function DonorSignUpPage() {
  const { t, lang } = useLanguage()

  return (
    <div className={`min-h-screen bg-[#080e1a] flex items-center justify-center px-4 py-16 relative overflow-hidden ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#ff5260]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#00daf3]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center justify-center">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center mb-6 w-full text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#ff5260]/40 animate-ping opacity-50" />
              <span className="material-symbols-outlined text-[#ff5260] relative z-10 text-3xl drop-shadow-[0_0_10px_rgba(255,82,96,0.6)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
            </div>
            <span className="text-4xl font-black bg-gradient-to-r from-[#ffb3b3] via-[#ff5260] to-[#d4145a] bg-clip-text text-transparent drop-shadow-sm tracking-tight pt-1 italic">
              {t.brand.name}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#ff5260]/10 border border-[#ff5260]/20 max-w-fit mx-auto">
            <span className="material-symbols-outlined text-[#ff5260]" style={{ fontVariationSettings: "'FILL' 1", fontSize: '14px' }}>
              volunteer_activism
            </span>
            <span className="text-xs font-bold text-[#ff5260] uppercase tracking-widest">
                {lang === 'ar' ? 'حساب متبرع' : 'Donor Account'}
            </span>
          </div>
        </div>

        <div className="w-full flex justify-center flex-col items-center">
          <SignUp
            appearance={clerkAppearance}
            signInUrl="/sign-in"
            fallbackRedirectUrl="/dashboard"
          />

          <p className="text-center text-xs text-[#e3bebd]/30 mt-8">
            {t.auth.hospitalRegister}{' '}
            <a href="/sign-up/hospital" className="text-[#ff5260] hover:underline hover:text-[#ffb3b3] transition-colors">{t.auth.applyHere}</a>
          </p>
        </div>
      </div>
    </div>
  )
}
