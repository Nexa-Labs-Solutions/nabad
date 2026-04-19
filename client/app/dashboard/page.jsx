'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useLanguage } from '../../context/LanguageContext'

const BLOOD_TYPES = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−', 'unknown']

const INITIAL = {
  dob: '',
  sex: '',
  weight: '',
  phone: '',
  bloodType: '',
  q1: '', q2: '', q3: '', q4: '',
  q5: '', q6: '', q7: '', q8: '',
  notifSms: true,
  notifPush: false,
  hours: 'anytime',
  c1: false, c2: false, c3: false,
}

function Field({ label, hint, children, lang }) {
  return (
    <div className={`flex flex-col gap-1.5 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      <label className="text-xs font-medium text-[#e3bebd]/70">{label}</label>
      {children}
      {hint && <span className="text-xs text-[#e3bebd]/35">{hint}</span>}
    </div>
  )
}

const inputCls = `w-full bg-[#080e1a] border border-[#5b4040]/30 rounded-lg px-3 py-2.5
  text-sm text-[#dde2f3] placeholder:text-[#e3bebd]/25
  focus:outline-none focus:border-[#ff5260]/50 focus:ring-2 focus:ring-[#ff5260]/10
  transition-all duration-200`

export function DonorProfileSetup({ setSetupComplete }) {
  const { lang } = useLanguage()
  const STEP_LABELS = lang === 'ar' ? ['معلوماتك', 'فحص صحي', 'التنبيهات', 'خلصنا!'] : ['About You', 'Health Check', 'Notifications', 'Done']
  const [step, setStep] = useState(0)
  const [data, setData] = useState(INITIAL)
  const [, setError] = useState('')

  const set = (field, value) => {
    setData((d) => ({ ...d, [field]: value }))
    setError('')
  }

  const goNext = () => {
    if (step === 3) {
      setSetupComplete(true)
      return
    }
    setStep((s) => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`min-h-screen bg-[#080e1a] text-[#dde2f3] p-4 md:p-8 flex flex-col items-center justify-center font-body ${lang === 'ar' ? 'rtl' : ''}`}>
      <div className="w-full max-w-xl bg-[#0d131f] border border-[#5b4040]/20 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 pb-0 flex flex-col items-center">
            <div className="w-12 h-12 bg-pulse-gradient rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="material-symbols-outlined text-[#5b0011] font-bold text-2xl">favorite</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight mb-8">
              {lang === 'ar' ? 'تحضير ملف المتبرع' : 'Complete Your Profile'}
            </h1>
            
            <div className="flex w-full justify-between mb-10 overflow-hidden px-2">
              {STEP_LABELS.map((label, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 group relative">
                   <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all ${
                     step >= idx ? 'bg-[#ff5260] border-[#ff5260] text-white shadow-[0_0_15px_rgba(255,82,96,0.4)]' : 'border-[#5b4040]/40 text-[#5b4040]/40'
                   }`}>
                     {idx + 1}
                   </div>
                   <span className={`text-[9px] font-bold uppercase tracking-widest ${step >= idx ? 'text-[#ffb3b3]' : 'text-[#e3bebd]/20'}`}>{label}</span>
                </div>
              ))}
            </div>
        </div>

        <div className="p-8 pt-0">
           {step === 0 && (
             <div className="space-y-6">
                <Field label={lang === 'ar' ? 'تاريخ الميلاد' : 'Date of Birth'} lang={lang}>
                   <input type="date" className={inputCls} value={data.dob} onChange={e => set('dob', e.target.value)} />
                </Field>
                <Field label={lang === 'ar' ? 'فئة الدم' : 'Blood Type'} lang={lang}>
                   <div className="grid grid-cols-3 gap-2">
                      {BLOOD_TYPES.map(bt => (
                        <button key={bt} onClick={() => set('bloodType', bt)} className={`py-2 rounded-lg border text-sm font-bold transition-all ${data.bloodType === bt ? 'bg-[#ff5260] border-[#ff5260] text-white' : 'bg-[#080e1a] border-[#5b4040]/30 text-[#e3bebd]/40'}`}>
                          {bt}
                        </button>
                      ))}
                   </div>
                </Field>
             </div>
           )}

           {step === 3 && (
             <div className="text-center py-6">
                <div className="w-16 h-16 bg-[#ff5260]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                   <span className="material-symbols-outlined text-[#ff5260] text-3xl">check_circle</span>
                </div>
                <h2 className="text-xl font-black text-white mb-4">{lang === 'ar' ? 'صرت جاهز تنقذ أرواح!' : 'You are all set!'}</h2>
                <p className="text-[#e3bebd]/60 text-sm mb-8 leading-relaxed">
                   {lang === 'ar' 
                     ? 'ملفك هني صار فعال. لما أي مستشفى بصيدا تطلب فئة دمك، لح يوصلك تنبيه فوراً.'
                     : 'Your profile is active. When a hospital in Saida needs your blood type, you will receive an instant notification.'}
                </p>
                <button onClick={() => setSetupComplete(true)} className="w-full py-4 bg-pulse-gradient rounded-xl text-[#5b0011] font-bold shadow-lg">
                   {lang === 'ar' ? 'تفضل عالمكتب' : 'Go to Dashboard'}
                </button>
             </div>
           )}

           {step < 3 && (
             <div className="flex gap-4 mt-12">
                <button onClick={() => setStep(s => Math.max(0, s-1))} disabled={step === 0} className="flex-1 py-3 border border-[#5b4040]/30 rounded-xl text-sm font-bold text-[#e3bebd]/40 disabled:opacity-0 transition-opacity">
                   {lang === 'ar' ? 'رجوع' : 'Back'}
                </button>
                <button onClick={goNext} className="flex-[2] py-3 bg-pulse-gradient rounded-xl text-[#5b0011] font-black text-sm shadow-lg">
                   {lang === 'ar' ? 'متابعة' : 'Continue'}
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const { t, lang, toggleLanguage } = useLanguage()
  const [setupComplete, setSetupComplete] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAvailable, setIsAvailable] = useState(true)
  const [hasUrgentRequest, setHasUrgentRequest] = useState(true)
  const [accepted, setAccepted] = useState(false)

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#080e1a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ff5260]/20 border-t-[#ff5260] rounded-full animate-spin" />
      </div>
    )
  }

  if (!setupComplete) {
    return <DonorProfileSetup setSetupComplete={setSetupComplete} />
  }

  const NAV = [
    { label: t.nav.howItWorks, icon: 'info',   href: '/dashboard/how-it-works' },
    { label: t.nav.hospitals,  icon: 'hub',    href: '/dashboard/hospitals' },
    { label: t.nav.faq,        icon: 'quiz',   href: '/dashboard/faq' },
    { label: t.nav.about,      icon: 'groups', href: '/dashboard/about' },
  ]

  return (
    <div className={`min-h-screen bg-[#080e1a] text-[#dde2f3] p-4 md:p-8 flex flex-col items-center relative overflow-hidden font-body ${lang === 'ar' ? 'rtl' : ''}`}>
      {/* SIDEBAR */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-md z-40" />
            <motion.div initial={{ x: lang === 'ar' ? 400 : -400 }} animate={{ x: 0 }} exit={{ x: lang === 'ar' ? 400 : -400 }} className={`fixed top-0 bottom-0 w-72 bg-[#0d131f] border-x border-[#5b4040]/20 z-50 p-8 flex flex-col ${lang === 'ar' ? 'right-0' : 'left-0'}`}>
                <div className="flex items-center justify-between mb-10">
                   <span className="text-xl font-black text-white italic">Nabad</span>
                   <button onClick={() => setIsMenuOpen(false)}><span className="material-symbols-outlined text-[#e3bebd]/40">close</span></button>
                </div>
                <div className="space-y-2">
                   {NAV.map(n => (
                     <Link key={n.label} href={n.href} className="flex items-center gap-4 p-4 rounded-xl bg-[#080e1a] border border-[#5b4040]/10 hover:border-[#ff5260]/40 transition-all">
                        <span className="material-symbols-outlined text-[#ff5260]">{n.icon}</span>
                        <span className="font-bold text-sm">{n.label}</span>
                     </Link>
                   ))}
                </div>
                <div className="mt-auto flex flex-col gap-4">
                   <button
                     onClick={() => setIsAvailable(v => !v)}
                     className={`w-full p-4 rounded-xl border text-[10px] font-black uppercase flex items-center justify-center gap-2 transition-all ${
                       isAvailable
                         ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                         : 'border-[#5b4040]/30 text-[#e3bebd]/30'
                     }`}
                   >
                     <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                     {isAvailable
                       ? (lang === 'ar' ? 'متاح للتبرع' : 'Available to Donate')
                       : (lang === 'ar' ? 'غير متاح' : 'Unavailable')}
                   </button>
                   <button onClick={toggleLanguage} className="w-full p-4 rounded-xl border border-[#ff5260]/20 text-[10px] font-black uppercase text-[#ffb3b3]">
                      {lang === 'en' ? 'ARABIC (Lebanese)' : 'ENGLISH'}
                   </button>
                   <div className="flex items-center gap-3 p-3 bg-[#080e1a] rounded-2xl border border-[#5b4040]/20">
                      <UserButton />
                      <div className="flex flex-col min-w-0">
                         <p className="text-xs font-bold text-white truncate">{user?.firstName}</p>
                         <p className="text-[9px] text-[#e3bebd]/30 uppercase font-black tracking-widest">{lang === 'ar' ? 'متبرع نشط' : 'Active Donor'}</p>
                      </div>
                   </div>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-8 h-full">
         <header className="flex justify-between items-center w-full">
            <div className="flex items-center gap-4">
               <button onClick={() => setIsMenuOpen(true)} className="w-10 h-10 rounded-xl border border-[#5b4040]/30 flex flex-col gap-1.5 items-center justify-center">
                  <div className="w-5 h-[1.5px] bg-white/60" />
                  <div className="w-3 h-[1.5px] bg-white/40 self-start ml-2.5" />
                  <div className="w-5 h-[1.5px] bg-white/60" />
               </button>
               <div className="flex flex-col">
                  <h1 className="text-2xl font-black text-white tracking-tight">{t.dashboard.welcome}, {user?.firstName}</h1>
                  <p className="text-[10px] text-[#ff5260] font-black uppercase tracking-[0.2em]">{t.dashboard.donorHub}</p>
               </div>
            </div>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: 'w-10 h-10' } }} />
         </header>

         {/* URGENT REQUEST */}
         <AnimatePresence>
         {hasUrgentRequest && !accepted && (
           <motion.div
             initial={{ scale: 0.97, opacity: 0, y: -8 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             exit={{ scale: 0.97, opacity: 0 }}
             className="bg-[#ff5260]/10 border-2 border-[#ff5260] p-8 rounded-[2.5rem] relative overflow-hidden"
           >
              {/* live ping */}
              <div className="absolute top-5 right-5 flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5260] opacity-75" />
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff5260]" />
              </div>

              <p className="text-[#ffb3b3] text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                 <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                 {t.hero.urgent}
              </p>

              <h2 className="text-2xl md:text-3xl font-black text-white mb-1">
                {lang === 'ar' ? 'مطلوب فئة O- فورا!' : 'O− Blood Needed Now'}
              </h2>

              {/* hospital info row */}
              <div className="flex flex-wrap items-center gap-4 mt-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-[#e3bebd]/70">
                  <span className="material-symbols-outlined text-[#ff5260] text-base">local_hospital</span>
                  <span className="font-bold">{lang === 'ar' ? 'مستشفى حمود الجامعي' : 'Hammoud Hospital UMC'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#e3bebd]/50">
                  <span className="material-symbols-outlined text-base">location_on</span>
                  <span>{lang === 'ar' ? 'صيدا، بلوار د. لبيب' : 'Saida, Dr. Labib Blvd'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#e3bebd]/50">
                  <span className="material-symbols-outlined text-base">call</span>
                  <span dir="ltr">+961 7 720 000</span>
                </div>
              </div>

              <p className="text-[#e3bebd]/60 mb-8 max-w-lg text-sm leading-relaxed">
                {lang === 'ar'
                  ? 'الطوارئ بحاجة لـ ٣ وحدات O- لعملية جراحية طارئة. انت أقرب متبرع متاح هلأ.'
                  : 'The ER needs 3 units of O− for emergency surgery. You are the closest available matched donor right now.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                 <button
                   onClick={() => setAccepted(true)}
                   className="flex-1 py-4 bg-pulse-gradient rounded-xl text-[#5b0011] font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                 >
                   <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
                   {lang === 'ar' ? 'أنا جايي' : "I'm on my way"}
                 </button>
                 <button
                   onClick={() => setHasUrgentRequest(false)}
                   className="sm:w-auto px-6 py-4 text-[#e3bebd]/40 font-bold text-sm hover:text-[#e3bebd]/70 transition-colors"
                 >
                   {lang === 'ar' ? 'مش قادر هلأ' : "Can't make it right now"}
                 </button>
              </div>
           </motion.div>
         )}
         </AnimatePresence>

         {accepted && (
           <motion.div
             initial={{ scale: 0.97, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="bg-[#00daf3]/10 border-2 border-[#00daf3]/40 p-8 rounded-[2.5rem]"
           >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-[#00daf3] rounded-2xl flex items-center justify-center shrink-0">
                   <span className="material-symbols-outlined text-[#080e1a] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-[#00daf3] uppercase tracking-widest mb-1">
                    {lang === 'ar' ? 'في الطريق' : 'En Route'}
                  </p>
                  <h2 className="text-xl font-black text-white mb-1">
                    {lang === 'ar' ? 'المستشفى بانتظارك' : 'The hospital is expecting you'}
                  </h2>
                  <p className="text-[#e3bebd]/60 text-sm mb-5">
                    {lang === 'ar'
                      ? 'فريق الطوارئ خَبَرناه انك بالطريق. توجه لقسم الطوارئ مباشرة.'
                      : 'We notified the ER team. Head directly to the Emergency Department entrance.'}
                  </p>
                  {/* hospital details */}
                  <div className="bg-[#080e1a] rounded-xl border border-[#00daf3]/20 p-4 mb-5 space-y-2">
                    {[
                      { icon: 'local_hospital', text: lang === 'ar' ? 'مستشفى حمود الجامعي' : 'Hammoud Hospital UMC' },
                      { icon: 'location_on',    text: lang === 'ar' ? 'صيدا، بلوار د. لبيب' : 'Saida, Dr. Labib Blvd' },
                      { icon: 'call',           text: '+961 7 720 000' },
                      { icon: 'meeting_room',   text: lang === 'ar' ? 'قسم الطوارئ — الطابق الأرضي' : 'Emergency Dept — Ground Floor' },
                    ].map(row => (
                      <div key={row.icon} className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-[#00daf3] text-base">{row.icon}</span>
                        <span className="text-[#dde2f3]" dir={row.icon === 'call' ? 'ltr' : undefined}>{row.text}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://maps.google.com/?q=33.5570,35.3714"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-3 px-6 bg-[#00daf3] text-[#080e1a] font-black rounded-xl text-sm hover:opacity-90 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
                    {lang === 'ar' ? 'افتح الخريطة' : 'Open Directions'}
                  </a>
                </div>
              </div>
           </motion.div>
         )}

         {/* STATS */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { l: t.dashboard.livesSaved, v: '6', c: '#ff5260', i: 'favorite' },
              { l: t.dashboard.matchFound, v: '14', c: '#ffb3b3', i: 'gesture' },
              { l: t.dashboard.reliability, v: '99%', c: '#00daf3', i: 'verified' },
              { l: lang === 'ar' ? 'موعدك الجاي' : 'Next Goal', v: '24', c: '#ff5260', i: 'event' }
            ].map((s, i) => (
              <div key={i} className="bg-[#0d131f] border border-[#5b4040]/20 p-6 rounded-3xl text-center flex flex-col items-center">
                 <span className="material-symbols-outlined mb-2" style={{ color: s.c }}>{s.i}</span>
                 <p className="text-[9px] font-black text-[#e3bebd]/40 uppercase tracking-widest mb-1">{s.l}</p>
                 <p className="text-2xl font-black text-white">{s.v}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  )
}
