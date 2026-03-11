'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react'

const ORDER_STATUSES = [
  { key: 'pending', label: 'Order Placed', icon: Clock, description: 'Your order has been received' },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle, description: 'Your order is confirmed' },
  { key: 'shipped', label: 'Shipped', icon: Truck, description: 'Your order is on the way' },
  { key: 'delivered', label: 'Delivered', icon: Package, description: 'Your order has been delivered' },
]

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const [error, setError] = useState('')

  const handleTrack = async () => {
    if (!orderId || !email) {
      setError('Please enter both Order ID and email')
      return
    }
    setLoading(true)
    setError('')
    setOrder(null)

    try {
      const res = await fetch(`/api/orders/track?id=${orderId}&email=${email}`)
      const data = await res.json()
      if (data.error) {
        setError('Order not found. Please check your Order ID and email.')
      } else {
        setOrder(data)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const currentStep = ORDER_STATUSES.findIndex((s) => s.key === order?.status)

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-brand-cream py-16 text-center border-b border-brand-light-gray">
          <p className="section-label mb-3">Track</p>
          <h1 className="heading-display text-5xl lg:text-6xl">Your Order</h1>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-16">
          {/* Search Form */}
          <div className="space-y-4 mb-10">
            <div>
              <label className="font-body text-xs tracking-[0.15em] uppercase text-brand-charcoal mb-2 block">
                Order ID
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. ORD-123456"
                className="w-full border border-brand-light-gray px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-black transition-colors"
              />
            </div>
            <div>
              <label className="font-body text-xs tracking-[0.15em] uppercase text-brand-charcoal mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border border-brand-light-gray px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-black transition-colors"
              />
            </div>
            {error && (
              <p className="font-body text-xs text-red-500">{error}</p>
            )}
            <button
              onClick={handleTrack}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Search size={15} strokeWidth={1.5} />
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </div>

          {/* Order Result */}
          {order && (
            <div className="border border-brand-light-gray p-8">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-brand-slate mb-1">Order ID</p>
                  <p className="font-body text-sm font-medium text-brand-black">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-brand-slate mb-1">Total</p>
                  <p className="font-display text-lg">₹{order.total?.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="relative">
                <div className="absolute top-5 left-5 right-5 h-0.5 bg-brand-light-gray" />
                <div
                  className="absolute top-5 left-5 h-0.5 bg-brand-black transition-all duration-500"
                  style={{ width: `${(currentStep / (ORDER_STATUSES.length - 1)) * 100}%` }}
                />
                <div className="relative flex justify-between">
                  {ORDER_STATUSES.map((step, i) => {
                    const Icon = step.icon
                    const done = i <= currentStep
                    return (
                      <div key={step.key} className="flex flex-col items-center gap-2 w-20">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                          done ? 'bg-brand-black border-brand-black text-white' : 'bg-white border-brand-light-gray text-brand-slate'
                        }`}>
                          <Icon size={16} strokeWidth={1.5} />
                        </div>
                        <p className={`font-body text-[10px] tracking-wide text-center ${done ? 'text-brand-black font-medium' : 'text-brand-slate'}`}>
                          {step.label}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-light-gray">
                <p className="font-body text-xs text-brand-slate">
                  Status: <span className="text-brand-black font-medium capitalize">{order.status}</span>
                </p>
                {order.created_at && (
                  <p className="font-body text-xs text-brand-slate mt-1">
                    Ordered on: {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                )}
              </div>
            </div>
          )}

          <p className="font-body text-xs text-brand-slate text-center mt-8">
            Need help? Contact us at{' '}
            <a href="mailto:aakash1552005@gmail.com" className="underline hover:text-brand-black">
              aakash1552005@gmail.com
            </a>{' '}
            or WhatsApp{' '}
            <a href="https://wa.me/918825909003" className="underline hover:text-brand-black">
              +91 8825909003
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}