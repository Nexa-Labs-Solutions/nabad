'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const FAQ_DATA = [
  { 
    q: 'How often can I donate blood?', 
    a: 'You can typically donate whole blood every 56 days (8 weeks). This allows your body to fully replenish its red blood cell count. Nabad will automatically track your countdown and notify you when you are eligible again.' 
  },
  { 
    q: 'Is it safe to donate blood?', 
    a: 'Yes, donating blood is extremely safe. Each donor uses a brand new, sterile needle that is discarded after a single use. Our hospital partners in the Saida network follow the highest safety protocols.' 
  },
  { 
    q: 'How long does a donation take?', 
    a: 'The actual donation process takes about 8-10 minutes. However, the entire visit including registration, history check, and brief recovery time takes about 30-45 minutes.' 
  },
  { 
    q: 'Will I get notified for all blood types?', 
    a: 'No. Nabad is precision-focused. You will only receive emergency broadcasts when a hospital explicitly requests your specific blood type (or compatible types in universal donor cases).' 
  },
  { 
    q: 'Can I stop being a donor at any time?', 
    a: 'Absolutely. You have full control. You can set your status to "BUSY" in the dashboard to stop receiving notifications, or update your profile settings to opt-out entirely.' 
  }
]

export default function FAQPage() {
  const { user, isLoaded } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openIdx, setOpenIdx] = useState(0)

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#080e1a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ff5260]/20 border-t-[#ff5260] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080e1a] text-[#dde2f3] p-4 md:p-8 flex flex-col items-center relative overflow-hidden font-body">
      
      {/* SIDEBAR OVERLAY */}
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
               {/* Sidebar content mirrored for consistency */}
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

                 <Link href="/dashboard/how-it-works" className="flex items-center gap-4 p-4 rounded-2xl bg-[#080e1a] border border-[#5b4040]/20 hover:border-[#ff5260]/40 transition-all text-left">
                   <div className="w-10 h-10 rounded-xl bg-[#dde2f3]/5 flex items-center justify-center">
                     <span className="material-symbols-outlined text-[#dde2f3]/60">info</span>
                   </div>
                   <div>
                     <p className="font-bold text-sm">How it Works</p>
                     <p className="text-[10px] text-[#e3bebd]/50">Process & Protocols</p>
                   </div>
                 </Link>

                 <Link href="/dashboard/faq" className="flex items-center gap-4 p-4 rounded-2xl bg-[#00daf3]/10 border border-[#00daf3]/30 transition-all text-left">
                   <div className="w-10 h-10 rounded-xl bg-[#00daf3] flex items-center justify-center">
                     <span className="material-symbols-outlined text-[#080e1a]">quiz</span>
                   </div>
                   <div>
                     <p className="font-bold text-sm text-[#001f24]">FAQ</p>
                     <p className="text-[10px] text-[#00daf3]/60">Common Questions</p>
                   </div>
                 </Link>

                 <Link href="/dashboard/about" className="flex items-center gap-4 p-4 rounded-2xl bg-[#080e1a] border border-[#5b4040]/20 hover:border-[#ffb3b3]/40 transition-all text-left">
                   <div className="w-10 h-10 rounded-xl bg-[#dde2f3]/5 flex items-center justify-center">
                     <span className="material-symbols-outlined text-[#dde2f3]/60">groups</span>
                   </div>
                   <div>
                     <p className="font-bold text-sm">About Us</p>
                     <p className="text-[10px] text-[#e3bebd]/50">Mission & Team</p>
                   </div>
                 </Link>
               </div>

               <div className="mt-auto pt-6 border-t border-[#5b4040]/20">
                  <div className="flex items-center gap-3 mb-6 px-1">
                    <UserButton />
                    <div className="flex flex-col">
                      <p className="text-xs font-bold text-[#dde2f3] truncate max-w-[150px]">{user?.fullName}</p>
                      <p className="text-[10px] text-[#e3bebd]/40">Manage Account</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#e3bebd]/20 text-center uppercase tracking-widest">Nabad v1.0.4</p>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-3xl flex flex-col gap-10 h-full min-h-[90vh]">
        {/* HEADER */}
        <div className="flex justify-between items-center w-full">
           <div className="flex items-center gap-3">
             {user && (
               <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="w-10 h-10 rounded-xl border border-[#5b4040]/40 flex flex-col gap-1.5 items-center justify-center hover:bg-[#5b4040]/10 transition-all active:scale-95 group"
                >
                  <div className="w-5 h-[2px] bg-[#dde2f3]/60 group-hover:bg-[#00daf3] transition-colors" />
                  <div className="w-3 h-[2px] bg-[#dde2f3]/40 group-hover:bg-[#00daf3] transition-colors self-start ml-[10px]" />
                  <div className="w-5 h-[2px] bg-[#dde2f3]/60 group-hover:bg-[#00daf3] transition-colors" />
               </button>
             )}
             <div className="flex flex-col ml-2">
                <span className="text-xl font-black text-[#00daf3] tracking-tight leading-none mb-1">Frequently Asked</span>
                <span className="text-[#e3bebd]/50 text-[10px] font-bold uppercase tracking-widest leading-none">Questions & Support</span>
             </div>
           </div>
           <Link 
              href={user ? "/dashboard" : "/"} 
              className="text-[10px] font-bold text-[#dde2f3]/40 hover:text-[#00daf3] transition-colors flex items-center gap-2 uppercase tracking-widest"
            >
             <span className="material-symbols-outlined text-sm">arrow_back</span> {user ? 'Back to Dashboard' : 'Back to Home'}
           </Link>
        </div>

        {/* FAQ ACCORDION */}
        <div className="space-y-4">
           {FAQ_DATA.map((item, idx) => (
             <div 
               key={idx}
               className={`bg-[#0d131f] border transition-all duration-300 rounded-[2rem] overflow-hidden ${openIdx === idx ? 'border-[#00daf3]/50 ring-1 ring-[#00daf3]/20 shadow-lg' : 'border-[#5b4040]/20'}`}
             >
               <button 
                 onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                 className="w-full text-left p-8 flex justify-between items-center group"
               >
                 <span className={`text-lg font-bold transition-colors ${openIdx === idx ? 'text-white' : 'text-[#e3bebd]/60 group-hover:text-[#dde2f3]'}`}>
                   {item.q}
                 </span>
                 <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${openIdx === idx ? 'bg-[#00daf3] border-[#00daf3] text-[#080e1a] rotate-180' : 'border-[#5b4040]/40 text-[#e3bebd]/30'}`}>
                   <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                 </div>
               </button>
               
               <AnimatePresence>
                 {openIdx === idx && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     transition={{ duration: 0.3 }}
                   >
                     <div className="px-8 pb-8 text-[#e3bebd]/50 text-sm leading-relaxed border-t border-[#5b4040]/10 pt-6 mx-8">
                       {item.a}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
           ))}
        </div>

        {/* SUPPORT SECTION */}
        <div className="bg-[#00daf3]/5 border border-[#00daf3]/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 mt-10">
           <div className="w-16 h-16 rounded-full bg-[#00daf3]/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#00daf3] text-3xl">mail</span>
           </div>
           <div className="flex-1 text-center md:text-left">
              <h4 className="text-white font-bold text-lg">Still have questions?</h4>
              <p className="text-sm text-[#e3bebd]/40">Our team is available 24/7 for support and guidance in Saida.</p>
           </div>
           <button className="px-8 py-3 bg-[#0d131f] border border-[#00daf3]/50 text-[#00daf3] font-bold rounded-xl hover:bg-[#00daf3]/10 transition-all text-xs uppercase tracking-widest whitespace-nowrap">
              Contact Support
           </button>
        </div>

      </div>
    </div>
  )
}
