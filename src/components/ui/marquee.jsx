'use client'

import PropTypes from 'prop-types'
import { cn } from '@/lib/cn'

const Marquee = ({ items, className, separator = '—' }) => {
  const doubled = [...items, ...items]
  return (
    <div
      className={cn('border-line relative w-full overflow-hidden border-y', className)}
      aria-hidden
    >
      <div className="marquee-track flex w-max gap-10 py-5 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-foreground/85 flex items-center gap-10 text-3xl font-medium sm:text-4xl"
          >
            <span>{item}</span>
            <span className="text-mint">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

Marquee.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  separator: PropTypes.node,
}

export default Marquee
