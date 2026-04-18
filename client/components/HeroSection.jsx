'use client'
import { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'

const LIVE_REQUESTS = [
  { type: 'A+', hospital: 'Hammoud Hospital', dist: '0.8 km', ago: '2 min ago', urgent: true },
  { type: 'O-', hospital: 'Saida Gov. Hospital', dist: '1.4 km', ago: '5 min ago', urgent: true },
  { type: 'B+', hospital: 'Labib Medical Center', dist: '3.2 km', ago: '12 min ago', urgent: false },
]

const BLOOD_COLORS = {
  'A+':  'bg-[#ff5260]/20 text-[#ffb3b3] border-[#ff5260]/30',
  'A-':  'bg-[#ff5260]/20 text-[#ffb3b3] border-[#ff5260]/30',
  'O-':  'bg-[#ff3030]/20 text-[#ff9090] border-[#ff3030]/40',
  'O+':  'bg-[#ff5260]/15 text-[#ffb3b3] border-[#ff5260]/25',
  'B+':  'bg-[#00daf3]/10 text-[#00daf3] border-[#00daf3]/20',
  'AB+': 'bg-purple-500/10 text-purple-300 border-purple-500/20',
}

export default function HeroSection() {
  const [donorCount, setDonorCount] = useState(1100)

  useEffect(() => {
    const controls = animate(1100, 1247, {
      duration: 2.5,
      delay: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setDonorCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] bg-[#ff5260]/8 rounded-full blur-[130px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00daf3]/6 rounded-full blur-[150px] animate-float-slow-delay" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#ff5260]/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column */}
        <div className="lg:col-span-7">
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
              Saida, Lebanon · Blood Donation Network
            </span>
          </motion.div>

          <div className="text-6xl lg:text-8xl font-black tracking-tighter leading-tight mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Every{' '}
              <span className="text-gradient-primary">Drop</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              Saves a Life.
            </motion.div>
          </div>

          <motion.p
            className="text-on-surface-variant text-lg lg:text-xl max-w-xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            Nabad connects hospitals in urgent need with compatible donors nearby.
            Post a blood request, reach eligible donors instantly, and confirm
            life-saving donations — all in real time.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.button
              className="px-8 py-4 bg-pulse-gradient rounded-xl font-bold text-[#5b0011] glow-crimson flex items-center gap-3 text-base"
              whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(255,82,96,0.5)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>
                emergency
              </span>
              Request Blood Now
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-transparent border border-[#ffb3b3]/25 rounded-xl font-bold text-[#ffb3b3] flex items-center gap-3 text-base hover:border-[#ffb3b3]/50 transition-colors"
              whileHover={{ backgroundColor: 'rgba(255,179,179,0.05)', scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>
                volunteer_activism
              </span>
              Register as Donor
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap items-center gap-6 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {[
              { icon: 'local_hospital', label: '47 Partner Hospitals' },
              { icon: 'group', label: '1,200+ Donors' },
              { icon: 'favorite', label: '3,000+ Lives Saved' },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-sm text-[#e3bebd]/60">
                <span className="material-symbols-outlined text-[#ff5260]" style={{ fontSize: '16px' }}>
                  {b.icon}
                </span>
                {b.label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — live feed card */}
        <div className="lg:col-span-5 relative">
          <motion.div
            className="relative bg-[#080e1a]/60 backdrop-blur-xl p-6 rounded-2xl border border-[#5b4040]/20 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Live badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-[#e3bebd]/50 uppercase tracking-widest">
                Active Blood Requests
              </span>
              <span className="flex items-center gap-2 text-xs font-bold text-[#ff5260]">
                <motion.span
                  className="w-2 h-2 rounded-full bg-[#ff5260]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                LIVE
              </span>
            </div>

            {/* Request cards */}
            <div className="space-y-3 mb-6">
              {LIVE_REQUESTS.map((req, i) => (
                <motion.div
                  key={i}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${
                    req.urgent
                      ? 'bg-[#ff5260]/8 border-[#ff5260]/15'
                      : 'bg-[#0d131f]/60 border-[#5b4040]/15'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={`w-12 h-12 rounded-lg border flex items-center justify-center font-black text-sm shrink-0 ${
                    BLOOD_COLORS[req.type] || 'bg-[#ff5260]/15 text-[#ffb3b3] border-[#ff5260]/25'
                  }`}>
                    {req.type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#dde2f3] truncate">{req.hospital}</p>
                    <p className="text-xs text-[#e3bebd]/50 mt-0.5">{req.dist} · {req.ago}</p>
                  </div>
                  {req.urgent && (
                    <span className="shrink-0 text-xs font-bold text-[#ff5260] bg-[#ff5260]/10 px-2 py-1 rounded-md border border-[#ff5260]/20">
                      URGENT
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Donors nearby stat */}
            <motion.div
              className="bg-[#0d131f]/80 rounded-xl p-4 border border-[#5b4040]/15"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.35 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#e3bebd]/50 uppercase tracking-widest mb-1">
                    Donors Nearby Right Now
                  </p>
                  <p className="text-3xl font-black tabular-nums text-[#dde2f3]">
                    {donorCount.toLocaleString()}
                    <span className="text-[#ffb3b3] text-2xl">+</span>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex -space-x-2">
                    {['bg-[#ff5260]', 'bg-[#ffb3b3]', 'bg-[#00daf3]', 'bg-[#ff5260]/60'].map((c, i) => (
                      <motion.div
                        key={i}
                        className={`w-7 h-7 rounded-full ${c} border-2 border-[#080e1a]`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.6 + i * 0.08 }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[#e3bebd]/40">within 5 km of Saida</p>
                </div>
              </div>

              {/* Avg match time — inline below donors count */}
              <motion.div
                className="mt-3 pt-3 border-t border-[#5b4040]/20 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                <div className="w-8 h-8 rounded-full bg-[#00daf3]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#00daf3]" style={{ fontSize: '16px' }}>
                    bolt
                  </span>
                </div>
                <div>
                  <p className="text-xs text-[#e3bebd]/50 uppercase tracking-widest">Avg. Match Time</p>
                  <p className="text-base font-black text-[#dde2f3]">
                    &lt;3 <span className="text-sm font-medium text-[#e3bebd]/60">minutes</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
