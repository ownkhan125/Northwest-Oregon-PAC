'use client'

import PropTypes from 'prop-types'
import Button from '@/components/ui/button'

const RouteError = ({ error, reset }) => {
  if (typeof window !== 'undefined') {
    console.error('[RouteError]:', error)
  }

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-5 py-32">
      <div className="max-w-md text-center">
        <div className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase">
          Something went wrong
        </div>
        <h1 className="font-display text-foreground mt-5 text-3xl font-medium tracking-tight sm:text-4xl">
          We hit a snag.
        </h1>
        <p className="text-foreground/75 mt-4">
          The page failed to load. Try again, or head back to the home page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => reset?.()}>Try again</Button>
          <Button href="/" variant="secondary">
            Go home
          </Button>
        </div>
      </div>
    </section>
  )
}

RouteError.propTypes = {
  error: PropTypes.object,
  reset: PropTypes.func,
}

export default RouteError
