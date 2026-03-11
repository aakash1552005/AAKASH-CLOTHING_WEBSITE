import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <p className="section-label mb-4">Legal</p>
        <h1 className="heading-display text-5xl mb-8">Privacy Policy</h1>
        <div className="space-y-6 font-body text-sm text-brand-slate leading-relaxed">
          <p>At Aakash Clothing, we respect your privacy and are committed to protecting your personal data.</p>
          <p>We collect information you provide when placing an order (name, email, address, phone). This is used solely to process your order.</p>
          <p>We do not sell or share your personal information with third parties except as necessary to process payments (Stripe) and deliver your order.</p>
          <p>For any privacy concerns, contact us at aakash1552005@gmail.com.</p>
          <p>Last updated: March 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}