'use client'

import PropTypes from 'prop-types'

const Checkbox = ({ label, id, name, required, ...rest }) => {
  const inputId = id ?? name ?? label
  return (
    <label
      htmlFor={inputId}
      className="group text-foreground/80 flex cursor-pointer items-start gap-3 text-sm"
    >
      <span className="border-cyan/30 bg-cyan/[0.04] group-hover:border-mint relative mt-[2px] grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors">
        <input
          id={inputId}
          name={name}
          type="checkbox"
          required={required}
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-md"
          {...rest}
        />
        <svg
          aria-hidden
          className="text-mint pointer-events-none h-3.5 w-3.5 scale-0 transition-transform peer-checked:scale-100"
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
        {required && <span className="text-mint ml-1">*</span>}
      </span>
    </label>
  )
}

Checkbox.propTypes = {
  label: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
}

export default Checkbox
