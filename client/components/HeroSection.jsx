'use client'
import { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'

const BARS = [
  { pct: 40,  cls: 'bg-primary/20' },
  { pct: 60,  cls: 'bg-primary/40' },
  { pct: 90,  cls: 'bg-pulse-gradient' },
  { pct: 75,  cls: 'bg-primary/60' },
  { pct: 55,  cls: 'bg-primary/30' },
  { pct: 85,  cls: 'bg-[#00daf3]/20' },
  { pct: 45,  cls: 'bg-[#00daf3]/40' },
]

const AVATARS = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMMv6qtQaeAgEivwrUNAPwmSV1a31DIiuIAaEFQgVR3-BXFQcRyaw8f_XH0HfwFn92mjIWVZEDVUy3-TtVPP3Qk-G7C_w_VOyoFet3M9JPKmjm9YdKvLaE_L4m5d89lWkAFOXRl8XaDRpZNm7Fe8kfpMltRR_wjjaR7S8-WOgN9KvXA1cEsazj-X5bSuHjHb_c3gxm_Qsnqg2s1it2JwlgaViA_qM_4xwadpIlKDIvyWkHhW_8Uf8jo7kAMACJP4TuUPW9Tx3VQxc',
    alt: 'Medical professional',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCe0ldZOaGsCTze9CdQ140Mnb6schC9vbF2Oc7Pft8AyCxNwE2bP5om0shqwAniUV7ennTBK0IHs4BA2Mc9rNmY2kSExf1LWal0t00evC1EEsSM_NR-R1OmaeTfUIXQWEDeeEXkfVv0CGcH_nUax-O8_Nmotb6Je2CAyP0ByyySkGjt8SnhY09Sj9fYJMhisHZfkdd8sQqLWns4Gr4_Pc59-FNk_zG_JBQwdHF2ZcFd9RoUDtS2-Q_7Wjpq9RyIEhtZ8GaxkTqc7z0',
    alt: 'Young woman in clinic',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfXlOgFNak8sJEHdwoZKVEtq-MTTAnmvFUzdEzkqcAMAFWQW4qY7U2AIUhT5gOyct5z32dvkd7ilIAVM0n0U8-NirfNUE88fGdTXvzTCszb9mH6TczoxhgUX9CPYf7cSEQn-7HoPvUYIsxodbumV3y0K059psCHu01Wlpc5d64gkIGTAK40wDlsnna_eqZPsBIdUDbzJ-XcAZ-KBdLPcF4iqXfP1ex6puOhKcrGzpHvNkFraDTpPT77-VVsqIl5rKl_3N9A5TiwEg',
    alt: 'Senior researcher',
  },
]

export default function HeroSection() {
  const [counter, setCounter] = useState('95.0')

  useEffect(() => {
    const controls = animate(95, 99.8, {
      duration: 2.2,
      delay: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setCounter(v.toFixed(1)),
    })
    return () => controls.stop()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-tertiary/10 rounded-full blur-[150px] animate-float-slow-delay" />
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column */}
        <div className="lg:col-span-7">
          <motion.label
            className="font-label text-sm uppercase tracking-widest text-primary mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The Kinetic Core v2.0
          </motion.label>

          <div className="text-6xl lg:text-8xl font-black tracking-tighter leading-tight mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Every{' '}
              <span className="text-gradient-primary">Pulse</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              Matters.
            </motion.div>
          </div>

          <motion.p
            className="text-on-surface-variant text-lg lg:text-xl max-w-xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            The world&apos;s fastest blood supply network. Real-time matching, predictive logistics, and instant emergency broadcasts powered by Nabad&apos;s kinetic core engine.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.button
              className="px-8 py-4 bg-pulse-gradient rounded-xl font-bold text-on-primary-container glow-crimson flex items-center gap-3"
              whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(255,82,96,0.45)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              Launch Dashboard
              <span className="material-symbols-outlined">trending_up</span>
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-surface-container-low border border-outline-variant/15 rounded-xl font-bold text-on-surface flex items-center gap-3"
              whileHover={{ backgroundColor: '#1a202c', scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              View Analytics
              <span className="material-symbols-outlined">monitoring</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right column — data card */}
        <div className="lg:col-span-5 relative">
          <motion.div
            className="relative bg-surface-container-lowest/40 backdrop-blur-xl p-6 rounded-2xl border border-outline-variant/10 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Live badge */}
            <div className="absolute top-0 right-0 p-4">
              <span className="flex items-center gap-2 text-xs font-bold text-tertiary">
                <motion.span
                  className="w-2 h-2 rounded-full bg-tertiary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                LIVE FEED
              </span>
            </div>

            {/* Counter */}
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-on-surface-variant/60 block mb-1">
                Global Success Rate
              </span>
              <div className="text-4xl font-black text-on-surface tabular-nums">
                {counter}
                <span className="text-primary">%</span>
              </div>
            </div>

            {/* Sparkline bars */}
            <div className="h-64 flex items-end gap-2 overflow-hidden">
              {BARS.map((bar, i) => (
                <motion.div
                  key={i}
                  className={`flex-1 rounded-t ${bar.cls}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${bar.pct}%` }}
                  transition={{ duration: 0.9, delay: 1.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>

            {/* Avatars */}
            <div className="mt-6 flex justify-between items-center">
              <div className="flex -space-x-3">
                {AVATARS.map((av, i) => (
                  <motion.img
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-surface shadow-lg object-cover"
                    src={av.src}
                    alt={av.alt}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.8 + i * 0.1 }}
                  />
                ))}
              </div>
              <motion.span
                className="text-xs font-medium text-on-surface-variant"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 2.2 }}
              >
                +1.2k Active Donors
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
