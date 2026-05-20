import PropTypes from 'prop-types'
import { cn } from '@/lib/cn'

const Label = ({ htmlFor, children, required, className }) => (
  <label
    htmlFor={htmlFor}
    className={cn(
      'text-cyan/85 mb-2 block font-mono text-[10px] tracking-[0.25em] uppercase',
      className,
    )}
  >
    {children}
    {required && <span className="text-mint ml-1">*</span>}
  </label>
)

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node,
  required: PropTypes.bool,
  className: PropTypes.string,
}

export default Label
