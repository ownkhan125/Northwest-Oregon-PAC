'use client'

import PropTypes from 'prop-types'
import { cn } from '@/lib/cn'

const Checkbox = ({ label, id, name, required, disabled, ...rest }) => {
  const inputId = id ?? name ?? label
  return (
    <label
      htmlFor={inputId}
      className={cn(
        'group flex items-start gap-3 text-sm',
        disabled
          ? 'text-foreground/40 cursor-not-allowed'
          : 'text-foreground/85 cursor-pointer',
      )}
    >
      <span
        className={cn(
          'relative mt-[2px] grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors',
          disabled
            ? 'border-border/60 bg-surface-alt/20'
            : 'border-border bg-surface-alt/40 group-hover:border-primary',
        )}
      >
        <input
          id={inputId}
          name={name}
          type="checkbox"
          required={required}
          disabled={disabled}
          className={cn(
            'peer absolute inset-0 h-full w-full appearance-none rounded-md',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          )}
          {...rest}
        />
        <svg
          aria-hidden
          className={cn(
            'pointer-events-none h-3.5 w-3.5 scale-0 transition-transform peer-checked:scale-100',
            disabled ? 'text-foreground/40' : 'text-primary',
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="5 12 10 17 19 7" />
        </svg>
      </span>
      <span className="leading-snug">
        {label}
        {required && !disabled && <span className="text-primary ml-1">*</span>}
      </span>
    </label>
  )
}

Checkbox.propTypes = {
  label: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default Checkbox
