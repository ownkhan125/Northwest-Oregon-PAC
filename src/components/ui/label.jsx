import { cn } from '@/lib/cn'

const Label = ({ htmlFor, children, required, className }) => (
  <label
    htmlFor={htmlFor}
    className={cn(
      'text-highlight mb-2 block font-mono text-[10px] tracking-[0.25em] uppercase',
      className,
    )}
  >
    {children}
    {required && <span className="text-primary ml-1">*</span>}
  </label>
)

export default Label
