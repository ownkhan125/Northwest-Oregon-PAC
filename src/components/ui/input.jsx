'use client'

import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Label from '@/components/ui/label'
import { cn } from '@/lib/cn'
import { BASE_FIELD } from '@/lib/form'

const Input = forwardRef(function Input({ className, required, label, id, name, ...rest }, ref) {
  const inputId = id ?? name
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
        className={cn(BASE_FIELD, className)}
        {...rest}
      />
    </div>
  )
})

Input.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string,
}

export default Input
