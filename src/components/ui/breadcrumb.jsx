import Link from 'next/link'
import PropTypes from 'prop-types'
import { cn } from '@/lib/cn'

export default function Breadcrumb({ items, className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-foreground/70 text-xs', className)}>
      <ol className="flex flex-wrap items-center gap-2 font-mono tracking-[0.15em] uppercase">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-foreground/40">
                  /
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="text-primary">
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    }),
  ).isRequired,
  className: PropTypes.string,
}
