'use client'

import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Label from '@/components/ui/label'
import { cn } from '@/lib/cn'
import { BASE_FIELD } from '@/lib/form'

const Select = forwardRef(function Select(
  { className, required, label, id, name, children, ...rest },
  ref,
) {
  const inputId = id ?? name
  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          name={name}
          required={required}
          className={cn(BASE_FIELD, 'appearance-none pr-10 [color-scheme:dark]', className)}
          {...rest}
        >
          {children}
        </select>
        <svg
          aria-hidden
          className="text-cyan pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  )
})

Select.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node,
}

export default Select
