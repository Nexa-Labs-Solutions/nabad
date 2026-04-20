'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    brand: {
      name: 'Nabad',
      tagline: 'The Pulse of Life',
      lifeline: "Saida's Lifeline Network"
    },
    nav: {
      howItWorks: 'How it Works',
      hospitals: 'Hospitals',
      faq: 'FAQ',
      about: 'About',
      dashboard: 'Dashboard',
      signIn: 'Sign In',
      register: 'Register',
      backToHome: 'Back to Home',
      backToDash: 'Back to Dashboard'
    },
    hero: {
      title: 'Every Heartbeat Counts',
      subtitle: 'Real-time blood matching platform connecting donors with patients in Saida.',
      ctaPrimary: 'Register as Donor',
      ctaSecondary: 'Request Blood',
      requestsTitle: 'Active Blood Requests',
      live: 'LIVE',
      donorsNearby: 'Donors Nearby Right Now',
      withinSaida: 'within 5 km of Saida',
      matchTime: 'Avg. Match Time',
      mins: 'minutes',
      urgent: 'URGENT'
    },
    steps: {
      eyebrow: 'How Nabad Works',
      title: 'From Urgent Request to Confirmed Donation',
      subtitle: 'Three steps that connect a hospital in need with a willing donor nearby — every time.',
      0: { title: 'Hospital Posts a Request', body: 'A hospital in Saida registers an urgent blood need instantly.', cta: 'For Hospitals' },
      1: { title: 'Smart Donor Matching', body: 'Our matching engine scans nearby compatible donors fast.', cta: 'How It Works' },
      2: { title: 'Donors Get Alerted', body: 'Eligible donors receive a notification. One tap to save a life.', cta: 'Become a Donor' }
    },
    impact: {
      eyebrow: 'Our Reach',
      title: 'Making a Real Difference',
      stats: [
        { val: '3k+', label: 'Lives Saved' },
        { val: '47+', label: 'Hospitals' },
        { val: '1.2k+', label: 'Donors' }
      ]
    },
    footer: {
      desc: 'Built in Saida to ensure no patient ever waits for a compatible blood donor during an emergency.',
      links: 'Quick Links',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      copyright: '© 2026 Nabad. For Saida, By Saida.'
    },
    about: {
      eyebrow: 'Our Mission',
      title: 'The Story of Nabad',
      tagline: 'Born in Saida, Built for Life.',
      body: '"We aren\'t just building a blood bank. We are building the nervous system of the emergency response in Lebanon."',
      stats: '1,200+ Hearts Connected',
      foundation: 'Nabad was founded with a single realization: in Lebanese medical emergencies, delay is often fatal.'
    },
    hospitals: {
      eyebrow: 'Hospital Network',
      title: 'Saida Partnered Facilities',
      activePartners: 'Active Partners',
      becomePartner: 'Become a Partner',
      timeline: [
        { title: 'Expression of Interest', desc: 'Secure medical facilities in Saida submit a request.' },
        { title: 'Protocol Verification', desc: 'Nabad officers verify storage standards.' },
        { title: 'System Integration', desc: 'Installation of the Nabad Command Center terminal.' },
        { title: 'Active Network', desc: 'Hospital goes live on the donor dashboard.' }
      ]
    },
    faq: {
      eyebrow: 'Frequently Asked',
      title: 'Questions & Support',
      contact: 'Still have questions?',
      supportDesc: 'Our team is available 24/7 in Saida.',
      contactCta: 'Contact Support'
    },
    dashboard: {
      welcome: 'Welcome back',
      donorHub: 'Donor Hub',
      livesSaved: 'Lives Saved',
      matchFound: 'Matches Found',
      reliability: 'Reliability Score',
      nextDonation: 'Next Eligible Donation',
      days: 'Days',
      canDonate: 'You can donate now!',
      profileTitle: 'Review Profile',
      profileDesc: 'Edit donor settings',
      backToProfile: 'Edit Profile'
    },
    auth: {
      joinNetwork: 'Join the Network',
      roleSubtitle: 'Are you joining as a blood donor or registering your hospital?',
      iAmDonor: 'I Am a Donor',
      donorDesc: 'Register as a blood donor. Receive real-time alerts when a hospital near you needs your blood type.',
      donorF1: 'Instant hospital alerts',
      donorF2: 'Track your donation history',
      donorF3: 'Community impact score',
      createDonor: 'Create donor account',
      weAreHospital: 'We Are a Hospital',
      hospitalDesc: 'Register your hospital to post urgent blood requests and reach donors nearby.',
      hospitalF1: 'Post urgent blood requests',
      hospitalF2: 'Smart donor matching',
      hospitalF3: 'Admin-reviewed registration',
      applyHospital: 'Apply for hospital access',
      alreadyHave: 'Already have an account?',
      hospitalRegister: 'Registering as a hospital?',
      applyHere: 'Apply here'
    },
    hospitalSignUp: {
      title: 'Hospital Registration Request',
      subtitle: 'Complete all sections. Your application will be reviewed before access is granted.',
      steps: [
        'Hospital Identity',
        'Location & Contact',
        'Medical Capabilities',
        'Authorized Rep.',
        'Review & Submit'
      ],
      stepLabel: 'Step',
      of: 'of',
      identity: {
        title: 'Hospital identity',
        nameAr: 'Official hospital name (Arabic)',
        nameEn: 'Official hospital name (English)',
        type: 'Hospital type',
        selectType: 'Select type',
        moph: 'Ministry of Public Health registration no.',
        mophHint: 'Issued by the Lebanese Ministry of Public Health',
        year: 'Year established',
        beds: 'Number of licensed beds',
        desc: 'Brief description of services offered',
        placeholderNameAr: 'اسم المستشفى بالعربية',
        placeholderNameEn: 'e.g. Makassed General Hospital',
        placeholderMoph: 'e.g. MOPH-2024-XXXX',
        placeholderYear: 'e.g. 1985',
        placeholderBeds: 'e.g. 200',
        placeholderDesc: 'e.g. Full-service emergency, surgery, maternity, ICU...',
        types: {
          gov: 'Government / Public',
          private: 'Private',
          ngo: 'NGO / Non-profit',
          military: 'Military',
          uni: 'University / Teaching'
        }
      },
      location: {
        title: 'Location & contact',
        gov: 'Governorate (Mohafaza)',
        selectGov: 'Select governorate',
        city: 'City / District',
        address: 'Full street address',
        lat: 'GPS latitude',
        lng: 'GPS longitude',
        gpsHint: 'Open Google Maps, long-press your location',
        phone: 'Main hospital phone',
        emergency: 'Emergency / blood bank direct line',
        email: 'Official email address',
        website: 'Website (optional)',
        placeholderCity: 'e.g. Saida',
        placeholderAddress: 'Building, street, area',
        placeholderLat: 'e.g. 33.5570',
        placeholderLng: 'e.g. 35.3714',
        placeholderPhone: '+961 X XXX XXX',
        placeholderEmail: 'bloodbank@hospital.lb',
        placeholderWebsite: 'https://hospital.lb',
        governorates: [
          'Beirut', 'Mount Lebanon', 'North Lebanon',
          'South Lebanon', 'Bekaa', 'Nabatieh', 'Akkar', 'Baalbek-Hermel'
        ]
      },
      medical: {
        title: 'Medical capabilities',
        bloodBank: 'Does the hospital have an on-site blood bank?',
        bbYes: 'Yes, on-site',
        bbNo: 'No — coordinate externally',
        erStatus: 'Emergency department status',
        er247: '24 / 7 open',
        erLimited: 'Limited hours',
        erNone: 'No ER',
        bloodTypes: 'Blood types your hospital typically requests',
        monthlyNeeds: 'Avg. monthly blood unit needs (approx.)',
        icuBeds: 'ICU beds (if applicable)',
        notes: 'Additional notes about blood / transfusion needs (optional)',
        placeholderNeeds: 'e.g. 150',
        placeholderIcu: 'e.g. 20',
        placeholderNotes: 'e.g. We frequently need O− for trauma surgery...'
      },
      rep: {
        title: 'Authorized representative',
        disclaimer: 'The person signing this application must be authorized to act on behalf of the hospital. They will be the primary contact during the review process.',
        name: 'Full name',
        role: 'Job title / role',
        selectRole: 'Select role',
        id: 'Lebanese national ID number',
        phone: 'Direct mobile number',
        email: 'Work email',
        whatsapp: 'WhatsApp number (for urgent coordination)',
        authConfirm: 'I confirm that I am duly authorized to submit this registration on behalf of the hospital listed above.',
        dataConfirm: 'I confirm that all information provided in this application is accurate and complete.',
        placeholderName: 'First and last name',
        placeholderId: 'e.g. 123456789',
        placeholderPhone: '+961 X XXX XXX',
        placeholderEmail: 'name@hospital.lb',
        roles: [
          'Hospital Director', 'Medical Director', 'Blood Bank Manager',
          'Head of Emergency', 'Chief Nursing Officer', 'Administrative Director', 'Other'
        ]
      },
      review: {
        title: 'Review & submit',
        disclaimer: 'Review your application below. After submission, the Nabad team will contact your authorized representative within',
        businessDays: '2–5 business days',
        terms: 'I agree that Nabad may contact the hospital to verify this application, and understand that approval is at Nabad\'s sole discretion.',
        submit: 'Submit application',
        submitting: 'Submitting...',
        errorTerms: 'Please agree to the terms before submitting.',
        errorSubmit: 'Submission failed. Please try again.',
        labels: {
          nameEn: 'Name (English)',
          nameAr: 'Name (Arabic)',
          type: 'Type',
          moph: 'MOPH registration',
          year: 'Year established',
          beds: 'Licensed beds',
          gov: 'Governorate',
          city: 'City',
          address: 'Address',
          gps: 'GPS',
          phone: 'Main phone',
          email: 'Email',
          fullName: 'Full name',
          role: 'Role',
          mobile: 'Mobile',
          workEmail: 'Work email'
        }
      },
      success: {
        title: 'Application Submitted',
        message: 'Thank you. Your hospital registration request has been received. The Nabad team will review your application and contact your authorized representative within',
        businessDays: '2–5 business days',
        ref: 'Reference:',
        back: 'Back to Home'
      },
      actions: {
        back: 'Back',
        continue: 'Continue'
      }
    }
  },
  ar: {
    brand: {
      name: 'نَبض',
      tagline: 'نبض الحياة',
      lifeline: 'شبكة إنقاذ صيدا'
    },
    nav: {
      howItWorks: 'كيف بتصير؟',
      hospitals: 'المستشفيات',
      faq: 'أسئلة بتهمك',
      about: 'قصتنا',
      dashboard: 'لوحة التحكم',
      signIn: 'دخول',
      register: 'سجل حالك',
      backToHome: 'رجوع للرئيسية',
      backToDash: 'رجوع للوحة التحكم'
    },
    hero: {
      title: 'كل دقة قلب بتفرق',
      subtitle: 'منصة سريعة بتوصّل المتبرعين بالمرضى بصيدا وبجوارها بلحظات.',
      ctaPrimary: 'سجل كمتبرع',
      ctaSecondary: 'طلب دم سريع',
      requestsTitle: 'طلبات دم حالية',
      live: 'مباشر',
      donorsNearby: 'متبرعين قراب هلأ',
      withinSaida: 'بمنطقة صيدا وضواحيها',
      matchTime: 'سرعة التواصل',
      mins: 'دقائق',
      urgent: 'طارئ'
    },
    steps: {
      eyebrow: 'كيف بيشتغل نَبض؟',
      title: 'من الطلب الطارئ لعملية التبرع',
      subtitle: 'تلات خطوات بسيطة بتوصل المستشفى بالمتبرع المناسب بأسرع وقت.',
      0: { title: 'المستشفى بقدّم طلب', body: 'المستشفى بصيدا بيسجل طلب دم طارئ، والطلب بيوصل للكل فوراً.', cta: 'للمستشفيات' },
      1: { title: 'تواصل ذكي مع المتبرعين', body: 'النظام بينقي أقرب متبرعين فئتهن مناسبة وموجودين بالمنطقة.', cta: 'كيف بيشتغل؟' },
      2: { title: 'تنبيه فوري للمتبرع', body: 'المتبرع بيوصله تنبيه عتلفونه، وبكبسة وحدة بيأكد حضوره.', cta: 'سجل كمتبرع' }
    },
    impact: {
      eyebrow: 'تأثيرنا',
      title: 'عم نغيّر الواقع سوا',
      stats: [
        { val: '+٣،٠٠٠', label: 'حياة انقذناها' },
        { val: '+٤٧', label: 'مستشفى' },
        { val: '+١،٢٠٠', label: 'متبرع نشط' }
      ]
    },
    footer: {
      desc: 'بنينا نَبض بصيدا لنضمن إنه ما في مريض يضطر ينطر متبرع دم متوافق بحالات الطوارئ.',
      links: 'روابط سريعة',
      legal: 'القانونية',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      copyright: '© ٢٠٢٦ نَبض. من صيدا، ولصيدا.'
    },
    about: {
      eyebrow: 'مهمتنا',
      title: 'قصة نَبض',
      tagline: 'خلق بصيدا، لخدمة الكل.',
      body: '"نحنا مش بس عم نعمر بنك دم، نحنا عم نعمر الجهاز العصبي لحالات الطوارئ بلبنان."',
      stats: 'أكتر من ١،٢٠٠ قلب متصل',
      foundation: 'نَبض بلش من فكرة وحدة: بحالات الطوارئ بلبنان، التأخير بالتبرع بالدم ممكن يسبّب خسارة أرواح.'
    },
    hospitals: {
      eyebrow: 'شبكة المستشفيات',
      title: 'المراكز الشريكة بصيدا',
      activePartners: 'المستشفيات الحالية',
      becomePartner: 'كيف بتصير شريك؟',
      timeline: [
        { title: 'تقديم طلب اهتمام', desc: 'المراكز الطبية بصيدا بتبعت طلب أولي للانضمام.' },
        { title: 'تأكيد المواصفات', desc: 'فريق نَبض بيتأكد من معايير تخزين الدم وجهوزية الطوارئ.' },
        { title: 'ربط الأنظمة', desc: 'تركيب شاشة نَبض بغرفة العمليات لمتابعة المتبرعين فوراً.' },
        { title: 'الانطلاق بالخدمة', desc: 'المستشفى بصير فعال على الشبكة وبيقدر يطلب دم بلحظتها.' }
      ]
    },
    faq: {
      eyebrow: 'أسئلة شائعة',
      title: 'استفسارات ومساعدة',
      contact: 'بعد عندك أسئلة؟',
      supportDesc: 'فريقنا موجود بصيدا ٢٤/٧ كرمال مساعدتك.',
      contactCta: 'تواصل معنا'
    },
    dashboard: {
      welcome: 'أهلاً وسهلاً',
      donorHub: 'ساحة المتبرع',
      livesSaved: 'أرواح انقذتها',
      matchFound: 'تواصل تمّ',
      reliability: 'معدل الالتزام',
      nextDonation: 'موعد تبرعك الجاي',
      days: 'أيام',
      canDonate: 'فيك تتبرع هلأ!',
      profileTitle: 'مراجعة حسابك',
      profileDesc: 'تعديل بيانات المتبرع',
      backToProfile: 'تعديل الملف الشخصي'
    },
    auth: {
      joinNetwork: 'انضم للشبكة',
      roleSubtitle: 'بدك تنضم كمتبرع دم أو تسجّل مستشفى؟',
      iAmDonor: 'أنا متبرع والدم غالي',
      donorDesc: 'سجل كمتبرع ليوصلك تنبيه بطلبات الدم الطارئة من المستشفيات القريبة بصيدا.',
      donorF1: 'تنبيهات فورية للمستشفيات',
      donorF2: 'تابع أرشيف تبرعاتك',
      donorF3: 'نقاط تأثيرك بالمجتمع',
      createDonor: 'إنشاء حساب متبرع',
      weAreHospital: 'نحنا مستشفى',
      hospitalDesc: 'سجل المستشفى لتبعت طلبات دم طارئة وتوصل لآلاف المتبرعين القريبين بلحظة.',
      hospitalF1: 'طلبات دم طارئة فورية',
      hospitalF2: 'تواصل ذكي مع المتبرعين',
      hospitalF3: 'مراجعة طلبك من الإدارة',
      applyHospital: 'طلب صلاحية للمستشفى',
      alreadyHave: 'عندك حساب أصلاً؟',
      hospitalRegister: 'بدك تسجل كمستشفى؟',
      applyHere: 'قدم هون'
    },
    hospitalSignUp: {
      title: 'طلب تسجيل مستشفى جديدة',
      subtitle: 'عبّي كل الأقسام المطلوبة. طلبك رح يتراجع من قبل الفريق قبل تأكيد الحساب.',
      steps: [
        'هوية المستشفى',
        'الموقع والتواصل',
        'القدرات الطبية',
        'المندوب المفوض',
        'مراجعة وتقديم'
      ],
      stepLabel: 'الخطوة',
      of: 'من',
      identity: {
        title: 'هوية المستشفى',
        nameAr: 'إسم المستشفى الرسمي (بالعربي)',
        nameEn: 'إسم المستشفى الرسمي (بالإنجليزي)',
        type: 'نوع المستشفى',
        selectType: 'حدد النوع',
        moph: 'رقم التسجيل بوزارة الصحة العامة',
        mophHint: 'الرقم الصادر عن وزارة الصحة اللبنانية',
        year: 'سنة التأسيس',
        beds: 'عدد الأسرة المرخصة',
        desc: 'وصف قصير للخدمات الطبية',
        placeholderNameAr: 'مثل: مستشفى صيدا الحكومي',
        placeholderNameEn: 'مثل: Saida Govermental Hospital',
        placeholderMoph: 'مثل: MOPH-2024-XXXX',
        placeholderYear: 'مثل: ١٩٨٥',
        placeholderBeds: 'مثل: ٢٠٠',
        placeholderDesc: 'مثل: طوارئ ٢٤ ساعة، جراحة، ولادة، عناية فائقة...',
        types: {
          gov: 'حكومي / رسمي',
          private: 'خاص',
          ngo: 'جمعية / غير ربحي',
          military: 'عسكري',
          uni: 'جامعي / تعليمي'
        }
      },
      location: {
        title: 'الموقع والتواصل',
        gov: 'المحافظة',
        selectGov: 'اختر المحافظة',
        city: 'المدينة / القضاء',
        address: 'العنوان الكامل',
        lat: 'إحداثيات GPS (عرض)',
        lng: 'إحداثيات GPS (طول)',
        gpsHint: 'افتح خرائط جوجل، واكبس مطولاً على موقعك',
        phone: 'الرقم الرئيسي للمستشفى',
        emergency: 'خط الطوارئ / بنك الدم المباشر',
        email: 'البريد الإلكتروني الرسمي',
        website: 'الموقع الإلكتروني (اختياري)',
        placeholderCity: 'مثل: صيدا',
        placeholderAddress: 'البناية، الشارع، المنطقة',
        placeholderLat: 'مثل: ٣٣.٥٥٧٠',
        placeholderLng: 'مثل: ٣٥.٣٧١٤',
        placeholderPhone: '+٩٦١ X XXX XXX',
        placeholderEmail: 'bloodbank@hospital.lb',
        placeholderWebsite: 'https://hospital.lb',
        governorates: [
          'بيروت', 'جبل لبنان', 'الشمال',
          'الجنوب', 'البقاع', 'النبطية', 'عكار', 'بعلبك - الهرمل'
        ]
      },
      medical: {
        title: 'القدرات الطبية',
        bloodBank: 'هل يوجد بنك دم داخل المستشفى؟',
        bbYes: 'نعم، موجود داخلياً',
        bbNo: 'لا - نعتمد على مراكز خارجية',
        erStatus: 'وضع قسم الطوارئ',
        er247: 'مفتوح ٢٤/٧',
        erLimited: 'ساعات عمل محددة',
        erNone: 'لا يوجد قسم طوارئ',
        bloodTypes: 'فئات الدم اللي المستشفى بتطلبها عادةً',
        monthlyNeeds: 'حاجة الدم الشهرية التقريبية (وحدة)',
        icuBeds: 'عدد أسرة العناية الفائقة (إن وجد)',
        notes: 'ملاحظات إضافية عن حاجات الدم (اختياري)',
        placeholderNeeds: 'مثل: ١٥٠',
        placeholderIcu: 'مثل: ٢٠',
        placeholderNotes: 'مثل: منكون بحاجة دايمة لفئة O- لعمليات الحوادث...'
      },
      rep: {
        title: 'المندوب المفوض',
        disclaimer: 'الشخص اللي عم يوقع الطلب لازم يكون مفوض من قبل المستشفى. رح يكون هو صلة الوصل الأساسية خلال فترة المراجعة.',
        name: 'الإسم الكامل',
        role: 'المسمى الوظيفي / الدور',
        selectRole: 'اختر المسمى',
        id: 'رقم الهوية اللبنانية',
        phone: 'رقم الموبايل المباشر',
        email: 'بريد العمل الإلكتروني',
        whatsapp: 'رقم الواتساب (للتنسيق الطارئ)',
        authConfirm: 'بأكد إني مفوض قانونياً لتقديم هيدا الطلب باسم المستشفى المذكورة فوق.',
        dataConfirm: 'بأكد إن كل المعلومات المقدمة بهيدا الطلب دقيقة وكاملة.',
        placeholderName: 'الإسم الأول والعائلة',
        placeholderId: 'مثل: ١٢٣٤٥٦٧٨٩',
        placeholderPhone: '+٩٦١ X XXX XXX',
        placeholderEmail: 'name@hospital.lb',
        roles: [
          'مدير المستشفى', 'المدير الطبي', 'مدير بنك الدم',
          'رئيس قسم الطوارئ', 'رئيس التمريض', 'المدير الإداري', 'آخر'
        ]
      },
      review: {
        title: 'مراجعة وتقديم',
        disclaimer: 'راجع طلبك قبل الإرسال. بعد التقديم، فريق نَبض رح يتواصل مع المندوب المفوض خلال',
        businessDays: '٢-٥ أيام عمل',
        terms: 'بوافق إن نَبض تتواصل مع المستشفى للتأكد من هيدا الطلب، وبعرف إن الموافقة بترجع لتقدير فريق نَبض.',
        submit: 'تقديم الطلب',
        submitting: 'جارٍ التقديم...',
        errorTerms: 'الرجاء الموافقة على الشروط قبل التقديم.',
        errorSubmit: 'فشل التقديم. جرب مرة تانية.',
        labels: {
          nameEn: 'الإسم (إنجليزي)',
          nameAr: 'الإسم (عربي)',
          type: 'النوع',
          moph: 'رقم وزارة الصحة',
          year: 'تاريخ التأسيس',
          beds: 'الأسرة المرخصة',
          gov: 'المحافظة',
          city: 'المدينة',
          address: 'العنوان',
          gps: 'الموقع (GPS)',
          phone: 'رقم الهاتف',
          email: 'البريد الإلكتروني',
          fullName: 'الإسم الكامل',
          role: 'الوظيفة',
          mobile: 'الموبايل',
          workEmail: 'بريد العمل'
        }
      },
      success: {
        title: 'تم تقديم الطلب بنجاح',
        message: 'شكراً الكن. طلب تسجيل المستشفى وصل لعنا. فريق نَبض رح يراجع الطلب ويتواصل مع المندوب خلال',
        businessDays: '٢-٥ أيام عمل',
        ref: 'رقم المرجع:',
        back: 'الرجوع للرئيسية'
      },
      actions: {
        back: 'رجوع',
        continue: 'استمرار'
      }
    }
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  
  useEffect(() => {
    const saved = localStorage.getItem('nabad_lang')
    if (saved) {
      setLang(saved)
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = saved
    }
  }, [])

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'ar' : 'en'
    setLang(newLang)
    localStorage.setItem('nabad_lang', newLang)
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t: translations[lang] }}>
      <div className={lang === 'ar' ? 'font-arabic' : 'font-body'}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
