// Mirrors the CSS resolution in globals.css so JS-driven surfaces (logo
// artwork, toggle icon, toggle click direction) never disagree with what
// the browser is actually painting.
//
// The CSS applies dark variables when EITHER:
//   • `html.dark` is present, OR
//   • no explicit class is set AND the OS reports `prefers-color-scheme: dark`
//
// Checking only for `.dark` misses the second case, which is what caused
// the reload → wrong-logo → single-click-only-updates-logo desync.
export function getResolvedTheme(root = document.documentElement) {
  if (root.classList.contains('dark')) return 'dark'
  if (root.classList.contains('light')) return 'light'
  return typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}
