import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ShippingPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <p className="section-label mb-4">Policies</p>
        <h1 className="heading-display text-5xl mb-8">Shipping & Returns</h1>
        <div className="space-y-8 font-body text-sm text-brand-slate leading-relaxed">
          <div>
            <h2 className="font-body text-xs tracking-[0.15em] uppercase text-brand-charcoal mb-3">Shipping</h2>
            <p>Free shipping on all orders above ₹3,000. Standard delivery takes 5–7 business days. Express delivery (2–3 business days) available for ₹199.</p>
          </div>
          <div>
            <h2 className="font-body text-xs tracking-[0.15em] uppercase text-brand-charcoal mb-3">Returns</h2>
            <p>We accept returns within 14 days of delivery. Items must be unworn and in original packaging. Contact us at aakash1552005@gmail.com or WhatsApp +91 8825909003.</p>
          </div>
          <div>
            <h2 className="font-body text-xs tracking-[0.15em] uppercase text-brand-charcoal mb-3">Refunds</h2>
            <p>Refunds are processed within 5–7 business days after we receive the returned item.</p>
          </div>
          <div>
            <h2 className="font-body text-xs tracking-[0.15em] uppercase text-brand-charcoal mb-3">Exchanges</h2>
            <p>We offer free size exchanges. Contact us within 14 days of delivery.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}