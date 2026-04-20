'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function HospitalsInfoPage() {
  const { user, isLoaded } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!isLoaded) return null

  const PARTNER_HOSPITALS = [
    { name: 'Hammoud Hospital UMC', loc: 'Saida, Dr. Labib Blvd', type: 'Level 1 Trauma' },
    { name: 'Labib Medical Center', loc: 'Saida, Nejmeh Square', type: 'Cardiac Specialist' },
    { name: 'Dalaa Hospital', loc: 'Saida, Corniche', type: 'Emergency Response' },
    { name: 'Raee Hospital', loc: 'Saida, Al-Hlalye', type: 'General Medical' }
  ]

  const TIMELINE = [
    { step: '01', title: 'Expression of Interest', desc: 'Secure medical facilities in the Saida region submit an initial request for humanitarian integration.' },
    { step: '02', title: 'Protocol Verification', desc: 'Nabad medical officers verify blood bank storage standards and emergency response protocols.' },
    { step: '03', title: 'System Integration', desc: 'Installation of the Nabad Command Center terminal for real-time donor tracking and broadcasts.' },
    { step: '04', title: 'Active Network', desc: 'The hospital goes live on the donor dashboard and can start broadcasting urgent blood needs.' }
  ]

  return (
    <div className="min-h-screen bg-[#080e1a] text-[#dde2f3] p-4 md:p-8 flex flex-col items-center relative overflow-hidden font-body">
      
      {/* SIDEBAR OVERLAY (Only for logged in users) */}
      <AnimatePresence>
        {isMenuOpen && user && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-[#080e1a]/80 backdrop-blur-sm z-[100] cursor-pointer"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-[#0d131f] border-l border-[#5b4040]/30 z-[101] shadow-2xl p-6 flex flex-col"
            >
               <div className="flex justify-between items-center mb-10">
                 <span className="text-xs font-bold text-[#e3bebd]/40 uppercase tracking-[0.2em]">Navigation</span>
                 <button onClick={() => setIsMenuOpen(false)} className="w-8 h-8 rounded-full hover:bg-[#5b4040]/20 flex items-center justify-center transition-colors">
                   <span className="material-symbols-outlined text-[20px]">close</span>
                 </button>
               </div>
               <div className="flex flex-col gap-4">
                 <Link href="/dashboard" className="flex items-center gap-4 p-4 rounded-2xl bg-[#080e1a] border border-[#5b4040]/20 hover:border-[#dde2f3]/40 transition-all text-left">
                   <div className="w-10 h-10 rounded-xl bg-[#dde2f3]/5 flex items-center justify-center">
                     <span className="material-symbols-outlined text-[#dde2f3]/60">grid_view</span>
                   </div>
                   <div>
                     <p className="font-bold text-sm">Dashboard</p>
                     <p className="text-[10px] text-[#e3bebd]/50">Return home</p>
                   </div>
                 </Link>
               </div>
               {/* Footer in sidebar... */}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-12 h-full min-h-[90vh]">
        {/* HEADER */}
        <div className="flex justify-between items-center w-full">
           <div className="flex items-center gap-3">
             {/* CONDITIONAL BURGER MENU (Removed for guest) */}
             {user && (
               <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="w-10 h-10 rounded-xl border border-[#5b4040]/40 flex flex-col gap-1.5 items-center justify-center hover:bg-[#5b4040]/10 transition-all active:scale-95 group"
                >
                  <div className="w-5 h-[2px] bg-[#dde2f3]/60 group-hover:bg-[#ffb3b3] transition-colors" />
                  <div className="w-3 h-[2px] bg-[#dde2f3]/40 group-hover:bg-[#ffb3b3] transition-colors self-start ml-[10px]" />
                  <div className="w-5 h-[2px] bg-[#dde2f3]/60 group-hover:bg-[#ffb3b3] transition-colors" />
               </button>
             )}
             <div className="flex flex-col ml-2">
                <span className="text-xl font-black text-[#00daf3] tracking-tight leading-none mb-1">Hospital Network</span>
                <span className="text-[#e3bebd]/50 text-[10px] font-bold uppercase tracking-widest leading-none">Saida Partnered Facilities</span>
             </div>
           </div>
           <Link 
              href={user ? "/dashboard" : "/"} 
              className="text-[10px] font-bold text-[#dde2f3]/40 hover:text-[#00daf3] transition-colors flex items-center gap-2 uppercase tracking-widest"
            >
             <span className="material-symbols-outlined text-sm">arrow_back</span> {user ? 'Back to Dashboard' : 'Back to Home'}
           </Link>
        </div>

        {/* --- PARTNERED HOSPITALS LIST --- */}
        <section>
           <h3 className="text-sm font-black text-white tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
             <span className="w-8 h-[1px] bg-[#00daf3]/40" />
             Active Partners
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PARTNER_HOSPITALS.map((h, i) => (
                <div key={i} className="bg-[#0d131f] border border-[#5b4040]/20 p-6 rounded-3xl flex items-center justify-between group hover:border-[#00daf3]/30 transition-all">
                   <div>
                      <h4 className="font-black text-white text-base tracking-tight">{h.name}</h4>
                      <p className="text-[10px] text-[#e3bebd]/40 font-bold uppercase mt-1">{h.loc}</p>
                   </div>
                   <div className="px-3 py-1 bg-[#00daf3]/5 border border-[#00daf3]/20 rounded-lg">
                      <span className="text-[9px] font-bold text-[#00daf3] uppercase tracking-widest">{h.type}</span>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* --- PARTNERSHIP TIMELINE --- */}
        <section className="bg-[#0d131f] border border-[#5b4040]/20 rounded-[2.5rem] p-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
           </div>
           
           <h3 className="text-2xl font-black text-white mb-10 tracking-tight uppercase italic">
             Become a Partner
           </h3>

           <div className="space-y-8 relative">
              <div className="absolute left-6 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#00daf3] via-[#5b4040]/20 to-transparent" />
              
              {TIMELINE.map((t, i) => (
                <div key={i} className="flex gap-8 relative z-10 group">
                   <div className="w-12 h-12 rounded-2xl bg-[#080e1a] border-2 border-[#00daf3] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,218,243,0.2)] group-hover:scale-110 transition-transform">
                      <span className="text-sm font-black text-[#00daf3]">{t.step}</span>
                   </div>
                   <div className="pt-1">
                      <h4 className="text-lg font-black text-white mb-2 tracking-tight">{t.title}</h4>
                      <p className="text-sm text-[#e3bebd]/40 leading-relaxed max-w-lg">{t.desc}</p>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-12 p-8 bg-[#00daf3]/5 rounded-3xl border border-[#00daf3]/20 text-center">
              <p className="text-xs font-bold text-[#e3bebd]/60 uppercase tracking-widest mb-6">Ready to integrate your facility?</p>
              <button className="px-10 py-4 bg-[#00daf3] text-[#080e1a] font-black rounded-2xl text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_rgba(0,245,255,0.2)]">
                CONTACT MEDICAL BOARD
              </button>
           </div>
        </section>

      </div>
    </div>
  )
}
