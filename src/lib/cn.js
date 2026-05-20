/**
 * Flatten + join class names. Filters out falsy values so conditional classes
 * (`condition && 'foo'`, `undefined`, `false`) don't leak into the className string.
 */
export const cn = (...classes) => classes.flat(Infinity).filter(Boolean).join(' ')
