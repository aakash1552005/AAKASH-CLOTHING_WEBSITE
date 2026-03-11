'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartSidebar from '@/components/cart/CartSidebar'
import ProductCard from '@/components/product/ProductCard'
import { useWishlistStore } from '@/hooks/useWishlist'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore()

  return (
    <>
      <Navbar />
      <CartSidebar />
      <main>
        <div className="bg-brand-cream py-16 text-center border-b border-brand-light-gray">
          <p className="section-label mb-3">Saved Items</p>
          <h1 className="heading-display text-5xl lg:text-6xl">My Wishlist</h1>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          {items.length === 0 ? (
            <div className="text-center py-24">
              <Heart size={48} strokeWidth={1} className="mx-auto mb-6 text-brand-slate" />
              <p className="font-display text-3xl font-light text-brand-slate mb-4">
                Your wishlist is empty
              </p>
              <p className="font-body text-sm text-brand-slate mb-8">
                Save items you love by clicking the heart icon on any product.
              </p>
              <Link href="/products" className="btn-primary">
                Browse Collection
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="font-body text-xs text-brand-slate tracking-wide">
                  {items.length} {items.length === 1 ? 'item' : 'items'} saved
                </p>
                <button
                  onClick={clearWishlist}
                  className="font-body text-xs text-brand-slate underline underline-offset-2 hover:text-brand-black transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}