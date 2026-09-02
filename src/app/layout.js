import { Suspense } from 'react'
import { Source_Sans_3, Lora } from 'next/font/google'
import MotionProvider from '@/components/motion-provider'
import Navbar from '@/sections/navbar'
import Footer from '@/sections/footer'
import LinesBackground from '@/components/ui/lines-background'
import { ThemeInit } from '@/components/ui/theme-toggle'
import CookieBanner from '@/components/ui/cookie-banner'
import { MetaPixel } from '@/components/analytics/MetaPixel'
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

// `--font-mono` aliases to `--font-sans` in globals.css so every
// `font-mono` utility renders in Source Sans 3 without re-declaring the
// same @font-face + preload twice.

export const metadata = {
  title: 'Northwest Oregon PAC — Championing prosperity, accountability, and opportunity',
  description:
    'Northwest Oregon PAC exists to advance policies that grow private-sector prosperity, hold government accountable, keep our communities safe, prepare the next generation for real careers, and deliver affordable, reliable energy.',
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const META_PIXEL_ENABLED =
  process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === 'true' && Boolean(META_PIXEL_ID)

const metaPixelInlineScript = META_PIXEL_ENABLED
  ? `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`
  : null

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sourceSans.variable} ${lora.variable} h-full antialiased`}
    >
      <head>
        <ThemeInit />
        {metaPixelInlineScript ? (
          <script
            id="meta-pixel"
            // Inline in <head> so the Pixel initializes before hydration
            // and fires on every route (SPA navigations tracked by
            // <MetaPixel /> below).
            dangerouslySetInnerHTML={{ __html: metaPixelInlineScript }}
          />
        ) : null}
      </head>
      <body className="text-foreground relative flex min-h-full flex-col overflow-x-hidden">
        {META_PIXEL_ENABLED ? (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        ) : null}
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
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
