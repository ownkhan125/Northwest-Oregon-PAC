'use client'

import PropTypes from 'prop-types'

const Radio = ({ label, id, name, value, required, ...rest }) => {
  const inputId = id ?? `${name}-${value}`
  return (
    <label
      htmlFor={inputId}
      className="group text-foreground/85 flex cursor-pointer items-start gap-3 text-sm sm:text-base"
    >
      <span className="border-border bg-surface-alt/40 group-hover:border-primary relative mt-[2px] grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors">
        <input
          id={inputId}
          name={name}
          value={value}
          type="radio"
          required={required}
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full"
          {...rest}
        />
        <span
          aria-hidden
          className="bg-primary pointer-events-none h-2.5 w-2.5 scale-0 rounded-full transition-transform peer-checked:scale-100"
        />
      </span>
      <span className="leading-snug">{label}</span>
    </label>
  )
}

Radio.propTypes = {
  label: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
}

export default Radio
