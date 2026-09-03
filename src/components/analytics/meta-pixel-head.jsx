// Meta Pixel bootstrap. Server Component on purpose — no 'use client'.
//
// This renders a raw inline <script> into <head> so `fbq` exists before
// any client component hydrates and tries to call it. Do NOT convert it
// to next/script and do NOT move it into <body>: that ordering is the
// whole point of this file.
//
// It calls fbq('init', ID) only. The initial PageView is fired by the
// route tracker in meta-pixel.jsx so that the first load and every
// subsequent client navigation take the same code path.

const ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ENABLED = process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === 'true'

// Meta's own loader, verbatim from Events Manager. Do not reformat.
const bootstrap = (id) =>
  `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');`

const MetaPixelHead = () => {
  if (!ID || !ENABLED) return null

  return <script id="meta-pixel" dangerouslySetInnerHTML={{ __html: bootstrap(ID) }} />
}

export default MetaPixelHead
