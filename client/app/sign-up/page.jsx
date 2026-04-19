'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '../../context/LanguageContext'

export default function RoleSelectionPage() {
  const router = useRouter()
  const { lang, t } = useLanguage()

  const ROLES = [
    {
      id: 'donor',
      title: t.auth.iAmDonor,
      desc: t.auth.donorDesc,
      features: [t.auth.donorF1, t.auth.donorF2, t.auth.donorF3],
      cta: t.auth.createDonor,
      icon: 'volunteer_activism',
      color: '#ff5260',
      href: '/sign-up/donor'
    },
    {
      id: 'hospital',
      title: t.auth.weAreHospital,
      desc: t.auth.hospitalDesc,
      features: [t.auth.hospitalF1, t.auth.hospitalF2, t.auth.hospitalF3],
      cta: t.auth.applyHospital,
      icon: 'local_hospital',
      color: '#00daf3',
      href: '/sign-up/hospital'
    }
  ]

  return (
    <div className={`min-h-screen bg-[#080e1a] flex items-center justify-center px-4 py-16 relative overflow-hidden font-body ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ff5260]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#00daf3]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl">
        <motion.div
           className="flex flex-col items-center mb-12 text-center"
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
           <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center">
                 <motion.div className="absolute inset-0 rounded-full border border-[#ff5260]/60" animate={{ scale: [1, 1.9], opacity: [0.6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }} />
                 <span className="material-symbols-outlined text-[#ff5260] relative z-10 text-2xl">favorite</span>
              </div>
              <span className="text-4xl font-black bg-gradient-to-r from-[#ffb3b3] via-[#ff5260] to-[#d4145a] bg-clip-text text-transparent italic">{t.brand.name}</span>
           </div>
           <h1 className="text-3xl font-black text-[#dde2f3] mb-2">{t.auth.joinNetwork}</h1>
           <p className="text-[#e3bebd]/50 text-sm max-w-sm">{t.auth.roleSubtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {ROLES.map((role, i) => (
             <motion.div key={role.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.15 }}>
                <motion.button
                  onClick={() => router.push(role.href)}
                  className={`w-full h-full p-8 rounded-[2rem] bg-[#0d131f] border border-[#5b4040]/20 relative overflow-hidden group hover:border-[${role.color}]/40 transition-all text-start`}
                >
                   <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6`} style={{ backgroundColor: `${role.color}10`, border: `1px solid ${role.color}20` }}>
                      <span className="material-symbols-outlined text-3xl" style={{ color: role.color }}>{role.icon}</span>
                   </div>
                   <h2 className="text-xl font-black text-[#dde2f3] mb-3">{role.title}</h2>
                   <p className="text-[#e3bebd]/60 text-sm leading-relaxed mb-6 h-[60px] overflow-hidden">{role.desc}</p>
                   
                   <div className="space-y-2 mb-8">
                      {role.features.map(f => (
                        <div key={f} className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-[#e3bebd]/40">
                           <span className="material-symbols-outlined text-[14px]" style={{ color: role.color }}>check_circle</span>
                           {f}
                        </div>
                      ))}
                   </div>

                   <div className="flex items-center justify-between pb-2 border-b border-[#5b4040]/10">
                      <span className="text-sm font-bold" style={{ color: role.color }}>{role.cta}</span>
                      <span className={`material-symbols-outlined text-[18px] ${lang === 'ar' ? 'rotate-180' : ''}`} style={{ color: role.color }}>arrow_forward</span>
                   </div>
                </motion.button>
             </motion.div>
           ))}
        </div>

        <motion.p className="text-center text-xs text-[#e3bebd]/30 mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
           {t.auth.alreadyHave}{' '}
           <Link href="/sign-in" className="text-[#ff5260] font-bold hover:underline">{t.nav.signIn}</Link>
        </motion.p>
      </div>
    </div>
  )
}
