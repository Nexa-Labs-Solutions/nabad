'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RoleSelectionPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#080e1a] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ff5260]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#00daf3]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Logo */}
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-[#ff5260]/60"
                animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-[#ff5260]/35"
                animate={{ scale: [1, 2.4], opacity: [0.35, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.45 }}
              />
              <motion.span
                className="material-symbols-outlined text-[#ff5260] relative z-10 text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
                animate={{ scale: [1, 1.14, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                favorite
              </motion.span>
            </div>
            <span className="text-4xl font-black bg-gradient-to-r from-[#ffb3b3] to-[#ff5260] bg-clip-text text-transparent">
              Nabad
            </span>
          </div>

          <h1 className="text-2xl font-black text-[#dde2f3] mb-2">Join the Network</h1>
          <p className="text-[#e3bebd]/50 text-sm text-center max-w-sm">
            Are you joining as a blood donor or registering your hospital?
          </p>
        </motion.div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Donor card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              onClick={() => router.push('/sign-up/donor')}
              className="w-full text-left p-8 rounded-2xl bg-[#0d131f] border border-[#5b4040]/20 relative overflow-hidden group cursor-pointer"
              whileHover={{ borderColor: 'rgba(255,82,96,0.35)', backgroundColor: '#111827' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {/* Gradient accent on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-pulse-gradient"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <div className="w-16 h-16 rounded-2xl bg-[#ff5260]/10 border border-[#ff5260]/20 flex items-center justify-center mb-6">
                <motion.span
                  className="material-symbols-outlined text-[#ff5260] text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  volunteer_activism
                </motion.span>
              </div>

              <h2 className="text-xl font-black text-[#dde2f3] mb-3">I Am a Donor</h2>
              <p className="text-[#e3bebd]/60 text-sm leading-relaxed mb-6">
                Register as a blood donor. Receive real-time alerts when a hospital near you
                needs your blood type. Save lives in Saida and beyond.
              </p>

              <div className="flex flex-col gap-2 mb-6">
                {['Instant hospital alerts', 'Track your donation history', 'Community impact score'].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-[#e3bebd]/50">
                    <span className="material-symbols-outlined text-[#ff5260]" style={{ fontSize: '14px' }}>check_circle</span>
                    {f}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#ff5260]">Create donor account</span>
                <span className="material-symbols-outlined text-[#ff5260]">arrow_forward</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Hospital card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              onClick={() => router.push('/sign-up/hospital')}
              className="w-full text-left p-8 rounded-2xl bg-[#0d131f] border border-[#5b4040]/20 relative overflow-hidden group cursor-pointer"
              whileHover={{ borderColor: 'rgba(0,218,243,0.3)', backgroundColor: '#111827' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(90deg, #00daf3, rgba(0,218,243,0.2))' }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />

              <div className="w-16 h-16 rounded-2xl bg-[#00daf3]/10 border border-[#00daf3]/20 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[#00daf3] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_hospital
                </span>
              </div>

              <h2 className="text-xl font-black text-[#dde2f3] mb-3">We Are a Hospital</h2>
              <p className="text-[#e3bebd]/60 text-sm leading-relaxed mb-6">
                Register your hospital to post urgent blood requests, reach thousands of
                eligible donors nearby, and manage your blood supply in real time.
              </p>

              <div className="flex flex-col gap-2 mb-6">
                {['Post urgent blood requests', 'Smart donor matching', 'Admin-reviewed registration'].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-[#e3bebd]/50">
                    <span className="material-symbols-outlined text-[#00daf3]" style={{ fontSize: '14px' }}>check_circle</span>
                    {f}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#00daf3]">Apply for hospital access</span>
                <span className="material-symbols-outlined text-[#00daf3]">arrow_forward</span>
              </div>
            </motion.button>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-xs text-[#e3bebd]/30 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Already have an account?{' '}
          <Link href="/sign-in" className="text-[#ff5260] hover:underline">Sign in</Link>
        </motion.p>
      </div>
    </div>
  )
}
