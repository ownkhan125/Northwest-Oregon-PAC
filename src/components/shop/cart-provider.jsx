'use client'

import { createContext, useContext, useMemo, useSyncExternalStore } from 'react'
import PropTypes from 'prop-types'
import { getProductById } from '@/data/products'

const STORAGE_KEY = 'nwop-cart'
export const MAX_LINE_QTY = 10

// Shipping is free for every order until a real carrier integration exists.
export const SHIPPING_COST = 0

// A cart line is keyed by product + chosen option so "Tee / M" and "Tee / L"
// are separate rows.
export const lineKey = (id, option) => (option ? `${id}::${option}` : id)

/* ------------------------------------------------------------------
   localStorage-backed store, consumed via useSyncExternalStore so the
   server render and the first client render agree (empty cart) and the
   persisted cart drops in right after hydration — no setState-in-effect.
------------------------------------------------------------------ */
const EMPTY = []
let cache = null
const listeners = new Set()

const sanitize = (raw) => {
  if (!Array.isArray(raw)) return EMPTY
  // Drop anything that no longer exists in the catalog.
  return raw.filter((l) => l && typeof l.key === 'string' && getProductById(l.id))
}

const readStorage = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return sanitize(raw ? JSON.parse(raw) : EMPTY)
  } catch (error) {
    console.error('[CartProvider]: failed to read cart', error)
    return EMPTY
  }
}

const getSnapshot = () => {
  if (cache === null) cache = readStorage()
  return cache
}

const getServerSnapshot = () => EMPTY

const emit = () => listeners.forEach((fn) => fn())

const subscribe = (fn) => {
  listeners.add(fn)
  // Keep tabs in sync — another tab editing the cart updates this one.
  const onStorage = (e) => {
    if (e.key !== STORAGE_KEY) return
    cache = readStorage()
    emit()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(fn)
    window.removeEventListener('storage', onStorage)
  }
}

const setItems = (updater) => {
  const next = updater(getSnapshot())
  cache = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch (error) {
    console.error('[CartProvider]: failed to persist cart', error)
  }
  emit()
}

const addItem = (id, option = null, qty = 1) => {
  if (!getProductById(id)) return
  setItems((prev) => {
    const key = lineKey(id, option)
    const existing = prev.find((l) => l.key === key)
    if (!existing) return [...prev, { key, id, option, qty: Math.min(MAX_LINE_QTY, qty) }]
    return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_LINE_QTY, l.qty + qty) } : l))
  })
}

const updateQty = (key, qty) =>
  setItems((prev) => {
    if (qty <= 0) return prev.filter((l) => l.key !== key)
    return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_LINE_QTY, qty) } : l))
  })

const removeItem = (key) => setItems((prev) => prev.filter((l) => l.key !== key))

const clearCart = () => setItems(() => EMPTY)

/* ------------------------------------------------------------------ */

const CartContext = createContext(null)

const CartProvider = ({ children }) => {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  // false during SSR + hydration, true once the client snapshot is live.
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const value = useMemo(() => {
    const lines = items
      .map((l) => {
        const product = getProductById(l.id)
        return product ? { ...l, product, lineTotal: product.price * l.qty } : null
      })
      .filter(Boolean)
    return {
      hydrated,
      lines,
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      subtotal: lines.reduce((sum, l) => sum + l.lineTotal, 0),
      addItem,
      updateQty,
      removeItem,
      clearCart,
      qtyOf: (id, option = null) => items.find((l) => l.key === lineKey(id, option))?.qty ?? 0,
    }
  }, [items, hydrated])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * Access the shared cart. Must be rendered inside <CartProvider>.
 * @returns {{
 *   hydrated: boolean,
 *   lines: Array<{ key: string, id: string, option: string | null, qty: number, product: object, lineTotal: number }>,
 *   count: number,
 *   subtotal: number,
 *   addItem: (id: string, option?: string | null, qty?: number) => void,
 *   updateQty: (key: string, qty: number) => void,
 *   removeItem: (key: string) => void,
 *   clearCart: () => void,
 *   qtyOf: (id: string, option?: string | null) => number,
 * }}
 */
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within <CartProvider>')
  return ctx
}

export default CartProvider
