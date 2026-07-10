import { forwardRef } from 'react'

/**
 * Button — primary and secondary variants.
 * Full implementation: Phase 8 (Animations & Polish).
 *
 * Props:
 *   variant:   'primary' | 'secondary'  (default: 'primary')
 *   disabled:  boolean
 *   fullWidth: boolean
 *   children:  ReactNode
 *   ...rest:   any valid button HTML attribute
 */
const Button = forwardRef(function Button(
  { variant = 'primary', disabled = false, fullWidth = false, children, className = '', ...rest },
  ref
) {
  const base = variant === 'secondary' ? 'btn-secondary' : 'btn-primary'
  const width = fullWidth ? 'w-full' : ''
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`${base} ${width} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
})

export default Button
