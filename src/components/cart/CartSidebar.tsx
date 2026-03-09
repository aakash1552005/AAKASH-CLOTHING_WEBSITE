'use client'

import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartHydrated } from '@/hooks/useCart'
import { formatPrice } from '@/lib/stripe'

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, total } = useCartHydrated()
  const cartTotal = total

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={toggleCart}
      />
      <div className="relative bg-brand-white w-full max-w-md h-full flex flex-col animate-slide-in shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-light-gray">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span className="font-display text-xl font-light tracking-wider">Your Bag</span>
            {items.length > 0 && (
              <span className="text-xs text-brand-slate font-body">({items.length})</span>
            )}
          </div>
          <button
            onClick={toggleCart}
            className="p-1.5 hover:bg-brand-light-gray rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} strokeWidth={1} className="text-brand-light-gray" />
              <div>
                <p className="font-display text-2xl font-light text-brand-black mb-2">Your bag is empty</p>
                <p className="font-body text-sm text-brand-slate">Discover our curated collection</p>
              </div>
              <button onClick={toggleCart} className="btn-primary mt-2">
                <Link href="/products">Shop Now</Link>
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 pb-5 border-b border-brand-light-gray last:border-0"
                >
                  <div className="relative w-20 h-24 bg-brand-cream shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body text-sm font-medium text-brand-black leading-snug mb-1 truncate">
                      {item.product.name}
                    </h4>
                    <p className="font-body text-xs text-brand-slate mb-0.5">{item.color} · {item.size}</p>
                    <p className="font-display text-base font-light">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                        className="w-6 h-6 border border-brand-light-gray flex items-center justify-center hover:border-brand-black transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="font-body text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                        className="w-6 h-6 border border-brand-light-gray flex items-center justify-center hover:border-brand-black transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={10} />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                        className="ml-auto text-xs text-brand-slate hover:text-brand-black transition-colors font-body tracking-wide"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-brand-light-gray space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="font-body text-xs tracking-[0.15em] uppercase text-brand-slate">Subtotal</span>
              <span className="font-display text-2xl font-light">{formatPrice(cartTotal)}</span>
            </div>
            <p className="font-body text-xs text-brand-slate">Shipping & taxes calculated at checkout</p>
            <Link href="/checkout" onClick={toggleCart} className="btn-primary w-full text-center block">
              Proceed to Checkout
            </Link>
            <Link href="/cart" onClick={toggleCart} className="btn-outline w-full text-center block">
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
