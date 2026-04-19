'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function HowItWorks() {
  const { user, isLoaded } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSegment, setActiveSegment] = useState('donor') // 'donor' or 'hospital'

  if (!isLoaded) return null

  return (
    <div className="min-h-screen bg-[#080e1a] text-[#dde2f3] p-4 md:p-8 flex flex-col items-center relative overflow-hidden">
      
      {/* --- SHARED SIDEBAR (Mirrored from Main Dashboard) --- */}
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

                 <Link href="/dashboard/how-it-works" className="flex items-center gap-4 p-4 rounded-2xl bg-[#ff5260]/10 border border-[#ff5260]/30 transition-all text-left">
                   <div className="w-10 h-10 rounded-xl bg-[#ff5260] flex items-center justify-center">
                     <span className="material-symbols-outlined text-[#080e1a]">info</span>
                   </div>
                   <div>
                     <p className="font-bold text-sm text-[#ff5260]">How it Works</p>
                     <p className="text-[10px] text-[#ffb3b3]/60">Process & Protocols</p>
                   </div>
                 </Link>

                 <Link href="/dashboard/faq" className="flex items-center gap-4 p-4 rounded-2xl bg-[#080e1a] border border-[#5b4040]/20 hover:border-[#00daf3]/40 transition-all text-left">
                   <div className="w-10 h-10 rounded-xl bg-[#00daf3]/10 flex items-center justify-center">
                     <span className="material-symbols-outlined text-[#00daf3]">quiz</span>
                   </div>
                   <div>
                     <p className="font-bold text-sm">FAQ</p>
                     <p className="text-[10px] text-[#e3bebd]/50">Common Questions</p>
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
                  <p className="text-[10px] text-[#e3bebd]/20 text-center uppercase tracking-widest">Nabad v1.0.4 - Saida</p>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- HEADER --- */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-10 h-full min-h-[90vh]">
        <div className="flex justify-between items-center w-full">
           <div className="flex items-center gap-3">
             {user && (
               <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="w-10 h-10 rounded-xl border border-[#5b4040]/40 flex flex-col gap-1.5 items-center justify-center hover:bg-[#5b4040]/10 transition-all active:scale-95 group"
                >
                  <div className="w-5 h-[2px] bg-[#dde2f3]/60 group-hover:bg-[#ff5260] transition-colors" />
                  <div className="w-3 h-[2px] bg-[#dde2f3]/40 group-hover:bg-[#ff5260] transition-colors self-start ml-[10px]" />
                  <div className="w-5 h-[2px] bg-[#dde2f3]/60 group-hover:bg-[#ff5260] transition-colors" />
               </button>
             )}
             <div className="flex flex-col ml-2">
                <span className="text-xl font-black text-[#ff5260] tracking-tight leading-none mb-1">How it Works</span>
                <span className="text-[#e3bebd]/50 text-[10px] font-bold uppercase tracking-widest leading-none">Nabad Guidelines</span>
             </div>
           </div>
           <Link 
              href={user ? "/dashboard" : "/"} 
              className="text-[10px] font-bold text-[#dde2f3]/40 hover:text-[#ff5260] transition-colors flex items-center gap-2 uppercase tracking-widest"
            >
             <span className="material-symbols-outlined text-sm">arrow_back</span> {user ? 'Back to Dashboard' : 'Back to Home'}
           </Link>
        </div>

        {/* --- TOGGLE BUTTONS --- */}
        <div className="flex justify-center">
          <div className="bg-[#0d131f] border border-[#5b4040]/30 p-1 rounded-2xl flex gap-1 shadow-inner">
            <button 
              onClick={() => setActiveSegment('donor')}
              className={`px-8 py-3 rounded-xl font-black text-xs transition-all ${activeSegment === 'donor' ? 'bg-[#ff5260] text-white shadow-lg shadow-[#ff5260]/20' : 'text-[#e3bebd]/40 hover:text-[#dde2f3]'}`}
            >
              FOR DONORS
            </button>
            <button 
              onClick={() => setActiveSegment('hospital')}
              className={`px-8 py-3 rounded-xl font-black text-xs transition-all ${activeSegment === 'hospital' ? 'bg-[#00daf3] text-[#080e1a] shadow-lg shadow-[#00daf3]/20' : 'text-[#e3bebd]/40 hover:text-[#dde2f3]'}`}
            >
              FOR HOSPITALS
            </button>
          </div>
        </div>

        {/* --- CONTENT CARDS --- */}
        <AnimatePresence mode="wait">
          {activeSegment === 'donor' ? (
            <motion.div 
               key="donor"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            >
               {[
                 { step: '01', title: 'Registration', desc: 'Complete your health profile once. This includes blood type, weight, and general health history to ensure safe donation.', icon: 'person_add' },
                 { step: '02', title: 'Live Alerts', desc: 'When a matching patient needs blood nearby, you get an instant high-priority notification with hospital location.', icon: 'notifications_active' },
                 { step: '03', title: 'Confirm & Go', desc: 'Confirm availability in one tap. The hospital will be notified immediately that a donor is on the way.', icon: 'directions_run' },
                 { step: '04', title: 'Donate & Save', desc: 'Head to the hospital. Your rapid response cuts down critical waiting time and saves lives in real-time.', icon: 'volunteer_activism' }
               ].map((item, idx) => (
                 <div key={idx} className="bg-[#0d131f] border border-[#5b4040]/20 p-8 rounded-[2rem] hover:border-[#ff5260]/30 transition-all group">
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#ff5260]/5 border border-[#ff5260]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[#ff5260] text-3xl">{item.icon}</span>
                      </div>
                      <span className="text-4xl font-black text-[#5b4040]/30 italic">{item.step}</span>
                   </div>
                   <h3 className="text-xl font-black text-white mb-3 tracking-tight">{item.title}</h3>
                   <p className="text-sm text-[#e3bebd]/60 leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </motion.div>
          ) : (
            <motion.div 
               key="hospital"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            >
               {[
                 { step: '01', title: 'Request Blood', desc: 'Log into the Hospital Dashboard and select blood type and required units for emergency or surgery.', icon: 'emergency' },
                 { step: '02', title: 'Instant Broadcast', desc: 'Nabad immediately pings all eligible, nearby donors whose availability toggle is set to ON.', icon: 'podcasts' },
                 { step: '03', title: 'Track Donors', desc: 'See real-time progress as donors accept the request and navigate to your location via GPS integration.', icon: 'explore' },
                 { step: '04', title: 'Ready Reception', desc: 'Prepare your team to receive the donors as they arrive. No more manual phone calls or chaotic coordination.', icon: 'handshake' }
               ].map((item, idx) => (
                 <div key={idx} className="bg-[#0d131f] border border-[#5b4040]/20 p-8 rounded-[2rem] hover:border-[#00daf3]/30 transition-all group">
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#00daf3]/5 border border-[#00daf3]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[#00daf3] text-3xl">{item.icon}</span>
                      </div>
                      <span className="text-4xl font-black text-[#5b4040]/30 italic">{item.step}</span>
                   </div>
                   <h3 className="text-xl font-black text-white mb-3 tracking-tight">{item.title}</h3>
                   <p className="text-sm text-[#e3bebd]/60 leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- BOTTOM CTA --- */}
        <div className="mt-10 p-8 rounded-[2.5rem] bg-gradient-to-br from-[#0d131f] to-[#080e1a] border border-[#5b4040]/30 text-center relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#ff5260]/5 rounded-full blur-[80px]" />
           <h3 className="text-2xl font-black text-white mb-4 relative z-10">Every second counts.</h3>
           <p className="text-[#e3bebd]/50 mb-8 max-w-md mx-auto relative z-10">Our system is designed to remove the friction between a patient in need and a hero willing to help.</p>
           <Link href="/dashboard" className="px-10 py-4 bg-[#ff5260] text-white font-black rounded-2xl text-lg hover:scale-105 active:scale-95 transition-all inline-block shadow-[0_15px_30px_rgba(255,82,96,0.3)]">
             START SAVING LIVES
           </Link>
        </div>

      </div>
    </div>
  )
}
