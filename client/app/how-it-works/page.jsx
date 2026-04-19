'use client'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useLanguage } from '../../context/LanguageContext'
import NavBar from '../../components/NavBar'

export default function HowItWorksPage() {
  const { isLoaded } = useUser()
  const { t, lang } = useLanguage()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#080e1a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ff5260]/20 border-t-[#ff5260] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-[#080e1a] text-[#dde2f3] font-body ${lang === 'ar' ? 'rtl' : ''}`}>
      <NavBar />
      <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center pt-24">
      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-10">
        <div className="flex justify-between items-center w-full">
           <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
             <div className={`flex flex-col ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <span className="text-xl font-black text-white tracking-tight leading-none mb-1">{t.nav.howItWorks}</span>
                <span className="text-[#e3bebd]/50 text-[10px] font-bold uppercase tracking-widest leading-none">Process & Protocols</span>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
           <div className={`lg:col-span-7 space-y-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <h2 className="text-4xl font-black text-white leading-tight tracking-tight">
                 {lang === 'ar' ? 'السرعة والدقة هنّ الأساس.' : 'Speed & Precision are everything.'}
              </h2>
              <div className="space-y-6">
                 {t.steps && [0,1,2].map(idx => (
                   <div key={idx} className={`flex gap-6 items-start ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-2xl bg-[#ff5260]/10 border border-[#ff5260]/30 flex items-center justify-center shrink-0">
                         <span className="text-xl font-black text-[#ff5260]">{idx + 1}</span>
                      </div>
                      <div>
                         <h3 className="text-lg font-bold text-white mb-2">{t.steps[idx].title}</h3>
                         <p className="text-sm text-[#e3bebd]/60 leading-relaxed">{t.steps[idx].body}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-pulse-gradient rounded-[3rem] blur-3xl opacity-10 animate-pulse" />
              <div className="bg-[#0d131f] border border-[#5b4040]/30 p-8 rounded-[2.5rem] relative z-10">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#00daf3]/10 flex items-center justify-center">
                       <span className="material-symbols-outlined text-[#00daf3]">verified_user</span>
                    </div>
                    <p className="text-xs font-black text-[#00daf3] uppercase tracking-widest">{lang === 'ar' ? 'معايير طبية' : 'Medical Standards'}</p>
                 </div>
                 <p className="text-sm text-[#e3bebd]/70 leading-relaxed mb-6">
                    {lang === 'ar' 
                      ? 'بموجب اتفاقياتنا مع مستشفيات صيدا، كل عمليات التبرع بتخضع لبروتوكولات وزارة الصحة اللبنانية الرسمية.'
                      : 'Under our agreements with Saida hospitals, all donation processes strictly follow official Lebanese Ministry of Health protocols.'}
                 </p>
                 <div className="h-1 w-20 bg-[#ff5260]/40 rounded-full" />
              </div>
           </div>
        </div>
      </div>
      </div>
    </div>
  )
}
