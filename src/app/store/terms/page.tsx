import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <p className="section-label mb-4">Legal</p>
        <h1 className="heading-display text-5xl mb-8">Terms of Service</h1>
        <div className="space-y-6 font-body text-sm text-brand-slate leading-relaxed">
          <p>By using this website and placing orders, you agree to these terms.</p>
          <p>All prices are in Indian Rupees (INR) and include applicable taxes.</p>
          <p>Orders are subject to availability. We reserve the right to cancel any order and issue a full refund if the item is out of stock.</p>
          <p>All content on this website is the property of Aakash Clothing and may not be reproduced without permission.</p>
          <p>For any disputes, the jurisdiction shall be Chennai, Tamil Nadu, India.</p>
          <p>Last updated: March 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}