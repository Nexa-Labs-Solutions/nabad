'use client'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '../../context/LanguageContext'
import NavBar from '../../components/NavBar'

export default function AboutPage() {
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
    <div className="min-h-screen bg-[#080e1a] text-[#dde2f3] font-body">
      <NavBar />
      <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center pt-24">
      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-12">
        <div className="flex justify-between items-center w-full">
           <div className="flex items-center gap-3">
             <div className={`flex flex-col ${lang === 'ar' ? 'mr-2' : 'ml-2'}`}>
                <span className="text-xl font-black text-white tracking-tight leading-none mb-1">{t.about.eyebrow}</span>
                <span className="text-[#e3bebd]/50 text-[10px] font-bold uppercase tracking-widest leading-none">{t.about.title}</span>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div className={`space-y-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <h2 className="text-4xl font-black text-white leading-[1.1] tracking-tight">{t.about.tagline}</h2>
              <p className="text-[#e3bebd]/60 leading-relaxed text-lg italic border-crimson pl-6 py-2 border-start-2">
                {t.about.body}
              </p>
           </div>
           <div className="relative aspect-square">
             <div className="absolute inset-0 bg-gradient-to-br from-[#ff5260]/20 to-[#ffb3b3]/20 rounded-[3rem] blur-2xl opacity-20 animate-pulse" />
             <div className="absolute inset-0 bg-[#0d131f] border border-[#5b4040]/30 rounded-[2.5rem] overflow-hidden shadow-22xl group">
                <Image 
                  src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Nabad Emergency Infrastructure" 
                  fill
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 grayscale-[40%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080e1a] via-[#080e1a]/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                   <div className="w-12 h-1 bg-[#ff5260] mb-6 rounded-full" />
                   <p className="text-4xl font-black text-white mb-2 italic tracking-tighter drop-shadow-xl">1,200+</p>
                   <p className="text-[10px] font-bold text-[#dde2f3]/60 uppercase tracking-[0.2em] relative">{t.about.stats}</p>
                </div>
             </div>
           </div>
        </div>
      </div>
      </div>
    </div>
  )
}
