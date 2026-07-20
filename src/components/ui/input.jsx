'use client'

import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Label from '@/components/ui/label'
import { cn } from '@/lib/cn'
import { BASE_FIELD } from '@/lib/form'

const Input = forwardRef(function Input(
  { className, required, label, id, name, error, ...rest },
  ref
) {
  const inputId = id ?? name
  const errorId = error ? `${inputId}-error` : undefined
  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
      )}
      <input
        ref={ref}
        id={inputId}
        name={name}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={errorId}
        className={cn(
          BASE_FIELD,
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        {...rest}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
})

Input.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
}

export default Input
