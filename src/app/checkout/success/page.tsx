import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <CheckCircle
            size={56}
            strokeWidth={1}
            className="text-brand-gold mx-auto mb-6"
          />
          <p className="section-label mb-3">Order Confirmed</p>
          <h1 className="heading-display text-4xl lg:text-5xl mb-4">
            Thank You!
          </h1>
          <p className="font-body text-sm text-brand-slate leading-relaxed mb-8">
            Your order has been placed successfully. You'll receive a confirmation
            email shortly at the address you provided.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <Link href="/products" className="btn-outline">
              Continue Shopping
            </Link>
          </div>
          <p className="font-body text-xs text-brand-slate mt-8">
            Questions? Contact us at{' '}
            <a
              href="mailto:aakash1552005@gmail.com"
              className="underline hover:text-brand-black transition-colors"
            >
              aakash1552005@gmail.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
