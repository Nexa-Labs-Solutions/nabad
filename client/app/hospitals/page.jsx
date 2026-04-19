'use client'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useLanguage } from '../../context/LanguageContext'
import NavBar from '../../components/NavBar'

export default function HospitalsInfoPage() {
  const { user, isLoaded } = useUser()
  const { t, lang } = useLanguage()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#080e1a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ff5260]/20 border-t-[#ff5260] rounded-full animate-spin" />
      </div>
    )
  }

  const PARTNER_HOSPITALS = [
    { name: lang === 'ar' ? 'مستشفى حمود الجامعي' : 'Hammoud Hospital UMC', loc: lang === 'ar' ? 'صيدا، بلوار د. لبيب' : 'Saida, Dr. Labib Blvd', type: lang === 'ar' ? 'درجة اولى' : 'Level 1 Trauma' },
    { name: lang === 'ar' ? 'مركز لبيب الطبي' : 'Labib Medical Center', loc: lang === 'ar' ? 'صيدا، ساحة النجمة' : 'Saida, Nejmeh Square', type: lang === 'ar' ? 'تخصص قلب' : 'Cardiac Specialist' },
    { name: lang === 'ar' ? 'مستشفى دلاعة' : 'Dalaa Hospital', loc: lang === 'ar' ? 'صيدا، الكورنيش' : 'Saida, Corniche', type: lang === 'ar' ? 'طوارئ سريعة' : 'Emergency Response' },
    { name: lang === 'ar' ? 'مستشفى الراعي' : 'Raee Hospital', loc: lang === 'ar' ? 'صيدا، الهلالية' : 'Saida, Al-Hlalye', type: lang === 'ar' ? 'طبي عام' : 'General Medical' }
  ]

  return (
    <div className="min-h-screen bg-[#080e1a] text-[#dde2f3] font-body">
      <NavBar />
      <div className="pt-24 p-4 md:p-8 flex flex-col items-center">
      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-12 min-h-[80vh]">
        <div className="flex justify-between items-center w-full">
           <div className="flex items-center gap-3">
             <div className={`flex flex-col ${lang === 'ar' ? 'mr-2' : 'ml-2'}`}>
                <span className="text-xl font-black text-white tracking-tight leading-none mb-1">{t.hospitals.eyebrow}</span>
                <span className="text-[#e3bebd]/50 text-[10px] font-bold uppercase tracking-widest leading-none">{t.hospitals.title}</span>
             </div>
           </div>
           <Link href={user ? "/dashboard" : "/"} className="text-[10px] font-bold text-[#dde2f3]/40 hover:text-[#ff5260] transition-colors flex items-center gap-2 uppercase tracking-widest">
             <span className={`material-symbols-outlined text-sm ${lang === 'ar' ? 'rotate-180' : ''}`}>arrow_back</span>
             {user ? t.nav.backToDash : t.nav.backToHome}
           </Link>
        </div>

        <section className={lang === 'ar' ? 'text-right' : 'text-left'}>
           <h3 className="text-sm font-black text-[#e3bebd]/60 tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
             <span className="w-8 h-[1px] bg-[#ff5260]/40" />{t.hospitals.activePartners}
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PARTNER_HOSPITALS.map((h, i) => (
                <div key={i} className="bg-[#0d131f] border border-[#5b4040]/20 p-6 rounded-3xl flex items-center justify-between group hover:border-[#ff5260]/30 transition-all">
                   <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                      <h4 className="font-black text-[#dde2f3] text-base tracking-tight">{h.name}</h4>
                      <p className="text-[10px] text-[#e3bebd]/40 font-bold uppercase mt-1 tracking-wider">{h.loc}</p>
                   </div>
                   <div className="px-3 py-1 bg-[#ff5260]/5 border border-[#ff5260]/20 rounded-lg">
                      <span className="text-[9px] font-bold text-[#ff5260] uppercase tracking-widest">{h.type}</span>
                   </div>
                </div>
              ))}
           </div>
        </section>

        <section className="bg-[#0d131f] border border-[#5b4040]/20 rounded-[2.5rem] p-10 relative overflow-hidden">
           <h3 className={`text-2xl font-black text-white mb-10 tracking-tight uppercase italic ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.hospitals.becomePartner}</h3>
           <div className="space-y-8 relative">
              <div className={`absolute ${lang === 'ar' ? 'right-6' : 'left-6'} top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#ff5260] via-[#5b4040]/20 to-transparent`} />
              {t.hospitals.timeline.map((item, i) => (
                <div key={i} className={`flex gap-8 relative z-10 group ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                   <div className="w-12 h-12 rounded-2xl bg-[#080e1a] border-2 border-[#ff5260] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,82,96,0.15)]">
                      <span className="text-sm font-black text-[#ff5260]">{i+1}</span>
                   </div>
                   <div className="pt-1">
                      <h4 className="text-lg font-black text-white mb-2 tracking-tight">{item.title}</h4>
                      <p className="text-sm text-[#e3bebd]/50 leading-relaxed max-w-lg">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>
      </div>
    </div>
  )
}
