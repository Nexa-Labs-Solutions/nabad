'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import NabadLogo from '@/components/NabadLogo'

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
  const { lang, t } = useLanguage()
  const sh = t.hospitalSignUp
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(0)
  const [data, setData] = useState(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [refNumber, setRefNumber] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const set = (field, value) => setData((d) => ({ ...d, [field]: value }))

  if (!mounted) {
    return <div className="min-h-screen bg-[#080e1a]" /> // Skeleton or empty state to prevent mismatch
  }


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
      setError(sh.review.errorTerms)
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
      setError(sh.review.errorSubmit)
    } finally {
      setSubmitting(false)
    }
  }

  const slideVariants = {
    enter: { opacity: 0, x: lang === 'ar' ? -30 : 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: lang === 'ar' ? 30 : -30 },
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
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              {lang === 'ar' ? 'arrow_forward' : 'arrow_back'}
            </span>
            {sh.actions.back}
          </a>
          <div className="flex items-center gap-3">
             <NabadLogo size="md" href={null} />
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
                  Nabad — {sh.steps[step]}
                </span>
              </div>
              <h1 className="text-xl font-black text-[#dde2f3] mt-2">{sh.title}</h1>
              <p className="text-xs text-[#e3bebd]/50 mt-1">{sh.subtitle}</p>

              {/* Progress bar */}
              <div className="mt-5">
                <p className="text-xs text-[#e3bebd]/40 mb-2">
                  {sh.stepLabel} {step + 1} {sh.of} 5 — {sh.steps[step]}
                </p>
                <div className="flex gap-1">
                  {sh.steps.map((_, i) => (
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
                  <p className="text-sm font-bold text-[#dde2f3] mb-5 pb-3 border-b border-[#5b4040]/15 uppercase tracking-wide">
                    {sh.identity.title}
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label={sh.identity.nameAr}>
                        <input className={inputCls} placeholder={sh.identity.placeholderNameAr} value={data.nameAr} onChange={(e) => set('nameAr', e.target.value)} />
                      </Field>
                      <Field label={sh.identity.nameEn}>
                        <input className={inputCls} placeholder={sh.identity.placeholderNameEn} value={data.nameEn} onChange={(e) => set('nameEn', e.target.value)} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label={sh.identity.type}>
                        <div className="relative">
                          <select className={selectCls} value={data.hospitalType} onChange={(e) => set('hospitalType', e.target.value)}>
                            <option value="">{sh.identity.selectType}</option>
                            {Object.entries(sh.identity.types).map(([key, label]) => (
                               <option key={key} value={label}>{label}</option>
                            ))}
                          </select>
                          <span className={`${lang === 'ar' ? 'left-3' : 'right-3'} material-symbols-outlined absolute top-1/2 -translate-y-1/2 text-[#e3bebd]/40 pointer-events-none`} style={{ fontSize: '16px' }}>expand_more</span>
                        </div>
                      </Field>
                      <Field label={sh.identity.moph} hint={sh.identity.mophHint}>
                        <input className={inputCls} placeholder={sh.identity.placeholderMoph} value={data.mophReg} onChange={(e) => set('mophReg', e.target.value)} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label={sh.identity.year}>
                        <input className={inputCls} type="number" placeholder={sh.identity.placeholderYear} min="1900" max="2025" value={data.yearEst} onChange={(e) => set('yearEst', e.target.value)} />
                      </Field>
                      <Field label={sh.identity.beds}>
                        <input className={inputCls} type="number" placeholder={sh.identity.placeholderBeds} min="1" value={data.bedCount} onChange={(e) => set('bedCount', e.target.value)} />
                      </Field>
                    </div>
                    <Field label={sh.identity.desc}>
                      <textarea className={`${inputCls} resize-none h-20`} placeholder={sh.identity.placeholderDesc} value={data.description} onChange={(e) => set('description', e.target.value)} />
                    </Field>
                  </div>
                </motion.div>
              )}

              {/* Step 2 — Location & Contact */}
              {step === 1 && (
                <motion.div key="s1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <p className="text-sm font-bold text-[#dde2f3] mb-5 pb-3 border-b border-[#5b4040]/15 uppercase tracking-wide">
                    {sh.location.title}
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label={sh.location.gov}>
                        <div className="relative">
                          <select className={selectCls} value={data.governorate} onChange={(e) => set('governorate', e.target.value)}>
                            <option value="">{sh.location.selectGov}</option>
                            {sh.location.governorates.map((g) => <option key={g}>{g}</option>)}
                          </select>
                          <span className={`${lang === 'ar' ? 'left-3' : 'right-3'} material-symbols-outlined absolute top-1/2 -translate-y-1/2 text-[#e3bebd]/40 pointer-events-none`} style={{ fontSize: '16px' }}>expand_more</span>
                        </div>
                      </Field>
                      <Field label={sh.location.city}>
                        <input className={inputCls} placeholder={sh.location.placeholderCity} value={data.city} onChange={(e) => set('city', e.target.value)} />
                      </Field>
                    </div>
                    <Field label={sh.location.address}>
                      <input className={inputCls} placeholder={sh.location.placeholderAddress} value={data.address} onChange={(e) => set('address', e.target.value)} />
                    </Field>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label={sh.location.lat} hint={sh.location.gpsHint}>
                        <input className={inputCls} placeholder={sh.location.placeholderLat} value={data.gpsLat} onChange={(e) => set('gpsLat', e.target.value)} />
                      </Field>
                      <Field label={sh.location.lng}>
                        <input className={inputCls} placeholder={sh.location.placeholderLng} value={data.gpsLng} onChange={(e) => set('gpsLng', e.target.value)} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label={sh.location.phone}>
                        <input className={inputCls} type="tel" placeholder={sh.location.placeholderPhone} value={data.phoneMain} onChange={(e) => set('phoneMain', e.target.value)} />
                      </Field>
                      <Field label={sh.location.emergency}>
                        <input className={inputCls} type="tel" placeholder={sh.location.placeholderPhone} value={data.phoneEmergency} onChange={(e) => set('phoneEmergency', e.target.value)} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label={sh.location.email}>
                        <input className={inputCls} type="email" placeholder={sh.location.placeholderEmail} value={data.email} onChange={(e) => set('email', e.target.value)} />
                      </Field>
                      <Field label={sh.location.website}>
                        <input className={inputCls} type="url" placeholder={sh.location.placeholderWebsite} value={data.website} onChange={(e) => set('website', e.target.value)} />
                      </Field>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3 — Medical Capabilities */}
              {step === 2 && (
                <motion.div key="s2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <p className="text-sm font-bold text-[#dde2f3] mb-5 pb-3 border-b border-[#5b4040]/15 uppercase tracking-wide">
                    {sh.medical.title}
                  </p>

                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-medium text-[#e3bebd]/70 mb-3">{sh.medical.bloodBank}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[{ val: 'yes', label: sh.medical.bbYes }, { val: 'no', label: sh.medical.bbNo }].map((opt) => (
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
                      <p className="text-xs font-medium text-[#e3bebd]/70 mb-3">{sh.medical.erStatus}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[{ val: '24-7', label: sh.medical.er247 }, { val: 'limited', label: sh.medical.erLimited }, { val: 'none', label: sh.medical.erNone }].map((opt) => (
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
                      <p className="text-xs font-medium text-[#e3bebd]/70 mb-3">{sh.medical.bloodTypes}</p>
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
                      <Field label={sh.medical.monthlyNeeds}>
                        <input className={inputCls} type="number" placeholder={sh.medical.placeholderNeeds} min="1" value={data.monthlyUnits} onChange={(e) => set('monthlyUnits', e.target.value)} />
                      </Field>
                      <Field label={sh.medical.icuBeds}>
                        <input className={inputCls} type="number" placeholder={sh.medical.placeholderIcu} min="0" value={data.icuBeds} onChange={(e) => set('icuBeds', e.target.value)} />
                      </Field>
                    </div>
                    <Field label={sh.medical.notes}>
                      <textarea className={`${inputCls} resize-none h-20`} placeholder={sh.medical.placeholderNotes} value={data.bloodNotes} onChange={(e) => set('bloodNotes', e.target.value)} />
                    </Field>
                  </div>
                </motion.div>
              )}

              {/* Step 4 — Authorized Representative */}
              {step === 3 && (
                <motion.div key="s3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <p className="text-sm font-bold text-[#dde2f3] mb-5 pb-3 border-b border-[#5b4040]/15 uppercase tracking-wide">
                    {sh.rep.title}
                  </p>
                  <div className="bg-[#080e1a] rounded-xl border border-[#5b4040]/15 p-4 mb-5 text-xs text-[#e3bebd]/50 leading-relaxed italic">
                    {sh.rep.disclaimer}
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label={sh.rep.name}>
                        <input className={inputCls} placeholder={sh.rep.placeholderName} value={data.repName} onChange={(e) => set('repName', e.target.value)} />
                      </Field>
                      <Field label={sh.rep.role}>
                        <div className="relative">
                          <select className={selectCls} value={data.repRole} onChange={(e) => set('repRole', e.target.value)}>
                            <option value="">{sh.rep.selectRole}</option>
                            {sh.rep.roles.map((r) => <option key={r}>{r}</option>)}
                          </select>
                          <span className={`${lang === 'ar' ? 'left-3' : 'right-3'} material-symbols-outlined absolute top-1/2 -translate-y-1/2 text-[#e3bebd]/40 pointer-events-none`} style={{ fontSize: '16px' }}>expand_more</span>
                        </div>
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label={sh.rep.id}>
                        <input className={inputCls} placeholder={sh.rep.placeholderId} value={data.repNationalId} onChange={(e) => set('repNationalId', e.target.value)} />
                      </Field>
                      <Field label={sh.rep.phone}>
                        <input className={inputCls} type="tel" placeholder={sh.rep.placeholderPhone} value={data.repPhone} onChange={(e) => set('repPhone', e.target.value)} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label={sh.rep.email}>
                        <input className={inputCls} type="email" placeholder={sh.rep.placeholderEmail} value={data.repEmail} onChange={(e) => set('repEmail', e.target.value)} />
                      </Field>
                      <Field label={sh.rep.whatsapp}>
                        <input className={inputCls} type="tel" placeholder={sh.rep.placeholderPhone} value={data.repWhatsapp} onChange={(e) => set('repWhatsapp', e.target.value)} />
                      </Field>
                    </div>

                    <div className="space-y-3 mt-1">
                      {[
                        { field: 'authConfirm', label: sh.rep.authConfirm },
                        { field: 'dataConfirm', label: sh.rep.dataConfirm },
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
                  <p className="text-sm font-bold text-[#dde2f3] mb-2 pb-3 border-b border-[#5b4040]/15 uppercase tracking-wide">
                    {sh.review.title}
                  </p>
                  <div className="bg-[#080e1a] rounded-xl border border-[#5b4040]/15 p-4 mb-5 text-xs text-[#e3bebd]/50 leading-relaxed">
                    {sh.review.disclaimer} <strong className="text-[#ffb3b3]">{sh.review.businessDays}</strong>.
                  </div>

                  <ReviewCard title={sh.identity.title}>
                    <ReviewRow label={sh.review.labels.nameEn} value={data.nameEn} />
                    <ReviewRow label={sh.review.labels.nameAr} value={data.nameAr} />
                    <ReviewRow label={sh.review.labels.type} value={data.hospitalType} />
                    <ReviewRow label={sh.review.labels.moph} value={data.mophReg} />
                    <ReviewRow label={sh.review.labels.year} value={data.yearEst} />
                    <ReviewRow label={sh.review.labels.beds} value={data.bedCount} />
                  </ReviewCard>

                  <ReviewCard title={sh.location.title}>
                    <ReviewRow label={sh.review.labels.gov} value={data.governorate} />
                    <ReviewRow label={sh.review.labels.city} value={data.city} />
                    <ReviewRow label={sh.review.labels.address} value={data.address} />
                    <ReviewRow label={sh.review.labels.gps} value={data.gpsLat && data.gpsLng ? `${data.gpsLat}, ${data.gpsLng}` : ''} />
                    <ReviewRow label={sh.review.labels.phone} value={data.phoneMain} />
                    <ReviewRow label={sh.review.labels.email} value={data.email} />
                  </ReviewCard>

                  <ReviewCard title={sh.rep.title}>
                    <ReviewRow label={sh.review.labels.fullName} value={data.repName} />
                    <ReviewRow label={sh.review.labels.role} value={data.repRole} />
                    <ReviewRow label={sh.review.labels.mobile} value={data.repPhone} />
                    <ReviewRow label={sh.review.labels.workEmail} value={data.repEmail} />
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
                       {sh.review.terms}
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
                    {sh.success.title}
                  </motion.h2>

                  <motion.p
                    className="text-sm text-[#e3bebd]/60 leading-relaxed max-w-sm mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    {sh.success.message} <strong className="text-[#ffb3b3]">{sh.success.businessDays}</strong>.
                  </motion.p>

                  <motion.div
                    className="px-5 py-2.5 bg-[#080e1a] rounded-full border border-[#5b4040]/20 font-mono text-sm text-[#e3bebd]/60 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                  >
                    {sh.success.ref} <span className="text-[#ffb3b3] font-bold">{refNumber}</span>
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
                    {sh.success.back}
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
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  {lang === 'ar' ? 'arrow_forward' : 'arrow_back'}
                </span>
                {sh.actions.back}
              </motion.button>

              {step < 4 ? (
                <motion.button
                  onClick={() => setStep((s) => s + 1)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-pulse-gradient rounded-xl text-sm font-bold text-[#5b0011] glow-crimson"
                  whileHover={{ scale: 1.04, boxShadow: '0 0 22px rgba(255,82,96,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {sh.actions.continue}
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                    {lang === 'ar' ? 'arrow_back' : 'arrow_forward'}
                  </span>
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
                      {sh.review.submitting}
                    </>
                  ) : (
                    <>
                      {sh.review.submit}
                      <span className={`${lang === 'ar' ? '-scale-x-100' : ''} material-symbols-outlined`} style={{ fontSize: '16px' }}>send</span>
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

