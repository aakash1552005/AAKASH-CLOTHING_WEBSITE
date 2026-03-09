'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useEffect, useState } from 'react'
import { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, size: string, color: string) => void
  removeItem: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, color) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.size === size && i.color === color
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.size === size && i.color === color
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }
          return { items: [...state.items, { product, quantity: 1, size, color }] }
        })
      },

      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product.id === productId && i.size === size && i.color === color)
          ),
        }))
      },

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId && i.size === size && i.color === color
              ? { ...i, quantity }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: 'aakash-cart' }
  )
)

// ─── Derived selectors (plain functions, not stored in state) ───────────────
export const getCartTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

export const getCartCount = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0)

// ─── Hydration-safe hook ────────────────────────────────────────────────────
// Prevents SSR/client mismatch by returning 0/[] until the store is hydrated.
export function useCartHydrated() {
  const store = useCartStore()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return {
    ...store,
    items: hydrated ? store.items : [],
    isOpen: hydrated ? store.isOpen : false,
    count: hydrated ? getCartCount(store.items) : 0,
    total: hydrated ? getCartTotal(store.items) : 0,
  }
}
