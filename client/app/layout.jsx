import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata = {
  title: 'Nabad | The Pulse of Life',
  description: "The world's fastest blood supply network. Real-time matching, predictive logistics, and instant emergency broadcasts.",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          />
        </head>
        <body className={`${inter.className} bg-surface text-on-surface font-body antialiased selection:bg-primary-container selection:text-white`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
