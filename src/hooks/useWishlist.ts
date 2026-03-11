import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types'

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleItem: (product: Product) => void
  isWishlisted: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().isWishlisted(product.id)) {
          set((state) => ({ items: [...state.items, product] }))
        }
      },
      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== productId) }))
      },
      toggleItem: (product) => {
        if (get().isWishlisted(product.id)) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },
      isWishlisted: (productId) => {
        return get().items.some((i) => i.id === productId)
      },
      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'aakash-wishlist' }
  )
)