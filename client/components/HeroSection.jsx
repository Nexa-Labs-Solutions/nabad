'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useLanguage } from '../context/LanguageContext'

const LebanonMap3D = dynamic(() => import('./LebanonMap3D'), {
  ssr: false,
  loading: () => <div className="aspect-square w-full rounded-[3rem] bg-[#0d131f] border border-[#5b4040]/30 animate-pulse" />
})

export default function HeroSection() {
  const { t, lang } = useLanguage()
  const router = useRouter()

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] bg-[#ff5260]/8 rounded-full blur-[130px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ff5260]/6 rounded-full blur-[150px] animate-float-slow-delay opacity-30" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#ff5260]/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url('/texture.png')" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column */}
        <div className={`lg:col-span-7 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5260]/10 border border-[#ff5260]/20 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-[#ff5260]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-xs font-bold text-[#ff5260] uppercase tracking-widest">
              {lang === 'en' ? 'Saida, Lebanon · Blood Donation Network' : 'صيدا، لبنان · شبكة التبرع بالدم'}
            </span>
          </motion.div>

          <div className="text-5xl lg:text-8xl font-black tracking-tighter leading-tight mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {lang === 'en' ? 'Every ' : 'كل '}
              <span className="text-gradient-primary">{lang === 'en' ? 'Drop' : 'دقة'}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {lang === 'en' ? 'Saves a Life.' : 'قلب بتفرق.'}
            </motion.div>
          </div>

          <motion.p
            className="text-on-surface-variant text-lg lg:text-xl max-w-xl mb-10 leading-relaxed opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            className="flex items-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {/* Primary CTA — dominant */}
            <motion.button
              onClick={() => router.push('/sign-up')}
              className="px-10 py-4 bg-pulse-gradient rounded-xl font-black text-[#5b0011] glow-crimson flex items-center gap-3 text-base shadow-[0_0_40px_rgba(255,82,96,0.35)]"
              whileHover={{ scale: 1.04, boxShadow: '0 0 48px rgba(255,82,96,0.55)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>
                volunteer_activism
              </span>
              {t.hero.ctaPrimary}
            </motion.button>

            {/* Secondary CTA — understated */}
            <motion.button
              onClick={() => router.push('/sign-up')}
              className="px-6 py-4 bg-transparent text-[#e3bebd]/60 flex items-center gap-2 text-sm font-bold hover:text-[#ffb3b3] transition-colors"
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px' }}>
                emergency
              </span>
              {t.hero.ctaSecondary}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </motion.button>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-[#5b4040]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {[
              { icon: 'local_hospital', label: lang === 'en' ? '4 Hospitals' : '٤ مستشفيات' },
              { icon: 'group', label: lang === 'en' ? '1,200+ Donors' : '+١،٢٠٠ متبرع' },
              { icon: 'favorite', label: lang === 'en' ? '3,000+ Saves' : '+٣،٠٠٠ حياة' },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-sm text-[#e3bebd]/70 font-medium">
                <span className="material-symbols-outlined text-[#ff5260]" style={{ fontSize: '16px' }}>
                  {b.icon}
                </span>
                {b.label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — 3D Lebanon Map */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <LebanonMap3D />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
