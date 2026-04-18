'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEP_LABELS = [
  'Hospital Identity',
  'Location & Contact',
  'Medical Capabilities',
  'Authorized Rep.',
  'Review & Submit',
]

const GOVERNORATES = [
  'Beirut', 'Mount Lebanon', 'North Lebanon',
  'South Lebanon', 'Bekaa', 'Nabatieh', 'Akkar', 'Baalbek-Hermel',
]
const HOSPITAL_TYPES = [
  'Government / Public', 'Private', 'NGO / Non-profit',
  'Military', 'University / Teaching',
]
const REP_ROLES = [
  'Hospital Director', 'Medical Director', 'Blood Bank Manager',
  'Head of Emergency', 'Chief Nursing Officer', 'Administrative Director', 'Other',
]
const BLOOD_TYPES = ['A+', 'A−', 'B+', 'B−', 'O+', 'O−', 'AB+', 'AB−']

const INITIAL = {
  nameAr: '', nameEn: '', hospitalType: '', mophReg: '',
  yearEst: '', bedCount: '', description: '',
  governorate: '', city: '', address: '', gpsLat: '', gpsLng: '',
  phoneMain: '', phoneEmergency: '', email: '', website: '',
  hasBloodBank: 'yes', erStatus: '24-7',
  bloodTypes: ['A+', 'A−', 'B+', 'B−', 'O+', 'O−', 'AB+', 'AB−'],
  monthlyUnits: '', icuBeds: '', bloodNotes: '',
  repName: '', repRole: '', repNationalId: '', repPhone: '',
  repEmail: '', repWhatsapp: '',
  authConfirm: false, dataConfirm: false, termsAgree: false,
}

function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
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

const selectCls = `w-full bg-[#080e1a] border border-[#5b4040]/30 rounded-lg px-3 py-2.5
  text-sm text-[#dde2f3] focus:outline-none focus:border-[#ff5260]/50 focus:ring-2
  focus:ring-[#ff5260]/10 transition-all duration-200 appearance-none cursor-pointer`

function ReviewRow({ label, value }) {
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-[#5b4040]/15 last:border-0 gap-4">
      <span className="text-xs text-[#e3bebd]/50 shrink-0">{label}</span>
      <span className="text-xs text-[#dde2f3] text-right">{value || '—'}</span>
    </div>
  )
}

function ReviewCard({ title, children }) {
  return (
    <div className="bg-[#080e1a] rounded-xl border border-[#5b4040]/15 p-4 mb-4">
      <p className="text-xs font-bold text-[#e3bebd]/40 uppercase tracking-widest mb-3">{title}</p>
      {children}
    </div>
  )
}

export default function HospitalRegistrationPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [refNumber, setRefNumber] = useState('')
  const [error, setError] = useState('')

  const set = (field, value) => setData((d) => ({ ...d, [field]: value }))

  const toggleBloodType = (type) => {
    setData((d) => ({
      ...d,
      bloodTypes: d.bloodTypes.includes(type)
        ? d.bloodTypes.filter((t) => t !== type)
        : [...d.bloodTypes, type],
    }))
  }

  const handleSubmit = async () => {
    if (!data.termsAgree) {
      setError('Please agree to the terms before submitting.')
      return
    }
    setError('')
    setSubmitting(true)
    const ref = 'NBD-' + Date.now().toString(36).toUpperCase().slice(-8)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hospital-applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, refNumber: ref }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setRefNumber(ref)
      setStep(5)
    } catch {
      setError('Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const slideVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  }

  return (
    <div className="min-h-screen bg-[#080e1a] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ff5260]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#00daf3]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="/sign-up" className="flex items-center gap-2 text-[#e3bebd]/50 hover:text-[#ffb3b3] transition-colors text-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
            Back
          </a>
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-[#ff5260]/50"
                animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
              <span className="material-symbols-outlined text-[#ff5260] relative z-10" style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px' }}>
                favorite
              </span>
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-[#ffb3b3] to-[#ff5260] bg-clip-text text-transparent">
              Nabad
            </span>
          </div>
          <div className="w-20" />
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-[#0d131f] rounded-2xl border border-[#5b4040]/20 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {step < 5 && (
            <div className="px-8 pt-8 pb-6 border-b border-[#5b4040]/15">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-6 h-6 rounded-full bg-[#ff5260]/10 border border-[#ff5260]/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#ff5260]" style={{ fontVariationSettings: "'FILL' 1", fontSize: '14px' }}>
                    local_hospital
                  </span>
                </div>
                <span className="text-xs font-bold text-[#ff5260] uppercase tracking-widest">
                  Nabad — Hospital Registration
                </span>
              </div>
              <h1 className="text-xl font-black text-[#dde2f3] mt-2">Hospital Registration Request</h1>
              <p className="text-xs text-[#e3bebd]/50 mt-1">
                Complete all sections. Your application will be reviewed before access is granted.
              </p>

              {/* Progress bar */}
              <div className="mt-5">
                <p className="text-xs text-[#e3bebd]/40 mb-2">
                  Step {step + 1} of 5 — {STEP_LABELS[step]}
                </p>
                <div className="flex gap-1">
                  {STEP_LABELS.map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                        i < step
                          ? 'bg-[#ff5260]/50'
                          : i === step
                          ? 'bg-[#ff5260]'
                          : 'bg-[#5b4040]/25'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step panels */}
          <div className="px-8 py-7 min-h-[420px]">
            <AnimatePresence mode="wait">
              {/* Step 1 — Hospital Identity */}
              {step === 0 && (
                <motion.div key="s0" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <p className="text-sm font-bold text-[#dde2f3] mb-5 pb-3 border-b border-[#5b4040]/15">
                    Hospital identity
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Official hospital name (Arabic)">
                        <input className={inputCls} placeholder="اسم المستشفى بالعربية" value={data.nameAr} onChange={(e) => set('nameAr', e.target.value)} />
                      </Field>
                      <Field label="Official hospital name (English)">
                        <input className={inputCls} placeholder="e.g. Makassed General Hospital" value={data.nameEn} onChange={(e) => set('nameEn', e.target.value)} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Hospital type">
                        <div className="relative">
                          <select className={selectCls} value={data.hospitalType} onChange={(e) => set('hospitalType', e.target.value)}>
                            <option value="">Select type</option>
                            {HOSPITAL_TYPES.map((t) => <option key={t}>{t}</option>)}
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#e3bebd]/40 pointer-events-none" style={{ fontSize: '16px' }}>expand_more</span>
                        </div>
                      </Field>
                      <Field label="Ministry of Public Health registration no." hint="Issued by the Lebanese Ministry of Public Health">
                        <input className={inputCls} placeholder="e.g. MOPH-2024-XXXX" value={data.mophReg} onChange={(e) => set('mophReg', e.target.value)} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Year established">
                        <input className={inputCls} type="number" placeholder="e.g. 1985" min="1900" max="2025" value={data.yearEst} onChange={(e) => set('yearEst', e.target.value)} />
                      </Field>
                      <Field label="Number of licensed beds">
                        <input className={inputCls} type="number" placeholder="e.g. 200" min="1" value={data.bedCount} onChange={(e) => set('bedCount', e.target.value)} />
                      </Field>
                    </div>
                    <Field label="Brief description of services offered">
                      <textarea className={`${inputCls} resize-none h-20`} placeholder="e.g. Full-service emergency, surgery, maternity, ICU..." value={data.description} onChange={(e) => set('description', e.target.value)} />
                    </Field>
                  </div>
                </motion.div>
              )}

              {/* Step 2 — Location & Contact */}
              {step === 1 && (
                <motion.div key="s1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <p className="text-sm font-bold text-[#dde2f3] mb-5 pb-3 border-b border-[#5b4040]/15">
                    Location & contact
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Governorate (Mohafaza)">
                        <div className="relative">
                          <select className={selectCls} value={data.governorate} onChange={(e) => set('governorate', e.target.value)}>
                            <option value="">Select governorate</option>
                            {GOVERNORATES.map((g) => <option key={g}>{g}</option>)}
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#e3bebd]/40 pointer-events-none" style={{ fontSize: '16px' }}>expand_more</span>
                        </div>
                      </Field>
                      <Field label="City / District">
                        <input className={inputCls} placeholder="e.g. Saida" value={data.city} onChange={(e) => set('city', e.target.value)} />
                      </Field>
                    </div>
                    <Field label="Full street address">
                      <input className={inputCls} placeholder="Building, street, area" value={data.address} onChange={(e) => set('address', e.target.value)} />
                    </Field>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="GPS latitude" hint="Open Google Maps, long-press your location">
                        <input className={inputCls} placeholder="e.g. 33.5570" value={data.gpsLat} onChange={(e) => set('gpsLat', e.target.value)} />
                      </Field>
                      <Field label="GPS longitude">
                        <input className={inputCls} placeholder="e.g. 35.3714" value={data.gpsLng} onChange={(e) => set('gpsLng', e.target.value)} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Main hospital phone">
                        <input className={inputCls} type="tel" placeholder="+961 X XXX XXX" value={data.phoneMain} onChange={(e) => set('phoneMain', e.target.value)} />
                      </Field>
                      <Field label="Emergency / blood bank direct line">
                        <input className={inputCls} type="tel" placeholder="+961 X XXX XXX" value={data.phoneEmergency} onChange={(e) => set('phoneEmergency', e.target.value)} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Official email address">
                        <input className={inputCls} type="email" placeholder="bloodbank@hospital.lb" value={data.email} onChange={(e) => set('email', e.target.value)} />
                      </Field>
                      <Field label="Website (optional)">
                        <input className={inputCls} type="url" placeholder="https://hospital.lb" value={data.website} onChange={(e) => set('website', e.target.value)} />
                      </Field>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3 — Medical Capabilities */}
              {step === 2 && (
                <motion.div key="s2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <p className="text-sm font-bold text-[#dde2f3] mb-5 pb-3 border-b border-[#5b4040]/15">
                    Medical capabilities
                  </p>

                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-medium text-[#e3bebd]/70 mb-3">Does the hospital have an on-site blood bank?</p>
                      <div className="grid grid-cols-2 gap-3">
                        {[{ val: 'yes', label: 'Yes, on-site' }, { val: 'no', label: 'No — coordinate externally' }].map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => set('hasBloodBank', opt.val)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm transition-all duration-200 ${
                              data.hasBloodBank === opt.val
                                ? 'bg-[#ff5260]/10 border-[#ff5260]/40 text-[#ffb3b3]'
                                : 'bg-[#080e1a] border-[#5b4040]/25 text-[#e3bebd]/60 hover:border-[#5b4040]/50'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              data.hasBloodBank === opt.val ? 'border-[#ff5260]' : 'border-[#5b4040]/40'
                            }`}>
                              {data.hasBloodBank === opt.val && <div className="w-2 h-2 rounded-full bg-[#ff5260]" />}
                            </div>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-[#e3bebd]/70 mb-3">Emergency department status</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[{ val: '24-7', label: '24 / 7 open' }, { val: 'limited', label: 'Limited hours' }, { val: 'none', label: 'No ER' }].map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => set('erStatus', opt.val)}
                            className={`flex items-center gap-2 p-3 rounded-xl border text-xs transition-all duration-200 ${
                              data.erStatus === opt.val
                                ? 'bg-[#ff5260]/10 border-[#ff5260]/40 text-[#ffb3b3]'
                                : 'bg-[#080e1a] border-[#5b4040]/25 text-[#e3bebd]/60 hover:border-[#5b4040]/50'
                            }`}
                          >
                            <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              data.erStatus === opt.val ? 'border-[#ff5260]' : 'border-[#5b4040]/40'
                            }`}>
                              {data.erStatus === opt.val && <div className="w-1.5 h-1.5 rounded-full bg-[#ff5260]" />}
                            </div>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-[#e3bebd]/70 mb-3">Blood types your hospital typically requests</p>
                      <div className="flex flex-wrap gap-2">
                        {BLOOD_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleBloodType(type)}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                              data.bloodTypes.includes(type)
                                ? 'bg-[#ff5260]/20 border-[#ff5260]/50 text-[#ffb3b3]'
                                : 'bg-transparent border-[#5b4040]/30 text-[#e3bebd]/50 hover:border-[#5b4040]/60'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Avg. monthly blood unit needs (approx.)">
                        <input className={inputCls} type="number" placeholder="e.g. 150" min="1" value={data.monthlyUnits} onChange={(e) => set('monthlyUnits', e.target.value)} />
                      </Field>
                      <Field label="ICU beds (if applicable)">
                        <input className={inputCls} type="number" placeholder="e.g. 20" min="0" value={data.icuBeds} onChange={(e) => set('icuBeds', e.target.value)} />
                      </Field>
                    </div>
                    <Field label="Additional notes about blood / transfusion needs (optional)">
                      <textarea className={`${inputCls} resize-none h-20`} placeholder="e.g. We frequently need O− for trauma surgery..." value={data.bloodNotes} onChange={(e) => set('bloodNotes', e.target.value)} />
                    </Field>
                  </div>
                </motion.div>
              )}

              {/* Step 4 — Authorized Representative */}
              {step === 3 && (
                <motion.div key="s3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <p className="text-sm font-bold text-[#dde2f3] mb-5 pb-3 border-b border-[#5b4040]/15">
                    Authorized representative
                  </p>
                  <div className="bg-[#080e1a] rounded-xl border border-[#5b4040]/15 p-4 mb-5 text-xs text-[#e3bebd]/50 leading-relaxed">
                    The person signing this application must be authorized to act on behalf of the hospital.
                    They will be the primary contact during the review process.
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Full name">
                        <input className={inputCls} placeholder="First and last name" value={data.repName} onChange={(e) => set('repName', e.target.value)} />
                      </Field>
                      <Field label="Job title / role">
                        <div className="relative">
                          <select className={selectCls} value={data.repRole} onChange={(e) => set('repRole', e.target.value)}>
                            <option value="">Select role</option>
                            {REP_ROLES.map((r) => <option key={r}>{r}</option>)}
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#e3bebd]/40 pointer-events-none" style={{ fontSize: '16px' }}>expand_more</span>
                        </div>
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Lebanese national ID number">
                        <input className={inputCls} placeholder="e.g. 123456789" value={data.repNationalId} onChange={(e) => set('repNationalId', e.target.value)} />
                      </Field>
                      <Field label="Direct mobile number">
                        <input className={inputCls} type="tel" placeholder="+961 X XXX XXX" value={data.repPhone} onChange={(e) => set('repPhone', e.target.value)} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Work email">
                        <input className={inputCls} type="email" placeholder="name@hospital.lb" value={data.repEmail} onChange={(e) => set('repEmail', e.target.value)} />
                      </Field>
                      <Field label="WhatsApp number (for urgent coordination)">
                        <input className={inputCls} type="tel" placeholder="+961 X XXX XXX" value={data.repWhatsapp} onChange={(e) => set('repWhatsapp', e.target.value)} />
                      </Field>
                    </div>

                    <div className="space-y-3 mt-1">
                      {[
                        { field: 'authConfirm', label: 'I confirm that I am duly authorized to submit this registration on behalf of the hospital listed above.' },
                        { field: 'dataConfirm', label: 'I confirm that all information provided in this application is accurate and complete.' },
                      ].map(({ field, label }) => (
                        <label key={field} className="flex items-start gap-3 cursor-pointer group">
                          <div
                            onClick={() => set(field, !data[field])}
                            className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all duration-150 ${
                              data[field]
                                ? 'bg-[#ff5260] border-[#ff5260]'
                                : 'bg-transparent border-[#5b4040]/40 group-hover:border-[#ff5260]/50'
                            }`}
                          >
                            {data[field] && (
                              <span className="material-symbols-outlined text-white" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>check</span>
                            )}
                          </div>
                          <span className="text-xs text-[#e3bebd]/60 leading-relaxed" onClick={() => set(field, !data[field])}>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5 — Review & Submit */}
              {step === 4 && (
                <motion.div key="s4" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <p className="text-sm font-bold text-[#dde2f3] mb-2 pb-3 border-b border-[#5b4040]/15">
                    Review & submit
                  </p>
                  <div className="bg-[#080e1a] rounded-xl border border-[#5b4040]/15 p-4 mb-5 text-xs text-[#e3bebd]/50 leading-relaxed">
                    Review your application below. After submission, the Nabad team will contact your
                    authorized representative within <strong className="text-[#ffb3b3]">2–5 business days</strong>.
                  </div>

                  <ReviewCard title="Hospital identity">
                    <ReviewRow label="Name (English)" value={data.nameEn} />
                    <ReviewRow label="Name (Arabic)" value={data.nameAr} />
                    <ReviewRow label="Type" value={data.hospitalType} />
                    <ReviewRow label="MOPH registration" value={data.mophReg} />
                    <ReviewRow label="Year established" value={data.yearEst} />
                    <ReviewRow label="Licensed beds" value={data.bedCount} />
                  </ReviewCard>

                  <ReviewCard title="Location & contact">
                    <ReviewRow label="Governorate" value={data.governorate} />
                    <ReviewRow label="City" value={data.city} />
                    <ReviewRow label="Address" value={data.address} />
                    <ReviewRow label="GPS" value={data.gpsLat && data.gpsLng ? `${data.gpsLat}, ${data.gpsLng}` : ''} />
                    <ReviewRow label="Main phone" value={data.phoneMain} />
                    <ReviewRow label="Email" value={data.email} />
                  </ReviewCard>

                  <ReviewCard title="Authorized representative">
                    <ReviewRow label="Full name" value={data.repName} />
                    <ReviewRow label="Role" value={data.repRole} />
                    <ReviewRow label="Mobile" value={data.repPhone} />
                    <ReviewRow label="Work email" value={data.repEmail} />
                  </ReviewCard>

                  <label className="flex items-start gap-3 cursor-pointer group mt-4">
                    <div
                      onClick={() => set('termsAgree', !data.termsAgree)}
                      className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all duration-150 ${
                        data.termsAgree
                          ? 'bg-[#ff5260] border-[#ff5260]'
                          : 'bg-transparent border-[#5b4040]/40 group-hover:border-[#ff5260]/50'
                      }`}
                    >
                      {data.termsAgree && (
                        <span className="material-symbols-outlined text-white" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>check</span>
                      )}
                    </div>
                    <span className="text-xs text-[#e3bebd]/60 leading-relaxed" onClick={() => set('termsAgree', !data.termsAgree)}>
                      I agree that Nabad may contact the hospital to verify this application,
                      and understand that approval is at Nabad&apos;s sole discretion.
                    </span>
                  </label>

                  {error && (
                    <p className="text-xs text-[#fc8181] mt-3 flex items-center gap-1.5">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>error</span>
                      {error}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Success */}
              {step === 5 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-[#ff5260]/10 border border-[#ff5260]/25 flex items-center justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <motion.span
                      className="material-symbols-outlined text-[#ff5260] text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45 }}
                    >
                      check_circle
                    </motion.span>
                  </motion.div>

                  <motion.h2
                    className="text-2xl font-black text-[#dde2f3] mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    Application Submitted
                  </motion.h2>

                  <motion.p
                    className="text-sm text-[#e3bebd]/60 leading-relaxed max-w-sm mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    Thank you. Your hospital registration request has been received. The Nabad team will
                    review your application and contact your authorized representative within
                    <strong className="text-[#ffb3b3]"> 2–5 business days</strong>.
                  </motion.p>

                  <motion.div
                    className="px-5 py-2.5 bg-[#080e1a] rounded-full border border-[#5b4040]/20 font-mono text-sm text-[#e3bebd]/60 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                  >
                    Reference: <span className="text-[#ffb3b3] font-bold">{refNumber}</span>
                  </motion.div>

                  <motion.a
                    href="/"
                    className="flex items-center gap-2 px-6 py-3 bg-pulse-gradient rounded-xl font-bold text-[#5b0011] text-sm glow-crimson"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>home</span>
                    Back to Home
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer actions */}
          {step < 5 && (
            <div className="px-8 py-5 border-t border-[#5b4040]/15 flex items-center justify-between">
              <motion.button
                onClick={() => step > 0 && setStep((s) => s - 1)}
                disabled={step === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  step === 0
                    ? 'opacity-30 cursor-not-allowed border-[#5b4040]/20 text-[#e3bebd]/40'
                    : 'border-[#5b4040]/30 text-[#e3bebd]/70 hover:border-[#5b4040]/60 hover:text-[#dde2f3]'
                }`}
                whileHover={step > 0 ? { scale: 1.02 } : {}}
                whileTap={step > 0 ? { scale: 0.97 } : {}}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
                Back
              </motion.button>

              {step < 4 ? (
                <motion.button
                  onClick={() => setStep((s) => s + 1)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-pulse-gradient rounded-xl text-sm font-bold text-[#5b0011] glow-crimson"
                  whileHover={{ scale: 1.04, boxShadow: '0 0 22px rgba(255,82,96,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  Continue
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-pulse-gradient rounded-xl text-sm font-bold text-[#5b0011] glow-crimson disabled:opacity-50"
                  whileHover={!submitting ? { scale: 1.04, boxShadow: '0 0 22px rgba(255,82,96,0.4)' } : {}}
                  whileTap={!submitting ? { scale: 0.97 } : {}}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {submitting ? (
                    <>
                      <motion.span
                        className="material-symbols-outlined"
                        style={{ fontSize: '16px' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        progress_activity
                      </motion.span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit application
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>send</span>
                    </>
                  )}
                </motion.button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
