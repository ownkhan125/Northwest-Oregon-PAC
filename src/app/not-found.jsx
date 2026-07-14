import Button from '@/components/ui/button'

const NotFound = () => (
  <section className="flex min-h-[70vh] items-center justify-center px-5 py-32">
    <div className="max-w-md text-center">
      <div className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase">404</div>
      <h1 className="font-display text-foreground mt-5 text-4xl font-medium tracking-tight sm:text-5xl">
        Page not found.
      </h1>
      <p className="text-foreground/75 mt-4">
        The page you&apos;re looking for moved, or never existed. Let&apos;s get you back on
        track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Go home</Button>
        <Button href="/ask" variant="secondary">
          Ask
        </Button>
      </div>
    </div>
  </section>
)

export default NotFound
