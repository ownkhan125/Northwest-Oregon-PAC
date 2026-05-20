'use client'

import { m } from 'motion/react'

const RouteLoading = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5">
    <m.span
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      className="border-cyan/20 border-t-mint grid h-12 w-12 place-items-center rounded-full border-2"
    />
    <div className="text-cyan/80 font-mono text-[10px] tracking-[0.3em] uppercase">Loading</div>
  </div>
)

export default RouteLoading
