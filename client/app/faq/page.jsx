'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useLanguage } from '../../context/LanguageContext'
import NavBar from '../../components/NavBar'

export default function FAQPage() {
  const { isLoaded } = useUser()
  const [openIdx, setOpenIdx] = useState(0)
  const { t, lang } = useLanguage()

  const FAQ_DATA = [
     { q: lang === 'ar' ? 'كل قدي فيني اتبرع دم؟' : 'How often can I donate blood?', a: lang === 'ar' ? 'فيك تتبرع دم كل ٥٦ يوم (٨ أسابيع). نَبض لح يخبرك تلقائياً اول ما يصرلك حق تتبرع مرة تانية.' : 'You can donate whole blood every 56 days (8 weeks). Nabad will automatically notify you when you are eligible again.' },
     { q: lang === 'ar' ? 'التبرع بالدم آمن؟' : 'Is it safe to donate blood?', a: lang === 'ar' ? 'أكيد آمن ١٠٠٪. كل المستشفيات بصيدا بتتبع أعلى معايير السلامة، وكل المعدات بتستعمل لمرة وحدة وبس.' : 'Yes, completely safe. Our hospital partners follow the highest safety protocols and use single-use equipment.' },
     { q: lang === 'ar' ? 'قدي بتاخد وقت العملية؟' : 'How long does a donation take?', a: lang === 'ar' ? 'عملية سحب الدم بتاخد بين ٨ لـ ١٠ دقايق، بس الرحلة كلها مع التسجيل والاستراحة بتاخد حوالي ٤٠ دقيقة.' : 'The actual draw takes 8–10 minutes. The full visit including registration and rest is about 40 minutes.' },
     { q: lang === 'ar' ? 'شو فئات الدم الأكتر طلباً؟' : 'Which blood types are needed most?', a: lang === 'ar' ? 'O- هي الأكتر طلباً لأنها فئة عالمية. بعدها A+ وB+. بس كل الفئات مهمة وبتنقذ أرواح.' : 'O− is most in demand as the universal donor type. A+ and B+ are also frequently needed. Every blood type saves lives.' },
     { q: lang === 'ar' ? 'شو بصير بعد ما سجلت؟' : 'What happens after I register?', a: lang === 'ar' ? 'بتكمل ملفك الصحي، وبعدها بتوصلك تنبيهات فورية لما أي مستشفى بصيدا تطلب فئة دمك.' : 'You complete a short health profile, then receive instant alerts whenever a hospital in Saida needs your blood type.' },
     { q: lang === 'ar' ? 'معلوماتي الشخصية آمنة؟' : 'Is my personal data private?', a: lang === 'ar' ? 'نعم. بياناتك محمية ومش بتتشارك مع أي جهة خارجية. بتشوفها بس المستشفيات المعتمدة عند الحاجة.' : 'Yes. Your data is protected and never shared with third parties. Only verified partner hospitals can see your blood type and contact info when a match is needed.' },
  ]

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#080e1a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ff5260]/20 border-t-[#ff5260] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080e1a] text-[#dde2f3] font-body">
      <NavBar />
      <div className="pt-40 pb-20 px-4 md:px-8 flex flex-col items-center">
      <div className="relative z-10 w-full max-w-3xl flex flex-col gap-10">
        <div className="flex justify-between items-center w-full">
           <div className="flex items-center gap-3">
             <div className={`flex flex-col ${lang === 'ar' ? 'mr-2' : 'ml-2'}`}>
                <span className="text-xl font-black text-white tracking-tight leading-none mb-1">{t.faq.eyebrow}</span>
                <span className="text-[#e3bebd]/50 text-[10px] font-bold uppercase tracking-widest leading-none">{t.faq.title}</span>
             </div>
           </div>
        </div>

        <div className="space-y-4">
           {FAQ_DATA.map((item, idx) => (
             <div 
               key={idx}
               className={`bg-[#0d131f] border transition-all duration-300 rounded-[2rem] overflow-hidden ${openIdx === idx ? 'border-[#ff5260]/50 shadow-lg' : 'border-[#5b4040]/20'}`}
             >
               <button onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)} className={`w-full text-left p-8 flex justify-between items-center group ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                 <span className={`text-lg font-bold transition-colors ${lang === 'ar' ? 'text-right' : ''} ${openIdx === idx ? 'text-[#ff5260]' : 'text-white/60 group-hover:text-white'}`}>
                   {item.q}
                 </span>
                 <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${openIdx === idx ? 'bg-[#ff5260] border-[#ff5260] text-white rotate-180' : 'border-[#5b4040]/40 text-[#e3bebd]/30'}`}>
                   <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                 </div>
               </button>
               
               <AnimatePresence>
                 {openIdx === idx && (
                   <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                     <div className={`px-8 pb-8 text-[#e3bebd]/80 text-sm leading-relaxed border-t border-[#5b4040]/10 pt-6 mx-8 font-medium ${lang === 'ar' ? 'text-right' : ''}`}>
                       {item.a}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
           ))}
        </div>

        <div className={`bg-[#ff5260]/5 border border-[#ff5260]/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 mt-10 ${lang === 'ar' ? 'md:flex-row-reverse' : ''}`}>
           <div className="w-16 h-16 rounded-full bg-[#ff5260]/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#ff5260] text-3xl">mail</span>
           </div>
           <div className={`flex-1 text-center ${lang === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
              <h4 className="text-white font-bold text-lg">{t.faq.contact}</h4>
              <p className="text-sm text-[#e3bebd]/40">{t.faq.supportDesc}</p>
           </div>
           <button className="px-8 py-3 bg-[#0d131f] border border-[#ff5260]/50 text-[#ff5260] font-bold rounded-xl hover:bg-[#ff5260]/10 transition-all text-xs uppercase tracking-widest">{t.faq.contactCta}</button>
        </div>
        </div>
      </div>
    </div>
  )
}
