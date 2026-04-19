'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function AboutPage() {
  const { user, isLoaded } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!isLoaded) return null

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

                 <Link href="/dashboard/faq" className="flex items-center gap-4 p-4 rounded-2xl bg-[#080e1a] border border-[#5b4040]/20 hover:border-[#00daf3]/40 transition-all text-left">
                   <div className="w-10 h-10 rounded-xl bg-[#dde2f3]/5 flex items-center justify-center">
                     <span className="material-symbols-outlined text-[#dde2f3]/60">quiz</span>
                   </div>
                   <div>
                     <p className="font-bold text-sm">FAQ</p>
                     <p className="text-[10px] text-[#e3bebd]/50">Common Questions</p>
                   </div>
                 </Link>

                 <Link href="/dashboard/about" className="flex items-center gap-4 p-4 rounded-2xl bg-[#ffb3b3]/10 border border-[#ffb3b3]/30 transition-all text-left">
                   <div className="w-10 h-10 rounded-xl bg-[#ffb3b3] flex items-center justify-center">
                     <span className="material-symbols-outlined text-[#5b0011]">groups</span>
                   </div>
                   <div>
                     <p className="font-bold text-sm text-[#5b0011]">About Us</p>
                     <p className="text-[10px] text-[#5b0011]/60">Mission & Team</p>
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

      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-12 h-full min-h-[90vh]">
        {/* HEADER */}
        <div className="flex justify-between items-center w-full">
           <div className="flex items-center gap-3">
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
                <span className="text-xl font-black text-[#ffb3b3] tracking-tight leading-none mb-1">Our Mission</span>
                <span className="text-[#e3bebd]/50 text-[10px] font-bold uppercase tracking-widest leading-none">The Story of Nabad</span>
             </div>
           </div>
           <Link 
              href={user ? "/dashboard" : "/"} 
              className="text-[10px] font-bold text-[#dde2f3]/40 hover:text-[#ffb3b3] transition-colors flex items-center gap-2 uppercase tracking-widest"
            >
             <span className="material-symbols-outlined text-sm">arrow_back</span> {user ? 'Back to Dashboard' : 'Back to Home'}
           </Link>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div className="space-y-6">
              <h2 className="text-4xl font-black text-white leading-[1.1] tracking-tight">
                Born in <span className="text-[#ff5260]">Saida</span>,<br />Built for Life.
              </h2>
              <p className="text-[#e3bebd]/60 leading-relaxed text-lg">
                Nabad (Pulse) was founded with a single, urgent realization: in Lebanese medical emergencies, the delay between a patient&apos;s need and a donor&apos;s arrival is often fatal.
              </p>
              <div className="p-6 bg-[#0d131f] border border-[#5b4040]/20 rounded-[2rem] border-l-4 border-l-[#ffb3b3]">
                 <p className="italic text-[#ffb3b3] text-sm">
                   &quot;We aren&apos;t just building a blood bank. We are building the nervous system of Lebanon&apos;s emergency response.&quot;
                 </p>
              </div>
           </div>
           <div className="relative aspect-square">
             <div className="absolute inset-0 bg-gradient-to-br from-[#ff5260]/20 to-[#00daf3]/20 rounded-[3rem] blur-2xl opacity-30 animate-pulse" />
             <div className="absolute inset-4 bg-[#0d131f] border border-[#5b4040]/30 rounded-[2.5rem] flex items-center justify-center overflow-hidden shadow-2xl">
                <span className="material-symbols-outlined text-[120px] text-[#ff5260] opacity-20" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                   <div className="w-16 h-1 bg-[#ff5260] mb-6 rounded-full" />
                   <p className="text-4xl font-black text-white mb-2 italic tracking-tighter">1,200+</p>
                   <p className="text-[10px] font-bold text-[#e3bebd]/40 uppercase tracking-[0.2em]">Hearts Connected</p>
                </div>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           {[
             { title: 'Hyper-Local', desc: 'Focusing on the Saida region to ensure donors arrive within minutes, not hours.', icon: 'my_location' },
             { title: 'Hospital Direct', desc: 'Removing intermediaries by connecting hospital trauma wings directly to donors.', icon: 'handshake' },
             { title: 'Tech-Driven', desc: 'Using predictive logistics to ensure blood is where it needs to be before it is requested.', icon: 'analytics' }
           ].map((card, i) => (
             <div key={i} className="p-8 bg-[#0d131f] border border-[#5b4040]/10 rounded-3xl hover:border-[#ffb3b3]/30 transition-all">
                <span className="material-symbols-outlined text-[#ffb3b3] text-3xl mb-4 block">{card.icon}</span>
                <h4 className="font-black text-white mb-2">{card.title}</h4>
                <p className="text-xs text-[#e3bebd]/40 leading-relaxed">{card.desc}</p>
             </div>
           ))}
        </div>

      </div>
    </div>
  )
}
