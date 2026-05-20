'use client'

import { Children, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence, m } from 'motion/react'
import Label from '@/components/ui/label'
import { cn } from '@/lib/cn'
import { BASE_FIELD } from '@/lib/form'

const parseOptions = (children) =>
  Children.toArray(children)
    .filter((c) => c?.type === 'option')
    .map((c) => ({
      value: c.props.value ?? '',
      label: c.props.children,
      disabled: !!c.props.disabled,
    }))

const Select = ({
  label,
  name,
  required,
  defaultValue = '',
  children,
  className,
  id,
  placeholder,
  onChange,
}) => {
  const inputId = id ?? name
  const triggerRef = useRef(null)
  const menuRef = useRef(null)
  const optionRefs = useRef([])
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const [activeIndex, setActiveIndex] = useState(-1)

  const options = parseOptions(children)
  const selected = options.find((o) => o.value === value)
  const isPlaceholder = !selected || (selected.disabled && selected.value === '')
  const displayLabel = selected?.label ?? placeholder ?? 'Select'

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (
        !triggerRef.current?.contains(e.target) &&
        !menuRef.current?.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  useEffect(() => {
    if (!open) return
    const currentIndex = options.findIndex((o) => o.value === value && !o.disabled)
    setActiveIndex(currentIndex >= 0 ? currentIndex : options.findIndex((o) => !o.disabled))
  }, [open])

  useEffect(() => {
    if (!open || activeIndex < 0) return
    const el = optionRefs.current[activeIndex]
    if (el?.scrollIntoView) {
      el.scrollIntoView({ block: 'nearest' })
    }
  }, [open, activeIndex])

  const moveActive = (delta) => {
    if (options.length === 0) return
    let next = activeIndex
    for (let i = 0; i < options.length; i++) {
      next = (next + delta + options.length) % options.length
      if (!options[next].disabled) {
        setActiveIndex(next)
        return
      }
    }
  }

  const commit = (idx) => {
    const opt = options[idx]
    if (!opt || opt.disabled) return
    setValue(opt.value)
    setOpen(false)
    onChange?.({ target: { name, value: opt.value } })
    triggerRef.current?.focus()
  }

  const onKeyDown = (e) => {
    if (e.key === 'Tab') {
      if (open) setOpen(false)
      return
    }
    if (!open) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
        setOpen(true)
      }
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      triggerRef.current?.focus()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      moveActive(1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      moveActive(-1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      commit(activeIndex)
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActiveIndex(options.findIndex((o) => !o.disabled))
    } else if (e.key === 'End') {
      e.preventDefault()
      for (let i = options.length - 1; i >= 0; i--) {
        if (!options[i].disabled) {
          setActiveIndex(i)
          break
        }
      }
    }
  }

  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
      )}
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          id={inputId}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onKeyDown}
          className={cn(
            BASE_FIELD,
            'flex cursor-pointer items-center justify-between gap-3 pr-3 text-left',
            isPlaceholder && 'text-foreground/45',
            open && 'border-mint bg-mint/[0.04]',
            className,
          )}
        >
          <span className="truncate">{displayLabel}</span>
          <m.span
            aria-hidden
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-cyan grid h-7 w-7 shrink-0 place-items-center rounded-md"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </m.span>
        </button>

        <input type="hidden" name={name} value={value ?? ''} />

        <AnimatePresence>
          {open && (
            <m.ul
              ref={menuRef}
              role="listbox"
              tabIndex={-1}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="border-cyan/25 bg-navy-deep/95 absolute top-full right-0 left-0 z-50 mt-2 max-h-64 overflow-auto rounded-xl border p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            >
              {options.map((opt, i) => {
                const isSelected = opt.value === value && !opt.disabled
                const isActive = activeIndex === i && !opt.disabled
                return (
                  <li
                    key={`${opt.value}-${i}`}
                    ref={(el) => {
                      optionRefs.current[i] = el
                    }}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled || undefined}
                    onMouseEnter={() => !opt.disabled && setActiveIndex(i)}
                    onClick={() => commit(i)}
                    className={cn(
                      'flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                      opt.disabled && 'text-foreground/35 cursor-not-allowed',
                      !opt.disabled && isSelected && 'bg-mint/15 text-mint',
                      !opt.disabled && !isSelected && isActive && 'bg-cyan/10 text-foreground',
                      !opt.disabled && !isSelected && !isActive && 'text-foreground/85',
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <svg
                        aria-hidden
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                      >
                        <polyline points="5 12 10 17 19 7" />
                      </svg>
                    )}
                  </li>
                )
              })}
            </m.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

Select.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export default Select
