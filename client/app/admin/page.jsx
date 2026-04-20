'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_APPLICATIONS = [
  { id: 1, ref: 'NBD-A1B2C3D4', nameEn: 'Hammoud Hospital UMC', nameAr: 'مستشفى حمود الجامعي', governorate: 'South Lebanon', city: 'Saida', email: 'admin@hammoud.lb', repName: 'Dr. Khalil Hammoud', repPhone: '+961 7 123 456', hospitalType: 'University / Teaching', beds: 320, status: 'pending', createdAt: '2026-04-18T09:12:00Z' },
  { id: 2, ref: 'NBD-E5F6G7H8', nameEn: 'Labib Medical Center', nameAr: 'مركز لبيب الطبي', governorate: 'South Lebanon', city: 'Saida', email: 'info@labib.lb', repName: 'Rania Labib', repPhone: '+961 7 234 567', hospitalType: 'Private', beds: 85, status: 'approved', createdAt: '2026-04-15T14:30:00Z' },
  { id: 3, ref: 'NBD-I9J0K1L2', nameEn: 'Dalaa Hospital', nameAr: 'مستشفى دلاعة', governorate: 'South Lebanon', city: 'Saida', email: 'contact@dalaa.lb', repName: 'Omar Dalaa', repPhone: '+961 7 345 678', hospitalType: 'Private', beds: 60, status: 'rejected', createdAt: '2026-04-10T11:00:00Z' },
  { id: 4, ref: 'NBD-M3N4O5P6', nameEn: 'Makassed General Hospital', nameAr: 'مستشفى المقاصد العام', governorate: 'Beirut', city: 'Beirut', email: 'admin@makassed.lb', repName: 'Fatima Nassar', repPhone: '+961 1 456 789', hospitalType: 'NGO / Non-profit', beds: 200, status: 'pending', createdAt: '2026-04-19T08:45:00Z' },
  { id: 5, ref: 'NBD-Q7R8S9T0', nameEn: 'Rizk Hospital', nameAr: 'مستشفى رزق', governorate: 'Beirut', city: 'Beirut', email: 'info@rizk.lb', repName: 'Georges Rizk', repPhone: '+961 1 567 890', hospitalType: 'Private', beds: 150, status: 'pending', createdAt: '2026-04-20T07:20:00Z' },
]

const MOCK_DONORS = [
  { id: 1, name: 'Ahmad Rayan', email: 'ahmad@example.com', bloodType: 'O−', city: 'Saida', donations: 6, lastDonation: '2026-03-10', status: 'active' },
  { id: 2, name: 'Lina Mansour', email: 'lina@example.com', bloodType: 'A+', city: 'Saida', donations: 3, lastDonation: '2026-02-20', status: 'active' },
  { id: 3, name: 'Zaid Hariri', email: 'zaid@example.com', bloodType: 'B−', city: 'Beirut', donations: 1, lastDonation: '2026-01-05', status: 'inactive' },
  { id: 4, name: 'Sara Khalil', email: 'sara@example.com', bloodType: 'AB+', city: 'Saida', donations: 9, lastDonation: '2026-04-01', status: 'active' },
  { id: 5, name: 'Nour Beydoun', email: 'nour@example.com', bloodType: 'O+', city: 'Tyr', donations: 4, lastDonation: '2026-03-28', status: 'active' },
]

const MOCK_REQUESTS = [
  { id: 1, hospital: 'Hammoud Hospital UMC', bloodType: 'O−', units: 3, urgency: 'Critical', status: 'active', matchedDonors: 2, postedAt: '2026-04-20T06:10:00Z' },
  { id: 2, hospital: 'Labib Medical Center', bloodType: 'A+', units: 2, urgency: 'High', status: 'fulfilled', matchedDonors: 2, postedAt: '2026-04-19T22:00:00Z' },
  { id: 3, hospital: 'Dalaa Hospital', bloodType: 'B+', units: 1, urgency: 'Standard', status: 'active', matchedDonors: 1, postedAt: '2026-04-20T07:30:00Z' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso)) / 1000
  if (diff < 60) return `${Math.floor(diff)}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

const STATUS_STYLES = {
  pending:  { dot: 'bg-amber-400',   badge: 'bg-amber-400/10 text-amber-400 border-amber-400/30' },
  approved: { dot: 'bg-emerald-400', badge: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30' },
  rejected: { dot: 'bg-red-500',     badge: 'bg-red-500/10 text-red-400 border-red-500/30' },
  active:   { dot: 'bg-emerald-400', badge: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30' },
  fulfilled:{ dot: 'bg-[#00daf3]',   badge: 'bg-[#00daf3]/10 text-[#00daf3] border-[#00daf3]/30' },
  inactive: { dot: 'bg-zinc-500',    badge: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30' },
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${s.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  )
}

function StatCard({ icon, label, value, sub, color = '#ff5260' }) {
  return (
    <div className="bg-[#0d131f] border border-[#5b4040]/20 rounded-2xl p-6 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}>
        <span className="material-symbols-outlined text-xl" style={{ color }}>{icon}</span>
      </div>
      <div>
        <p className="text-[10px] font-black text-[#e3bebd]/40 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-black text-white leading-none">{value}</p>
        {sub && <p className="text-[10px] text-[#e3bebd]/30 mt-1">{sub}</p>}
      </div>
    </div>
  )
}

// ─── Application Detail Modal ─────────────────────────────────────────────────
function AppModal({ app, onClose, onStatusChange }) {
  if (!app) return null
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-[#0d131f] border border-[#5b4040]/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-8 border-b border-[#5b4040]/20">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <StatusBadge status={app.status} />
                <span className="text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-widest">{app.ref}</span>
              </div>
              <h2 className="text-xl font-black text-white">{app.nameEn}</h2>
              <p className="text-sm text-[#e3bebd]/50 mt-0.5">{app.nameAr}</p>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-xl bg-[#080e1a] border border-[#5b4040]/30 flex items-center justify-center text-[#e3bebd]/40 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="p-8 space-y-6">
            {[
              { title: 'Hospital Details', rows: [
                ['Type', app.hospitalType], ['Licensed Beds', app.beds], ['Submitted', timeAgo(app.createdAt)],
              ]},
              { title: 'Location & Contact', rows: [
                ['Governorate', app.governorate], ['City', app.city], ['Email', app.email],
              ]},
              { title: 'Authorized Representative', rows: [
                ['Name', app.repName], ['Phone', app.repPhone],
              ]},
            ].map(section => (
              <div key={section.title}>
                <p className="text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-widest mb-3">{section.title}</p>
                <div className="bg-[#080e1a] rounded-xl border border-[#5b4040]/15 divide-y divide-[#5b4040]/10">
                  {section.rows.map(([label, val]) => (
                    <div key={label} className="flex justify-between items-center px-4 py-3">
                      <span className="text-xs text-[#e3bebd]/40">{label}</span>
                      <span className="text-xs text-[#dde2f3] font-medium">{val || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          {app.status === 'pending' && (
            <div className="flex gap-3 p-8 pt-0">
              <button
                onClick={() => { onStatusChange(app.id, 'approved'); onClose() }}
                className="flex-1 py-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-sm rounded-xl hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">check_circle</span>
                Approve Application
              </button>
              <button
                onClick={() => { onStatusChange(app.id, 'rejected'); onClose() }}
                className="flex-1 py-3.5 bg-red-500/10 border border-red-500/30 text-red-400 font-black text-sm rounded-xl hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">cancel</span>
                Reject Application
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Sidebar Nav ──────────────────────────────────────────────────────────────
const TABS = [
  { id: 'overview',      label: 'Overview',      icon: 'grid_view' },
  { id: 'applications',  label: 'Applications',  icon: 'domain_add' },
  { id: 'donors',        label: 'Donors',        icon: 'group' },
  { id: 'requests',      label: 'Blood Requests',icon: 'emergency' },
]

function Sidebar({ tab, setTab, pendingCount, activeReqs, user, setSidebarOpen }) {
  return (
    <aside className="flex flex-col w-64 bg-[#0d131f] border-r border-[#5b4040]/20 h-full py-8 shrink-0">
      {/* Logo */}
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-9 h-9 bg-pulse-gradient rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,82,96,0.3)]">
          <span className="material-symbols-outlined text-[#5b0011] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </div>
        <div>
          <p className="text-base font-black text-white italic leading-none">Nabad</p>
          <p className="text-[9px] font-black text-[#ff5260] uppercase tracking-[0.2em] mt-0.5">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setSidebarOpen(false) }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
              tab === t.id
                ? 'bg-[#ff5260]/10 text-[#ff5260] shadow-[inset_0_0_0_1px_rgba(255,82,96,0.2)]'
                : 'text-[#e3bebd]/40 hover:text-[#dde2f3] hover:bg-[#5b4040]/10'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{t.icon}</span>
            {t.label}
            {t.id === 'applications' && pendingCount > 0 && (
              <span className="ml-auto bg-amber-400 text-[#080e1a] text-[9px] font-black px-1.5 py-0.5 rounded-full">{pendingCount}</span>
            )}
            {t.id === 'requests' && activeReqs > 0 && (
              <span className="ml-auto flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5260] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5260]" />
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-4 pt-6 border-t border-[#5b4040]/20 space-y-3">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#e3bebd]/30 hover:text-[#dde2f3] hover:bg-[#5b4040]/10 transition-all text-sm font-bold">
          <span className="material-symbols-outlined text-xl">home</span>
          Back to Site
        </Link>
        <div className="flex items-center gap-3 px-4 py-3">
          <UserButton afterSignOutUrl="/" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">{user?.firstName} {user?.lastName}</p>
            <p className="text-[9px] text-[#e3bebd]/30 uppercase tracking-widest">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminPanel() {
  const { user, isLoaded } = useUser()
  const [tab, setTab] = useState('overview')
  const [applications, setApplications] = useState(MOCK_APPLICATIONS)
  const [selectedApp, setSelectedApp] = useState(null)
  const [appFilter, setAppFilter] = useState('all')
  const [donorFilter, setDonorFilter] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isLoaded) return (
    <div className="min-h-screen bg-[#080e1a] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#ff5260]/20 border-t-[#ff5260] rounded-full animate-spin" />
    </div>
  )

  const handleStatusChange = (id, newStatus) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a))
  }

  const pendingCount  = applications.filter(a => a.status === 'pending').length
  const approvedCount = applications.filter(a => a.status === 'approved').length
  const activeDonors  = MOCK_DONORS.filter(d => d.status === 'active').length
  const activeReqs    = MOCK_REQUESTS.filter(r => r.status === 'active').length

  const filteredApps = appFilter === 'all' ? applications : applications.filter(a => a.status === appFilter)
  const filteredDonors = donorFilter === 'all' ? MOCK_DONORS : MOCK_DONORS.filter(d => d.status === donorFilter)


  return (
    <div className="flex h-screen bg-[#080e1a] text-[#dde2f3] overflow-hidden font-body">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar tab={tab} setTab={setTab} pendingCount={pendingCount} activeReqs={activeReqs} user={user} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/60 z-40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} />
            <motion.div className="fixed left-0 top-0 bottom-0 z-50 lg:hidden" initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}>
              <Sidebar tab={tab} setTab={setTab} pendingCount={pendingCount} activeReqs={activeReqs} user={user} setSidebarOpen={setSidebarOpen} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-[#0d131f]/80 backdrop-blur-xl border-b border-[#5b4040]/20 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 rounded-xl border border-[#5b4040]/30 flex items-center justify-center text-[#e3bebd]/60">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div>
              <h1 className="text-base font-black text-white capitalize">{TABS.find(t => t.id === tab)?.label}</h1>
              <p className="text-[10px] text-[#e3bebd]/30 uppercase tracking-widest hidden sm:block">Nabad Administration</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {pendingCount > 0 && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-amber-400/10 border border-amber-400/20 rounded-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">{pendingCount} pending review</span>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

              {/* ── OVERVIEW ── */}
              {tab === 'overview' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon="domain_add"  label="Pending Applications" value={pendingCount}  sub="Awaiting review"       color="#f59e0b" />
                    <StatCard icon="verified"    label="Approved Hospitals"   value={approvedCount} sub="Active on network"     color="#10b981" />
                    <StatCard icon="group"       label="Active Donors"        value={activeDonors}  sub="Ready to donate"       color="#ff5260" />
                    <StatCard icon="emergency"   label="Live Blood Requests"  value={activeReqs}    sub="Needs immediate match" color="#00daf3" />
                  </div>

                  {/* Recent Applications */}
                  <div className="bg-[#0d131f] border border-[#5b4040]/20 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#5b4040]/15">
                      <p className="text-sm font-black text-white">Recent Applications</p>
                      <button onClick={() => setTab('applications')} className="text-[10px] font-black text-[#ff5260] uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="divide-y divide-[#5b4040]/10">
                      {applications.slice(0, 4).map(app => (
                        <div key={app.id} className="flex items-center justify-between px-6 py-4 hover:bg-[#5b4040]/5 transition-colors cursor-pointer" onClick={() => setSelectedApp(app)}>
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-[#ff5260]/10 border border-[#ff5260]/20 flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-[#ff5260] text-lg">local_hospital</span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-white truncate">{app.nameEn}</p>
                              <p className="text-[10px] text-[#e3bebd]/40">{app.city} · {timeAgo(app.createdAt)}</p>
                            </div>
                          </div>
                          <StatusBadge status={app.status} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Blood Requests */}
                  <div className="bg-[#0d131f] border border-[#5b4040]/20 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#5b4040]/15">
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-black text-white">Live Blood Requests</p>
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5260] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5260]" />
                        </span>
                      </div>
                      <button onClick={() => setTab('requests')} className="text-[10px] font-black text-[#ff5260] uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="divide-y divide-[#5b4040]/10">
                      {MOCK_REQUESTS.map(req => (
                        <div key={req.id} className="flex items-center justify-between px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#ff5260]/10 border border-[#ff5260]/20 flex items-center justify-center font-black text-[#ff5260] text-base">{req.bloodType}</div>
                            <div>
                              <p className="text-sm font-bold text-white">{req.hospital}</p>
                              <p className="text-[10px] text-[#e3bebd]/40">{req.units} units · {timeAgo(req.postedAt)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg border ${req.urgency === 'Critical' ? 'text-[#ff5260] border-[#ff5260]/30 bg-[#ff5260]/10' : req.urgency === 'High' ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' : 'text-[#e3bebd]/40 border-[#5b4040]/30'}`}>{req.urgency}</span>
                            <StatusBadge status={req.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── APPLICATIONS ── */}
              {tab === 'applications' && (
                <div className="space-y-6">
                  {/* Filter bar */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {['all', 'pending', 'approved', 'rejected'].map(f => (
                      <button
                        key={f}
                        onClick={() => setAppFilter(f)}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                          appFilter === f
                            ? 'bg-[#ff5260] text-[#5b0011]'
                            : 'bg-[#0d131f] border border-[#5b4040]/20 text-[#e3bebd]/40 hover:text-white'
                        }`}
                      >
                        {f === 'all' ? `All (${applications.length})` : `${f} (${applications.filter(a => a.status === f).length})`}
                      </button>
                    ))}
                  </div>

                  {/* Table */}
                  <div className="bg-[#0d131f] border border-[#5b4040]/20 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#5b4040]/15">
                            <th className="text-left px-6 py-4 text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-widest">Hospital</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-widest hidden md:table-cell">Location</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-widest hidden lg:table-cell">Representative</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-widest hidden sm:table-cell">Submitted</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4" />
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#5b4040]/10">
                          {filteredApps.map(app => (
                            <tr key={app.id} className="hover:bg-[#5b4040]/5 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-xl bg-[#ff5260]/10 border border-[#ff5260]/15 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[#ff5260] text-lg">local_hospital</span>
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-white">{app.nameEn}</p>
                                    <p className="text-[10px] text-[#e3bebd]/30">{app.ref}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 hidden md:table-cell">
                                <p className="text-sm text-[#dde2f3]">{app.city}</p>
                                <p className="text-[10px] text-[#e3bebd]/30">{app.governorate}</p>
                              </td>
                              <td className="px-6 py-4 hidden lg:table-cell">
                                <p className="text-sm text-[#dde2f3]">{app.repName}</p>
                                <p className="text-[10px] text-[#e3bebd]/30">{app.repPhone}</p>
                              </td>
                              <td className="px-6 py-4 hidden sm:table-cell">
                                <p className="text-xs text-[#e3bebd]/50">{timeAgo(app.createdAt)}</p>
                              </td>
                              <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2 justify-end">
                                  {app.status === 'pending' && (
                                    <>
                                      <button onClick={() => handleStatusChange(app.id, 'approved')} className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center justify-center" title="Approve">
                                        <span className="material-symbols-outlined text-base">check</span>
                                      </button>
                                      <button onClick={() => handleStatusChange(app.id, 'rejected')} className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all flex items-center justify-center" title="Reject">
                                        <span className="material-symbols-outlined text-base">close</span>
                                      </button>
                                    </>
                                  )}
                                  <button onClick={() => setSelectedApp(app)} className="w-8 h-8 rounded-lg bg-[#080e1a] border border-[#5b4040]/30 text-[#e3bebd]/40 hover:text-white hover:border-[#5b4040]/60 transition-all flex items-center justify-center" title="View details">
                                    <span className="material-symbols-outlined text-base">open_in_new</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {filteredApps.length === 0 && (
                      <div className="py-16 text-center">
                        <span className="material-symbols-outlined text-4xl text-[#e3bebd]/10 block mb-3">inbox</span>
                        <p className="text-sm text-[#e3bebd]/30">No {appFilter} applications</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── DONORS ── */}
              {tab === 'donors' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    {['all', 'active', 'inactive'].map(f => (
                      <button key={f} onClick={() => setDonorFilter(f)}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${donorFilter === f ? 'bg-[#ff5260] text-[#5b0011]' : 'bg-[#0d131f] border border-[#5b4040]/20 text-[#e3bebd]/40 hover:text-white'}`}>
                        {f === 'all' ? `All (${MOCK_DONORS.length})` : `${f} (${MOCK_DONORS.filter(d => d.status === f).length})`}
                      </button>
                    ))}
                  </div>

                  <div className="bg-[#0d131f] border border-[#5b4040]/20 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#5b4040]/15">
                            <th className="text-left px-6 py-4 text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-widest">Donor</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-widest hidden sm:table-cell">Blood Type</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-widest hidden md:table-cell">City</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-widest hidden lg:table-cell">Donations</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-widest hidden lg:table-cell">Last Donation</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-[#e3bebd]/30 uppercase tracking-widest">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#5b4040]/10">
                          {filteredDonors.map(donor => (
                            <tr key={donor.id} className="hover:bg-[#5b4040]/5 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-[#ff5260]/10 border border-[#ff5260]/15 flex items-center justify-center shrink-0">
                                    <span className="text-xs font-black text-[#ff5260]">{donor.name.split(' ').map(n => n[0]).join('')}</span>
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-white">{donor.name}</p>
                                    <p className="text-[10px] text-[#e3bebd]/30">{donor.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 hidden sm:table-cell">
                                <span className="px-2.5 py-1 bg-[#ff5260]/10 border border-[#ff5260]/20 rounded-lg text-xs font-black text-[#ff5260]">{donor.bloodType}</span>
                              </td>
                              <td className="px-6 py-4 hidden md:table-cell"><p className="text-sm text-[#dde2f3]">{donor.city}</p></td>
                              <td className="px-6 py-4 hidden lg:table-cell">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-black text-white">{donor.donations}</span>
                                  <div className="flex gap-0.5">
                                    {Array.from({ length: Math.min(donor.donations, 5) }).map((_, i) => (
                                      <div key={i} className="w-1.5 h-3 bg-[#ff5260]/60 rounded-sm" />
                                    ))}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 hidden lg:table-cell"><p className="text-xs text-[#e3bebd]/50">{donor.lastDonation}</p></td>
                              <td className="px-6 py-4"><StatusBadge status={donor.status} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ── BLOOD REQUESTS ── */}
              {tab === 'requests' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {MOCK_REQUESTS.map(req => (
                      <div key={req.id} className={`bg-[#0d131f] border rounded-2xl p-6 ${req.status === 'active' ? 'border-[#ff5260]/30' : 'border-[#5b4040]/20'}`}>
                        <div className="flex items-start justify-between mb-5">
                          <div className="w-14 h-14 rounded-2xl bg-[#ff5260]/10 border border-[#ff5260]/20 flex items-center justify-center font-black text-[#ff5260] text-xl">{req.bloodType}</div>
                          <div className="text-right">
                            <StatusBadge status={req.status} />
                            <p className="text-[10px] text-[#e3bebd]/30 mt-2">{timeAgo(req.postedAt)}</p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-white mb-1">{req.hospital}</p>
                        <p className="text-xs text-[#e3bebd]/40 mb-4">{req.units} units needed</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg border ${req.urgency === 'Critical' ? 'text-[#ff5260] border-[#ff5260]/30 bg-[#ff5260]/10' : req.urgency === 'High' ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' : 'text-[#e3bebd]/40 border-[#5b4040]/30'}`}>{req.urgency}</span>
                          <div className="flex items-center gap-1.5 text-[10px] text-[#e3bebd]/40">
                            <span className="material-symbols-outlined text-sm text-[#00daf3]">group</span>
                            <span className="font-bold text-[#00daf3]">{req.matchedDonors}</span> matched
                          </div>
                        </div>
                        {req.status === 'active' && (
                          <div className="mt-4 pt-4 border-t border-[#5b4040]/15">
                            <div className="w-full h-1.5 bg-[#080e1a] rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(req.matchedDonors / req.units) * 100}%` }}
                                transition={{ duration: 1 }}
                                className="h-full bg-gradient-to-r from-[#ffb3b3] to-[#ff5260] rounded-full"
                              />
                            </div>
                            <p className="text-[9px] text-[#e3bebd]/30 mt-1.5">{req.matchedDonors}/{req.units} donors matched</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <AppModal app={selectedApp} onClose={() => setSelectedApp(null)} onStatusChange={handleStatusChange} />
      )}
    </div>
  )
}
