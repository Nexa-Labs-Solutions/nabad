import { Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../context/LanguageContext'
import ClientProvider from '../components/ClientProvider'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta',
})

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-arabic',
})

export const metadata = {
  title: 'Nabad | The Pulse of Life',
  description: 'Real-time blood matching platform connecting donors with patients in Saida, Lebanon.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* preconnect and preload so Material Symbols loads fast */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400..700,0..1,0&display=block"
        />
      </head>
      <body className={`${jakarta.variable} ${arabic.variable} ${jakarta.className} bg-surface text-on-surface font-body antialiased selection:bg-primary-container selection:text-white`}>
        <LanguageProvider>
          <ClientProvider>
            {children}
          </ClientProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
