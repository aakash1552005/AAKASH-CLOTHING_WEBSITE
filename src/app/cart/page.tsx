'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartSidebar from '@/components/cart/CartSidebar'
import { useCartHydrated } from '@/hooks/useCart'
import { formatPrice } from '@/lib/stripe'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartHydrated()
  const cartTotal = total
  const shipping = cartTotal >= 3000 ? 0 : 199
  const orderTotal = cartTotal + shipping

  return (
    <>
      <Navbar />
      <CartSidebar />
      <main className="min-h-screen max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-16">
        <div className="mb-8">
          <p className="section-label mb-2">Your Selections</p>
          <h1 className="heading-display text-4xl lg:text-5xl">Shopping Bag</h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <ShoppingBag size={64} strokeWidth={0.75} className="text-brand-light-gray" />
            <div>
              <h2 className="font-display text-3xl font-light mb-2">Your bag is empty</h2>
              <p className="font-body text-sm text-brand-slate">Add some beautiful pieces to your collection</p>
            </div>
            <Link href="/products" className="btn-primary mt-2">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="hidden md:grid grid-cols-4 gap-4 pb-3 mb-3 border-b border-brand-light-gray">
                {['Product', 'Size / Color', 'Quantity', 'Total'].map((h) => (
                  <p key={h} className="font-body text-[10px] tracking-[0.18em] uppercase text-brand-slate">
                    {h}
                  </p>
                ))}
              </div>

              <ul className="divide-y divide-brand-light-gray">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="py-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
                  >
                    {/* Product */}
                    <div className="flex gap-4 items-center">
                      <div className="relative w-16 h-20 bg-brand-cream overflow-hidden shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <h3 className="font-body text-sm font-medium leading-snug mb-1">
                          {item.product.name}
                        </h3>
                        <p className="font-display text-base font-light">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                    </div>

                    {/* Size / Color */}
                    <div className="md:text-center">
                      <p className="font-body text-xs text-brand-slate">{item.color}</p>
                      <p className="font-body text-xs text-brand-slate">{item.size}</p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                        className="w-7 h-7 border border-brand-light-gray flex items-center justify-center hover:border-brand-black transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="font-body text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                        className="w-7 h-7 border border-brand-light-gray flex items-center justify-center hover:border-brand-black transition-colors"
                        aria-label="Increase"
                      >
                        <Plus size={10} />
                      </button>
                    </div>

                    {/* Total + Remove */}
                    <div className="flex items-center justify-between md:justify-center gap-4">
                      <span className="font-display text-lg font-light">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                        className="text-brand-slate hover:text-brand-black transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-brand-light-gray">
                <Link
                  href="/products"
                  className="font-body text-xs tracking-[0.12em] uppercase text-brand-slate hover:text-brand-black transition-colors"
                >
                  ← Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="font-body text-xs tracking-[0.12em] uppercase text-brand-slate hover:text-brand-black transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-brand-cream p-6 lg:p-8 sticky top-24">
                <h2 className="font-display text-2xl font-light mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="font-body text-sm text-brand-slate">Subtotal</span>
                    <span className="font-body text-sm">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-body text-sm text-brand-slate">Shipping</span>
                    <span className="font-body text-sm">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="font-body text-xs text-brand-slate">
                      Add {formatPrice(3000 - cartTotal)} more for free shipping
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t border-brand-light-gray mb-6">
                  <span className="font-body text-xs tracking-[0.15em] uppercase">Total</span>
                  <span className="font-display text-2xl font-light">{formatPrice(orderTotal)}</span>
                </div>
                <Link
                  href="/checkout"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  Checkout
                  <ArrowRight size={14} />
                </Link>
                <p className="text-center font-body text-[10px] text-brand-slate mt-3 tracking-wide">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
