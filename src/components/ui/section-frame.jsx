'use client'

import Image from 'next/image'
import SectionMarker from '@/components/ui/section-marker'
import { cn } from '@/lib/cn'

const SectionFrame = ({ id, eyebrow, number, className, bgImage, overlayClassName, children }) => {
  // Accept either a StaticImageData object (from an `import` of a local
  // image) or a plain string URL. The former unlocks next/image's format
  // negotiation and srcset generation for the mobile branch below.
  const bgSrcUrl = bgImage && (typeof bgImage === 'string' ? bgImage : bgImage.src)

  return (
    <section
      id={id}
      className={cn('relative isolate w-full overflow-hidden', className)}
    >
      {bgImage && (
        <>
          {/* Mobile & tablet: serve the backdrop through next/image so it
              negotiates AVIF/WebP and picks a viewport-appropriate size.
              The raw source is often multi-MB; this path delivers ~30KB
              on a phone. `lg:hidden` also stops the browser from fetching
              this branch at desktop widths. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-20 overflow-hidden saturate-[1.08] contrast-[1.04] lg:hidden"
          >
            <Image
              src={bgImage}
              alt=""
              fill
              sizes="(min-width: 768px) 100vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          {/* Desktop only: keep the CSS background so `bg-fixed` parallax
              is preserved verbatim on `lg:` and up. Browsers do NOT fetch
              `background-image` URLs for elements with `display: none`,
              so the raw JPG stays out of the mobile network payload. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-20 hidden bg-cover bg-center bg-no-repeat saturate-[1.08] contrast-[1.04] lg:block lg:bg-fixed"
            style={{ backgroundImage: `url('${bgSrcUrl}')` }}
          />
          {/* Uniform readability wash — flat, edge-to-edge, no gradient and
              no vignette. Same coverage left, center, and right so nothing
              reads as darker or lighter than anywhere else. Tuned separately
              for light and dark modes to preserve WCAG contrast without
              burying the image. Light mode uses a stronger wash so ink-on-
              cream body copy stays readable over photographic backdrops;
              dark mode keeps the softer 58% so the image reads through. */}
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-0 -z-10 bg-background/78 dark:bg-background/58',
              overlayClassName,
            )}
          />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="relative">
          <SectionMarker number={number} eyebrow={eyebrow} />
          {children}
        </div>
      </div>
    </section>
  )
}

export default SectionFrame
