import { SignIn } from '@clerk/nextjs'

const clerkAppearance = {
  variables: {
    colorBackground: '#0d131f',
    colorText: '#dde2f3',
    colorTextSecondary: '#9aa5b4',
    colorTextOnPrimaryBackground: '#5b0011',
    colorInputBackground: '#080e1a',
    colorInputText: '#dde2f3',
    colorPrimary: '#ff5260',
    colorDanger: '#fc8181',
    colorSuccess: '#00daf3',
    borderRadius: '0.75rem',
    fontFamily: 'Inter, sans-serif',
  },
  elements: {
    rootBox: { width: '100%' },
    card: {
      background: '#0d131f',
      border: '1px solid rgba(91,64,64,0.2)',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
    },
    logoBox: { display: 'none' },
    headerTitle: { color: '#dde2f3', fontWeight: '900', fontSize: '1.5rem' },
    headerSubtitle: { color: 'rgba(227,190,189,0.6)' },
    socialButtonsBlockButton: {
      background: '#080e1a',
      border: '1px solid rgba(91,64,64,0.3)',
      color: '#dde2f3',
    },
    formFieldLabel: { color: 'rgba(227,190,189,0.7)', fontWeight: '500' },
    formFieldInput: {
      background: '#080e1a',
      border: '1px solid rgba(91,64,64,0.3)',
      color: '#dde2f3',
    },
    formButtonPrimary: {
      background: 'linear-gradient(135deg, #ffb3b3 0%, #ff5260 100%)',
      color: '#5b0011',
      fontWeight: '700',
      boxShadow: '0 0 15px rgba(255,82,96,0.3)',
    },
    footerActionLink: { color: '#ff5260' },
    footerActionText: { color: 'rgba(227,190,189,0.5)' },
    dividerLine: { background: 'rgba(91,64,64,0.2)' },
    dividerText: { color: 'rgba(227,190,189,0.4)' },
  },
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#080e1a] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#ff5260]/6 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#00daf3]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#ff5260]/50 animate-ping opacity-50" />
              <span className="material-symbols-outlined text-[#ff5260] relative z-10 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-[#ffb3b3] to-[#ff5260] bg-clip-text text-transparent">
              Nabad
            </span>
          </div>
          <p className="text-[#e3bebd]/50 text-sm">Welcome back — Saida&apos;s blood network</p>
        </div>

        <SignIn
          appearance={clerkAppearance}
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/dashboard"
        />
      </div>
    </div>
  )
}
