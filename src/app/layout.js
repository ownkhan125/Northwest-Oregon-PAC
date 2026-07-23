import { Source_Sans_3, Lora, JetBrains_Mono } from 'next/font/google'
import MotionProvider from '@/components/motion-provider'
import Navbar from '@/sections/navbar'
import Footer from '@/sections/footer'
import LinesBackground from '@/components/ui/lines-background'
import { ThemeInit } from '@/components/ui/theme-toggle'
import CookieBanner from '@/components/ui/cookie-banner'
import './globals.css'

const sourceSans = Source_Sans_3({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const lora = Lora({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Northwest Oregon PAC — Championing prosperity, accountability, and opportunity',
  description:
    'Northwest Oregon PAC exists to advance policies that grow private-sector prosperity, hold government accountable, keep our communities safe, prepare the next generation for real careers, and deliver affordable, reliable energy.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sourceSans.variable} ${lora.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <ThemeInit />
      </head>
      <body className="text-foreground relative flex min-h-full flex-col overflow-x-hidden">
        <LinesBackground />
        <MotionProvider>
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
          <CookieBanner />
        </MotionProvider>
      </body>
    </html>
  )
}
