'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import NabadLogo from '../../../components/NabadLogo'

export default function HospitalDashboard() {
  const { user, isLoaded } = useUser()
  const [activeTab, setActiveTab] = useState('Post Request')
  const [requestUnits, setRequestUnits] = useState(4)
  const [selectedBlood, setSelectedBlood] = useState('A+')
  const [urgency, setUrgency] = useState('High Alert')

  const bloodTypes = ['A+', 'A−', 'B+', 'B−', 'O+', 'O−', 'AB+', 'AB−']

  if (!isLoaded) return (
    <div className="min-h-screen bg-[#080e1a] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#ff5260] border-t-transparent animate-spin" />
    </div>
  )

  return (
    <div className="flex h-screen bg-[#080e1a] text-[#dde2f3] overflow-hidden">
      
      {/* --- SIDE NAVIGATION --- */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-[#5b4040]/20 bg-[#0d131f] py-8 shrink-0">
        <div className="px-6 mb-10">
          <NabadLogo size="md" href="/" />
          <p className="text-[9px] font-black text-[#ff5260] uppercase tracking-[0.2em] mt-1 ml-11">Hospital Portal</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {['Overview', 'Post Request', 'Active Requests', 'Donors', 'Settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-[#ff5260]/10 text-[#ff5260] shadow-[inset_0_0_0_1px_rgba(255,82,96,0.2)]' 
                  : 'text-[#e3bebd]/50 hover:text-[#dde2f3] hover:bg-[#5b4040]/10'
              }`}
            >
              <span className="material-symbols-outlined shrink-0" style={{ fontSize: '20px' }}>
                {tab === 'Overview' ? 'grid_view' : tab === 'Post Request' ? 'add_alert' : tab === 'Active Requests' ? 'emergency' : tab === 'Donors' ? 'group' : 'settings'}
              </span>
              {tab}
            </button>
          ))}
        </nav>

        <div className="px-6 mb-8 mt-12">
           <button
             onClick={() => setActiveTab('Post Request')}
             className="w-full bg-pulse-gradient text-[#5b0011] font-black py-4 px-4 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_10px_20px_rgba(255,82,96,0.3)]"
           >
             <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>add_alert</span>
             Post Blood Request
           </button>
        </div>

        <div className="px-6 pt-6 border-t border-[#5b4040]/20 space-y-1">
           <Link href="/dashboard" className="flex items-center gap-3 px-3 py-3 rounded-xl text-[#e3bebd]/40 hover:text-[#dde2f3] hover:bg-[#5b4040]/10 transition-all font-bold text-xs uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Dashboard
           </Link>
           <div className="flex items-center gap-3 px-3 py-3">
             <UserButton afterSignOutUrl="/" />
             <div className="min-w-0">
               <p className="text-xs font-bold text-white truncate">{user?.firstName}</p>
               <p className="text-[9px] text-[#e3bebd]/30 uppercase tracking-widest">Hospital Admin</p>
             </div>
           </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP NAVBAR */}
        <header className="h-16 bg-[#0d131f]/80 backdrop-blur-2xl border-b border-[#5b4040]/20 flex justify-between items-center px-6 shrink-0 z-50">
          <div className="flex items-center gap-4">
            <div className="lg:hidden flex items-center gap-2">
               <div className="w-7 h-7 bg-pulse-gradient rounded-lg flex items-center justify-center">
                 <span className="material-symbols-outlined text-[#5b0011] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
               </div>
               <span className="text-base font-black text-white italic">Nabad</span>
            </div>
            <div className="hidden md:flex bg-[#080e1a] border border-[#5b4040]/30 rounded-xl px-4 py-2 items-center gap-2 w-72 focus-within:border-[#ff5260]/50 transition-all">
              <span className="material-symbols-outlined text-[#e3bebd]/30 text-lg">search</span>
              <input
                type="text"
                placeholder="Search donors by blood type..."
                className="bg-transparent border-none focus:ring-0 text-sm w-full text-[#dde2f3] placeholder:text-[#e3bebd]/20 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl text-[#e3bebd]/40 hover:text-[#ff5260] hover:bg-[#ff5260]/5 transition-all">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff5260] rounded-full shadow-[0_0_8px_#ff5260]" />
            </button>
            <div className="h-6 w-px bg-[#5b4040]/30" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-[#dde2f3] leading-none">{user?.firstName || 'Hospital Admin'}</p>
                <p className="text-[9px] font-bold text-[#e3bebd]/30 uppercase tracking-[0.2em] mt-1">Blood Bank Manager</p>
              </div>
              <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: 'w-9 h-9' } }} />
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#080e1a] relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#5b4040 1px, transparent 1px), linear-gradient(90deg, #5b4040 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="max-w-7xl mx-auto space-y-8 relative z-10">
            {/* ── POST REQUEST ── */}
            {activeTab === 'Post Request' && (
            <div className="grid grid-cols-12 gap-8">
              
              {/* COMMAND CENTER: CREATE REQUEST */}
              <section className="col-span-12 xl:col-span-8 bg-[#0d131f] rounded-[2.5rem] p-10 border border-[#5b4040]/20 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#ff5260]/5 rounded-full blur-[100px]" />
                
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                      <span className="w-1 h-8 bg-[#ff5260] rounded-full" />
                      Post Blood Request
                    </h2>
                    <p className="text-[#e3bebd]/40 text-sm mt-2 max-w-md">Notify matched donors across Saida in real-time.</p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#080e1a] px-5 py-3 rounded-2xl border border-[#5b4040]/30 shadow-inner">
                    <span className="material-symbols-outlined text-[#00daf3] text-xl">location_on</span>
                    <span className="text-[10px] font-black text-[#e3bebd]/60 tracking-widest uppercase">Main Trauma Wing</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  {/* Left Column: Blood Type & Units */}
                  <div className="space-y-10">
                    <div>
                      <label className="text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-[0.2em] mb-5 block">1. Blood Type Required</label>
                      <div className="grid grid-cols-4 gap-3">
                        {bloodTypes.map(type => (
                          <button 
                            key={type}
                            onClick={() => setSelectedBlood(type)}
                            className={`py-4 rounded-2xl font-black text-lg transition-all duration-300 transform active:scale-95 ${
                              selectedBlood === type 
                                ? 'bg-[#ff5260] text-[#5b0011] shadow-[0_0_30px_rgba(255,82,96,0.3)]' 
                                : 'bg-[#080e1a] text-[#e3bebd]/40 border border-[#5b4040]/20 hover:border-[#ff5260]/30 hover:text-[#dde2f3]'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-[0.2em] mb-5 block">2. Units Needed</label>
                      <div className="flex items-center gap-8 bg-[#080e1a] border border-[#5b4040]/30 p-3 rounded-2xl w-max shadow-inner">
                        <button 
                          onClick={() => setRequestUnits(prev => Math.max(1, prev - 1))}
                          className="w-12 h-12 rounded-xl bg-[#5b4040]/20 hover:bg-[#5b4040]/40 text-white flex items-center justify-center transition-all"
                        >
                          <span className="material-symbols-outlined">remove</span>
                        </button>
                        <span className="text-4xl font-black px-4 text-[#dde2f3] tabular-nums tracking-tighter">{requestUnits.toString().padStart(2, '0')}</span>
                        <button 
                          onClick={() => setRequestUnits(prev => prev + 1)}
                          className="w-12 h-12 rounded-xl bg-[#ff5260] text-[#5b0011] flex items-center justify-center transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,82,96,0.3)]"
                        >
                          <span className="material-symbols-outlined font-bold">add</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Priority */}
                  <div>
                    <label className="text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-[0.2em] mb-5 block">3. Urgency Level</label>
                    <div className="space-y-3">
                      {[
                        { val: 'Standard',   desc: 'Routine replenishment, no rush' },
                        { val: 'High Alert', desc: 'Needed within 4 hours' },
                        { val: 'Critical',   desc: 'Life-threatening — immediate response' },
                      ].map((level) => (
                        <label 
                          key={level.val}
                          onClick={() => setUrgency(level.val)}
                          className={`flex items-center gap-5 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                            urgency === level.val
                              ? 'bg-[#ff5260]/10 border-[#ff5260]/40'
                              : 'bg-[#080e1a]/40 border-[#5b4040]/20 hover:border-[#5b4040]/40'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                             urgency === level.val ? 'border-[#ff5260]' : 'border-[#5b4040]/50'
                          }`}>
                            {urgency === level.val && <div className="w-2.5 h-2.5 bg-[#ff5260] rounded-full" />}
                          </div>
                          <div className="flex-1">
                            <p className={`font-black text-sm ${urgency === level.val ? 'text-white' : 'text-[#e3bebd]/50'}`}>{level.val}</p>
                            <p className="text-[10px] text-[#e3bebd]/30 mt-0.5">{level.desc}</p>
                          </div>
                          {level.val === 'Critical' && urgency === 'Critical' && (
                             <div className="w-1.5 h-1.5 rounded-full bg-[#ff5260] animate-ping" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <button className="w-full py-5 bg-pulse-gradient text-[#5b0011] rounded-2xl font-black text-base tracking-wide shadow-[0_10px_30px_rgba(255,82,96,0.3)] flex items-center justify-center gap-3 hover:scale-[1.01] transition-all active:scale-95">
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                    Send Alert to Donors
                  </button>
                </div>
              </section>

              {/* LIVE FEEDS SIDEBAR */}
              <section className="col-span-12 xl:col-span-4 space-y-6">
                <div className="flex items-center justify-between border-b border-[#5b4040]/30 pb-4 px-2">
                  <h3 className="text-sm font-black text-white flex items-center gap-3">
                    Active Requests
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5260] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5260]" />
                    </span>
                  </h3>
                  <span className="text-[10px] font-bold text-[#e3bebd]/30 uppercase tracking-[0.2em]">02 Active</span>
                </div>

                <div className="space-y-4">
                  {[
                    { type: 'O-', priority: 'Critical', progress: 66, color: '#ff5260', elapsed: '14m' },
                    { type: 'A+', priority: 'High Alert', progress: 42, color: '#ff5260', elapsed: '58m' }
                  ].map((signal, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 6 }}
                      className="bg-[#0d131f] p-6 rounded-[2rem] border border-[#5b4040]/20 shadow-xl"
                    >
                      <div className="flex justify-between items-start mb-5">
                        <div className={`w-14 h-14 rounded-2xl bg-[#ff5260]/10 flex items-center justify-center text-2xl font-black text-[#ff5260] italic border border-[#ff5260]/20`}>
                          {signal.type}
                        </div>
                        <div className="text-right">
                          <span className={`px-2.5 py-1 rounded-md border text-[9px] font-black uppercase tracking-widest ${signal.priority === 'Critical' ? 'border-[#ff5260] text-[#ff5260]' : 'border-[#ffb3b3] text-[#ffb3b3]'}`}>
                            {signal.priority}
                          </span>
                          <p className="text-[9px] text-[#e3bebd]/30 font-bold mt-2 uppercase tracking-widest">{signal.elapsed} Elapsed</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.1em]">
                          <span className="text-[#e3bebd]/40">Network Acquisition</span>
                          <span className="text-[#dde2f3]">{signal.progress}% Complete</span>
                        </div>
                        <div className="w-full h-2 bg-[#080e1a] rounded-full overflow-hidden border border-[#5b4040]/20">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${signal.progress}%` }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            className="h-full bg-gradient-to-r from-[#ffb3b3] to-[#ff5260] rounded-full shadow-[0_0_10px_rgba(255,82,96,0.3)]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            )} {/* end Post Request tab */}

            {/* ── ACTIVE REQUESTS ── */}
            {activeTab === 'Active Requests' && (
              <div className="space-y-4">
                <p className="text-xs text-[#e3bebd]/30 uppercase tracking-widest font-black">2 active requests</p>
                {[
                  { type: 'O−', priority: 'Critical', progress: 66, elapsed: '14m', hospital: 'Hammoud Hospital UMC' },
                  { type: 'A+', priority: 'High Alert', progress: 42, elapsed: '58m', hospital: 'Labib Medical Center' },
                ].map((signal, i) => (
                  <div key={i} className="bg-[#0d131f] p-6 rounded-2xl border border-[#5b4040]/20">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#ff5260]/10 border border-[#ff5260]/20 flex items-center justify-center text-xl font-black text-[#ff5260]">{signal.type}</div>
                        <div>
                          <p className="font-black text-white">{signal.hospital}</p>
                          <p className="text-xs text-[#e3bebd]/40 mt-0.5">{signal.elapsed} elapsed</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${signal.priority === 'Critical' ? 'border-[#ff5260] text-[#ff5260] bg-[#ff5260]/10' : 'border-[#ffb3b3] text-[#ffb3b3] bg-[#ffb3b3]/10'}`}>{signal.priority}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-[#e3bebd]/40">Donor acquisition</span>
                        <span className="text-[#dde2f3]">{signal.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#080e1a] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${signal.progress}%` }} transition={{ duration: 1, delay: i * 0.2 }} className="h-full bg-gradient-to-r from-[#ffb3b3] to-[#ff5260] rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── DONORS ── */}
            {activeTab === 'Donors' && (
              <div className="space-y-4">
                <p className="text-xs text-[#e3bebd]/30 uppercase tracking-widest font-black">Nearby matched donors — Saida area</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Ahmed Rayan',  type: 'O−', dist: '4.2 km', status: 'In Range',    transit: false },
                    { name: 'Lina Mansour', type: 'A+', dist: '1.8 km', status: 'In Transit',  transit: true  },
                    { name: 'Zaid Hariri',  type: 'B−', dist: 'Offline', status: 'Unavailable', transit: false, disabled: true },
                  ].map((donor, i) => (
                    <div key={i} className={`p-6 rounded-2xl bg-[#0d131f] border border-[#5b4040]/15 hover:border-[#ff5260]/30 transition-all ${donor.disabled ? 'opacity-40 pointer-events-none' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#ff5260]/10 border border-[#ff5260]/15 flex items-center justify-center shrink-0">
                          <span className="text-sm font-black text-[#ff5260]">{donor.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p className="font-black text-white text-sm">{donor.name}</p>
                          <p className="text-[10px] text-[#ff5260] font-black uppercase">{donor.type} · {donor.dist}</p>
                        </div>
                        <div className={`ml-auto px-2 py-1 rounded-lg border text-[9px] font-black uppercase ${donor.transit ? 'bg-[#00daf3]/10 border-[#00daf3]/30 text-[#00daf3]' : 'border-[#5b4040]/30 text-[#e3bebd]/30'}`}>
                          {donor.status}
                        </div>
                      </div>
                      <button className="w-full py-2.5 bg-[#080e1a] border border-[#5b4040]/30 text-[#e3bebd]/50 hover:bg-[#ff5260] hover:text-[#5b0011] hover:border-[#ff5260] transition-all rounded-xl text-[10px] font-black uppercase tracking-widest">
                        Contact
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── OVERVIEW ── */}
            {activeTab === 'Overview' && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Active Requests', value: '2', icon: 'emergency',      color: '#ff5260' },
                  { label: 'Donors Matched',  value: '5', icon: 'group',          color: '#00daf3' },
                  { label: 'Units Fulfilled', value: '3', icon: 'water_drop',     color: '#10b981' },
                  { label: 'Avg. Response',   value: '18m', icon: 'timer',        color: '#ffb3b3' },
                ].map(s => (
                  <div key={s.label} className="bg-[#0d131f] border border-[#5b4040]/20 rounded-2xl p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.color}15`, border: `1px solid ${s.color}25` }}>
                      <span className="material-symbols-outlined text-xl" style={{ color: s.color }}>{s.icon}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#e3bebd]/40 uppercase tracking-widest mb-1">{s.label}</p>
                      <p className="text-2xl font-black text-white">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>{/* end max-w-7xl */}
        </main>

      </div>{/* end flex-1 flex-col */}

      {/* MOBILE TAB BAR */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-6 pt-3 bg-[#0d131f]/95 backdrop-blur-2xl border-t border-[#5b4040]/20 shadow-2xl">
        {[
          { icon: 'grid_view',   label: 'Overview' },
          { icon: 'add_alert',   label: 'Request' },
          { icon: 'emergency',   label: 'Active' },
          { icon: 'group',       label: 'Donors' },
        ].map((item, i) => (
          <button
            key={item.label}
            onClick={() => setActiveTab(i === 0 ? 'Overview' : i === 1 ? 'Post Request' : i === 2 ? 'Active Requests' : 'Donors')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              (i === 0 && activeTab === 'Overview') || (i === 1 && activeTab === 'Post Request') || (i === 2 && activeTab === 'Active Requests') || (i === 3 && activeTab === 'Donors')
                ? 'text-[#ff5260] bg-[#ff5260]/10'
                : 'text-[#e3bebd]/30'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span className="text-[9px] font-black uppercase tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

    </div>
  )
}
