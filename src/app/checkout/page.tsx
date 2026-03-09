'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Lock, ChevronRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import { useCartHydrated } from '@/hooks/useCart'
import { formatPrice } from '@/lib/stripe'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const { items, total } = useCartHydrated()
  const cartTotal = total
  const shipping = cartTotal >= 3000 ? 0 : 199
  const orderTotal = cartTotal + shipping

  const [form, setForm] = useState({
    email: '', name: '', phone: '',
    line1: '', line2: '', city: '',
    state: '', postal: '', country: 'India',
  })
  const [loading, setLoading] = useState(false)

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async () => {
    if (!form.email || !form.name || !form.line1 || !form.city) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shipping_address: form }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = `w-full font-body text-sm bg-transparent border border-brand-light-gray
    px-4 py-3 focus:outline-none focus:border-brand-black transition-colors placeholder:text-brand-slate/50`

  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-6xl mx-auto px-6 lg:px-12 py-10 lg:py-16">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="heading-display text-4xl">Checkout</h1>
          <Lock size={16} className="text-brand-gold ml-2" strokeWidth={1.5} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Contact */}
            <section>
              <h2 className="font-body text-xs tracking-[0.2em] uppercase text-brand-charcoal mb-4 pb-3 border-b border-brand-light-gray">
                Contact Information
              </h2>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address *"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full name *"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="font-body text-xs tracking-[0.2em] uppercase text-brand-charcoal mb-4 pb-3 border-b border-brand-light-gray">
                Shipping Address
              </h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Address line 1 *"
                  value={form.line1}
                  onChange={(e) => update('line1', e.target.value)}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={form.line2}
                  onChange={(e) => update('line2', e.target.value)}
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="City *"
                    value={form.city}
                    onChange={(e) => update('city', e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="State *"
                    value={form.state}
                    onChange={(e) => update('state', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="PIN code *"
                    value={form.postal}
                    onChange={(e) => update('postal', e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={form.country}
                    onChange={(e) => update('country', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* Payment Note */}
            <section className="bg-brand-cream p-5">
              <div className="flex items-center gap-3 mb-2">
                <Lock size={14} className="text-brand-gold" strokeWidth={1.5} />
                <p className="font-body text-xs tracking-[0.12em] uppercase text-brand-charcoal">
                  Secure Payment via Stripe
                </p>
              </div>
              <p className="font-body text-xs text-brand-slate leading-relaxed">
                You'll be redirected to Stripe's secure payment page to complete your purchase. We accept Visa, Mastercard, UPI, and more.
              </p>
            </section>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Redirecting...' : (
                <>
                  Proceed to Payment
                  <ChevronRight size={14} />
                </>
              )}
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-brand-cream p-6 sticky top-24">
              <h2 className="font-display text-xl font-light mb-5">Your Order</h2>
              <ul className="space-y-4 mb-5 pb-5 border-b border-brand-light-gray">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-3"
                  >
                    <div className="relative w-14 h-16 bg-white overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                      <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-body">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-xs font-medium leading-snug">{item.product.name}</p>
                      <p className="font-body text-[10px] text-brand-slate">{item.color} · {item.size}</p>
                    </div>
                    <span className="font-body text-xs">{formatPrice(item.product.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="font-body text-sm text-brand-slate">Subtotal</span>
                  <span className="font-body text-sm">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-sm text-brand-slate">Shipping</span>
                  <span className="font-body text-sm">
                    {shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(shipping)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-baseline pt-4 border-t border-brand-light-gray">
                <span className="font-body text-xs tracking-[0.15em] uppercase">Total</span>
                <span className="font-display text-2xl font-light">{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
