import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <p className="section-label mb-4">Our Story</p>
        <h1 className="heading-display text-5xl mb-8">About Aakash Clothing</h1>
        <div className="space-y-6 font-body text-sm text-brand-slate leading-relaxed">
          <p>Founded in 2006 in Chennai, India, Aakash Clothing was born from a passion for premium craftsmanship and timeless style.</p>
          <p>We believe that clothing is more than fabric — it is an expression of identity. Every piece we create is thoughtfully designed to blend comfort, quality, and elegance.</p>
          <p>Our commitment to quality means we source only the finest materials from certified suppliers. When you wear Aakash Clothing, you wear a promise of excellence.</p>
          <p>We are based at No:12, Gandhi Second Street, Puzhal, Chennai, India. Contact us at +91 8825909003 or aakash1552005@gmail.com.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}