'use client'

import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Label from '@/components/ui/label'
import { cn } from '@/lib/cn'
import { BASE_FIELD } from '@/lib/form'

const Textarea = forwardRef(function Textarea(
  { className, required, label, id, name, rows = 5, ...rest },
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
      <textarea
        ref={ref}
        id={inputId}
        name={name}
        required={required}
        rows={rows}
        className={cn(BASE_FIELD, 'h-auto py-3 leading-relaxed', className)}
        {...rest}
      />
    </div>
  )
})

Textarea.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string,
  rows: PropTypes.number,
}

export default Textarea
