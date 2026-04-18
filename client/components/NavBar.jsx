'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = ['Dashboard', 'Donors', 'Inventory', 'Impact']

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-500 ${
        scrolled
          ? 'bg-[#0d131f]/85 shadow-xl shadow-[#080e1a]/30'
          : 'bg-[#0d131f]/60 shadow-xl shadow-[#080e1a]/20'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-between items-center h-16 px-8 w-full max-w-screen-2xl mx-auto">
        {/* Logo + links */}
        <div className="flex items-center gap-8">
          <motion.span
            className="text-2xl font-black tracking-tighter bg-gradient-to-r from-[#ffb3b3] to-[#ff5260] bg-clip-text text-transparent cursor-pointer"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            Nabad
          </motion.span>

          <div className="hidden md:flex items-center gap-6 font-medium tracking-tight">
            {NAV_LINKS.map((label, i) => (
              <motion.a
                key={label}
                href="#"
                className={`relative pb-1 transition-colors duration-200 ${
                  i === 0
                    ? 'text-[#ffb3b3]'
                    : 'text-[#e3bebd] hover:text-[#ffb3b3]'
                }`}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.15 }}
              >
                {label}
                {i === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5260] rounded-full" />
                )}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden lg:flex items-center bg-[#080e1a] px-4 py-1.5 rounded-full border border-transparent focus-within:border-[#ffb3b3]/40 transition-all duration-300">
            <span className="material-symbols-outlined text-[#e3bebd]/60 mr-2" style={{ fontSize: '16px' }}>
              search
            </span>
            <input
              className="bg-transparent border-none focus:outline-none text-sm p-0 w-32 placeholder:text-[#e3bebd]/50 text-[#dde2f3]"
              placeholder="Search..."
              type="text"
            />
          </div>

          {/* Emergency Alert */}
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pulse-gradient text-[#5b0011] font-bold text-sm glow-crimson"
            whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(255,82,96,0.45)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1", fontSize: '16px' }}
            >
              emergency
            </span>
            Emergency Alert
          </motion.button>

          {/* Icon buttons + avatar */}
          <div className="flex items-center gap-2">
            {['notifications', 'settings'].map((icon) => (
              <motion.button
                key={icon}
                className="p-2 text-[#e3bebd] rounded-full"
                whileHover={{ backgroundColor: 'rgba(26,32,44,0.6)', scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <span className="material-symbols-outlined">{icon}</span>
              </motion.button>
            ))}

            <motion.div
              className="w-8 h-8 rounded-full bg-[#242a36] overflow-hidden ml-2 ring-2 ring-[#ffb3b3]/20 cursor-pointer"
              whileHover={{ scale: 1.1, ringWidth: '3px' }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcdSo5uBLAxLIT17zkwSSMFGAuXWj8cqfOJ9jNQkRNhqL9IYQKBC3qvP6mkg-T2MvNRJuXHXGNJC3HKAUuGg6884gGcl6UOBLZzCdjiRyBIjVSuYvKOhJuuSmnIA8xl7U1eEnnLnQspw0K2XTsMI9EQ7fFEo0c0orTaf667btyLIDWrlCs2XimKzir57qHAxnpJOZDBjSpYYhDHIiI1l-nxSs5YgCicbQ1ExKPPGyYdkUzf-jPE7rIJfbzcI0PaYQnOOQ9sbJUgoY"
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
